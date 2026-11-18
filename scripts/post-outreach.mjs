// One-shot approved outreach batch. Fixed, user-approved comments only.
// Usage: node scripts/post-outreach.mjs batch.json
// batch.json: [{ "channelId": "UC...", "videoTitle": "...", "text": "..." }]
// Resolves each video by title from the channel's uploads playlist, then posts
// the comment as the channel account. Sequential, 30s apart, terminates.
import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import { google } from "googleapis";

const batchPath = process.argv[2];
if (!batchPath) { console.error("usage: node scripts/post-outreach.mjs batch.json"); process.exit(1); }
const batch = JSON.parse(await readFile(batchPath, "utf8"));

const base = join(homedir(), ".config", "youtube-studio-mcp");
const tokens = JSON.parse(await readFile(join(base, "tokens.json"), "utf8"));
const secret = JSON.parse(await readFile(join(base, "client_secret.json"), "utf8")).installed;
const auth = new google.auth.OAuth2({ clientId: secret.client_id, clientSecret: secret.client_secret });
auth.setCredentials({ refresh_token: tokens.refresh_token });
const yt = google.youtube({ version: "v3", auth });

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

for (const item of batch) {
  try {
    const uploads = "UU" + item.channelId.slice(2);
    const pl = await yt.playlistItems.list({ part: ["snippet"], playlistId: uploads, maxResults: 15 });
    const entry = pl.data.items?.find((i) => norm(i.snippet?.title ?? "").startsWith(norm(item.videoTitle).slice(0, 30)));
    if (!entry) { console.log(JSON.stringify({ status: "VIDEO_NOT_FOUND", videoTitle: item.videoTitle })); continue; }
    const videoId = entry.snippet.resourceId?.videoId ?? entry.contentDetails?.videoId;
    const res = await yt.commentThreads.insert({
      part: ["snippet"],
      requestBody: { snippet: { videoId, topLevelComment: { snippet: { textOriginal: item.text } } } },
    });
    console.log(JSON.stringify({
      status: "POSTED", videoTitle: item.videoTitle, videoId,
      commentId: res.data.id, text: item.text.slice(0, 60),
    }));
  } catch (e) {
    console.log(JSON.stringify({ status: "ERROR", videoTitle: item.videoTitle, error: String(e?.message ?? e).slice(0, 200) }));
  }
  if (batch.indexOf(item) < batch.length - 1) await sleep(30000);
}
console.log(JSON.stringify({ status: "BATCH_DONE", posted: batch.length }));
