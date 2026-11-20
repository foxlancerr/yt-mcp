// tag-scan: real tags/hashtags from the top GTA 6 videos + top GTA 6 Shorts (official Data API, ~104 units)
// usage: node scripts/tag-scan.mjs "gta 6" 3
import { readFile } from "node:fs/promises"; import { homedir } from "node:os"; import { join, dirname } from "node:path"; import { fileURLToPath } from "node:url";
import { OAuth2Client } from "google-auth-library"; import { google } from "googleapis";
const root = dirname(fileURLToPath(import.meta.url));
const cs = JSON.parse(await readFile(join(root, "..", "src", "config", "tokens.json"), "utf8")).installed;
const tk = JSON.parse(await readFile(join(homedir(), ".config", "youtube-studio-mcp", "tokens.json"), "utf8"));
const o = new OAuth2Client(cs.client_id, cs.client_secret); o.setCredentials({ refresh_token: tk.refresh_token });
const yt = google.youtube({ version: "v3", auth: o });
const q = process.argv[2] || "gta 6", days = +(process.argv[3] || 3);
const s = await yt.search.list({ part: ["snippet"], q, type: ["video"], videoDuration: "short", order: "viewCount", regionCode: "US", relevanceLanguage: "en",
  publishedAfter: new Date(Date.now() - days * 86400000).toISOString(), maxResults: 25 });
const ids = s.data.items.map((i) => i.id.videoId);
const v = await yt.videos.list({ part: ["snippet", "statistics", "contentDetails"], id: ids.join(",") });
const rows = v.data.items.map((x) => ({ t: x.snippet.title, ch: x.snippet.channelTitle, v: +x.statistics.viewCount, tags: x.snippet.tags || [], desc: x.snippet.description }))
  .sort((a, b) => b.v - a.v);
console.log("TOP GTA 6 SHORTS (<=60s), last", days, "days");
rows.slice(0, 12).forEach((r) => console.log(`${String(r.v).padStart(9)}v | ${r.ch.slice(0, 20)} :: ${r.t.slice(0, 80)}`));
const tc = new Map(), hc = new Map();
for (const r of rows) {
  for (const t of r.tags) tc.set(t.toLowerCase(), (tc.get(t.toLowerCase()) || 0) + 1);
  for (const h of (r.t + " " + r.desc).match(/#[\p{L}\p{N}_]+/gu) || []) hc.set(h.toLowerCase(), (hc.get(h.toLowerCase()) || 0) + 1);
}
const top = (m, n) => [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, n).map(([k, c]) => `${k} (${c})`).join(", ");
console.log("\nTOP TAGS (count of", rows.length, "shorts):", top(tc, 25));
console.log("\nTOP HASHTAGS:", top(hc, 20));
