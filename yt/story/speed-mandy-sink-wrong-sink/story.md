# Story Package: "Speed Misread What Mandy Wanted In GTA 6" (GTA 6 reaction Short, 62s)

Pillar **P3** (GTA 6 moments). Rendered video: `yt/gta6-clips/clips/speed-mandy-sink/final.mp4` (1080x1920, 30fps, 62.0s, with audio).
**Skills run (one story at a time, per CLAUDE.md):** `story-pipeline` (stages 1-7), `video-ideation` (topic and lane check), `script-breakdown` (beats and re-hooks), `visual-style` (The Runner + palette), `title-formulas` (titles), `thumbnail-hooks` (prompts + 2-word hook text), `runner-reactions` (reaction plan), `hook-writer` (on-screen hook). TubeLab MCP is not connected, so evidence comes from the official Data API scripts (AGENTS.md rule 7).
Pattern: **streamer-reaction Short** (face on top, game below, The Runner in the bottom band) with the re-hook pattern from `yt/story/4-regrets-gta6-first-10-minutes`. Length: 62s, inside the 1-2 min Short default.

## 1. Research summary

- **Source video:** [PLAYING GTA 6 EARLY ACCESS GAMEPLAY GET IN HERE!](https://www.youtube.com/watch?v=qSyo5d-dVzA) · IShowSpeed (63.1M subscribers) · 2026-11-19
- **Numbers (API, 2026-11-21):** 66,937,115 views · 839,487 likes · 5,168 comments · live stream, 23h 45m 42s · English
- **License:** standard YouTube license. **Not Creative Commons, no written permission on file.** You told me on 2026-11-21 to source it from YouTube without CC or permission and that you accept the risk. This is recorded in `source.md` and in the policy log below.
- **Window used:** stream 2:01:24 to 2:02:26 (62s). Mandy asks Jason to fix her sink in the "Pipework" mission; Speed's facepalm lands at 0:44 of the Short.
- **How the moment was found:** I searched the captions of Speed's 3 GTA 6 streams for "Mandy", "sink" and "paperwork" (20, 33 and 5 hits). The scene is at about 1:59-2:05 of the 66.9M-view stream. I confirmed it on the video frames and on a faster-whisper transcript before cutting.
- **Why it is a topic wave:** [KeenGamer](https://www.keengamer.com/articles/news/gta-6s-mandy-goes-viral-on-launch-day-after-pipework-scene/) reports Mandy went viral on launch day after the Pipework scene. [GamerBlurb](https://gamerblurb.com/articles/what-was-in-mandys-sink-in-gta-6) covers the open question of what is in the sink. The press says the object is never explicitly identified, so this Short does not name one.
- **Lane check (`trend-scan`, 14 days, "IShowSpeed GTA 6 Mandy Jason sink paperwork"):** only 2 videos matched, with 8 and 2 views. The lane is open on YouTube today. Quota: about 102 units for the scan plus about 3 for video details.
- **Format proof (`docs/viral-gta6-streamers-2026-11-21.md`):** small clip channels beat their size with short stream reactions: Recap Shorts Clips 3.22M views on 1,480 subs (21s), zuxa 1.40M on 922 subs (28s), Insomnia Clipz 2.78M on 6.1K subs (32s). Title pattern: named person + reaction + emotion emoji.
- **Gap we exploit:** the clip channels cut a single punchline. Ours adds a curiosity question in the hook ("misread what Mandy wanted"), re-hooks, a pattern interrupt and a payoff, so the viewer stays past 10 seconds.
- **Caveat:** ratios are views over subscribers, not retention. Our own data says short cutdowns have not converted on this channel (AGENTS.md section 3), so treat this as a test.

## 2. Script (beat structure)

No new narration. The beats come from Speed's real reaction and the game's dialogue; our layer is the hook, captions, one pop-up and The Runner.

| Out time | Beat | What it does |
|---|---|---|
| 0:00-0:02 | Hook | "Speed MISREAD what Mandy WANTED in GTA 6" stays on screen. The Runner asks "WAIT...?" with 👀 |
| 0:02-0:10 | Promise / context | Mandy tells Jason where the plunger is; Speed watches |
| 0:10-0:16 | Re-hook 1 | "Why am I getting a plunger?" The first sign he is off track |
| 0:16-0:27 | Stakes | "I'm about to fix her sink. Who she think I am, Fix-It Felix?" Speed is annoyed; The Runner reacts |
| 0:27-0:34 | Open loop | "Oh my god. Oh, you lost?" Mandy corrects him |
| 0:34-0:41 | Pattern interrupt | "WRONG SINK?!" pops up; "Not this sink, silly" |
| 0:41-0:44 | Re-hook 2 | "The kitchen sink." The viewer sees which sink she meant |
| 0:44-0:54 | Payoff | Facepalm: "I thought she meant HER sink." Zoom punch on his face, laughing Runner |
| 0:54-1:02 | Loop | He asks chat if they thought the same, then "Okay." The Runner breathes out; the hook invites a replay |

## 3. Storyboard grid (9:16, 1080x1920)

Layout: a blurred copy of the game fills the frame. Speed's facecam sits on top (665px). The game sits in the middle, cropped to remove chat, logo, timer, viewer count, minimap and the game's own subtitles. The Runner sits only in the bottom band at about 13% of the screen height. Captions sit on the seam between the face and the game. Timings match the render (`tools/render_reaction_short.py`).

| Time/Scene | Narration reference | Visual action and continuity | Camera/graphics | Sound |
|---|---|---|---|---|
| S0 · 0:00-0:02 Hook | Hook text | Speed smiles at the screen. In the game, a woman lies on a bed with a laptop. | Hook "Speed MISREAD what / Mandy WANTED in GTA 6" cream + red on top; Runner appears with 👀 and "WAIT...?" | Game audio + Speed |
| S1 · 0:02-0:10 | "Where's your plunger? Bathroom. Across the hall." | Jason searches the bathroom: bathtub, sink and mirror, seen from behind and from above. | Caption on the seam | Game audio + Speed |
| S2 · 0:10-0:16 | "Why am I getting a plunger?" | Jason stands in the bathroom with his back to the camera. Speed looks puzzled. | Runner: "HUH?" with a confused-face emoji | Game audio + Speed |
| S3 · 0:16-0:27 | "I'm about to fix her sink. Fix-It Felix?" | Jason looks at the bathroom sink in the mirror. Speed reacts annoyed. One swear word is muted at 0:15.7-0:16.5. | Runner annoyed ("HEY!") | Speed, one word muted |
| S4 · 0:27-0:34 | "Oh my god. Oh, you lost?" | Jason walks back to the bedroom; Mandy appears at the bedroom door at about 0:35. | Caption on the seam | Game audio + Speed |
| S5 · 0:34-0:41 | "Not this sink, silly." | Same scene; Speed realises. | Red "WRONG SINK?!" pop in the bottom band; Runner recoils with a shocked emoji | Game audio + Speed |
| S6 · 0:41-0:44 | "The kitchen sink." | Jason stands by the bedroom dresser, then turns toward the hallway. | Caption on the seam | Game audio + Speed |
| S7 · 0:44-0:54 | "I thought she meant HER sink. I'm tweaking." | Speed facepalms, then laughs. | Zoom punch of 10% on the facecam; Runner laughs with tears (😂 emoji) | Speed |
| S8 · 0:54-1:02 | "Chat, I thought she meant her sink... Okay." | Jason walks the hallway toward the kitchen; the kitchen sink with the plunger prompt shows at the very end (about 1:01). | Runner breathes out with a sparkle emoji | Speed |

**Continuity rule:** the hook asks what Mandy wanted; the answer lands at 0:44. Never trim the hook, the 0:34 interrupt, the 0:44 payoff or the last 3 seconds. Trim the plunger dialogue (S1-S2) first if the Short must be shorter.

## 4. Visual prompt timeline (The Runner · `visual-style` · `runner-reactions` · bottom blur band)

Reactions came from `reaction_engine.plan()` on the real events below, one animation folder per reaction. Nothing is random.

| Time | Event (why) | Animation + emoji + word | Camera direction | Dopamine beat type |
|---|---|---|---|---|
| 0:00 | Hook question | `curiosity` + 👀 eyes, "WAIT...?" | Bottom band, slides in from the right | Curiosity gap |
| 0:10.7 | Speed asks "why am I getting a plunger?" | `curiosity` + confused emoji, "HUH?" | Same | Open loop |
| 0:16.5 | "Who she think I am?" (annoyed) | `angry`, "HEY!" | Same | Tension |
| 0:34.2 | "Not this sink, silly" | `recoil` + shocked emoji, "WHAT?!", plus the red "WRONG SINK?!" pop | Same | Shock |
| 0:44.2 | Facepalm: "I thought she meant her sink" | `cry_laugh` + laugh-cry emoji, "LMAO!" | Same | Payoff |
| 0:50.0 | "My fault, my fault" | `laugh`, "HAHAHA!" | Same | Release |
| 1:00.3 | Last "Okay." | `relief` + sparkle emoji, "PHEW..." | Slides out | Loop |

Prompt template for each: `[CHARACTER] The Runner (cream chibi, red headband, cream gi) [emotion]. [SCENE] bottom blur band under the real footage, nothing over the footage. [STYLE] 2D flat, thick black outlines, #000000 #F5F5DC #8B0000 #FF0000, no gradients. [TEXT] the reaction word.`

Note: the Runner uses your walk frames (frame 0 for the standing and recoil poses) plus motion and effect marks. He is never redrawn, and the extracted `mood/` stills are not used mid-clip.

## 5. Titles (30-40 characters)

| | Title | Chars |
|---|---|---:|
| **Primary** | Speed Misread What Mandy Wanted In GTA 6 | 40 |
| Alt 1 | Speed Fixes Mandy's Sink In GTA 6 😭 | 35 |
| Alt 2 | Wrong Sink? Speed's GTA 6 Facepalm | 34 |

Formula (`title-formulas`): named person + reaction/fail + GTA 6, with an emoji only on Alt 1. The primary title matches the on-screen hook and the footage (Speed's own words at 0:44). No claim about what is in the sink.

## 6. Thumbnail text (2 words)

1. **WRONG SINK** (recommended) · 2. WHICH SINK? · 3. HER SINK

Pattern rule (`thumbnail-hooks`): label text → **T3** primary, **T6** alternate. Rules (CLAUDE.md): relevant to this story, 70 words or fewer, curiosity + dopamine hook, exactly 2 words that complete the title and do not repeat it. The Runner is the only person in frame: no IShowSpeed face, no Mandy or Jason likeness. **Logo override (2026-11-20, your decision):** the small official GTA VI logo is added as a topic label. Attach the original image when generating, unmodified.

| Concept | Pattern | Prompt (paste-ready) | Why it hooks |
|---|---|---|---|
| 1 | T3 hidden-truth reveal | `16:9 thumbnail, 2D flat cartoon, thick black outlines, black background, cream + red. The Runner (chibi, red headband), wary, holding a flashlight. Pitch-black kitchen; his beam lights only one steel sink and a red plunger leaning on it, a second sink faintly visible behind a door. Text "WRONG SINK" huge cream, top-right on two lines. Small attached official GTA VI logo, unmodified, bottom-right. Eye-magnet: the lit sink.` | The beam asks which sink, and the second sink hints that he picked the wrong one. |
| 2 | T6 anomaly pointer | `16:9 thumbnail, 2D flat cartoon, thick black outlines, black background, cream + red. The Runner (chibi, red headband), confused, looking away. Flat apartment hallway. One wrong detail: a bathroom sink and a kitchen sink side by side, the kitchen one circled red with an arrow. Text "WRONG SINK" huge cream, top-left. Small attached official GTA VI logo, unmodified, top-right. Eye-magnet: the red circle.` | One circled detail while he looks the other way: viewers want to know which sink was meant. |
| 3 | T2 shock-face + threat | `16:9 thumbnail, 2D flat cartoon, thick black outlines, black background, cream + red. The Runner (chibi, red headband), shocked, hand on forehead, red marks. Close-up left. Right: a giant red plunger standing in a sink, steam rising. Text "WRONG SINK" huge cream, top-right on two lines. Small attached official GTA VI logo, unmodified, bottom-left. Eye-magnet: the giant plunger.` | His facepalm mirrors the clip's payoff; the plunger is the object from the first 10 seconds. |

**Recommended:** concept 1 (T3 hidden-truth reveal). The text completes the title and does not repeat it.

## 7. Metadata package

**Description** (Short, under 3 minutes: no chapter block, AGENTS.md rule 10):

```
Speed thought Mandy meant a different sink in GTA 6, and his reaction says it all. Facepalm at 0:44.
Reaction clip from IShowSpeed's GTA 6 stream with commentary captions and a character reacting.

Footage: IShowSpeed, "PLAYING GTA 6 EARLY ACCESS GAMEPLAY GET IN HERE!"
https://www.youtube.com/watch?v=qSyo5d-dVzA (stream 2:01:24-2:02:26)
All footage and game content belong to their owners. Fan-made edit, not affiliated with Rockstar Games.

THE UNTOLD EXIT: Look Beyond What Seems Obvious.

#gta6 #ishowspeed #gtavi #gaming #shorts
```

**Hashtags (5):** `#gta6 #ishowspeed #gtavi #gaming #shorts`

**Keywords / tags (15):** ishowspeed gta 6, ishowspeed gta 6 reaction, gta 6 mandy, gta 6 mandy sink, gta 6 jason, gta 6 pipework mission, gta 6 funny moments, gta 6 reaction, gta 6 gameplay, gta 6 shorts, gta 6 vice city, grand theft auto 6, grand theft auto vi, gta vi, gta 6

No "official", "leaked" or "early access" wording in our own metadata. The creator's name appears because the clip is his reaction (editorially relevant).

**Flags:** `madeForKids` = **No** (confirm in Studio). Playlist: GTA 6 Secrets (`PLRXf1uVlif1Q`). Schedule (not scheduled): private + `publishAt` 20:00 UTC, one Short per day, after your yes.

## 8. Policy check log

This is a manual check against YouTube's policies.

| Check | Result |
|---|---|
| Title and thumbnail match the content | PASS. The titles describe Speed's reaction as shown; no claim about the sink's contents |
| Permission / license | **RISK, accepted by the user.** Standard-license footage, no CC, no written permission. Editing does not remove copyright risk: a claim, mute, block or strike is possible |
| Logos, ads, key art in frame | Stream chat, stream logo, timer, viewer count and minimap are cropped out. The GTA HUD and the streamer's facecam (his own jersey and room) remain. No Rockstar key art or trailer footage |
| Credit and source link | PASS. In the description and `caption.md` |
| Transformative | Partial. Own hook, captions, pop-up, character animation and zoom. 62s of a 23h 45m stream (0.07%) |
| Mature content | CAUTION. The scene contains innuendo ("I thought she meant her sink"). The window stops before Mandy's swimsuit scene. Limited ads or an age review are possible; the title and description stay clean |
| Profanity | One swear word muted at 0:15.7-0:16.5. Speed's other speech in the window is clean |
| Kids | Not made for kids; the audience is gaming adults |
| Chapters | Not applicable (Short) |
| Human approval | Required before any upload |

**Open items:**
- Captions come from YouTube's auto captions plus faster-whisper, cross-checked. Lines without a speaker label are game dialogue whose speaker I could not confirm.
- The `WRONG SINK?!` pop is our wording for the game line "Not this sink, silly". Speed did not say it.
- The game audio and any music under it are used as in the stream; nothing was cleared.
- Safer options if you want them: re-cut 0:34-0:54 with Speed's reaction only (about 20s), or use a Creative Commons stream instead.
