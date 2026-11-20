# Story pipeline: "Is This Real Life... Or GTA 6?" (IShowSpeed GTA 6 Short)

Scope: stages 1, 2 (beat structure only), 3 (storyboard, updated 2026-11-20), 5, 6 and 7. No new script or visual prompts: the video already exists and its footage is real, so nothing is generated. The video:
`yt/gta6-clips/clips/ishowspeed-gta6/final_runner.mp4` (24.9s, 1080x1920, The Runner overlay).
Pillar: **P3** (GTA 6 mysteries), Short band under 60s. All data is from the YouTube Data API on 2026-11-20.

## 1. Research summary

- **Tools:** TubeLab MCP is not connected, so this uses `scripts/trend-scan.mjs "IShowSpeed GTA 6" 4` and `scripts/tag-scan.mjs "ishowspeed gta 6" 4` (AGENTS.md §4.7). Competitor snapshot skipped: not relevant to one Short.
- **Search wave:** 15 videos in 4 days, median 1.34M views. 11 of 15 are Shorts or under 90s. Short median is 1.13M views.
- **Top results:**
  - IShowSpeed live stream: 64.1M views.
  - IShowSpeed "PLAYING GTA 6 RIGHT NOW" Short: 18.1M.
  - **Our source, "iSHOWSPEED x GTA 6 | OFFICIAL TRAILER": 3.71M views, 67s, published 2026-11-16.**
  - "iShowSpeed's First Look At GTA 6" Short: 2.9M.
- **Small-channel outliers on the same topic:**
  - BOLAZON ID: 1.49M views at 10.8x its subscribers (23s).
  - BRUTUS CONTENT: 0.86M at 17.3x (42s).
  - Merti: 1.13M at 7.1x (38s).
  - The topic beats channel size.
- **Title shapes winning right now:**
  - "iShowSpeed's First Look At GTA 6"
  - "iShowSpeed Finds A HULK-LIKE MONSTER In GTA 6 😱"
  - "IShowSpeed Playing GTA 6 for the First Time 😭"
  - "GTA 6 Is Finally Here, But We Can't Play It" (6.7M, earlier scan)
- **Tags in the top 25 GTA 6 Shorts of the last 4 days:** ishowspeed (14), gta 6 (6), ishowspeed gta 6 (3), speed gta 6 (3), grand theft auto 6 (3), gta vi (3), ishowspeed funny moments (2), ishowspeed shorts (2).
- **Gap we exploit:** everyone covers his reaction. Nobody asks whether the footage is real life or the game. That is our mystery frame: "Look Beyond What Seems Obvious."
- **Quota used:** about 206 units today for these two scans.

## 2. Structure (beat taxonomy from `script-breakdown`)

Pattern used: the **60s Short re-hook pattern** from `yt/story/4-regrets-gta6-first-10-minutes` (a new beat or re-hook about every 5-10s, one planted question that pays off at the end), combined with the **capture-matrix rule** from `yt/story/lucia-vs-cops-opening` (real footage stays intact; our layer is animation and commentary only; licensed audio is muted).

| Out time | Beat | What it does |
|---|---|---|
| 0-3.4s | Hook | His own line, "Oh man, it's finally our GTA 6" + text "IT'S FINALLY HERE..." |
| 3.4-9.0s | Promise / open loop | Text flips to "REAL LIFE... OR GTA 6?" Narration lists the real couch, controller, street |
| 9.0-14.2s | Re-hook 1 | A GTA minimap on a real street |
| 14.2-18.0s | Proof | Back on the couch: he is the player |
| 18.0-20.8s | Re-hook 2 | Wanted stars in the corner |
| 20.8-24.9s | Payoff | "Live action, dressed as GTA 6" |

## 3. Storyboard grid (updated 2026-11-20 to match the rendered video)

9:16 vertical, 1080x1920. Layout: title text at the top, original scene (16:9, scaled to 1080 wide) in the upper middle, caption under it, The Runner walking in the bottom half with a cream speech bubble. Timings are exact for the render (`build_short.py`); out time = source time - 6.1s after the first cut.

