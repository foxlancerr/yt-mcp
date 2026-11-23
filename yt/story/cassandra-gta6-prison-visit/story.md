# Story pipeline: "Jason & Lucia: We Did NOT Break Up?!" (GTA 6, Cassandra reaction Short, Episode 1 of 3, SPOILER)

**Skills run:** `story-pipeline` → `gta6-streamer-hunter` (/female: handle scan, loudness, frame check) → `gta6-clipper` (window downloads, whisper, source rules) → `script-breakdown` (beat tags from the transcript) → `visual-style` → `title-formulas` (your reference list used as the pattern source) → `thumbnail-hooks` → `hook-writer` → `runner-reactions` (reactions + subscribe CTA) → manual policy check (§4.0).
**Pillar:** P3 · **Format:** 9:16 Short, 111.9 s (about 2 min) · **Slot:** PUBLISHED 2026-11-22 11:30 UTC as `WKwGsky1rVo` (https://youtube.com/shorts/WKwGsky1rVo) - it went live unscheduled at upload time instead of landing on the 20:00 UTC anchor · **Series:** Episode 1 of 3 (Ep 2 "Jason crush", Ep 3 "Lucia and Lana")
**Goal given by you:** a Short built to reach 1M views, with curiosity, excitement and a hook in the first 2 s. **Honest read:** nobody can promise 1M. This is a strong curiosity topic with an untested format. The numbers below say how far her channel's GTA 6 clips have gone so far.
**Status (2026-11-22):** the cut, captions and camera plan are written and in the renderer (`EXTRA["cass-prison-call"]` in `yt/gta6-clips/tools/cass_clips.py`). **The final render is finished** (1080x1920, 30 fps, 111.9 s, with audio; copy in `yt/gta6-clips/output/gta6-cass-prison-call-cta.mp4`). I checked 12 frames spread over the file plus the ending: hook, face crops, pops, game shots and the subscribe call to action are right. One frame, the opening face takeover, still shows a thin strap at the bottom edge. The audio is **not checked by ear**. Rebuild: `python yt/gta6-clips/tools/render_reaction_short.py cass-prison-call --cta` → `yt/gta6-clips/clips/cass-prison-call/final_cta.mp4`.

---

## 1. Research summary

- **Source:** [Cassandra, "FIRST GTA 6 EVER GAMEPLAY :) YAYAYYAYAY", @Heyycassandraa, 2h10m live stream, 2026-11-21](https://www.youtube.com/live/DH7kKENJDWA). Standard YouTube licence. Chosen from the five handles you gave me because she is English-speaking, reacts out loud, and the stream holds a Jason and Lucia story scene.
- **Channel numbers (Data API, 2026-11-22, TubeLab not connected, about 31 quota units):** 60.6K subscribers, 687 videos. Her GTA 6 videos: [29 s joy clip, 30,672 views](https://www.youtube.com/watch?v=Y-zCmwxFHzE), [23 min ASMR first impressions, 29,913](https://www.youtube.com/watch?v=S1_Rx3jQaH0), this stream 4,793 at the time. Comparison from the same scan: a Russian streamer's reaction to Jason got 21,116 views in 99 s ([Alina Rin Shorts](https://www.youtube.com/watch?v=4hjwRUOReII)). So a clean 2-minute Jason and Lucia reaction is in a proven range of 20K to 30K, with room to go higher only if the hook and the first 3 s hold. That is a bet, not proof.
- **Not available today:** the YouTube search quota is used up for the day, so no fresh keyword trend numbers. The web search found articles about Lucia and Jason's relationship, but no view counts for this scene.
- **Why this moment (measured, not guessed):** loudness peaks in the stream and the transcript show Cassandra reacting hardest at 2:03:04 to the line about the breakup ("oh my god, I would not do this to him") and at 2:05:12 when Lucia walks out ("she's free, she's free"). Two independent transcripts (whisper on the full audio and whisper on the cut) agree on both lines.
- **Not verified:** the exact speaker of "we broke up / we did not break up" (the clip and the title do not name one); the audio by ear; the Content ID outcome.

## 2. Analysis of the footage

| Window (stream clock) | Beat | What is said / shown |
|---|---|---|
| 2:03:04-08 | **teaser (cold open)** | "We broke up. We did not break up!" then Cassandra: "Oh my god." |
| 2:01:47-59 | premise | At the prison: "I'm here for Lucia Caminos. She's supposed to be getting out. What's your name?" "Jason Duval." |
| 2:02:30-50 | open loop | A flashback-style scene (Cassandra: "Is this a flashback?"). Sped up 1.5x. |
| 2:02:51-2:03:25 | **peak 1** | The phone call: the breakup lines again, "I would not do this to him", "Who is the Jason actor?" |
| 2:04:00-30 | emotional turn | "He has everything he needs." "I'm gonna give him a good life." "I'll put you on the visitors list." |
| 2:05:04-20 | **payoff** | "Oh my gosh, let's go, queen!" "She's free! She's a free bird." Lucia walks out. |

**Frames checked so far:** a contact sheet of the whole window (one frame every 6 s) and a full-size frame at 2:03:10. The layout: face cam at the left (0,365)-(416,762), game in the middle, chat bottom right, social-handle ticker on top, the game's own subtitles at the bottom. All three are cropped out. **Not checked yet:** frames of the finished Short.
**Face-cam rule (added after the first frame check):** the first crop showed her neckline. I tightened every face crop to head and shoulders before the final render, because a suggestive frame risks a limited-ads or age restriction and is not what the Short is about.

## 3. Script (111.9 s, Cassandra's own voice plus the game's audio; no voice-over)

| Out | Beat | Content |
|---|---|---|
| 0:00-0:04.5 | **Suspense opening** | Cold open on the breakup lines and "Oh my god." Freeze frame 0.5 s with a record scratch. Hook "JASON VISITS LUCIA / IN PRISON. THEN?". |
| 0:04.5-0:16.5 | **Premise** | Prison reception: "I'm here for Lucia Caminos." Pop "SHE'S GETTING OUT?!". |
| 0:16.5-0:29.8 | **Open loop** | The flashback piece at 1.5x. Pop "FLASHBACK?!". |
| 0:29.8-1:04 | **Peak 1** | The phone call. "They broke up?!" Face takeover at 0:45.7. Pop "THE REAL JASON?!". |
| 1:04-1:33.8 | **Emotional turn** | Slow push on Jason, "a good life", "visitors list". |
| 1:33.8-1:47.5 | **Payoff** | Slow-motion at 0.75x on "She's free!", face takeover at 1:42.2. |
| 1:47.5-1:51.9 | **Loop + CTA** | "It's a story better than GTA 5." CTA from 1:48.7: *SUBSCRIBE for Part 2!* with a REPLAY strip back to the hook. |

---

## 4. Shot list (output clock, every move is rule-based and repeatable)

Cuts between pieces: 0:04.5, 0:16.5, 0:29.8, 1:03.8, 1:33.8, 1:39.2, 1:47.5.

| Time | Shot | What it does |
|---|---|---|
| 0:00-0:04.0 | **Slow zoom** (game push 10%) | The suspense creep over the teaser. |
| 0:02.9-0:03.95 | **Punch-in** on her face (14%) + **impact shake** on the game at 0:02.9 | She says "Oh my god." |
| 0:02.95-0:04.5 | **Face close-up takeover** (square face over the dimmed game) | Reaction close-up; it holds through the freeze. |
| 0:04.0-0:04.5 | **Freeze frame** (0.5 s) + record scratch | The hard stop before the premise. |
| 0:04.5 | **Whip pan** (motion blur + white flash) + whoosh | Into the prison scene. |
| 0:04.7-0:16.5 | Slow push (8%) on the game | Premise. |
| 0:07.7-0:08.7 | Punch-in on the face (10%) + ding | "She's getting out?!" pop. |
| 0:16.5-0:29.8 | **Speed ramp 1.5x** + game pan (22 px) | Skips the slow walk. |
| 0:20.8-0:23.4 | **Rotate / tilt** 2.5 deg | The "Is this a flashback?" beat. |
| 0:21.2-0:21.8 | Punch-in on the face (10%) | |
| 0:29.8 | **Whip pan** back to normal speed + flash + whoosh | Into the phone call. |
| 0:30.3-0:42.8 | Slow push (7%) | |
| 0:42.8 | **Vine boom** + punch-in on the face (12%) | "They broke up?!" pop. |
| 0:42.8-0:46.6 | **Rotate / tilt** -3 deg | |
| 0:43.4 and 0:44.5 | **Impact shakes** (9 px and 11 px) | On "We broke up." and "We did not break up!" |
| 0:45.7-0:48.8 | **Face close-up takeover** | "I would not do this to him." |
| 0:54.2-0:56.2 | Punch-in on the face (12%) | "Who is the Jason actor?" |
| 0:49.8-1:03.8 | Slow push (8%) | |
| 1:04.0 | Flash cut + heartbeat starts at 1:05.8 | Into the quiet part. |
| 1:05.8-1:32.8 | **Tracking crop** (zoom 22%, the focus glides from slightly above the centre to slightly below it) | Follows Jason through the phone call. |
| 1:04.3-1:32.8 | Slow push on her face (12%) | Builds with her listening. |
| 1:30.4 | **Impact shake** (7 px) + punch on the face | "Visitors list?!" pop. |
| 1:33.8 | **Whip pan** + flash | Into the payoff. |
| 1:34.2-1:38.8 | Slow push (6%) | |
| 1:36.6-1:37.8 | Punch-in on the face (12%) | "Let's go, queen!" |
| 1:39.2-1:47.5 | **Slow motion 0.75x** | On "She's free! She's a free bird." |
| 1:42.2-1:45.6 | **Face close-up takeover** + **impact shake** (10 px) at 1:42.6 + vine boom at 1:42.4 | The payoff. |
| 1:47.5-1:51.9 | **Pull-out** (10%) + slow push on the face (8%) | Release, then the CTA. |

**Trim rule:** never trim the teaser, the breakup lines, or the payoff.

## 5. Runner timeline and call to action

Reactions are picked by the reaction engine from real events, never at random: curiosity (hook, 0:00.3), shock (0:03), curiosity (0:07.7), curiosity (0:21), shock (0:43), sad (0:46), curiosity (0:54), love (1:23), happy (1:42, 1:46). Details: `clips/cass-prison-call/edit/reactions.json` after the render.
**Call to action (the last 3.2 s):** The Runner appears in the bottom band, and a SUBSCRIBE button is clicked, turns SUBSCRIBED, and a bell rings. The text is "*SUBSCRIBE* for Part 2!" with a "REPLAY: IN PRISON. THEN?" strip. Preset `subscribe`, cliffhanger on. Part 2 is Episode 3 (Lucia and Lana).

---

## 6. Titles (30-40 characters, built on the curiosity patterns in your reference list)

**Chosen by you on 2026-11-22: the primary, "Jason & Lucia: We Did NOT Break Up?!".** Nothing is uploaded or scheduled yet.

| | Title | Chars | Pattern from your list | Why it works |
|---|---|---|---|---|
| **Primary** | Jason & Lucia: We Did NOT Break Up?! | 36 | "What happens when…" / "Is Jason really…?" (a question about the couple) | Their two names plus a line the clip really contains. It creates a doubt ("did they or didn't they?") that only the video settles. |
| Alt 1 | Wait, Jason & Lucia Broke Up?! | 30 | "A Romantic Ride After a Dangerous Mission?!" (disbelief + question mark) | Shock framing, matches Cassandra's own reaction at 0:43. |
| Alt 2 | Jason Waits Outside Lucia's Prison | 34 | "Jason Took Lucia Somewhere Special!" (a place + a person) | Withholds the outcome; the answer comes in the last 14 s. |

Emoji variant for the primary: add " 👀" (still under 40 visible characters).
**Why I did not copy "Mandy Won't Like This!":** Mandy is not in this clip, and honest metadata is a hard rule here (titles must match the video). Use it only on a Short that really shows Mandy. Titles from your list that fit other clips: "Jason Couldn't Take His Eyes Off Lucia!" (not shown here), "This Is Why Jason Chooses Lucia!" (no). Rejected for this clip: "Cassandra CRIED at…" (no tears seen).

## 7. Thumbnail text (2 words) and prompts

**Text: "VISITORS LIST"** (recommended). It completes the title without repeating it, and withholds the one thing the viewer wants: who is on the list. The clip answers it ("I'll put you on the visitors list", 1:30). Other options: "HE WAITED", "ONE CALL".

| Concept | Pattern | Prompt (≤70 words) | Why it hooks |
|---|---|---|---|
| **A (recommended)** | T5 locked door | Flat 2D cartoon, thick black outlines, pitch-black background. The Runner in his cream gi and red headband presses one wide eye to a narrow gap in a cream prison gate, one hand holding a glowing red clipboard with a single line scratched out. Cream text "VISITORS LIST" top. Small GTA VI logo bottom-right. (51 words) | One glowing gap and one scratched-out line: the viewer asks whose name it was. |
| B | T2 shock face + threat | Flat 2D cartoon, thick outlines, black background. The Runner's face fills the left half, eyes huge, red shock marks, a cream phone pressed to his ear; on the right a black prison gate looms with one red phone icon glowing above it. Cream text "VISITORS LIST" top right. Small GTA VI logo corner. (53 words) | His face is the viewer's reaction; the phone icon is the unanswered call. |
| C | T6 anomaly pointer | Flat 2D cartoon, black background. A row of cream phone receivers on a black counter, one glowing red with a thick red arrow pointing at it; the Runner in cream gi and red headband looks the other way, a small red "?" over his head. Cream text "VISITORS LIST" top. Small GTA VI logo corner. (56 words) | One wrong detail, and the Runner who misses it. |

Policy check on the thumbnails: text answerable by the video ✅ · the Runner is the only person ✅ · no gameplay rips, no creator footage, no real face ✅ · 2 words only ✅ · no "OhBhai!" ✅.

---

## 8. Metadata package

**Description** (111.9 s, so no chapter block):

```
SPOILER (early story scene).

Jason waits at the prison for Lucia, and Cassandra reacts to the phone call, the line "we did not break up", and the moment Lucia walks out.

Do you think they broke up? Comment 1 for YES or 2 for NO.

Footage: Cassandra (@Heyycassandraa), https://www.youtube.com/watch?v=DH7kKENJDWA (stream 2:01:30 to 2:05:20). Captions and Runner animation by The Untold Exit.

Look Beyond What Seems Obvious.

#gta6 #gtavi #lucia #jason #shorts
```

**Tags (15):** gta 6 jason and lucia, gta 6 lucia prison, gta 6 jason lucia breakup, gta 6 story scene, gta 6 reaction, gta 6 streamer reaction, gta 6 female streamer, gta 6 first gameplay, gta 6 spoilers, gta vi, grand theft auto 6, gta 6 clips, gta 6 lucia caminos, heyycassandraa gta 6, the untold exit

**Pinned comment:** "At 0:43 the game says 'we broke up.' Seconds later: 'we did not break up.' Which one is true? Comment 1 for broke up, 2 for still together."
**Settings:** not made for kids · category 20 · en · private until you say to schedule (convention: `publishAt` 20:00 UTC).
**Series plan:** Episode 2 "Jason crush" (pool, car in the water, Jason texts), Episode 3 "Lucia and Lana". The CTA of this Short points to Part 2.

## 9. Policy check log (manual, §4.0)

| Check | Result |
|---|---|
| Source licence | ⚠️ Cassandra's stream is on the standard YouTube licence, **not Creative Commons, no written permission on file.** You instructed on 2026-11-21 to take footage from YouTube and accepted the copyright risk. A claim or takedown is possible. `clip_rules.json` has no entry for her ("unknown"): check her rules before posting. |
| Music | ⚠️ Not yet checked by ear. Game audio and any radio music in the stream stay under the clip; a Content ID claim is possible. |
| Reused content | ⚠️ 116 s taken from 6 pieces of a 2h10m stream, with captions, the Runner, camera moves and a CTA added. Credit and link in the description. Chat, social ticker, logos and the game's own subtitles are cropped out. |
| Accuracy | ✅ Cassandra's lines come from her voice (faster-whisper); game lines are unlabelled, because the speaker is not confirmed. "Jason Duval" and "Lucia Caminos" are in two transcripts. ⚠️ The speaker of "we did not break up" is not confirmed, so the title only quotes the line. ⚠️ "He has everything he needs" and "a good life": who "he" is is not shown, so no caption explains it. |
| Face-cam framing | ✅ After the first frame check I tightened every face crop to head and shoulders. 12 frames of the final render checked: head and shoulders only; the opening takeover shows a thin strap at the bottom edge. |
| Sexual content | ✅ None seen in the scene; the face-cam framing was fixed (see above). |
| Profanity | Two words muted automatically from the whisper timestamps (0:21.4 and 1:21.0). The game's subtitles are cropped out. |
| Spoilers | ⚠️ An early story scene. SPOILER leads the description. The hook does not state the ending. |
| Honest metadata | ✅ Title, hook and thumbnail describe what the clip shows. No "Mandy" because she is not in the clip. No claim of tears. |
| Not verified | The finished file (frames, sound, sync); Content ID outcome. Nothing uploaded or scheduled. |
