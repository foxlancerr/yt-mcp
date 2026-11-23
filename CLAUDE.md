# CLAUDE.md — The Untold Exit

@AGENTS.md

`AGENTS.md` is the single source of truth for channel facts, pillars, scheduling and quota rules. This file adds how Claude must work in this repo.

## 1. Skills first — before doing anything

The skills live in `.agents/skills/<name>/SKILL.md`. Claude Code does not load that folder on its own, so **read the matching SKILL.md first, every time**, then follow it. Do this before any research, writing, editing, or command.

1. Read `AGENTS.md` (loaded above), then pick the skills from the table.
2. Read each chosen `SKILL.md` (and the `Skill network` / `Local wiring` sections at the bottom: they say what runs before and after).
3. Tell the user in one line which skills you are using. If none fit, say so.
4. Only then start the work. If a skill points to one that doesn't exist, say so and continue with the closest one. Don't silently skip.

| Task | Read first |
|---|---|
| New idea to a full package (research, script, storyboard, titles, metadata) | `story-pipeline`, then `script-breakdown`, `visual-style`, `title-formulas`, `thumbnail-hooks` |
| Find GTA 6 streamers and viral moments (/discover /female /male /viral /emotional /funny /today /clip /top10) | `gta6-streamer-hunter`, then `gta6-clipper`, `title-formulas`, `thumbnail-hooks` |
| Same jobs in any other niche, or a full moment→Shorts production plan | `viral-moment-engine` (+ its profile file), then `gta6-clipper`, `title-formulas`, `thumbnail-hooks` |
| Paid clipping campaigns (/paid /plan /check), rewards platforms, what a brief pays | `viral-moment-engine` → `references/paid-campaigns.md`, board `docs/clipping-rewards-platforms-2026-11-22.md`, gate `scripts/clip-campaign-check.mjs` |
| Ideas for a batch | `video-ideation`, `trend-report`, `competitor-playbook` |
| Titles | `title-formulas` |
| Thumbnails | `thumbnail-hooks`, `thumbnail-concepts`, `visual-style` |
| Storyboard or visuals (The Runner, palette) | `visual-style`, `story-pipeline` (stage 3) |
| Script structure / beats | `script-breakdown` |
| Competitors and trends | `competitor-research`, `competitor-playbook`, `trend-report` |
| Runner reactions, emoji, animation frames, end-screen CTA | `runner-reactions`, `visual-style` |
| Comments and outreach | `comment-hooks` |

## 2. Patterns to follow (what already works here)

- Story packages live in `yt/story/<idea-title-name>/story.md`, one folder per idea, sections as in `yt/story/README.md`.
- 60s Shorts: copy the re-hook pattern in `yt/story/4-regrets-gta6-first-10-minutes` (a beat every 5–10s, one planted question paid off at the end, one-digit comment CTA).
- Footage-based Shorts: copy the capture-matrix rule in `yt/story/lucia-vs-cops-opening` (real footage stays intact, our layer is animation and commentary, licensed audio is muted).
- **Length is set by the user in each chat.** Default: long video about 5 min, Short 1–2 min.
- Titles 30–40 characters (1 primary + 2 alternates). Thumbnail text is 2 words. Shorts get no chapter block.
- **Every story is made with the configured skills.** Run `story-pipeline` and the skills it names (`video-ideation`, `script-breakdown`, `visual-style`, `title-formulas`, `thumbnail-hooks`) for each story, one story at a time, and list the skills used in the story's header. Never write a story from memory or in bulk without them.
- **Thumbnail prompt rules (every story):**
  1. **Relevant:** built from that story's own moment (name the real scene or object from the clip), never a generic poster.
  2. **Short:** one paragraph, 70 words or fewer. No template headers, no repeated style boilerplate.
  3. **Curiosity + dopamine hook:** one eye-magnet, one withheld element, a shock or reward cue. The thumbnail asks a question, the video answers it.
  4. **Hook text: exactly 2 words**, a curiosity hook that completes the title and never repeats it. No other text.
  5. The Runner is the only person in frame. Locked palette. The small official GTA VI logo (attached image, unmodified) only because the user chose it on 2026-11-20.
- Evidence comes from the official Data API scripts in `scripts/` (`trend-scan.mjs`, `tag-scan.mjs`, `cc-viral-scan.mjs`) when TubeLab isn't connected. Say so in the output. Never invent trend numbers.

## 3. Hard rules

- **Brand:** THE UNTOLD EXIT, tagline "Look Beyond What Seems Obvious." Never "OhBhai!".
- **Third-party footage:** needs written permission or a verified Creative Commons license, with proof in the clip's `source.md`. No logos or watermarks, no ads or sponsor reads, no copyrighted music, no publisher key art (Rockstar), credit in the caption text, and never the whole video. Checklist: `yt/gta6-clips/COPYRIGHT.md`.
- **Bot checks:** never use browser cookies or any workaround to get past a platform's bot check or CAPTCHA. Ask the user for a permitted source file instead.
- **Honest metadata:** titles, thumbnails and descriptions must match the video. Live action or promos are never presented as gameplay. `madeForKids` is never guessed.
- **No publishing without confirmation:** nothing is uploaded, scheduled or commented without the user's explicit yes (AGENTS.md rule 5). Schedule convention is private + `publishAt` 20:00 UTC.
- **Quota:** the API allows 10,000 units a day. A search costs 100 units. Batch the reads and log the units used.
- **Deleting:** ask before deleting anything that is not tracked by git. Untracked files can't be restored.

## 4. Output habits

- Short, plain sentences. Report what was not done or not verified.
- Save deliverables in the project folder: stories in `yt/story/`, shorts in `yt/gta6-clips/clips/<idea-name>/` (`final.mp4`, `caption.md`, `source.md`, `package.md`).
