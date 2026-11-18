// Back-catalog audit: ALL my public videos — metadata completeness + stats.
// Usage: node scripts/catalog-audit.mjs
import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import { google } from "googleapis";

const base = join(homedir(), ".config", "youtube-studio-mcp");
const tokens = JSON.parse(await readFile(join(base, "tokens.json"), "utf8"));
const secret = JSON.parse(await readFile(join(base, "client_secret.json"), "utf8")).installed;

const auth = new google.auth.OAuth2({ clientId: secret.client_id, clientSecret: secret.client_secret });
auth.setCredentials({ refresh_token: tokens.refresh_token });
const yt = google.youtube({ version: "v3", auth });

const ch = (await yt.channels.list({ part: ["contentDetails", "statistics"], mine: true })).data.items?.[0];
const uploads = ch.contentDetails?.relatedPlaylists?.uploads;

// page through ALL uploads
let items = [], page = undefined;
do {
  const pl = await yt.playlistItems.list({
    part: ["contentDetails", "status"], playlistId: uploads, maxResults: 50, pageToken: page,
  });
  items.push(...(pl.data.items ?? []).filter((i) => i.status?.privacyStatus === "public"));
  page = pl.data.nextPageToken;
} while (page);

const ids = items.map((i) => i.contentDetails.videoId);
const vids = [];
for (let i = 0; i < ids.length; i += 50) {
  const r = await yt.videos.list({ part: ["snippet", "statistics", "status", "contentDetails"], id: ids.slice(i, i + 50) });
  vids.push(...(r.data.items ?? []));
}

const toSec = (iso) => { const m = String(iso).match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/); return m ? (+m[1]||0)*3600 + (+m[2]||0)*60 + (+m[3]||0) : 0; };

const rows = vids.map((v) => ({
  id: v.id,
  pub: (v.snippet?.publishedAt ?? "").slice(0, 10),
  views: +(v.statistics?.viewCount ?? 0),
  durSec: toSec(v.contentDetails?.duration),
  title: v.snippet?.title,
  titleLen: v.snippet?.title?.length ?? 0,
  cat: v.snippet?.categoryId,
  tags: v.snippet?.tags ?? [],
  tagCount: v.snippet?.tags?.length ?? 0,
  descLen: v.snippet?.description?.length ?? 0,
  descHead: (v.snippet?.description ?? "").slice(0, 90).replace(/\n/g, " "),
  hasOhBhai: /ohbhai/i.test((v.snippet?.description ?? "") + (v.snippet?.title ?? "")),
  hasHashtagInTitle: /#\w+/.test(v.snippet?.title ?? ""),
  locs: Object.keys(v.localizations ?? {}).length,
})).sort((a, b) => a.views - b.views);

console.log(JSON.stringify({ channelViews: ch.statistics?.viewCount, count: rows.length, rows }, null, 1));
