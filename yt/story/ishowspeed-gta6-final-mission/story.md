# Story pipeline: "Speed After 52 Hours: GTA 6 Ending" (GTA 6, best-of reaction Short, SPOILER)

**Skills run:** `story-pipeline` → `gta6-streamer-hunter` (find, loudness, frame and webcam check) → `script-breakdown` (beat tags from real captions) → `visual-style` → `title-formulas` → `thumbnail-hooks` → `hook-writer` → `runner-reactions` (reactions + end-screen CTA) → `gta6-clipper` (window downloads, whisper, source rules) → manual policy check (§4.0).
**Pillar:** P3 · **Format:** 9:16 Short, 124.0 s (the user asked for about 2 minutes) · **Slot:** not scheduled (needs the user's yes)
**Goal given by the user:** a Short that can reach 1M views, with excitement, screaming, crying and fun. **Honest read:** nothing can promise 1M. The evidence below says the topic has proven demand (one reaction video on it has 1.1M views); the Shorts on it are small (best 26.9K), so this is a strong topic and an untested format, not a forecast.

**Delivered clip:** `yt/gta6-clips/clips/speed-final-mission/final_cta.mp4` (copy in `yt/gta6-clips/output/`). Rebuild: `python yt/gta6-clips/tools/render_reaction_short.py speed-final-mission --cta`. Config: `EXTRA["speed-final-mission"]` in `tools/speed_clips.py`.

---

## 1. Research summary

- **Trend evidence (Data API, 2026-11-22, TubeLab not connected, about 204 quota units for 2 searches):**
  - "IShowSpeed GTA 6 ending cries Jason Lucia die", last 7 days, 25 videos. Top: [Speedy Boykins, "iShowSpeed Reacts To GTA 6's SAD ENDING (CRIES)", 1,101,540 views, 517 s](https://www.youtube.com/watch?v=Cz3AaDWQ_Fs). Best Short: [Stream Moments HQ, 26,863 views, 31 s](https://www.youtube.com/watch?v=21uhSc6pDVU). Shorts median 1,720 views; 20 of 25 are under 90 s; none is near 2 minutes.
  - "IShowSpeed GTA 6 funny screaming crying": only 6 videos in 7 days, all tiny (best 85 views).
  - **Read:** the ending-reaction topic is the hot one on this channel's niche. Almost every Short on it is a 20–60 s clip of one beat. A 2-minute cut with a full arc (no sleep, panic, defiance, the ending, the funny aftermath) is the gap. That is a bet, not proof.
- **Web, 2026-11-22:** reports say Speed finished the story after about 52 hours without sleep ([Men's Journal](https://www.mensjournal.com/entertainment/ishowspeed-finishes-gta-vi-after-52-hour-marathon-with-no-sleep), [bdnews24](https://bdnews24.com/entertainment/7mwvycdm6g)). Sources disagree on small details (52 h 30 m vs 52 h 31 m); the clip only uses what he says on stream.
- **Source:** [IShowSpeed, "BEATING GTA 6 RIGHT NOW 100% (FINAL MISSION)", 21.9M views, 22,061 s](https://www.youtube.com/watch?v=OIeLbmyraRQ). Chosen over his other streams because it holds the ending and its aftermath in one video, so the whole Short has one source and one timeline.
- **Why this moment (measured, not guessed):** loudness (EBU R128) peaks at stream 5:11:21–5:11:37 (his "Bonnie and Clyde" plea), and 5:14:35–5:16:19 (the loudest stretch of the whole window, -4.4 LUFS momentary). A webcam strip (a frame every 3 s) shows him with both hands over his face at about 5:14:49–5:14:57; later frames in the clip (about 1:46 and 1:58) show a wet, strained face.
- **Not verified:** whether he actually shed tears (the frames show hands over the face and a strained face; the clip does not claim tears); the Content ID outcome; the audio by ear.

---

## 2. Analysis of the footage (script + visuals)

**Version 2 (2026-11-22):** the first cut jumped from the chase to the credits and a free-roam scene and skipped the police shootout, so it looked like clips from different scenes. This version stays on one continuous scene in stream order: the chase, the roadblock on the bridge, the shootout, then his reaction while the credits roll.

| Window (stream clock) | Beat | What is said / shown |
|---|---|---|
| 5:12:40-44 | **teaser (cold open)** | Police aim at the car on the bridge, Speed wide-eyed. |
| 5:09:42-51 | premise | "Three days, y'all. I have not slept in three days." Calm road. |
| 5:09:55-5:10:08 | open loop | "I played to the end." "Something's not right." Cops on the porch. |
| 5:10:56-5:11:06 | panic | "We got to go in the water, bro." Police helicopter over the water. |
| 5:11:21-33 | **peak 1** | "No way I work this hard for y'all to split up... might as well just die together, like Bonnie and Clyde." Lucia and Jason in the car. |
| 5:11:57-5:12:07 | defiance | "Let's swim for it, bro." Roadblock, a gun raised. |
| 5:12:40-5:13:16 | **the shootout** | Police fire on the car on the bridge; graphic close-ups blurred; the bullet-ridden car and the empty bridge. Speed silent, then reacting. |
| 5:14:49-5:15:11 | **payoff** | "I just played this game for 52 hours and they both just died, bro." Credits begin. |
| 5:16:35-44 | disbelief | "I'm not trolling... I swear to my dad." |

**Frames checked:** a contact sheet of each window and 3 s webcam strips of the peaks. The shootout shows blood and a wounded character in close-ups: **the game panel is blurred for 20 s (1:03.5-1:23.5, "CENSORED" label)**; the face cam stays visible. No sexual content seen.
**Dropped from version 1:** the free-roam epilogue ("wrong option") and the stream-clock jump to 5:22. 9 pieces, 124.0 s.

---

## 3. Script (124 s, Speed's stream audio plus the game's own audio; no voice-over)

| Out | Beat | Content |
|---|---|---|
| 0:00-0:03.5 | **Suspense opening** | Cold open on the police aiming and his shocked face. Hook "52 HOURS. NO SLEEP. / WHAT BROKE SPEED?". |
| 0:03.5-0:25.5 | **Premise + open loop** | "Three days..." then "Something's not right." Pops "3 DAYS NO SLEEP", "NOT RIGHT?!". |
| 0:25.5-0:47.5 | **Escalation** | "We got to go in the water", "die together, like Bonnie and Clyde". Pops "SWIM FOR IT?!", "DIE TOGETHER?!". |
| 0:47.5-0:57.5 | **Defiance** | "Let's swim for it." |
| 0:57.5-1:33.5 | **The shootout** | Police block the bridge, pop "COPS OPEN FIRE", blurred close-ups, silent suspense, his face. |
| 1:33.5-1:55.5 | **Payoff** | "They both just died, bro." Pop "THEY BOTH DIED?!". |
| 1:55.5-2:04 | **Disbelief + loop** | "I'm not trolling... I swear to my dad." CTA from 2:00 with a REPLAY strip back to the hook. |

---

## 4. Storyboard grid and camera plan (9:16, 1080x1920)

Camera moves used: push, pull, punch, shake, pan, **tilt (rotate)** at 0:30, 0:40, 1:02 and 1:42, **zoom to a point** at 0:49 and 0:58 (cops on the right), slow push on his face through the shootout, white flashes on every cut. All rule-based and repeatable.
**Trim rule:** never trim the teaser, the shootout or the payoff.

## 5. Runner timeline

Chosen by the reaction engine from 11 events (curiosity, tired, shock, panic, "no way", excited, shock at the shootout, shock, sad, shock, sad), then the CTA ("*LIKE* if you felt that."). Exact emotions: `clips/speed-final-mission/edit/reactions.json`.

---

## 6. Titles (30–40 chars)

| | Title | Chars | Hook type |
|---|---|---|---|
| **Primary** | Speed After 52 Hours: GTA 6 Ending | 34 | Name + number + search keyword |
| Alt 1 | IShowSpeed's GTA 6 Ending Reaction | 34 | Keyword-first |
| Alt 2 | Speed Said "They Both Died" in GTA 6 | 36 | Quote he said; spoiler in the title |

Rejected: "Speed CRIED at the GTA 6 ending" (the frames show hands over his face, not verified tears), "…Lost It" (overclaim).

## 7. Thumbnail text (2 words)

**"WRONG OPTION"**: completes the title without repeating it and withholds which option.

| Concept | Prompt (≤70 words) |
|---|---|
| A (recommended) | A pitch-black frame with a cream road forking in two, one fork ending in a red wave line, the other in a red raised-hands silhouette; The Runner in his cream gi and red headband sits slumped at the fork with his face in his hands and a red "?" above him, flat 2D, thick black outlines, cream "WRONG OPTION" top, small GTA VI logo corner. (66 words) |
| B | The Runner on a black floor holding a cream phone showing a blank screen, a red "!!" burst beside him, flat 2D thick outlines, "WRONG OPTION" bottom. |
| C | A cream alarm clock stuck at 52 on black, The Runner asleep on top with a red "?" overhead, "WRONG OPTION" top. |

---

## 8. Metadata package

**Description** (124 s, so no chapter block for a Short):

```
SPOILER (final mission and ending).

IShowSpeed finishes GTA 6 after 52 hours without sleep: the chase, the swim, and the moment he says "they both just died."

Would you have swum for it like Speed? Comment YES or NO.

Footage: IShowSpeed, https://www.youtube.com/watch?v=OIeLbmyraRQ (stream 5:09:05 to 5:16:44). Captions and Runner animation by The Untold Exit.

Look Beyond What Seems Obvious.

#gta6 #ishowspeed #gtavi #gta6ending #shorts
```

**Tags (15):** ishowspeed gta 6, ishowspeed gta 6 ending, gta 6 ending reaction, gta 6 final mission, ishowspeed 52 hours, gta 6 jason lucia ending, ishowspeed crying, gta 6 streamer reaction, gta 6 funny moments, gta 6 spoilers, gta vi, grand theft auto 6, gta 6 clips, ishowspeed reaction, the untold exit

**Pinned comment:** "He says 'they both just died' at 1:42. Would you have swum for it like Speed? YES or NO."

**Settings:** not made for kids · category 20 · en · private until the user says to schedule.

---

## 9. Policy check log (manual, §4.0)

| Check | Result |
|---|---|
| Source licence | ⚠️ IShowSpeed's stream is on the standard YouTube licence, **not Creative Commons, no written permission on file**. The user instructed on 2026-11-21 to take footage from YouTube and accepted the copyright risk. A claim, Content ID match or removal is possible. |
| Music | ⚠️ **The ending credits song plays under about 35 s of the clip (from 1:33).** It is licensed music mixed into the stream audio and cannot be removed without losing his voice. This breaks the project rule "no copyrighted music" and makes a Content ID claim likely. Options: ship it as is (risk accepted), mute the credits parts and keep captions only, or end the Short at 1:33, before the credits. |
| Reused content | ⚠️ 124 s from 9 pieces of a 6 h stream, with captions, Runner animation, rotating and zooming camera and a CTA added. Credit and link in the description. Chat, counters and logos are cropped out. |
| Accuracy | ✅ Quotes come from YouTube auto-captions and faster-whisper; lines where the two disagreed were shortened or left out. ⚠️ "I haven't slept in three days" vs "52 hours" is a case where they differ (the caption uses what both heard). ⚠️ Whether he shed tears is not verified, so no title says he cried. |
| Sexual content | ✅ None seen in the sampled frames. |
| Profanity | Four words muted (two by Speed, two by game characters). Captions that contained a swear word were reworded without quote marks. The game's own subtitles are cropped out. |
| Spoilers | ⚠️ Final mission and ending. SPOILER leads the description. The hook does not state the ending. |
| Violence | ⚠️ The shootout has graphic close-ups (blood, a wounded character). They are blurred for 20 s with a CENSORED label. Remove `blur` in the config for the unblurred cut (age restriction likely). Wide shots of the bullet-ridden car and bridge stay unblurred. |
| Honest metadata | ✅ Title, hook and thumbnail describe what the clip shows. |
| Not verified | Content ID outcome; the clip by ear and in motion. Nothing uploaded or scheduled. |
