#!/usr/bin/env node
// channel-uploads — resolve a handle and list its recent uploads with views/ratio.
// Research-only, used by trend-report / script-breakdown when TubeLab is absent.
//
// Usage:
//   node scripts/channel-uploads.mjs RockstarGames [maxResults=15]
//
// Costs ~4 quota units (channels.list + playlistItems.list + videos.list).

import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

const root = dirname(fileURLToPath(import.meta.url));

async function client() {
  const clientSecret = JSON.parse(
    await readFile(join(root, "..", "src", "config", "tokens.json"), "utf8"),
  ).installed;
  const tokens = JSON.parse(
    await readFile(join(homedir(), ".config", "youtube-studio-mcp", "tokens.json"), "utf8"),
  );
  const oauth = new OAuth2Client(clientSecret.client_id, clientSecret.client_secret);
  oauth.setCredentials({ refresh_token: tokens.refresh_token });
  return google.youtube({ version: "v3", auth: oauth });
}

const handle = process.argv[2];
if (!handle) {
  console.error("usage: node scripts/channel-uploads.mjs <handle> [maxResults=15]");
  process.exit(1);
}
const maxResults = Math.min(50, Math.max(1, parseInt(process.argv[3] || "15", 10)));

const yt = await client();

const chRes = await yt.channels.list({
  part: ["snippet", "statistics", "contentDetails"],
  forHandle: handle,
});
const ch = chRes.data.items?.[0];
if (!ch) {
  console.error(`channel @${handle} not found`);
  process.exit(1);
}
const subs = +ch.statistics.subscriberCount;

const items = await yt.playlistItems.list({
  part: ["contentDetails"],
  playlistId: ch.contentDetails.relatedPlaylists.uploads,
  maxResults,
});
const ids = (items.data.items || []).map((i) => i.contentDetails.videoId);
if (!ids.length) {
  console.log(`@${handle} has no public uploads readable.`);
  process.exit(0);
}

const vids = await yt.videos.list({
  part: ["snippet", "statistics", "contentDetails"],
  id: ids.join(","),
});

function seconds(iso) {
  const m = /^P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso || "");
  if (!m) return 0;
  return (+m[1] || 0) * 86400 + (+m[2] || 0) * 3600 + (+m[3] || 0) * 60 + (+m[4] || 0);
}

console.log(`\n=== @${handle} | ${ch.snippet.title} | ${subs.toLocaleString()} subs ===\n`);
console.log("     views  ratio    len  date        id           title");
const rows = vids.data.items
  .map((v) => {
    const views = +v.statistics.viewCount;
    return {
      id: v.id,
      title: v.snippet.title.replace(/\s+/g, " ").trim(),
      views,
      ratio: subs ? +(views / subs).toFixed(1) : null,
      dur: seconds(v.contentDetails.duration),
      when: v.snippet.publishedAt.slice(0, 10),
    };
  })
  .sort((a, b) => b.views - a.views);
for (const r of rows) {
  console.log(
    `${String(r.views).padStart(9)}v ${String(r.ratio ?? "-").padStart(6)}x ${String(r.dur).padStart(4)}s ${r.when}  ${r.id}  ${r.title.slice(0, 70)}`,
  );
}
console.log(`\nquota: ~4 units`);
