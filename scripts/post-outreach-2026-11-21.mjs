import { readFile, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

// Outreach batch 2026-11-21 — 10 comments, 10 different channels.
//   node scripts/post-outreach-2026-11-21.mjs          # pre-flight + preview
//   node scripts/post-outreach-2026-11-21.mjs --post   # posts with randomized 90-240s gaps
const root = dirname(fileURLToPath(import.meta.url));
const POST = process.argv.includes("--post");

const DRAFTS = [
  ["r3oAEokOT5w", "mistake #8 at 7:18 is the one that actually ends runs. you find it the hard way?", "Vexies"],
  ["Q8og76dpb4s", "a compilation where the game breaks itself is peak day one. which clip made you pause?", "YEAHMAP"],
  ["grID99Qt21U", "the kraken and dexter's apartment in one video is unhinged. was the dexter one intentional?", "AHIREX"],
  ["1ReyVNDmwS4", "the 12:20 cash mistake broke more runs than any boss. did you take the loss or reload?", "NorZZa"],
  ["aAmK9lW1zW0", "surviving olympic, titanic and britannic is a plot twist history wrote. which one does she tell last?", "Afterhour Theory"],
  ["_gsyLyK42p0", "cars costing triple their value to register is the quiet scam of chapter 3. how much did it eat?", "Pixden"],
  ["bYQiFfC5afo", "the strawberry farm mystery is doing all the work here. is it actually a story beat or a prop?", "Diggy"],
  ["AK-VF14WWyI", "losing a unique weapon and re-buying it at ammu-nation is the tip i needed. does that work for the sniper?", "LEWIS"],
  ["MJhGVfSegd8", "a headless easter egg paying out a legendary smg is peak rockstar. did you keep the head?", "TheRealGhost"],
  ["DXE2nPukwuI", "gta 5.5 is the fairest thing anyone's said about it. where does it stop feeling like an expansion?", "Big Dan Gaming"],
];

// pre-flight: unique, <=20 words, no links / hashtags / self-promo
const errors = [];
const seen = new Set();
for (const [id, text, who] of DRAFTS) {
  const words = text.trim().split(/\s+/).length;
  if (words > 20) errors.push(`${who}: ${words} words > 20`);
  if (/https?:\/\/|www\.|\.com|subscribe|my channel|my video|check out/i.test(text))
    errors.push(`${who}: link or self-promo`);
  if (/#[A-Za-z_]\w*/.test(text)) errors.push(`${who}: hashtag`); // "#8" is a number, not a tag
  const key = text.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (seen.has(key)) errors.push(`${who}: duplicate text`);
  seen.add(key);
}
const chan = new Set(DRAFTS.map(([, , w]) => w));
if (chan.size !== DRAFTS.length) errors.push("two comments on the same channel in one batch");
if (DRAFTS.length > 10) errors.push(`${DRAFTS.length} drafts > 10/day cap`);

if (errors.length) {
  console.error("POLICY PRE-FLIGHT FAILED:\n  " + errors.join("\n  "));
  process.exit(1);
}

console.log(`\n=== ${POST ? "POSTING" : "PREVIEW"} — ${DRAFTS.length} outreach comments ===`);
console.log(`${chan.size} channels · ${DRAFTS.length}/10 daily cap · all unique, no links, no hashtags\n`);
DRAFTS.forEach(([, text, who], i) => {
  console.log(`${i + 1}. [${who}]`);
  console.log(`   "${text}"  (${text.trim().split(/\s+/).length}w)\n`);
});
if (!POST) {
  console.log("preview only — re-run with --post after approval");
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
const randomGap = () => 90_000 + Math.floor(Math.random() * 150_000); // 1.5–4 min

const state = { batch: "outreach-batch-2026-11-21", posted: [], startedAt: new Date().toISOString() };

for (let i = 0; i < DRAFTS.length; i++) {
  const [videoId, text, who] = DRAFTS[i];
  try {
    const res = await youtube.commentThreads.insert({
      part: ["snippet"],
      requestBody: { snippet: { videoId, topLevelComment: { snippet: { textOriginal: text } } } },
    });
    state.posted.push({ n: i + 1, videoId, who, id: res.data.id, text, at: new Date().toISOString() });
    console.log(`[${ts()}] ${state.posted.length}/${DRAFTS.length} OK ${who} (${videoId}) -> ${res.data.id}`);
  } catch (err) {
    const status = err.response?.status ?? err.status;
    const reason = err.response?.data?.error?.errors?.[0]?.reason || err.message;
    console.log(`[${ts()}] ${i + 1}/${DRAFTS.length} FAIL ${who} -> ${status || "?"} ${reason}`);
    if (status === 403 && /quota/i.test(String(reason))) break;
  }
  if (i < DRAFTS.length - 1) {
    const ms = randomGap();
    console.log(`[${ts()}] waiting ${(ms / 1000).toFixed(0)}s`);
    await sleep(ms);
  }
}

await writeFile(
  join(root, "..", "yt", "story", "outreach-batch-2026-11-21-state.json"),
  JSON.stringify(state, null, 2),
);
console.log(`\n[${ts()}] done: ${state.posted.length}/${DRAFTS.length} posted`);
