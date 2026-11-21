# Story pipeline: "Speed Found His Own Name in GTA 6" (iShowSpeed / GTA 6)

**Skills run:** `story-pipeline` → `script-breakdown` → `visual-style` → `title-formulas` → `thumbnail-hooks` → `runner-reactions` (reactions + end-screen CTA) → `gta6-clipper` (source rules) → `hook-writer` → `remotion-best-practices` (read; Remotion not installed, not used) → manual policy check (§4.0).
**Pillar:** P3 · **Format:** 9:16 Short, 56.6s · **Slot:** not scheduled (needs the user's yes)
**Updated 2026-11-21:** the earlier draft ("Speed waited 3 years, then he cried") could not be verified. In Speed's three stream VODs I found no "3 years", no "two delays", and no crying: he is smiling and excited on the facecam. The Short is rebuilt around what he actually says and shows.

**Delivered clip:** `yt/gta6-clips/clips/speed-cry/final.mp4` (1080x1920, 30fps, 56.6s, audio). Copy: `yt/gta6-clips/output/gta6-speed-cry.mp4`. Rebuild: `python yt/gta6-clips/tools/render_reaction_short.py speed-cry` (`REUSE_BASE=1` skips the slow base render).

---

## 1. Research summary

- **Trend evidence (scan of 2026-11-21, not re-run):** the "iShowSpeed GTA 6" 7-day search had a median of about 3.2M views; a 56s "Speed waited 3 years" edit did 1.68M on a 5.9K-sub channel. Data API scans only (TubeLab MCP not connected). No new numbers were pulled for this version.
- **Source:** IShowSpeed, "PLAYING GTA 6 EARLY ACCESS GAMEPLAY GET IN HERE!" (`qSyo5d-dVzA`, 23h45m, 67M views, standard YouTube licence, not Creative Commons).
- **What the footage shows (checked on frames and Whisper + YouTube captions):**
  - Stream 11:27:12 onward: Speed sees "Watkins" (his surname) on an auto-parts shop in the game: "My name is in the game, chat", "I'm about to cry, bro", then "They put my dad in the game, bro."
  - 9:44:35: "This game took 13 years, bro" (probably Speed's voice over game dialogue; confirm by ear).
  - 5:29:00 to 5:31:20: the reunion with Lucia: "Oh, my baby", "I finally got my girl, bro", "I've been waiting for this moment."
- **Not supported:** "3 years", "two delays", "he cried". The hook quotes "about to cry" only as his words in the captions and never claims he cried.
- **Curiosity gap:** whose name is on that sign, and what is the second name he finds? The Short answers it in the last 8 seconds.

---

## 2. Script (56.6s, 7 scenes from one stream, Speed's own audio)

| Out | Scene (stream clock) | Beat |
|---|---|---|
| 0:00–0:05 | 11:27:13 | **Cold-open hook:** "My name is really in the game, chat!" Runner: curious. |
| 0:05–0:11 | 9:44:36 | **The wait:** "This game took 13 years, bro." Pop "13 YEARS!" |
| 0:11–0:21 | 5:29:05 | **Reunion:** "Oh, my baby!" Runner: love. |
| 0:21–0:26 | 5:29:56 | **Awe:** "This is wild… I don't even know what to say." |
| 0:26–0:35 | 5:30:36 | **Payoff 1:** "I finally got my girl… I've been waiting for this moment." Runner: yay. |
| 0:35–0:47 | 11:27:20 | **Turn:** "Watkins, bro! My name is in the game." Face zoom. Runner: recoil, then love ("I'm about to cry"). |
| 0:47–0:57 | 11:27:38 | **Payoff 2 + loop:** "They put my dad in the game, bro!" Pop "HIS DAD?!" Runner: recoil. CTA from 0:53. |

Re-hook rhythm: a new scene or reaction roughly every 5–10s. Loop: the CTA strip reads "REPLAY: WAIT FOR HIS DAD" and points back to the opening hook.

---

## 3. Storyboard grid (9:16, 1080×1920)

| # | Time | Visual | Graphics |
|---|---|---|---|
| S1 | 0:00–0:05 | Speed's face (top), the Watkins shop (middle) | Hook title, caption, Runner curious |
| S2 | 0:05–0:11 | Sunset fishing scene | **13 YEARS!** pop |
| S3 | 0:11–0:26 | Prison gate, Lucia | Runner love / awe |
| S4 | 0:26–0:35 | Walk to the car | Runner yay |
| S5 | 0:35–0:47 | Watkins Auto Parts sign | Face punch-in, Runner recoil + love |
| S6 | 0:47–0:53 | The shop, Speed's reaction | **HIS DAD?!** pop, face punch-in |
| S7 | 0:53–0:57 | Yard, blurred band | CTA: **"Did you see that coming?"**, YES / NO buttons, REPLAY strip |

**Rule:** never trim S1 or S6.

---

## 4. Runner timeline (`runner-reactions`)

| t | Animation | Trigger (real line) |
|---|---|---|
| 0.3 | curiosity | hook: name in the game? |
| 13.5 | love | "Oh, my baby" |
| 27.2 | yay | "This is amazing" |
| 35.6 | recoil | "My name is in the game" |
| 39.9 | love | "I'm about to cry" |
| 49.2 | recoil | "They put my dad in the game" |
| 53.4 | CTA (curious gesture, `team` preset, whoosh + dings) | type **unexpected**: reactions score unexpected 4.5, emotional 3.5, achievement 1.0 |

The CTA was chosen by `cta_kit.choose()` from this clip's reactions, not by hand. The Runner is the user's own character, fully on screen; he leans or tilts because there is no pointing-arm art.

---

## 5. Titles (30–40 chars)

| | Title | Chars | Hook type |
|---|---|---|---|
| **Primary** | Speed Found His Own Name in GTA 6 | 33 | Name + withheld second reveal |
| Alt 1 | Then Speed Found His Dad in GTA 6 | 33 | Escalation |
| Alt 2 | Speed Waited 13 Years For This | 30 | Emotion + number (Speed's own "13 years") |

---

## 6. Thumbnail text (2 words)

**"HIS DAD?"** (completes the title, does not repeat it).

| Concept | Prompt (≤70 words) |
|---|---|
| A (recommended) | The Runner in cream gi and red headband stares up at a black shop sign whose letters are blacked out except one red "W", a huge cream question mark above him, one thin red arrow pointing at a second, smaller sign beside it, flat 2D, thick black outlines, cream HIS DAD? top, small GTA VI logo corner. (50 words) |
| B | The Runner holds both cheeks, red "!!" burst above his head, behind him a cream silhouette of a shop with two name plates, one empty, flat 2D thick outlines, HIS DAD? bottom. |
| C | A cream speech bubble containing a tiny shop sign, a thick red arrow pointing at the bubble, The Runner looking up, HIS DAD? top, thick 2D outlines. |

---

## 7. Metadata package

**Description** (56.6s → no chapter block):

```
IShowSpeed is playing GTA 6 and finds something he did not expect: his own name on a shop. Then a second one.

Did you see that coming? Comment YES or NO.

Reaction footage: IShowSpeed's GTA 6 stream (https://www.youtube.com/watch?v=qSyo5d-dVzA). Captions and Runner animation by The Untold Exit.

Look Beyond What Seems Obvious.

#gta6 #ishowspeed #gtavi #shorts
```

**Tags (15):** ishowspeed, ishowspeed gta 6, speed reacts gta 6, gta 6 name in game, watkins gta 6, gta 6 easter egg, gta 6 streamer reaction, gta 6 lucia, gta 6 funny moments, gta vi, grand theft auto 6, rockstar games, gta 6 early access, gta 6 clips, the untold exit

**Pinned comment:** "YES or NO: did you see 'they put my dad in the game' coming?"

**Settings:** not made for kids · category 20 · en · private until the user says to schedule

---

## 8. Policy check log (manual, §4.0)

| Check | Result |
|---|---|
| Source licence | ⚠️ Standard YouTube licence, **not Creative Commons, no written permission on file**. The user instructed on 2026-11-21 to take it from YouTube and accepted the copyright risk. The old note in `clip_rules.json` (IShowSpeed allowed with credit under a clipping programme) was not verified for this use. A claim, Content ID match or removal is possible. |
| Reused content | ⚠️ About 57s from 7 pieces of one 23-hour stream; facecam led, captions and animation added, credit and link in the description. Chat, logo, timer, viewer counter and minimap are cropped out. Game audio and music under the dialogue are not muted. |
| Accuracy | ✅ Every quote is on screen as a caption. ⚠️ "I'm about to cry" comes from YouTube's auto-captions; Whisper heard "not the crowd". "13 years" comes from Whisper over game dialogue. **Listen to both before upload.** |
| Metadata honesty | ✅ Title and hook do not claim he cried or waited 3 years. The "Watkins" link to his surname is his own on-stream reaction, not an outside claim. |
| Profanity | None in the final cut (checked against the transcripts; the c window's swearing was cut out). |
| Made for kids | ✅ No. |
| Not verified | Content ID outcome; the two quotes above by ear. Nothing uploaded or scheduled. |
