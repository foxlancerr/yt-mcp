#!/usr/bin/env node
// Full channel status: identity, stats, status flags, scheduled/upcoming videos, 7-day pulse.
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
const CHID = "UCDtw5Rb0c4QONw5Ko789lig";

const ch = await yt.channels.list({ part: ["snippet", "statistics", "status"], mine: true });
const c = ch.data.items[0];
console.log("=== CHANNEL ===");
console.log(`name: ${c.snippet.title} | id: ${c.id}`);
console.log(`subs: ${c.statistics.subscriberCount} | views: ${c.statistics.viewCount} | videos: ${c.statistics.videoCount} | comments: ${c.statistics.commentCount}`);
console.log(`privacyStatus: ${c.status.privacyStatus} | madeForKids: ${c.status.madeForKids} | longUploads: ${c.status.longUploadsStatus} | linked: ${c.status.isLinked}`);

// all videos incl. scheduled
let page = "";
const rows = [];
do {
  const r = await yt.search.list({ part: ["snippet"], forMine: true, type: ["video"], maxResults: 50, order: "date", pageToken: page });
  for (const it of r.data.items) rows.push(it.id.videoId);
  page = r.data.nextPageToken || "";
} while (page);

const details = [];
for (let i = 0; i < rows.length; i += 50) {
  const d = await yt.videos.list({ part: ["snippet", "statistics", "status"], id: rows.slice(i, i + 50).join(",") });
  details.push(...d.data.items);
}

const scheduled = details.filter((v) => v.status.privacyStatus === "scheduled");
const priv = details.filter((v) => v.status.privacyStatus === "private");
const pub = details.filter((v) => v.status.privacyStatus === "public");

console.log("\n=== STATUS COUNTS ===");
console.log(`public: ${pub.length} | scheduled: ${scheduled.length} | private: ${priv.length}`);

console.log("\n=== SCHEDULED (upcoming) ===");
for (const v of scheduled.sort((a, b) => (a.status.publishAt || "").localeCompare(b.status.publishAt || ""))) {
  console.log(`${v.status.publishAt}  ${v.id}  ${v.snippet.title.slice(0, 60)}`);
}
console.log("\n=== PRIVATE (unpublished drafts/renders) ===");
for (const v of priv) {
  console.log(`${v.snippet.publishedAt.slice(0, 10)}  ${v.id}  ${v.snippet.title.slice(0, 60)}`);
}

console.log("\n=== LATEST PUBLIC (top 5 by date) ===");
for (const v of pub.sort((a, b) => b.snippet.publishedAt.localeCompare(a.snippet.publishedAt)).slice(0, 5)) {
  console.log(`${v.snippet.publishedAt.slice(0, 16)}  ${v.id}  ${String(v.statistics.viewCount).padStart(3)}v  ${v.snippet.title.slice(0, 55)}`);
}

// 7-day pulse
try {
  const rep = await yta.reports.query({
    ids: `channel==${CHID}`, startDate: "2026-11-11", endDate: "2026-11-18",
    metrics: "views,estimatedMinutesWatched,subscribersGained,subscribersLost",
  });
  const row = rep.data.rows?.[0] || [0, 0, 0, 0];
  console.log("\n=== LAST 7 DAYS ===");
  console.log(`views: ${row[0]} | watch minutes: ${row[1]} | subs gained: ${row[2]} | subs lost: ${row[3]}`);
} catch (e) { console.log("analytics err:", e.message); }
