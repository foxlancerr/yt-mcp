#!/usr/bin/env node
// Pre-flight check for a campaign clip: does this plan satisfy the brief, and what does it pay?
// Deterministic only — reads a plan JSON and the campaign board, never calls an API.
//
//   node scripts/clip-campaign-check.mjs --list
//   node scripts/clip-campaign-check.mjs <plan.json>
//   node scripts/clip-campaign-check.mjs <plan.json> <campaign-id>
//
// Exit code 0 = PASS, 1 = FAIL (at least one rejection line). Warnings never fail a run.
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const boardPath = join(
  root,
  "..",
  ".agents",
  "skills",
  "viral-moment-engine",
  "campaigns",
  "gta6-board-2026-11-22.json",
);
const board = JSON.parse(await readFile(boardPath, "utf8"));
const fee = board.globalRules.contentRewardsCreatorFee ?? 0.1;

const norm = (s) => String(s ?? "").toLowerCase().replace(/\s+/g, " ").trim();
const normPlatform = (s) => {
  const t = norm(s);
  if (/tiktok/.test(t)) return "tiktok";
  if (/instagram|\binsta\b|reels?/.test(t)) return "instagram";
  if (/youtube|\byt\b|shorts?/.test(t)) return "youtube";
  if (/\bx\b|twitter/.test(t)) return "x";
  if (/facebook|\bfb\b/.test(t)) return "facebook";
  return t;
};

if (process.argv.includes("--list")) {
  for (const c of board.campaigns) {
    const rate = c.model === "pool" ? `pool $${c.pool}` : `$${c.rate?.toFixed(2)}/1K`;
    console.log(`${c.id.padEnd(20)} ${String(c.verdict).padEnd(12)} ${rate.padEnd(16)} ${c.name}`);
  }
  process.exit(0);
}

const planArg = process.argv[2];
if (!planArg) {
  console.error("usage: node scripts/clip-campaign-check.mjs <plan.json> [campaign-id] | --list");
  process.exit(2);
}
const plan = JSON.parse(await readFile(planArg, "utf8"));
const campaignId = process.argv[3] ?? plan.campaignId ?? plan.campaign;
const campaign = board.campaigns.find((c) => c.id === campaignId);
if (!campaign) {
  console.error(`unknown campaign "${campaignId}" — run with --list`);
  process.exit(2);
}

const fails = [];
const warns = [];
const oks = [];
const pass = (m) => oks.push(m);
const fail = (m) => fails.push(m);
const warn = (m) => warns.push(m);

// --- platform ---------------------------------------------------------------
const platforms = (plan.platforms ?? [plan.platform]).filter(Boolean).map(normPlatform);
if (!platforms.length) fail("no platform declared");
for (const p of platforms) {
  if (campaign.platforms.map(normPlatform).includes(p)) pass(`platform ok: ${p}`);
  else fail(`platform not allowed: ${p} (brief: ${campaign.platforms.join(", ")})`);
}

// --- required name + hashtag ------------------------------------------------
const caption = norm(plan.caption);
const hook = norm(plan.hook ?? plan.onScreenHook);
if (campaign.requiredName) {
  if (caption.includes(norm(campaign.requiredName))) pass(`caption names ${campaign.requiredName}`);
  else fail(`caption missing required name "${campaign.requiredName}"`);

  const firstTwo = hook.split(" ").slice(0, 2).join(" ");
  if (!hook) warn("no on-screen hook given — the name must appear in the first two words");
  else if (firstTwo.includes(norm(campaign.requiredName).split(" ")[0]))
    pass("hook leads with the streamer name");
  else fail(`hook must open with the name, got "${hook.slice(0, 40)}…"`);
}
if (campaign.requiredHashtag) {
  if (caption.includes(norm(campaign.requiredHashtag))) pass(`hashtag ${campaign.requiredHashtag} present`);
  else fail(`caption missing required hashtag ${campaign.requiredHashtag}`);
}

// --- declared production flags ---------------------------------------------
if (campaign.requires?.length) {
  const notes = norm(plan.notes);
  for (const r of campaign.requires) {
    const hit = r.split(" ").some((w) => w.length > 4 && notes.includes(norm(w)));
    if (hit) pass(`requirement declared: ${r}`);
    else warn(`unconfirmed requirement: ${r}`);
  }
}

