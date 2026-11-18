#!/usr/bin/env node
// Channel-wide metadata refresh — evidence-based keywords, 2026-11-18.
//
//   node scripts/metadata-refresh.mjs            # preview (reads only)
//   node scripts/metadata-refresh.mjs --apply    # writes (50 units/video)
//   node scripts/metadata-refresh.mjs --only <id> --apply
//
// Evidence (trend-scan 2026-11-18, 7d):
//   "gta 6 gameplay"  median 5.4M views / 8x subs   (7 of 10 results <90s)
//   "gta 6 lucia"     median 2.4M / 20x subs        (7 of 10 <90s)
//   "gta 6 tips"      median 1.36M / 3x             top: "launch night" 935x
//   "gta 6 secrets"   median 844K / 1x              top: 6s meme 1,390x
//   "survival story animated" median 495K / 6x
//   "why you procrastinate"   small niche, 42x ratios
//
// Rules: keep existing title unless it is over-long or misleading; append at most
// one trending phrase; never claim footage the video does not contain; preserve
// every chapter block; skip anything not public.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { homedir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

const root = dirname(fileURLToPath(import.meta.url));
const APPLY = process.argv.includes("--apply");
const onlyIdx = process.argv.indexOf("--only");
const ONLY = onlyIdx > -1 ? process.argv[onlyIdx + 1] : null;

