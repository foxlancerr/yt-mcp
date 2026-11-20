# Story Package: "Tommy's Mansion Too Early In GTA 6" (GTA 6 Short, 25s)

Pillar **P3** (GTA 6 gameplay moments). Rendered video: `yt/gta6-clips/clips/lunar-vercetti-early/final.mp4` (1080x1920, 30fps).
**Skills run (one story at a time, per CLAUDE.md):** `story-pipeline` (stages 1-7), `video-ideation` (topic fit), `script-breakdown` (beats), `visual-style` (The Runner + palette), `title-formulas` (titles), `thumbnail-hooks` (prompts + 2-word hook text). TubeLab MCP is not connected, so evidence comes from the official Data API scripts (AGENTS.md §4.7).
Pattern: the **60s Short re-hook pattern** from `yt/story/4-regrets-gta6-first-10-minutes` plus the **capture-matrix rule** from `yt/story/lucia-vs-cops-opening` (real footage intact, our layer is animation and commentary).

## 1. Research summary

- **Source video:** [GTA 6 - What Happens If You Go To The Vercetti Estate Early](https://www.youtube.com/watch?v=TPF8W1_mk7I) · LunarGaming (266K subscribers) · 2026-11-18
- **Numbers (API, 2026-11-20):** 179,745 views · 889 likes · 123 comments · 1:44 · English · 0.7x its subscribers
- **License:** YouTube Creative Commons (`status.license=creativeCommon`, verified by API 2026-11-20). Credit in the caption text.
- **Window used:** 0:07-0:32 (25s) of 1:44
- **Voice and captions:** No voiceover. In-game audio only. Captions are our own commentary describing the screen.
- **Topic wave:** Tommy Vercetti's mansion is a hot GTA 6 nostalgia topic. `tag-scan` top Shorts: Active Gaming "Finally VICE CITY" 38.6K, Duskrig "Starfish Island: Tommy Vercetti's island is back" 26.9K, Voices of AI "Tommy Vercetti's Mansion Is Back in GTA 6" 24.6K.
- **Source:** LunarGaming, 179.7K views, 0.7x its subscribers. Description: you can visit the Vercetti Estate early and try to reach the mansion.
- **Gap we exploit:** other Shorts show the mansion as a map fact. Ours is the ride there: the gatehouse, a "Crime reported" notice, the driveway, and the door.
- **Tags in the top 25 Shorts:** gta 6 (8), vice city (5), tommy vercetti (4), vercetti estate (4). **Hashtags:** #gta6 (29), #vicecity (16), #shorts (15), #gtavi (11), #tommyvercetti (10).

## 2. Script (beat structure)

This Short has no new narration. The beats come from the source footage; our layer is the hook, captions and The Runner.

| Out time | Beat | What it does |
|---|---|---|
| 0:00-0:03 | Hook | "TOMMY'S MANSION, TOO EARLY?" over a bike ride |
| 0:03-0:12 | Promise / context | Past the gatehouse, down a quiet road |
| 0:12-0:17 | Open loop | A "Crime reported" notice appears |
| 0:17-0:22 | Stakes | Up the brick driveway toward the gates |
| 0:22-0:25 | Payoff | On foot at the mansion door |

## 3. Storyboard grid (9:16, 1080x1920)

Layout: a blurred copy of the gameplay fills the frame; the real gameplay stays intact in the middle; hook text in the top blur; captions under the gameplay; **The Runner and his effects appear only in the lower blur band.** Timings match the render (`tools/render_shorts.py`).

| Time/Scene | Narration reference | Visual action and continuity | Camera/graphics | Sound |
|---|---|---|---|---|
| S0 · 0:00-0:03 Hook | Hook text | A bike on a palm-lined road with the route panel on screen. | Hook text "TOMMY'S MANSION / TOO EARLY?" in the top blur, cream + red | Source audio (game) |
| S1 · 0:00-0:02 | "Riding to the Vercetti Estate" | A bike on a palm-lined road with the route panel on screen. Runner walks + '?'. | Real gameplay intact; caption under it | Source audio (game) |
| S2 · 0:02-0:05 | "Past the gatehouse" | A road with a stop sign and yellow lines. The gatehouse is seen around 0:03. Runner walks + '?'; walks. | Real gameplay intact; caption under it | Source audio (game) |
| S3 · 0:05-0:10 | "Down a quiet road" | A quiet road. A "Crime reported" notice appears at the right edge around 0:11. Runner walks. | Real gameplay intact; caption under it | Source audio (game) |
| S4 · 0:10-0:15 | "Crime reported!" | The "Crime reported" notice and empty wanted stars. Runner shakes (startled) + '!!' marks, sweat drops. | Real gameplay intact; caption under it | Source audio (game) |
| S5 · 0:17-0:21 | "Up the driveway" | A brick driveway leading to iron gates and a large house. Runner walks + '?'. | Real gameplay intact; caption under it | Source audio (game) |
| S6 · 0:21-0:25 | "On foot at the mansion" | He leaves the bike and walks toward the mansion. Runner jumps + love bubbles (hearts). | Real gameplay intact; caption under it | Source audio (game) |

**Continuity rule:** the hook's question is paid off in the last beat. Never trim the hook or the last 3 seconds.

## 4. Visual prompt timeline (The Runner · `visual-style` · bottom blur band)

| Time | Prompt (full text) | Camera direction | Dopamine beat type |
|---|---|---|---|
| 0:00-0:03 | [CHARACTER] The Runner — cream-skinned chibi boy, oversized head, dark-red knotted headband, cream martial-arts gi + belt, expression confused, head tilted, walks. [SCENE] lower blur band under the real gameplay, nothing over the gameplay. [STYLE] 2D flat cartoon, thick clean black outlines, flat fills, no gradients, cream #F5F5DC, red accents #FF0000/#8B0000. [TEXT] '?'. | Medium, locked, centered in the band | curiosity gap |
| 0:03-0:07 | [CHARACTER] The Runner — cream-skinned chibi boy, oversized head, dark-red knotted headband, cream martial-arts gi + belt, expression neutral, focused, walks. [SCENE] lower blur band under the real gameplay, nothing over the gameplay. [STYLE] 2D flat cartoon, thick clean black outlines, flat fills, no gradients, cream #F5F5DC, red accents #FF0000/#8B0000. [TEXT] none. | Medium, locked, centered in the band | context |
| 0:07-0:10 | [CHARACTER] The Runner — cream-skinned chibi boy, oversized head, dark-red knotted headband, cream martial-arts gi + belt, expression neutral, focused, walks. [SCENE] lower blur band under the real gameplay, nothing over the gameplay. [STYLE] 2D flat cartoon, thick clean black outlines, flat fills, no gradients, cream #F5F5DC, red accents #FF0000/#8B0000. [TEXT] none. | Medium, locked, centered in the band | context |
| 0:10-0:16 | [CHARACTER] The Runner — cream-skinned chibi boy, oversized head, dark-red knotted headband, cream martial-arts gi + belt, expression shocked, wide eyes, nervous, sweat drops, shakes (startled). [SCENE] lower blur band under the real gameplay, nothing over the gameplay. [STYLE] 2D flat cartoon, thick clean black outlines, flat fills, no gradients, cream #F5F5DC, red accents #FF0000/#8B0000. [TEXT] '!!' marks, sweat drops. | Medium, locked, centered in the band | shock |
| 0:16-0:21 | [CHARACTER] The Runner — cream-skinned chibi boy, oversized head, dark-red knotted headband, cream martial-arts gi + belt, expression confused, head tilted, walks. [SCENE] lower blur band under the real gameplay, nothing over the gameplay. [STYLE] 2D flat cartoon, thick clean black outlines, flat fills, no gradients, cream #F5F5DC, red accents #FF0000/#8B0000. [TEXT] '?'. | Medium, locked, centered in the band | curiosity gap |
| 0:21-0:25 | [CHARACTER] The Runner — cream-skinned chibi boy, oversized head, dark-red knotted headband, cream martial-arts gi + belt, expression happy, soft smile, jumps. [SCENE] lower blur band under the real gameplay, nothing over the gameplay. [STYLE] 2D flat cartoon, thick clean black outlines, flat fills, no gradients, cream #F5F5DC, red accents #FF0000/#8B0000. [TEXT] love bubbles (hearts). | Medium, locked, centered in the band | relief / reward |

Note: reactions use your walk cycle plus body motion and effect marks (sweat, '!!', '?', hearts, dizzy stars, breath puff, bubbles) in the style of the storyboard sheets. The character is never redrawn.

## 5. Titles (30-40 characters)

| | Title | Chars |
|---|---|---:|
| **Primary** | GTA 6: Tommy's Mansion Too Early? | 33 |
| Alt 1 | What If You Visit Vercetti Early? | 33 |
| Alt 2 | Riding To Tommy's Mansion In GTA 6 | 34 |

The title never claims more than the video shows.

## 6. Thumbnail text (2 words)

1. **NOT INVITED** (recommended) · 2. LOCKED GATE · 3. WHO'S HOME?

Pattern rule (`thumbnail-hooks`): Mystery/label text → **T3** primary, **T6** alternate. Rules (CLAUDE.md): relevant to this story, 70 words or fewer, curiosity + dopamine hook, exactly 2 words of hook text that complete the title. The Runner is the only person in frame. **Logo override (2026-11-20, your decision):** the official colorful GTA VI logo is added small as a topic label. Attach the original image when generating; never redraw it.

| Concept | Pattern | Prompt (paste-ready) | Why it hooks |
|---|---|---|---|
| 1 | T3 hidden-truth reveal | `16:9 thumbnail, 2D flat cartoon, thick black outlines, black background, cream + red. The Runner (chibi, red headband), suspicious, holding a flashlight. Black driveway; his beam lights only an iron gate and a faint mansion behind it. Text "NOT INVITED" huge cream, top-right on two lines. Small attached official GTA VI logo, unmodified, bottom-right. Eye-magnet: the lit gate.` | The beam says you were not meant to reach this yet. |
| 2 | T5 locked door / forbidden object | `16:9 thumbnail, 2D flat cartoon, thick black outlines, black background, cream + red. The Runner (chibi, red headband), curious, one eye at the gap. A chained iron gate, one glowing gap showing a mansion door, a small red tag blinking on the lock. Text "NOT INVITED" huge cream, top-left. Small attached official GTA VI logo, unmodified, top-right. Eye-magnet: the glowing gap.` | A forbidden gate with one glowing gap, and the clip's crime notice on the lock. |
| 3 | T6 anomaly pointer | `16:9 thumbnail, 2D flat cartoon, thick black outlines, black background, cream + red. The Runner (chibi, red headband), confused, looking away. Flat palm-lined road. One wrong detail: a tiny bike rider circled red, heading to a huge mansion silhouette. Text "NOT INVITED" huge cream, top-left. Small attached official GTA VI logo, unmodified, top-right. Eye-magnet: the circled rider.` | A circled rider heading somewhere he should not: a curiosity gap. |

**Recommended:** concept 1 (T3 hidden-truth reveal). The text completes the title and does not repeat it.

## 7. Metadata package

**Description** (Short under 60s: no chapter block, AGENTS.md rule 10):

```
Riding to Tommy Vercetti's mansion early in GTA 6: the gatehouse, a crime notice and the front door.
Real gameplay of the Vercetti Estate, with a character reacting along the way.

Source: LunarGaming, "GTA 6 - What Happens If You Go To The Vercetti Estate Early"
https://www.youtube.com/watch?v=TPF8W1_mk7I
Clip: 0:07-0:32 (25s) of 1:44, with commentary captions and character animation by The Untold Exit.
License: Creative Commons Attribution (YouTube CC BY).

THE UNTOLD EXIT: Look Beyond What Seems Obvious.

#gta6 #vicecity #shorts #gtavi #tommyvercetti
```

**Hashtags (5, measured in the top 25 Shorts):** `#gta6 #vicecity #shorts #gtavi #tommyvercetti`

**Keywords / tags (16):** gta 6 vercetti estate, gta 6 vercetti mansion, tommy vercetti gta 6, vercetti estate early, gta 6 vs vice city, gta 6 vice city, gta 6 gameplay, gta 6 shorts, gta 6 secrets, gta 6 leonida, gta 6 details, gta 6 exploration, grand theft auto 6, grand theft auto vi, gta vi, gta 6

No other creators' names, no "official", "leaked" or "early access" wording.

**Flags:** `madeForKids` = **No** (confirm in Studio). Playlist: GTA 6 Secrets (`PLRXf1uVlif1Q`). Schedule (not scheduled): private + `publishAt` 20:00 UTC, one Short per day, after your yes.

## 8. Policy check log

This is a manual check against YouTube's policies.

| Check | Result |
|---|---|
| Title and thumbnail match the content | PASS. The titles describe what is shown |
| Permission / license | PASS with note. Verified Creative Commons by API. The CC label is set by the uploader and does not clear third-party content |
| Logos, ads, key art in frame | The GTA HUD and any in-game brands are part of the footage. No Rockstar key art or trailer footage is used |
| Credit and source link | PASS. In the description |
| Transformative | PASS. Own hook, captions, character animation. Under 35% of the source video used |
| Chapters | Not applicable (under 60s) |
| Human approval | Required before any upload |

**Open items:**
- Caption timing fixed 2026-11-20 against source frames: gatehouse at 2.5-5.2s, "Crime reported" at 10.8-15.5s (notice appears at about 0:11).
- Game audio kept. It was not checked for licensed music.
- License: CC BY set by the uploader. It does not clear third-party content inside the footage.
