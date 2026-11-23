# Story: "Can One Tank Beat GTA 6's 6 Stars?" (Vice Beach tank war)

**Skills used:** `story-pipeline`, `script-breakdown` (beat order), `visual-style`, `title-formulas` (30–40 characters), `thumbnail-hooks`, `gta6-clipper` rules, manual policy check (AGENTS.md §4.0).
**Pillar:** P3 · **Format:** 9:16 Short, about 45–55 s (you set the final length) · **Status:** research and edit plan only. Nothing downloaded for publishing, rendered, uploaded or scheduled.
**Your topic line** ("Jason and Lucia's INSANE 6-Star TANK WAR at Vice Beach!") is the exact title of an existing 11-minute video. We do **not** use it as our title (see §1.3).

---

## 1. Research (2026-11-23)

**Evidence source:** YouTube Data API via `scripts/trend-scan.mjs` (2 queries, about 204 units) and `scripts/tag-scan.mjs` (about 104 units). Total about 308 of 10,000 units. TubeLab is not connected. I also watched contact sheets (24 frames each) of two source videos and counted cuts with ffmpeg. Two web searches gave guide text on the six-star system.

**Not retrievable, so not used:** Facebook, TikTok and X. Their public pages return nothing without a login, and I did not use cookies or any workaround. There are no claims from those platforms.

### 1.1 What wins on this topic (last 14 days)

| Video | Views | Subs | Ratio | Length | Note |
|---|---|---|---|---|---|
| Champs Network, "5-Star Police Chase & Rampage at Vice Ocean Beach" | 6.77M | 733K | 9.2× | 523 s | Biggest in the lane |
| Lootward, "What Happens If You Get 6 Stars in GTA 6" | 2.12M | 57.1K | **37.1×** | 363 s | A question title on a small channel |
| GameV, "Can a TANK Survive a 6-STAR Police Chase" | 1.35M | 328K | 4.1× | 572 s | Question title, tank, 6 stars |
| EdgarFtw Short, "6 ESTRELLAS CONTRA UN TANQUE" | 1.00M | n/a | n/a | Short | Same idea as a Short, in Spanish |
| Logan Fletcher Short, "stole a tank, got 6 stars?" | 340K | n/a | n/a | Short | Russian, same idea |
| Hangarr57, "Killing NPC's on the beach" | 788K | 202 | **3,900×** | 39 s | Beach chaos Short from a tiny channel |
| Champs Network, "Stealing a MILITARY TANK … 6-Star Rampage" | 647K | 733K | 0.9× | 596 s | The sibling of our topic title |
| Champs Network, our exact topic title | **26.7K** | 733K | 0.04× | 663 s | Weak: a long, uncut, no-commentary upload |

Scan summary (query 1): median 788K views, median ratio 4.1× subs, 14 of 15 results are 5 min or longer. The Short lane is thin, so a tight Short has room.

**What this means**
1. The tank plus 6 stars idea is proven at 1M+ in three languages. The exact title is not, because the 663 s upload only reached 0.04× its subs.
2. Question titles win ("What Happens If…", "Can a TANK Survive…"). Ours asks a question the Short answers.
3. Small channels win with one chaotic beach moment, not a full run.
4. Nobody offers a **tight 45 s Short in English** with a hook, a visible star count and a payoff. That is the gap.

### 1.2 What the source videos do (direction analysis)

Both Champs Network uploads have **0 scene cuts** (ffmpeg, threshold 0.3), no commentary and a burned-in "CHAMPS NETWORK" mark bottom-right. Their descriptions say "with no commentary". There is no script to learn, so the pacing comes from the gameplay itself.

Frames read from the topic video `CdrKgo44AWk` (time is approximate, from 24 evenly spaced frames):
- 0:14 beach, Lucia with tourists on screen, a vehicle at the edge. 0:41 Lucia aims a launcher over her shoulder.
- 1:23–2:30 light armoured vehicle with a turret drives along the sand through umbrellas and boats. Star icons sit top right.
- 3:30–4:00 turret fire, kicked-up sand. 5:18 an attack helicopter appears over the beach.
- About 7:36 a heavily blurred, colour-split screen (a hit or a death effect). 8:03 helicopter overhead again.
- About 9:00–9:30 she is on foot on a street, tourists with subtitles, rifle raised. 10:50 end card.

The related video `29lwRQFGb1k` (military base): a bike approach, a tank rolling through the base, a wanted-level message on screen ("Escape is impossible… until you're gunned down"), explosions, a helicopter on the apron.

**Unverified:** the exact star count at each moment, how the beach run ends, and whether Jason appears. I have not watched either video end to end. The Short must be cut only from frames confirmed at edit time.

### 1.3 Title and copycat check

