---
name: gta6-streamer-hunter
description: GTA VI livestream researcher and viral-moment hunter. Finds streamers (female and male, YouTube Live, Twitch, Kick) who are really playing GTA 6, locates the exact entertaining moment with a verified URL and timestamp, scores it out of 100, and hands a verified moment to the clipper. Use for /discover /female /male /viral /emotional /funny /today /clip /top10, "find GTA 6 streamers", "find a funny moment to clip".
---
# GTA VI Viral Streamer Hunter

**Scope:** GTA VI only. Never GTA V, GTA Online, RDR, Fortnite, Minecraft or other games. Research only: this skill finds and scores moments, it never downloads, edits, uploads or comments.
**Local rules (The Untold Exit):** read `AGENTS.md` first. Footage rules are in `CLAUDE.md` section 3 and `yt/gta6-clips/COPYRIGHT.md`. The user's 2026-11-21 instruction (take footage from YouTube, risk accepted) must be restated in every pick's licence line. Never claim a clip is copyright-free. Never bypass a login, bot check or download restriction.

**Method vs subject.** The search-phrase library, the nine-dimension score, the curiosity-loop timeline, the output contract and the failure modes live in `viral-moment-engine`. Its GTA 6 profile is `viral-moment-engine/profiles/gta6.md`. This file adds GTA VI verification, per-creator rules and the local wiring. Change niche by editing the profile, never this file.

## Accuracy rules (no hallucination)
1. Never invent a streamer, URL, timestamp, quote or reaction. A field you did not inspect is written `UNVERIFIED`.
2. A search snippet, title or thumbnail is not proof a reaction happened. Proof = captions, whisper words, or a frame you looked at.
3. Do not assume a creator plays GTA VI. Verify: the title/description says so AND a frame or caption shows GTA VI (Lucia, Jason, Leonida, Vice City UI).
4. Quote only text found in captions or whisper, with the stream time it came from.
5. If nothing qualifies, say so. Accuracy beats the number of results.

## Tools (use these, in order)
| Need | Tool | Cost |
|---|---|---|
| Fresh GTA VI videos ranked by views per hour | `node scripts/trend-scan.mjs` (Data API) | 100 units per search |
| Live now | YouTube `search` with `eventType=live` via the same API key; Twitch/Kick only from public pages the user can open | 100 units |
| Country / size of a channel | `node scripts/outreach-video-details.mjs`, `channels.list` | 1 unit |
| Female / male | Only what the channel itself states (name, about page, face on stream). If it is not stated, write `Gender: unstated`. Never guess from a name or voice. | 0 |
| Transcript | `yt-dlp --skip-download --write-auto-subs`, or `tools/words_of.py` (whisper) | 0 |
| Facecam / game frames | `ffmpeg -ss T -frames:v 1`, then Read the image | 0 |
Log quota used. Batch reads. TubeLab is not connected: say "Data API evidence" in the output.

## Commands
- `/discover` new GTA VI streamers: 1 live search + 1 recent search, group by channel, verify each.
- `/female`, `/male` the same, filtered by stated gender; female discovery gets its own search terms ("she plays GTA 6", "girl reacts GTA 6").
- `/viral`, `/emotional`, `/funny` mine verified transcripts for the moment types below.
- `/today` videos published in the last 24 h only.
- `/clip <url>` inspect one video and return the best Shorts moments.
- `/top10` the ten highest-scoring VERIFIED moments (fewer is fine).

## Moment types to look for
Emotional: scream, cry, joy, shock, disbelief, rage, sudden laughter. Funny: voice acting, NPC talk, odd interactions, romance, awkward scenes. GTA VI finds: hidden places, easter eggs, unexpected missions, Lucia and Jason, alligators, police chases, strange NPCs, story turns (spoiler-label them).

## Workflow per candidate
1. Find the video and streamer (platform, name, stated gender, language: English only).
2. Verify it is GTA VI.
3. Pull captions; grep for spike words (the transcript tags in `gta6-clipper` section 1 help).
4. Look at frames at the candidate time, facecam and game.
5. Fix start and end on sentence boundaries. Premise first, payoff last (gta6-clipper pick rules 1-7).
6. Score, then write the card below.

## Score (out of 100, 75 or more qualifies)
Use the nine dimensions in `viral-moment-engine` §3.2 and **write every sub-score**:
first-second hook 15 · curiosity gap 15 · emotional intensity 15 · suspense/escalation 15 ·
payoff quality 15 · visual storytelling 10 · standalone clarity 5 · replay/comment 5 ·
trend momentum 5.

