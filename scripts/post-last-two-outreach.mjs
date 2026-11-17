#!/usr/bin/env node
// Posts the final 2 approved outreach comments, restyled per comment-hooks v1.1 (<=15 words).
import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

const root = dirname(fileURLToPath(import.meta.url));
const posts = [
  ["dXB062piDu4", "every game launch since 2013 and this trick still undefeated. who's using it tonight"],
  ["9OSuhIHrVgI", "day one is content. day two is a hostage situation."],
];

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

for (let i = 0; i < posts.length; i++) {
  const res = await youtube.commentThreads.insert({
    part: ["snippet"],
    requestBody: {
      snippet: {
        videoId: posts[i][0],
        topLevelComment: { snippet: { textOriginal: posts[i][1] } },
      },
    },
  });
  console.log(`${i + 1}/2 posted on ${posts[i][0]} (comment ${res.data.id})`);
  if (i === 0) await new Promise((r) => setTimeout(r, 120_000));
}
console.log("done 2/2");
