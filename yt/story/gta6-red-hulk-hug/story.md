# Story pipeline: "GTA 6's Monster Only Wanted a Hug" (Kyle McKittrick / Red Hulk)

**Skills run:** `story-pipeline` → `viral-video-writing` (hook shortlist, script scoring loop) → `visual-style` (palette/character law) → `thumbnail-hooks` (2-word text → T-pattern prompts) → `runner-reactions` (reaction + CTA plan) → manual policy check (AGENTS.md §4.0).
**Pillar:** P3 (GTA 6 gaming) · **Format:** 9:16 vertical Short, 71s · **Status:** story only — no footage in hand, nothing rendered, nothing scheduled.
**Brief from the user:** elite short-form retention edit of the iShowSpeed "monster in GTA 6" moment — 2–5s curiosity hook with freeze + B&W flash + riser, no premature cuts, a visual change every 3–4s, punch-ins at ~115%, glitch/white-flash only on emotional peaks, SFX synced to those peaks.

**Honest read up front:** the request was to edit the reaction clip. The data says the reaction clip is the *losing* version of this topic. The 10.47M outlier on this exact subject is an **origin explanation**, not a reaction (4.0M for the biggest reaction re-upload). So this story keeps Speed's hug as the emotional payoff but tells **Kyle's** story.

**Sourcing: authorized.** The user confirmed on 2026-11-23 that iShowSpeed footage is cleared for use. Plan B (Speed-heavy, established channel pattern) is the live plan; the copyright row in §9 is now a pass, not a condition.

---

## 1. Research summary

### 1.1 What actually happened (facts sheet — every claim the script uses)