/* ------------------------------------------------------------------ plans */
// title: full replacement (only where current is >75 chars or misdescribes)
// lead : replaces line 1 when the primary keyword is missing from it
// tags : full replacement, ordered primary → related
const P = {
  /* ---------------- GTA 6 ---------------- */
  "6Z_tNlGfhEw": {
    title: "Lucia Was Arrested In Her First Hour | GTA 6 Lucia Story",
    hashtags: ["#GTA6", "#GTA6Lucia", "#GTAVI", "#GrandTheftAuto6"],
    tags: ["gta 6 lucia", "lucia gta 6", "gta 6 first hour", "gta 6 story", "jason and lucia",
      "gta 6 vice city", "gta 6 launch", "gta 6 release", "gta 6 characters", "gta 6 intro",
      "grand theft auto 6", "gta vi", "gta 6 news", "gta 6 shorts", "gta 6 animation",
      "gta 6 2026", "the untold exit"],
  },
  oh2D72vToCQ: {
    title: "GTA 6 Unlocks at Different Times Everywhere… When Can YOU Play?",
    hashtags: ["#GTA6", "#GTA6Launch", "#GTAVI", "#GTA6ReleaseTime"],
    tags: ["gta 6 release time", "gta 6 launch time", "gta 6 unlock time", "gta 6 launch day",
      "gta 6 midnight release", "gta 6 release date", "gta 6 countdown", "gta 6 by country",
      "gta 6 ps5", "gta 6 xbox", "grand theft auto 6", "gta vi", "gta 6 news", "gta 6 launch",
      "gta 6 2026", "the untold exit"],
  },
  "6-gW5p51670": {
    hashtags: ["#GTA6", "#GTA6Cheats", "#GTAVI", "#GTA6Tips"],
    tags: ["gta 6 cheats", "gta 6 cheat codes", "gta 6 cheat sheet", "gta 6 secrets",
      "gta 6 myths", "gta 6 fake cheats", "gta 6 tips", "gta 6 ps5", "gta 6 xbox",
      "gta 6 news", "grand theft auto 6", "gta vi", "gta 6 explained", "gta 6 shorts",
      "the untold exit"],
  },
  PsdNCzTWHXs: {
    title: "GTA 6's 5 Free Gifts Are Expiring | GTA 6 Pre-Order Bonuses",
    hashtags: ["#GTA6", "#GTA6PreOrder", "#GTAVI", "#GTA6Tips"],
    tags: ["gta 6 pre order", "gta 6 pre order bonus", "gta 6 free gifts", "gta 6 twitch drops",
      "gta 6 rewards", "gta 6 launch day", "gta 6 release date", "gta 6 vintage vice city pack",
      "gta 6 ps5", "gta 6 xbox", "grand theft auto 6", "gta vi", "gta 6 news", "gta 6 tips",
      "the untold exit"],
  },
  "048FGKt95zk": {
    hashtags: ["#GTA6", "#GTA6Tips", "#GTAVI", "#GrandTheftAuto6"],
    tags: ["gta 6 mistakes", "gta 6 tips", "things not to do gta 6", "gta 6 first hour",
      "gta 6 launch day", "gta 6 guide", "gta 6 beginner tips", "gta 6 opening", "gta 6 release date",
      "gta 6 ps5", "grand theft auto 6", "gta vi", "gta 6 news", "gta 6 shorts", "the untold exit"],
  },
  DrxALhLInLA: {
    title: "The GTA 6 Leak That Changed Gaming Forever | GTA 6 Leaks",
    hashtags: ["#GTA6", "#GTA6Leaks", "#GTAVI", "#RockstarGames"],
    tags: ["gta 6 leaks", "gta 6 leak", "gta 6 hacked", "rockstar leak", "gta 6 gameplay leak",
      "gta 6 news", "gta 6 documentary", "gta 6 development", "gta 6 history", "grand theft auto 6",
      "gta vi", "rockstar games", "gta 6 secrets", "gta 6 2022", "the untold exit"],
  },
  "KQoNl-voCnw": {
    hashtags: ["#GTA6", "#GTA6Launch", "#GTAVI", "#Shorts"],
    tags: ["gta 6 preload", "gta 6 download size", "gta 6 unlock time", "gta 6 midnight release",
      "gta 6 launch night", "gta 6 release time", "gta 6 countdown", "gta 6 encrypted",
      "gta 6 ps5", "gta 6 xbox", "grand theft auto 6", "gta vi", "gta 6 news", "gta 6 shorts",
      "the untold exit"],
  },
  "3buS8kA7Qio": {
    title: "The Final 60 Seconds Before GTA 6 | GTA 6 Launch Countdown",
    hashtags: ["#GTA6", "#GTA6Countdown", "#GTAVI", "#Shorts"],
    tags: ["gta 6 countdown", "gta 6 launch countdown", "gta 6 launch night", "gta 6 release countdown",
      "gta 6 midnight release", "gta 6 release time", "final 60 seconds gta 6", "gta 6 launch day",
      "grand theft auto 6", "gta vi", "gta 6 news", "gta 6 shorts", "the untold exit"],
  },
  NjwpwUcxo8Y: {
    hashtags: ["#GTA6", "#GTA6ReleaseTime", "#GTAVI", "#GTA6Launch"],
    tags: ["gta 6 release time", "gta 6 new zealand trick", "gta 6 nz trick", "gta 6 midnight release",
      "gta 6 global release time", "gta 6 launch day", "gta 6 launch night", "gta 6 countdown",
      "gta 6 ps5", "gta 6 xbox", "grand theft auto 6", "gta vi", "gta 6 news", "gta 6 ban risk",
      "the untold exit"],
  },
  lyN781QvfII: {
    title: "GTA 6 Passed $1 Billion Before Launch | GTA 6 Pre-Orders",
    hashtags: ["#GTA6", "#GTA6PreOrders", "#GTAVI", "#GrandTheftAuto6"],
    tags: ["gta 6 pre orders", "gta 6 pre order", "gta 6 sales", "gta 6 1 billion", "gta 6 records",
      "gta 6 launch", "gta 6 release date", "gta 6 price", "gta 6 ultimate edition", "gta 6 news",
      "grand theft auto 6", "gta vi", "gta 6 business", "the untold exit"],
  },
  KxOzYtPIsvk: {
    title: "The INSANE Story Behind GTA 6's 13-Year Wait | GTA 6 Release Date",
    hashtags: ["#GTA6", "#RockstarGames", "#GrandTheftAuto6", "#GTAVI"],
    tags: ["gta 6 release date", "gta 6 development", "gta 6 history", "gta 6 news",
      "gta 6 documentary", "gta 6 delayed", "gta 6 rockstar games", "project americas",
      "grand theft auto 6", "gta vi", "rockstar games", "gta 6 trailer", "gta 6 explained",
      "the untold exit"],
  },
  "R-qJm86xS5s": {
    hashtags: ["#GTA6", "#GTA6Lucia", "#JasonDuval", "#Shorts"],
    tags: ["gta 6 jason", "gta 6 lucia", "jason and lucia", "gta 6 characters", "gta 6 story",
      "gta 6 secrets", "gta 6 trailer", "gta 6 vice city", "leonida", "grand theft auto 6",
      "gta vi", "gta 6 shorts", "the untold exit"],
  },

  /* ---------------- animated survival (P1/P2) ---------------- */
  e34mKHkfC4Y: {
    title: "Why You'd Never Survive This Jungle | Animated Survival Story",
    hashtags: ["#AnimatedStory", "#Survival", "#UntoldExit"],
    tags: ["survival story animated", "animated survival story", "jungle survival",
      "survival animation", "animated story", "jungle", "survive the jungle",
      "survival stories", "animated story time", "jungle animals", "survival challenge",
      "the untold exit"],
  },
  "U88Lw5PzzZc": {
    title: "Only 1 Door Won't Kill You | Animated Survival Challenge",
    hashtags: ["#AnimatedStory", "#SurvivalChallenge", "#UntoldExit"],
    // Full rewrite: the old body was 100% legacy template — other creators'
    // names, their video titles, and "giant competitions / real-life games"
    // positioning that the channel no longer publishes.
    descFull: `Six doors. Sixty seconds. Only one won't kill you — pick wrong and the run ends here.

A choose-the-right-door animated challenge. The countdown starts at 60, it does not stop for hesitation, and only one of the six gets you out.

Every other door is a different way to lose.

Which door would you pick — 1, 2, 3, 4, 5 or 6? Comment your number before the timer runs out, then watch whether you survived.

This is an original animated short from The Untold Exit, drawn for this story. Not live action, and not gameplay footage.

Watch until the end.

The Untold Exit — Look Beyond What Seems Obvious.

#AnimatedStory #SurvivalChallenge #UntoldExit`,
    tags: ["animated survival challenge", "only one door", "choose the right door",
      "survival challenge", "animated story", "escape room", "animated challenge",
      "would you rather", "survival shorts", "animation", "the untold exit"],
  },
  "0KUXSARfbVA": {
    title: "What If You Were Trapped Underwater? | Animated Survival Story",
    hashtags: ["#AnimatedStory", "#Survival", "#UntoldExit"],
    tags: ["underwater survival", "animated survival story", "trapped underwater",
      "underwater city", "survival challenge", "animated story", "deep sea", "ocean survival",
      "survival stories", "what if", "the untold exit"],
  },
  "3g5WteLmvtc": {
    title: "100 People vs 1 Giant Pizza | Animated Food Challenge",
    hashtags: ["#AnimatedStory", "#FoodChallenge", "#UntoldExit"],
    tags: ["giant pizza", "food challenge", "animated challenge", "100 people vs",
      "biggest pizza", "pizza challenge", "animated story", "food animation", "new york pizza",
      "challenge animation", "the untold exit"],
  },
  RVyIvZ5S4cE: {
    title: "Spot the Millionaire. 3 Clues. | Animated Guessing Challenge",
    hashtags: ["#AnimatedStory", "#GuessingGame", "#UntoldExit"],
    tags: ["spot the millionaire", "guessing game", "animated challenge", "brain teaser",
      "spot the difference", "millionaire", "social experiment", "puzzle", "animated story",
      "guess who", "the untold exit"],
  },
  QhqpxvGjBE0: {
    hashtags: ["#AnimatedStory", "#PrisonBreak", "#UntoldExit"],
    tags: ["prison escape challenge", "prisoners vs cops", "animated challenge", "escape challenge",
      "who escapes", "prison break", "animated story", "survival challenge", "challenge animation",
      "guess the winner", "the untold exit"],
  },
  "FBXUq9gXX-I": {
    hashtags: ["#AnimatedStory", "#Survival", "#UntoldExit"],
    tags: ["survival story animated", "time travel story", "animated survival story",
      "4000 years ago", "ancient survival", "animated story", "survival stories", "time travel",
      "history animation", "animated series", "the untold exit"],
  },
  Oeh0zuUCROw: {
    hashtags: ["#AnimatedStory", "#Survival", "#UntoldExit"],
    tags: ["survival story animated", "time travel story", "animated survival story",
      "ancient kingdom", "ancient survival", "animated story", "survival stories", "betrayal story",
      "animated series", "part 2", "the untold exit"],
  },
  SYpr2t0XIuU: {
    title: "Nvidia Spy Scandal: We Hired a Spy to Steal Our $5B Chips",
    hashtags: ["#Nvidia", "#SpyScandal", "#AnimatedStory", "#UntoldExit"],
    tags: ["nvidia spy scandal", "nvidia", "ai chips", "corporate espionage", "spy story",
      "animated story", "true story animation", "ai chip theft", "nvidia news", "tech documentary",
      "silicon valley", "animated documentary", "the untold exit"],
  },
  "9P6BnLRrDxM": {
    hashtags: ["#Nvidia", "#SpyScandal", "#AnimatedStory", "#UntoldExit"],
    tags: ["nvidia spy scandal", "ai chip theft", "spy story part 2", "corporate espionage",
      "animated story", "true story animation", "nvidia news", "tech documentary", "ceo resigned",
      "animated series", "the untold exit"],
  },

  /* ---------------- animated psychology (P4) ---------------- */
  vEraiuwOh2o: {
    lead: "Why you keep starting but never finish — the psychology of procrastination, and the four forces that decide whether you follow through.",
    hashtags: ["#Psychology", "#Procrastination", "#UntoldExit"],
    tags: ["why you procrastinate", "procrastination", "why you never finish", "motivation",
      "discipline", "psychology", "psychology shorts", "self improvement", "burnout",
      "productivity", "mindset", "animated psychology", "human behavior", "the untold exit"],
  },
  Q8n13DQlphU: {
    title: "3 Hidden Secrets That Save You Time",
    lead: "Three secrets that save you time — and the reason your day slips away before you notice.",
    hashtags: ["#Psychology", "#Productivity", "#UntoldExit"],
    tags: ["time management", "productivity tips", "save time", "psychology",
      "time saving habits", "productivity", "psychology shorts", "self improvement", "habits",
      "focus", "time", "the untold exit"],
  },
};

