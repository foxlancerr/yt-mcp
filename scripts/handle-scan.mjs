#!/usr/bin/env node
// handle-scan — recent uploads of given handles with stats (Data API, ~1 unit per call).
// Usage: node scripts/handle-scan.mjs "@DiGTA6,@AlinaRin" [pages=3] [outfile.json]
import { readFile, writeFile } from "node:fs/promises";
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
const handles = (process.argv[2] || "").split(",").map(s => s.trim()).filter(Boolean);
const pages = Number(process.argv[3] || 3);
const out = process.argv[4];
let units = 0; const result = [];
const dur = s => { const m = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/.exec(s || ""); if (!m) return 0; return (+m[1] || 0) * 3600 + (+m[2] || 0) * 60 + (+m[3] || 0); };
for (const h of handles) {
  const c = await yt.channels.list({ part: "snippet,statistics,contentDetails", forHandle: h }); units++;
  const ch = c.data.items?.[0];
  if (!ch) { console.log(`\n## ${h}: NOT FOUND`); continue; }
  const up = ch.contentDetails.relatedPlaylists.uploads;
  console.log(`\n## ${h} | ${ch.snippet.title} | subs ${ch.statistics.hiddenSubscriberCount ? "hidden" : ch.statistics.subscriberCount} | videos ${ch.statistics.videoCount} | views ${ch.statistics.viewCount} | country ${ch.snippet.country || "?"} | id ${ch.id}`);
  console.log(`about: ${(ch.snippet.description || "").replace(/\s+/g, " ").slice(0, 200)}`);
  let tok, ids = [];
  for (let p = 0; p < pages; p++) {
    const r = await yt.playlistItems.list({ part: "contentDetails", playlistId: up, maxResults: 50, pageToken: tok }); units++;
    ids.push(...r.data.items.map(i => i.contentDetails.videoId)); tok = r.data.nextPageToken; if (!tok) break;
  }
  const vids = [];
  for (let i = 0; i < ids.length; i += 50) {
    const r = await yt.videos.list({ part: "snippet,statistics,contentDetails", id: ids.slice(i, i + 50).join(",") }); units++;
    vids.push(...r.data.items);
  }
  const rows = vids.map(v => ({ id: v.id, title: v.snippet.title, pub: v.snippet.publishedAt.slice(0, 10), views: +v.statistics.viewCount || 0, likes: +v.statistics.likeCount || 0, comments: +v.statistics.commentCount || 0, sec: dur(v.contentDetails.duration), desc: (v.snippet.description || "").slice(0, 300), live: v.snippet.liveBroadcastContent }));
  result.push({ handle: h, channel: ch.snippet.title, id: ch.id, subs: ch.statistics.subscriberCount, rows });
  const g = rows.filter(r => /gta\s?(6|vi)\b|lucia|jason|leonida|vice city/i.test(r.title + " " + r.desc));
  console.log(`fetched ${rows.length}, GTA6-matching ${g.length}`);
  for (const r of g.sort((a, b) => b.views - a.views).slice(0, 15)) console.log(`${r.views}\t${r.pub}\t${r.sec}s\t${r.id}\t${r.title}`);
}
console.log(`\nquota units ~${units}`);
if (out) await writeFile(out, JSON.stringify(result, null, 1));
