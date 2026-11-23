# Story pipeline: "Kai Reacts to GTA 6's Club Mission" (GTA 6, club and drinking mission Short)

**Skills run:** `story-pipeline` → `gta6-streamer-hunter` (find + frame check) → `script-breakdown` (beat tags from the real captions) → `visual-style` → `title-formulas` → `thumbnail-hooks` → `hook-writer` → `runner-reactions` (reactions + end-screen CTA) → `gta6-clipper` (window downloads, source rules) → manual policy check (§4.0).
**Pillar:** P3 · **Format:** 9:16 Short, 55.5s (user rule: Short 1–2 min) · **Slot:** not scheduled (needs the user's yes)
**Goal:** the user asked for the club and drinking mission from their own streamers, with blur on any sexual scene. No view target was given, and none is promised.

**Delivered clip:** `yt/gta6-clips/clips/kai-club/final_cta.mp4` (copy in `yt/gta6-clips/output/`). Rebuild: `python yt/gta6-clips/tools/render_reaction_short.py kai-club --cta`. Config: `EXTRA["kai-club"]` in `tools/speed_clips.py`.

---

## 1. Research summary

- **Trend evidence (Data API, 2026-11-21, TubeLab not connected, about 204 quota units for 2 searches):**
  - "GTA 6 nightclub mission Lucia drunk reaction": only **1** video in 7 days, [Dan Allen Gaming, "Exploring the Nightclub & Getting Super Drunk", 318,215 views, 347 s](https://www.youtube.com/watch?v=OmrPdTaz3hI) (a long video, not a Short, not one of our streamers).
  - "GTA 6 club mission Kai Cenat Speed": only full streams ([Speed 67.8M](https://www.youtube.com/watch?v=qSyo5d-dVzA), [Kai Day 1 12.2M](https://www.youtube.com/watch?v=VZqAPdUvqnQ)) and 3 reposts with 0–10 views.
  - A third search was refused (API quota, HTTP 429) and not retried.
  - **Read:** a Short on the club mission has almost no direct competition, but that also means demand for it is **unproven**. This is a low-competition bet, not a proven winner.
- **The moment (Kai's Day 1 stream, captions + frames):** at **5:47:40** the group reaches a live-band bar; one character says "I'll get the first round", the order is "Three shots", "Shots for everybody", then cheering and "Oh my god". At **5:48:08** "Man, I already love this place." At **5:48:16** "Come on, Jay. You sure you're ready…" starts the dance minigame. At **5:53:10** "I need to take a time out", then "No, no, no…" for about 14 s. Kai is laughing on his webcam through the sequence (frames).
- **Not used, and why:** [Speed's club scene (hwSg39yIBGU, 3:12–3:14)](https://www.youtube.com/watch?v=hwSg39yIBGU) is suggestive (women posing, "Do it sexy", a bowl of white powder, a gun). It needs the blur and carries drug and weapon risk; see the optional follow-up at the end.

---

## 2. Analysis of the footage (script + visuals)

| Window | Stream time | Beat | What is said / shown |
|---|---|---|---|
| w1 | 5:47:40–5:48:25 | premise | "I'll get the first round." Group at the bar (clothed characters, beer bottles, live band behind). |
| w1 | | escalation | "What's it going to be?" "Three shots… on me, bro." "Love this." "Shots for everybody." Cheering. |
| w1 | | payoff 1 | "Oh my god." "Man, I already love this place." Kai laughing. |
| w1 | | turn | "Come on, Jay. You sure you're ready?" Dance minigame begins. |
| w2 | 5:53:05–5:53:40 | payoff 2 | "I need to take a time out." Then "No, no, no, no, no…" while Kai dances and laughs. |

**Frames checked (every ~6 s):** the bar is a live-band dive bar with a pool table. **No sexual content on screen**, so nothing is blurred. An orange character at the far left edge of the full frame is outside the crop (game panel starts at x=400 of 1920).
**Timeframe decision:** keep the order, the group cheer, the "love this place" line, the dance start, and Kai's "no, no, no". Cut the waiting before the order and the middle of the dance. Result: 4 pieces, 55.5 s.

---

## 3. Script (55.5s, Kai's stream audio and the game's own audio; no voice-over)

| Out | Beat | Content |
|---|---|---|
| 0:00–0:09 | **Suspense opening + hook** | Hook title "KAI HIT THE CLUB IN GTA 6 / THEN THE DANCE STARTED". "I'll get the first round… Three shots. Seriously, on me, bro." Pop "3 SHOTS?!" at 0:05, Runner shocked. |
| 0:09–0:21 | **Build** | "Love this." "I'll take one, too." "Shots for everybody." Pop "SHOTS FOR EVERYBODY" at 0:13.5, Runner laughs. Cheering, "Oh my god." |
| 0:21–0:39 | **Re-hook + turn** | "Man, I already love this place." Then "Come on, Jay. You sure you're ready?" Pop "DANCE TIME" at 0:30.6, Runner curious. |
| 0:39–0:55 | **Pay-off + loop** | "I need to take a time out." "No, no, no, no, no…" Runner shocked, then nervous. CTA from 0:52.3 ("Who's funnier? COMMENT!") with a REPLAY strip pointing back to the hook. |

The question planted in the first 5 s is "what happens after the shots?". It is paid off at 0:30–0:55 with the dance and Kai's "no, no, no".

---

## 4. Storyboard grid (9:16, 1080×1920)

| # | Time | Visual | Graphics / Runner | Sound |
|---|---|---|---|---|
| S1 | 0:00–0:09 | Kai's cam on top, the bar table below | Hook title, caption on the seam, slow push-in on the game, face punch at 0:02.6, **3 SHOTS?!** pop with shake and white flash at 0:05, Runner shocked | Game + Kai, ding at 0:05 |
| S2 | 0:09–0:21 | Group at the bar, cheering | **SHOTS FOR EVERYBODY** pop, pull on the jump cut, Runner laughs | Vine boom at 0:13.5 |
| S3 | 0:21–0:39 | "I already love this place", the dance floor | **DANCE TIME** pop with shake and flash at 0:30.6, Runner curious | Vine boom at 0:30.6 |
| S4 | 0:39–0:52 | Dance minigame, Kai on his feet | Face punches at 0:42.6 and 0:49.6, Runner shocked then nervous | Game + Kai |
| S5 | 0:52–0:55 | End screen | CTA "Who's funnier? COMMENT!", REPLAY strip | whoosh + ding |

**Trim rule:** never trim S1 (the order) or S3–S4 (the turn and its payoff).

---

## 5. Runner timeline (from `reactions.json` and `cta.json`; the Runner is the existing animation library, not redrawn)

| t | Animation | Trigger |
|---|---|---|
| 0.4 | curiosity | what is this place? |
| 5.2 | recoil (shock) | "three shots" |
| 13.8 | laugh | "shots for everybody" |
| 19.6 | recoil (shock) | "oh my god" |
| 30.8 | curiosity | the dance starts |
| 42.8 | recoil (shock) | "time out" |
| 49.8 | nervous | "no, no, no" |
| 52.3 | CTA, "funny" type, comment preset | clip config sets the type |

**Camera plan (`auto_fx`):** slow push on the opening 0–7 s, face punch on each pop and listed beat, small pull on each of the 3 jump cuts, shake plus white flash on each pop, push before the CTA.

---

## 6. Titles (30–40 chars)

| | Title | Chars | Hook type |
|---|---|---|---|
| **Primary** | Kai Reacts to GTA 6's Club Mission | 34 | Name + search keyword; the hook asks what comes after the shots |
| Alt 1 | GTA 6 Club Mission: Round of Shots | 34 | Keyword-first |
| Alt 2 | Kai Cenat's GTA 6 Club Mission | 30 | Full-name search |

Rejected: "Kai Said NO to the Dance" (what "no, no, no" refers to was not verified), "Kai Couldn't Stop Laughing" and "Kai Lost It" (overclaim).

## 7. Thumbnail text (2 words)

**"DANCE TIME"**, T2 curiosity: it completes the title without repeating it and withholds what the dance is.

| Concept | Prompt (≤70 words) |
|---|---|
| A (recommended) | A black bar counter with three cream shot glasses in a row, the middle one glowing green, a red neon sign glowing behind; The Runner in his cream gi and red headband leans over them wide-eyed with a red "?" above his head, flat 2D, thick black outlines, cream "DANCE TIME" top, small GTA VI logo corner. (56 words) |
| B | The Runner mid-dance on a black floor, cream shot glass raised in one hand, a red "!!" burst beside him, flat 2D thick outlines, "DANCE TIME" bottom. |
| C | A cream clock face on black with a green shot glass as the hour hand, The Runner peeking from behind it, red "?" overhead, "DANCE TIME" top. |

---

## 8. Metadata package

**Description** (55.5s, so no chapter block):

```
SPOILER (story mission).

Kai Cenat reacts to the GTA 6 club and drinking mission: a round of shots, a live-band bar, then the dance starts.

Which was funnier, the shots or the dance? Comment SHOTS or DANCE.

Footage: Kai Cenat Live, https://www.youtube.com/watch?v=VZqAPdUvqnQ (stream 5:47:40 and 5:53:05). Captions and Runner animation by The Untold Exit.

Look Beyond What Seems Obvious.

#gta6 #kaicenat #gtavi #lucia #shorts
```

**Tags (15):** kai cenat gta 6, gta 6 club mission, gta 6 drinking mission, gta 6 bar scene, gta 6 dance minigame, gta 6 lucia, gta 6 jason, gta 6 shots, kai cenat reaction, gta 6 streamer reaction, gta 6 funny moments, gta vi, grand theft auto 6, gta 6 clips, the untold exit

**Pinned comment:** "Round of shots at 0:05. Kai's first 'no, no, no' at 0:50. Which was funnier: SHOTS or DANCE?"

**Settings:** not made for kids · category 20 · en · private until the user says to schedule.

---

## 9. Policy check log (manual, §4.0)

| Check | Result |
|---|---|
| Source licence | ⚠️ Kai Cenat Live's stream is on the standard YouTube licence, **not Creative Commons, no written permission on file**. The user instructed on 2026-11-21 to take footage from YouTube and accepted the copyright risk. A claim, Content ID match or removal is possible. |
| Reused content | ⚠️ About 55 s from two windows of an 11.6 h stream, with captions, Runner animation, camera moves and a CTA added. Credit and link in the description. Chat, counters and logos are cropped out. Game and stream audio are not muted. |
| Accuracy | ✅ Every quote is in the stream's auto-captions at the stated stream time. ⚠️ Who says "I'll get the first round" and "No, no, no" is **not confirmed** (could be a character or Kai), so captions are unlabelled and the title/description do not attribute them. The auto-caption "ching" was left out as unreliable. ⚠️ The part of the dance Kai refuses, if any, was not verified. |
| Sexual content | ✅ Frames show a clothed group in a bar. No blur needed. If any later cut includes the dance floor close-ups, check frames first and use `blur`. |
| Profanity / slurs | No swearing is in the 4 pieces (checked in the captions). ⚠️ The game audio at about 0:31–0:37 includes a joking address to Jason that uses the phrase "white boy"; it is not captioned. Listen once; mute it with the `mute` option if you prefer. |
| Alcohol | Shots and drinking appear in a video game. Not instructional; possible limited-ads consideration. Made for kids: no. |
| Spoilers | ⚠️ Story mission. The description opens with "SPOILER" per `hook-writer` rule 2; the hook does not mention it. |
| Honest metadata | ✅ Title, hook and thumbnail describe what the clip shows: shots, then a dance. Nothing claims Kai refused or lost it. |
| Not verified | Content ID outcome; the clip by ear and in motion (8 frames viewed, sheet in `edit/chk/`). Nothing uploaded or scheduled. |

---

## 10. Optional follow-up
Speed's club scene (hwSg39yIBGU, 3:12:50) as a second Short with `blur=[(…)]` on the game panel; blur is proven on a 12 s test (`clips/speed-blur-test`, not for upload). It carries sexual, drug and weapon risk, so it is not started.
