#!/usr/bin/env node
// Posts approved pinned comments one by one with a 3-minute gap.
// Uses the channel's stored OAuth tokens (same tokens.json the MCP uses).
import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

const root = dirname(fileURLToPath(import.meta.url));

const comments = [
  ["FBXUq9gXX-I", "no way he knew our names before we even landed here. someone sent us back on purpose. episode 2 is already up"],
  ["Oeh0zuUCROw", "messi really sold us out and he planned it from the start. if you caught the signs early you're ahead of everyone"],
  ["SYpr2t0XIuU", "nvidia really lost a $5 billion ai chip to a spy and the ceo resigned over it. but she didn't do it alone, ep 2 shows who let her in"],
  ["9P6BnLRrDxM", "the ceo didn't resign because of the theft. rewatch the board scene and count who flinched"],
  ["KxOzYtPIsvk", "13 years for one game is crazy. rockstar games never actually explained the real reason and it's bigger than a delay"],
  ["lyN781QvfII", "12 million gta 6 pre orders before the game even drops is insane. to be fair those are estimates not official numbers, but still"],
  ["R-qJm86xS5s", "brian locked every door himself and the radio message proves it. that wasn't a warning, it was a confession"],
  ["QhqpxvGjBE0", "3 prisoners vs 3 cops and the prisoners walk out in under a minute. cops never had a chance, change my mind"],
  ["U88Lw5PzzZc", "60 seconds and only 1 door won't kill you. did yours survive the countdown or what"],
  ["RVyIvZ5S4cE", "1 of these 100 people is a millionaire and i'd bet you picked wrong. lock in your guess before the reveal"],
  ["3g5WteLmvtc", "one giant pizza feeding 100 people in new york is crazy. would you have bet on that dough holding"],
  ["0KUXSARfbVA", "24 hours trapped underwater with a sea monster on your tail and one way back up. honestly the monster is the least of it"],
  ["e34mKHkfC4Y", "surviving 100 hours around deadly animals sounds easy until the first night. what one thing would you pack"],
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const ts = () => new Date().toISOString();

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

let posted = 0;
for (let i = 0; i < comments.length; i++) {
  const [videoId, text] = comments[i];
  try {
    const res = await youtube.commentThreads.insert({
      part: ["snippet"],
      requestBody: {
        snippet: {
          videoId,
          topLevelComment: { snippet: { textOriginal: text } },
        },
      },
    });
    posted++;
    console.log(
      `[${ts()}] ${posted}/${comments.length} posted on ${videoId} (comment ${res.data.snippet?.topLevelComment?.id})`,
    );
  } catch (err) {
    console.log(`[${ts()}] FAILED on ${videoId}: ${err.message}`);
    if (err.message?.includes("quota") || err.status === 403) {
      console.log("stopping early (quota/spam signal)");
      break;
    }
  }
  if (i < comments.length - 1) {
    console.log(`[${ts()}] waiting 180s...`);
    await sleep(180_000);
  }
}
console.log(`[${ts()}] done. posted ${posted}/${comments.length}.`);
