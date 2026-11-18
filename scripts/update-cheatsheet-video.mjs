#!/usr/bin/env node
// Single-video SEO upgrade: 6-gW5p51670 ("GTA 6 Cheat Sheet Is Almost All Fake")
//
//   node scripts/update-cheatsheet-video.mjs           # preview
//   node scripts/update-cheatsheet-video.mjs --apply
//
// Accuracy guardrails: the video debunks fake codes. It must never imply that
// working GTA 6 codes exist, and must never claim gameplay footage it doesn't
// have (it's an animated The Runner short).
import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

const root = dirname(fileURLToPath(import.meta.url));
const VIDEO = "6-gW5p51670";
const APPLY = process.argv.includes("--apply");

const NEW_TITLE = "GTA 6 Cheat Sheet Is Almost All Fake | GTA 6 Cheats & Cheat Codes";

const NEW_DESCRIPTION = `The GTA 6 cheat sheet going around is GTA 5's codes in a new wrapper — here's what's actually real, and the rule behind every GTA 6 cheat code.

No GTA 6 cheats are confirmed. Rockstar has published nothing, so every "working GTA 6 cheat codes PS5" list online right now is recycled from GTA 5. This video breaks down:

• Why the sheet is borrowed GTA 5 codes, relabeled
• Which items never existed at all — money cheats, jetpack, flying cars
• The 1-999 keypad rule that turns cheat words into phone numbers (TURTLE becomes 1-999-887-853)
• The cost the sheet never mentions: achievements off, no saving while a cheat is active, and a ban for online cheating

None of this is a leak or a confirmed GTA 6 cheat code. Sources checked 2026-11-18: Rockstar has published no GTA 6 cheat codes. Anything claiming working codes before launch is fabricated.

With GTA 6 news moving this fast, this is the accuracy check worth keeping before November 19.

Which word would you dial first? Comment it.

The Untold Exit — Look Beyond What Seems Obvious.
Subscribe for more.

#shorts #GTA6 #GTA6cheats #GTA6CheatCodes #GrandTheftAuto6`;

const TAGS = [
  "gta 6 cheat codes",
  "gta 6 cheats",
  "gta 6 cheat sheet",
  "gta 6 cheats fake",
  "gta 6 cheat codes ps5",
  "gta 6 cheat codes xbox",
  "gta 6 phone cheats",
  "gta 6 cheats debunked",
  "gta 5 cheats",
  "gta 6 secrets",
  "gta 6 myths",
  "gta 6 news",
  "gta 6 launch day",
  "gta 6 release date",
  "gta 6 tips",
  "grand theft auto 6",
  "gta vi",
  "gta 6 explained",
  "gta 6 debunked",
  "the untold exit",
];

const secret = JSON.parse(
  await readFile(join(root, "..", "src", "config", "tokens.json"), "utf8"),
).installed;
const tokens = JSON.parse(
  await readFile(join(homedir(), ".config", "youtube-studio-mcp", "tokens.json"), "utf8"),
);
const oauth = new OAuth2Client(secret.client_id, secret.client_secret);
oauth.setCredentials({ refresh_token: tokens.refresh_token });
const yt = google.youtube({ version: "v3", auth: oauth });

const cur = await yt.videos.list({
  part: ["snippet", "status", "contentDetails"],
  id: VIDEO,
});
const v = cur.data.items?.[0];
if (!v) throw new Error(`video ${VIDEO} not found on this channel`);

const errors = [];
const warns = [];

// title
if (NEW_TITLE.length > 100) errors.push(`title ${NEW_TITLE.length} > 100`);
if (NEW_TITLE.length > 70) warns.push(`title ${NEW_TITLE.length} chars — tail truncates on mobile`);
if ((NEW_TITLE.match(/\|/g) || []).length > 1) errors.push("more than one pipe");
for (const kw of ["GTA 6 Cheats", "Cheat Codes"]) {
  if (!NEW_TITLE.toLowerCase().includes(kw.toLowerCase())) errors.push(`title missing "${kw}"`);
}
if (/ohbhai/i.test(NEW_TITLE + NEW_DESCRIPTION)) errors.push("retired brand");

