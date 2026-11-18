#!/usr/bin/env node
// Dump every video in a playlist with full snippet + status, so a description
// rewrite can be previewed without guessing. Read-only (2 quota units).
//
// Usage: node scripts/playlist-audit.mjs PLRXf1uVlif1Q
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { homedir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

const root = dirname(fileURLToPath(import.meta.url));
const playlistId = process.argv[2];
if (!playlistId) {
  console.error("usage: node scripts/playlist-audit.mjs <playlistId> [--out <path>]");
  process.exit(1);
}

const clientSecret = JSON.parse(
  await readFile(join(root, "..", "src", "config", "tokens.json"), "utf8"),
).installed;
const tokens = JSON.parse(
  await readFile(join(homedir(), ".config", "youtube-studio-mcp", "tokens.json"), "utf8"),
);
const oauth = new OAuth2Client(clientSecret.client_id, clientSecret.client_secret);
oauth.setCredentials({ refresh_token: tokens.refresh_token });
const yt = google.youtube({ version: "v3", auth: oauth });

const pl = await yt.playlists.list({ part: ["snippet", "contentDetails"], id: playlistId });
const meta = pl.data.items?.[0];
if (!meta) {
  console.error("playlist not found");
  process.exit(1);
}

const items = [];
let pageToken = "";
do {
  const r = await yt.playlistItems.list({
    part: ["contentDetails", "snippet"],
    playlistId,
    maxResults: 50,
    pageToken: pageToken || undefined,
  });
  items.push(...(r.data.items || []));
  pageToken = r.data.nextPageToken || "";
} while (pageToken);

const ids = items.map((i) => i.contentDetails.videoId);
const vids = await yt.videos.list({
  part: ["snippet", "statistics", "status", "contentDetails"],
  id: ids.join(","),
  maxResults: 50,
});

const byId = new Map(vids.data.items.map((v) => [v.id, v]));
const out = [];
for (let idx = 0; idx < ids.length; idx++) {
  const v = byId.get(ids[idx]);
  if (!v) continue;
  const d = v.snippet.description || "";
  const chapters = d
    .split("\n")
    .filter((l) => /^\d{1,2}:\d{2}(:\d{2})?\s+\S/.test(l.trim()))
    .map((l) => l.trim());
  const hashtags = d.match(/#[\p{L}\p{N}_]+/gu) || [];
  out.push({
    position: idx + 1,
    id: v.id,
    title: v.snippet.title,
    publishedAt: v.snippet.publishedAt,
    privacy: v.status.privacyStatus,
    publishAt: v.status.publishAt || null,
    views: +v.statistics.viewCount,
    duration: v.contentDetails.duration,
    tags: v.snippet.tags || [],
    hashtags,
    chapters,
    description: d,
  });
}

const payload = {
  playlist: {
    id: playlistId,
    title: meta.snippet.title,
    description: meta.snippet.description,
    itemCount: meta.contentDetails.itemCount,
    privacy: meta.status?.privacyStatus,
  },
  fetchedAt: new Date().toISOString(),
  videos: out,
};

const outArgIdx = process.argv.indexOf("--out");
const outPath =
  outArgIdx > -1
    ? process.argv[outArgIdx + 1]
    : join(root, "..", "yt", "story", `playlist-audit-${playlistId}.json`);
await mkdir(dirname(outPath), { recursive: true });
await writeFile(outPath, JSON.stringify(payload, null, 2));

console.log(`playlist: ${meta.snippet.title} (${meta.contentDetails.itemCount} items)`);
console.log(`videos dumped: ${out.length}\n`);
for (const v of out) {
  console.log(
    `${String(v.position).padStart(2)}. ${v.id}  ${v.privacy.padEnd(8)} ${String(v.views).padStart(5)}v  tags:${String(v.tags.length).padStart(2)}  #${v.hashtags.length}  chapters:${v.chapters.length}  ${v.title.slice(0, 55)}`,
  );
}
console.log(`\nwrote ${outPath}\nquota: ~2 units`);
