#!/usr/bin/env node
// One-time brand cleanup: replace "OhBhai!" with "The Untold Exit" in video
// descriptions and tags across all channel videos. Pure find-replace — all other
// snippet fields are re-sent unchanged so nothing gets stripped.
import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

const root = dirname(fileURLToPath(import.meta.url));
const replaceBrand = (text) => text.replace(/ohbhai!?/gi, "The Untold Exit");

const clientSecret = JSON.parse(
  await readFile(join(root, "..", "src", "config", "tokens.json"), "utf8"),
).installed;
const tokens = JSON.parse(
  await readFile(
    process.env.YOUTUBE_TOKEN_PATH ??
      join(homedir(), ".config", "youtube-studio-mcp", "tokens.json"),
    "utf8",
  ),
);
const oauth = new OAuth2Client(clientSecret.client_id, clientSecret.client_secret);
oauth.setCredentials({ refresh_token: tokens.refresh_token });
const youtube = google.youtube({ version: "v3", auth: oauth });

// collect all my video IDs
let page = "";
const ids = [];
do {
  const r = await youtube.search.list({
    part: ["snippet"], forMine: true, type: ["video"], maxResults: 50, order: "date", pageToken: page,
  });
  for (const it of r.data.items) ids.push(it.id.videoId);
  page = r.data.nextPageToken || "";
} while (page);
console.log(`[${new Date().toISOString()}] found ${ids.length} videos`);

// fetch + fix + update, chunked
let cleaned = 0, skipped = 0, failed = 0;
for (let i = 0; i < ids.length; i += 25) {
  const chunk = ids.slice(i, i + 25);
  const d = await youtube.videos.list({ part: ["snippet"], id: chunk.join(",") });
  for (const v of d.data.items) {
    const s = v.snippet;
    const newDesc = replaceBrand(s.description || "");
    const seen = new Set();
    const newTags = (s.tags || []).map((t) => replaceBrand(t)).filter((t) => {
      const k = t.toLowerCase();
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
    const descChanged = newDesc !== (s.description || "");
    const tagsChanged = JSON.stringify(newTags) !== JSON.stringify(s.tags || []);
    if (!descChanged && !tagsChanged) { skipped++; continue; }
    try {
      await youtube.videos.update({
        part: ["snippet"],
        requestBody: {
          id: v.id,
          snippet: {
            title: s.title,
            description: newDesc,
            tags: newTags,
            categoryId: s.categoryId,
            defaultLanguage: s.defaultLanguage,
            defaultAudioLanguage: s.defaultAudioLanguage,
          },
        },
      });
      cleaned++;
      console.log(`[${new Date().toISOString()}] cleaned ${v.id} — "${s.title.slice(0, 40)}" desc:${descChanged} tags:${tagsChanged}`);
    } catch (err) {
      failed++;
      console.error(`[${new Date().toISOString()}] FAILED ${v.id}: ${err.message}`);
    }
  }
}

// channel description
try {
  const ch = await youtube.channels.list({ part: ["brandingSettings"], mine: true });
  const desc = ch.data.items?.[0]?.brandingSettings?.channel?.description || "";
  const newDesc = replaceBrand(desc);
  if (newDesc !== desc) {
    await youtube.channels.update({
      part: ["brandingSettings"],
      requestBody: {
        id: ch.data.items[0].id,
        brandingSettings: {
          channel: { ...ch.data.items[0].brandingSettings.channel, description: newDesc },
        },
      },
    });
    console.log(`[${new Date().toISOString()}] cleaned channel description`);
  } else {
    console.log(`[${new Date().toISOString()}] channel description has no OhBhai — skipped`);
  }
} catch (err) {
  console.error(`[${new Date().toISOString()}] channel description FAILED: ${err.message}`);
}

console.log(`[${new Date().toISOString()}] done: cleaned=${cleaned} skipped=${skipped} failed=${failed}`);
