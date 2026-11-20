#!/usr/bin/env node
// Generic comment poster — one reusable runner for every outreach / self-comment batch.
//
//   node scripts/post-comments.mjs <batch.json> [minGapSec=180] [maxGapSec=420]
//
// Batch file shape:
//   { "name": "outreach-batch-2026-11-19", "comments": [ { "videoId": "...", "text": "..." } ] }
//
// Behaviour:
//   - policy pre-flight on every comment before anything is posted
//   - refuses any text already posted by ANY previous state file in yt/story
//   - skips video ids that a previous run already commented on
//   - resumable: state written after each successful post
//   - randomised gaps between posts (never a fixed interval)
//   - stops dead on the first rejection
import { readFile, writeFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

const root = dirname(fileURLToPath(import.meta.url));
const storyDir = join(root, "..", "yt", "story");

const batchPath = process.argv[2];
if (!batchPath) {
  console.error("usage: node scripts/post-comments.mjs <batch.json> [minGapSec] [maxGapSec]");
  process.exit(1);
}
const minGap = parseInt(process.argv[3] || "180", 10);
const maxGap = parseInt(process.argv[4] || "420", 10);

const batch = JSON.parse(await readFile(batchPath, "utf8"));
const comments = batch.comments || [];
const statePath = join(storyDir, `${basename(batchPath).replace(/\.json$/i, "")}-state.json`);

/* --------------------------------------------------------- prior-post index */
const priorText = new Set();
const priorVideo = new Map(); // videoId -> batch name that already commented
for (const f of existsSync(storyDir) ? await readdir(storyDir) : []) {
  if (!f.endsWith("-state.json")) continue;
  try {
    const s = JSON.parse(await readFile(join(storyDir, f), "utf8"));
    for (const p of s.posted || []) {
      if (p.text) priorText.add(p.text.trim().toLowerCase());
      if (p.videoId) priorVideo.set(p.videoId, f);
    }
  } catch {
    /* ignore unreadable state */
  }
}

/* ------------------------------------------------------------ policy gate */
const seen = new Set();
for (const c of comments) {
  const t = (c.text || "").trim();
  const fail = [];
  if (!c.videoId) fail.push("no video id");
  if (!t) fail.push("empty text");
  if (seen.has(t.toLowerCase())) fail.push("duplicate inside this batch");
  seen.add(t.toLowerCase());
  if (priorText.has(t.toLowerCase())) fail.push("text already posted by an earlier batch");
  if (/https?:\/\/|www\./i.test(t)) fail.push("contains a link");
  if (/subscribe|like and|check out my|my channel|dm me|follow me/i.test(t)) fail.push("solicitation");
  if (t.length > 220) fail.push("over 220 chars");
  if (t.split(/\s+/).length > 22) fail.push("over 22 words");
  if (fail.length) {
    console.error(`ABORT — ${c.videoId}: ${fail.join(", ")}`);
    process.exit(1);
  }
}
console.log(`policy pre-flight: ${comments.length} comments — unique, no links, no solicitation ✅`);
console.log(`gaps: ${minGap}–${maxGap}s randomised\n`);

/* -------------------------------------------------------------------- auth */
const secret = JSON.parse(await readFile(join(root, "..", "src", "config", "tokens.json"), "utf8")).installed;
const tokens = JSON.parse(await readFile(join(homedir(), ".config", "youtube-studio-mcp", "tokens.json"), "utf8"));
const oauth = new OAuth2Client(secret.client_id, secret.client_secret);
oauth.setCredentials({ refresh_token: tokens.refresh_token });
const yt = google.youtube({ version: "v3", auth: oauth });

/* ------------------------------------------------------------------- state */
let state = { batch: batch.name, posted: [], startedAt: new Date().toISOString() };
if (existsSync(statePath)) {
  state = JSON.parse(await readFile(statePath, "utf8"));
  console.log(`resuming — ${state.posted.length} already posted by this batch\n`);
}
const doneIds = new Set(state.posted.map((p) => p.videoId));

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* --------------------------------------------------------------------- run */
for (const [i, c] of comments.entries()) {
  const n = `${i + 1}/${comments.length}`;
  if (doneIds.has(c.videoId)) {
    console.log(`${n} skip ${c.videoId} (already posted)`);
    continue;
  }
  if (priorVideo.has(c.videoId)) {
    console.log(`${n} skip ${c.videoId} (already commented by ${priorVideo.get(c.videoId)})`);
    continue;
  }
  try {
    const res = await yt.commentThreads.insert({
      part: ["snippet"],
      requestBody: {
        snippet: {
          videoId: c.videoId,
          topLevelComment: { snippet: { textOriginal: c.text } },
        },
      },
    });
    state.posted.push({ n: i + 1, videoId: c.videoId, id: res.data.id, text: c.text, at: new Date().toISOString() });
    await writeFile(statePath, JSON.stringify(state, null, 2), "utf8");
    console.log(`${n} ✅ ${c.videoId}  ${res.data.id}`);
  } catch (e) {
    console.error(`${n} ❌ ${c.videoId}  ${e.message}`);
    console.error("stopping — nothing further will be posted");
    await writeFile(statePath, JSON.stringify(state, null, 2), "utf8");
    process.exit(1);
  }
  if (i < comments.length - 1) {
    const gap = minGap + Math.floor(Math.random() * (maxGap - minGap + 1));
    console.log(`   waiting ${gap}s (${(gap / 60).toFixed(1)} min)\n`);
    await sleep(gap * 1000);
  }
}

console.log(`\ndone — ${state.posted.length} posted`);
console.log(`state: ${statePath}`);
