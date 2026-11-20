#!/usr/bin/env node
// GTA 6 Secrets playlist — description SEO rewrite.
//
//   node scripts/gta6-playlist-seo.mjs            # preview only (no writes)
//   node scripts/gta6-playlist-seo.mjs --apply    # writes (needs explicit user go)
//
// Rules enforced (manual metadata checks + AGENTS §4.10):
//  - one primary keyword + 5–10 related, written into prose (never a keyword dump)
//  - existing chapter block preserved verbatim and re-validated
//  - 3–5 hashtags, no duplicates
//  - no "OhBhai", no claim the video shows something it doesn't
//  - videos that are private/scheduled are skipped entirely (AGENTS §4.5)
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { homedir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

const root = dirname(fileURLToPath(import.meta.url));
const PLAYLIST = "PLRXf1uVlif1Q";
const APPLY = process.argv.includes("--apply");
const onlyIdx = process.argv.indexOf("--only");
const ONLY = onlyIdx > -1 ? process.argv[onlyIdx + 1] : null;

/* ------------------------------------------------------------------ plans */
// {{CHAPTERS}} is replaced with the video's existing chapter block, verbatim.
const PLANS = {
  KxOzYtPIsvk: {
    primary: "GTA 6 release date",
    added: ["GTA 6 news", "GTA 6 trailer", "GTA 6 development", "GTA 6 delayed", "Grand Theft Auto 6", "GTA VI", "GTA 6 Rockstar Games"],
    hashtags: ["#GTA6", "#RockstarGames", "#GrandTheftAuto6", "#GTAVI"],
    description: `Why did GTA 6 take 13 years? The real development story behind the GTA 6 release date — Project Americas, two trailers, and the delays Rockstar never fully explained.

Thirteen years. Two trailers. One development story bigger than the game itself.

Most GTA 6 news stops at the GTA 6 trailer and the GTA 6 release date. This documentary goes behind both: what Rockstar Games was building since the Project Americas era, how Red Dead Redemption 2 reset the standard, why the real Miami research took years, and how GTA 6's delays actually stacked up.

Grand Theft Auto 6 — GTA VI — arrives November 19, 2026 on PlayStation 5 and Xbox Series X|S. The longest wait in the series ends there.

After all those years, will it be worth it?

Watch until the end.

TIMELINE
{{CHAPTERS}}

IMPORTANT: This video is a documentary-style explanation based on publicly reported information and official Rockstar announcements. Some visuals are AI-generated cinematic illustrations and reenactments, not actual Rockstar development footage or gameplay.

GTA 6 is scheduled for November 19, 2026, on PlayStation 5 and Xbox Series X|S.

Was 13 years worth the wait, or did Rockstar take too long? Tell us below.

Subscribe for more GTA 6 mysteries, gaming documentaries, hidden details, and stories.

#GTA6 #RockstarGames #GrandTheftAuto6 #GTAVI

The Untold Exit — Look Beyond What Seems Obvious.`,
  },

  lyN781QvfII: {
    primary: "GTA 6 pre-orders",
    added: ["GTA 6 pre order", "GTA 6 price", "GTA 6 release date", "GTA 6 launch", "GTA 6 news", "Grand Theft Auto 6", "GTA VI", "GTA 6 Rockstar Games"],
    hashtags: ["#GTA6", "#GTAVI", "#GTA6News", "#GrandTheftAuto6"],
    description: `GTA 6 pre-orders passed an estimated $1.18 billion before launch — how the GTA 6 release date became the biggest pre-launch in gaming history.

GTA 6 hasn't launched yet… and it's already making headlines with an estimated $1.18 BILLION in digital pre-orders. 🤯

How did Rockstar get here before anyone entered Vice City? We break down the estimated 12.13 million pre-orders, the $79.99 Standard Edition, the $99.99 Ultimate Edition, and the business behind the GTA 6 launch.

This is GTA 6 news you can check yourself against the GTA 6 price and the GTA 6 release date.

One important catch: these are Sensor Tower estimates, NOT officially confirmed sales figures from Rockstar Games or Take-Two.

Grand Theft Auto 6 — GTA VI — launches November 19, 2026. Is this about to become the biggest gaming launch ever?

Subscribe to The Untold Exit for more GTA 6 mysteries, gaming facts and crazy stories.

#GTA6 #GTAVI #GTA6News #GrandTheftAuto6

The Untold Exit — Look Beyond What Seems Obvious.`,
  },

  "R-qJm86xS5s": {
    primary: "GTA 6 Jason",
    added: ["GTA 6 Lucia", "GTA 6 characters", "GTA 6 story", "GTA 6 trailer", "GTA 6 secrets", "Leonida", "Vice City", "GTA VI"],
    hashtags: ["#GTA6", "#GTAVI", "#JasonDuval", "#GTAShorts"],
    description: `Brian locked every exit on Jason — the GTA 6 Jason and Lucia story hiding inside Rockstar's biggest reveal, decoded frame by frame.

Jason trusted Brian. But when every exit suddenly locked, one radio message exposed a terrifying betrayal…

Was Brian secretly working with the FIB?

Watch until the end. 👀

Fan-made GTA VI story animation built around the GTA 6 trailer, the Leonida setting and the Jason and Lucia dynamic explored in GTA 6 characters coverage. Not official Rockstar gameplay or canon.

#GTA6 #GTAVI #JasonDuval #GTAShorts

The Untold Exit — Look Beyond What Seems Obvious.`,
  },

  NjwpwUcxo8Y: {
    primary: "GTA 6 release time",
    added: ["GTA 6 midnight release", "GTA 6 New Zealand release time", "GTA 6 global release time", "GTA 6 launch day", "GTA 6 countdown", "GTA 6 PS5", "GTA 6 Xbox"],
    hashtags: ["#GTA6", "#GTAVI", "#NZTrick", "#GTA6Launch"],
    // restored 2026-11-18 after the first apply pass dropped this block
    chapters: [
      "0:00 It's already on",
      "0:32 The three acts",
      "1:05 The planet has 39 midnights",
      "2:05 The migration",
      "3:05 The dread: will accounts survive?",
      "3:55 A wave, not a moment",
    ],
    description: `GTA 6 release time explained: how the New Zealand trick let players start GTA 6 almost 18 hours before their own midnight release — and why the ban risk is real.

CHAPTERS
{{CHAPTERS}}

The GTA 6 launch day scramble, the GTA 6 midnight release in each region, and what PlayStation's door actually did. The GTA 6 New Zealand release time is simply the earliest midnight on the planet — the GTA 6 global release time rolls west from there, which is why the GTA 6 countdown looks different depending on your GTA 6 PS5 or GTA 6 Xbox region.

Release timing and ban-report status verified as of recording; any unconfirmed report is labeled as such in the video. We do not recommend region-changing your account — platform terms of service apply, and the risk is real.

Trailer frames: © Rockstar Games — official press materials, used for commentary and criticism. Not affiliated with Rockstar Games or Sony.

The Untold Exit — Look Beyond What Seems Obvious.

#GTA6 #GTAVI #NZTrick #GTA6Launch`,
  },

  "KQoNl-voCnw": {
    primary: "GTA 6 preload",
    added: ["GTA 6 download size", "GTA 6 midnight release", "GTA 6 unlock time", "GTA 6 release time", "GTA 6 launch day", "GTA 6 PS5", "GTA 6 Xbox"],
    hashtags: ["#GTA6", "#Shorts", "#GTAVI", "#GTA6Launch"],
    description: `GTA 6 preload is finished — every file downloaded, still unplayable. How the GTA 6 download size, encryption and midnight unlock actually work.

Millions already downloaded GTA 6 — and not one person can play it.
Every file is encrypted until midnight, when one key turns for the
whole planet at once. The biggest heist in gaming has no thief.

If you're tracking the GTA 6 release time or the GTA 6 unlock time for your region, this is what happens between the GTA 6 preload and the GTA 6 midnight release — on GTA 6 PS5, GTA 6 Xbox, and every launch-day queue.

Follow for Part 2: the first 18 hours of GTA 6.

File facts verified from press coverage as of recording. No leaked
or datamined content is shown or described. Not affiliated with
Rockstar Games.

The Untold Exit — Look Beyond What Seems Obvious.

#GTA6 #Shorts #GTAVI #GTA6Launch`,
    // remove retired-brand + off-topic legacy tags, add the keyword set
    tags: [
      "gta 6 preload", "gta 6 download size", "gta 6 encrypted", "gta 6 locked files",
      "gta 6 unlock time", "gta 6 midnight", "gta 6 midnight release", "gta 6 release time",
      "gta 6 launch", "gta 6 launch day", "gta 6 countdown", "gta 6 ps5", "gta 6 xbox",
      "gta 6 leonida", "gta vi", "gta 6 news", "gta 6 short", "grand theft auto 6",
      "the untold exit",
    ],
  },

  "3buS8kA7Qio": {
    primary: "GTA 6 countdown",
    added: ["GTA 6 release countdown", "GTA 6 live countdown", "GTA 6 midnight release", "GTA 6 release time USA", "GTA 6 release time UK", "GTA 6 launch day", "GTA 6 hours left"],
    hashtags: ["#GTA6", "#GTAVI", "#Countdown", "#Shorts"],
    description: `The GTA 6 countdown ends here — the final 60 seconds before the GTA 6 midnight release, with unlock times for the US, UK and Europe.

Thirteen years. Sixty seconds. One voice.
Count down the final minute before GTA 6 — calm, slow, and all the
way home.

This is a 60-second GTA 6 release countdown short, not a 24/7 live stream. Unlocks at midnight local time: UK 00:00 UTC · Europe (CET) 23:00 UTC · GTA 6 release time USA — East 05:00 UTC Nov 19, West 08:00 UTC Nov 19.

Play it in the last minute of your own GTA 6 launch day countdown and walk into Vice City with us.

The Untold Exit — Look Beyond What Seems Obvious.

#GTA6 #GTAVI #Countdown #Shorts`,
  },

  DrxALhLInLA: {
    primary: "GTA 6 leaks",
    added: ["GTA 6 leaked gameplay", "GTA 6 latest news", "GTA 6 development news", "GTA 6 Rockstar update", "Grand Theft Auto 6", "GTA VI"],
    hashtags: ["#GTA6", "#GTA6Leak", "#Documentary", "#Animation"],
    description: `GTA 6 leaks changed gaming forever: in 2022 one teenager pulled 90 videos out of Rockstar's own servers. This week the verdict finally landed.

In 2022, one teenager took GTA 6 from inside Rockstar's own servers —
90 videos, the biggest leak in gaming history. This week, the case
finally closed. This is the full story: how it happened, what it
nearly destroyed, and the verdict almost nobody predicted.

If you follow GTA 6 news, this is the leak behind every GTA 6 leaked gameplay frame that still circulates — and the reason GTA 6 development news has been read so carefully ever since.

This video is documentary commentary. Court facts from public record;
the latest ruling sourced in the harvest notes. No leaked material is
shown or linked anywhere in this video. Mental-health details stated
neutrally and respectfully. Not affiliated with Rockstar Games or
Take-Two Interactive.

The Untold Exit — Look Beyond What Seems Obvious.

#GTA6 #GTA6Leak #Documentary #Animation`,
  },

  "048FGKt95zk": {
    primary: "GTA 6 mistakes to avoid",
    added: ["GTA 6 tips", "GTA 6 release date", "GTA 6 launch day", "GTA 6 news", "GTA 6 first mission", "Grand Theft Auto 6"],
    hashtags: ["#shorts", "#GTA6", "#GTA6tips", "#GrandTheftAuto6", "#UntoldExit"],
    description: `4 GTA 6 mistakes you can't undo in your first 10 minutes — the GTA 6 tips nobody gives you before the GTA 6 launch day rush.

Your first 10 minutes in GTA 6 can quietly wreck your whole playthrough — here are the 4 regrets to avoid.

4 irreversible GTA 6 day-one mistakes, counted down from 4 to 1:
1) Skipping the opening
2) Spending your first cash
3) Ignoring the tutorial prompts
4) The irreversible choice

If you're planning your first session around the GTA 6 release date, keep this GTA 6 mistakes to avoid list open — the opening hour is the one part of the game you can't replay your way out of. No GTA 6 gameplay shown; these are decisions, not mechanics.

Which regret almost got you? Comment the number.

The Untold Exit — Look Beyond What Seems Obvious.
Subscribe for more.

#shorts #GTA6 #GTA6tips #GrandTheftAuto6 #UntoldExit`,
  },

  PsdNCzTWHXs: {
    primary: "GTA 6 pre order",
    added: ["GTA 6 release date", "GTA 6 launch day", "GTA 6 news", "GTA 6 price", "Grand Theft Auto 6"],
    hashtags: ["#shorts", "#GTA6", "#GTA6tips", "#GrandTheftAuto6", "#UntoldExit"],
    description: `GTA 6 pre order bonuses are already expiring: 5 free GTA 6 rewards, and four of them sit on a deadline that lands around the GTA 6 launch.

GTA 6 is giving you 5 free things right now — and 4 of them expire on a clock.

1) Free game codes (Twitch daily · Kick 10,000) — through Nov 30
2) Golden Iguana badge — collect all 12 drop items by Nov 30
3) 6 Twitch chain badges — 1 hour/day, Nov 18–30
4) Free month of GTA+ — claim by Mar 31, 2027 (PS) / 180 days (Xbox)
5) Vintage Vice City Pack — own the game before Nov 19, 23:59:59

GTA 6 news pages list all of these as "free", but the deadlines are the real story: the Vintage Vice City Pack needs the game owned before the GTA 6 release date closes, and the Twitch rewards stop at the end of November. Check the edition against the GTA 6 price before you claim.

Which one are you grabbing first? Comment the number.

The Untold Exit — Look Beyond What Seems Obvious.
Subscribe for more.

#shorts #GTA6 #GTA6tips #GrandTheftAuto6 #UntoldExit`,
  },
};

/* ----------------------------------------------------------------- helpers */
const root2 = dirname(fileURLToPath(import.meta.url));
const tokens = JSON.parse(
  await readFile(join(homedir(), ".config", "youtube-studio-mcp", "tokens.json"), "utf8"),
);
const secret = JSON.parse(
  await readFile(join(root2, "..", "src", "config", "tokens.json"), "utf8"),
).installed;
const oauth = new OAuth2Client(secret.client_id, secret.client_secret);
oauth.setCredentials({ refresh_token: tokens.refresh_token });
const yt = google.youtube({ version: "v3", auth: oauth });

// Chapter lines come in both dashed ("00:00 — Label") and plain ("0:00 Label")
// forms. Match on the timestamp + a following word, never on the dash.
const chapterLines = (d) =>
  d
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => /^\d{1,2}:\d{2}(?::\d{2})?\s+[—–-]?\s*\S/.test(l));