Searching the exact topic title returns **11 uploads**. Five of them are from one 15-subscriber channel (ShadowStrike, 5 to 1,151 views). That is the copycat pattern YouTube treats as reused content. Our title is different and our edit adds a hook, captions and the Runner.

### 1.4 Fact sheet (only these may be captioned)

| Fact | Basis |
|---|---|
| GTA 6 uses a six-star wanted level | Several guides, Shacknews |
| The tank route starts at a military base (guides name Mile Zero Air Station) | Beebom, PC Gamer, games.gg |
| The military answers with helicopters and other tanks at the top level | Guides, with disagreement |
| Escaping six stars is described as "impossible" by some guides and in an on-screen message | Guides; message seen in `29lwRQFGb1k` |

**Do not state:** that the tank always gives 3 stars, a fixed kill count for the sixth star, or that nobody can escape. The sources disagree and some are pre-release speculation.

### 1.5 Tags in use
`gta 6`, `gta vi`, `grand theft auto 6`, `gta 6 gameplay`, `gta 6 tank`, `gta 6 6 star wanted level`, `gta 6 police vs tank`, `gta 6 tank rampage`, `gta 6 vice city`. Hashtags: `#gta6` (15 of 25), `#shorts`, `#gaming`, `#gta6gameplay`, `#gta6vehicles`.

### 1.6 Honest note on "1M views"
No edit can promise 1M. The data shows the idea can reach it (three 1M+ videos on this idea) and that a 39 s Short from a 202-subscriber channel reached 788K. Reaching it depends on the first 3 seconds of retention and on luck with the feed. This plan applies every lever the data supports and nothing more.

---

## 2. Source and rights (blocking item)

The only footage found is **Champs Network's** (and GameV's). The repo rule needs written permission or a verified Creative Commons licence in `source.md`. **None is on file.** Your 2026-11-23 clearance covered iShowSpeed footage only.

| Option | Effort | Note |
|---|---|---|
| A. Ask Champs Network for written permission | Low | Their site and Discord are in the description. I have not contacted anyone |
| B. You record your own tank run on GTA 6 | Medium | Cleanest. No watermark to crop |
| C. Use it without permission | n/a | Not cleared. Cropping the watermark does not create permission |

The build below works with either footage set. **Cleared to plan, not cleared to render or publish.**

---

## 3. Script (Short, about 50 s)

Beats follow `script-breakdown`: hook, promise, stakes, open loop, escalation with re-hooks, payoff, CTA.

| Beat | Time | Line on screen (our words, no quotes from the game) |
|---|---|---|
| Hook | 0–3.8 | `ONE TANK. SIX STARS.` |
| Promise | 3.8–8 | `Vice Beach. No plan.` |
| Stakes | 8–16 | `Cops first. Then the army.` (only if the footage shows it) |
| Open loop | 16–22 | `Then a helicopter showed up.` |
| Escalation 1 | 22–32 | `Sand, umbrellas, and a turret.` |
| Escalation 2 | 32–40 | `Star count: [FILL from frame]` |
| Payoff | 40–46 | `[FILL: the real ending, confirmed on frame]` |
| CTA | 46–52 | `Would the tank survive? Comment 1 or 2.` |

`[FILL]` slots stay open until the ending is confirmed. The payoff is never invented.

---

## 4. Curiosity hook and storyboard (0.0–3.8 s as specified)

Hook cut = the **mid-action beat just before the helicopter arrives** (about 5:10–5:18 in `CdrKgo44AWk`, confirm on frame).

| Out time | What happens | Layer |
|---|---|---|
| 0.00–0.20 | Black, a low riser starts | riser under the whole hook |
| 0.20–2.60 | Hook clip in **black-and-white**, 3% slow push | `ONE TANK. SIX STARS.` |
| 2.60–3.60 | **1.0 s freeze** on the last frame, still B&W, hairline glitch tear | glitch stab |
| 3.60–3.80 | **White flash (3 frames)**, then **full colour** | whoosh |
| 3.80 | First real scene, full colour | |

### Shot list (source windows to be confirmed on frame)

| # | Out | What | Move / effect |
|---|---|---|---|
| 1 | 3.8–8 | Tank on the beach, wide | punch to 115%, hold |
| 2 | 8–12 | Tank through umbrellas and sand | slow pull |
| 3 | 12–16 | Turret fire | punch 115%, micro-vibration, bass drop (**PEAK 1**) |
| 4 | 16–20 | Helicopter appears | tilt up, tension tone |
| 5 | 20–24 | HUD stars (close crop on the star icons) | punch 115% |
| 6 | 24–32 | Tank under fire, chaos | 3.5 s zoom cadence, no cut |
| 7 | 32–36 | The hit / blur moment, if it is the tank's end | glitch transition, white flash (**PEAK 2**) |
| 8 | 36–44 | Aftermath or the next scene | per confirmed footage |
| 9 | 44–52 | Freeze of the hook frame, B&W | CTA, loops to 0:00 |

