#!/usr/bin/env node
// trend-scan — evidence for story-pipeline stage 1 and thumbnail-hooks pattern refresh.
//
// Usage:
//   node scripts/trend-scan.mjs "GTA 6 cheat codes" 7
//   node scripts/trend-scan.mjs "gta 6 tips" 30 15
//
// Costs ~100 quota units per query (search.list = 100) + ~2 for details.
// Output: ranked videos with view/sub ratio, duration band, and a summary block
// (median views, median ratio, short vs long mix) that the skills quote directly.

import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

const root = dirname(fileURLToPath(import.meta.url));

async function client() {
  const clientSecret = JSON.parse(
    await readFile(join(root, "..", "src", "config", "tokens.json"), "utf8"),
  ).installed;
  const tokens = JSON.parse(
    await readFile(
      join(homedir(), ".config", "youtube-studio-mcp", "tokens.json"),
      "utf8",
    ),
  );
  const oauth = new OAuth2Client(
    clientSecret.client_id,
    clientSecret.client_secret,
  );
  oauth.setCredentials({ refresh_token: tokens.refresh_token });
  return google.youtube({ version: "v3", auth: oauth });
}

const query = process.argv[2];
if (!query) {
  console.error('usage: node scripts/trend-scan.mjs "<query>" [days=7] [maxResults=10]');
  process.exit(1);
}
const days = Math.max(1, parseInt(process.argv[3] || "7", 10));
const maxResults = Math.min(25, Math.max(1, parseInt(process.argv[4] || "10", 10)));
const since = new Date(Date.now() - days * 86_400_000).toISOString();

const yt = await client();

const search = await yt.search.list({
  part: ["snippet"],
  q: query,
  order: "viewCount",
  type: ["video"],
  publishedAfter: since,
  maxResults,
});
const ids = (search.data.items || []).map((i) => i.id?.videoId).filter(Boolean);
if (!ids.length) {
  console.log(`No videos for "${query}" in the last ${days} days.`);
  process.exit(0);
}

const vids = await yt.videos.list({
  part: ["snippet", "statistics", "contentDetails"],
  id: ids.join(","),
});

const chanIds = [...new Set(vids.data.items.map((v) => v.snippet.channelId))];
const chans = await yt.channels.list({ part: ["statistics"], id: chanIds.join(",") });
const subs = new Map(
  (chans.data.items || []).map((c) => [c.id, +c.statistics.subscriberCount]),
);

function seconds(iso) {
  const m = /^P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso || "");
  if (!m) return 0;
  return (+(m[1] || 0)) * 86400 + (+(m[2] || 0)) * 3600 + (+(m[3] || 0)) * 60 + (+(m[4] || 0));
}

const median = (a) => {
  if (!a.length) return 0;
  const s = [...a].sort((x, y) => x - y);
  const mid = s.length >> 1;
  return s.length % 2 ? s[mid] : Math.round((s[mid - 1] + s[mid]) / 2);
};

const rows = vids.data.items
  .map((v) => {
    const views = +v.statistics.viewCount;
    const s = subs.get(v.snippet.channelId) || 0;
    return {
      id: v.id,
      title: v.snippet.title.replace(/\s+/g, " ").trim(),
      channel: v.snippet.channelTitle,
      views,
      subs: s,
      ratio: s ? +(views / s).toFixed(1) : null,
      dur: seconds(v.contentDetails.duration),
      when: v.snippet.publishedAt.slice(0, 10),
    };
  })
  .sort((a, b) => b.views - a.views);

console.log(`\n=== TREND SCAN: "${query}" | last ${days}d | ${rows.length} videos ===\n`);
console.log("     views  ratio    subs  len  date        channel :: title");
for (const r of rows) {
  console.log(
    `${String(r.views).padStart(9)}v ${String(r.ratio ?? "-").padStart(6)}x ${String(r.subs).padStart(7)}  ${String(r.dur).padStart(4)}s ${r.when}  ${r.channel.slice(0, 20)} :: ${r.title.slice(0, 62)}`,
  );
}

const ratios = rows.map((r) => r.ratio).filter((r) => r != null);
const shorts = rows.filter((r) => r.dur < 90).length;
const longs = rows.filter((r) => r.dur >= 300).length;
console.log("\n=== SUMMARY (quote these in story.md §1) ===");
console.log(`median views : ${median(rows.map((r) => r.views)).toLocaleString()}`);
console.log(`median ratio : ${median(ratios)}x subs`);
console.log(`top outlier  : ${rows[0].ratio ?? "-"}x (${rows[0].channel})`);
console.log(`length mix   : ${shorts} short (<90s) / ${rows.length - shorts - longs} mid / ${longs} long (5m+)`);
console.log(`shorts median: ${median(rows.filter((r) => r.dur < 90).map((r) => r.views)).toLocaleString()} views`);
console.log(`long median  : ${median(rows.filter((r) => r.dur >= 300).map((r) => r.views)).toLocaleString()} views`);
console.log(`\nquota: ~102 units`);
