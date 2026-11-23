# Story v2 (research-backed): "He Hugged GTA 6's Monster. It Hurt." (Kyle McKittrick)

**Skills used:** `story-pipeline`, `viral-video-writing`, `visual-style`, `thumbnail-hooks`, `runner-reactions`, `gta6-clipper` rules, manual policy check (AGENTS.md §4.0).
**Pillar:** P3 · **Format:** 9:16 Short, about 60 s (user sets the final length) · **Status:** story and edit plan only. Nothing rendered, nothing uploaded or scheduled.
**Supersedes:** the hook/edit plan in `story.md`. `story.md` stays as the v1 record. Its §11 "Build status" is **not verified** (see §9 below).

---

## 1. Research (what was actually found, 2026-11-23)

**Evidence source:** YouTube Data API via `scripts/trend-scan.mjs` and `tag-scan.mjs` (TubeLab not connected), plus public pages read by me (Kotaku, Game Rant, walkthrough sites) and the videos themselves (downloaded at 480p, transcribed with faster-whisper, scene cuts counted with ffmpeg).

**Not retrievable, so not used:** Facebook, TikTok and X. Their public pages returned nothing readable (X search: HTTP 402; Facebook/TikTok: empty without a login). I did not use cookies or any workaround. Any claim about those platforms would be invented, so there are none.

### 1.1 Top videos and what they do

| Video | Views | Length | What it is | Direction notes |
|---|---|---|---|---|
| NEXT QUEST, origin explainer (`iBINGJyq1As`) | 10.83M | 53 s | Plain voice-over, 26 cuts in 52.8 s (a new picture about every 2 s) | Opens on a question ("How is this monster-looking character actually a normal man?"), then walks Chapter 2 → Chapter 3 in order, ends on the hug and the jump. No music hook, no effects. **The story is the hook.** |
| Speedy Boykins, Speed's raw reaction (`JEaW9KnTijQ`) | 4.1M | 129 s | Uncut stream, 0 cuts | Runs on Speed's voice only. Best lines: "Should I do a hug him?", "I feel bad, bro.", "Hey, you hurting me!" |
| YrkOFFplay, "Hulk Hugs: Lucia vs. Jason" (`AqPvOu3tr4M`) | 959K | 11 s | Two hugs stacked and compared, no cuts | Highest views per second in the niche, on a 23.9K-sub channel |
| Small-channel Kyle clips (TIGER, Rocinha Games, CozeyChaos) | 29K–36K | 29–61 s | One idea about Kyle as a person | 45×–351× their subscriber count |

**What this means for the edit**
1. The explainer lane (10.8M) beats the reaction lane (4.1M). Tell Kyle's story, keep Speed's voice as the emotional payoff.
2. The hug is the strongest single idea. Nobody builds the whole story around it.
3. Pace in the winner is about one new picture every 2 s. Our 3–4 s rule is slower, so every shot gets a zoom beat to keep it moving.
4. The hug short compares two hugs. Optional second angle: end with "Lucia hugged Jason. Kyle hugged you." Only if the user wants it.

### 1.2 Fact sheet (only these may be captioned)

| Fact | Source |
|---|---|
| Kyle McKittrick, strawberry farmer, crop duster | explainer, walkthrough sites |
| Chapter 2: you spray chemicals with his plane. Chapter 3: police surround the farm and ask you to bring him out | explainer |
| In the barn he has become a giant monster, "just like the Hulk" | explainer |
| Two choices: defeat him (reward $5,000 in the explainer) or help him escape | explainer |
| If you help, he defeats everyone except you, then hugs you and jumps away | explainer, Game Rant |
| After the hug he jumps away; Game Rant says you meet him once more, then never again | Game Rant |
| "Red Hulk" is a fan nickname. The game's character name is Kyle | Kotaku and wikis; do not state it as the in-game name |

**Sources disagree (so the video does not state them):** the strawberry is *given* in one guide and *sold for $1,000* in the explainer; the hug *costs health* in Game8 but Beebom lists no cost. Safe wording: "Speed said 'you hurting me'" (his actual line) instead of "the hug costs health".

### 1.3 Tags in real use
`gta 6 red hulk`, `red hulk gta 6`, `gta 6 kyle`, `speed meets red hulk`, `red hulk appears`. Hashtags: `#gta6`, `#shorts`, `#ishowspeed`, `#hulk`, `#redhulk`.

