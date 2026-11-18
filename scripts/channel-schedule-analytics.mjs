#!/usr/bin/env node
// Schedule + analytics: publishAt queue, 28-day traffic/retention, per-video avg view duration.
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

const fmt = (d) => `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
const today = new Date();
const start = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - 27));

console.log("=== SCHEDULED QUEUE (publishAt, UTC) ===");
const up = await yt.playlistItems.list({
  part: ["contentDetails"],
  playlistId: "UUDtw5Rb0c4QONw5Ko789lig",
  maxResults: 50,
});
const ids = up.data.items.map((i) => i.contentDetails.videoId);
const vids = (await yt.videos.list({ part: ["snippet", "status", "contentDetails"], id: ids.join(",") })).data.items;
const sched = vids
  .filter((v) => v.status.publishAt && v.status.privacyStatus !== "public")
  .map((v) => ({
    at: v.status.publishAt,
    id: v.id,
    privacy: v.status.privacyStatus,
    title: v.snippet.title,
    len: v.contentDetails.duration,
  }))
  .sort((a, b) => (a.at < b.at ? -1 : 1));
for (const s of sched) console.log(s.at.padEnd(22), s.privacy.padEnd(8), s.id, s.len.padEnd(8), s.title.slice(0, 58));
console.log("total scheduled:", sched.length);

const byDay = {};
for (const s of sched) (byDay[s.at.slice(0, 10)] ||= []).push(s);
console.log("\n=== SCHEDULE BY DAY ===");
for (const d of Object.keys(byDay).sort()) console.log(d, "->", byDay[d].length);

console.log("\n=== ANALYTICS 28d (" + fmt(start) + " .. " + fmt(today) + ") ===");
try {
  const core = await yta.reports.query({
    ids: "channel==" + CHID,
    startDate: fmt(start),
    endDate: fmt(today),
    metrics: "views,estimatedMinutesWatched,averageViewDuration,subscribersGained,subscribersLost,likes,comments,shares",
  });
  console.log(JSON.stringify(core.data.rows, null, 0), "| cols:", core.data.columnHeaders.map((c) => c.name).join(","));
} catch (e) {
  console.log("core err:", e.message);
}

console.log("\n=== TRAFFIC SOURCES 28d ===");
try {
  const tr = await yta.reports.query({
    ids: "channel==" + CHID,
    startDate: fmt(start),
    endDate: fmt(today),
    metrics: "views,estimatedMinutesWatched",
    dimensions: "insightTrafficSourceType",
    sort: "-views",
  });
  for (const r of tr.data.rows || []) console.log(String(r[0]).padEnd(28), String(r[1]).padStart(5), "views", String(Math.round(r[2])).padStart(4), "min");
} catch (e) {
  console.log("traffic err:", e.message);
}

console.log("\n=== DEVICE / AGE 28d ===");
try {
  const ag = await yta.reports.query({
    ids: "channel==" + CHID,
    startDate: fmt(start),
    endDate: fmt(today),
    metrics: "viewerPercentage",
    dimensions: "ageGroup,gender",
    sort: "-viewerPercentage",
  });
  for (const r of ag.data.rows || []) console.log(String(r[0]).padEnd(10), String(r[1]).padEnd(8), r[2].toFixed(2) + "%");
} catch (e) {
  console.log("age err:", e.message);
}

console.log("\n=== PER-VIDEO RETENTION (lifetime, top 12 by views) ===");
try {
  const pv = await yta.reports.query({
    ids: "channel==" + CHID,
    startDate: "2026-11-01",
    endDate: fmt(today),
    metrics: "views,averageViewDuration,averageViewPercentage,estimatedMinutesWatched",
    dimensions: "video",
    sort: "-views",
    maxResults: 25,
  });
  const map = new Map(vids.map((v) => [v.id, v.snippet.title]));
  for (const r of pv.data.rows || []) {
    console.log(
      String(r[1]).padStart(4),
      "views",
      String(r[2]).padStart(4) + "s",
      String(r[3].toFixed(1)).padStart(5) + "%",
      String(Math.round(r[4])).padStart(4) + "min",
      String(r[0]).padEnd(12),
      (map.get(r[0]) || "?").slice(0, 52),
    );
  }
} catch (e) {
  console.log("pervideo err:", e.message);
}
