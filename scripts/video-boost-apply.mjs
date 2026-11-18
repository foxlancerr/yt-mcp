// Boost update for ONE video (user-approved): description + tags + category fix + chapter trim.
// Sends back the FULL snippet with only the approved fields mutated (API replaces omitted fields).
// Usage: node scripts/video-boost-apply.mjs <videoId>
import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import { google } from "googleapis";

const videoId = process.argv[2] ?? "NjwpwUcxo8Y";
const base = join(homedir(), ".config", "youtube-studio-mcp");
const tokens = JSON.parse(await readFile(join(base, "tokens.json"), "utf8"));
const secret = JSON.parse(await readFile(join(base, "client_secret.json"), "utf8")).installed;

const auth = new google.auth.OAuth2({ clientId: secret.client_id, clientSecret: secret.client_secret });
auth.setCredentials({ refresh_token: tokens.refresh_token });
const yt = google.youtube({ version: "v3", auth });

const cur = (await yt.videos.list({ part: ["snippet"], id: [videoId] })).data.items?.[0];
if (!cur) { console.log("NOT_FOUND"); process.exit(1); }

const newDescription = `GTA 6 went live 18 hours early through the New Zealand trick — and the players who rushed in are asking if their PSN accounts will survive. How the NZ trick works, why PlayStation's door stayed (almost) shut, and why Rockstar said nothing at all.

CHAPTERS
0:00 It's already on
0:32 The three acts
1:05 The planet has 39 midnights
2:05 The migration
3:05 The dread: will accounts survive?
3:55 A wave, not a moment

Release timing and ban-report status verified as of recording; any unconfirmed report is labeled as such in the video. We do not recommend region-changing your account — platform terms of service apply, and the risk is real.

Trailer frames: © Rockstar Games — official press materials, used for commentary and criticism. Not affiliated with Rockstar Games or Sony.

The Untold Exit — Look Beyond What Seems Obvious.

#GTA6 #GTAVI #NZTrick #NewZealand #GTA6Launch`;

const newTags = [
  "gta 6 new zealand trick", "new zealand trick", "gta 6 new zealand",
  "gta 6 early", "play gta 6 early", "gta 6 18 hours early",
  "gta 6 banned", "gta 6 psn ban", "gta 6 release time", "gta 6 unlock time",
  "gta 6 countdown", "gta 6 launch", "gta 6 launch day", "gta 6 midnight",
  "gta 6 news", "gta 6", "gta vi", "gta 6 xbox", "gta 6 ps5", "gta 6 streamers",
];

const res = await yt.videos.update({
  part: ["snippet"],
  requestBody: {
    id: videoId,
    snippet: {
      title: cur.snippet.title,              // unchanged — user's title, pending their pick
      description: newDescription,
      tags: newTags,
      categoryId: "20",                       // Gaming (was 1 Film & Animation)
      defaultLanguage: cur.snippet.defaultLanguage ?? "en",
      defaultAudioLanguage: cur.snippet.defaultAudioLanguage ?? "en",
    },
  },
});

console.log(JSON.stringify({
  updated: res.status === 200,
  diff: {
    title: { kept: cur.snippet.title },
    description: { firstLine_before: cur.snippet.description.split("\n")[0], firstLine_after: newDescription.split("\n")[0], chaptersFixed: "removed 4:35 line (exceeded 4:05 runtime — invalid chapter list)" },
    tags: { before: cur.snippet.tags?.length ?? 0, after: newTags.length, added: ["gta 6", "gta vi", "gta 6 launch day", "gta 6 banned", "gta 6 psn ban", "new zealand trick", "gta 6 18 hours early"] },
    categoryId: { before: cur.snippet.categoryId, after: "20 (Gaming)" },
  },
}, null, 1));
