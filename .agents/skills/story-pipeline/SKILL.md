---
name: story-pipeline
description: Use when the user gives a video idea or topic and wants the full production package — YouTube research (niche + competitors), complete script, storyboard grid, dopamine visual prompts with camera direction, 30–40 char titles, 2-word thumbnail text, hashtags/keywords/policy-safe description/tags. Output lands in yt/story/<idea-title-name>/story.md. Works without the TubeLab MCP.
---

# Story Pipeline — idea → publish-ready story.md

## Overview

One command, one deliverable. When the user names an idea, run the full chain
below and write EVERYTHING into a single markdown file:
`yt/story/<idea-title-name>/story.md` (folder = slugified title, lowercase,
hyphens — e.g. `yt/story/my-idea-name/story.md`).
Never scatter sections across chat only; the file is the product.

Read AGENTS.md first (§1 brand voice, §2 pillar/length bands, §3 data +
competitor map, §4 rules). Read `visual-style` for all visuals.

## The pipeline (run in order)

### 1. Research — niche + competitors (evidence, not vibes)
- Trend check: `node scripts/trend-scan.mjs "<topic query>" 7` (~100 units).
  Skip if the idea is evergreen with no search wave — say so.
- Competitor check: `node scripts/competitor-snapshot.mjs` if older than 14
  days (~25 units), plus pull the 3 most relevant cluster channels.
- TubeLab MCP (niche-validator, competitor-research, trend-report, script-breakdown):
  use it when connected; when not, say so and fall back to the API scripts
  (AGENTS.md §4.7). No paid TubeLab searches without stating the credit cost.
- Write: niche fit (which pillar P1–P6), trend numbers, competitor proof
  (views, ratios, lengths, what won), the gap we exploit.

### 2. Script — complete story (script-breakdown beat taxonomy)
- Beats in order: hook → promise → stakes → open loop → findings/acts with
  mini-payoff + re-hooks → payoff → CTA. Long-form = 10–20 beats; ≤4 min ≈ 3–4.
- Voice: The Untold Exit mystery frame ("Look Beyond What Seems Obvious").
  Second person where possible. Length band per pillar (AGENTS.md §2) —
  P4/P5 experiments run 8–15 min per competitor playbook unless user overrides.
- Unknown facts → `[FILL]` slots + a harvest checklist. Never invent facts.
- Serialization: any ≥5× outlier premise gets a part-2 hook in the CTA.
- Gate: policy-guard reviews the script before it is written to the file.

### 3. Storyboard grid — panel table
- 5 columns: Time/Scene · Narration reference (verbatim
  quote) · Visual action and continuity · Camera/graphics · Sound.
- Panel length: ~20s panels for ≤5 min scripts; ~40s panels for 6–12 min
  scripts (12–14 panels). Header: total runtime + "timings approximate" +
  asset rule (official assets/stylized recreations only — no gameplay rips,
  no creator clips).
- End with the beat-anchor check line and a trim rule (never trim hook/payoff).

### 4. Visual prompts — dopamine scene prompts with timeline
- One prompt per storyboard panel, generated with the `visual-style` template:
  [CHARACTER] The Runner + wardrobe variant → [SCENE] panel action → [STYLE]
  locked palette hexes → [CAMERA] wide/medium/close-up + angle → [TEXT] on-screen.
- Present as a timeline table: Time · Prompt (full text) · Camera direction ·
  Dopamine beat type (curiosity gap / shock / relief / payoff).

### 5. Titles — 30–40 characters, hook type
- Exactly 1 primary + 2 alternates. 30–40 characters INCLUDING spaces.
- Use §4.2 patterns + cluster-proven frames ("What If You Could See ___?",
  "___ vs ___", "Hasn't Even Released… So How Did It ___?").
- Curiosity gap, no clickbait mismatch — the title must be answerable by the video.

### 6. Thumbnail text — 2 words, dopamine hook
- Exactly 2 words (numbers count as a word: "18 HOURS" works).
- Curiosity/dread/stakes. Cream or red on black, readable at 10% size.
- 3 options max, one recommended.
- **Then run `thumbnail-hooks` on the chosen text:** it converts the 2-word
  text into 3 paste-ready curiosity-hook thumbnail prompts (trending pattern
  library T1–T6 + locked `visual-style` style) and returns a 3-row concept
  table (Concept · Pattern · Prompt · Why it hooks).
- The table lands in story.md section 4 as a "Thumbnail prompts" sub-block;
  mark the recommended concept in the chat reply.

### 7. Metadata — policy-guard checked
- **Description:** first 2 lines carry the hook + keyword (visible before
  "show more"), chapters from beat timestamps, sources/assets credit line,
  channel footer, no misleading claims, no spam tags-in-description.
- **Hashtags:** 3–5, mixed size relevance (#gta6 #shorts only if a Short).
- **Keywords/tags:** ~15–20, comma list, specific → broad, no misleading terms,
  no other creators' names unless editorially relevant.
- Run the policy-guard checklist (accuracy, metadata honesty, COPPA/not-made-
  for-kids, copyright/assets) and note it passed in the file.

### 8. Write the file
- `yt/story/<idea-title-name>/story.md` with sections:
  1) Research summary 2) Script 3) Storyboard grid 4) Visual prompt timeline
  5) Titles 6) Thumbnail text 7) Metadata package 8) Policy check log.
- End the chat reply with the primary title, thumbnail text, and the file path.

## Hard rules

- One idea = one folder = one story.md. Rerunning an idea overwrites only
  after saying what changed.
- Scheduling/uploading stays OUT of the pipeline until the user confirms
  (AGENTS.md §4.5) — the file proposes `publishAt` per §6 but nothing ships.
- Quota discipline: pipeline reads cost ~100–200 units; log usage in the file.
- If research contradicts the idea, say so before writing the script —
  the user can redirect cheaply.

## Skill network

- **Runs after:** video-ideation (or directly from a user idea).
- **Runs with:** competitor-playbook (input constraints), visual-style (all
  visuals), thumbnail-hooks (stage-6 text → curiosity thumb prompts),
  trend-report/script-breakdown via TubeLab when available.
- **Hands off to:** title-formulas (if user wants more title options),
  thumbnail-concepts, comment-hooks (pinned comment), upload execution
  (youtube-studio MCP, user-confirmed only).
- **Gate:** policy-guard before anything leaves this pipeline.
