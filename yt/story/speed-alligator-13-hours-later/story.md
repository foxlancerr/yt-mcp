# Story pipeline: "13 Hours After Speed Feared a Gator" (GTA 6, alligator callback)

**Skills run:** `story-pipeline` → `script-breakdown` (beat tagging of the real transcripts) → `visual-style` → `title-formulas` → `thumbnail-hooks` → `hook-writer` → `runner-reactions` (reactions + end-screen CTA) → `gta6-clipper` (window download, whisper, source rules) → manual policy check (§4.0).
**Pillar:** P3 · **Format:** 9:16 Short, 62.7s (user rule: Short 1–2 min) · **Slot:** not scheduled (needs the user's yes)
**Goal given by the user:** 1M views in 2 days. **Honest read:** no edit can promise that. The 14-day scan of this topic ("GTA 6 alligator Lucia mom") found 12 Shorts with a median of 12,251 views and a best of 23,132. The callback angle below is the part nobody else has; it is a bet, not a forecast.

**Delivered clip:** `yt/gta6-clips/clips/speed-gator/final.mp4`. Rebuild: `python yt/gta6-clips/tools/render_reaction_short.py speed-gator`.

---

## 1. Research summary

- **Idea source:** the user's pick, "Kai Cenat Saved Lucia's Mom From An Alligator" (a real moment: [deyylo](https://www.youtube.com/watch?v=J75jkcY8bp4), 23K views). Kai's own stream was not checked, so this Short uses Speed's stream, which we hold and verified.
- **Trend evidence (Data API, 2026-11-21, TubeLab not connected):** 12 alligator Shorts in 14 days, median 12,251 views; top [deyylo 23,132](https://www.youtube.com/watch?v=J75jkcY8bp4), [TheClipSummit 18,618 on 4 subs](https://www.youtube.com/watch?v=nuKff4DNnJ8), [Viceclipz 18,119](https://www.youtube.com/watch?v=pTzR6zIZbnQ). Big-streamer context: Speed's final-mission stream has 21M views, Kai's finale stream 2.6M. Searches cost about 306 units.
- **What every other clip does:** just the bite. Nobody connects it to anything.
- **The gap, verified in Speed's stream captions and on frames:** at **4:14:27** Speed says "if I get bit by a damn alligator… imagine I die to an alligator". At **4:14:57** a gator ambushes his character ("I almost died to an alligator, bro"). **13h 24m later** on the stream clock (**17:38:57**) Lucia's mother Mia is bitten and he says "Mom got bit by an alligator", then "Mama just got bit by an alligator and y'all laughing." A fear, then a payoff 13 hours later: a callback, not a clip.
- **Source:** IShowSpeed, [PLAYING GTA 6 EARLY ACCESS GAMEPLAY](https://www.youtube.com/watch?v=qSyo5d-dVzA), standard YouTube licence (not Creative Commons).

---

## 2. Analysis of the downloaded footage (script + visuals)

**Script (`script-breakdown` beat tags, from whisper + YouTube captions):**

| Window time | Beat | What is said |
|---|---|---|
| a 6.9–13.8 | premise / open loop | "Bro, check if I get bit by a damn alligator… imagine I die to an alligator" |
| a 20–31 | stakes (dull) | swamp small talk, graphics: cut |
| a 34–44 | build | "Wait, I hear that. Oh my gosh, alligator!" |
| a 60–71 | mini-payoff | "Miss me! Oh my gosh… no way… oh, hell no" (one swear, muted) |
| a 90–102 | proof | "Bro, I almost died to an alligator, bro" (said twice) |
| a 107–140 | dead air | Florida warning, a dive mission chat: cut |
| b 36–55 | payoff | Lucia and Mia celebrate, the gator surfaces, "Mom got bit by an alligator" |
| b 88–94 | re-hook / laugh | "Chat, why y'all laughing? Mama just got bit by an alligator and y'all laughing" |

**Visuals (frames checked every 6s):** the facecam shows wide-eyed shock at the gator (a ~52–60s) and again at b ~41s; the ambush happens at a ~52–68s (gator pins the character, weapon wheel opens at ~72s); Mia is bitten near the pool at b ~41–52s, Lucia shoots the gator, Mia is down at ~58s. The game's own subtitles are below the crop, so our captions replace them.

**Timeframe decision:** keep only the two peaks and the line that links them. Cut the dull swamp talk (a 14–33) and the Florida/dive dialogue (a 107–140). Result: 6 pieces, 62.7s.

---

## 3. Script (62.7s, Speed's own audio; no voice-over)

| Out | Beat | Content |
|---|---|---|
| 0:00–0:07 | **Suspense opening + hook** | Hook title; heartbeat; "if I get bit by a damn alligator… imagine I die to an alligator." Runner: nervous. |
| 0:07–0:13 | **Build** | "I hear that… oh my gosh, ALLIGATOR!" Pop "ALLIGATOR!?", vine boom, face zoom. |
| 0:13–0:27 | **Mini-payoff** | The ambush: "Miss me!… no way… oh, hell no." Swear muted. |
| 0:27–0:34 | **Proof** | "Bro, I almost died to an alligator." Runner: relief. |
| 0:33–0:36 | **Re-hook card** | Full-frame **"13 HOURS / LATER…"**, bass drop. Runner: curious. |
| 0:34–0:53 | **Payoff** | Mia is bitten: "Mom! Mom got bit by an alligator!" Pop "HER MOM?!", face zoom. Runner: shock, then "oh no". |
| 0:53–1:03 | **Laugh + loop** | "Chat, why y'all laughing?… Mama just got bit by an alligator and y'all laughing!" Runner laughs. CTA from 0:59, with a REPLAY strip that points back to the hook. |

---

## 4. Storyboard grid (9:16, 1080×1920)

| # | Time | Visual | Graphics / Runner | Sound |
|---|---|---|---|---|
| S1 | 0:00–0:07 | Speed (top) + Jason jogging in the swamp | Hook title, caption on the seam, Runner nervous | Heartbeat + Speed |
| S2 | 0:07–0:13 | Gator in the mud, Speed's wide eyes | **ALLIGATOR!?** pop, face punch-in, Runner recoil | Vine boom |
| S3 | 0:13–0:27 | The ambush | Captions, Runner nervous then shock | Game + Speed |
| S4 | 0:27–0:34 | Jason escapes | Runner relief | Speed |
| S5 | 0:33–0:36 | Black card | **13 HOURS LATER…**, Runner curious | Bass drop |
| S6 | 0:36–0:53 | Pool, Lucia and Mia, gator | **HER MOM?!**, face punch-in, Runner shock, then sad | Vine boom |
| S7 | 0:53–1:03 | Mia and Lucia on the ground | Runner laugh, CTA, REPLAY strip | Speed laughing |

**Trim rule:** never trim S1 (the fear line) or S5–S6 (the link and the payoff).

---

## 5. Runner visual prompts (`visual-style`; the Runner is the existing animation library, not redrawn)

| Time | Animation | Dopamine beat |
|---|---|---|
| 0.3 | nervous (shiver + sweat); hook title "SPEED FEARED GATORS IN GTA 6 / 13 HOURS LATER IT HAPPENED" | suspense |
| 3.6 | curiosity (?, "WAIT...?") | curiosity gap, second beat inside the 2–5s opening |
| 8.3 | recoil (!!) | shock |
| 16.2 | nervous | suspense |
| 21.0 | recoil | shock |
| 27.6 | relief | relief |
| 35.9 | curiosity (?) | curiosity gap |
| 41.3 | recoil | payoff |
| 49.0 | sad ("OH NO!") | reversal |
| 56.8 | laugh | release |
| 59.4 | CTA, "funny" type, set because the clip ends on the laugh line | loop |

---

## 6. Titles (30–40 chars)

| | Title | Chars | Hook type |
|---|---|---|---|
| **Primary** | 13 Hours After Speed Feared a Gator | 35 | Number + callback; answered by the clip |
| Alt 1 | Speed Feared Gators. Then THIS Happened | 39 | Withheld outcome |
| Alt 2 | Speed's Alligator Problem in GTA 6 | 34 | Name + search keyword |

"Jinxed" and "Called it" were rejected: he feared for himself, not for Lucia's mom, so those would misstate the video.

## 7. Thumbnail text (2 words)

**"13 HOURS"**, T1 number-as-hero.

| Concept | Prompt (≤70 words) |
|---|---|
| A (recommended) | Gigantic cream "13 HOURS" fills the top half of a pitch-black frame; below it The Runner in his cream gi and red headband peeks sideways at a single thin red alligator eye glowing at the bottom edge, one red slash through the "3", flat 2D, thick black outlines, small GTA VI logo corner. (53 words) |
| B | The Runner clutches his head, red "!!" above him, a cream swamp-water line across the lower third with a pair of red eyes just above the surface, flat 2D thick outlines, cream "13 HOURS" top. |
| C | Black frame, a cream clock face showing a huge red alligator tail as its second hand, The Runner pointing at it with a question mark, cream "13 HOURS" bottom, thick 2D outlines. |

---

## 8. Metadata package

**Description** (62.7s, so no chapter block):

```
IShowSpeed said he was scared of alligators in GTA 6. A gator ambushed him, and he almost died.

13 hours later on the same stream, an alligator bit Lucia's mom.

Did you see that coming? Comment YES or NO.

Reaction footage: IShowSpeed's GTA 6 stream (https://www.youtube.com/watch?v=qSyo5d-dVzA). Captions and Runner animation by The Untold Exit.

Look Beyond What Seems Obvious.

#gta6 #ishowspeed #gtavi #shorts
```

**Tags (15):** ishowspeed, ishowspeed gta 6, gta 6 alligator, lucia mom alligator, gta 6 mia caminos, speed alligator gta 6, gta 6 funny moments, gta 6 streamer reaction, gta 6 swamp, gta 6 lucia, gta vi, grand theft auto 6, rockstar games, gta 6 clips, the untold exit

**Pinned comment:** "He feared gators at 4:14 into the stream. Lucia's mom got bitten at 17:38. Did you see it coming? YES or NO."

**Settings:** not made for kids · category 20 · en · private until the user says to schedule.

---

## 9. Policy check log (manual, §4.0)

| Check | Result |
|---|---|
| Source licence | ⚠️ Standard YouTube licence, **not Creative Commons, no written permission on file**. The user instructed on 2026-11-21 to take footage from YouTube and accepted the copyright risk. A claim, Content ID match or removal is possible. |
| Reused content | ⚠️ About 63s from 6 pieces of a 23-hour stream, facecam led, with captions, Runner animation and a title card added. Credit and link in the description. Chat, logo, timer, viewer counter and minimap are cropped out. Game audio is not muted. |
| Accuracy | ✅ Every Speed quote was found in both whisper and YouTube captions. "13 hours" = 17:38:57 − 4:15:20 on the stream clock. Unlabelled quotes are game lines. Mia is identified by the game's own phone call ("Mia Caminos, mother of Lucia Caminos"). ⚠️ "Thank you, God. Thank you, Jesus." is attributed to the game from the caption markers, not heard. |
| Honest metadata | ✅ The title and hook say what the clip shows. Nothing claims he predicted it for her. |
| Profanity | Two swears muted (17.55–18.15s, 46.7–47.4s). Captions omit them. |
| Content | Animal attack in a video game; no gore shown. Made for kids: no. |
| Not verified | Content ID outcome; Kai Cenat's version of the moment; the audio by ear. Nothing uploaded or scheduled. |