### 1.4 Honest note on "1M views"
No edit can promise 1M. What the data supports: a reaction re-upload of a 2.8M-sub channel got 1.4× its subs; the 959K hug short came from a 24K channel. So a 1M outcome is possible but depends on the feed picking up the first-3-second retention. This plan stacks every lever the data shows (hug as the hook, specific story, fast zoom cadence, a loop) and nothing more. The numbers are directional, from a small sample.

---

## 2. Curiosity hook (0.0–3.6 s) — exactly as specified

The cliffhanger is the **payoff line from the end of the scene**, shown first: Speed mid-hug saying *"Hey, you hurting me!"* (source 100.6–103.0). The viewer asks "who is hurting him, and why is he hugging it?" The full hug is shown unbroken later at 36 s, so the teaser is never the only copy of that scene.

| Out time | What happens | Layer |
|---|---|---|
| 0.00–0.20 | Black, a single low riser starts | riser under everything |
| 0.20–2.60 | Source 100.6–103.0 plays in **black-and-white**, slow 3% push | mono, pitch-up riser |
| 2.60–3.60 | **1.0 s freeze** on the last frame, still B&W, hairline glitch tear | glitch SFX stab |
| 3.60 | **Sharp white flash (3 frames)**, then the next shot is in **full colour** | flash + whoosh hit |

On-screen text during the hook (one line, no extra): `HE ASKED FOR A HUG`.
The final frame (CTA) returns to this same B&W freeze so the Short loops.

---

## 3. Shot list (out time ← source time in `JEaW9KnTijQ`)

Rule kept: no scene is cut before its point lands. Zoom beats (115%) do the work of "a new picture every 3–4 s" so the long hug stays one unbroken shot. Captions are our own text, Speed's voice stays under. **Frame content is from the contact sheet and captions only; confirm on frame before captioning anything (§8).**

| # | Out | Source | Caption (our words) | Move / effect |
|---|---|---|---|---|
| H | 0.0–3.6 | 100.6–103.0 + freeze | HE ASKED FOR A HUG | hook above |
| 1 | 3.6–7.4 | 36.0–39.8 | In Chapter 2 he was a strawberry farmer named Kyle | punch to 115%, then hold |
| 2 | 7.4–10.8 | 40.8–44.2 ("That's Red Hulk!") | In Chapter 3 he became this | **PEAK 1:** white flash + bass drop + 3-frame micro-vibration |
| 3 | 10.8–14.4 | 56.0–59.6 | The police wanted him gone | slow pull from 115% |
| 4 | 14.4–18.0 | 62.0–65.5 | Speed had a choice | punch 115% on "It's me" |
| 5 | 18.0–21.6 | 71.0–74.6 | Fight him… or help him | tracking crop to Speed's face |
| 6 | 21.6–25.2 | 76.9–80.5 | | pull to wide |
| 7 | 25.2–29.0 | 81.4–85.2 | "You need to leave." | punch 115% |
| 8 | 29.0–33.0 | 84.7–88.7 ("Buddy?") | | slow push, riser starts |
| C | 33.0–35.2 | — (black card) | THEN HE ASKED FOR ONE THING | card + heartbeat |
| 9 | 35.2–46.7 | 91.5–103.0 **unbroken** | | punch 115% at 38.7, at 42.2, at 45.7 (every 3.5 s, no cut). **PEAK 2:** at "Hey, you hurting me!" (101.6) only a white flash + micro-vibration, no glitch |
| 10 | 46.7–50.3 | 106.5–108.4 + 111.5–113.2 ("I feel bad, bro." / "Here.") | Then he jumped away | whoosh on the jump |
| E | 50.3–54.3 | — (dark card) | NEVER SEEN AGAIN? | quiet, heartbeat fades. Keep only if Game Rant's "last time you see him" is confirmed in play |
| F | 54.3–58.0 | freeze of the hook frame | Would you have hugged him? | CTA + replay, same B&W frame as 0:00 |

Effects budget (strictly on peaks and jumps): flashes at 3.6, 7.4, 101.6-source; glitch only at 2.6 and 0.0; micro-vibration at 7.4 and the hug peak; glitch transition at the 10.8 scene jump. Nothing else, so the peaks still hit.

