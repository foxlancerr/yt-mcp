#!/usr/bin/env node
// GTA 6 launch-wave outreach batch — user-approved 2026-11-18.
// Schedule: t+0, +1min, +2min, +4min (as approved; done by ~5min).
import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

const root = dirname(fileURLToPath(import.meta.url));
// [videoId, approved text, delay before posting in ms]
const posts = [
  ["-AFSP8PJzKs", "rockstar is still dropping info like a spy. who else isn't sleeping tonight", 0], // TGG 1.53M
  ["-zkK9dJrCPc", "new zealand gets it first. the rest of the world fakes a sick day", 60_000], // MELOO 540K
  ["BOWtCJDHPzs", "calling in sick to watch someone else call in sick is peak 2026 😂", 120_000], // Bean Head Toons 222K
  ["6wcTNmcugdY", "everyone plans a perfect first day. everyone gets lost in 10 minutes anyway", 240_000], // JoblessGarrett 174K
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

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let ok = 0;
let failed = 0;
for (let i = 0; i < posts.length; i++) {
  const [videoId, text, delay] = posts[i];
  if (delay) {
    console.log(`[wait] sleeping ${delay / 1000}s before comment ${i + 1}/4...`);
    await sleep(delay);
  }
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
    ok++;
    console.log(`[ok ${i + 1}/4] ${videoId} -> comment ${res.data.id} | "${text}"`);
  } catch (e) {
    failed++;
    console.error(`[FAIL ${i + 1}/4] ${videoId}: ${e.message}`);
  }
}
console.log(`done: ok=${ok} failed=${failed}`);
