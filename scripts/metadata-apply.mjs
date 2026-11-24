#!/usr/bin/env node
/**
 * metadata-apply.mjs — one deterministic writer for every channel metadata change.
 *
 *   node scripts/metadata-apply.mjs --plan docs/meta-plan.json          # preview only
 *   node scripts/metadata-apply.mjs --plan docs/meta-plan.json --apply  # write to YouTube
 *
 * Plan shape:
 * {
 *   "reschedule": [ { "id": "...", "publishAt": "2026-12-10T20:00:00Z", "why": "..." } ],
 *   "videos": [ {
 *      "id": "...",
 *      "title": "optional new title",
 *      "categoryId": "optional",
 *      "tags": ["optional full replacement"],
 *      "chapters": [ ["0:00", "Label"], ... ] | null,
 *      "crosslinks": [ { "id": "...", "label": "..." } ],
 *      "brand": true,
 *      "dropTitleEcho": true,
 *      "why": "..."
 *   } ]
 * }
 *
 * Description strategy: never regenerates the body. It (1) optionally drops a first-line
 * title echo, (2) strips any block this script previously added, (3) appends chapters,
 * cross-links and the brand line in a stable, idempotent footer.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { homedir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

const root = dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2);
const planPath = argv.includes("--plan") ? argv[argv.indexOf("--plan") + 1] : join(root, "..", "docs", "meta-plan.json");
const APPLY = argv.includes("--apply");

const FOOTER_START = "━━━━━━━━━━ THE UNTOLD EXIT · NAVIGATION ━━━━━━━━━━";
const FOOTER_END = "━━━━━━━━━━ END NAVIGATION ━━━━━━━━━━";
const BRAND_LINE = "The Untold Exit — Look Beyond What Seems Obvious.";
const MAX_DESC = 4900;

const plan = JSON.parse(await readFile(planPath, "utf8"));
const state = JSON.parse(await readFile(join(root, "..", "docs", "state-full.json"), "utf8"));
const byId = new Map();
for (const r of state) if (!byId.has(r.id)) byId.set(r.id, r);

/* ---------- helpers ---------- */
const tsToSec = (t) => {
  const p = t.split(":").map(Number);
  return p.length === 3 ? p[0] * 3600 + p[1] * 60 + p[2] : p[0] * 60 + p[1];
};
const secToTs = (s) => {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${String(r).padStart(2, "0")}`;
};

function validateChapters(chapters, durationSec, errors) {
  if (!chapters || !chapters.length) return null;
  const clean = chapters
    .map(([t, label]) => [String(t).trim(), String(label).trim()])
    .filter(([t, l]) => /^\d{1,2}:\d{2}(:\d{2})?$/.test(t) && l);
  if (clean.length < 3) { errors.push(`chapters: only ${clean.length} valid (need >=3)`); return null; }
  if (tsToSec(clean[0][0]) !== 0) errors.push(`chapters: first must be 0:00 (got ${clean[0][0]})`);
  let prev = -1;
  for (let i = 0; i < clean.length; i++) {
    const s = tsToSec(clean[i][0]);
    if (s <= prev) errors.push(`chapters: not ascending at ${clean[i][0]}`);
    if (i > 0 && s - prev < 10) errors.push(`chapters: ${clean[i - 1][0]} -> ${clean[i][0]} is under 10s`);
    if (durationSec && s >= durationSec) errors.push(`chapters: ${clean[i][0]} is past runtime ${secToTs(durationSec)}`);
    prev = s;
  }
  if (durationSec && prev > 0 && durationSec - prev < 10 && clean.length > 1) {
    // last chapter would be near-empty; YouTube still accepts it, but flag it
    errors.push(`chapters: last chapter ${secToTs(prev)} leaves only ${durationSec - prev}s`);
  }
  return clean;
}

function buildDescription(desc, v) {
  const notes = [];
  let d = (desc || "").replace(/\r\n/g, "\n").trim();

  // Strip per-script auto-removable blocks that inflate desc beyond limit
  d = d.replace(/SEARCH TOPICS.*/s, "").trimEnd();
  d = d.replace(/DISCLAIMER:.*/s, "").trimEnd();

  // 0. a hashtag cannot contain a space: "#The Untold Exit" indexes as nothing
  const spacedTags = (d.match(/#The Untold Exit/gi) || []).length;
  if (spacedTags) {
    d = d.replace(/#The Untold Exit/gi, "#TheUntoldExit");
    notes.push(`fixed ${spacedTags} broken hashtag(s) "#The Untold Exit"`);
  }

  // 1. drop a duplicated title echo on line 1
  if (v.dropTitleEcho) {
    const firstLine = d.split("\n")[0].trim();
    const t = (v.title || byId.get(v.id)?.title || "").trim();
    const norm = (s) => s.toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, " ").trim();
    const a = norm(firstLine), b = norm(t);
    if (a && b && (a === b || a.slice(0, 30) === b.slice(0, 30) || (a.length > 25 && b.startsWith(a.slice(0, 25))))) {
      d = d.split("\n").slice(1).join("\n").replace(/^\s+/, "");
      notes.push("dropped title echo on line 1");
    }
  }

  // 2. strip any previous footer
  const i = d.indexOf(FOOTER_START);
  if (i !== -1) {
    const j = d.indexOf(FOOTER_END, i);
    const tail = j !== -1 ? d.slice(j + FOOTER_END.length) : "";
    d = d.slice(0, i).trimEnd() + tail.trimEnd();
    notes.push("replaced previous footer");
  }

  // 3. rebuild footer
  const parts = [];
  if (v.chapters?.length) {
    parts.push("CHAPTERS");
    for (const [t, label] of v.chapters) parts.push(`${t} ${label}`);
  }
  if (v.crosslinks?.length) {
    if (parts.length) parts.push("");
    parts.push("WATCH NEXT ON THE UNTOLD EXIT");
    for (const l of v.crosslinks) parts.push(`▶ ${l.label}\n  https://youtu.be/${l.id}`);
  }
  if (v.brand !== false) {
    if (parts.length) parts.push("");
    if (/look beyond what seems obvious/i.test(d) && !parts.length) {
      // brand already in the body and there is nothing else to add
    } else {
      parts.push(BRAND_LINE);
    }
  }
  if (!parts.length) return { desc: d, notes };

  return { desc: `${d}\n\n${FOOTER_START}\n${parts.join("\n")}\n${FOOTER_END}`, notes };
}