const hashtagsOf = (d) => d.match(/#[\p{L}\p{N}_]+/gu) || [];

function validate(oldDesc, newDesc, plan, title) {
  const errors = [];
  const warns = [];

  const oldCh = chapterLines(oldDesc);
  const newCh = chapterLines(newDesc);
  if (oldCh.length >= 3) {
    for (const line of oldCh) if (!newDesc.includes(line)) errors.push(`chapter line lost: "${line}"`);
    if (newCh.length < oldCh.length) errors.push(`chapters dropped: ${oldCh.length} → ${newCh.length}`);
    if (!oldCh.some((l) => l.startsWith("0:00") || l.startsWith("00:00"))) errors.push("chapters do not start at 0:00");
  }

  const tags = hashtagsOf(newDesc);
  const dupes = tags.filter((t, i) => tags.indexOf(t) !== i);
  if (dupes.length) errors.push(`duplicate hashtags: ${[...new Set(dupes)].join(", ")}`);
  if (tags.length > 15) errors.push(`${tags.length} hashtags — YouTube ignores all above 15`);
  if (tags.length < 3) warns.push(`${tags.length} hashtags (3–5 recommended)`);

  if (/ohbhai/i.test(newDesc)) errors.push("contains retired brand 'OhBhai'");
  if (newDesc.length > 5000) errors.push(`${newDesc.length} chars > 5000 limit`);
  if (!newDesc.toLowerCase().includes(plan.primary.toLowerCase())) errors.push(`primary keyword "${plan.primary}" missing`);

  const firstLine = newDesc.split("\n")[0];
  const primaryPos = firstLine.toLowerCase().indexOf(plan.primary.toLowerCase());
  if (primaryPos < 0 || primaryPos > 160) warns.push("primary keyword not in the first 160 chars of line 1");
  if (/[^\n]#[^\n]*#/.test(newDesc) && /#\S+\s+#\S+\s+#\S+\s+#\S+\s+#\S+/.test(newDesc.split("\n").pop())) {
    /* multi-hashtag single line is normal */
  }

  return { errors, warns };
}

/* -------------------------------------------------------------------- main */
const items = [];
let pageToken = "";
do {
  const r = await yt.playlistItems.list({
    part: ["contentDetails"],
    playlistId: PLAYLIST,
    maxResults: 50,
    pageToken: pageToken || undefined,
  });
  items.push(...(r.data.items || []));
  pageToken = r.data.nextPageToken || "";
} while (pageToken);

const ids = items.map((i) => i.contentDetails.videoId);
const vids = await yt.videos.list({
  part: ["snippet", "status", "contentDetails"],
  id: ids.join(","),
  maxResults: 50,
});

const results = [];
const skipped = [];

for (const v of vids.data.items) {
  // privacy first: scheduled videos are private and out of bounds regardless of plan
  if (v.status.privacyStatus !== "public") {
    skipped.push({
      id: v.id,
      title: v.snippet.title,
      reason: `privacy=${v.status.privacyStatus}${v.status.publishAt ? ` publishAt=${v.status.publishAt}` : ""} — scheduled/private, not touched (AGENTS §4.5)`,
    });
    continue;
  }
  const plan = PLANS[v.id];
  if (!plan) {
    skipped.push({ id: v.id, title: v.snippet.title, reason: "no plan (not in scope)" });
    continue;
  }
  if (ONLY && v.id !== ONLY) continue;

  const oldDesc = v.snippet.description || "";
  const oldCh = chapterLines(oldDesc);
  const sourceCh = plan.chapters && plan.chapters.length ? plan.chapters : oldCh;
  const newDesc = plan.description.replace("{{CHAPTERS}}", sourceCh.join("\n"));
  const nextTags = plan.tags || v.snippet.tags || [];
  const { errors, warns } = validate(oldDesc, newDesc, plan, v.snippet.title);
  if (plan.chapters) {
    for (const line of plan.chapters) if (!newDesc.includes(line)) errors.push(`restored chapter missing: "${line}"`);
    if (newDesc.includes("{{CHAPTERS}}")) errors.push("unreplaced {{CHAPTERS}} placeholder");
  }

  results.push({
    id: v.id,
    title: v.snippet.title,
    primary: plan.primary,
    added: plan.added,
    oldDesc,
    newDesc,
    oldTags: v.snippet.tags || [],
    newTags: nextTags,
    tagsChanged: JSON.stringify(v.snippet.tags || []) !== JSON.stringify(nextTags),
    errors,
    warns,
  });
}

const stamp = new Date().toISOString();
const dir = join(root2, "..", "yt", "story", "gta6-playlist-seo");
await mkdir(dir, { recursive: true });
await writeFile(
  join(dir, "plan.json"),
  JSON.stringify({ playlist: PLAYLIST, generatedAt: stamp, results, skipped }, null, 2),
);

// human-readable diff for approval
const md = [
  `# GTA 6 Secrets playlist — description rewrite preview`,
  ``,
  `Playlist: \`${PLAYLIST}\` · generated ${stamp} · ${results.length} videos · ${skipped.length} skipped`,
  ``,
  `Apply with \`node scripts/gta6-playlist-seo.mjs --apply\` (${results.length * 50} quota units).`,
  ``,
  ...results.flatMap((r) => [
    `## ${r.title}`,
    ``,
    `- id: \`${r.id}\` · primary keyword: **${r.primary}**`,
    `- added: ${r.added.join(", ")}`,
    `- hashtags: ${hashtagsOf(r.newDesc).join(" ")} · tags ${r.oldTags.length} → ${r.newTags.length}`,
    `- validation: ${r.errors.length ? "❌ " + r.errors.join("; ") : "✅ pass"}${r.warns.length ? " · ⚠ " + r.warns.join("; ") : ""}`,
    ``,
    `### Before`,
    "```",
    r.oldDesc,
    "```",
    `### After`,
    "```",
    r.newDesc,
    "```",
    ``,
  ]),
  `## Skipped`,
  ...skipped.map((s) => `- \`${s.id}\` ${s.title} — ${s.reason}`),
  ``,
].join("\n");
await writeFile(join(dir, "preview.md"), md);

console.log(`\n=== GTA 6 SECRETS PLAYLIST — DESCRIPTION PLAN (${APPLY ? "APPLY" : "PREVIEW"}) ===\n`);
for (const r of results) {
  console.log(`${r.id}  ${r.title.slice(0, 52)}`);
  console.log(`   primary keyword : ${r.primary}`);
  console.log(`   added           : ${r.added.join(" · ")}`);
  console.log(`   hashtags        : ${hashtagsOf(r.newDesc).join(" ")}`);
  console.log(`   tags            : ${r.oldTags.length} → ${r.newTags.length}${r.tagsChanged ? " (changed)" : ""}`);
  console.log(`   validation      : ${r.errors.length ? "❌ " + r.errors.join(" | ") : "✅ pass"}${r.warns.length ? "  ⚠ " + r.warns.join(" | ") : ""}`);
  console.log("");
}
for (const s of skipped) console.log(`⏭  SKIPPED ${s.id} — ${s.title.slice(0, 45)} — ${s.reason}`);

if (APPLY) {
  const bad = results.filter((r) => r.errors.length);
  if (bad.length) {
    console.error(`\nABORT: ${bad.length} plan(s) failed validation. Nothing written.`);
    process.exit(1);
  }
  console.log("\n--- writing ---");
  for (const r of results) {
    const v = vids.data.items.find((x) => x.id === r.id);
    await yt.videos.update({
      part: ["snippet"],
      requestBody: {
        id: r.id,
        snippet: {
          title: v.snippet.title,
          description: r.newDesc,
          tags: r.newTags,
          categoryId: v.snippet.categoryId,
          defaultLanguage: v.snippet.defaultLanguage || "en",
        },
      },
    });
    console.log(`✓ updated ${r.id}`);
  }
  console.log(`\ndone: ${results.length} videos · quota ~${results.length * 50} units`);
} else {
  console.log(`\npreview written to ${join(dir, "plan.json")}`);
  console.log(`quota: ~2 units (reads only). Run with --apply after approval.`);
}
