#!/usr/bin/env node
// Outreach target finder — Tier-1 market biased GTA 6 launch-wave videos.
//
//   node scripts/outreach-targets.mjs [hours=72] [perRegion=10]
//
// Reality check: the Data API does NOT expose a channel's country. We approximate
// audience country with search.list regionCode + English titles + local wording,
// then prefer small/mid channels (comments actually get seen and replied to).
//
// Cost: 100 units per region search + ~2 units for details.
import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

const root = dirname(fileURLToPath(import.meta.url));
const hours = parseInt(process.argv[2] || "72", 10);
const perRegion = Math.min(15, parseInt(process.argv[3] || "10", 10));

// Tier 1 first (schedule-critical markets), Tier 2 as depth.
const REGIONS = [
  ["US", "United States"],
  ["GB", "United Kingdom"],
  ["CA", "Canada"],
  ["AU", "Australia"],
  ["DE", "Germany"],
  ["NZ", "New Zealand"],
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

for (const [code, name] of REGIONS) {
  const r = await yt.search.list({
    part: ["snippet"],
    q: "GTA 6",
    type: ["video"],
    order: "viewCount",
    regionCode: code,
    relevanceLanguage: "en",
    publishedAfter: since,
    maxResults: perRegion,
  });
  for (const it of r.data.items || []) {
    const id = it.id?.videoId;
    if (!id || seen.has(id)) continue;
    seen.set(id, { id, region: code, regionName: name, channelId: it.snippet.channelId });
  }
}

const ids = [...seen.keys()];
const vids = await yt.videos.list({
  part: ["snippet", "statistics", "contentDetails"],
  id: ids.join(","),
  maxResults: 50,
});
const chanIds = [...new Set(vids.data.items.map((v) => v.snippet.channelId))];
const chans = await yt.channels.list({ part: ["statistics", "snippet"], id: chanIds.join(",") });
const subs = new Map(
  (chans.data.items || []).map((c) => [c.id, +c.statistics.subscriberCount]),
);

function seconds(iso) {
  const m = /^P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso || "");
  return m ? +m[1] * 86400 + +m[2] * 3600 + +m[3] * 60 + +m[4] : 0;
}

const rows = [];
for (const v of vids.data.items) {
  const s = subs.get(v.snippet.channelId) || 0;
  const views = +v.statistics.viewCount;
  rows.push({
    id: v.id,
    region: seen.get(v.id).region,
    channel: v.snippet.channelTitle,
    channelId: v.snippet.channelId,
    subs: s,
    views,
    ratio: s ? +(views / s).toFixed(1) : null,
    dur: seconds(v.contentDetails.duration),
    published: v.snippet.publishedAt.slice(0, 16),
    title: v.snippet.title,
    desc: (v.snippet.description || "").replace(/\s+/g, " ").slice(0, 240),
  });
}

// mid-size channels first: comments get seen, creators reply
const eligible = rows
  .filter((r) => r.subs >= 2_000 && r.subs <= 400_000 && r.views >= 500)
  .sort((a, b) => b.ratio - a.ratio);

console.log(`\n=== OUTREACH CANDIDATES (last ${hours}h, region-biased) ===`);
console.log(`${rows.length} unique videos · ${eligible.length} in the 2K–400K sub band\n`);
for (const r of eligible) {
  const flag = /[^\x00-\x7F]/.test(r.title) ? "non-ascii" : "en";
  console.log(`[${r.region}] ${r.id}  ${String(r.subs).padStart(6)} subs  ${String(r.views).padStart(7)}v  ${r.ratio}x  ${String(r.dur).padStart(4)}s  ${flag}  ${r.channel.slice(0, 24)}`);
  console.log(`     ${r.title.slice(0, 92)}`);
  console.log(`     ${r.desc.slice(0, 150)}`);
  console.log("");
}
const out = join(root, "..", "yt", "story", `outreach-targets-${new Date().toISOString().slice(0, 10)}.json`);
const { writeFile, mkdir } = await import("node:fs/promises");
await mkdir(dirname(out), { recursive: true });
await writeFile(out, JSON.stringify(eligible, null, 2));
console.log(`wrote ${out}\nquota: ~${REGIONS.length * 100 + 2}`);