| Time/Scene | Narration reference | Visual action and continuity | Camera/graphics | Sound |
|---|---|---|---|---|
| S1 · 0-3.4s Hook (src 0:00-0:03.4) | His voice: "Oh man, it's finally our GTA 6" | He sits on the couch with a controller. The Runner walks in below; bubble "FINALLY!" | Original shot, text "IT'S FINALLY HERE..." (cream) | His original audio, faded out at 3.4s |
| S2 · 3.4-9.0s Promise (src 0:09.5-0:15.1) | "A real couch, a real controller, a real street." | Controller close-up, then the street. Text turns red: "REAL LIFE... OR GTA 6?"; bubble "WAIT..." | Original shot, caption under the video | Source muted; our voiceover |
| S3 · 9.0-14.2s Re-hook 1 (src 0:15.1-0:20.3) | "Now the street has a GTA minimap in the corner." | He walks down a real street; the minimap circle sits bottom-left; bubble "A MINIMAP?!" | Original shot | Voiceover |
| S4 · 14.2-18.0s Proof (src 0:20.3-0:24.1) | "Back on the couch. He is the player." | Cut back to the couch; bubble "HE'S PLAYING!" | Original shot | Voiceover |
| S5 · 18.0-20.8s Re-hook 2 (src 0:24.1-0:26.9) | "Wanted stars, top right." | A street scene with the stars at top right; bubble "WANTED?!" | Original shot | Voiceover |
| S6 · 20.8-24.9s Payoff (src 0:26.9-0:31.0) | "Live action, dressed as GTA 6." | Closing street shot; bubble "REAL LIFE!" answers the S2 question | Original shot, footer THE UNTOLD EXIT tagline | Voiceover, then silence |

**Cut on purpose (source 0:03.4-0:09.5 and 0:31+):** the PS5 menu and Rockstar GTA VI key art, then the ISHOWSPEED banner and end card. Never put them back.
**Continuity rule:** the question planted in S2 ("real life or GTA 6?") is answered in S6. Never trim S1 or S6.

**Proposed v2 changes (not rendered yet):**
1. Last 2s: add a one-digit comment CTA, "Real or game? Comment 1 or 2" (the 4-regrets comment-velocity trick).
2. Loop beat: end on the minimap circle so the Short loops back into the hook.
3. Pose set: The Runner only has the walking pose. Poses from the storyboard sheets (shocked, laughing) would need real assets; none are drawn from scratch.

## 5. Titles (30-40 characters including spaces)

| | Title | Chars | Hook type / formula |
|---|---|---:|---|
| **Primary** | Is This Real Life... Or GTA 6? | 30 | Curiosity question. Answerable by the video (live action with a GTA minimap and wanted stars) |
| Alt 1 | GTA 6 Is Here... In Real Life? | 30 | "GTA 6 Is Finally Here, But ___" frame (proven, 6.7M) |
| Alt 2 | IShowSpeed Turned Real Life Into GTA 6 | 38 | Creator name for search + transformation |

The title never claims gameplay. The video is live action dressed as GTA 6.

## 6. Thumbnail text (2 words)

1. **LOOK CLOSER** (recommended): completes the title, does not repeat it. Cream and red on black.
2. FAKE HUD?
3. REAL LIFE?

### 6b. Thumbnail prompts (`thumbnail-hooks` · text: "LOOK CLOSER")

Pattern rule: command text → **T2** primary, **T6** alternate. Palette and character are locked by `visual-style`. The Runner is the only person in frame (no real person, no creator footage, no Rockstar key art). **Logo override (2026-11-20, your decision):** the official colorful GTA VI logo is added small as a topic label. It is Rockstar's artwork, so attach the original image when generating; never redraw it. Your own rule (`COPYRIGHT.md`) normally bans publisher logos, and no logo file is in the repo yet. The withheld element is *what is on the minimap*; the thumbnail never answers it.

