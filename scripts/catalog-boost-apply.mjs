// Back-catalog boost — user-approved batch (2026-11-18): per-video tags rebuild +
// hook-first descriptions + category fix (GTA videos → 20). Titles NOT touched.
// Preserves existing description bodies (chapters/credits) — prepends hook, appends hashtags.
// Usage: node scripts/catalog-boost-apply.mjs
import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import { google } from "googleapis";

const base = join(homedir(), ".config", "youtube-studio-mcp");
const tokens = JSON.parse(await readFile(join(base, "tokens.json"), "utf8"));
const secret = JSON.parse(await readFile(join(base, "client_secret.json"), "utf8")).installed;

const auth = new google.auth.OAuth2({ clientId: secret.client_id, clientSecret: secret.client_secret });
auth.setCredentials({ refresh_token: tokens.refresh_token });
const yt = google.youtube({ version: "v3", auth });

const TAGLINE = "The Untold Exit — Look Beyond What Seems Obvious.";

// hook: prepended above existing description body. tags: full replacement. cat: category override.
const PLAN = {
  "R-qJm86xS5s": { // Brian locked Jason (GTA cinematic)
    cat: "20",
    hook: `Jason trusted Brian — and every exit locked behind him. The GTA 6 betrayal story hiding in Rockstar's biggest reveal, decoded frame by frame.`,
    tags: ["gta 6", "gta 6 story", "gta 6 jason", "jason duval", "brian heder", "gta 6 betrayal", "gta 6 cinematic", "gta 6 animation", "lucia caminos", "cal hampton", "vice city", "leonida", "gta 6 trailer", "gta 6 news", "grand theft auto 6", "gta vi", "the untold exit"],
    hash: "#GTA6 #GTAVI #GTA6Story #Animation",
  },
  "QhqpxvGjBE0": { // Prisoners vs Cops
    hook: `Three prisoners. Three cops. One escape route — and only one side gets out. The animated prison-break challenge where every decision decides the winner.`,
    tags: ["prison escape challenge", "prisoners vs police", "prison challenge", "escape challenge", "team vs team", "who escapes first", "strength challenge", "obstacle course challenge", "challenge animation", "3d animation", "animated challenge", "survival challenge", "versus challenge", "the untold exit", "ai animation"],
    hash: "#Challenge #Escape #Animation #Prison",
  },
  "0KUXSARfbVA": { // Underwater
    hook: `An underwater city sank with you inside it — and the only way out is 24 hours of flooding corridors. The animated survival challenge beneath the waves.`,
    tags: ["underwater survival", "trapped underwater", "underwater city", "ocean survival", "24 hour challenge", "escape challenge", "animated survival", "3d animation", "sea monster", "sinking city", "challenge animation", "survival challenge", "adventure animation", "the untold exit"],
    hash: "#Survival #Underwater #Animation #Challenge",
  },
  "FBXUq9gXX-I": { // Ancient P1
    hook: `Four friends wake up 4,000 years in the past — and the war is already hunting them. The animated time-travel survival story where it all begins.`,
    tags: ["time travel story", "ancient survival", "ancient civilization", "ancient war", "trapped in the past", "bronze age", "animated story", "3d animation", "survival challenge", "ancient mystery", "historical fantasy", "lost kingdom", "ancient warrior", "time travel animation", "the untold exit", "ancient history story"],
    hash: "#TimeTravel #Ancient #Survival #Animation",
  },
  "e34mKHkfC4Y": { // Jungle
    hook: `A jungle where everything survives by hunting — and you just walked in with 100 hours to get out. Animated survival against the deadliest animals alive.`,
    tags: ["jungle survival", "jungle survival challenge", "deadly animals", "dangerous animals", "jungle adventure", "animal encounters", "lost in jungle", "survival adventure", "jungle at night", "survival challenge", "animated survival", "3d animation", "wildlife adventure", "extreme survival", "the untold exit"],
    hash: "#Survival #Jungle #Animation #Challenge",
  },
  "Oeh0zuUCROw": { // Ancient P2 (Messi IS in the video — kept)
    hook: `Trapped in a kingdom rigged with ancient traps — and the betrayal comes from inside the team. Part 2 of the animated survival story 4,000 years deep.`,
    tags: ["time travel story", "ancient survival", "ancient traps", "underground army", "betrayal story", "ancient mystery", "escape challenge", "animated story", "messi", "3d animation", "survival challenge", "historical fantasy", "ancient civilization", "ancient warrior", "the untold exit"],
    hash: "#TimeTravel #Ancient #Survival #Animation",
  },
  "9P6BnLRrDxM": { // NVIDIA P2
    hook: `The spy has the chip. The CEO just resigned. Getting it back means going into the one building nobody walks out of — part 2 of the animated NVIDIA heist story.`,
    tags: ["nvidia", "ai chip", "spy story", "ai chips", "jensen huang", "tech heist", "ai chip heist", "animated story", "corporate espionage story", "spy animation", "tech thriller", "the untold exit", "animation film"],
    hash: "#NVIDIA #Spy #Animation #Story",
  },
  "SYpr2t0XIuU": { // NVIDIA P1
    hook: `Someone inside the company is stealing $5 billion in AI chips — and the only way to catch a spy is to hire one. The animated NVIDIA heist story begins.`,
    tags: ["nvidia", "spy story", "ai chips", "corporate heist", "spy challenge", "vault challenge", "animated story", "ai chip heist", "tech thriller", "espionage story", "animation film", "the untold exit"],
    hash: "#NVIDIA #Spy #Animation #Story",
  },
  "lyN781QvfII": { // GTA $1B
    cat: "20",
    hook: `GTA 6 hasn't even launched — and the estimates already top $1 billion. The numbers behind the biggest pre-launch in gaming history, in one minute.`,
    tags: ["gta 6", "gta vi", "grand theft auto 6", "gta 6 preorders", "gta 6 sales", "gta 6 1 billion", "gta 6 records", "gta 6 news", "gta 6 price", "rockstar games", "gta 6 launch", "gta 6 november 19", "gaming news", "gta 6 business", "take two interactive", "gta 6 facts"],
    hash: "#GTA6 #GTAVI #GamingNews #Shorts",
  },
  "KxOzYtPIsvk": { // 13-Year Wait
    cat: "20",
    hook: `Thirteen years. Two trailers. One development story bigger than the game itself. The real story behind GTA 6's 13-year wait — and what it cost.`,
    tags: ["gta 6 documentary", "why gta 6 took so long", "gta 6 development", "gta 6 13 years", "gta 6 explained", "rockstar games", "gta 6 behind the scenes", "project americas", "gta 6 secrets", "gta 6 news", "gta 6 release date", "vice city", "jason and lucia", "gta vi", "gaming documentary", "the untold exit"],
    hash: "#GTA6 #Rockstar #Gaming #Documentary",
  },
  "3g5WteLmvtc": { // Giant Pizza
    hook: `The biggest pizza New York has ever seen, built to feed 100 people — and every step is a disaster waiting to happen. The animated food challenge.`,
    tags: ["giant pizza", "pizza challenge", "giant food challenge", "food challenge", "making a giant pizza", "feeding 100 people", "nyc food challenge", "animated challenge", "3d animation", "extreme food challenge", "challenge animation", "the untold exit"],
    hash: "#Challenge #Pizza #Animation #FoodChallenge",
  },
  "RVyIvZ5S4cE": { // Spot the Millionaire
    hook: `One of these people is a millionaire — and every single one is lying about something. The clues are in the details if you can spot them in time.`,
    tags: ["spot the millionaire", "guess the millionaire", "millionaire challenge", "social experiment", "guessing game", "mystery challenge", "observation challenge", "hidden clues", "lie detection", "animated experiment", "3d animation", "challenge shorts", "the untold exit"],
    hash: "#Challenge #Mystery #Animation #Shorts",
  },
  "U88Lw5PzzZc": { // Only 1 Door
    hook: `Five doors. Sixty seconds. Only one won't kill you — pick wrong and the run ends here. The original choose-the-right-door animated challenge.`,
    tags: ["choose the right door", "mystery door challenge", "door challenge", "escape challenge", "mystery challenge", "survival challenge", "animated challenge", "3d animation", "challenge shorts", "choose wisely", "puzzle challenge", "the untold exit"],
    hash: "#Challenge #Mystery #Animation #Shorts",
  },
  "vEraiuwOh2o": { // Why You Keep Starting — clean; hashtags only
    hook: null,
    tags: null, // keep existing 22 topical tags
    hash: "#Discipline #Psychology #Animation #Motivation",
  },
};