### Sound plan
Riser 0.0–3.6, glitch stab 2.6, whoosh 3.6, bass drop 7.4, heartbeat 33.0–35.2, riser 29–33, whoosh at 46.7, heartbeat fade 50.3. No licensed music. Speed's audio stays; the f-word at the 36.0 line must be muted (mute window to be set from the word times).

---

## 4. Titles (30–40 characters)

| # | Title | Chars |
|---|---|---|
| **1 PRIMARY** | **He Hugged GTA 6's Monster. It Hurt.** | 35 |
| 2 | Why GTA 6's Monster Asked for a Hug | 35 |
| 3 | GTA 6's Monster Only Wanted a Hug | 33 |

"It Hurt" is supported by Speed's own line ("Hey, you hurting me!"). The title does not claim the game says the hug costs health.

## 5. Thumbnail

**Text (2 words):** **HUG HURTS** (alternate: COSTS HEALTH). It completes the title instead of repeating it.

**Prompt A, recommended (about 62 words):** Pitch-black barn, one huge thick-outlined red arm closing around The Runner, who stands small in cream gi and red headband, eyes shut, arms open for a hug; above him a health bar drained to one red sliver; cream text "HUG HURTS" top-left with "HURTS" in red; flat 2D, thick outlines, no gradients; small unmodified GTA VI logo bottom-right.

**Prompt B (about 55 words):** Extreme close-up of The Runner's wide eyes, red shock marks, on the left of a black frame; on the right a barn door cracks open with one glowing red hand; cream text "HUG HURTS" bottom-left; flat 2D, thick outlines, single brightest point is the hand; small unmodified GTA VI logo bottom-right.

Both: The Runner only, locked palette, no real face, no game screenshot.

## 6. Description (Short, no chapter block)

```
GTA 6's "Red Hulk" is a strawberry farmer named Kyle. In Chapter 3 he turns into a monster. If you help him, he asks for one thing.

Footage: IShowSpeed's GTA 6 stream. Edit, captions and commentary by The Untold Exit.

SPOILER: optional side mission, not the main story.

Look Beyond What Seems Obvious.
```

Hashtags: `#gta6 #shorts #ishowspeed #redhulk`
Tags: gta 6, gta 6 red hulk, red hulk gta 6, kyle mckittrick, gta 6 kyle, gta 6 hug, ishowspeed gta 6, speed meets red hulk, gta 6 side mission, gta 6 secrets, gta vi, grand theft auto 6
madeForKids: false · Category: Gaming.

## 7. Runner + CTA

Runner only in the bottom band: `suspense` on the freeze (0.4), `recoil` at 7.5, `nervous` at 29.5, `sad` at 46.8, `love` after the hug line, CTA at 54.3 "Would you have hugged him? Comment 1 or 2" (one-digit CTA, per the repo pattern). No Runner over the hook text or the hug.

## 8. Policy check (AGENTS.md §4.0)

| Check | Result |
|---|---|
| Copyright | Pass per the user's 2026-11-23 confirmation that iShowSpeed footage is cleared. Transformative layer: own captions, hook, Runner, crops. No logos or licensed music |
| Metadata accuracy | Pass. "Red Hulk" only as a fan nickname in quotes. No claim about the strawberry price or the health cost |
| Spoiler | Disclosed |
| Profanity | Mute required before render |
| Fake engagement / spam | Pass |
| COPPA | Not made for kids |

**Confirm on frame before render:** content of the source windows in §3 (I worked from captions and contact sheets), that the 10.8 s jump and the final card are accurate, and the exact f-word window. **Cleared to build, not cleared to publish.** Nothing is uploaded without your explicit yes.

## 9. What exists on disk (checked 2026-11-23)

Found: research media in `yt/gta6-clips/media/hulk/` (gitignored: explainer, Speed 4.1M clip, hug short, transcripts, contact sheets).
**Missing:** the `speed-kyle` config in `speed_clips.py`, `tools/make_sfx.py`, `tools/build_kyle_config.py`, a `sounds/` folder, and the `freeze/mono/glitch/vib` effects in `render_reaction_short.py` (only the pre-existing `freeze` per-piece option is there). The v1 `story.md` §11 claims they were built; that is not true of this checkout. Rendering v2 means rebuilding them. Raw footage of the Speed clip is in hand, so a render from `JEaW9KnTijQ.webm` at 480p is possible as a draft, but a final needs the full-quality stream window.
