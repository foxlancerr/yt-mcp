# Story package: "Mandy Cried. Then She Texted Jason." (GTA 6, Part 3, 84s Short)

**Skills run:** `story-pipeline` → `visual-style` → `thumbnail-hooks` → manual policy check (§4.0).
**Pillar:** P3 (GTA 6 gaming mysteries) · **Format:** 9:16 Short, **84.0s** (AGENTS.md length rule: user gave no length, Short default = 1–2 min)
**Serialisation:** Part 3 of `speed-mandy-sink-wrong-sink` (the sink) → `gta6-mandy-missable-part2` (the prison-wife confrontation) → **this** (the aftermath).
**Status:** story only. **No render, no upload, no schedule.** Footage plan is in §10 — this one cannot be cut from Speed's stream alone.

---

## 1. Research summary

### What part 3 actually is

Parts 1 and 2 ended where every clip ends: the sink, then the "you have an ex in prison" fight. The game keeps going, and the part nobody cuts is the **aftermath**:

| Beat | What happens | Source |
|---|---|---|
| Return visit | Mandy is **crying in front of the TV** and tells Jason to go away. No further romance is possible | Sportskeeda (20 Nov), SavePoint, Radio Times, GameSpot |
| The framed photo | In her house: a framed photo of **Jason, Mandy and Cal at the Rusty Anchor** — a memory she built alone | deep-dive transcript (`0A0kddg_T18`) |
| The house fire | Jason's house burns down. **Mandy texts first**: "OMG Jason, are you okay? I just saw your house. Do you need a place to stay?… XX" | transcript; Times of India confirms the post-fire visit + "Miss My Neighbors"/"That's Personal" choice |
| The affair | He goes. She says "Oh, I'm so sorry about your house, Jason. Where are you staying now?" He says "Somewhere that makes me miss my own neighbors." She answers **"I miss you too. Well, don't forget about me, okay?"** | verbatim captions from `CJYUxkrJdJI` (1.1M views) |
| The cold turn | Follow her and she flatly asks **"Why are you still here, Jason?"** | transcript |
| The tell | Trunk: meat cleaver, duct tape, battery acid, loppers, rope. Yard: a filled-in **body-sized hole**, acid tubs, bleach, a shovel. Sink: **what looks like a severed finger** | IGN, GameSpot, gta6.house (20 Nov); transcript |
| The threat | Her text: *"If you weren't so hot, I'd chop all your fingers off so you'd go crazy…"* | transcript |
| Lucia's side | Lucia can confront her: "Stay the f— away from Jason, you crazy…" Mandy accuses *them* of burning the house, and with Lucia present she points them out to police — "It's the prison wife" | transcript |

### The thing that makes this a story and not a clip

**There is no affair.** Polygon (18 Nov) and every guide agree: Jason stays faithful to Lucia, and the game never lets you romance Mandy. The affair exists **only in Mandy's head** — the framed photo, the "we were supposed to get married", the jealousy about "a convict".

So the title is not "Jason cheated". It is: **she cried, then she texted him** — and the woman doing the texting has a grave in her yard. That is the brand's promise, *Look Beyond What Seems Obvious*, in one sentence.

### Numbers (YouTube Data API, scans run 2026-11-23)

- **Scan A — `trend-scan "GTA 6 Mandy crying Jason breakup" 14d`:** 5 videos · **median 524,324 views · median ratio 956.8× subs** · top outlier **1,982.2×** (Apex Films, **546 subs**, 98s, *"Can You Romance Mandy in GTA 6? (And the Creepy Secret Inside…)"*) · shorts median 315,559.
- **Scan B — `trend-scan "GTA 6 Mandy crying" 14d`:** 10 videos · median 528,334 views · **shorts median 624,428** · 4 short / 1 mid / 5 long.
- **Direct format proof:** `CJYUxkrJdJI` — *"Jason Goes To See Mandy Again ~ GTA 6"*, LitHero27, **48s, ~1.12M views on 199,000 subs (5.6×), uploaded 2026-11-19**. That 48s clip is **exactly the post-fire reunion scene** this story is built around. It holds 48 seconds on one conversation.
- **Quota:** ~204 units (2 scans). TubeLab MCP not connected → API scripts only (AGENTS.md §4.7). Caption pulls are free.
- **Caveat (§4.8):** these are views-over-subs ratios, not retention. Our own channel's Shorts have not converted (§3). Treat this as a lane test, not a promise.