| Concept | Pattern | Prompt (paste-ready) | Why it hooks |
|---|---|---|---|
| 1 | **T2** shock-face + threat | `[THUMB] YouTube thumbnail, 16:9. [CHARACTER] The Runner — cream-skinned chibi boy, oversized head, dark-red knotted headband, cream martial-arts gi + belt, expression shocked, eyes wide, sweat drop, red accent marks radiating from the headband. [SCENE] Pattern T2: extreme close-up of The Runner filling the left half of the frame; in the right half a giant glowing cream circular minimap ring looms like a threat, its inside left blank black (what it shows is withheld), one red radar sweep line across it. [TEXT] "LOOK CLOSER" — gigantic, bold, cream #F5F5DC, stacked on two lines at the top right, slight tilt, NOT overlapping the character's face. [STYLE] 2D flat cartoon, thick clean black outlines, flat fills, no gradients, pitch-black background #000000 over at least 50% of the frame, cream #F5F5DC, dark red #8B0000, red #FF0000 accents. [LOGO] the official colorful Grand Theft Auto VI logo (use the attached original image, unmodified, not redrawn, in its own pink-to-orange colors; it is the only colorful or gradient element allowed), small, about 12% of the frame width, in the bottom-right corner, as a topic label only. [COMPOSITION] eye-magnet = the glowing minimap ring; the logo stays small and secondary; silhouette readable at 10% size.` | His face is the viewer's reaction. The blank ring makes the title's question ("real life or GTA 6?") feel urgent without answering it |
| 2 | **T6** anomaly pointer | `[THUMB] YouTube thumbnail, 16:9. [CHARACTER] The Runner — cream-skinned chibi boy, oversized head, dark-red knotted headband, cream martial-arts gi + belt, expression curious, small sweat drop, looking AWAY from the anomaly. [SCENE] Pattern T6: a flat 2D empty street in black and cream (fence, parked van silhouette, cracked ground) with ONE wrong detail: a small round game minimap in the bottom-left corner, circled by a thick red ring with a thick red arrow pointing at it. The Runner stands bottom-right facing right. [TEXT] "LOOK CLOSER" — gigantic, bold, cream #F5F5DC on the top-left over the dark fence, NOT overlapping the character. [STYLE] 2D flat cartoon, thick clean black outlines, flat fills, no gradients, pitch-black background #000000 over at least 50% of the frame, cream #F5F5DC, dark red #8B0000, red #FF0000 accents. [LOGO] the official colorful Grand Theft Auto VI logo (use the attached original image, unmodified, not redrawn, in its own pink-to-orange colors; it is the only colorful or gradient element allowed), small, about 12% of the frame width, in the top-right corner, as a topic label only. [COMPOSITION] eye-magnet = the red-circled minimap; the logo stays small and secondary; silhouette readable at 10% size.` | Classic curiosity gap: one wrong detail, circled, while the character looks the other way. Matches the video: a real street with a GTA minimap |
| 3 | **T3** hidden-truth reveal | `[THUMB] YouTube thumbnail, 16:9. [CHARACTER] The Runner — cream-skinned chibi boy, oversized head, dark-red knotted headband, cream martial-arts gi + belt, expression narrowed-eye suspicion, holding a flashlight. [SCENE] Pattern T3: a pitch-black street; a cream flashlight beam from The Runner lights ONE floating circular minimap in neon green #00FF7F, everything else stays dark. [TEXT] "LOOK CLOSER" — gigantic, bold, cream #F5F5DC on the right, NOT overlapping the character's face. [STYLE] 2D flat cartoon, thick clean black outlines, flat fills, no gradients, pitch-black background #000000 over at least 60% of the frame, cream #F5F5DC, dark red #8B0000, red #FF0000 accents, neon green #00FF7F on the minimap only. [LOGO] the official colorful Grand Theft Auto VI logo (use the attached original image, unmodified, not redrawn, in its own pink-to-orange colors; it is the only colorful or gradient element allowed besides the green minimap), small, about 12% of the frame width, in the top-left corner, as a topic label only. [COMPOSITION] eye-magnet = the green minimap; the logo stays small and secondary; silhouette readable at 10% size.` | The hidden-truth family is the cluster's biggest gap. The beam says "something is here that you missed" |