Cadence: a new angle, punch-in or crop every 3–4 s. Tight jump cuts remove dead air, but no scene is cut before its point lands. Effects (glitch, vibration, flash) sit only on the peaks above.
**Sound:** riser 0–3.6, glitch 2.6, whoosh 3.7, bass drop at peak 1, tension tone at 16, glitch and flash at peak 2, heartbeat in the CTA. The Runner reacts in the bottom band only (`suspense` at 16, `recoil` at peak 1, `shock` at peak 2). No licensed music. Source audio stays low.

---

## 5. Visual prompts (Runner scenes for the cards)

| Time | Prompt | Camera | Dopamine beat |
|---|---|---|---|
| 0–3.8 | Flat 2D, thick outlines. The Runner small on black, a red six-star row above him | static, slow push | curiosity gap |
| 16–20 | The Runner looks up, a helicopter silhouette over him, red accent marks | low angle | shock |
| 44–52 | The Runner on black, cream text "Comment 1 or 2" | close-up | payoff and CTA |

Runner cards stay under 20% of the Short. The rest is real footage.

---

## 6. Titles (30–40 characters)

| # | Title | Chars |
|---|---|---|
| **1 PRIMARY** | **Can One Tank Beat GTA 6's 6 Stars?** | 34 |
| 2 | GTA 6 Tank vs 6 Stars: Who Wins? | 32 |
| 3 | What 6 Stars Did to a GTA 6 Tank | 32 |

All three must be answerable by the final footage. **If the tank wins or the run ends without a clear result, use title 2.**

## 7. Thumbnail

**Text (2 words):** **TANK DOWN?** (alternate: SIXTH STAR). It completes the title and does not repeat it.

| Concept | Pattern | Prompt (62 words) | Why it hooks |
|---|---|---|---|
| **A, recommended** | T2 shock-face + threat | Flat 2D, thick outlines, pitch black. The Runner's wide-eyed face fills the left half, red shock marks. Right half: a sand-coloured beach tank, turret firing one red flash (the only bright point), six red stars above, a helicopter silhouette. Cream text "TANK DOWN?" bottom-left. Small unmodified GTA VI logo bottom-right. | The question is on the image, the answer is withheld |
| B | T6 anomaly pointer | Flat 2D, thick outlines, black frame. A tiny tank on a beach strip, a thick red circle around a helicopter shadow above it; The Runner looks the other way. Cream text "SIXTH STAR". Small unmodified GTA VI logo bottom-right. (about 48 words) | Dramatic irony: he does not see it |
| C | T1 number-as-hero | Giant cream "6" fills half a black frame, six red stars beneath it; a small tank firing at the "6"; The Runner in the corner, mouth open. Cream text "TANK DOWN?" under the number. Small unmodified GTA VI logo bottom-right. (about 48 words) | Number hero, readable at 10% size |

The Runner is the only person in frame. No game screenshot, no real face.

---

## 8. Metadata (Short, no chapter block)

**Description:**
```
One tank on Vice Beach. Six stars. Can it survive what comes next?

Gameplay: [FILL: credit and link of the permitted source]. Edit, captions and commentary by The Untold Exit.

SPOILER: no story spoilers, wanted-level gameplay only.

Look Beyond What Seems Obvious.
```
**Hashtags:** `#gta6 #shorts #gta6gameplay #gaming`
**Tags:** gta 6, gta 6 tank, gta 6 6 star wanted level, gta 6 tank rampage, gta 6 police vs tank, gta 6 military, gta 6 vice beach, gta 6 gameplay, gta 6 wanted level, gta 6 chaos, gta vi, grand theft auto 6
**madeForKids:** false · **Category:** Gaming · **Proposed schedule (not applied):** private + `publishAt` 20:00 UTC.

---

## 9. Policy check log (AGENTS.md §4.0)

| Check | Result |
|---|---|
| Copyright | **BLOCKED until a permitted source exists** (§2). No logos, watermark cropped, no licensed music |
| Metadata accuracy | Pass if the ending matches the title. "Jason and Lucia" is not used because it is unconfirmed that Jason appears. No claim about the 3-star trigger or escape |
| Copycat or reused content | Pass: different title, own hook, captions and Runner |
| Spoilers | None in the plan |
| Profanity | Mute any in source audio at render (word times to be set) |
| Fake engagement / spam | Pass. One-digit CTA only |
| COPPA | Not made for kids |
| Chapters | Short under 60 s: none |
| Quota | About 308 units |

**Not verified:** neither source video was watched end to end, so the star counts, the ending and Jason's presence are open. Nothing is uploaded, scheduled or commented without your explicit yes.
