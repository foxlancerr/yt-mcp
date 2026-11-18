#!/usr/bin/env node
// Channel performance snapshot: totals, per-video stats, retention + traffic sources.
import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

const root = dirname(fileURLToPath(import.meta.url));
const clientSecret = JSON.parse(
  await readFile(join(root, "..", "src", "config", "tokens.json"), "utf8"),
).installed;
const tokens = JSON.parse(
  await readFile(join(homedir(), ".config", "youtube-studio-mcp", "tokens.json"), "utf8"),
);
const oauth = new OAuth2Client(clientSecret.client_id, clientSecret.client_secret);
oauth.setCredentials({ refresh_token: tokens.refresh_token });
const yt = google.youtube({ version: "v3", auth: oauth });
const yta = google.youtubeAnalytics({ version: "v2", auth: oauth });
const CH = "channel==UCDtw5Rb0c4QONw5Ko789lig";

// 1) channel totals
const ch = await yt.channels.list({ part: ["statistics"], mine: true });
const s = ch.data.items[0].statistics;
console.log("=== CHANNEL TOTALS ===");
console.log(`subs=${s.subscriberCount} views=${s.viewCount} videos=${s.videoCount}`);

// 2) per-video public stats (recent first)
let page = "";
const ids = [];
do {
  const r = await yt.search.list({ part: ["snippet"], forMine: true, type: ["video"], maxResults: 50, order: "date", pageToken: page });
  for (const it of r.data.items) ids.push(it.id.videoId);
  page = r.data.nextPageToken || "";
} while (page);
const out = [];
for (let i = 0; i < ids.length; i += 50) {
  const d = await yt.videos.list({ part: ["snippet,statistics,status", "contentDetails"], id: ids.slice(i, i + 50).join(",") });
  for (const v of d.data.items) {
    out.push({
      id: v.id,
      t: v.snippet.title.slice(0, 44),
      live: v.snippet.publishedAt.slice(0, 10),
      priv: v.status.privacyStatus,
      v: +v.statistics.viewCount,
      likes: +v.statistics.likeCount,
      comments: +v.statistics.commentCount,
    });
  }
}
console.log("=== PER-VIDEO (public) ===");
for (const v of out.filter(x => x.priv === "public").sort((a, b) => b.v - a.v)) {
  console.log(`${String(v.v).padStart(4)}v ${String(v.likes).padStart(3)}L ${String(v.comments).padStart(3)}C ${v.live} ${v.id} ${v.t}`);
}

// 3) analytics: retention + watch time by video, last 28 days
try {
  const rep = await yta.reports.query({
    ids: CH, startDate: "2026-10-21", endDate: "2026-11-18",
    metrics: "views,estimatedMinutesWatched,averageViewDuration,subscribersGained",
    dimensions: "video", sort: "-views", maxResults: 15,
  });
  console.log("=== ANALYTICS per video (28d) ===");
  for (const row of rep.data.rows || []) {
    console.log(row.map(String).join(" | "));
  }
} catch (e) { console.log("analytics video err:", e.message); }

// 4) traffic sources, last 14 days
try {
  const rep = await yta.reports.query({
    ids: CH, startDate: "2026-11-05", endDate: "2026-11-18",
    metrics: "views,estimatedMinutesWatched,averageViewDuration",
    dimensions: "insightTrafficSource", sort: "-views",
  });
  console.log("=== TRAFFIC SOURCES (14d) ===");
  for (const row of rep.data.rows || []) console.log(row.map(String).join(" | "));
} catch (e) { console.log("traffic err:", e.message); }

// 5) impressions & CTR where available
try {
  const rep = await yta.reports.query({
    ids: CH, startDate: "2026-10-21", endDate: "2026-11-18",
    metrics: "views,impressions,clickThroughRate,averageViewPercentage",
    dimensions: "video", sort: "-impressions", maxResults: 10,
  });
  console.log("=== IMPRESSIONS/CTR per video (28d) ===");
  for (const row of rep.data.rows || []) console.log(row.map(String).join(" | "));
} catch (e) { console.log("impressions err:", e.message); }
