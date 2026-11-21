#!/usr/bin/env node
// Find CC-BY licensed sources for a query. The channel may only re-cut footage it owns
// or footage published under Creative Commons (see yt/gta6-clips/clips/*/source.md).
//
// Usage:
//   node scripts/cc-search.mjs "GTA 6 Mandy sink" 7
//   node scripts/cc-search.mjs "gta 6 gameplay" 30 20
//
// Costs ~100 quota units per run (search.list) + ~2 for details.

import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

const root = dirname(fileURLToPath(import.meta.url));

async function yt() {
  const cs = JSON.parse(
    await readFile(join(root, "..", "src", "config", "tokens.json"), "utf8"),
  ).installed;
  const tk = JSON.parse(
    await readFile(join(homedir(), ".config", "youtube-studio-mcp", "tokens.json"), "utf8"),
  );
  const oauth = new OAuth2Client(cs.client_id, cs.client_secret);
  oauth.setCredentials({ refresh_token: tk.refresh_token });
  return google.youtube({ version: "v3", auth: oauth });
}

const query = process.argv[2];
if (!query) {
  console.error('usage: node scripts/cc-search.mjs "<query>" [days=7] [max=15]');
  process.exit(1);
}
const days = Number(process.argv[3] ?? 7);
const max = Number(process.argv[4] ?? 15);

const api = await yt();
const since = new Date(Date.now() - days * 864e5).toISOString();

const search = await api.search.list({
  part: ["id"],
  q: query,
  type: ["video"],
  order: "viewCount",
  maxResults: 50,
  publishedAfter: since,
  videoLicense: "creativeCommon",
  videoEmbeddable: "true",
  safeSearch: "none",
});

const ids = (search.data.items ?? []).map((i) => i.id.videoId).filter(Boolean).slice(0, max);
if (!ids.length) {
  console.log(`\n=== CC SOURCES: "${query}" | last ${days}d ===\n\nnone found\n\nquota: ~100 units`);
  process.exit(0);
}

const vids = await api.videos.list({
  part: ["snippet", "statistics", "status", "contentDetails"],
  id: ids.join(","),
});

const rows = vids.data.items.map((v) => {
  const d = v.contentDetails.duration;
  const m = d.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  const secs = (+(m?.[1] ?? 0)) * 3600 + (+(m?.[2] ?? 0)) * 60 + (+(m?.[3] ?? 0));
  const len = secs >= 60 ? `${Math.floor(secs / 60)}m${String(secs % 60).padStart(2, "0")}s` : `${secs}s`;
  const views = +(v.statistics.viewCount ?? 0);
  const subs = 0;
  return {
    id: v.id,
    title: v.snippet.title,
    channel: v.snippet.channelTitle,
    len,
    secs,
    views,
    license: v.status.license,
    lang: v.snippet.defaultAudioLanguage || v.snippet.defaultLanguage || "?",
    date: v.snippet.publishedAt.slice(0, 10),
    subs,
  };
});

console.log(`\n=== CC SOURCES: "${query}" | last ${days}d | ${rows.length} videos ===\n`);
console.log("     views  len    date        lang  id           channel :: title");
for (const r of rows) {
  console.log(
    `${String(r.views).padStart(10)}  ${r.len.padEnd(6)} ${r.date}  ${String(r.lang).padEnd(5)} ${r.id}  ${r.channel} :: ${r.title.slice(0, 78)}`,
  );
}
console.log(`\nOnly these can be re-cut without written permission. Record channel + URL in source.md.\n`);
console.log(`quota: ~102 units`);
