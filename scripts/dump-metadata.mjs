#!/usr/bin/env node
// Dump current public-video metadata for offline editing/planning.
import { readFile, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

const root = dirname(fileURLToPath(import.meta.url));
const secret = JSON.parse(
  await readFile(join(root, "..", "src", "config", "tokens.json"), "utf8"),
).installed;
const tokens = JSON.parse(
  await readFile(join(homedir(), ".config", "youtube-studio-mcp", "tokens.json"), "utf8"),
);
const oauth = new OAuth2Client(secret.client_id, secret.client_secret);
oauth.setCredentials({ refresh_token: tokens.refresh_token });
const yt = google.youtube({ version: "v3", auth: oauth });

const up = await yt.playlistItems.list({
  part: ["contentDetails"],
  playlistId: "UUDtw5Rb0c4QONw5Ko789lig",
  maxResults: 50,
});
const ids = up.data.items.map((i) => i.contentDetails.videoId);
const vids = (await yt.videos.list({
  part: ["snippet", "status", "contentDetails", "statistics"],
  id: ids.join(","),
  maxResults: 50,
})).data.items;

const out = vids
  .filter((v) => v.status.privacyStatus === "public")
  .map((v) => ({
    id: v.id,
    title: v.snippet.title,
    chars: v.snippet.title.length,
    publishedAt: v.snippet.publishedAt,
    categoryId: v.snippet.categoryId,
    defaultLanguage: v.snippet.defaultLanguage || null,
    tags: v.snippet.tags || [],
    description: v.snippet.description,
    descLen: (v.snippet.description || "").length,
    views: +v.statistics.viewCount,
  }))
  .sort((a, b) => (a.publishedAt < b.publishedAt ? -1 : 1));

await writeFile(join(root, "..", "docs", "metadata-dump.json"), JSON.stringify(out, null, 2), "utf8");
console.log(`wrote ${out.length} public videos to docs/metadata-dump.json`);
for (const v of out) console.log(v.id, String(v.chars).padStart(3), String(v.tags.length).padStart(3), "tags", String(v.descLen).padStart(5), "desc", v.title.slice(0, 60));
