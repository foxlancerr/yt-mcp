# Story Package: "GTA 6 Phone While Driving Crash" (GTA 6 Short, 15s)

Pillar **P3** (GTA 6 gameplay moments). Rendered video: `yt/gta6-clips/clips/vandal-5-details/final.mp4` (1080x1920, 30fps).
**Skills run (one story at a time, per CLAUDE.md):** `story-pipeline` (stages 1-7), `video-ideation` (topic fit), `script-breakdown` (beats), `visual-style` (The Runner + palette), `title-formulas` (titles), `thumbnail-hooks` (prompts + 2-word hook text). TubeLab MCP is not connected, so evidence comes from the official Data API scripts (AGENTS.md §4.7).
Pattern: the **60s Short re-hook pattern** from `yt/story/4-regrets-gta6-first-10-minutes` plus the **capture-matrix rule** from `yt/story/lucia-vs-cops-opening` (real footage intact, our layer is animation and commentary).

## 1. Research summary

- **Source video:** [5 DETALLES ALUCINANTES de GTA 6](https://www.youtube.com/watch?v=dSUN8AgrRso) · Vandal (3.43M subscribers) · 2026-11-18
- **Numbers (API, 2026-11-20):** 1,047,801 views · 68.4K likes · 420 comments · 0:57 · Spanish voiceover · 0.3x its subscribers
- **License:** YouTube Creative Commons (`status.license=creativeCommon`, verified by API 2026-11-20). Credit in the caption text.
- **Window used:** 0:18.6-0:33.8 (15.2s) of 0:57
- **Voice and captions:** Vandal's Spanish voiceover is kept. English captions are our own machine translation of the voiceover, matching the source's own description.
- **Topic wave:** driving and "details" are GTA 6's biggest Shorts lanes. `tag-scan` "gta 6 phone driving": GAGA Gaming "Driving Looks So Good" 355K, RoddyGames "Car Physics Are Completely Different" 121K, DarkViperAU Clips "Completely Reinvented Driving" 74K.
- **Source:** Vandal, 1.05M views and 68.4K likes (6.5% like rate), the strongest licensed GTA 6 clip we found. Description: the phone camera blocks the view and you crash like in real life; you can hold hands and hug.
- **Gap we exploit:** no top Short covers the phone-while-driving mechanic. We pair it with the hug as a comedy-then-sweet arc.
- **Tags in the top 25 Shorts:** gta 6 (8), gta vi (8), gta 6 gameplay (6), gta 6 driving (2). **Hashtags:** #gta6 (26), #gaming (13), #shorts (12), #gtavi (8), #gta (7).

## 2. Script (beat structure)

This Short has no new narration. The beats come from the source footage; our layer is the hook, captions and The Runner.

| Out time | Beat | What it does |
|---|---|---|
| 0:00-0:03 | Hook | "PHONE WHILE DRIVING IN GTA 6" over a truck |
| 0:03-0:05 | Promise / context | The phone camera covers the view |
| 0:05-0:07 | Open loop / stakes | So he crashes, like real life |
| 0:07-0:13 | Mini-payoff | A couple holds hands and walks through the city |
| 0:13-0:15 | Payoff / loop | A hug, and The Runner lets out a breath |

## 3. Storyboard grid (9:16, 1080x1920)

Layout: a blurred copy of the gameplay fills the frame; the real gameplay stays intact in the middle; hook text in the top blur; captions under the gameplay; **The Runner and his effects appear only in the lower blur band.** Timings match the render (`tools/render_shorts.py`).

| Time/Scene | Narration reference | Visual action and continuity | Camera/graphics | Sound |
|---|---|---|---|---|
| S0 · 0:00-0:03 Hook | Hook text | A pickup truck drives down a street, then the in-game phone fills the screen. | Hook text "PHONE WHILE DRIVING / IN GTA 6" in the top blur, cream + red | Source voiceover (Spanish) |
| S1 · 0:00-0:02 | "He pulls out his phone while driving" | A pickup truck drives down a street, then the in-game phone fills the screen. Runner walks + '?'. | Real gameplay intact; caption under it | Source voiceover (Spanish) |
| S2 · 0:02-0:05 | "the camera focuses on it" | The phone covers the windshield. Runner shivers + sweat drops, '!!' marks. | Real gameplay intact; caption under it | Source voiceover (Spanish) |
| S3 · 0:05-0:07 | "so he crashes, like real life" | A truck at an intersection while the voiceover describes the crash. Runner shakes (startled) + '!!' marks, red anger marks. | Real gameplay intact; caption under it | Source voiceover (Spanish) |
| S4 · 0:07-0:09 | "You can hold hands" | A couple seen from behind holds hands on the beach. Runner dances + love bubbles (hearts). | Real gameplay intact; caption under it | Source voiceover (Spanish) |
| S5 · 0:09-0:12 | "walking together through the city" | The couple walks hand in hand down a neon-lit street at night. Runner dances + love bubbles (hearts). | Real gameplay intact; caption under it | Source voiceover (Spanish) |
| S6 · 0:12-0:15 | "and a mechanic lets you hug" | The pair embrace on the beach; later a hug beside a red car. Runner bounces + love bubbles (hearts); walks + breath-release puff. | Real gameplay intact; caption under it | Source voiceover (Spanish) |

**Continuity rule:** the hook's question is paid off in the last beat. Never trim the hook or the last 3 seconds.

## 4. Visual prompt timeline (The Runner · `visual-style` · bottom blur band)

| Time | Prompt (full text) | Camera direction | Dopamine beat type |
|---|---|---|---|
| 0:00-0:02 | [CHARACTER] The Runner — cream-skinned chibi boy, oversized head, dark-red knotted headband, cream martial-arts gi + belt, expression confused, head tilted, walks. [SCENE] lower blur band under the real gameplay, nothing over the gameplay. [STYLE] 2D flat cartoon, thick clean black outlines, flat fills, no gradients, cream #F5F5DC, red accents #FF0000/#8B0000. [TEXT] '?'. | Medium, locked, centered in the band | curiosity gap |
| 0:02-0:05 | [CHARACTER] The Runner — cream-skinned chibi boy, oversized head, dark-red knotted headband, cream martial-arts gi + belt, expression nervous, sweat drops, shocked, wide eyes, shivers. [SCENE] lower blur band under the real gameplay, nothing over the gameplay. [STYLE] 2D flat cartoon, thick clean black outlines, flat fills, no gradients, cream #F5F5DC, red accents #FF0000/#8B0000. [TEXT] sweat drops, '!!' marks. | Medium, locked, centered in the band | curiosity gap |
| 0:05-0:07 | [CHARACTER] The Runner — cream-skinned chibi boy, oversized head, dark-red knotted headband, cream martial-arts gi + belt, expression shocked, wide eyes, determined, red anger marks on the headband, shakes (startled). [SCENE] lower blur band under the real gameplay, nothing over the gameplay. [STYLE] 2D flat cartoon, thick clean black outlines, flat fills, no gradients, cream #F5F5DC, red accents #FF0000/#8B0000. [TEXT] '!!' marks, red anger marks. | Medium, locked, centered in the band | shock |
| 0:07-0:12 | [CHARACTER] The Runner — cream-skinned chibi boy, oversized head, dark-red knotted headband, cream martial-arts gi + belt, expression happy, soft smile, dances. [SCENE] lower blur band under the real gameplay, nothing over the gameplay. [STYLE] 2D flat cartoon, thick clean black outlines, flat fills, no gradients, cream #F5F5DC, red accents #FF0000/#8B0000. [TEXT] love bubbles (hearts). | Medium, locked, centered in the band | relief / reward |
| 0:12-0:14 | [CHARACTER] The Runner — cream-skinned chibi boy, oversized head, dark-red knotted headband, cream martial-arts gi + belt, expression happy, soft smile, bounces. [SCENE] lower blur band under the real gameplay, nothing over the gameplay. [STYLE] 2D flat cartoon, thick clean black outlines, flat fills, no gradients, cream #F5F5DC, red accents #FF0000/#8B0000. [TEXT] love bubbles (hearts). | Medium, locked, centered in the band | relief / reward |
| 0:14-0:15 | [CHARACTER] The Runner — cream-skinned chibi boy, oversized head, dark-red knotted headband, cream martial-arts gi + belt, expression relieved, exhaling, walks. [SCENE] lower blur band under the real gameplay, nothing over the gameplay. [STYLE] 2D flat cartoon, thick clean black outlines, flat fills, no gradients, cream #F5F5DC, red accents #FF0000/#8B0000. [TEXT] breath-release puff. | Medium, locked, centered in the band | payoff |

Note: reactions use your walk cycle plus body motion and effect marks (sweat, '!!', '?', hearts, dizzy stars, breath puff, bubbles) in the style of the storyboard sheets. The character is never redrawn.

## 5. Titles (30-40 characters)

| | Title | Chars |
|---|---|---:|
| **Primary** | GTA 6 Phone While Driving Crash | 31 |
| Alt 1 | Using A Phone While Driving In GTA 6 | 36 |
| Alt 2 | GTA 6 Phone Mechanic Is Too Real | 32 |

The title never claims more than the video shows.

## 6. Thumbnail text (2 words)

1. **PHONE TRAP** (recommended) · 2. EYES UP · 3. PHONE CRASH

Pattern rule (`thumbnail-hooks`): Mystery/label text → **T3** primary, **T6** alternate. Rules (CLAUDE.md): relevant to this story, 70 words or fewer, curiosity + dopamine hook, exactly 2 words of hook text that complete the title. The Runner is the only person in frame. **Logo override (2026-11-20, your decision):** the official colorful GTA VI logo is added small as a topic label. Attach the original image when generating; never redraw it.

| Concept | Pattern | Prompt (paste-ready) | Why it hooks |
|---|---|---|---|
| 1 | T3 hidden-truth reveal | `16:9 thumbnail, 2D flat cartoon, thick black outlines, black background, cream + red. The Runner (chibi, red headband), wary, holding a flashlight. Pitch-black road; his beam lights a glowing phone floating where the windshield should be, a red crack across it. Text "PHONE TRAP" huge cream, top-right. Small attached official GTA VI logo, unmodified, bottom-right. Eye-magnet: the cracked phone.` | The lit phone says the danger is on the screen, not the road. |
| 2 | T2 shock-face + threat | `16:9 thumbnail, 2D flat cartoon, thick black outlines, black background, cream + red. The Runner (chibi, red headband), shocked, wide eyes. Close-up left. Right: a giant cracked phone fills a windshield, truck rear lights glowing beyond. Text "PHONE TRAP" huge cream, top-right on two lines. Small attached official GTA VI logo, unmodified, bottom-left. Eye-magnet: the looming phone.` | His face is the reaction; the phone is the threat. |
| 3 | T4 versus split | `16:9 thumbnail, 2D flat cartoon, thick black outlines, black background, cream + red. The Runner (chibi, red headband), determined, pointing. Diagonal split: left a red-lit road, right a green-lit phone; he stands on the fault line pointing at the phone. Text "PHONE TRAP" huge cream, across the top. Small attached official GTA VI logo, unmodified, top-left. Eye-magnet: the diagonal split.` | A clear versus: the road or the phone. |

**Recommended:** concept 1 (T3 hidden-truth reveal). The text completes the title and does not repeat it.

## 7. Metadata package

**Description** (Short under 60s: no chapter block, AGENTS.md rule 10):

```
What happens if you use your phone while driving in GTA 6? The camera covers the view and he crashes. Then a hug.
Real gameplay with Spanish voiceover and English captions, plus a character reacting.

Source: Vandal, "5 DETALLES ALUCINANTES de GTA 6"
https://www.youtube.com/watch?v=dSUN8AgrRso
Clip: 0:18.6-0:33.8 (15.2s) of 0:57, with commentary captions and character animation by The Untold Exit.
License: Creative Commons Attribution (YouTube CC BY).

THE UNTOLD EXIT: Look Beyond What Seems Obvious.

#gta6 #gaming #shorts #gtavi #gta
```

**Hashtags (5, measured in the top 25 Shorts):** `#gta6 #gaming #shorts #gtavi #gta`

**Keywords / tags (16):** gta 6 phone while driving, gta 6 phone, gta 6 phone crash, gta 6 hug, gta 6 hold hands, gta 6 driving, gta 6 details, gta 6 gameplay, gta 6 shorts, gta 6 secrets, gta 6 vice city, gta 6 leonida, grand theft auto 6, grand theft auto vi, gta vi, gta 6

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
- English captions are our own machine translation of the Spanish voiceover. I did not view the crash frame itself, only the frames around it.
- The source has Vandal's burned-in Spanish captions in the middle of the frame. They are visible in this Short.
- License: CC BY set by the uploader. Game audio and Vandal's voiceover are used as in the source.
