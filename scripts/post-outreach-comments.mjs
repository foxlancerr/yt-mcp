#!/usr/bin/env node
// Posts approved outreach comments on trending videos, gaps cycling 2/4/6 minutes.
// Relevant to each video, no self-promotion. User approved the exact texts.
import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

const root = dirname(fileURLToPath(import.meta.url));

// [videoId, comment text, gap to next post in minutes]
const comments = [
  ["kPI9Mc35mOg", "a 48 second video with a hundred million views should not be legal. the hesitation before every step is the best part. which door are you picking first, left or right", 2],
  ["q6fgVVmdpgY", "the second the alliances start turning on each other this becomes a psychology documentary. would you team up day one or stay solo and watch everyone else get picked off", 4],
  ["wS64_n65u3k", "the discipline in there makes everyone's gym streak at home look like a joke. what's the one rule from this you'd actually steal for yourself", 6],
  ["J8deTV5sfKE", "the cold hours would break me before sunrise honestly. hot or cold, which side would you last longer on", 2],
  ["_yl5ELcmugI", "a thirty second pre load teaser and the whole internet is camped on a download bar. is everyone staying up on the 18th or trusting the pre load and sleeping", 4],
  ["dXB062piDu4", "the fact this trick still works in 2026 is wild. did yours actually unlock early or did you find out after everyone else was already in vice city", 6],
  ["9OSuhIHrVgI", "day two is where this stops being fun and becomes a mental test. what's the first thing you'd crack on, the sleep or the food", 0],
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
  const [videoId, text, gapMin] = comments[i];
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
    console.log(`[${ts()}] ${posted}/${comments.length} posted on ${videoId} (comment ${res.data.id})`);
    if (i < comments.length - 1) {
      const ms = gapMin * 60_000;
      console.log(`[${ts()}] waiting ${gapMin} min...`);
      await sleep(ms);
    }
  } catch (err) {
    console.error(`[${ts()}] FAILED on ${videoId}: ${err.message}`);
    const status = err.response?.status ?? err.status;
    if (status === 403) {
      console.error(`[${ts()}] 403 (quota or spam filter) — stopping early to protect the channel.`);
      break;
    }
    // non-403: log and continue to next after the gap
    if (i < comments.length - 1) await sleep(gapMin * 60_000);
  }
}
console.log(`[${ts()}] done: ${posted}/${comments.length} posted`);
