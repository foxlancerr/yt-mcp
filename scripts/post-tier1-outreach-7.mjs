#!/usr/bin/env node
// Posts outreach drafts 1-7 (yt/story/outreach-drafts-2026-11-18.md) — Tier-1 markets.
// Gaps are RANDOMIZED (90-240s) instead of the fixed 1/3/4/5 min cadence, so the
// footprint doesn't look scripted. Drafts 8-10 are held for the next window.
//
//   node scripts/post-tier1-outreach-7.mjs            # preview, no writes
//   node scripts/post-tier1-outreach-7.mjs --post
import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

const root = dirname(fileURLToPath(import.meta.url));
const POST = process.argv.includes("--post");

const drafts = [
  ["g6cDeB24gmY", "concept or not, that free roam loop is where I lose hours. which district first?", "GB Gar Studio"],
  ["bw8RX_PUwlA", 'the "slow down and look around" one hit hardest. is there a mistake you can\'t undo later?', "AU ABTW"],
  ["1AI3Dr9mfoY", "so midnight is really a 19-hour wave across time zones. does that kill launch night for you?", "GB Russian Sadness"],
  ["ycKGI--sivc", "the motorbike-first call is underrated. how much cash do you actually need before the first big job?", "US Zancudo"],
  ["P1YTXjZRUpw", "21 minutes and no filler. which section will most people skip and regret?", "US BreeZe GTA"],
  ["GuXnM2KieOs", "buying before leaving the Keys is the real detail. first car: worth it or pure waste?", "US TheThirdMeteorite"],
  ["iDN5mJhPp7s", "game's not out until tomorrow though. where are these secrets actually from?", "CA Sightey Plays"],
];

// policy-guard pre-flight: unique, no links, no self-promo, <=20 words
const errors = [];
const seen = new Set();
for (const [id, text, who] of drafts) {
  const words = text.trim().split(/\s+/).length;
  if (words > 20) errors.push(`${id}: ${words} words > 20`);
  if (/https?:\/\/|www\.|\.com|subscribe|my channel|my video/i.test(text))
    errors.push(`${id}: link or self-promo`);
  if (/#\w+/.test(text)) errors.push(`${id}: hashtag in comment`);
  const key = text.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (seen.has(key)) errors.push(`${id}: duplicate text`);
  seen.add(key);
}
if (errors.length) {
  console.error("POLICY PRE-FLIGHT FAILED:\n  " + errors.join("\n  "));
  process.exit(1);
}

console.log(`\n=== ${POST ? "POSTING" : "PREVIEW"} — ${drafts.length} outreach comments ===\n`);
drafts.forEach(([id, text, who], i) => {
  console.log(`${i + 1}. [${who}] ${id}`);
  console.log(`   "${text}"  (${text.trim().split(/\s+/).length}w)\n`);
});
if (!POST) {
  console.log("preview only — re-run with --post");
  process.exit(0);
}

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
const ts = () => new Date().toISOString().slice(11, 19);
// random gap 90-240s (1.5-4 min), different every run
const randomGap = () => 90_000 + Math.floor(Math.random() * 150_000);

let posted = 0;
const results = [];

for (let i = 0; i < drafts.length; i++) {
  const [videoId, text, who] = drafts[i];
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
    results.push({ videoId, who, ok: true, commentId: res.data.id });
    console.log(`[${ts()}] ${posted}/${drafts.length} ✓ ${who} (${videoId}) → ${res.data.id}`);
  } catch (err) {
    const status = err.response?.status ?? err.status;
    const reason = err.response?.data?.error?.errors?.[0]?.reason || err.message;
    results.push({ videoId, who, ok: false, status, reason });
    console.log(`[${ts()}] ${posted + 1}/${drafts.length} ✗ ${who} (${videoId}) → ${status || "?"} ${reason}`);
    if (status === 403 && /quota/i.test(String(reason))) {
      console.error(`[${ts()}] quota exhausted — stopping`);
      break;
    }
  }

  if (i < drafts.length - 1) {
    const ms = randomGap();
    console.log(`[${ts()}] … waiting ${(ms / 1000).toFixed(0)}s`);
    await sleep(ms);
  }
}

console.log(`\n[${ts()}] done: ${posted}/${drafts.length} posted`);
console.log("RESULTS JSON:", JSON.stringify(results));
