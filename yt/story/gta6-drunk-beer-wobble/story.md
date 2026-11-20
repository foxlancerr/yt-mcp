# Story Package: "What If You Drink Too Much In GTA 6?" (GTA 6 Short, 15s)

Pillar **P3** (GTA 6 gameplay moments). Rendered video: `yt/gta6-clips/clips/vandal-beer-drunk/final.mp4` (1080x1920, 30fps).
**Skills run (one story at a time, per CLAUDE.md):** `story-pipeline` (stages 1-7), `video-ideation` (topic fit), `script-breakdown` (beats), `visual-style` (The Runner + palette), `title-formulas` (titles), `thumbnail-hooks` (prompts + 2-word hook text). TubeLab MCP is not connected, so evidence comes from the official Data API scripts (AGENTS.md §4.7).
Pattern: the **60s Short re-hook pattern** from `yt/story/4-regrets-gta6-first-10-minutes` plus the **capture-matrix rule** from `yt/story/lucia-vs-cops-opening` (real footage intact, our layer is animation and commentary).

## 1. Research summary

- **Source video:** [¿Qué PASA si BEBES demasiada CERVEZA en GTA 6?](https://www.youtube.com/watch?v=8IyAE72VaXQ) · Vandal (3.43M subscribers) · 2026-11-19
- **Numbers (API, 2026-11-20):** 227,176 views · 13.8K likes · 83 comments · 0:35 · Spanish voiceover · 0.1x its subscribers
- **License:** YouTube Creative Commons (`status.license=creativeCommon`, verified by API 2026-11-20). Credit in the caption text.
- **Window used:** 0:12.2-0:27.4 (15.2s) of 0:35
- **Voice and captions:** Vandal's Spanish voiceover is kept. English captions are our own machine translation of the voiceover, matching the source's own description.
- **Topic wave:** the beer question is a proven GTA 6 Shorts formula. `tag-scan`: Vandal 227K, Project Jason "WHAT HAPPENS IF YOU DRINK TOO MUCH BEER IN GTA 6?" 116K, TimTheTatman "HOW MANY BEERS CAN YOU DRINK IN GTA 6?" 101K, averagePCgames "GTA 6 Drunk Physics Are INSANE" 17.5K.
- **Source:** Vandal, 227K views and 13.8K likes (6% like rate), 0.1x its 3.43M subscribers. Description: infinite beer at Jason's house, the screen blurs with a color filter, the camera moves, and he falls over ridiculously.
- **Gap we exploit:** most clips show the drinking. Ours is the physics payoff: wobble, then the fall, then the laugh.
- **Tags in the top 25 Shorts:** gta 6 (11), gta vi (10), gta 6 beer (5), gta 6 jason (3), gta 6 drunk (2). **Hashtags:** #gta6 (31), #shorts (19), #gtavi (16), #gta6gameplay (7), #gta6details (4).

## 2. Script (beat structure)

This Short has no new narration. The beats come from the source footage; our layer is the hook, captions and The Runner.

| Out time | Beat | What it does |
|---|---|---|
| 0:00-0:03 | Hook | "TOO MANY BEERS IN GTA 6?" over Jason drinking |
| 0:03-0:07 | Promise / context | You stop earning focus; the screen blurs |
| 0:07-0:12 | Open loop | The camera moves; walking gets wobbly |
| 0:12-0:14 | Payoff | Jump, and he falls ridiculously |
| 0:14-0:15 | Loop | The Runner laughs: "HA HA!" |

## 3. Storyboard grid (9:16, 1080x1920)

Layout: a blurred copy of the gameplay fills the frame; the real gameplay stays intact in the middle; hook text in the top blur; captions under the gameplay; **The Runner and his effects appear only in the lower blur band.** Timings match the render (`tools/render_shorts.py`).

| Time/Scene | Narration reference | Visual action and continuity | Camera/graphics | Sound |
|---|---|---|---|---|
| S0 · 0:00-0:03 Hook | Hook text | Jason drinks from a glass in a green kitchen. | Hook text "TOO MANY BEERS / IN GTA 6?" in the top blur, cream + red | Source voiceover (Spanish) |
| S1 · 0:00-0:01 | "But as you keep drinking," | Jason drinks from a glass in a green kitchen. Runner walks + love bubbles (hearts). | Real gameplay intact; caption under it | Source voiceover (Spanish) |
| S2 · 0:01-0:03 | "you stop earning focus" | He drinks from a bottle at the fridge (a "NEVERA" prompt). Runner walks + love bubbles (hearts). | Real gameplay intact; caption under it | Source voiceover (Spanish) |
| S3 · 0:03-0:05 | "the screen starts to blur" | A rainbow color filter and blur take over the screen. Runner sways + dizzy stars. | Real gameplay intact; caption under it | Source voiceover (Spanish) |
| S4 · 0:05-0:06 | "with a color filter" | Heavy blur and chromatic distortion. Runner sways + dizzy stars. | Real gameplay intact; caption under it | Source voiceover (Spanish) |
| S5 · 0:07-0:08 | "and the camera starts moving" | The camera sways; he staggers outside. Runner sways + dizzy stars, sweat drops. | Real gameplay intact; caption under it | Source voiceover (Spanish) |
| S6 · 0:08-0:12 | "walking gets wobbly" | Stumbling along the road and jetty. Runner sways + dizzy stars, sweat drops. | Real gameplay intact; caption under it | Source voiceover (Spanish) |
| S7 · 0:12-0:15 | "jump, and he falls ridiculously" | A jump, then a flailing fall near the water. Runner trips and falls + sweat drops; laughs + 'HA HA!' bubble. | Real gameplay intact; caption under it | Source voiceover (Spanish) |

**Continuity rule:** the hook's question is paid off in the last beat. Never trim the hook or the last 3 seconds.

## 4. Visual prompt timeline (The Runner · `visual-style` · bottom blur band)

| Time | Prompt (full text) | Camera direction | Dopamine beat type |
|---|---|---|---|
| 0:00-0:03 | [CHARACTER] The Runner — cream-skinned chibi boy, oversized head, dark-red knotted headband, cream martial-arts gi + belt, expression happy, soft smile, walks. [SCENE] lower blur band under the real gameplay, nothing over the gameplay. [STYLE] 2D flat cartoon, thick clean black outlines, flat fills, no gradients, cream #F5F5DC, red accents #FF0000/#8B0000. [TEXT] love bubbles (hearts). | Medium, locked, centered in the band | relief / reward |
| 0:03-0:07 | [CHARACTER] The Runner — cream-skinned chibi boy, oversized head, dark-red knotted headband, cream martial-arts gi + belt, expression dizzy, swirling eyes, sways. [SCENE] lower blur band under the real gameplay, nothing over the gameplay. [STYLE] 2D flat cartoon, thick clean black outlines, flat fills, no gradients, cream #F5F5DC, red accents #FF0000/#8B0000. [TEXT] dizzy stars. | Medium, locked, centered in the band | shock |
| 0:07-0:12 | [CHARACTER] The Runner — cream-skinned chibi boy, oversized head, dark-red knotted headband, cream martial-arts gi + belt, expression dizzy, swirling eyes, nervous, sweat drops, sways. [SCENE] lower blur band under the real gameplay, nothing over the gameplay. [STYLE] 2D flat cartoon, thick clean black outlines, flat fills, no gradients, cream #F5F5DC, red accents #FF0000/#8B0000. [TEXT] dizzy stars, sweat drops. | Medium, locked, centered in the band | shock |
| 0:12-0:14 | [CHARACTER] The Runner — cream-skinned chibi boy, oversized head, dark-red knotted headband, cream martial-arts gi + belt, expression nervous, sweat drops, trips and falls. [SCENE] lower blur band under the real gameplay, nothing over the gameplay. [STYLE] 2D flat cartoon, thick clean black outlines, flat fills, no gradients, cream #F5F5DC, red accents #FF0000/#8B0000. [TEXT] sweat drops. | Medium, locked, centered in the band | curiosity gap |
| 0:14-0:15 | [CHARACTER] The Runner — cream-skinned chibi boy, oversized head, dark-red knotted headband, cream martial-arts gi + belt, expression laughing, eyes squeezed shut, laughs. [SCENE] lower blur band under the real gameplay, nothing over the gameplay. [STYLE] 2D flat cartoon, thick clean black outlines, flat fills, no gradients, cream #F5F5DC, red accents #FF0000/#8B0000. [TEXT] 'HA HA!' bubble. | Medium, locked, centered in the band | payoff |

Note: reactions use your walk cycle plus body motion and effect marks (sweat, '!!', '?', hearts, dizzy stars, breath puff, bubbles) in the style of the storyboard sheets. The character is never redrawn.

## 5. Titles (30-40 characters)

| | Title | Chars |
|---|---|---:|
| **Primary** | What If You Drink Too Much In GTA 6? | 36 |
| Alt 1 | Too Many Beers In GTA 6 Gets Wild | 33 |
| Alt 2 | GTA 6 Drunk Mode Is Pretty Hilarious | 36 |

The title never claims more than the video shows.

## 6. Thumbnail text (2 words)

1. **DRUNK MODE** (recommended) · 2. TOO MANY · 3. HE FELL

Pattern rule (`thumbnail-hooks`): Mystery/label text → **T3** primary, **T6** alternate. Rules (CLAUDE.md): relevant to this story, 70 words or fewer, curiosity + dopamine hook, exactly 2 words of hook text that complete the title. The Runner is the only person in frame. **Logo override (2026-11-20, your decision):** the official colorful GTA VI logo is added small as a topic label. Attach the original image when generating; never redraw it.

| Concept | Pattern | Prompt (paste-ready) | Why it hooks |
|---|---|---|---|
| 1 | T3 hidden-truth reveal | `16:9 thumbnail, 2D flat cartoon, thick black outlines, black background, cream + red. The Runner (chibi, red headband), dizzy, swirling eyes. Pitch black; a spotlight lights one glowing beer bottle while the world behind him tilts. Text "DRUNK MODE" huge cream, top, spanning the frame. Small attached official GTA VI logo, unmodified, bottom-right. Eye-magnet: the lit bottle.` | One glowing bottle and a tilting world: viewers want to see the fall. |
| 2 | T6 anomaly pointer | `16:9 thumbnail, 2D flat cartoon, thick black outlines, black background, cream + red. The Runner (chibi, red headband), dizzy, looking away. Flat jetty. One wrong detail: the horizon tilted, circled red with an arrow, a bottle at his feet. Text "DRUNK MODE" huge cream, top-left. Small attached official GTA VI logo, unmodified, top-right. Eye-magnet: the circled horizon.` | One circled wrong detail while he is the last to notice. |
| 3 | T2 shock-face + threat | `16:9 thumbnail, 2D flat cartoon, thick black outlines, black background, cream + red. The Runner (chibi, red headband), dizzy and shocked, red marks. Close-up left with dizzy stars. Right: a giant tilted beer bottle above a water splash. Text "DRUNK MODE" huge cream, top-right on two lines. Small attached official GTA VI logo, unmodified, bottom-left. Eye-magnet: the tilted bottle.` | His face is the reaction; the bottle and the splash promise the fall. |

**Recommended:** concept 1 (T3 hidden-truth reveal). The text completes the title and does not repeat it.

## 7. Metadata package

**Description** (Short under 60s: no chapter block, AGENTS.md rule 10):

```
What happens if you drink too much beer in GTA 6? The screen blurs, the camera moves and he falls over.
Real gameplay with Spanish voiceover and English captions, plus a character laughing along.

Source: Vandal, "¿Qué PASA si BEBES demasiada CERVEZA en GTA 6?"
https://www.youtube.com/watch?v=8IyAE72VaXQ
Clip: 0:12.2-0:27.4 (15.2s) of 0:35, with commentary captions and character animation by The Untold Exit.
License: Creative Commons Attribution (YouTube CC BY).

THE UNTOLD EXIT: Look Beyond What Seems Obvious.

#gta6 #shorts #gtavi #gaming #gta6details
```

**Hashtags (5, measured in the top 25 Shorts):** `#gta6 #shorts #gtavi #gaming #gta6details`

**Keywords / tags (15):** gta 6 beer, gta 6 drunk, gta 6 drinking, gta 6 jason, gta 6 drunk physics, what happens if you drink too much beer gta 6, gta 6 funny moments, gta 6 details, gta 6 gameplay, gta 6 shorts, gta 6 secrets, grand theft auto 6, grand theft auto vi, gta vi, gta 6

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
- English captions are our own machine translation of the Spanish voiceover (the last 3 seconds of the voiceover were too noisy to caption, so the clip stops at 0:27.4).
- The source has Vandal's burned-in Spanish captions in the middle of the frame. They are visible in this Short.
- License: CC BY set by the uploader. Game audio and Vandal's voiceover are used as in the source.