function validateTags(tags) {
  const errs = [];
  const total = tags.reduce((n, t) => n + t.length + 1, 0);
  if (total > 500) errs.push(`tags: ${total} chars > 500 limit`);
  if (tags.some((t) => t.length > 30)) errs.push("tags: a tag exceeds 30 chars");
  if (tags.some((t) => /"/.test(t))) errs.push('tags: a tag contains a double quote');
  return errs;
}

/* ---------- build preview ---------- */
const preview = [];
for (const v of plan.videos || []) {
  const cur = byId.get(v.id);
  if (!cur) { preview.push({ id: v.id, errors: ["unknown video id"] }); continue; }
  const errors = [];
  const newTitle = v.title ?? cur.title;
  if (newTitle.length > 70) errors.push(`title: ${newTitle.length} chars > 70`);
  if (/ohbhai/i.test(newTitle)) errors.push("title: retired brand");
  if (/ohbhai/i.test(JSON.stringify(v))) errors.push("plan: retired brand present");

  const chapters = validateChapters(v.chapters, cur.seconds, errors);
  const { desc, notes } = buildDescription(cur.description, { ...v, title: newTitle, chapters });

  if (desc.length > MAX_DESC) errors.push(`description: ${desc.length} chars > ${MAX_DESC}`);
  const estTagCount = (v.tags ?? cur.tags).length;
  const tagErrs = validateTags(v.tags ?? cur.tags);
  errors.push(...tagErrs);

  preview.push({
    id: v.id,
    titleFrom: cur.title,
    titleTo: newTitle,
    titleLen: newTitle.length,
    privacy: cur.privacy,
    publishAt: cur.publishAt,
    seconds: cur.seconds,
    chapters: chapters?.length ?? 0,
    crosslinks: v.crosslinks?.length ?? 0,
    descFrom: cur.descLen,
    descTo: desc.length,
    categoryFrom: cur.categoryId,
    categoryTo: v.categoryId ?? cur.categoryId,
    tagsFrom: cur.tags.length,
    tagsTo: estTagCount,
    notes,
    errors,
    _desc: desc,
  });
}

/* ---------- report ---------- */
await mkdir(join(root, "..", "docs", "meta-preview"), { recursive: true });
let bad = 0;
console.log("=== PLAN VALIDATION ===");
for (const p of preview) {
  if (p.errors?.length) bad++;
  console.log(
    (p.errors?.length ? "FAIL " : "ok   ") + p.id,
    String(p.seconds ?? "").padStart(5) + "s",
    `title ${p.titleFrom === p.titleTo ? "same " : "CHANGE"} (${p.titleLen})`.padEnd(24),
    `ch${p.chapters} lk${p.crosslinks} cat${p.categoryFrom}->${p.categoryTo} tags${p.tagsFrom}->${p.tagsTo}`,
    `desc ${p.descFrom}->${p.descTo}`,
  );
  if (p.titleFrom !== p.titleTo) console.log("       NEW TITLE:", p.titleTo);
  for (const e of p.errors || []) console.log("       !", e);
  for (const n of p.notes || []) console.log("       ·", n);
  await writeFile(join(root, "..", "docs", "meta-preview", p.id + ".txt"), `${p.titleTo}\n\n${p._desc}`, "utf8");
}
console.log(`\nvideos: ${preview.length} | failing: ${bad} | reschedule: ${(plan.reschedule || []).length}`);

if (plan.reschedule?.length) {
  console.log("\n=== RESCHEDULE ===");
  for (const r of plan.reschedule) {
    const cur = byId.get(r.id);
    console.log(r.id, (cur?.publishAt || "none").padEnd(22), "->", r.publishAt, "|", cur?.seconds + "s", "|", cur?.title?.slice(0, 52));
  }
}
console.log(`\npreview files: docs/meta-preview/`);
if (!APPLY) { console.log("DRY RUN — nothing written. Re-run with --apply."); process.exit(bad ? 1 : 0); }

/* ---------- apply ---------- */
const secret = JSON.parse(await readFile(join(root, "..", "src", "config", "tokens.json"), "utf8")).installed;
const tokens = JSON.parse(await readFile(join(homedir(), ".config", "youtube-studio-mcp", "tokens.json"), "utf8"));
const oauth = new OAuth2Client(secret.client_id, secret.client_secret);
oauth.setCredentials({ refresh_token: tokens.refresh_token });
const yt = google.youtube({ version: "v3", auth: oauth });

console.log("\n=== APPLY ===");
for (const v of plan.videos || []) {
  const cur = byId.get(v.id);
  const p = preview.find((x) => x.id === v.id);
  if (!cur || p.errors?.length) { console.log("skip", v.id, "(invalid)"); continue; }
  try {
    await yt.videos.update({
      part: ["snippet"],
      requestBody: {
        id: v.id,
        snippet: {
          title: p.titleTo,
          description: p._desc,
          categoryId: String(p.categoryTo),
          tags: v.tags ?? cur.tags,
          defaultLanguage: cur.defaultLanguage || "en",
          defaultAudioLanguage: cur.defaultAudioLanguage || "en",
        },
      },
    });
    console.log("updated", v.id, v.title ? "TITLE+" : "", "desc", p.descTo);
  } catch (e) {
    console.log("FAILED ", v.id, e.errors?.[0]?.reason || e.message);
  }
}

for (const r of plan.reschedule || []) {
  const cur = byId.get(r.id);
  if (!cur) { console.log("skip reschedule", r.id); continue; }
  try {
    await yt.videos.update({
      part: ["status"],
      requestBody: {
        id: r.id,
        status: {
          privacyStatus: cur.privacy,
          publishAt: r.publishAt,
          selfDeclaredMadeForKids: cur.selfDeclaredMadeForKids ?? false,
        },
      },
    });
    console.log("rescheduled", r.id, cur.publishAt, "->", r.publishAt);
  } catch (e) {
    console.log("FAILED reschedule", r.id, e.errors?.[0]?.reason || e.message);
  }
}