const banned = campaign.banned ?? [];
const flagChecks = [
  [["aiVideo", "usesAiVideo", "isAiVideo"], /\bai\b|ai-generated/, "ai-generated video"],
  [["aiVoice", "usesAiVoice", "aiVoiceover"], /voiceover|voice over|ai voice/, "AI voiceover"],
  [["translatedSubtitles", "subtitlesTranslated", "usesTranslatedSubtitles"], /translated|other languages|non-english subtitle/, "translated subtitles"],
  [["logoOnScreen", "hasLogo", "logo"], /logo/, "logos"],
  [["leakedFootage", "usesLeaked", "leak"], /leak|pre-release|pre release/, "leaks or pre-release recordings"],
  [["publisherArt", "usesPublisherArt", "trailer"], /trailer|screenshot|key art|official art/, "publisher trailers, screenshots or art"],
  [["cutsceneOnly", "isCutscene", "cutscene"], /cutscene|story ending/, "isolated cutscenes or story endings"],
  [["exploit", "usesExploit", "glitch"], /glitch|cheat|exploit/, "glitches, cheats or money exploits"],
];
for (const [keys, pattern, label] of flagChecks) {
  if (!keys.some((k) => plan[k])) continue;
  const bannedHere = banned.some((b) => pattern.test(norm(b)));
  if (bannedHere) fail(`${label} is banned by this brief`);
  else warn(`${label} declared, not banned by this brief — double-check the page`);
}

// --- disclosure, duration, source ------------------------------------------
if (plan.hasDisclosure === false) fail("no ad disclosure — a valid rejection reason on Content Rewards");
else if (plan.hasDisclosure) pass("ad disclosure present");
else warn("disclosure not declared");

const dur = Number(plan.durationSec ?? 0);
if (dur && (dur < 15 || dur > 60)) warn(`duration ${dur}s outside the 20-45s target`);
else if (dur) pass(`duration ${dur}s`);

if (!plan.sourceUrl) warn("no source URL recorded — the footage must be the brief's own window");
if (plan.accountLane && plan.accountLane !== "rewards") fail("campaign clips must use a dedicated rewards account, not the brand channel");
else if (plan.accountLane === "rewards") pass("dedicated rewards account");

// --- payout maths -----------------------------------------------------------
const views = Number(plan.expectedViews ?? 0);
let money = null;
if (campaign.model === "pool") {
  const total = campaign.approvedViewsAtRead;
  const floor = campaign.minViews ?? null;
  if (floor && views) {
    if (views < floor) fail(`pool floor not met: ${views} of ${floor} views — a pool pays nothing below it`);
    else pass(`clears the ${floor}-view pool floor`);
  } else if (floor && !views) {
    warn(`pool floor is ${floor} views — no expectedViews given, so qualification is unchecked`);
  }
  if (total && views) {
    const share = (views / total) * campaign.pool;
    money = {
      model: "pool",
      effectiveCpm: +(campaign.effectiveCpm ?? (campaign.pool / total) * 1000).toFixed(2),
      floorViews: floor,
      qualifies: views >= (floor ?? Infinity),
      takeHomeAtViews: +(share * (1 - fee)).toFixed(2),
    };
  } else {
    money = {
      model: "pool",
      pool: campaign.pool,
      floorViews: floor,
      qualifies: floor ? views >= floor : null,
      totalApprovedViews: "not published",
      takeHomeAtViews: "unknowable — pool splits at close, and total approved views are not published",
    };
  }
} else {
  const rate = campaign.rate;
  const minViews = campaign.minViews ?? 0;
  const viewsToCap = campaign.cap ? Math.round((campaign.cap / rate) * 1000) : null;
  const pay = (v) => (v < minViews ? 0 : Math.min(campaign.cap ?? Infinity, (v / 1000) * rate));
  money = {
    model: "per-view",
    rate,
    cap: campaign.cap,
    floorViews: minViews,
    viewsToCap,
    clearsFloor: views >= minViews,
    takeHomeAtFloor: +(pay(Math.max(minViews, 1)) * (1 - fee)).toFixed(2),
    takeHomeAtCap: campaign.cap ? +(campaign.cap * (1 - fee)).toFixed(2) : null,
    takeHomeAtViews: views ? +(pay(views) * (1 - fee)).toFixed(2) : null,
  };
  if (views && views < minViews)
    fail(`${views} views is below the ${minViews} floor — this clip would pay $0`);
  if (views && viewsToCap && views > viewsToCap)
    warn(`${views} views is past the cap (${viewsToCap}) — cut a new clip instead of promoting this one`);
}

// --- report -----------------------------------------------------------------
console.log(`\nCAMPAIGN  ${campaign.name}  (${campaign.host} on ${campaign.marketplace})`);
console.log(`MODEL     ${campaign.model}${campaign.model === "per-view" ? ` · $${campaign.rate}/1K · cap ${campaign.cap ?? "none"} · floor ${campaign.minViews ?? 0} views` : ` · $${campaign.pool} split by views`}`);
console.log(`BRIEF     ${campaign.platforms.join(", ")}${campaign.requiredHashtag ? ` · ${campaign.requiredHashtag}` : ""}`);
if (money) console.log(`MONEY     ${JSON.stringify(money)}`);
console.log("");
for (const m of oks) console.log(`  ok    ${m}`);
for (const m of warns) console.log(`  warn  ${m}`);
for (const m of fails) console.log(`  FAIL  ${m}`);
console.log(`\n${fails.length ? "FAIL" : "PASS"} — ${fails.length} blocking, ${warns.length} to confirm\n`);
process.exit(fails.length ? 1 : 0);
