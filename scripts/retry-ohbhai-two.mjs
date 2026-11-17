#!/usr/bin/env node
// Retry the 2 videos that failed the brand cleanup. Drops any tag matching
// /ohbhai/i outright (user asked: remove it) instead of replacing it.
import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

const root = dirname(fileURLToPath(import.meta.url));
const replaceBrand = (text) => text.replace(/ohbhai!?/gi, "The Untold Exit");
const retryIds = ["Q0aMXZQw3KU", "0KUXSARfbVA"];

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

const d = await youtube.videos.list({ part: ["snippet"], id: retryIds.join(",") });
for (const v of d.data.items) {
  const s = v.snippet;
  const newDesc = replaceBrand(s.description || "");
  const newTags = (s.tags || []).filter((t) => !/ohbhai/i.test(t));
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
    console.log(`[${new Date().toISOString()}] cleaned (tag dropped) ${v.id}`);
  } catch (err) {
    console.error(`[${new Date().toISOString()}] FAILED ${v.id}: ${err.message}`);
  }
}
console.log("retry done");