/* ----------------------------------------------------------------- helpers */
const secret = JSON.parse(
  await readFile(join(root, "..", "src", "config", "tokens.json"), "utf8"),
).installed;
const tokens = JSON.parse(
  await readFile(join(homedir(), ".config", "youtube-studio-mcp", "tokens.json"), "utf8"),
);
const oauth = new OAuth2Client(secret.client_id, secret.client_secret);
oauth.setCredentials({ refresh_token: tokens.refresh_token });
const yt = google.youtube({ version: "v3", auth: oauth });

const chapterLines = (d) =>
  d.split("\n").map((l) => l.trim()).filter((l) => /^\d{1,2}:\d{2}(?::\d{2})?\s+[—–-]?\s*\S/.test(l));

// YouTube hashtags must contain at least one letter — "#9" in "chip #9" is prose,
// not a tag. Digit-only tokens are excluded so they are never stripped or counted.
const TAG_RE = /#[\p{L}_][\p{L}\p{N}_]*/gu;

// A hashtag block is a line that begins with "#" and carries 2+ hashes. This also
// catches malformed legacy blocks like "#The Untold Exit" (spaces inside a tag)
// that a strict token-by-token match would leave behind.
function isHashLine(l) {
  const t = l.trim();
  if (!t.startsWith("#")) return false;
  return (t.match(/#/g) || []).length >= 2;
}

function stripHashtagLines(d) {
  const lines = d.split("\n").filter((l) => !isHashLine(l));
  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

const tagsIn = (s) => s.match(TAG_RE) || [];

// Legacy branding + legacy positioning left on two uploads. Replaced with copy
// that matches what the channel actually publishes, and raw "Keywords:" dumps
// are dropped entirely (metadata spam, AGENTS §4.4).
const LEGACY_COPY = [
  [/Welcome to OH BHAI! — where crazy ideas turn into unbelievable adventures!/g,
    "Welcome to The Untold Exit — where every challenge hides a question."],
  [/Subscribe to OH BHAI! for original challenge entertainment, crazy experiments, giant adventures and unbelievable experiences\./g,
    "Subscribe to The Untold Exit for animated survival stories, gaming mysteries and psychology shorts."],
  [/OH BHAI! — BIG CHALLENGES\. CRAZY ADVENTURES\. UNREAL FUN!/g,
    "The Untold Exit — LOOK BEYOND WHAT SEEMS OBVIOUS."],
  [/🎬 ABOUT OH BHAI/g, "🎬 ABOUT THE UNTOLD EXIT"],
  [/^Crazy challenges, giant builds, 24-hour adventures and insane experiments\. New videos every week\. Subscribe for more!$/gm,
    "Animated stories about spies, heists and the things companies never admit. New video every day at 20:00 UTC. Subscribe for more!"],
  [/BIG CHALLENGES\. CRAZY ADVENTURES\. UNREAL FUN!/g, "LOOK BEYOND WHAT SEEMS OBVIOUS."],
  [/Expect big challenges, crazy adventures and unreal stories\./g,
    "Expect survival stories, ancient mysteries and animated adventures."],
  [/giant builds, /g, ""],
];

// Audience-piggybacking paragraphs ("If you enjoy MrBeast challenges...") and
// other creators' video lists. These attract complaints and don't describe the
// video. Removed at paragraph level so premise text and disclaimers survive.
const PIGGY_START = [
  /^if you enjoy /i,
  /^we love (the|how) /i,
  /^inspired by /i,
  /^we took inspiration/i,
  /^our storytelling takes inspiration/i,
  /^the video takes inspiration/i,
  /^check out these popular challenge video concepts/i,
  /^🔥?\s*love challenge entertainment/i,
  /^🔥?\s*inspired by the biggest challenge creators/i,
];
const CREATOR = /mrbeast|unspeakable|airrack|stokes twins|dude perfect|ben azelart|stay wild/i;

function stripPiggyback(d) {
  const out = [];
  let skipping = false;
  for (const line of d.split("\n")) {
    const t = line.trim();
    if (PIGGY_START.some((re) => re.test(t))) { skipping = true; continue; }
    if (skipping) { if (!t) skipping = false; continue; }
    if (/^[•\-–—]\s/.test(t) && CREATOR.test(t)) continue;
    // emoji-bulleted links to other creators' videos: "🍕 MrBeast — I Ate The..."
    if (/^[^\p{L}\p{N}]{1,4}\s*(mrbeast|airrack|unspeakable|stokes twins|dude perfect|ben azelart|stay wild)\s*[—–-]/iu.test(t)) continue;
    out.push(line);
  }
  return out.join("\n").replace(/\n{3,}/g, "\n\n").replace(/[ \t]+$/gm, "");
}

function cleanLegacy(d) {
  let out = d;
  for (const [re, to] of LEGACY_COPY) out = out.replace(re, to);
  return stripPiggyback(out)
    .split("\n")
    .filter((l) => !/^\s*keywords?\s*:/i.test(l))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n");
}

function buildDesc(old, plan) {
  if (plan.descFull) return plan.descFull;
  let body = stripHashtagLines(cleanLegacy(old));
  if (plan.lead) {
    const lines = body.split("\n");
    lines[0] = plan.lead;
    body = lines.join("\n");
  }
  let out = `${body}\n\n${plan.hashtags.join(" ")}`;
  // Inline hashtags mid-paragraph: strip them if they would exceed the 15-tag cap
  // or create duplicates (duplicates also void the whole block on YouTube).
  const hts = tagsIn(out);
  const dup = hts.some((t, i) => hts.indexOf(t) !== i);
  if (hts.length > 15 || dup) {
    body = body
      .replace(/(^|\s)#[\p{L}_][\p{L}\p{N}_]*/gu, "$1")
      .replace(/[ \t]{2,}/g, " ")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
    out = `${body}\n\n${plan.hashtags.join(" ")}`;
  }
  return out;
}

function validate(oldDesc, next, plan) {
  const errors = [], warns = [];
  if (next.length > 5000) errors.push(`${next.length} chars > 5000`);
  if (!next.toLowerCase().includes(plan.tags[0])) warns.push(`primary tag "${plan.tags[0]}" not in description text`);

  const hts = tagsIn(next);
  const dupes = hts.filter((t, i) => hts.indexOf(t) !== i);
  if (dupes.length) errors.push(`duplicate hashtags: ${[...new Set(dupes)].join(",")}`);
  if (hts.length > 15) errors.push(`${hts.length} hashtags > 15`);
  if (hts.length < 3) warns.push(`${hts.length} hashtags`);

  const oldCh = chapterLines(oldDesc);
  for (const l of oldCh) if (!next.includes(l)) errors.push(`chapter lost: "${l}"`);
  if (oldCh.length >= 3 && !oldCh.some((l) => /^0:00|^00:00/.test(l))) errors.push("chapters not starting 0:00");

  if (/oh\s*[-_]?\s*bhai/i.test(next)) errors.push("retired brand 'OhBhai/OH BHAI' in description");
  if (/^\s*keywords?\s*:/im.test(next)) errors.push("raw 'Keywords:' dump line");

  // Other creators' names are allowed only where they are the video's premise
  // (caricature stories) — surface them so the list is never accidental.
  const otherCreators = (next.match(/mrbeast|unspeakable|airrack|stokes twins|dude perfect|ben azelart|stay wild/gi) || []);
  if (otherCreators.length) warns.push(`other-creator names retained: ${[...new Set(otherCreators.map((x) => x.toLowerCase()))].join(", ")}`);

  const tagChars = plan.tags.join(" ").length;
  if (tagChars > 450) errors.push(`tags ${tagChars} chars (limit ~500)`);
  if (plan.tags.length > 30) errors.push(`${plan.tags.length} tags`);
  return { errors, warns };
}

/* -------------------------------------------------------------------- main */
const up = await yt.playlistItems.list({
  part: ["contentDetails"],
  playlistId: "UUDtw5Rb0c4QONw5Ko789lig",
  maxResults: 50,
});
const ids = up.data.items.map((i) => i.contentDetails.videoId);
const vids = (await yt.videos.list({
  part: ["snippet", "status"],
  id: ids.join(","),
  maxResults: 50,
})).data.items;

const results = [], skipped = [];
for (const v of vids) {
  if (v.status.privacyStatus !== "public") {
    skipped.push({ id: v.id, title: v.snippet.title, reason: `privacy=${v.status.privacyStatus}${v.status.publishAt ? " publishAt=" + v.status.publishAt : ""}` });
    continue;
  }
  const plan = P[v.id];
  if (!plan) { skipped.push({ id: v.id, title: v.snippet.title, reason: "no plan" }); continue; }
  if (ONLY && v.id !== ONLY) continue;

  const s = v.snippet;
  const nextTitle = plan.title || s.title;
  const nextDesc = buildDesc(s.description || "", plan);
  const { errors, warns } = validate(s.description || "", nextDesc, plan);
  if (nextTitle.length > 100) errors.push(`title ${nextTitle.length} > 100`);
  if (nextTitle.length > 75) warns.push(`title ${nextTitle.length} chars — mobile truncation`);
  if (/\?\s*\./.test(nextTitle)) errors.push("stray '. ' after '?'");
  if ((nextTitle.match(/\|/g) || []).length > 2) errors.push("title has >2 pipes");

  results.push({
    id: v.id,
    oldTitle: s.title, title: nextTitle,
    oldDesc: s.description || "", desc: nextDesc,
    oldTags: s.tags || [], tags: plan.tags,
    hashtags: plan.hashtags,
    errors, warns,
    snippet: s,
  });
}

const dir = join(root, "..", "yt", "story", "metadata-refresh");
await mkdir(dir, { recursive: true });
await writeFile(join(dir, "plan.json"), JSON.stringify({
  generatedAt: new Date().toISOString(),
  results: results.map(({ snippet, ...r }) => r),
  skipped,
}, null, 2), "utf8");

console.log(`\n=== METADATA REFRESH (${APPLY ? "APPLY" : "PREVIEW"}) — ${results.length} videos · ${results.length * 50} units ===\n`);
for (const r of results) {
  const tChanged = r.oldTitle !== r.title;
  console.log(`${r.errors.length ? "❌" : "✅"} ${r.id}`);
  if (tChanged) {
    console.log(`   title ${r.oldTitle.length}→${r.title.length}`);
    console.log(`     now : ${r.oldTitle}`);
    console.log(`     next: ${r.title}`);
  } else {
    console.log(`   title unchanged (${r.title.length} chars): ${r.title}`);
  }
  console.log(`   desc  ${r.oldDesc.length}→${r.desc.length} chars · hashtags ${r.hashtags.join(" ")}`);
  console.log(`   tags  ${r.oldTags.length}→${r.tags.length} · ${r.tags.slice(0, 4).join(", ")}…`);
  if (r.warns.length) console.log(`   warn: ${r.warns.join(" | ")}`);
  if (r.errors.length) console.log(`   ERR : ${r.errors.join(" | ")}`);
  console.log("");
}
for (const s of skipped) console.log(`⏭  ${s.id} — ${s.title.slice(0, 44)} — ${s.reason}`);

if (APPLY) {
  const bad = results.filter((r) => r.errors.length);
  if (bad.length) { console.error(`\nABORT: ${bad.length} failed validation. Nothing written.`); process.exit(1); }
  console.log("\n--- writing ---");
  for (const r of results) {
    await yt.videos.update({
      part: ["snippet"],
      requestBody: {
        id: r.id,
        snippet: {
          title: r.title,
          description: r.desc,
          tags: r.tags,
          categoryId: r.snippet.categoryId,
          defaultLanguage: r.snippet.defaultLanguage || "en",
        },
      },
    });
    console.log(`✓ ${r.id}  ${r.title.length}ch · ${r.tags.length} tags`);
  }
  console.log(`\ndone: ${results.length} videos · quota ~${results.length * 50} units`);
} else {
  console.log(`\npreview → yt/story/metadata-refresh/plan.json`);
}
