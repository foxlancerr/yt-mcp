#!/usr/bin/env node
// Channel branding rewrite: description + keywords aligned to what the channel
// actually publishes. Replaces the legacy "extreme challenges / last to leave /
// giant builds" MrBeast-clone wording (dead lane in the 2026-11-17 cluster data).
//
//   node scripts/channel-branding.mjs            # preview
//   node scripts/channel-branding.mjs --apply    # write (50 units)
import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

const root = dirname(fileURLToPath(import.meta.url));
const APPLY = process.argv.includes("--apply");

const DESCRIPTION = `The Untold Exit — Look Beyond What Seems Obvious.

Every video starts with a question you can't answer yet.

GTA 6 news, leaks and hidden details — decoded, never invented.
Animated survival stories — jungles, ancient kingdoms, underwater cities, and the people who should not have made it out.
Challenge mysteries — who escapes, who wins, and who was lying the whole time.
Animated psychology — why you start, why you stop, and what decides it.

New video every day at 20:00 UTC.

Everything here is our own animation and our own captures. When something cannot be verified, we say so on screen.

Subscribe if you want the version of the story nobody tells you.`;

const KEYWORDS = [
  "gta 6",
  "gta 6 news",
  "gta 6 secrets",
  "gta 6 lucia",
  "gta 6 release",
  "gta 6 leaks",
  "gta vi",
  "grand theft auto 6",
  "survival story animated",
  "animated survival story",
  "animated story",
  "survival stories",
  "animated psychology",
  "psychology shorts",
  "mystery stories",
  "hidden details",
  "gaming mysteries",
  "gta 6 explained",
  "the untold exit",
  "look beyond what seems obvious",
  "animated documentary",
  "challenge stories",
  "true story animation",
  "story animation",
]
  .map((k) => `"${k}"`)
  .join(" ");

const secret = JSON.parse(
  await readFile(join(root, "..", "src", "config", "tokens.json"), "utf8"),
).installed;
const tokens = JSON.parse(
  await readFile(join(homedir(), ".config", "youtube-studio-mcp", "tokens.json"), "utf8"),
);
const oauth = new OAuth2Client(secret.client_id, secret.client_secret);
oauth.setCredentials({ refresh_token: tokens.refresh_token });
const yt = google.youtube({ version: "v3", auth: oauth });

const ch = (await yt.channels.list({ part: ["brandingSettings", "snippet"], mine: true })).data.items[0];
const current = ch.brandingSettings || {};
const oldDesc = current.channel?.description || "";
const oldKw = current.channel?.keywords || "";

const errors = [];
if (DESCRIPTION.length > 1000) errors.push(`description ${DESCRIPTION.length} chars > 1000`);
if (KEYWORDS.length > 500) errors.push(`keywords ${KEYWORDS.length} chars > 500`);
if (/ohbhai/i.test(DESCRIPTION + KEYWORDS)) errors.push("retired brand present");
for (const dead of ["last to leave", "giant build", "extreme challenge", "24 hour challenge"]) {
  if (KEYWORDS.includes(`"${dead}`)) errors.push(`dead-lane keyword still present: ${dead}`);
}

console.log(`\n=== CHANNEL BRANDING (${APPLY ? "APPLY" : "PREVIEW"}) ===\n`);
console.log(`description ${oldDesc.length} → ${DESCRIPTION.length} chars`);
console.log(`keywords    ${oldKw.length} → ${KEYWORDS.length} chars`);
console.log(`validation  ${errors.length ? "❌ " + errors.join(" | ") : "✅ pass"}`);
console.log(`\n--- OLD DESCRIPTION ---\n${oldDesc.trim()}`);
console.log(`\n--- NEW DESCRIPTION ---\n${DESCRIPTION}`);
console.log(`\n--- OLD KEYWORDS ---\n${oldKw || "(none)"}`);
console.log(`\n--- NEW KEYWORDS ---\n${KEYWORDS}`);

if (!APPLY) {
  console.log(`\npreview only. run with --apply (50 units).`);
  process.exit(0);
}
if (errors.length) {
  console.error("\nABORT: validation failed. Nothing written.");
  process.exit(1);
}

// merge: keep every other branding field, replace only description + keywords
const merged = JSON.parse(JSON.stringify(current));
merged.channel = merged.channel || {};
merged.channel.description = DESCRIPTION;
merged.channel.keywords = KEYWORDS;

await yt.channels.update({
  part: ["brandingSettings"],
  requestBody: { id: ch.id, brandingSettings: merged },
});

const check = (await yt.channels.list({ part: ["brandingSettings"], mine: true })).data.items[0];
console.log(`\n✅ written. live description ${(check.brandingSettings.channel.description || "").length} chars`);
console.log(`✅ live keywords ${(check.brandingSettings.channel.keywords || "").length} chars`);
console.log(`quota: ~51 units`);
