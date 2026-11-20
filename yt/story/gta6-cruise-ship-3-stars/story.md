# Story Package: "3 Stars On A GTA 6 Cruise Ship" (GTA 6 Short, 30s)

Pillar **P3** (GTA 6 gameplay moments). Rendered video: `yt/gta6-clips/clips/lunar-cruise-ship/final.mp4` (1080x1920, 30fps).
**Skills run (one story at a time, per CLAUDE.md):** `story-pipeline` (stages 1-7), `video-ideation` (topic fit), `script-breakdown` (beats), `visual-style` (The Runner + palette), `title-formulas` (titles), `thumbnail-hooks` (prompts + 2-word hook text). TubeLab MCP is not connected, so evidence comes from the official Data API scripts (AGENTS.md §4.7).
Pattern: the **60s Short re-hook pattern** from `yt/story/4-regrets-gta6-first-10-minutes` plus the **capture-matrix rule** from `yt/story/lucia-vs-cops-opening` (real footage intact, our layer is animation and commentary).

## 1. Research summary

- **Source video:** [GTA 6 - What Happens If You Go On The Cruise Ship](https://www.youtube.com/watch?v=OnWC__OxyTk) · LunarGaming (266K subscribers) · 2026-11-18
- **Numbers (API, 2026-11-20):** 138,728 views · 509 likes · 70 comments · 4:05 · English · 0.5x its subscribers
- **License:** YouTube Creative Commons (`status.license=creativeCommon`, verified by API 2026-11-20). Credit in the caption text.
- **Window used:** 2:54-3:24 (30s) of 4:05
- **Voice and captions:** No voiceover. In-game audio only. Captions are our own commentary describing the screen.
- **Topic wave:** the cruise ship is a live GTA 6 search topic. `tag-scan` top Shorts of the last 5 days: Wynnsanity live 625K, La Línea Alterna 48.6K, sandershorts "Inside The Cruise Ship in GTA 6" 5.7K, GTA6 Insider "WE SNEAKED ONTO A CRUISE SHIP" 3.7K.
- **Source:** LunarGaming, 138.7K views, 0.5x its 266K subscribers. Description: armed security and police attack when you board, and you can try to steal a helicopter.
- **Gap we exploit:** the other cruise-ship Shorts are exploring or sneaking. Ours is the action beat: 3 wanted stars, a guard fight at the railing, a rifle.
- **Tags in the top 25 Shorts:** gta 6 (14), gta vi (12), gta 6 gameplay (8), gta 6 vice city (6), gta 6 cruise ship (4). **Hashtags:** #gta6 (30), #shorts (16), #gtavi (15), #gaming (12), #vicecity (9).

## 2. Script (beat structure)

This Short has no new narration. The beats come from the source footage; our layer is the hook, captions and The Runner.

| Out time | Beat | What it does |
|---|---|---|
| 0:00-0:03 | Hook | "3 STARS ON A CRUISE SHIP" over a chase already in progress |
| 0:03-0:10 | Promise / context | Running across the open deck |
| 0:10-0:15 | Open loop | Security closes in; the screen flashes red |
| 0:15-0:20 | Stakes | A struggle at the railing |
| 0:20-0:26 | Payoff 1 | Rifle up, he fights back |
| 0:26-0:30 | Re-hook / loop | Still moving, still 3 stars: the chase never ends |

## 3. Storyboard grid (9:16, 1080x1920)

Layout: a blurred copy of the gameplay fills the frame; the real gameplay stays intact in the middle; hook text in the top blur; captions under the gameplay; **The Runner and his effects appear only in the lower blur band.** Timings match the render (`tools/render_shorts.py`).

| Time/Scene | Narration reference | Visual action and continuity | Camera/graphics | Sound |
|---|---|---|---|---|
| S0 · 0:00-0:03 Hook | Hook text | Running up the stairs and along the deck. 3 wanted stars top right. | Hook text "3 STARS ON / A CRUISE SHIP" in the top blur, cream + red | Source audio (game) |
| S1 · 0:00-0:03 | "Already at 3 stars. Running." | Running up the stairs and along the deck. 3 wanted stars top right. Runner walks + '!!' marks; walks + sweat drops. | Real gameplay intact; caption under it | Source audio (game) |
| S2 · 0:04-0:10 | "Across the open deck" | Open deck, glass wall, harbor skyline. Same 3 stars. Runner walks + sweat drops. | Real gameplay intact; caption under it | Source audio (game) |
| S3 · 0:10-0:14 | "Security closes in" | A guard in a white uniform appears on the left. The screen flashes red. Runner shakes (startled) + '!!' marks, sweat drops. | Real gameplay intact; caption under it | Source audio (game) |
| S4 · 0:14-0:19 | "A struggle at the railing" | He grapples with the guard at the deck railing. Runner shivers + sweat drops, red anger marks; bounces + red anger marks. | Real gameplay intact; caption under it | Source audio (game) |
| S5 · 0:19-0:26 | "Rifle up, he fights back" | Rifle raised, blood on the deck, ammo counter on screen. Runner bounces + red anger marks. | Real gameplay intact; caption under it | Source audio (game) |
| S6 · 0:26-0:30 | "Still moving. Still 3 stars." | Upper deck running track. Still 3 stars. Runner walks + breath-release puff, sweat drops. | Real gameplay intact; caption under it | Source audio (game) |

**Continuity rule:** the hook's question is paid off in the last beat. Never trim the hook or the last 3 seconds.

## 4. Visual prompt timeline (The Runner · `visual-style` · bottom blur band)

| Time | Prompt (full text) | Camera direction | Dopamine beat type |
|---|---|---|---|
| 0:00-0:03 | [CHARACTER] The Runner — cream-skinned chibi boy, oversized head, dark-red knotted headband, cream martial-arts gi + belt, expression shocked, wide eyes, walks. [SCENE] lower blur band under the real gameplay, nothing over the gameplay. [STYLE] 2D flat cartoon, thick clean black outlines, flat fills, no gradients, cream #F5F5DC, red accents #FF0000/#8B0000. [TEXT] '!!' marks. | Medium, locked, centered in the band | shock |
| 0:03-0:10 | [CHARACTER] The Runner — cream-skinned chibi boy, oversized head, dark-red knotted headband, cream martial-arts gi + belt, expression nervous, sweat drops, walks. [SCENE] lower blur band under the real gameplay, nothing over the gameplay. [STYLE] 2D flat cartoon, thick clean black outlines, flat fills, no gradients, cream #F5F5DC, red accents #FF0000/#8B0000. [TEXT] sweat drops. | Medium, locked, centered in the band | curiosity gap |
| 0:10-0:14 | [CHARACTER] The Runner — cream-skinned chibi boy, oversized head, dark-red knotted headband, cream martial-arts gi + belt, expression shocked, wide eyes, nervous, sweat drops, shakes (startled). [SCENE] lower blur band under the real gameplay, nothing over the gameplay. [STYLE] 2D flat cartoon, thick clean black outlines, flat fills, no gradients, cream #F5F5DC, red accents #FF0000/#8B0000. [TEXT] '!!' marks, sweat drops. | Medium, locked, centered in the band | shock |
| 0:14-0:19 | [CHARACTER] The Runner — cream-skinned chibi boy, oversized head, dark-red knotted headband, cream martial-arts gi + belt, expression nervous, sweat drops, determined, red anger marks on the headband, shivers. [SCENE] lower blur band under the real gameplay, nothing over the gameplay. [STYLE] 2D flat cartoon, thick clean black outlines, flat fills, no gradients, cream #F5F5DC, red accents #FF0000/#8B0000. [TEXT] sweat drops, red anger marks. | Medium, locked, centered in the band | curiosity gap |
| 0:19-0:26 | [CHARACTER] The Runner — cream-skinned chibi boy, oversized head, dark-red knotted headband, cream martial-arts gi + belt, expression determined, red anger marks on the headband, bounces. [SCENE] lower blur band under the real gameplay, nothing over the gameplay. [STYLE] 2D flat cartoon, thick clean black outlines, flat fills, no gradients, cream #F5F5DC, red accents #FF0000/#8B0000. [TEXT] red anger marks. | Medium, locked, centered in the band | stakes |
| 0:26-0:30 | [CHARACTER] The Runner — cream-skinned chibi boy, oversized head, dark-red knotted headband, cream martial-arts gi + belt, expression relieved, exhaling, nervous, sweat drops, walks. [SCENE] lower blur band under the real gameplay, nothing over the gameplay. [STYLE] 2D flat cartoon, thick clean black outlines, flat fills, no gradients, cream #F5F5DC, red accents #FF0000/#8B0000. [TEXT] breath-release puff, sweat drops. | Medium, locked, centered in the band | payoff |

Note: reactions use your walk cycle plus body motion and effect marks (sweat, '!!', '?', hearts, dizzy stars, breath puff, bubbles) in the style of the storyboard sheets. The character is never redrawn.

## 5. Titles (30-40 characters)

| | Title | Chars |
|---|---|---:|
| **Primary** | 3 Stars On A GTA 6 Cruise Ship | 30 |
| Alt 1 | GTA 6 Cruise Ship Fight Gets Wild | 33 |
| Alt 2 | Trying To Board A GTA 6 Cruise Ship | 35 |

The title never claims more than the video shows.

## 6. Thumbnail text (2 words)

1. **DON'T BOARD** (recommended) · 2. SHIP FIGHT · 3. WHO'S ABOARD?

Pattern rule (`thumbnail-hooks`): Command text → **T2** primary, **T6** alternate. Rules (CLAUDE.md): relevant to this story, 70 words or fewer, curiosity + dopamine hook, exactly 2 words of hook text that complete the title. The Runner is the only person in frame. **Logo override (2026-11-20, your decision):** the official colorful GTA VI logo is added small as a topic label. Attach the original image when generating; never redraw it.

| Concept | Pattern | Prompt (paste-ready) | Why it hooks |
|---|---|---|---|
| 1 | T2 shock-face + threat | `16:9 thumbnail, 2D flat cartoon, thick black outlines, black background, cream + red. The Runner (chibi, red headband), shocked, red marks. Close-up left. Right: a black cruise ship at night, three red wanted stars blazing above it. Text "DON'T BOARD" huge cream, top-right on two lines. Small attached official GTA VI logo, unmodified, bottom-right. Eye-magnet: the three red stars.` | His shock plus three burning stars asks what happened to him aboard. |
| 2 | T6 anomaly pointer | `16:9 thumbnail, 2D flat cartoon, thick black outlines, black background, cream + red. The Runner (chibi, red headband), curious, looking away. Flat ship deck. One wrong detail: a rifle silhouette at the far railing, circled red with an arrow. Text "DON'T BOARD" huge cream, top-left. Small attached official GTA VI logo, unmodified, top-right. Eye-magnet: the circled rifle.` | One circled wrong detail while he looks away: viewers must find it. |
| 3 | T3 hidden-truth reveal | `16:9 thumbnail, 2D flat cartoon, thick black outlines, black background, cream + red. The Runner (chibi, red headband), wary, holding a flashlight. Pitch-black deck; his beam lights one guard silhouette gripping a railing, three red stars above. Text "DON'T BOARD" huge cream, top-right. Small attached official GTA VI logo, unmodified, bottom-right. Eye-magnet: the lit guard.` | The beam says one thing aboard is worth the risk. |

**Recommended:** concept 1 (T2 shock-face + threat). The text completes the title and does not repeat it.

## 7. Metadata package

**Description** (Short under 60s: no chapter block, AGENTS.md rule 10):

```
3 wanted stars on a GTA 6 cruise ship: a chase along the deck, a guard at the railing and a rifle.
Real gameplay from the GTA 6 cruise ship, with a character reacting to every beat.

Source: LunarGaming, "GTA 6 - What Happens If You Go On The Cruise Ship"
https://www.youtube.com/watch?v=OnWC__OxyTk
Clip: 2:54-3:24 (30s) of 4:05, with commentary captions and character animation by The Untold Exit.
License: Creative Commons Attribution (YouTube CC BY).

THE UNTOLD EXIT: Look Beyond What Seems Obvious.

#gta6 #shorts #gtavi #gaming #vicecity
```

**Hashtags (5, measured in the top 25 Shorts):** `#gta6 #shorts #gtavi #gaming #vicecity`

**Keywords / tags (16):** gta 6 cruise ship, gta 6 cruise ship fight, gta 6 wanted stars, gta 6 wanted level, gta 6 gameplay, gta 6 exploration, gta 6 vice city, gta 6 shorts, gta 6 secrets, gta 6 leonida, gta 6 details, gta 6 chase, grand theft auto 6, grand theft auto vi, gta vi, gta 6

No other creators' names, no "official", "leaked" or "early access" wording.

**Flags:** `madeForKids` = **No** (confirm in Studio). Playlist: GTA 6 Secrets (`PLRXf1uVlif1Q`). Schedule (not scheduled): private + `publishAt` 20:00 UTC, one Short per day, after your yes.

## 8. Policy check log

The `policy-guard` skill is deleted, so this is a manual check. It is not the skill.

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
- Caption fixed 2026-11-20: now reads "Security closes in" (source: armed security and police). Re-checked frames after the re-render.
- Game audio kept. It was not checked for licensed music.
- License: CC BY set by the uploader. It does not clear third-party content inside the footage.
