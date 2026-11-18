#!/usr/bin/env node
// GTA 6 Secrets playlist — title keyword appends.
//
//   node scripts/gta6-playlist-titles.mjs            # preview
//   node scripts/gta6-playlist-titles.mjs --apply
//   node scripts/gta6-playlist-titles.mjs --only <videoId> --apply
//
// Rule: keep the existing title, append ONE trending phrase with " | ".
// never exceed 100 chars (hard), flag >75 (mobile truncation), never append a
// sentence the video doesn't deliver, never touch private/scheduled videos.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { homedir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

const root = dirname(fileURLToPath(import.meta.url));
const PLAYLIST = "PLRXf1uVlif1Q";
const APPLY = process.argv.includes("--apply");
const onlyIdx = process.argv.indexOf("--only");
const ONLY = onlyIdx > -1 ? process.argv[onlyIdx + 1] : null;

/* ------------------------------------------------------------------ plans */
// append = trending phrase added after " | "
// replace = only where the current title is wrong/misleading (needs a yes)
const PLANS = {
  KxOzYtPIsvk: { append: "GTA 6 Release Date", why: "release-date intent on a development documentary" },
  lyN781QvfII: { append: "GTA 6 Pre-Orders", why: "the video's actual subject; pre-order search wave" },
  "R-qJm86xS5s": { append: "GTA 6 Jason & Lucia Story", why: "character search: GTA 6 Jason, GTA 6 Lucia" },
  NjwpwUcxo8Y: { append: "GTA 6 Release Time", fix: "Rockstar Won't Explain... Play Early GTA6?", why: "release-time intent; removes stray '.' after '?'" },
  "KQoNl-voCnw": { append: "GTA 6 Preload & Unlock Time", why: "preload/unlock searches peak before launch" },
  "3buS8kA7Qio": {
    replace: "The Final 60 Seconds Before GTA 6 | GTA 6 Launch Countdown",
    why: "current title claims '24/7' + live 🔴 on a 64s video (policy 2.2); keeps countdown keyword",
    needsApproval: true,
  },
  DrxALhLInLA: { append: "GTA 6 Leaks", why: "leak documentary; highest-volume GTA 6 search term in this set" },
  "048FGKt95zk": { append: "GTA 6 Launch Day Tips", why: "launch-day tips intent, no claim beyond the 4 mistakes" },
  PsdNCzTWHXs: {
    replace: "GTA 6's 5 Free Gifts Are Expiring | GTA 6 Pre-Order Bonuses",
    why: "current 80-char pipe chain can't take another keyword (would pass 100); 'live countdown' misdescribes a deadlines video",
    needsApproval: true,
  },
};

/* ----------------------------------------------------------------- helpers */
const secret = JSON.parse(
  await readFile(join(root, "..", "src", "config", "tokens.json"), "utf8"),
).installed;
const tokens = JSON.parse(
  await readFile(join(homedir(), ".config", "youtube-studio-mcp", "tokens.json"), "utf8"),
);
const oauth = new OAuth2Client(secret.client_id, secret.client_secret);
oauth.setCredentials({ refresh_token: tokens.refresh_token });
const yt = google.youtube({ version: "v3", auth: oauth });

const items = [];
let pageToken = "";
do {
  const r = await yt.playlistItems.list({
    part: ["contentDetails"],
    playlistId: PLAYLIST,
    maxResults: 50,
    pageToken: pageToken || undefined,
  });
  items.push(...(r.data.items || []));
  pageToken = r.data.nextPageToken || "";
} while (pageToken);

const vids = await yt.videos.list({
  part: ["snippet", "status"],
  id: items.map((i) => i.contentDetails.videoId).join(","),
  maxResults: 50,
});

function build(plan, current) {
  if (plan.needsApproval && !APPLY) return { title: plan.replace, blocked: "needs approval" };
  if (plan.replace) return { title: plan.replace };
  const base = plan.appendBase || current;
  return { title: `${base} | ${plan.append}` };
}

