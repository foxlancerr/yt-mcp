# Story pipeline: "Wait, Is Lana REALLY in GTA 6?!" (GTA 6, Cassandra reaction Short, Episode 3 of 3)

**Skills run:** `story-pipeline` → `gta6-streamer-hunter` (/female, /funny: handle scan, loudness, frame check) → `gta6-clipper` (window download, whisper, source rules) → `script-breakdown` → `visual-style` → `title-formulas` (your reference list as the pattern source) → `thumbnail-hooks` → `hook-writer` → `runner-reactions` (reactions + subscribe CTA) → manual policy check (§4.0).
**Pillar:** P3 · **Format:** 9:16 Short, 84.7 s · **Slot:** SCHEDULED 2026-11-24 20:00 UTC (private + publishAt) as `O2LIPC5JMiU` (https://youtube.com/shorts/O2LIPC5JMiU) · **Series:** Episode 3 of 3 (Ep 1 is "Jason & Lucia: We Did NOT Break Up?!")
**Goal given by you:** curiosity, excitement, a hook in the first 2 s, and a path that makes viewers subscribe. **Honest read:** 1M views cannot be promised. The numbers below show the range this channel's GTA 6 clips have reached.
**Delivered clip:** `yt/gta6-clips/clips/cass-lucia-lana/final_cta.mp4` (copy in `yt/gta6-clips/output/gta6-cass-lucia-lana-cta.mp4`): 1080x1920, 30 fps, 84.7 s, with audio. Rebuild: `python yt/gta6-clips/tools/render_reaction_short.py cass-lucia-lana --cta`. Config: `EXTRA["cass-lucia-lana"]` in `tools/cass_clips.py`.
**Checked:** 10 frames spread over the finished file (hook, face close-ups, pops, the full-screen face takeovers, the subscribe call to action). **Not checked:** the audio by ear.

---

## 1. Research summary

- **Source:** [Cassandra, "FIRST GTA 6 EVER GAMEPLAY :) YAYAYYAYAY", @Heyycassandraa, 2h10m live stream](https://www.youtube.com/live/DH7kKENJDWA). Standard YouTube licence.
- **Channel numbers (Data API, 2026-11-22, TubeLab not connected):** 60.6K subscribers; her best GTA 6 clips are [30,672 views (29 s joy)](https://www.youtube.com/watch?v=Y-zCmwxFHzE) and [29,913 (23 min ASMR)](https://www.youtube.com/watch?v=S1_Rx3jQaH0). A comparable reaction to Jason on another channel reached 21,116 views ([Alina Rin Shorts](https://www.youtube.com/watch?v=4hjwRUOReII)). A tight 85 s reaction is inside that proven range; going well past it depends on the hook.
- **Not available today:** the YouTube search quota was used up, so no fresh keyword trends. The web results I found cover Lucia and Jason's story but give no view counts for this moment.
- **Why this moment (measured):** the loudest stretch of her stream's last 15 minutes (loudness peak at 2:06:00) is when she recognises a song on the in-game radio and says "That's Lana!" Two transcripts (the full stream and the cut) agree on "Lana's in this game".
- **Not verified:** who "Lana" is. She says the name; the game audio is not identified, and the clip does not claim it is a real artist. Also not verified: the audio by ear and the Content ID outcome.

## 2. Analysis of the footage

| Window (stream clock) | Beat | What is said / shown |
|---|---|---|
| 2:06:16-19 | **teaser** | "Oh my god, Lana's in this..." |
| 2:05:16-42 | premise | Jason and Lucia walk away from the prison; Cassandra reads chat, "It's a good story", "She is so pretty." |
| 2:05:42-55 | open loop | "She looks exactly like Lucia." "She posted a pic with the guy playing Jason." |
| 2:06:01-31 | **peak** | "That's Lana! That is Lana!" then "Lana's in this game!" and "Girl, did you know that?" |
| 2:06:40-51 | release | "This song is so good." "I've never heard this song before." |

**Frames checked:** a contact sheet of the window (one frame every 4 s) and 10 frames of the finished file. The scene is a drive in a yellow pickup at dusk; the face cam carries most of the story, so the Short leans on face close-ups.
**Face-cam rule:** the first render showed her neckline in the crops, so every face crop was tightened to head and shoulders and the Short was re-rendered. The 10-frame check after that shows no neckline.

## 3. Script (84.7 s, Cassandra's own voice plus the game's audio; no voice-over)

| Out | Beat | Content |
|---|---|---|
| 0:00-0:03.9 | **Suspense opening** | "Oh my god, Lana's in this..." then a 0.4 s freeze and a record scratch. Hook "CASSANDRA HEARD IT / LANA IN GTA 6?!". |
| 0:03.9-0:29.9 | **Premise** | Jason and Lucia walk off; "It's a good story." |
| 0:29.9-0:42.9 | **Open loop** | "She looks exactly like Lucia." "She posted a pic with the guy playing Jason." Pops "LOOKS LIKE LUCIA?!", "THE REAL JASON?!". |
| 0:42.9-1:13.5 | **The reveal** | "That's Lana!" Face takeovers at 0:46.1 and 0:59.2, freeze at 1:00.8, "Lana's in this game!" |
| 1:13.5-1:24.7 | **Release + CTA** | "This song is so good." "I've never heard this song before." CTA from 1:21.5: *Did you see LANA coming? SUBSCRIBE!* with a REPLAY strip. |

---

## 4. Shot list (output clock; every move is rule-based and repeatable)

Cuts between pieces: 0:03.9, 0:29.9, 0:42.9, 1:01.4, 1:13.5.

| Time | Shot | What it does |
|---|---|---|
| 0:00-0:03.5 | **Slow zoom** (game push 10%) | Suspense creep. |
| 0:00.6-0:03.5 | **Punch-in** on her face (12%) | "Oh my god, Lana's in this..." |
| 0:03.5-0:03.9 | **Freeze frame** (0.4 s) + record scratch | The hard stop before the premise. |
| 0:03.9 | **Whip pan** (motion blur + flash) + whoosh | Into the drive. |
| 0:03.9-0:29.9 | **Tracking crop** (zoom 20%, the focus glides from the upper left to the centre) | Follows Jason and Lucia walking, then the truck. |
| 0:24.2-0:25.6 | Punch-in on her face (10%) + ding | "She looks exactly like Lucia." |
| 0:29.9 | Flash cut, slow push (7%) on the game | |
| 0:33.0-0:34.4 | Punch-in on her face (12%) | "The guy playing Jason." |
| 0:42.9 | **Whip pan** + flash + whoosh | Into the reveal. |
| 0:43.2-0:44.6 | Punch-in on her face (10%) | |
| 0:46.1-0:48.3 | **Face close-up takeover** + **impact shake** (10 px) at 0:46.4 + vine boom + **rotate** 3 deg | "That's Lana! That is Lana!" |
| 0:50.4-0:52.8 | Punch-in on her face (10%) | "You guys hear that?" |
| 0:58.2-0:60.8 | **Slow zoom** (12%) on the game | Builds to the line. |
| 0:59.2-1:01.4 | **Face close-up takeover** + **impact shake** (12 px) at 0:59.5 + bass drop | "Lana's in this game!" |
| 1:00.8-1:01.4 | **Freeze frame** (0.6 s) + record scratch | Held on her face. |
| 1:02.4 | **Shake** (7 px) | "What the...?" |
| 1:01.4-1:13.5 | Pull-out (8%) | Release. |
| 1:04.0-1:06.4 | **Face close-up takeover** + punch-in (12%) | "Girl, did you know that?" |
| 1:13.5 | **Whip pan** | Into the last beat. |
| 1:13.5-1:24.7 | Slow push (8%) on her face, push (6%) on the game | |
| 1:16.4 | Ding | "What song?!" pop. |
| 1:22.8-1:24.6 | **Face close-up takeover** | "I've never heard this song before." |

**Trim rule:** never trim the teaser, the "Lana's in this game" line, or the final line.

## 5. Runner timeline and call to action

Reactions chosen by the reaction engine from real events: shock (0:00.5), love (0:13, "she is so pretty"), curiosity (0:24), shock (0:33), shock (0:46), shock (0:59), curiosity (1:03), happy (1:16, 1:22). In the finished file I saw the Runner reacting ("WHAT?!", "WAIT...?") at the pops.
**Call to action (the last 3.2 s):** the Runner appears in the bottom band; a SUBSCRIBE button is clicked and turns SUBSCRIBED, with the text "Did you see *LANA* coming? *SUBSCRIBE*!" and a "REPLAY: LANA IN GTA 6?!" strip. Preset `subscribe`, type `unexpected`.

---

## 6. Titles (30-40 characters, built on your reference list's curiosity patterns)

| | Title | Chars | Pattern from your list | Why it works |
|---|---|---|---|---|
| **Primary** | Wait, Is Lana REALLY in GTA 6?! | 31 | "Is Jason Really This Romantic?!" (a doubt about a name) | A name viewers already search plus a yes/no they have to settle. The clip is her reaction to hearing it. |
| Alt 1 | Jason & Lucia Drive Off... Then LANA?! | 38 | "A Dangerous Mission… Then a Romantic Moment!" (a calm scene, then a twist) | The chain from the couple to the reveal; it matches the order in the clip. |
| Alt 2 | Her Reaction to GTA 6's Lana Moment | 35 | "Lucia Got a Side of Jason Nobody Expected!" (a named reaction to a moment) | Plain and searchable, for viewers who already know the moment. |

Emoji variant for the primary: add " 👀".
**Honesty note:** the title is a question because the clip only shows that Cassandra says "Lana's in this game" after hearing a song. It does not prove who Lana is, and no title says it does. Rejected: "Lana Del Rey in GTA 6!" (not shown), "Cassandra CRIED…" (no tears).

## 7. Thumbnail text (2 words) and prompts

**Text: "WHO'S SINGING?"** (recommended). It completes the title by asking what the viewer wants to know, and the clip gives the answer she believes ("Lana"). Other options: "THAT SONG", "RADIO LEAK".

| Concept | Pattern | Prompt (≤70 words) | Why it hooks |
|---|---|---|---|
| **A (recommended)** | T3 hidden-truth reveal | Flat 2D cartoon, thick black outlines, pitch-black background. The Runner in his cream gi and red headband sits in a dark yellow pickup, hands on the wheel, one eyebrow up; a single glowing red radio dial lights the dark with a small cream music note above it. Cream text "WHO'S SINGING?" top. Small GTA VI logo bottom-right. (52 words) | One glowing dial in a black scene: the viewer wants to know who is singing. |
| B | T2 shock face + threat | Flat 2D cartoon, black background. The Runner's face fills the left half, mouth open, red shock marks, cream headphones on his ears; on the right a giant red music note looms from a dark car radio. Cream text "WHO'S SINGING?" top right. Small GTA VI logo corner. (48 words) | His shock is the viewer's; the note is the threat. |
| C | T6 anomaly pointer | Flat 2D cartoon, black background. A row of cream car radios, one glowing red with a thick red arrow pointing at it and a small red question mark; the Runner in cream gi and red headband looks the other way. Cream text "WHO'S SINGING?" top. Small GTA VI logo corner. (50 words) | One wrong radio and the Runner who misses it. |

Policy check on the thumbnails: text answerable by the video ✅ · the Runner is the only person ✅ · no gameplay rips, no creator footage, no real face ✅ · 2 words only ✅ · no "OhBhai!" ✅.

---

## 8. Metadata package

**Description** (84.7 s, so no chapter block):

```
Cassandra is playing GTA 6 when she suddenly recognises a song and says "Lana's in this game!"

Do you think it's really Lana? Comment 1 for YES or 2 for NO.

Footage: Cassandra (@Heyycassandraa), https://www.youtube.com/watch?v=DH7kKENJDWA (stream 2:05:16 to 2:06:51). Captions and Runner animation by The Untold Exit.

Look Beyond What Seems Obvious.

#gta6 #gtavi #lucia #jason #shorts
```

**Tags (15):** gta 6 lana, gta 6 radio song, gta 6 soundtrack reaction, gta 6 female streamer reaction, gta 6 first gameplay, gta 6 lucia, gta 6 jason, gta 6 reaction, gta 6 funny moments, gta 6 streamer, gta vi, grand theft auto 6, gta 6 clips, heyycassandraa gta 6, the untold exit

**Pinned comment:** "At 1:05 she asks 'Girl, did you know that?' Did you? Comment 1 for YES, 2 for NO."
**Settings:** not made for kids · category 20 · en · private until you say to schedule (convention: `publishAt` 20:00 UTC).
**Series plan:** this is Episode 3. Episode 1 ends on "SUBSCRIBE for Part 2!" and points here.

## 9. Policy check log (manual, §4.0)

| Check | Result |
|---|---|
| Source licence | ⚠️ Cassandra's stream is on the standard YouTube licence, **not Creative Commons, no written permission on file.** You instructed on 2026-11-21 to take footage from YouTube and accepted the copyright risk. A claim or takedown is possible. `clip_rules.json` has no entry for her ("unknown"): check her rules before posting. |
| Music | ⚠️ **A licensed in-game radio song plays under about the last 40 s (from 0:42), and it is the subject of the Short.** It is mixed into the stream audio and cannot be removed without losing the reason for the clip. A Content ID claim is likely. This goes beyond the general YouTube risk you accepted; options: ship it as is, mute the song and keep her voice only, or drop this episode. |
| Reused content | ⚠️ 83.7 s from 5 pieces of a 2h10m stream, with captions, the Runner, camera moves, freeze frames and a CTA added. Credit and link in the description. Chat, ticker, logos and the game's subtitles are cropped out. |
| Accuracy | ✅ Cassandra's lines come from her voice (faster-whisper) and agree with the full-stream transcript. ⚠️ "Lana" is her word; the clip does not identify the song or the artist. ⚠️ "She posted a pic with the guy playing Jason": it is her statement about the actress, not verified here. |
| Face-cam framing | ✅ Crops tightened to head and shoulders after the first frame check; 10 frames of the final file checked, no neckline. |
| Sexual content | ✅ None in the footage. The captions never refer to her body. |
| Profanity | Four words muted automatically from whisper timestamps (1:03.2, 1:10.4, 1:11.0, 1:17.3). The game's subtitles are cropped out. |
| Spoilers | ✅ No story spoiler. |
| Honest metadata | ✅ Title, hook and thumbnail describe what the clip shows (a reaction, a question about Lana). No claim of tears. |
| Not verified | The audio by ear; Content ID outcome. Nothing uploaded or scheduled. |
