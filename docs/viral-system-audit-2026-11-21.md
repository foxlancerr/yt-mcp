# Viral production system: audit and integration report (2026-11-21)

Scope: steps 1-2 of the workflow only. Nothing was installed, overwritten or rendered. Every line below was checked on this PC today unless marked "not verified".

## 1. What is installed and verified

| Area | Found | Status |
|---|---|---|
| FFmpeg | 9.0.2 full build. Filters present: `xfade`, `zoompan`, `lut3d`, `curves`, `colorbalance`, `vidstabdetect`, `vidstabtransform`, `minterpolate`, `tmix`. Encoders: `libx264`, `h264_nvenc`, `h264_qsv`, `h264_amf` | Ready. NVENC not verified: `nvidia-smi` is missing, so use `libx264` |
| Python | 3.11.9 system; clipper venv has faster-whisper 1.2.1, opencv-contrib 5.0, Pillow 13, numpy 2.4.6 | Ready |
| Node / npm | 22.14.0 / 10.9.2 | Ready |
| yt-dlp | 2026.10.26 | Ready |
| Own render pipeline | `yt/gta6-clips/tools/`: `runner_engine.py` (The Runner animation), `render_shorts.py`, `make_stories.py`, `tools/sprites/` | Works (4 Shorts rendered) |
| Character references | `public/images/character-storyboard-01.jpg`, `-02.jpg`, `character-walk-overlay.mp4`, plus the walk sprites | Present, untouched |
| Skills (13) | `story-pipeline`, `visual-style`, `thumbnail-hooks`, `title-formulas`, `video-ideation`, `trend-report`, `script-breakdown`, `competitor-research`, `competitor-playbook`, `comment-hooks`, `thumbnail-concepts`, `gta6-clipper`, `remotion-best-practices` | Names and links check clean |
| Plugin | `gtavi-claudecode` (15 skills: moment-finder, clip-cutter, hook-writer, rule-check, multilang, ...) | Installed |
| MCP | `youtube-studio` (project `.mcp.json`) | Configured; TubeLab not connected |

## 2. What was asked for but is NOT installed

| Requested | Result of search | Action needed |
|---|---|---|
| **DirectorSKILL** | Not in `.agents/skills`, `~/.claude/plugins` (cache and both marketplaces), the repo, `skills-lock.json` or the docs | Send the link or exact name. I will not guess a source |
| **Cinema Skills** | Same: not found anywhere | Same |
| **HyperFrames** | Same: not found anywhere | Same |
| **Remotion (the library)** | Only the skill (docs) is installed. `node_modules` has no `remotion` package. `npm view remotion version` returns 4.0.545 (matches the skill) | Needs your approval to install (see §4) |

## 3. Overlaps and conflicts

1. **Three clip paths do the same job:** `gta6-clipper` (finder, moments, vertical cut), the `gtavi-claudecode` plugin skills (moment-finder, clip-cutter) and our own `render_shorts.py`. Proposal: keep `render_shorts.py` for the final render because it holds The Runner, and use the clipper only for finding moments. Do not run the plugin cutter as well.
2. **Remotion vs FFmpeg:** FFmpeg already does the compositing and drawtext captions. Remotion adds value only for animated word-by-word captions and kinetic typography. Rule: FFmpeg for cuts, color, speed ramps and audio; Remotion for caption and motion-graphic layers, rendered as a transparent overlay and merged by FFmpeg.
3. **Brand conflict:** you wrote "OhBhai!". `AGENTS.md` and `CLAUDE.md` lock the brand as **The Untold Exit** and ban "OhBhai!" (locked 2026-11-17). I will keep The Untold Exit unless you tell me to reverse that rule, and then I will edit it.
4. **"Blue-area layout":** I have no blue area in the references. The layout used so far is the blurred band under the gameplay. If you mean something else, I need the reference.
5. **Goals vs data:** `AGENTS.md` §3 records that Shorts and cutdowns do not convert on this channel (15s average view). The 10M views and 10K subscribers targets stay as ambitions. I will not report projected metrics.
6. **Footage rights:** the Creative Commons GTA 6 pool is thin, and the viral videos are not CC. "Authorized footage" must be one of: Creative Commons with proof, written permission, or your own capture. Tell me which sources you have.

## 4. Proposed install list (needs approval, nothing started)

| Item | Why | Cost / risk |
|---|---|---|
| `remotion`, `@remotion/cli`, `@remotion/captions` in a separate folder `video-engine/` (not the MCP project) | Animated captions and kinetic type | Downloads a headless Chrome of a few hundred MB. Remotion has a company license rule: check `remotion-license` before commercial use |
| Nothing else | FFmpeg, Python and Node already cover it | none |

## 5. Unified workflow (proposed)

1. `video-ideation` / `trend-report` (evidence from `scripts/`) → 4 opportunities.
2. Inspect each source (ffprobe, frame sheet, transcript) before any plan.
3. `story-pipeline` per clip: hook (first 1-2s), re-hooks every 5-10s, payoff, loop ending, 2-word thumbnail hook.
4. Shot plan (camera move, cut type, speed ramp, color, sound) → **your approval**.
5. Render with `render_shorts.py` (+ Remotion overlay if approved), then verify: resolution 1080×1920, frame rate, audio sync, duration, a frame check.
6. Log per-clip results in `learning` notes from real Data API numbers only.

## 6. Questions blocking the next step

1. Links or names for DirectorSKILL, Cinema Skills and HyperFrames.
2. Brand: keep The Untold Exit?
3. What is the "blue area"?
4. Approve the Remotion install?
5. Which footage sources are authorized beyond Creative Commons?