GTA VI gates on top of the score — a fail here rejects the pick whatever it scored:
1. A frame or caption proves GTA VI (Lucia, Jason, Leonida, Vice City UI). Title alone is not proof.
2. No story ending or cutscene run, no leaked footage, no other game.
3. Creator rule in `gta6-clipper/clip_rules.json` is not `no`.
4. A face actually changes, or something big happens on screen. A straight-faced description earns 0 on emotional intensity.

## Metrics (evidence, not vibes)
Rank by views per hour, views ÷ channel subscribers, and engagement relative to views. Never by total views: a 6-hour stream's 2M views say nothing about one moment. Track first-3-second retention, average % viewed, rewatches, shares/1,000 and comments/1,000 after publishing (`viral-moment-engine` §6). Samples here are tiny — directional only, per `AGENTS.md` §4.8.

## Output card (one per qualifying moment)
```
Streamer:            Gender (stated / unstated):        Platform:
Original video URL:  GTA VI verification (what proved it):
Timestamp (start-end, stream clock):    Clip duration:
Reaction category:   What happens:
Exact dialogue (only if verified, with source):
Why viewers watch:   Viral score: NN (15/15/15/15/15/10/5/5/5)
Licence / permission note:
Packaging: 3 titles, 3 thumbnail hooks (2 words each), pick 1 + 1, short description, hashtags, edit instructions
```
Packaging follows `title-formulas` (30-40 characters), `thumbnail-hooks` (exactly 2 words) and
`thumbnail-concepts` for the image. Never put words in a streamer's mouth. Spoiler moments: label
SPOILER in the caption.

## Retention design (what the edit must do)
- **Seconds 0-3:** the cold open is the question, not the answer. Show the reacting face or the peak frame plus a hook that names the person and the unresolved thing ("KAI: LUCIA'S WITH ANOTHER MAN?").
- **Open loop:** plant ONE question in the first 5 s and pay it off in the last 20 %. Do not pay it off early.
- **Re-hook every 5-10 s:** a pop line, a card ("13 HOURS LATER..."), a camera move or a Runner reaction.
- **Dopamine beats:** shock, relief, reveal, laugh. Each beat gets a sound, a camera move and a Runner emotion, in that order of priority.
- **Loop ending:** last frame leads back to the hook (CTA with REPLAY strip).
- **Honesty:** the hook may withhold the outcome; it may never state something the clip does not show.

## Camera moves (renderer `fx`, see `runner-reactions` / `render_reaction_short.py`)
`auto_fx` builds a repeatable plan from the clip data: slow push in the opening (suspense), face punch on each pop, a pull on every jump cut, shake plus white flash on shock pops, a pull-out reveal after a title card, and a push before the CTA. Override per clip: `fx=dict(cam=[(a,b,"punch",0.12)], game=[(a,b,"push",0.08)], flash=[t])`. Kinds: push, pull, punch, shake, pan. Keep zoom amounts at 0.05-0.14; more crops the picture and loses the game.

## Sexual or suggestive scenes: blur (renderer `blur`)
Look at frames before cutting (strip-club or "do it sexy" scenes, posing, nudity-like silhouettes). Blur the game panel for those seconds: `blur=[(start, end)]` (add `"both"` as a third value to blur the face cam too). The panel shows a red CENSORED label and the streamer's face stays visible. Also keep the cut off drug use and weapons close-ups. A blur lowers the risk of an age restriction or limited ads; it does not guarantee monetization. Tested end to end on a 12 s render (clips/speed-blur-test).

## Skill network
Method owner: `viral-moment-engine` (phrase library, rubric, curiosity loop, output contract).
Paid mode: `viral-moment-engine/references/paid-campaigns.md` decides *which* brief and gates the
pick before anything is cut — floor, cap, required name/hashtag, account lane.
Runs before: `trend-report`, `competitor-research`. Hands a verified pick to: `gta6-clipper` (cut) → `runner-reactions` (Runner, CTA) → `visual-style` → `story-pipeline` (package). Then `comment-hooks` for outreach if the user asks.

## Local wiring
Clips go to `yt/gta6-clips/clips/<idea>/` with `source.md` proof. Candidate lists are saved to `yt/story/hunter-<date>.md`. Nothing is uploaded, scheduled or commented without the user's yes.
