// One-shot approved channel-comment batch on OWN videos. Fixed, user-approved texts only.
// Usage: node scripts/post-channel-comments.mjs batch.json
// batch.json: [{ "videoId": "...", "text": "..." }]
// Sequential with GAP_MS between posts (default 180000 = 3 min), terminates when done.
// Policy-guard Category 1 pre-cleared: unique texts, no links, no solicitation, user-approved.
import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import { google } from "googleapis";

const batchPath = process.argv[2];
if (!batchPath) { console.error("usage: node scripts/post-channel-comments.mjs batch.json"); process.exit(1); }
const batch = JSON.parse(await readFile(batchPath, "utf8"));

const GAP_MS = 180000; // 3 minutes between posts (user-ordered)

const base = join(homedir(), ".config", "youtube-studio-mcp");
const tokens = JSON.parse(await readFile(join(base, "tokens.json"), "utf8"));
const secret = JSON.parse(await readFile(join(base, "client_secret.json"), "utf8")).installed;
const auth = new google.auth.OAuth2({ clientId: secret.client_id, clientSecret: secret.client_secret });
auth.setCredentials({ refresh_token: tokens.refresh_token });
const yt = google.youtube({ version: "v3", auth });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

for (const [i, item] of batch.entries()) {
  try {
    const res = await yt.commentThreads.insert({
      part: ["snippet"],
      requestBody: { snippet: { videoId: item.videoId, topLevelComment: { snippet: { textOriginal: item.text } } } },
    });
    console.log(JSON.stringify({
      status: "POSTED", index: i, videoId: item.videoId,
      commentId: res.data.id, text: item.text.slice(0, 60),
    }));
  } catch (e) {
    console.log(JSON.stringify({ status: "ERROR", index: i, videoId: item.videoId, error: String(e?.message ?? e).slice(0, 200) }));
  }
  if (i < batch.length - 1) await sleep(GAP_MS);
}
console.log(JSON.stringify({ status: "BATCH_DONE", posted: batch.length, gapMs: GAP_MS }));