// description
const hashtags = NEW_DESCRIPTION.match(/#[\p{L}\p{N}_]+/gu) || [];
if (hashtags.length < 3 || hashtags.length > 5) errors.push(`hashtags ${hashtags.length} (need 3–5)`);
if (new Set(hashtags).size !== hashtags.length) errors.push("duplicate hashtags");
if (NEW_DESCRIPTION.length > 5000) errors.push(`description ${NEW_DESCRIPTION.length} > 5000`);
// accuracy: must not claim working codes, must not claim gameplay
if (/working GTA 6 (cheat|code)/i.test(NEW_DESCRIPTION.replace(/every "working GTA 6 cheat codes PS5" list online right now is recycled/i, ""))) {
  errors.push("claims working codes");
}
if (!/no GTA 6 cheats are confirmed|rockstar has published no GTA 6 cheat codes/i.test(NEW_DESCRIPTION)) {
  errors.push("missing accuracy disclaimer");
}
if (/gta 6 gameplay/i.test(NEW_DESCRIPTION)) warns.push("mentions 'GTA 6 gameplay' — video has no gameplay");
// chapter block sanity: video is 1:42, Shorts-style, no chapters expected
if (/^\d{1,2}:\d{2}\s/m.test(NEW_DESCRIPTION)) warns.push("timestamp-like line present");

// tags
const tagChars = TAGS.join(",").length;
if (tagChars > 500) errors.push(`tags ${tagChars} chars > 500`);
if (new Set(TAGS.map((t) => t.toLowerCase())).size !== TAGS.length) errors.push("duplicate tags");

console.log(`\n=== ${VIDEO} — ${APPLY ? "APPLY" : "PREVIEW"} ===\n`);
console.log(`published : ${v.snippet.publishedAt} · ${v.contentDetails.duration} · ${v.status.privacyStatus}`);
console.log(`\nTITLE (${v.snippet.title.length} → ${NEW_TITLE.length})`);
console.log(`  - ${v.snippet.title}`);
console.log(`  + ${NEW_TITLE}`);
console.log(`\nTAGS (${(v.snippet.tags || []).length} → ${TAGS.length}, ${tagChars}/500 chars)`);
console.log(`  + ${TAGS.join(", ")}`);
console.log(`\nHASHTAGS: ${hashtags.join(" ")}`);
console.log(`\nDESCRIPTION (${(v.snippet.description || "").length} → ${NEW_DESCRIPTION.length} chars)\n`);
console.log(NEW_DESCRIPTION.split("\n").map((l) => "  | " + l).join("\n"));
console.log("\nVALIDATION:", errors.length ? "❌ " + errors.join(" | ") : "✅ pass", warns.length ? "\n  ⚠ " + warns.join(" | ") : "");

if (!APPLY) {
  console.log("\npreview only — re-run with --apply");
  process.exit(errors.length ? 1 : 0);
}
if (errors.length) {
  console.error("\nABORT — nothing written");
  process.exit(1);
}

await yt.videos.update({
  part: ["snippet"],
  requestBody: {
    id: VIDEO,
    snippet: {
      title: NEW_TITLE,
      description: NEW_DESCRIPTION,
      tags: TAGS,
      categoryId: v.snippet.categoryId || "20",
      defaultLanguage: v.snippet.defaultLanguage || "en",
    },
  },
});
console.log("\n✓ updated · quota 50 units");

const after = await yt.videos.list({ part: ["snippet"], id: VIDEO });
const s = after.data.items[0].snippet;
console.log(`\nverified: ${s.title.length} char title · ${(s.tags || []).length} tags · ${s.description.length} char description`);
console.log(`title now: ${s.title}`);
