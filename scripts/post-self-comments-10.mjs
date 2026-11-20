#!/usr/bin/env node
// Post the 10 approved self-comments with randomised gaps (4–8 min).
// Resumable: records each posted comment id, skips anything already done.
//
//   node scripts/post-self-comments-10.mjs
import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

const root = dirname(fileURLToPath(import.meta.url));
const STATE = join(root, "..", "yt", "story", "self-comments-state.json");

const COMMENTS = [
  ["6Z_tNlGfhEw", "lucia getting arrested in her first hour says a lot about gta 6's opening. did you expect that?"],
  ["oh2D72vToCQ", "gta 6 unlocking at different times everywhere is the real launch night problem. which timezone gets it worst?"],
  ["NjwpwUcxo8Y", "the new zealand gta 6 release time trick is clever until the ban risk hits. would you actually try it?"],
  ["048FGKt95zk", "the fourth gta 6 mistake is the one everyone will make on launch day. which one almost got you?"],
  ["KQoNl-voCnw", "gta 6 preload done and the game still locked is the worst feeling. how long did you stare at the timer?"],
  ["6-gW5p51670", "most gta 6 cheat sheets are fake, so which cheat code actually works on day one?"],
  ["R-qJm86xS5s", "brian locking jason in changes the whole jason and lucia story. do you think he meant it?"],
  ["U88Lw5PzzZc", "six doors and only one door won't kill you. which number did you pick before the timer ran out?"],
  ["RVyIvZ5S4cE", "three clues and still nobody spots the millionaire first try. which clue gave it away for you?"],
  ["e34mKHkfC4Y", "surviving this jungle comes down to one decision in the first minute. what would you have done?"],
];

/* ------------------------------------------------------------ policy gate */
const seen = new Set();
for (const [vid, text] of COMMENTS) {
  const fail = [];
  if (seen.has(text)) fail.push("duplicate text");
  seen.add(text);
  if (/https?:\/\/|www\./i.test(text)) fail.push("link");
  if (/subscribe|like and|check out my|my channel|dm me/i.test(text)) fail.push("solicitation");
  if (text.length > 220) fail.push("too long");
  if (text.split(/\s+/).length > 22) fail.push("too many words");
  if (!vid) fail.push("no video id");
  if (fail.length) {
    console.error(`ABORT — ${vid}: ${fail.join(", ")}`);
    process.exit(1);
  }
}
console.log(`policy pre-flight: ${COMMENTS.length} comments, unique, no links, no solicitation ✅\n`);

/* ------------------------------------------------------------------ state */
let state = { posted: [], startedAt: new Date().toISOString() };
if (existsSync(STATE)) {
  state = JSON.parse(await readFile(STATE, "utf8"));
  console.log(`resuming — ${state.posted.length} already posted\n`);
}
const done = new Set(state.posted.map((p) => p.videoId));

/* -------------------------------------------------------------------- auth */
const secret = JSON.parse(await readFile(join(root, "..", "src", "config", "tokens.json"), "utf8")).installed;
const tokens = JSON.parse(await readFile(join(homedir(), ".config", "youtube-studio-mcp", "tokens.json"), "utf8"));
const oauth = new OAuth2Client(secret.client_id, secret.client_secret);
oauth.setCredentials({ refresh_token: tokens.refresh_token });
const yt = google.youtube({ version: "v3", auth: oauth });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* -------------------------------------------------------------------- run */
for (const [i, [videoId, text]] of COMMENTS.entries()) {
  if (done.has(videoId)) {
    console.log(`${i + 1}/10 skip ${videoId} (already posted)`);
    continue;
  }
  try {
    const res = await yt.commentThreads.insert({
      part: ["snippet"],
      requestBody: {
        snippet: {
          videoId,
          topLevelComment: { snippet: { textOriginal: text } },
        },
      },
    });
    const id = res.data.id;
    state.posted.push({ n: i + 1, videoId, id, text, at: new Date().toISOString() });
    await writeFile(STATE, JSON.stringify(state, null, 2), "utf8");
    console.log(`${i + 1}/10 ✅ ${videoId}  ${id}`);
  } catch (e) {
    console.error(`${i + 1}/10 ❌ ${videoId}  ${e.message}`);
    console.error("stopping — nothing further will be posted");
    await writeFile(STATE, JSON.stringify(state, null, 2), "utf8");
    process.exit(1);
  }

  if (i < COMMENTS.length - 1) {
    const gap = 240 + Math.floor(Math.random() * 241); // 240–480 s
    console.log(`   waiting ${gap}s (${(gap / 60).toFixed(1)} min)\n`);
    await sleep(gap * 1000);
  }
}

console.log(`\ndone — ${state.posted.length} comments posted`);
console.log(`state: ${STATE}`);