function validate(current, next, plan) {
  const errors = [];
  const warns = [];
  if (next.length > 100) errors.push(`${next.length} chars > 100 limit`);
  if (next.length > 75) warns.push(`${next.length} chars — truncated on mobile`);
  if ((next.match(/\|/g) || []).length > 2) errors.push("more than 2 pipes (looks like keyword stuffing)");
  if (/ohbhai/i.test(next)) errors.push("retired brand");
  if (!plan.replace) {
    if (current.toLowerCase().includes(plan.append.toLowerCase())) errors.push("phrase already in title");
    if (!next.endsWith(plan.append)) errors.push("append not at the end");
  }
  if (/\?\s*\./.test(next)) errors.push("stray '. ' after '?'");
  return { errors, warns };
}

const results = [];
const skipped = [];
for (const v of vids.data.items) {
  const plan = PLANS[v.id];
  if (ONLY && v.id !== ONLY) continue;
  if (!plan) {
    skipped.push({ id: v.id, title: v.snippet.title, reason: "no plan" });
    continue;
  }
  if (v.status.privacyStatus !== "public") {
    skipped.push({
      id: v.id,
      title: v.snippet.title,
      reason: `privacy=${v.status.privacyStatus}${v.status.publishAt ? ` publishAt=${v.status.publishAt}` : ""} — scheduled, not touched`,
    });
    continue;
  }
  const current = v.snippet.title;
  const base = plan.fix || current;
  const next = plan.replace || `${base} | ${plan.append}`;
  const { errors, warns } = validate(base, next, plan);
  results.push({
    id: v.id,
    current,
    next,
    why: plan.why,
    needsApproval: !!plan.needsApproval,
    errors,
    warns,
    snippet: v.snippet,
  });
}

const dir = join(root, "..", "yt", "story", "gta6-playlist-seo");
await mkdir(dir, { recursive: true });
await writeFile(
  join(dir, "titles-plan.json"),
  JSON.stringify(
    { generatedAt: new Date().toISOString(), results: results.map(({ snippet, ...r }) => r), skipped },
    null,
    2,
  ),
);

console.log(`\n=== TITLE PLAN (${APPLY ? "APPLY" : "PREVIEW"}) ===\n`);
for (const r of results) {
  console.log(`${r.id}  ${r.errors.length ? "❌" : r.needsApproval ? "⏸" : "✅"}  ${r.next.length} chars`);
  console.log(`   now : ${r.current}`);
  console.log(`   next: ${r.next}`);
  console.log(`   why : ${r.why}${r.needsApproval ? "  [NEEDS APPROVAL]" : ""}`);
  if (r.errors.length) console.log(`   ERR : ${r.errors.join(" | ")}`);
  if (r.warns.length) console.log(`   WARN: ${r.warns.join(" | ")}`);
  console.log("");
}
for (const s of skipped) console.log(`⏭  SKIPPED ${s.id} — ${s.title.slice(0, 40)} — ${s.reason}`);

if (APPLY) {
  const writable = results.filter((r) => !r.errors.length && !r.needsApproval);
  if (!writable.length) {
    console.log("\nNothing writable.");
    process.exit(0);
  }
  console.log(`\n--- writing ${writable.length} title(s) ---`);
  for (const r of writable) {
    const s = r.snippet;
    await yt.videos.update({
      part: ["snippet"],
      requestBody: {
        id: r.id,
        snippet: {
          title: r.next,
          description: s.description,
          tags: s.tags || [],
          categoryId: s.categoryId,
          defaultLanguage: s.defaultLanguage || "en",
        },
      },
    });
    console.log(`✓ ${r.id}  ${r.next.length} chars`);
  }
  console.log(`\nquota: ~${writable.length * 50} units`);
} else {
  console.log(`\npreview → ${join(dir, "titles-plan.json")}`);
}
