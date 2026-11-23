#!/usr/bin/env node
// Outreach poster — generic. Reads a drafts JSON, runs pre-flight, posts with gaps.
//
//   node scripts/post-outreach.mjs <drafts.json>            # dry run (pre-flight only)
//   node scripts/post-outreach.mjs <drafts.json> --post     # actually post
//
// drafts.json: [{ "videoId": "...", "who": "...", "market": "BR", "text": "..." }]
// Env: GAP_MIN=90 GAP_MAX=240 (seconds, randomized per comment)
//
// Pre-flight blocks: >20 words, links, hashtags, self-promo, AI filler,
// duplicate or near-duplicate text, more than 10 comments per run,
// and anything already posted in a previous batch (text or video id).
import { readFile, readdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const file = process.argv[2];
const post = process.argv.includes("--post");
if (!file) {
  console.error("usage: node scripts/post-outreach.mjs <drafts.json> [--post]");
  process.exit(1);
}
const storyDir = resolve(dirname(fileURLToPath(import.meta.url)), "..", "yt", "story");
const drafts = JSON.parse(await readFile(resolve(file), "utf8"));
const GAP_MIN = +(process.env.GAP_MIN ?? 90);
const GAP_MAX = +(process.env.GAP_MAX ?? 240);

const words = (s) => s.trim().split(/\s+/).filter(Boolean).length;
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9 ]/g, "").split(/\s+/).filter(Boolean);
const jaccard = (a, b) => {
  const A = new Set(norm(a)), B = new Set(norm(b));
  const inter = [...A].filter((x) => B.has(x)).length;
  return inter / new Set([...A, ...B]).size;
};

const problems = [];
if (drafts.length > 10) problems.push(`run has ${drafts.length} comments — cap is 10 per run`);

// Cross-batch history: every previously posted comment that has an id.
let history = [];
try {
  for (const f of await readdir(storyDir)) {
    if (!f.endsWith(".json")) continue;
    let data;
    try {
      data = JSON.parse(await readFile(join(storyDir, f), "utf8"));
    } catch {
      continue;
    }
    const lists = [data?.posted, data?.comments, data?.items, Array.isArray(data) ? data : null];
    for (const list of lists) {
      if (!Array.isArray(list)) continue;
      for (const it of list) {
        if (it?.id && it?.text) history.push({ text: it.text, videoId: it.videoId, from: f });
      }
    }
  }
} catch {
  history = [];
}

const seen = [];
for (const d of drafts) {
  const t = d.text ?? "";
  const w = words(t);
  if (w > 20) problems.push(`${d.videoId}: ${w} words (cap 20)`);
  if (w < 5) problems.push(`${d.videoId}: ${w} words — too thin to earn a reply`);
  if (/https?:\/\/|www\.|\.com|\.gg\b/i.test(t)) problems.push(`${d.videoId}: contains a link`);
  if (/#[A-Za-z_]\w*/.test(t)) problems.push(`${d.videoId}: contains a hashtag`);
  if (/\bsubscribe\b|\bmy channel\b|\bcheck (out )?my\b/i.test(t)) problems.push(`${d.videoId}: self-promo`);
  if (/\b(thanks|thank you|great video|love this|amazing)\b/i.test(t)) problems.push(`${d.videoId}: AI-tone filler`);
  for (const h of history) {
    if (h.videoId === d.videoId) problems.push(`${d.videoId}: already commented (${h.from})`);
    else if (jaccard(t, h.text) > 0.6) problems.push(`${d.videoId}: too close to earlier post on ${h.videoId} (${h.from})`);
  }
  for (const s of seen) {
    if (jaccard(t, s.text) > 0.55) problems.push(`${d.videoId}: too close to ${s.videoId} (${(jaccard(t, s.text) * 100).toFixed(0)}% overlap)`);
  }
  seen.push(d);
  const dup = drafts.filter((x) => x.videoId === d.videoId).length;
  if (dup > 1) problems.push(`${d.videoId}: appears ${dup} times in the batch`);
}

console.log(`\n=== PRE-FLIGHT: ${drafts.length} comments ===`);
console.log(`history: ${history.length} earlier posts scanned in yt/story`);
console.log(`markets: ${[...new Set(drafts.map((d) => d.market))].join(", ")}`);
console.log(`channels: ${new Set(drafts.map((d) => d.who)).size}`);
console.log(`word range: ${Math.min(...drafts.map((d) => words(d.text)))}–${Math.max(...drafts.map((d) => words(d.text)))}`);
if (problems.length) {
  console.log("\nBLOCKED:");
  for (const p of problems) console.log(`  x ${p}`);
  if (post) {
    console.error("\nrefusing to post with pre-flight failures");
    process.exit(1);
  }
} else {
  console.log("all checks passed");
}

if (!post) {
  console.log("\ndry run — add --post to send\n");
  process.exit(problems.length ? 1 : 0);
}

const { homedir } = await import("node:os");
const { OAuth2Client } = await import("google-auth-library");
const { google } = await import("googleapis");

const root = dirname(fileURLToPath(import.meta.url));
const secret = JSON.parse(await readFile(join(root, "..", "src", "config", "tokens.json"), "utf8")).installed;
const tokens = JSON.parse(await readFile(join(homedir(), ".config", "youtube-studio-mcp", "tokens.json"), "utf8"));
const oauth = new OAuth2Client(secret.client_id, secret.client_secret);
oauth.setCredentials({ refresh_token: tokens.refresh_token });
const yt = google.youtube({ version: "v3", auth: oauth });

const posted = [];
for (let i = 0; i < drafts.length; i++) {
  const d = drafts[i];
  if (i > 0) {
    const gap = GAP_MIN + Math.floor(Math.random() * Math.max(1, GAP_MAX - GAP_MIN));
    console.log(`\n-- gap ${gap}s --`);
    await new Promise((r) => setTimeout(r, gap * 1000));
  }
  try {
    const r = await yt.commentThreads.insert({
      part: ["snippet"],
      requestBody: { snippet: { videoId: d.videoId, topLevelComment: { snippet: { textOriginal: d.text } } } },
    });
    const id = r.data.id;
    console.log(`[${i + 1}/${drafts.length}] ${d.market} ${d.who} -> ${id}  "${d.text}"`);
    posted.push({ ...d, id, at: new Date().toISOString() });
  } catch (e) {
    console.error(`[${i + 1}/${drafts.length}] ${d.market} ${d.who} FAILED: ${e.message}`);
    posted.push({ ...d, id: null, error: e.message });
  }
}

// Merge with any same-day record so a resumed/interrupted run appends instead of
// overwriting comments that already went out (server restarts, quota errors).
const out = join(storyDir, `${new Date().toISOString().slice(0, 10)}-outreach-posted.json`);
const { writeFile } = await import("node:fs/promises");
let prior = [];
try {
  const prev = JSON.parse(await readFile(out, "utf8"));
  prior = Array.isArray(prev?.posted) ? prev.posted : [];
} catch {
  prior = [];
}
const key = (p) => p.id ?? `${p.videoId}|${p.text}`;
const known = new Set(prior.map(key));
const merged = [...prior, ...posted.filter((p) => !known.has(key(p)))];
await writeFile(out, JSON.stringify({ startedAt: prior[0]?.at ?? posted[0]?.at, posted: merged }, null, 2));
console.log(`\nwrote ${out} (${prior.length} earlier + ${merged.length - prior.length} new)`);