const results = [];
for (const [id, plan] of Object.entries(PLAN)) {
  try {
    const cur = (await yt.videos.list({ part: ["snippet"], id: [id] })).data.items?.[0];
    if (!cur) { results.push({ id, error: "NOT_FOUND" }); continue; }
    const orig = cur.snippet.description ?? "";

    let desc = orig;
    if (plan.hook) desc = plan.hook + "\n\n" + orig;
    if (!desc.includes("Look Beyond What Seems Obvious")) desc += "\n\n" + TAGLINE;
    if (!desc.includes("#") || !orig.match(/#\w+/)) desc += "\n\n" + plan.hash;

    const snippet = {
      title: cur.snippet.title, // unchanged per approval
      description: desc,
      categoryId: plan.cat ?? cur.snippet.categoryId,
      defaultLanguage: cur.snippet.defaultLanguage ?? "en",
      defaultAudioLanguage: cur.snippet.defaultAudioLanguage ?? "en",
    };
    if (plan.tags) snippet.tags = plan.tags;

    await yt.videos.update({ part: ["snippet"], requestBody: { id, snippet } });
    results.push({
      id, views: "?",
      title: cur.snippet.title.slice(0, 45),
      hookAdded: !!plan.hook,
      tags: plan.tags ? `${cur.snippet.tags?.length ?? 0} → ${plan.tags.length}` : "kept",
      category: snippet.categoryId,
      spamRemoved: (cur.snippet.tags ?? []).filter((t) => /^(mrbeast|ronaldo|messi|lexi rivera|brent rivera|ben azelart|dude perfect|stay wild|unspeakable|airrack|stokes twins)$/i.test(t) && !(plan.tags ?? []).includes(t)),
    });
  } catch (e) {
    results.push({ id, error: String(e?.message ?? e).slice(0, 150) });
  }
}
console.log(JSON.stringify(results, null, 1));
