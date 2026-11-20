#!/usr/bin/env node
// Outreach target finder v2 — Tier-1/2 market biased, multi-query.
//
//   node scripts/outreach-targets-v2.mjs [hours=96]
//
// One search per (query, region) pair, 100 units each. Queries are rotated across
// US / GB / CA / AU (Tier 1) and NZ (Tier 2) so the pool covers every target market,
// and across the channel's pillars (GTA, animated survival, psychology).
// Country note: the Data API exposes no channel country. We use regionCode bias +
// English-language content + local-wording evidence, and we never claim more.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { homedir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

const root = dirname(fileURLToPath(import.meta.url));
const hours = parseInt(process.argv[2] || "96", 10);

const QUERIES = [
  ["US", "GTA 6 tips"],
  ["GB", "GTA 6 review"],
  ["CA", "GTA 6 secrets"],
  ["AU", "GTA 6 mistakes"],
  ["NZ", "GTA 6 easter eggs"],
  ["AU", "animated survival story"],
  ["CA", "why you procrastinate"],
  ["US", "true scary story animated"],
];

const secret = JSON.parse(
  await readFile(join(root, "..", "src", "config", "tokens.json"), "utf8"),
).installed;
const tokens = JSON.parse(
  await readFile(join(homedir(), ".config", "youtube-studio-mcp", "tokens.json"), "utf8"),
);
const oauth = new OAuth2Client(secret.client_id, secret.client_secret);
oauth.setCredentials({ refresh_token: tokens.refresh_token });
const yt = google.youtube({ version: "v3", auth: oauth });

const since = new Date(Date.now() - hours * 3600_000).toISOString();
const seen = new Map();

for (const [region, q] of QUERIES) {
  const r = await yt.search.list({
    part: ["snippet"],
    q,
    type: ["video"],
    order: "relevance",
    regionCode: region,
    relevanceLanguage: "en",
    publishedAfter: since,
    maxResults: 12,
  });
  for (const it of r.data.items || []) {
    const id = it.id?.videoId;
    if (!id || seen.has(id)) continue;
    seen.set(id, { id, region, query: q });
  }
}

const allIds = [...seen.keys()];
const vidsItems = [];
const chanIdSet = new Set();
for (let i = 0; i < allIds.length; i += 50) {
  const chunk = await yt.videos.list({
    part: ["snippet", "statistics", "contentDetails"],
    id: allIds.slice(i, i + 50).join(","),
    maxResults: 50,
  });
  for (const v of chunk.data.items || []) {
    vidsItems.push(v);
    chanIdSet.add(v.snippet.channelId);
  }
}
const vids = { data: { items: vidsItems } };
const chanIds = [...chanIdSet];
const subs = new Map();
// channels.list accepts at most 50 ids per request
for (let i = 0; i < chanIds.length; i += 50) {
  const chans = await yt.channels.list({
    part: ["statistics"],
    id: chanIds.slice(i, i + 50).join(","),
  });
  for (const c of chans.data.items || []) subs.set(c.id, +c.statistics.subscriberCount);
}

function seconds(iso) {
  const m = /^P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso || "");
  if (!m) return 0;
  return +(m[1] || 0) * 86400 + +(m[2] || 0) * 3600 + +(m[3] || 0) * 60 + +(m[4] || 0);
}
const ascii = (s) => (s.match(/[\x00-\x7F]/g) || []).length / Math.max(1, s.length) > 0.9;

const rows = [];
for (const v of vids.data.items) {
  const s = subs.get(v.snippet.channelId) || 0;
  const views = +v.statistics.viewCount;
  const meta = seen.get(v.id);
  const desc = (v.snippet.description || "").replace(/\s+/g, " ").trim();
  rows.push({
    id: v.id,
    region: meta.region,
    query: meta.query,
    channel: v.snippet.channelTitle,
    channelId: v.snippet.channelId,
    subs: s,
    views,
    ratio: s ? +(views / s).toFixed(1) : null,
    dur: seconds(v.contentDetails.duration),
    english: ascii(v.snippet.title) && ascii(desc.slice(0, 120)),
    published: v.snippet.publishedAt.slice(0, 16),
    title: v.snippet.title,
    desc,
  });
}

const eligible = rows
  .filter(
    (r) =>
      r.english &&
      r.subs >= 2_000 &&
      r.subs <= 400_000 &&
      r.views >= 500 &&
      r.desc.length >= 60 &&
      r.dur >= 30,
  )
  .sort((a, b) => b.ratio - a.ratio);

console.log(`\n=== OUTREACH CANDIDATES v2 (last ${hours}h) ===`);
console.log(`${rows.length} unique · ${eligible.length} eligible (English, 2K–400K subs, 30s+, described)\n`);
for (const r of eligible) {
  console.log(`[${r.region}] ${r.id}  ${String(r.subs).padStart(6)}s  ${String(r.views).padStart(7)}v  ${r.ratio}x  ${String(r.dur).padStart(4)}s  ${r.channel.slice(0, 22)}`);
  console.log(`   T: ${r.title.slice(0, 95)}`);
  console.log(`   D: ${r.desc.slice(0, 200)}`);
  console.log("");
}

const out = join(root, "..", "yt", "story", "outreach-targets-v2.json");
await mkdir(dirname(out), { recursive: true });
await writeFile(out, JSON.stringify(eligible, null, 2));
console.log(`wrote ${out}\nquota: ~${QUERIES.length * 100 + 2}`);