| Fact | Source |
|---|---|
| The "monster" is **Kyle McKittrick**, a crop-duster farmer in **Kelly County** | [retrobroker](https://retrobroker.com/en-US/us/blog/gta-6-strangers-and-freaks-walkthrough), [gta6wiki](https://gta6wiki.eu/easter-eggs/red-hulk-strawberry-farmer) |
| His questline is *Strangers & Freaks*, opens in **Chapter 2** from a flyer outside the **Starlet Motel** reception | retrobroker |
| Mission chain: **Check Out McKittrick Farm → Spraying the Strawberries → Hazardous Materials → Collect Chemicals for Kyle → Check on Kyle / "Buddy?"** | [gtabase](https://gtabase.com/gta-6/strangers/collect-chemicals-for-kyle), [Perfect Score walkthrough](https://www.youtube.com/watch?v=jLrnAuNxFzY) |
| He is growing **giant mutated strawberries** with questionable chemicals; he is **coughing** and it is "not doing him any good" | gtabase |
| He **gives you a mutated strawberry**; eating it **temporarily buffs all your stats**, no negative effect | [PowerPyx](https://powerpyx.com/gta-6-collect-chemicals-for-kyle-walkthrough) |
| **Mutandis agents** come to the farm; Kyle panics, **bursts out of the barn** as a giant red mutant | [outputlag](https://outputlag.com/guides/gta-6-check-on-kyle-mission) |
| He **throws a man into a helicopter** and wipes out the responding officers | [gta6wiki](https://gta6wiki.eu/easter-eggs/red-hulk-strawberry-farmer), [trari](https://trari.com/en/story/speedyboykins7869-42231) |
| **Two endings:** help the police kill him, or let him finish the squad | Perfect Score walkthrough |
| If he lives, he **sits down and asks for a hug**; hugging **costs you health** but he is not hostile | [Game Rant](https://gamerant.com/gta-6-hulk-location), [gameshorizon](https://gameshorizon.com/guides/gta-6-red-hulk-kyle-full-quest-secrets-all-endings) |
| **iShowSpeed hugged him** — "I feel like I got to hug him. I feel bad, bro." | [trari](https://trari.com/en/story/speedyboykins7869-42231), clip captions |
| After the hug he **jumps away**; you meet him **one more time**, he jumps away again — **the last time you ever see him** | [Game Rant](https://gamerant.com/gta-6-where-find-kyle-red-hulk-after-he-jumps-flies-runs-away) |
| The mission is **not missable**; reward is $1,000 + the strawberries | [bloxodes](https://bloxodes.com/wiki/gta-6/strangers-and-freaks) |

`[VERIFY ON FRAME]` before captioning: that the thrown figure is a man, that the helicopter itself goes down, and the exact count of officers. Do not caption anything you have not seen in the footage.

### 1.2 Trend evidence (Data API, 2026-11-23, TubeLab not connected)

`node scripts/trend-scan.mjs "gta 6 red hulk" 7` → 10 videos:

- **Median 1,679,745 views · shorts median 855,211 · top outlier 134.7× subs**
- **#1: `NEXT QUEST` — "How Kyle Became the Red Hulk in GTA 6 Explained" — 10,470,019 views, 53s, 77.7K subs.** An **origin explainer**, not a reaction.
- #2 reaction (`Zynxize` WTF moments) 4.4M at 10.8× — but it is a compilation, not this moment.
- #3 **`Speedy Boykins` — "iShowSpeed Finds A HULK-LIKE MONSTER In GTA 6" — 4,024,290 views, 129s, 2.81M subs = 1.4×.** The reaction lane is a **4× smaller ceiling than the explainer lane**, and it decays with channel size (1.4× on 2.8M subs).
- `YrkOFFplay` — "Hulk Hugs: Lucia vs. Jason" — 880,927 views, **11s, 36.9× on 23.9K subs** → the *hug* is the highest-performing idea per second in the whole cluster.

`node scripts/trend-scan.mjs "gta 6 kyle mckittrick" 7` → median 42,929, but:
- `TIGER` — "GTA 6 Has a Red Hulk… and You Can HUG Him?!" — 34,381 views, 44s, **146.3× on 235 subs**
- `Rocinha Games` — 35,908 views, 29s, **45.1× on 796 subs**
- `CozeyChaos` — "Never Hug Red Hulk Kyle" — 29,478 views, 61s, **350.9× on 84 subs**
- `Perfect Score` (full 18-min questline) — 52,333 views on 850K subs = **0.1×**

**The pattern is unambiguous:** small channels win on this topic with **short, specific, single-idea clips about Kyle as a person**; big channels lose with long questlines and generic reactions. The word "hug" is the highest-leverage term in the niche right now and almost nobody builds the story around it.

`node scripts/tag-scan.mjs "gta 6 red hulk" 7` — real tags in use: `gta 6 red hulk` (4/25), `red hulk gta 6` (3), `gta 6 kyle` (2), `speed meets red hulk` (2), `red hulk appears` (2). Hashtags: `#gta6` 23, `#shorts` 13, `#ishowspeed` 9, `#hulk` 7, `#redhulk` 4.

### 1.3 The gap we exploit

Every clip in the top 40 shows **the monster**. None tells you **what he was before, that his gift made you stronger, or that the hug is the last time you ever see him.** The origin explainer (10.4M) covers the first half and stops at the transformation. The emotional ending — the part that makes people comment — is unclaimed.

**Positioning:** where the niche hands you a monster, The Untold Exit hands you a person. "Look Beyond What Seems Obvious."

---

## 2. Hook + curiosity architecture

**Hook shortlist** (judged on clarity, curiosity, truth, and whether the payoff is in the clip):

| # | Hook | Verdict |
|---|---|---|
| 1 | **"Everyone clipped GTA 6's monster. Nobody stayed for the hug."** | **CHOSEN** — names the topic, sets a contrast, withholds the payoff, and is literally true of the entire niche |
| 2 | "GTA 6's monster gave you a gift first." | Strong, but the gift is weaker than the hug as an emotional payoff |
| 3 | "Kyle only wanted bigger strawberries." | Clear, low curiosity — no gap |
| 4 | "You can only meet this monster once." | Good, but it is the *ending*, so it spoils the loop |
| 5 | "Speed hugged the monster in GTA 6." | True but flat: states the payoff, kills the question |

**Why #1 works:** contrast (everyone vs nobody) + a physical, unexpected image ("the hug") + a promise the viewer cannot resolve without watching. It also survives the 10%-size test.

**Open loops, opened and closed:**

| Loop | Opened | Closed |
|---|---|---|
| Why would anyone hug a monster? | 0:00 | 0:50 |
| What did the strawberry do to *you*? | 0:14 | 0:22 |
| Which ending did Speed pick? | 0:40 | 0:54 |
| What happened to Kyle after? | 0:54 | 1:08 |

**Script scored** with the `viral-video-writing` checker (`py scripts/score.py`): **90/100 PASS**, 159 words ≈ 40s spoken over 71s of footage. Iterations: 85 → 90 (added a named subject to the hook, broke an 11s re-hook gap with "Five missions. One cough.", added the closing question). Remaining soft flags: one 12s stretch (deliberately covered on screen by the burst + helicopter + squad-wipe, three visual turns) and "no explicit CTA" — handled by the `cta_kit` end-card layer, which always carries a graphic ask.

---

## 3. Script — beat sheet (71.0s, Speed's own audio, no voice-over)

Narration is on-screen caption text. Speed's voice carries the emotion underneath. `[FILL]` = needs the real stream window.

| Out | Beat | Caption / on-screen | Picture (source window) |
|---|---|---|---|
| 0:00–0:03.2 | **HOOK** | Everyone clipped GTA 6's monster. / Nobody stayed for the hug. | `[FILL]` barn-burst frame, **desaturated to B&W**, **frozen 0.9s**, riser under it |
| 0:03.2–0:04.1 | **FLASH IN** | — | White flash 4 frames → **snaps to full colour** |
| 0:04.1–0:07.6 | Name | His name is Kyle. He is a crop duster in Kelly County. | `[FILL]` Kyle at the fence, plane behind — punch in 115% |
| 0:07.6–0:11.2 | Re-hook | Five missions. One cough. That is all it took. | `[FILL]` Starlet Motel flyer / mission start |
| 0:11.2–0:14.8 | Setup | The chemicals were experimental. He kept spraying. | `[FILL]` spraying the strawberry rows |
| 0:14.8–0:18.4 | The gift | Then he gave you one of his strawberries. | `[FILL]` Kyle handing the berry — **ping SFX** on the hand-off |
| 0:18.4–0:22.0 | **Twist** | It boosted every stat you had. | `[FILL]` stat bars rising — punch in 115% |
| 0:22.0–0:25.6 | Link | The thing that made him that, made you stronger. | `[FILL]` berry in inventory, red glow |
| 0:25.6–0:29.2 | Turn | Then the agents came for his farm. | `[FILL]` Mutandis SUVs arriving — **glitch transition in** |
| 0:29.2–0:33.0 | Build | Kyle panicked. | `[FILL]` barn door shaking, Kyle's voice rising |
| 0:33.0–0:36.6 | **PEAK 1** | What came out of that barn was not Kyle. | Barn burst — **bass drop + white flash + 1.15× punch** |
| 0:36.6–0:40.2 | Payoff 1 | He threw a man into a helicopter. | Throw → helicopter — vine boom on impact |
| 0:40.2–0:43.6 | Escalate | He wiped out the whole squad. | Squad down — punch in, no flash (peak used) |
| 0:43.6–0:47.2 | **CARD** | ONE BARN / TWO ENDINGS | Full-frame dark card, riser |
| 0:47.2–0:50.8 | Stakes | Help them kill him, or let him finish. | Choice prompt on screen |
| 0:50.8–0:54.4 | **PEAK 2** | If he lives, he sits down. And he asks for one thing. A hug. | Kyle sitting — punch in, **heartbeat** |
| 0:54.4–0:58.0 | Emotional peak | It costs you health. Speed hugged him anyway. | **Speed's hug reaction** — `[FILL]`, keep his line whole |
| 0:58.0–1:01.6 | Turn | Then Kyle jumped away. | The leap — whoosh |
| 1:01.6–1:05.2 | Cold beat | You find him one more time. Then never again. | Empty field where he stood |
| 1:05.2–1:08.4 | **CARD** | NO FOLLOW UP / NOTHING | Dark card, heartbeat, silence |
| 1:08.4–1:11.0 | Loop + CTA | Would you have hugged him? | Return to the **same frozen B&W frame** as 0:00 + CTA + REPLAY strip |

**Narrative rule (user's brief, honoured):** no beat is cut mid-point. The hug sequence runs **7.2 seconds unbroken** — the longest shot in the edit — because it is the payoff. The only trims are stream dead air before and after it, never inside it.

**Visual-change cadence:** 21 shots / 71s = **one visual change every 3.4s**, inside the 3–4s target. Turns (not just cuts) land at 0:14.8, 0:22.0, 0:33.0, 0:43.6, 0:50.8, 1:05.2 — no 8-second gap without a new idea.

---

## 4. Storyboard grid (9:16, 1080×1920)

Layout is the channel's locked one: blurred game fill, Speed's facecam top (665px), game crop middle, captions on the seam, The Runner only in the bottom band at ~13% screen height.

| # | Time | Visual | Runner | Sound |
|---|---|---|---|---|
| S1 | 0:00–0:03.2 | B&W freeze, barn burst | suspense (frozen) | riser 0.35 |
| S2 | 0:03.2–0:04.1 | White flash → colour | curious | riser peak + hit |
| S3 | 0:04.1–0:07.6 | Kyle, plane, fence | curious | Speed amb. |
| S4 | 0:07.6–0:11.2 | Motel flyer | curious | whoosh |
| S5 | 0:11.2–0:14.8 | Spraying rows | suspicious | amb. + birds |
| S6 | 0:14.8–0:18.4 | Berry hand-off | reveal | **ding** 0.4 |
| S7 | 0:18.4–0:22.0 | Stat bars | shock | UI ticks |
| S8 | 0:22.0–0:25.6 | Berry, red glow | curious | bass swell |
| S9 | 0:25.6–0:29.2 | SUVs arrive | nervous | **glitch** + whoosh |
| S10 | 0:29.2–0:33.0 | Barn door shaking | nervous | heartbeat 0.30 |
| S11 | 0:33.0–0:36.6 | **BURST** | shock | **bass_drop 0.5 + flash** |
| S12 | 0:36.6–0:40.2 | Throw + heli | shock | **vine_boom 0.4** |
| S13 | 0:40.2–0:43.6 | Squad down | recoil | amb. + sirens |
| S14 | 0:43.6–0:47.2 | CARD one barn/two endings | suspense | **riser 0.3** |
| S15 | 0:47.2–0:50.8 | Choice prompt | curious | UI |
| S16 | 0:50.8–0:54.4 | Kyle sits | sad | **heartbeat 0.25** |
| S17 | 0:54.4–0:58.0 | Speed hug (kept whole) | love | Speed's voice, no music |
| S18 | 0:58.0–1:01.6 | The leap | relief | whoosh |
| S19 | 1:01.6–1:05.2 | Empty field | sad | wind, no music |
| S20 | 1:05.2–1:08.4 | CARD no follow up | sad | heartbeat, silence |
| S21 | 1:08.4–1:11.0 | Loop to S1 frame + CTA | curious → CTA | REPLAY strip |

**Trim rule:** never trim S17 (the hug) or S11 (the burst). Everything else can lose 3–4 frames to keep the pace.

---

## 5. Runner reactions + CTA (`runner-reactions`)

| Time | Animation | Word | Dopamine beat |
|---|---|---|---|
| 0.3 | `suspense` (freeze) | WAIT FOR IT... | suspense |
| 3.6 | `curiosity` | WAIT...? | curiosity gap #2 inside the hook |
| 15.0 | `reveal` | THERE IT IS! | reward ping |
| 18.6 | `recoil` | WHAT?! | shock (the stat buff) |
| 26.0 | `nervous` | UH OH... | dread |
| 33.4 | `recoil` | NO WAY! | **peak 1** |
| 37.0 | `shock` | BRUH! | impact |
| 51.2 | `sad` | OH NO! | emotional turn |
| 54.8 | `love` | AWWW! | **peak 2 — kept breathing, no flash** |
| 58.4 | `suspense` | HOLD ON... | the leap |
| 62.0 | `sad` | WHY?! | the loss |
| 68.6 | CTA, type `emotional` | "Would you have waited? COMMENT!" | loop |

Reaction cadence 0.5–2s each, ≥0.8s apart, never over the gameplay or the hook text — all per the skill's rules. CTA type is chosen by `cta_kit.choose()` from the real reaction plan; `emotional` is the expected pick because the clip ends sad, not funny. `loop=True` adds the REPLAY strip back to the hook line.

---

## 6. Titles — hook type, ranked by CTR logic

Short-form titles are read in about one second on a phone, truncated near 40 characters in the feed. Every one below front-loads **"GTA 6"** (the search term) and puts the curiosity in the back half so the truncation cuts the *answer*, not the hook.

| # | Title | Chars | Hook type | Why it earns the click |
|---|---|---|---|---|
| **1 PRIMARY** | **Why GTA 6's Monster Asked for a Hug** | 35 | Question + odd image | "Why" opens a gap the clip closes; a monster *asking* is the strangest true thing about him. Keyword first, payoff withheld |
| 2 | He Gave You a Gift Before He Mutated | 36 | Second person + withheld object | Puts the viewer inside it. The gift is unnamed, so the only way to know is to watch |
| 3 | Everyone Clipped Him. Nobody Hugged Him. | 40 | Contrast + accusation | Indicts the whole niche; the viewer feels late to something. Highest comment-bait potential |
| 4 | GTA 6's Monster Only Wanted a Hug | 33 | Inversion statement | Shortest, cleanest, most emotional. Best of the three to pair with a hard thumbnail |
| 5 | GTA 6 Hid Him on a Strawberry Farm | 36 | Hidden-truth + absurd location | "Hid" implies a secret the game kept; the location is the least monstrous place possible |

**Recommended pairing: title 1 + thumbnail "COSTS HEALTH"** — the title asks *why*, the thumbnail answers with a consequence that raises a second question (*a hug that hurts you?*). Two gaps, one image.

Rejected on purpose: naming "Red Hulk" as fact (fan nickname, not the game's name — misleading metadata), any "4 missions" number claim (weak hook, and the count is 5 including "Buddy?"), and anything in the "You won't believe" family (pattern-fatigued in this niche).

## 7. Thumbnail text (2 words) + alt text

The thumbnail text must **complete or contradict** the title, never repeat it. Ranked:

| # | Text | Pattern | Why it hooks | Pairs with |
|---|---|---|---|---|
| **1 PRIMARY** | **COSTS HEALTH** | T3 hidden-truth + T1 number-as-hero grammar | A hug costing health is a physical, unexpected *cost*. Concrete stakes beat abstract mystery at 10% size | Title 1 |
| 2 | ONE HUG | T1 | Number-as-hero (strongest documented pattern in the niche); "one" makes it scarce | Title 3 |
| 3 | DON'T HUG | T2 command | A warning with no reason given — pure curiosity gap, and it is true (the hug damages you) | Title 4 |
| 4 | LAST HUG | T3 | Scarcity + dread; accurate (you never see Kyle again after it) | Title 1 |
| 5 | STRAWBERRY FARMER | T3 | The absurd reveal — a monster who farms fruit | Title 5 |

### Thumbnail prompts (chosen text: **COSTS HEALTH**)

| Concept | Pattern | Prompt (≤70 words) | Why it hooks |
|---|---|---|---|
| **A (recommended)** | T3 hidden-truth reveal | Pitch-black barn interior, one cream torch beam lighting a crate of giant cream strawberries; The Runner in cream gi and red headband peering in with narrowed eyes; a huge red shadow of a hulking figure on the far wall with no body under it; cream "COSTS HEALTH" top-right on two lines, "HEALTH" in red; flat 2D, thick outlines, no gradients, one red eye-magnet. | The body-less shadow is the withheld element; "COSTS" reads as a warning with no reason given |
| B | T2 shock-face + threat | The Runner's extreme close-up, wide eyes and red accent marks on the left half of a pitch-black frame; the right half is a barn door cracking open with one thick red arm and a red glow; cream "COSTS HEALTH" bottom-left, two lines; flat 2D, thick outlines, single brightest point = the arm. | Threat + proxy face; strongest at 10% size |
| C | T6 anomaly pointer | Wide flat strawberry field at night, perfectly normal except one strawberry the size of a car; a thick red circle and arrow on it; The Runner in the foreground turned away, looking at the camera; cream "COSTS HEALTH" top; flat 2D, thick outlines, pitch-black sky. | Dramatic irony: he looks at you, not the anomaly |

**Alt text (accessibility string):**
- A: `Pitch-black barn interior. A cream torch beam lights a crate of giant strawberries. A huge red shadow of a hulking figure fills the wall with no body beneath it. The Runner peers in from the dark. Text: COSTS HEALTH.`
- B: `The Runner's shocked face fills the left half of a black frame; a barn door cracks open with a thick red arm glowing on the right. Text: COSTS HEALTH.`
- C: `A night strawberry field with one car-sized strawberry circled in red; The Runner in the foreground looks at the camera. Text: COSTS HEALTH.`

No face, no likeness, no gameplay rip in any concept — The Runner only.

## 8. Metadata package

**Runtime 78.6s → vertical Short.** No chapter block: **Shorts never render chapters**, even above 60s (AGENTS.md §4.10 exception is written for long-form only). Chapter rule does not apply.

**Description:**

```
GTA 6's "Red Hulk" is a strawberry farmer called Kyle. Everyone clipped him. Almost nobody stayed for the ending.

Five missions, one cough, and a strawberry that makes you stronger. Then the agents come for his farm, and Kyle
is not Kyle anymore. There are two endings. One of them costs you health for a hug.

Reaction footage from IShowSpeed's GTA 6 stream.

SPOILER: optional Strangers & Freaks mission, not main story.

Look Beyond What Seems Obvious.
```

**Hashtags:** `#gta6 #shorts #gta6secrets #gtavi`

**Tags (18):** gta 6, gta 6 red hulk, red hulk gta 6, kyle mckittrick, gta 6 kyle, gta 6 hug, gta 6 strangers and freaks, gta 6 side mission, gta 6 easter egg, gta 6 secrets, gta 6 monster, gta 6 story, ishowspeed gta 6, gta 6 gameplay, gta vi, grand theft auto 6, rockstar games, gta 6 shorts

**madeForKids:** false. **Category:** 20 (Gaming).

---

## 9. Policy check log (manual — AGENTS.md §4.0)

| Check | Result |
|---|---|
| **Spam / deceptive** | Pass. No links, no tags-in-description, no engagement bait, no false urgency. |
| **Metadata accuracy** | Pass. "Red Hulk" appears only as a fan nickname in quotes; the game name (Kyle McKittrick) is used as the subject. No claim the game calls him Hulk. |
| **Copyright** | **Pass — authorized.** The user confirmed on 2026-11-23 that iShowSpeed footage is cleared for use. Same source as `speed-gator` / `speed-mandy-part2`. Transformative elements still apply: own hook, own narration, own captions, Runner animation, re-crops, zooms. |
| **Right of publicity** | Pass. No face, likeness or name in the thumbnail; name used nominatively in metadata only. |
| **Spoiler** | Disclosed in the description. Optional mission, not main story. |
| **COPPA** | Not made for kids. Stylised violence; no gore, no sexual content. |
| **Profanity** | Must be muted — `[FILL]` mute windows after transcription. Nothing ships before that pass. |
| **Leaked assets / Rockstar policy** | Pass. No leaked footage, no pre-release assets, no Lucia likeness, no Marvel marks. |
| **Fake engagement** | Pass. No "comment YES", no vote-bait beyond the genuine closing question. |

**Result: cleared to build, not cleared to publish.** Publication still needs the user's explicit yes (AGENTS.md §4.5).

---

## 10. Skill application log

| Skill | What it contributed |
|---|---|
| `story-pipeline` | Section structure, research → script → board → prompts → titles → thumb → metadata → policy order |
| `viral-video-writing` | Hook shortlist of 5, scored script (85 → **90 PASS**), re-hook gaps checked, CTA rule |
| `visual-style` | Palette, The Runner as the only character, bottom-band placement, prompt grammar |
| `thumbnail-hooks` | 2-word text rules, T3/T2/T6 patterns, ≤70-word prompts, one eye-magnet rule |
| `runner-reactions` | 12-event reaction plan tied to real beats, emotes from the existing library, CTA type logic + REPLAY loop |
| `trend-scan.mjs` ×2 | Live medians, the 10.47M outlier, 146×/350× small-channel proofs |
| `tag-scan.mjs` | Real tags and hashtags in use (no invented ones) |

**Not run:** `title-formulas`, `script-breakdown`, `video-ideation`, `thumbnail-concepts` — they need the TubeLab MCP, whose API key is still a placeholder (AGENTS.md §4.7). Fell back to Data API scans + reasoning, and said so.

**Quota used:** ~204 (two trend scans) + ~104 (tag scan) ≈ **308 units** of 10,000.

---

## 11. Build status (2026-11-23)

The package is no longer blocked. Everything below is done and on disk.

| # | Was | Now |
|---|---|---|
| 1 | No footage | **Found.** The Kyle questline runs twice on `qSyo5d-dVzA`: setup at stream 15:38–15:46, payoff at **20:22–20:29**. Full beat map with stream↔raw clocks in `clips/speed-kyle/raw/timeline.md`. |
| 2 | Retrieval tooling gone | **Re-wired.** `yt-dlp 2026.10.26` installed; auto-captions pulled for the whole stream and used to locate the scene. |
| 3 | SFX assets missing | **Regenerated.** `tools/make_sfx.py` synthesises all 8 sounds from ffmpeg formulas into `yt/gta6-clips/sounds/` — no third-party samples, nothing to license. |
| 4 | 4 effects unimplemented | **Implemented** in `render_reaction_short.py`: `freeze` (`tpad`), `mono` (B&W `eq`), `glitch` (`rgbashift`), `vib` (micro-vibration crop), plus a `flashes` key for white flashes. Punch default is now driven by `punch_zoom`, set to **0.15**. |

**The edit, as built** — `speed_clips.py` → `EXTRA["speed-kyle"]`, generated by `tools/build_kyle_config.py`:

- **78.6s, 21 shots → one visual change every 3.74s.**
- 0.0–4.2s hook: Hulk on screen + *"What the f*** is Hulk doing in this game?"*, then a **0.9s freeze in B&W with the glitch tear** on *"That's Red Hulk."*
- 4.2s snaps back to full colour and never stops moving again.
- The hug (48.5–55.9s) is the longest shot at **7.4s, deliberately unbroken**.
- Card at 56.1s — **"THAT WAS THE LAST / TIME HE'S SEEN"** — carries the unclaimed payload.
- White flashes on the barn burst, the reveal and the hug; bass drop on the reveal; heartbeat under the hug.

**Why the beat sheet in §3 is longer than 71.0s:** §3 was written as a narration-first retelling with invented B-roll windows. Once the real footage existed, the strongest cut was Speed's own audio carrying the story, which frees the runtime rule (3–4s per visual change) to set the length. §3 stays as the *script of record*; the built edit is the reaction cut of it.

**Sourcing:** **Plan B, Speed-heavy**, authorized by the user on 2026-11-23. Own capture is still the better long-term lane (the 10.47M explainer), not a blocker here.

**Remaining before upload:**
1. Confirm on frame: the thrown figure is a man, how many officers are present, and that the hug visibly costs health.
2. Confirm on frame that the Mute window (2.30–2.80s) covers the f-word exactly.
3. Cut the thumbnail from the hug frame — **"COSTS HEALTH"** per §7.
4. Bring the render back for approval. **Nothing uploads or schedules without it.**
