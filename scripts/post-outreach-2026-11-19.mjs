#!/usr/bin/env node
// Posts the APPROVED 2026-11-19 outreach batch: 1 creator reply + 7 top-level comments.
// Randomized 120-240s gaps across different channels. Policy pre-flight built in.
//
//   node scripts/post-outreach-2026-11-19.mjs            # preview, no writes
//   node scripts/post-outreach-2026-11-19.mjs --post
import { readFile, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

const root = dirname(fileURLToPath(import.meta.url));
const POST = process.argv.includes("--post");

const reply = {
  parentId: "UgyIaYnI4QeX2Umm-kN4AaABAg.AdLLxdh9kxLAdMtyRJZ6oC",
  text: "strip first here too. the rain rolls in faster than the minimap loads. keys first or straight to the city?",
  who: "JoblessGarrett (reply)",
};

const drafts = [
  ["SjOEhn3M4cE", "the frame rate argument is the one that'll age worst. which bug actually made you quit a session?", "NOT Eight Thoughts"],
  ["RQJ3Q60wb4U", "a 10/10 is a bold score at launch. what's the one thing you'd still change?", "Tamoor Hussain"],
  ["Qkwg75S9GWI", "the settings people skip are always the aim and camera ones. which of the 15 did you already change?", "GTAbites"],
  ["gcC0XGLDO30", "no timewasting is the whole game. which step do most beginners still skip?", "ZoneX"],
  ["cq4NflwkCjM", "money early usually means skipping the story. story first or cash first?", "KultZ"],
  ["mc-XyM3U4-o", "the dual protagonists carry the whole thing. which one did you actually want to play as?", "Easy Allies"],
  ["MFODY60097U", "secret guns before the first mission is the real flex. which item did you miss on your first run?", "Rodwenn"],
];

// ---- manual pre-flight ----
const errors = [];
const seen = new Set();
const check = (id, text) => {
  const words = text.trim().split(/\s+/).length;
  if (words > 20) errors.push(`${id}: ${words} words > 20`);
  if (/https?:\/\/|www\.|\.com|subscribe|my channel|my video/i.test(text)) errors.push(`${id}: link or self-promo`);
  if (/#\w+/.test(text)) errors.push(`${id}: hashtag in comment`);
  const key = text.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (seen.has(key)) errors.push(`${id}: duplicate text`);
  seen.add(key);
};
check("reply", reply.text);
for (const [id, text] of drafts) check(id, text);
if (errors.length) {
  console.error("POLICY PRE-FLIGHT FAILED:\n  " + errors.join("\n  "));
  process.exit(1);
}

console.log(`\n=== ${POST ? "POSTING" : "PREVIEW"} — 1 reply + ${drafts.length} outreach ===\n`);
console.log(`reply → ${reply.who}: "${reply.text}"`);
drafts.forEach(([id, text, who], i) => console.log(`${i + 1}. [${who}] ${id}\n   "${text}"  (${text.trim().split(/\s+/).length}w)\n`));
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
const yt = google.youtube({ version: "v3", auth: oauth });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const ts = () => new Date().toISOString().slice(11, 19);
const randomGap = () => 120_000 + Math.floor(Math.random() * 121_000); // 120-240s

const results = [];

// 1) reply to the creator comment
try {
  const res = await yt.comments.insert({
    part: ["snippet"],
    requestBody: { snippet: { parentId: reply.parentId, textOriginal: reply.text } },
  });
  results.push({ kind: "reply", who: reply.who, ok: true, commentId: res.data.id });
  console.log(`[${ts()}] ✓ reply → ${reply.who} (${res.data.id})`);
} catch (err) {
  const status = err.response?.status ?? err.status;
  const reason = err.response?.data?.error?.errors?.[0]?.reason || err.message;
  results.push({ kind: "reply", who: reply.who, ok: false, status, reason });
  console.log(`[${ts()}] ✗ reply → ${reply.who} — ${status || "?"} ${reason}`);
}

// 2) outreach comments
for (let i = 0; i < drafts.length; i++) {
  const [videoId, text, who] = drafts[i];
  try {
    const res = await yt.commentThreads.insert({
      part: ["snippet"],
      requestBody: { snippet: { videoId, topLevelComment: { snippet: { textOriginal: text } } } },
    });
    results.push({ kind: "outreach", videoId, who, ok: true, commentId: res.data.id });
    console.log(`[${ts()}] ${i + 1}/${drafts.length} ✓ ${who} (${videoId}) → ${res.data.id}`);
  } catch (err) {
    const status = err.response?.status ?? err.status;
    const reason = err.response?.data?.error?.errors?.[0]?.reason || err.message;
    results.push({ kind: "outreach", videoId, who, ok: false, status, reason });
    console.log(`[${ts()}] ${i + 1}/${drafts.length} ✗ ${who} (${videoId}) → ${status || "?"} ${reason}`);
    if (status === 403 && /quota|spam|forbidden/i.test(String(reason))) {
      console.error(`[${ts()}] spam/quota signal — stopping`);
      break;
    }
  }
  if (i < drafts.length - 1) {
    const ms = randomGap();
    console.log(`[${ts()}] … waiting ${(ms / 1000).toFixed(0)}s`);
    await sleep(ms);
  }
}

const out = join(root, "..", "yt", "story", "outreach-posted-2026-11-19.json");
await writeFile(out, JSON.stringify({ postedAt: new Date().toISOString(), results }, null, 2));
console.log(`\n[${ts()}] done. wrote ${out}`);
