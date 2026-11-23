# Clip ideas board: iShowSpeed, Lacy, Silky (2026-11-22)

**Skills used:** `viral-moment-engine` (+ `references/paid-campaigns.md`), `gta6-streamer-hunter`, `gta6-clipper`, `hook-writer`, `title-formulas`, `thumbnail-hooks`.
**Evidence:** `campaigns/gta6-board-2026-11-22.json` and `docs/clipping-rewards-platforms-2026-11-22.md` (read 2026-11-22), YouTube Data API list calls, yt-dlp search and auto-captions. Campaign budgets change hourly: re-read the rules page before cutting.

## 1. Which creators actually pay (the honest table)

| Creator | Campaign | Model | Floor to qualify | Status 2026-11-22 | What it means for you |
|---|---|---|---|---|---|
| **iShowSpeed** | "iShowSpeed Plays GTA 6 Clipping" (SpeedUniverse, Ssemble) | $1.00 per 1K views | none | **ENDED. The whole budget was $100 and is spent.** An $8,000 Expedia x IShowSpeed brief is live but is a travel brief, not GTA 6 | Best content, **no GTA 6 reward right now.** Speed clips are good for your own channel, not for payout. |
| **Lacy** | $12,500 LACY GTA VI Marathon Pool (Reach) | pool, split by share of views | 750K (CR article says 1M) | Open, about 89.4M views already, 2,428 clippers | About $0.14 per 1K. Roughly $104–$140 for 750K–1M views. Verdict on the board: **skip** unless a clip already has a big audience. Caption must name LACY and use `#LACY`; no logos; at least 50% English-speaking audience; submit within 30 minutes. |
| **Silky** | $7,500 Silky Pool (Reach) | pool | **250K** | Open, only 66 approved clips in 7 days | **Best paid odds on the board** (lowest floor, least crowded). Estimate only: $1.90–$3.75 per 1K. Caption must name Silky and use `#Silky`; no logos; no negative portrayal; no AI content; no reposts; at least 50% English. |

Rewards arrive only after the pool closes and only if a clip clears its floor. Nothing is paid for a clip below the floor. Nothing here has been submitted.

## 2. The brief you pasted, turned into rules for every clip

1. **First 1–2 seconds:** a question the viewer must answer ("what happens next?"). No intro, no channel name, no "in this video". Show the strongest unresolved frame (the aim, the arrival, the reaction) and reveal nothing else.
2. **Find every exciting moment** in the source, then build one rising sequence: surprise, reaction, a meaningful cut, rising tension, a payoff. Cut effects that do not help.
3. **Direct every shot with a timestamp.** The shot vocabulary the renderer supports (all in `tools/render_reaction_short.py`): punch-in, slow zoom (push or pull), tracking crop, face-cam close-up takeover, whip pan, freeze frame, speed ramp, impact shake, flash cut, pops, sound hits.
4. **Honest hooks only.** The hook must be something the clip delivers (hook-writer rule 1). Spoiler clips are labelled in the description.
5. **Paid mode versus channel mode:** for a pool, the clip must clear the floor (Silky 250K), so the hook and the first 3 seconds matter more than polish. Re-cut a new hook per platform; never submit the same finished clip to two campaigns.

## 3. Idea list

### 3.1 In production now

| # | Idea | Source | Creator | Paid today? | Status |
|---|---|---|---|---|---|
| 1 | **iShowSpeed meets Niko Bellic from GTA 4 in GTA 6** | Speed's "BEATING GTA 6 RIGHT NOW 100% (FINAL MISSION)" stream, 1:40:40–1:44:50 | iShowSpeed | No (campaign ended); channel content | **This session:** `yt/story/ishowspeed-niko-bellic/story.md` |

Evidence for #1: the same moment is already a proven topic. [Speedy Boykins, "iShowSpeed Meets Niko Bellic From GTA 4 In GTA 6", 346,772 views, 170 s](https://www.youtube.com/watch?v=9bJi3b4KP8Y), and [TD Creation, 273 s, 10,470 views](https://www.youtube.com/watch?v=7gN84oYIwGw). Captions from Speed's own stream confirm the scene: "Oh no. Look who it is. It's been a long time." then Speed: "He's from GTA 4."

### 3.2 Already made earlier (for reference, see each story file)

| Idea | Folder |
|---|---|
| Speed after 52 hours: GTA 6 ending (124 s) | `yt/story/ishowspeed-gta6-final-mission/` |
| Cassandra Ep1 prison visit, Ep2 Jason looks, Ep3 Lana | `yt/story/cassandra-gta6-*` |
| Kai club drinking mission | `yt/story/kai-club-drinking-mission/` |
| Mission clips board | `yt/story/gta6-mission-clips-board-2026-11-22/` |

### 3.3 Not yet scanned (do not treat as findings)

I have **not** read the Lacy or Silky streams yet, so these are search phrases to run, not moments. Each needs captions, loudness and frames before it counts.

| Creator | Phrases to run (stream VOD first) | Why a pool floor may be reachable |
|---|---|---|
| Silky (floor 250K) | "Silky GTA 6 shocked reaction", "Silky final mission", "Silky Lucia arrested" (the example plan on the board uses an arrest/shot scene) | Lowest floor, few competing clips |
| Lacy (floor 750K+) | "Lacy GTA 6 funniest moments", "Lacy police chase", "did he just crack Lacy" (the most viewed GTA clip on any live campaign: 21.5M views) | High demand but crowded; only worth it for a top clip |
| iShowSpeed (channel only) | "IShowSpeed GTA 6 meets [GTA 4/5 character]" (Niko, Jimmy, lookalike), "IShowSpeed GTA 6 NPC fight" | Speedy Boykins' Speed clips: Niko 346K, Jimmy (GTA 5) 139K, lookalike 1.07M, road-rage 130K |

## 4. High-retention sequence template (use for any moment)

| Out time | Beat | Shot |
|---|---|---|
| 0.0–2.0 s | **Cold open:** the single strongest unresolved frame from later in the scene | Punch-in on the face or the object, record scratch + 0.4 s freeze |
| 2.0–3.5 s | Hook text, 2 lines, honest | Whip pan into the start of the scene |
| 3.5–25 s | Premise and open loop (a plant: something the viewer needs resolved) | Slow push, tracking crop on the action |
| 25–60 s | Escalation: each beat louder or closer than the last | Reaction close-ups (face-cam takeover), speed ramp on dead air |
| Peak | The reveal | Impact shake + sound hit, freeze, pop text |
| Last 3–5 s | Payoff line + one call to action (subscribe, with the Runner) | Loop back to the cold-open frame |

## 5. Safety notes (apply to all)

- Source licence: Speed's, Lacy's and Silky's streams are on the standard YouTube/Twitch licence. Taking them is under your 2026-11-21 instruction (risk accepted); a claim or takedown is possible. A paid campaign's own rules may grant clipping rights for its source: read them before submitting.
- No logos, no reposts of someone else's edit, no AI content (Silky), no negative portrayal (Silky, Lacy).
- Violence, profanity and licensed music: handled per clip (blur, auto-mute, flag).
- Nothing is uploaded, scheduled or submitted without your explicit yes.