**Recommended: concept 2** (T6). It shows the exact detail the video pays off. Text rule: "LOOK CLOSER" completes the title ("Is This Real Life... Or GTA 6?") and does not repeat it.

**Gate (manual):** the text and withheld element are answerable by the video ✓ · The Runner only, no real person ✓ · no creator footage, no leaked assets, no Rockstar key art ✓ · 2 words of text, the logo is an image, not text ✓ · no "OhBhai!" ✓ · **Rockstar logo: allowed by your override.** Keep it small and unmodified, and don't imply Rockstar made or endorsed the video. Rockstar's legal page (`rockstargames.com/legal`) was not checked for logo terms.

**Existing PNG mockups, `yt/gta6-clips/clips/ishowspeed-gta6/thumbs/`:**
- `thumb_C_gta6-real.png` uses only own assets and passes the gate above.
- `thumb_A_look-closer.png` and `thumb_B_real-or-game.png` use frames from the source video that show a real person (A from behind, B face-on). They **fail the skill's gate** (no real person, no creator footage). Use them only as private mockups and attach the prompts above instead.

## 7. Metadata package

**Description** (Short under 60s: no chapter block, per AGENTS.md rule 10; the first 2 lines show before "show more"):

```
Is this real life... or GTA 6? Look closer at the minimap and the wanted stars in this IShowSpeed GTA 6 live-action moment.
A real couch, a real street, and a GTA HUD on top. Watch to the end.

Source: IShowSpeed, "iSHOWSPEED x GTA 6 | OFFICIAL TRAILER"
https://www.youtube.com/watch?v=2BRL4ALMCyA
Clip: 0:00-0:03 and 0:09-0:31 of 1:06, with original commentary and character animation.

THE UNTOLD EXIT: Look Beyond What Seems Obvious.

#gta6 #ishowspeed #shorts #gtavi #gaming
```

**Hashtags (5, measured):** `#gta6 #ishowspeed #shorts #gtavi #gaming`
- Data: #ishowspeed in 16 of 25 top Shorts, #gta6 in 12, #shorts in 6.
- YouTube shows the first 3 above the title: #gta6 #ishowspeed #shorts.
- TikTok / Reels: `#gta6 #ishowspeed #gtavi #gaming #viral`.

**Keywords / tags (17, specific to broad):**
ishowspeed gta 6 real life, gta 6 real life, gta 6 live action, ishowspeed gta 6 trailer, gta 6 minimap, gta 6 wanted stars, ishowspeed gta 6, speed gta 6, ishowspeed gta 6 funny moments, ishowspeed shorts, ishowspeed, gta 6 funny moments, gta 6, gta vi, grand theft auto 6, grand theft auto vi, gaming shorts

- No other creators' names. No "official", "leaked" or "early access" wording.

**Flags:** madeForKids = **No** (general audience; confirm in Studio). Playlist: GTA 6 Secrets (`PLRXf1uVlif1Q`).
**Proposed schedule (not scheduled):** private + `publishAt` 2026-11-22 20:00 UTC (AGENTS.md §6; check against the reference calendar first). Nothing is uploaded.

## 8. Policy check log

This is a manual check against YouTube's policies.

| Check | Result |
|---|---|
| Title and thumbnail match the content | PASS. Live action with a GTA HUD, not gameplay |
| No fake claims or fabricated figures | PASS. Every number is from the API scans |
| Misleading terms ("official", leak, early access) | PASS. None used in title, tags or hashtags |
| madeForKids | Set No. Needs your confirmation |
| Copyright and reused content | **OPEN.** Permission is not written (the clipper's "allowed" note for IShowSpeed is secondhand). A Nike logo shows on his jersey in the couch shots. Music in the first 3.4s is unchecked. Rockstar art and the ISHOWSPEED banner were cut |
| Chapters | Not applicable: runtime 24.9s under 60s |
| Human approval | Required before any upload |
