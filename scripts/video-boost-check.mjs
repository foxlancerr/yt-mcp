// Pre-boost analysis: video status + public stats + Analytics API (views, traffic, impressions if permitted).
// Usage: node scripts/video-boost-check.mjs <videoId>
import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import { google } from "googleapis";

const videoId = process.argv[2] ?? "NjwpwUcxo8Y";
const base = join(homedir(), ".config", "youtube-studio-mcp");
const tokens = JSON.parse(await readFile(join(base, "tokens.json"), "utf8"));
const secret = JSON.parse(await readFile(join(base, "client_secret.json"), "utf8")).installed;

const auth = new google.auth.OAuth2({ clientId: secret.client_id, clientSecret: secret.client_secret });
auth.setCredentials({ refresh_token: tokens.refresh_token });
const yt = google.youtube({ version: "v3", auth });
const yta = google.youtubeAnalytics({ version: "v2", auth });

const v = (await yt.videos.list({ part: ["status", "statistics", "snippet"], id: [videoId] })).data.items?.[0];
console.log(JSON.stringify({
  status: {
    privacyStatus: v?.status?.privacyStatus,
    publishAt: v?.status?.publishAt,
    uploadStatus: v?.status?.uploadStatus,
  },
  title: v?.snippet?.title,
  publishedAt: v?.snippet?.publishedAt,
  stats: v?.statistics ?? null,
}, null, 1));

try {
  const rep = await yta.reports.query({
    ids: "channel==MINE",
    filters: `video==${videoId}`,
    startDate: "2026-11-17",
    endDate: "2026-11-19",
    metrics: "views,estimatedMinutesWatched,averageViewDuration",
  });
  console.log("ANALYTICS_TOTALS:", JSON.stringify(rep.data.rows ?? rep.data, null, 1));

  const traffic = await yta.reports.query({
    ids: "channel==MINE",
    filters: `video==${videoId}`,
    segment: "insightTrafficSourceType",
    startDate: "2026-11-17",
    endDate: "2026-11-19",
    metrics: "views",
    sort: "-views",
  });
  console.log("TRAFFIC_SOURCES:", JSON.stringify(traffic.data.rows ?? traffic.data, null, 1));
} catch (e) {
  console.log("ANALYTICS_ERROR:", String(e?.message ?? e).slice(0, 300));
}
