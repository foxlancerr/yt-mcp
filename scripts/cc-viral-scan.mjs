#!/usr/bin/env node
// cc-viral-scan - find recent high-view YouTube videos that carry the Creative Commons (CC BY) license.
// Usage: node scripts/cc-viral-scan.mjs 30 "funny" "story" "reaction"   (days, then queries)
// Cost: ~100 quota units per query + ~3 for details. Licence is re-verified via videos.list status.license.
import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

const root = dirname(fileURLToPath(import.meta.url));
const cs = JSON.parse(await readFile(join(root, "..", "src", "config", "tokens.json"), "utf8")).installed;
const tk = JSON.parse(await readFile(join(homedir(), ".config", "youtube-studio-mcp", "tokens.json"), "utf8"));
const oauth = new OAuth2Client(cs.client_id, cs.client_secret);
oauth.setCredentials({ refresh_token: tk.refresh_token });
const yt = google.youtube({ version: "v3", auth: oauth });

const days = parseInt(process.argv[2] || "30", 10);
const queries = process.argv.slice(3);
if (!queries.length) queries.push("");
const since = new Date(Date.now() - days * 86_400_000).toISOString();
const ids = new Set();
for (const q of queries) {
  const r = await yt.search.list({
    part: ["snippet"], type: ["video"], order: "viewCount", videoLicense: "creativeCommon",
    publishedAfter: since, regionCode: "US", maxResults: 15, ...(process.env.DUR ? { videoDuration: process.env.DUR } : {}), ...(process.env.LANG_ ? { relevanceLanguage: process.env.LANG_ } : {}), ...(q ? { q } : {}),
  });
  (r.data.items || []).forEach((i) => i.id?.videoId && ids.add(i.id.videoId));
}
const v = await yt.videos.list({ part: ["snippet", "statistics", "contentDetails", "status"], id: [...ids].slice(0, 50).join(",") });
const ch = await yt.channels.list({ part: ["statistics"], id: [...new Set(v.data.items.map((x) => x.snippet.channelId))].join(",") });
const subs = new Map((ch.data.items || []).map((c) => [c.id, +c.statistics.subscriberCount]));
const sec = (iso) => { const m = /^P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso || ""); return m ? (+(m[1]||0))*86400+(+(m[2]||0))*3600+(+(m[3]||0))*60+(+(m[4]||0)) : 0; };
const rows = v.data.items.filter((x) => x.status.license === "creativeCommon").map((x) => ({
  id: x.id, title: x.snippet.title.replace(/\s+/g, " "), ch: x.snippet.channelTitle, views: +x.statistics.viewCount,
  likes: +(x.statistics.likeCount || 0), comments: +(x.statistics.commentCount || 0), subs: subs.get(x.snippet.channelId) || 0,
  dur: sec(x.contentDetails.duration), when: x.snippet.publishedAt.slice(0, 10), lic: x.status.license, emb: x.status.embeddable,
})).sort((a, b) => b.views - a.views);
console.log(`CC videos (verified license=creativeCommon), last ${days}d: ${rows.length}\n`);
for (const r of rows) console.log(`${r.id} | ${r.views}v ${r.likes}L ${r.comments}c | subs ${r.subs} (${r.subs ? (r.views / r.subs).toFixed(1) : "-"}x) | ${r.dur}s | ${r.when} | ${r.ch.slice(0,22)} :: ${r.title.slice(0,70)}`);
console.log(`\nquota ~${queries.length * 100 + 3}`);
