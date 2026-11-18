#!/usr/bin/env node
// GTA 6 launch-wave trend scan: multiple pain-point queries -> top viral videos.
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
  await readFile(
    join(homedir(), ".config", "youtube-studio-mcp", "tokens.json"), "utf8",
  ),
);
const oauth = new OAuth2Client(clientSecret.client_id, clientSecret.client_secret);
oauth.setCredentials({ refresh_token: tokens.refresh_token });
const yt = google.youtube({ version: "v3", auth: oauth });

const queries = [
  "GTA 6 before you start playing",
  "GTA 6 mistakes to avoid",
  "GTA 6 tips tricks beginners",
  "GTA 6 spoilers",
  "GTA 6 first things to do",
];

const out = [];
for (const q of queries) {
  const search = await yt.search.list({
    part: ["snippet"], q, order: "viewCount", type: ["video"],
    publishedAfter: "2026-11-15T00:00:00Z", maxResults: 8,
  });
  const ids = search.data.items.map((i) => i.id.videoId).join(",");
  if (!ids) continue;
  const vids = await yt.videos.list({ part: ["snippet,statistics"], id: ids });
  for (const v of vids.data.items) {
    out.push({
      q,
      id: v.id,
      title: v.snippet.title.replace(/\s+/g, " ").slice(0, 70),
      ch: v.snippet.channelTitle.slice(0, 22),
      views: +v.statistics.viewCount,
      when: v.snippet.publishedAt.slice(5, 10),
    });
  }
}
out.sort((a, b) => b.views - a.views);
for (const v of out) {
  console.log(`${String(v.views).padStart(8)}v ${v.when} [${v.q.slice(6, 24)}] ${v.ch} :: ${v.title}`);
}
