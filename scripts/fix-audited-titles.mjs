#!/usr/bin/env node
// Audit fixes 2026-11-17 (user approved):
// A) De-duplicate + standardize series titles (Ancient Part 1-5, Zombie Part 1-3, NVIDIA Part 2-3)
// B) Strip hashtags out of titles (they stay in descriptions where present)
// C) Remove celebrity tag-stuffing (Ronaldo/Messi/Trump) from the Underwater video
// Everything else in the snippet is re-sent unchanged.
import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

const root = dirname(fileURLToPath(import.meta.url));

// explicit new titles
const newTitles = {
  // Ancient Kingdom series — unique titles, consistent numbering, finale de-duplicated from Ep2
  FBXUq9gXX_I: "WE WOKE UP 4,000 YEARS AGO… AND THE WAR HAD ALREADY STARTED (Part 1)",
  Oeh0zuUCROw: "WE WOKE UP 4,000 YEARS AGO… AND AN ARMY WAS HUNTING US (Part 2)",
  BrM4EGZmS9A: "THEY'VE BEEN WATCHING US SINCE WE ARRIVED (Part 3)",
  IJkY_6bwR_4: "WE ESCAPED AN ANCIENT ARMY… BUT THEY FOUND US (Part 4)",
  "9whKbsK8eJg": "WE WOKE UP 4,000 YEARS AGO… HERE'S HOW IT ENDS (Part 5)",
  // Zombie Jungle series — consistent numbering
  HzERoRgVeg8: "I WOKE UP IN A JUNGLE FULL OF ZOMBIES… AND THEY WERE CLIMBING! (Part 1)",
  "0mowMHmz8S4": "I ESCAPED THE ZOMBIES… BUT THE HELICOPTER WAS A TRAP (Part 2)",
  Kty2EgXb1Vs: "I THOUGHT THE ZOMBIES WERE HUNTING ME… I WAS WRONG! (Part 3)",
  // NVIDIA series — normalize numbering
  "9P6BnLRrDxM": "HOT SPY STOLE OUR AI CHIP… THEN OUR CEO RESIGNED (Part 2)",
  ENqmS1TK9ww: "We caught the Chinese Spy Scandal… but she was never the real enemy? (Part 3)",
  // hashtag-only strips
  "R-qJm86xS5s": "Brian LOCKED Jason In… But WHY?",
  KxOzYtPIsvk: "The INSANE Story Behind GTA 6's... 13-Year Wait?!",
  sSoXsBdFyrg: "GTA 6's STRANGEST Hidden Location… WHAT IS THIS?!",
  QhqpxvGjBE0: "3 Prisoners vs 3 Cops. Who Escapes?",
  "3bo30G13wIA": "This Mountain Breaks Every Rider.",
  qa2joiuxoqM: "Why You'd Never Survive This Volcano.",
  Q0aMXZQw3KU: "SOLO vs TEAM: 5,000-Foot PARACHUTE RACE! Who Lands First?",
  q13UENT7yqk: "You Have 2 Minutes. Don't Look Down.",
};
// fix underscores: YouTube IDs use hyphens
newTitles["FBXUq9gXX-I"] = newTitles.FBXUq9gXX_I; delete newTitles.FBXUq9gXX_I;
newTitles["IJkY_6bwR-4"] = newTitles.IJkY_6bwR_4; delete newTitles.IJkY_6bwR_4;

// fix C: drop these tags
const dropTags = { "0KUXSARfbVA": [/^ronaldo$/i, /^messi$/i, /^trump$/i] };

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

const targets = [...new Set([...Object.keys(newTitles), ...Object.keys(dropTags)])];
const d = await youtube.videos.list({ part: ["snippet"], id: targets.join(",") });

let ok = 0, failed = 0;
for (const v of d.data.items) {
  const s = v.snippet;
  const newTitle = newTitles[v.id];
  const patterns = dropTags[v.id] || [];
  const newTags = (s.tags || []).filter((t) => !patterns.some((p) => p.test(t)));
  const titleChanged = newTitle && newTitle !== s.title;
  const tagsChanged = patterns.length > 0 && JSON.stringify(newTags) !== JSON.stringify(s.tags || []);
  if (!titleChanged && !tagsChanged) { console.log(`skip ${v.id} (already clean)`); continue; }
  try {
    await youtube.videos.update({
      part: ["snippet"],
      requestBody: {
        id: v.id,
        snippet: {
          title: titleChanged ? newTitle : s.title,
          description: s.description,
          tags: newTags,
          categoryId: s.categoryId,
          defaultLanguage: s.defaultLanguage,
          defaultAudioLanguage: s.defaultAudioLanguage,
        },
      },
    });
    ok++;
    console.log(`[${new Date().toISOString()}] fixed ${v.id} title:${titleChanged} tags:${tagsChanged} -> "${(titleChanged ? newTitle : s.title).slice(0, 60)}"`);
  } catch (err) {
    failed++;
    console.error(`[${new Date().toISOString()}] FAILED ${v.id}: ${err.message}`);
  }
}
console.log(`done: ok=${ok} failed=${failed}`);
