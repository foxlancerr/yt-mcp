// Audit one of MY videos: full snippet + status + localizations + playlist membership.
// Usage: node scripts/audit-video.mjs <videoId>
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

const res = await yt.videos.list({
  part: ["snippet", "status", "statistics", "contentDetails", "localizations", "topicDetails", "player"],
  id: [videoId],
});
const v = res.data.items?.[0];
if (!v) { console.log(JSON.stringify({ error: "NOT_FOUND", videoId })); process.exit(0); }

// Which of my playlists contain this video?
const mine = await yt.playlists.list({ part: ["snippet"], mine: true, maxResults: 50 });
const memberships = [];
for (const pl of mine.data.items ?? []) {
  const items = await yt.playlistItems.list({ part: ["contentDetails"], playlistId: pl.id, maxResults: 50 });
  if (items.data.items?.some((i) => i.contentDetails?.videoId === videoId)) {
    memberships.push({ playlist: pl.snippet.title, id: pl.id });
  }
}

console.log(JSON.stringify({
  id: v.id,
  title: v.snippet?.title,
  titleLength: v.snippet?.title?.length ?? 0,
  description: v.snippet?.description,
  tags: v.snippet?.tags,
  categoryId: v.snippet?.categoryId,
  defaultAudioLanguage: v.snippet?.defaultAudioLanguage,
  publishedAt: v.snippet?.publishedAt,
  thumbnails: v.snippet?.thumbnails,
  privacyStatus: v.status?.privacyStatus,
  uploadStatus: v.status?.uploadStatus,
  publishAt: v.status?.publishAt,
  madeForKids: v.status?.madeForKids,
  license: v.status?.license,
  duration: v.contentDetails?.duration,
  dimension: v.contentDetails?.dimension,
  localizations: Object.keys(v.localizations ?? {}),
  viewCount: v.statistics?.viewCount,
  playlistMemberships: memberships,
}, null, 1));
