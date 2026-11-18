#!/usr/bin/env node
// What search terms actually bring views + what related videos send traffic.
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
const yta = google.youtubeAnalytics({ version: "v2", auth: oauth });
const CH = "channel==UCDtw5Rb0c4QONw5Ko789lig";

const q = async (dims, filters, metrics, max = 50) => {
  const r = await yta.reports.query({
    ids: CH,
    startDate: "2026-10-20",
    endDate: "2026-11-18",
    metrics,
    dimensions: dims,
    filters,
    sort: "-" + metrics.split(",")[0],
    maxResults: max,
  });
  return r.data.rows || [];
};

console.log("=== SEARCH TERMS THAT BROUGHT VIEWS ===");
try {
  const rows = await q("insightTrafficSourceDetail", "insightTrafficSourceType==YT_SEARCH", "views,estimatedMinutesWatched");
  if (!rows.length) console.log("(none reported)");
  for (const r of rows) console.log(String(r[0]).padEnd(52), String(r[1]).padStart(4), "views", String(Math.round(r[2])).padStart(3), "min");
} catch (e) {
  console.log("search err:", e.message);
}

console.log("\n=== VIDEOS THAT SENT TRAFFIC (related/suggested source videos) ===");
try {
  const rows = await q("insightTrafficSourceDetail", "insightTrafficSourceType==RELATED_VIDEO", "views");
  if (!rows.length) console.log("(none reported)");
  for (const r of rows) console.log(String(r[1]).padStart(3), "views  ", r[0]);
} catch (e) {
  console.log("related err:", e.message);
}

console.log("\n=== TOP EXTERNAL SOURCES ===");
try {
  const rows = await q("insightTrafficSourceDetail", "insightTrafficSourceType==EXT_URL", "views");
  if (!rows.length) console.log("(none reported)");
  for (const r of rows) console.log(String(r[1]).padStart(3), "views  ", r[0]);
} catch (e) {
  console.log("ext err:", e.message);
}