### The gap we exploit

Every clip in the lane delivers **one** punchline: the sink, the finger, the crying, the flirt. Nobody joins **cry → text → return → yard** into one arc, because it needs four separate visits. The top outlier is the *secret*, not the romance — which proves the explainer voice beats the thirst voice. That is our lane, and it is empty at 84s.

---

## 2. Script — beat sheet (84.0s, caption-narrated, no voice-over)

Our layer is on-screen captions over the game's own audio. No narrator.

| Out | Dur | Beat | Content (verbatim = the game's line) | Edit |
|---|---|---|---|---|
| 0:00.0–0:02.6 | 2.6 | **HOOK** | Mandy in a dark living room, crying at the TV. Caption: `"Just go away."` | Cold open mid-scene, no title yet. Tighter 9:16 crop, slight push-in |
| 0:02.6–0:04.0 | 1.4 | **FREEZE** | **1.0s freeze frame** on her face | Snap to **B&W** (`eq=saturation=0:contrast=1.3`), **glitch tear** (`rgbashift`) on the freeze, **riser + flash_hit** |
| 0:04.0–0:07.5 | 3.5 | **SNAP** | Jason at her door, leaving. Hook lands: *"She told Jason to leave."* | Full colour returns hard. Hook title top, 115% punch-in |
| 0:07.5–0:11.2 | 3.7 | **The lie** | `"I just wanna know why I have to keep breaking appliances to get you to come see me."` | Sink/face frame — **not** the bikini frame (see §8) |
| 0:11.2–0:14.8 | 3.6 | **Re-hook** | `"What does a convict have that I don't have?"` | 115% punch-in on Mandy |
| 0:14.8–0:18.4 | 3.6 | **The delusion** | `"You and me, we were supposed to get married."` → `"We barely know each other."` | Cut on the reply, no dead air |
| 0:18.4–0:22.0 | 3.6 | **The proof** | The framed photo: Jason, Mandy and Cal at the Rusty Anchor. Pop: **SHE FRAMED IT** | **vine_boom** on reveal, slow push-in 108% |
| 0:22.0–0:26.0 | 4.0 | **The exit** | `"Just leave me alone, Jason. You blew it."` Cigars thrown | Door frame, whoosh into the turn |
| 0:26.0–0:29.5 | 3.5 | **THE TURN** | Phone screen: `OMG Jason, are you okay?… Do you need a place to stay? XX` | **White flash + bass_drop**. Full-frame phone, punch-in 115% |
| 0:29.5–0:33.0 | 3.5 | **Stakes** | Jason's burnt house | B-roll, no dialogue, music under |
| 0:33.0–0:37.0 | 4.0 | **He goes** | `"Oh, I'm so sorry about your house, Jason. Where are you staying now?"` | Her doorway, medium |
| 0:37.0–0:41.0 | 4.0 | **He flirts back** | `"Somewhere that makes me miss my own neighbors."` | Jason's face, 115% punch-in |
| 0:41.0–0:45.0 | 4.0 | **THE AFFAIR** | `"I miss you too."` → `"Well, don't forget about me, okay?"` Pop: **SHE TEXTED HIM** | **heartbeat** under it, slow push-in to her eyes |
| 0:45.0–0:48.0 | 3.0 | **Cold turn** | `"Why are you still here, Jason?"` Pop: **WHY IS HE STILL HERE?** | Micro-vibration + glitch on the line |
| 0:48.0–0:51.5 | 3.5 | **The trunk** | Meat cleaver, duct tape, battery acid, loppers, rope | Three 1s cuts across the trunk — **three visual changes in one shot** |
| 0:51.5–0:55.0 | 3.5 | **The yard** | The filled-in hole, acid tubs, bleach, shovel | Low angle, no punch-in — let it sit |
| 0:55.0–0:58.5 | 3.5 | **The finger** | Slow-motion 0.5× on what she snatches out of the sink. Pop: **A FINGER** | **White flash + bass_drop**, glitch into it |
| 0:58.5–1:02.0 | 3.5 | **The threat** | Her text: `"If you weren't so hot, I'd chop all your fingers off…"` | Phone screen, line scrolls, punch-in 115% |
| 1:02.0–1:05.5 | 3.5 | **Lucia** | `"Stay the f—— away from Jason, you crazy——"` | **Mute** the swears, caption masked. Micro-vibration |
| 1:05.5–1:08.0 | 2.5 | **Snitch** | Mandy points them out: `"It's the prison wife."` Pop: **THE PRISON WIFE** | Wide, police lights, glitch out |
| 1:08.0–1:13.0 | 5.0 | **PAYOFF** | **Return of the hook frame** — her crying, full colour, untouched. No caption, no SFX but a heartbeat | Longest hold, deliberately unbroken. This is the answer |
| 1:13.0–1:17.5 | 4.5 | **CARD 1** | **SHE CRIED.** at 1:13.0 → **THEN SHE TEXTED.** at 1:15.2 | Animated card, Runner walks in, 2.2s between the two lines |
| 1:17.5–1:24.0 | 6.5 | **LOOP** | *"Jason never cheated. Mandy disagrees."* → brand card, tagline | Runner + pulsing text, cuts back into the hook frame |

**Runtime 84.0s / 23 shots → one visual change every 3.65s.** Three shots run longer than 4s, each with a reason and an internal change so none of them is a dead stretch:
- **1:08–1:13 (5.0s)** the payoff — the same crying frame the hook opened on. Breaking the cadence here *is* the effect; stopping the rhythm forces the viewer to look at her. Held unbroken on purpose.
- **1:13–1:17.5 (4.5s)** card 1 — two changes inside it: line 1 *"SHE CRIED."* lands at 1:13.0, line 2 *"THEN SHE TEXTED."* lands at **1:15.2** (2.2s apart), Runner walks in under them.
- **1:17.5–1:24 (6.5s)** the loop card — animated throughout (Runner walks in, text pulses, cuts back into frame 1), so it never holds still.

**Never cut these short (§ narrative rule):**
1. `"…keep breaking appliances to get you to come see me"` — the whole joke is in the back half.
2. `"What does a convict have that I don't have?"` — the affair in one line.
3. `"I miss you too."` — the only thing Jason actually gives her. Cutting it kills the payoff.
4. `"Why are you still here, Jason?"` — the tonal pivot. Trim it and the story becomes a romance.

If the cut must be shorter, trim in this order: S12 (burnt house) → S10 (stakes) → S20 (snitch). Never touch S2, S7, S9, S13, S17, S21.

---

## 3. Storyboard grid (9:16, 1080×1920)

Layout: full-frame game crop fills the screen (no facecam — see §10). Caption bar on the lower seam, hook at top, The Runner in the bottom band at ~13% of screen height.

| # | Time | Visual | Graphics | Sound |
|---|---|---|---|---|
| S1 | 0:00.0 | Mandy crying, dark room, TV glow | Caption `"Just go away."` | Game audio |
| S2 | 0:02.6 | Her face — **freeze** | B&W, glitch tear, no text | Riser + flash_hit + glitch |
| S3 | 0:04.0 | Jason at the door | Hook title top | whoosh, full colour |
| S4 | 0:07.5 | Sink / her face | Caption | Game audio |
| S5 | 0:11.2 | Her, close | Punch-in 115%, caption | Game audio |
| S6 | 0:14.8 | Argument | Caption | Game audio |
| S7 | 0:18.4 | Framed photo on the wall | **SHE FRAMED IT** pop | vine_boom |
| S8 | 0:22.0 | Door, cigars on the ground | Caption | Game audio |
| S9 | 0:26.0 | Phone screen, message | **White flash**, punch-in 115% | bass_drop |
| S10 | 0:29.5 | Burnt house | none | music |
| S11 | 0:33.0 | Her doorway | Caption | Game audio |
| S12 | 0:37.0 | Jason | Punch-in 115%, caption | Game audio |
| S13 | 0:41.0 | Her eyes | **SHE TEXTED HIM** pop | heartbeat |
| S14 | 0:45.0 | Her, flat expression | **WHY IS HE STILL HERE?**, vibration | glitch |
| S15 | 0:48.0 | Trunk contents ×3 | 3 cuts | music |
| S16 | 0:51.5 | Yard, hole, acid | none | music, low |
| S17 | 0:55.0 | Slow-mo of the sink object | **A FINGER**, white flash | bass_drop |
| S18 | 0:58.5 | Phone, the text | punch-in 115% | music |
| S19 | 1:02.0 | Lucia confronts | caption masked | muted swears |
| S20 | 1:05.5 | Mandy + police | **THE PRISON WIFE** | glitch |
| S21 | 1:08.0 | Crying frame returns | none | heartbeat only |
| S22 | 1:13.0 | Card | **SHE CRIED.** (1:13.0) then **THEN SHE TEXTED.** (1:15.2) | ding |
| S23 | 1:17.5 | Brand card → loop | tagline + THE UNTOLD EXIT | riser tail |

---

## 4. Runner visual timeline (`visual-style`)

The Runner: cream chibi, dark-red knotted headband, cream gi. Bottom band only — never over the footage. Emoji + a short word on strong beats only; 10 reactions across 84s.

| t | Emotion | Animation | Emoji / word | Trigger |
|---|---|---|---|---|
| 0.3 | curious | curiosity | 👀 | cold open on a crying woman |
| 2.7 | shock | recoil | 😮 | the freeze hits |
| 11.5 | suspicious | narrowed eyes | "HUH?" | "what does a convict have" |
| 18.6 | shock | recoil | 😮 | the framed photo |
| 26.2 | shocked | head clutch | "WAIT." | her text appears |
| 41.2 | confused | curiosity | ❓ | "I miss you too" |
| 45.2 | nervous | nervous | — | "why are you still here" |
| 51.7 | terrified | terrified | 😰 | the yard |
| 55.2 | shocked | recoil | 😮 | the finger |
| 62.2 | angry | angry | — | "stay away from Jason" |
| 68.0 | sad | sad | — | the crying frame returns |
| 73.2 | knowing | narrowed eyes | — | the card |

Motion marks only on shock/anger. No reaction over S9, S17's first frame, or S21's first 1.5s — those three moments need silence around them.

---

## 5. Titles (30–40 characters)

Primary keyed off the **character name** ("Mandy" = the search term, per §3: YT_SEARCH is our #1 traffic source) with the curiosity in the back half so phone truncation cuts the answer, not the hook.

| | Title | Chars | Hook type | Why |
|---|---|---|---|---|
| **1 PRIMARY** | **Mandy Cried. Then She Texted Jason.** | 35 | Two-beat inversion | Every clip ends on the cry. This promises what came after it. Factual, no claim beyond the scene |
| 2 | Mandy Was Never Crying for Jason | 32 | Contradiction | Shortest, hardest. Best paired with the dark thumbnail |
| 3 | Jason Went Back to Mandy. Big Mistake. | 38 | Consequence | Puts the viewer in Jason's seat; "mistake" is honest — the yard is in the video |
| 4 | The Affair GTA 6 Won't Let You Have | 35 | Forbidden-fruit | Names the thing the audience already feels, then denies it |
| 5 | Why Mandy Cried After Jason Left | 32 | Plain question | Safest, most searchable, weakest click. Fallback only |

**Not used:** anything asserting Jason cheated. He does not — Polygon and every guide confirm the game keeps him faithful. That claim would fail the accuracy gate in §8.

---

## 6. Thumbnail text (2 words) + prompts

**Recommended: `COME BACK`** — command text → **T3** primary, **T6** alt (matching rule). It completes the title (*she cried, then texted… come back*), adds information the title withholds, and it is literally what she asks: *"Come see me if you have time"*, *"don't forget about me"*.

Alternates: **`STILL HERE?`** (her real line — "Why are you still here, Jason?") · **`ONE TEXT`**

| Concept | Pattern | Prompt (paste-ready, ≤70 words) | Why it hooks |
|---|---|---|---|
| **1 (recommended)** | T3 hidden-truth | `16:9 thumbnail, 2D flat cartoon, thick black outlines, black background, cream + red. The Runner (chibi, red headband, cream gi) holds a phone in a pitch-black living room; the screen is the only light, one cream message bubble glowing. Behind him, a red shadow of a woman holding a shovel. Text "COME BACK" huge cream, top-right. Eye-magnet: the phone screen.` | The phone is the secret and the text answers nothing. The shovel behind him is the dread the viewer clocks half a second late |
| 2 | T5 forbidden object | `16:9 thumbnail, 2D flat cartoon, thick black outlines, black. The Runner at a half-open front door, red light leaking from the gap; a cream envelope on the mat; a shovel leaning inside the dark. Text "STILL HERE?" huge red, left. Eye-magnet: the red gap in the door.` | A door that is already open is an invitation and a threat at once |
| 3 | T6 anomaly pointer | `16:9 thumbnail, 2D flat cartoon, thick black outlines, black. Flat cream yard at night: one filled-in hole, red acid tub beside it, thick red arrow pointing down. The Runner in the foreground looks away, at a lit window where a woman sits crying. Text "ONE TEXT" cream, bottom. Eye-magnet: the red arrow.` | Dramatic irony — he is looking at the wrong thing, so the viewer looks at the right one |

**Policy pass:** text is answerable by the video, The Runner is the only figure, no real person's likeness, no Rockstar character face, no gameplay rip in the image. 10% legibility holds — one bright element each.

---

## 7. Metadata package

**Description** (Short → **no chapter block**, AGENTS.md §4.10 applies to long-form only):

```
Mandy tells Jason to go away. Then, after his house burns down, she is the one who texts him:
"Do you need a place to stay?"

This is the part of GTA 6's Mandy story almost nobody clips. He goes back. She says "I miss you too.
Well, don't forget about me, okay?" Then, later in the same visit: "Why are you still here, Jason?"

Walk round the back of that house and you find a filled-in hole the size of a body, tubs of acid,
and what looks like a severed finger that was blocking her sink.

Jason never cheats on Lucia. The game does not let him. The affair only exists in Mandy's head —
and that is the part worth worrying about.

Reported, not confirmed: outlets including IGN and GameSpot say the object in the sink appears to be
a severed finger. Rockstar has not commented.

Look Beyond What Seems Obvious.

#gta6 #mandy #gtavi #gta6secrets #shorts
```

**Tags (15):** gta 6 mandy, mandy gta 6, gta 6 mandy story, gta 6 mandy crying, gta 6 jason mandy, gta 6 mandy house, gta 6 severed finger, gta 6 secret, gta 6 easter egg, gta 6 story explained, gta 6 lore, gta vi, grand theft auto 6, gta 6 shorts, the untold exit

**Hashtags:** `#gta6 #mandy #gtavi #gta6secrets #shorts`

**Pinned comment:** "She texted him first. Would you have gone back?"

**Settings:** not made for kids · category 20 (Gaming) · en · private until approval · playlist **GTA 6 Secrets 🎮** (`PLRXf1uVlif1Q`) · anchor slot **20:00 UTC** if/when approved (§6). **Not scheduled.**

---

## 8. Policy check log (manual, AGENTS.md §4.0)

| Check | Result |
|---|---|
| **Metadata accuracy** | **PASS.** Title/description claim only what the cut shows. The description explicitly states Jason does **not** cheat — the opposite claim would be false. "Affair" appears only as "exists in Mandy's head" |
| **Killer theory framing** | **PASS.** Sink object, acid, trunk and yard are shown as **observed objects**. "Serial killer" is never asserted as fact; description says "reported, not confirmed… Rockstar has not commented" |
| **Thumbnail honesty** | **PASS.** "COME BACK" is literally what she texts. No body, no gore, no fake reveal. The shovel is a shadow, not a corpse |
| **Sexual content** | **PASS — deliberate edit.** The Pipework scene has a bikini shot. **This cut never frames it**: S4 uses the sink/face angle and the dialogue. Avoids the age-restriction risk the part-1 package flagged |
| **Profanity** | **PASS.** Muted at 1:02.0–1:05.5 (Lucia's two swears), captions masked. Nothing else in the window is explicit |
| **Copyright / footage** | **⚠️ DEPENDS ON SOURCE — see §10.** If captured ourselves: clean. If using another creator's capture: same risk as parts 1–2 (standard licence, no CC, no written permission) — a claim or strike is possible |
| **Third-party leaks** | **PASS.** Retail game, publicly released 2026-11-19. No leaked or pre-release footage |
| **Likeness** | **PASS.** No real person in the thumbnail. Mandy is a Rockstar character; no actor likeness is reproduced |
| **Made for kids / COPPA** | **PASS.** Gaming audience, not directed at children |
| **Misleading engagement** | **PASS.** One question in the pinned comment, no bait, no "comment to win" |
| **Chapters** | **N/A** — Short |

**One honest caveat to keep in the file:** the "affair" in the user's brief is *not* canon. The story works precisely because of that — but any future title or thumbnail must not cross into claiming Jason cheated.

---

## 9. Editing brief → implementation map

Your brief, translated into the exact chain this cut needs. Same filter vocabulary already proven in `render_reaction_short.py` (freeze/mono/glitch/vib/flash all verified end-to-end on this ffmpeg build).

| Your rule | Where it lands | Implementation |
|---|---|---|
| **2–5s curiosity hook, cliffhanger/mid-action** | S1 0:00–0:02.6 | Cold open on the crying, no title. Viewer joins mid-scene and has to work out why she is crying |
| **1s freeze frame** | S2 0:02.6–0:04.0 | `tpad=stop_mode=clone:stop_duration=1.0` |
| **Sharp black-and-white flash** | S2 only | `eq=saturation=0:contrast=1.30` — 1.4s, then hard cut back to colour. **Never reused**: B&W is a one-time signal, not a texture |
| **Glitch + riser into full colour** | 0:02.6–0:04.0 | `rgbashift=rh=-12:bh=12` on the freeze; `riser` 0.30 + `flash_hit` 0.32 + `glitch` 0.30 stacked |
| **Never cut a scene prematurely** | §2 "never cut" list | Four lines play whole. Trim order defined so an editor down to 60s cannot remove a payoff |
| **Visual change every 3–4s** | 23 shots / 84s = **3.65s avg** | Angle shifts + new B-roll; **S15 packs three 1s cuts into one 3.5s block** |
| **115% punch-in** | S3, S5, S9, S12, S18 | `punch_zoom=0.15` |
| **Tight jump cuts, erase dead air** | all | Cut on the last syllable; no crossfades anywhere |
| **Micro-vibrations** | S14 (0:45) and S19 (1:02) only | `crop=iw-8:ih-8:4+3*sin(60*t):4+3*sin(70*t)` |
| **Glitch transitions** | 0:02.6, 0:45.0, 1:05.5 | `rgbashift`, 2 frames |
| **White flashes only on peaks/jumps** | 0:26.0, 0:55.0, 1:08.0 | `drawbox=color=white@0.85`, 4 frames each. Three in 84s — scarcity is the point |
| **Whoosh** | 0:04.0, 0:11.2, 0:22.0 | `whoosh` 0.30–0.34 |
| **Bass-drop** | 0:26.0, 0:55.0 | `bass_drop` 0.40–0.50 |
| **Tension SFX** | 0:18.4 vine_boom · 0:41.0 heartbeat · 1:08.0 heartbeat | `make_sfx.py` set, all synthesised in-house |
| **Silence as a weapon** | S21 1:08–1:13 | Everything drops except a heartbeat. This is the loudest beat in the cut |

---

## 10. Footage plan — the one real blocker

**Speed's stream does not contain this.** His Mandy window runs 2:01:24–2:05:30 on `qSyo5d-dVzA` and ends at the confrontation. A caption search of the full 23h45m stream from 2:00:00 onward returns 14 hits for `mandy`, none after 2:05:30 at her house; a search for `cry|crying|tears` returns nothing at her address. **He never does the revisit.** Parts 1–2 could be built from his footage; part 3 cannot.

Three options, ranked:

| # | Route | What it gives | Cost / risk |
|---|---|---|---|
| **A (recommended)** | **Own capture** — record the four visits (cry, framed photo, post-fire reunion, trunk+yard) and the phone texts | Full control, clean rights, matches the lane's top outliers (Zero Thickness 2,394× and Apex 1,982× are both own-capture explainers) | Needs one playthrough save at the right chapter; ~1 hour of capture |
| B | **Hybrid** — Speed's facecam layer over the confrontation beats (S4–S8), own capture for everything after | Keeps the reaction recognisability of parts 1–2 for the first 26s | Same copyright risk as parts 1–2 for that third of the cut; split-layout render needed |
| C | Another creator's capture (e.g. the 1.1M-view LitHero27 clip) | Fastest to a picture | **Do not.** Re-uploading someone else's edit stacks a second rights holder on top of Rockstar |

**If you pick A**, the edit is a **full-frame explainer**, not a reaction short — so the renderer needs one small change: a `layout="full"` mode that skips the facecam band and lets the game crop fill from y=160 to y=1509. Everything else (freeze, mono, glitch, vib, flash, cards, pops, Runner, SFX) already works in `render_reaction_short.py`.

**To confirm on frame while capturing:**
1. Does she say "go away" out loud, or only shove him off? (caption S1 accordingly — currently `"Just go away."`)
2. Is the framed photo actually Jason + Mandy + Cal, and is Cal legible?
3. Exact wording of the post-fire text (the "XX" ending) before it goes on screen
4. Is the sink object readable in normal speed, or does it need the 0.5× slow-mo to be honest?
5. Does the police-pointing happen only with Lucia present? (affects S19–S20 captions)

---

## 11. Skill-application log

| Skill | What it actually produced here | Quota / cost |
|---|---|---|
| `story-pipeline` | This file's structure; research → script → storyboard → visuals → titles → thumbnail text → metadata → policy | free |
| `trend-scan.mjs` ×2 | The 956.8× / 1,982.2× evidence in §1 and the explainer-over-thirst call | ~204 units |
| `visual-style` | Palette (cream/black/red), The Runner's wardrobe + emotion set, camera language for the bottom band | free |
| `thumbnail-hooks` | T3/T5/T6 pattern match for "COME BACK", 3 paste-ready ≤70-word prompts, 10% legibility test | free |
| `yt-dlp` | Pulled the 1.1M-view clip's verbatim captions (so §2 quotes the game, not my paraphrase) and the full dark-lore breakdown transcript | free |
| Google/web research | Polygon (18 Nov), Sportskeeda (20 Nov), IGN, GameSpot, gta6.house (20 Nov), Times of India — the "no affair" and "finger/acid/yard" anchors | free |
| Manual policy check | §8, including the bikini-frame exclusion and the "do not claim he cheated" rule | — |
| **Not used: TubeLab MCP** | Not connected (placeholder key). Fell back to the Data API scripts per AGENTS.md §4.7 rather than guessing | — |

---

## 12. What is done, what is not

**Done:** research and evidence, the 84s beat sheet, the 23-shot storyboard, the Runner plan, 5 titles, 3 thumbnail concepts, full metadata, policy log, the brief→filter map, the footage decision.

**Not done — and deliberately not started:** no footage captured, no render, no thumbnail image, no upload, no schedule.

**The single decision needed before anything else:** route **A, B or C** in §10. Everything downstream depends on it, and route A is the one that keeps the rights clean and matches the lane's two biggest outliers.
