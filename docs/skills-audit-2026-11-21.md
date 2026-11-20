# `.agents/skills` audit — 2026-11-21

Scope: all 23 skill folders, every `SKILL.md`, their local-wiring blocks, and every
file/script/asset they reference.

## Inventory

| Group | Skills | Runs here? |
|---|---|---|
| Local / channel-owned | `story-pipeline`, `visual-style`, `thumbnail-hooks`, `comment-hooks`, `competitor-playbook` | ✅ yes |
| Third-party tool | `gta6-clipper`, `remotion-best-practices` | ✅ yes (one is off-policy) |
| TubeLab (needs MCP) | 16 skills: `audit-channel-risk`, `channel-analysis`, `comment-mining`, `competitor-research`, `monetization-research`, `niche-bending`, `niche-finder`, `niche-validator`, `niche-watchlist`, `reverse-engineer-channel`, `script-breakdown`, `sponsorship-prospecting`, `thumbnail-concepts`, `title-formulas`, `trend-report`, `video-ideation` | ⚠️ only 6 have fallbacks |

All folders are correctly named, every `name:` matches its folder, every referenced
`scripts/*.mjs` exists, both character-storyboard JPGs exist, `docs/competitors.md`
exists, `AGENTS.md` exists, all files are valid UTF-8, and every `youtube-studio`
tool name used in the skills (`reply_to_comment`, `update_comment`,
`mark_comment_as_spam`, `post_video_comment`, `list_comment_threads`) is a real tool.

---

## 1. Blocking issues

### 1.1 `policy-guard` does not exist — and 21 skills depend on it

`AGENTS.md §4.0` makes it the top-priority gate. 36 references across 21 skill files
say "Gate: policy-guard". There is no `policy-guard` folder.

Consequences:
- `story-pipeline` stage 2 ("policy-guard reviews the script before it is written")
  and stage 7 ("run the policy-guard checklist") are unexecutable — the pipeline is
  supposed to be gated twice, and both gates are missing.
- `comment-hooks` gates every comment through it and cites "policy-guard Category 1",
  so the whole category taxonomy is orphaned.
- `audit-channel-risk`, `video-ideation`, `title-formulas`, `visual-style`,
  `thumbnail-hooks`, `competitor-playbook` all end on a gate that cannot run.

**Fix:** write `.agents/skills/policy-guard/SKILL.md` with the numbered categories the
other skills cite (1 = engagement/comment, 2.1 metadata accuracy, 2.3 likeness, 2.4
assets, 3 = kids/content, 4 = copyright) and the checks each one runs. Everything else
already points at the right place.

### 1.2 Ten TubeLab skills are dead code in this environment

16 skills declare `requires: tubelab-mcp`. It is not connected. Only 6 of them ship a
local fallback:

| Has fallback | No fallback — cannot run at all |
|---|---|
| `competitor-research`, `script-breakdown`, `thumbnail-concepts`, `title-formulas`, `trend-report`, `video-ideation` | `audit-channel-risk`, `channel-analysis`, `comment-mining`, `monetization-research`, `niche-bending`, `niche-finder`, `niche-validator`, `niche-watchlist`, `reverse-engineer-channel`, `sponsorship-prospecting` |

The 10 have no "if the MCP is unavailable, do X or stop" line, so an agent that loads
one burns the turn discovering the tools are missing.

**Fix:** either add a one-line fallback block to each (as the other 6 have), or move
them to `.agents/skills/_disabled/` so they are not offered.

### 1.3 `gta6-clipper/SKILL.md` has corrupted command paths

Two BEL bytes (0x07) and one broken line, caused by `\a` / `\n` escapes being
interpreted when the file was written:

| Byte offset | Now reads | Should read |
|---|---|---|
| 1816 | ``PY SKILL\x07pp.py --chain`` | `PY SKILL\app.py --chain` |
| 10299 | ``PY SKILL\x07pp.py <the user's folder>`` | `PY SKILL\app.py <the user's folder>` |
| line 23–24 | ``PY SKILL`` + newline + ``opick.py --check picks.json`` | `PY SKILL\nopick.py --check picks.json` |

`SKILL-REFERENCE.md` has the same BEL bug once. An agent following the text literally
runs `SKILLpp.py`, which does not exist — the setup and check steps silently fail.

---

## 2. Contradictions with `AGENTS.md` and with the channel's own data

### 2.1 P4/P5 length: three skills say 8–15 min, AGENTS.md says 1–5 min

| Source | Says |
|---|---|
| `AGENTS.md §2` | P4 = **1–5 min**, P5 = **~1 min** |
| `competitor-playbook` rule 1 | "Ideate P4/P5 experiments as **8–15 minute** long-form" |
| `story-pipeline` stage 2 | "P4/P5 experiments run **8–15 min**" |
| `video-ideation` constraints | "long-form **8–15 min** for P4/P5" |

AGENTS.md is declared the single source of truth, so this is a live conflict — and the
skills are on the losing side of the channel's own numbers: 3:01 videos retain 12%,
5:00 videos 10–25%, while 1:00 videos hold 57% and loop 100–441%. The library is
recommending the format the analytics say fails.

**Fix:** decide one number. Given the retention data, AGENTS.md §2 should win and the
three skills should be re-pointed to the 55–80s / 1–5 min band.

### 2.2 `video-ideation` says "do not mix in Shorts"

Its pitfall list: *"Do not mix in Shorts, and do not pitch a video the channel already
made."* Meanwhile `AGENTS.md §3` records SHORTS as a traffic source, the top video on
the channel is a 25s Short, and the Shorts feed is the only place the channel gets
free distribution. The rule is right for the cluster (long-form channels), wrong for
this channel's current state.

### 2.3 `AGENTS.md §3` baseline is now wrong

It says "29 videos, ~57 lifetime views". Live: 30 public videos, ~772 views on video
counters, and 0 subscribers after a 700-view week. Since every skill reads §3 first,
every research output starts from numbers that are off by 13×.

### 2.4 Orphaned "policy-guard Category" numbering

`comment-hooks` cites "policy-guard (Category 1 — mandatory before posting)";
`thumbnail-hooks` cites checks "2.1 / 2.3 / 2.4". With no policy-guard file, these
numbers point at nothing. They are worth preserving — the categories should be
rebuilt in the new file with those exact IDs.

---

## 3. Hygiene

### 3.1 `gta6-clipper` is 782 MB / 14,290 files, and off-policy

- It is gitignored (correct — `.gitignore` line ~27, which even documents the 812 MB),
  so the repo is clean.
- But it is a **third-party clipper**: it downloads other people's streams and cuts
  them into Shorts. That is the exact pattern `AGENTS.md` forbids ("references are
  structural DNA only; plates must be own capture"). Its own rules (`clip_rules.json`,
  credit line, no leaks) make it legitimate *for other operators* — not for this
  channel's no-reused-footage position.
- 14k files inside the skills tree means every skill scan, glob and search pays for
  it.

**Suggestion:** keep it, but add a one-line warning at the top of its `SKILL.md`
("not cleared for The Untold Exit — reused footage") or move it outside `.agents/skills`.

### 3.2 `remotion-best-practices` ships ~20 dead internal links

Its router sends you to `remotion-markup/REFERENCE.md`, which then links to
`video-editing.md`, `sequencing.md`, `timing-props.md`, `text-highlights.md`,
`video-matting.md`, `transitions.md`, `sfx.md`, `timing.md`, `silence-detection.md`,
`../remotion-studio/`, `../remotion-render/`, `../remotion-multimedia/*` — none exist.
Its own "Known gaps" section only lists 3 of them.

**Fix:** extend that section, or replace the router table with the files that do exist
(`remotion-create`, `remotion-markup`, `remotion-captions`, `remotion-interactivity`,
`remotion-maps`, `remotion-license`, `remotion-docs` all have a real `REFERENCE.md`).

### 3.3 Overlap between skills

- `thumbnail-hooks` (local, works) vs `thumbnail-concepts` (TubeLab, dead) — same job.
- `story-pipeline` vs `video-ideation` — pipeline says "run after video-ideation",
  but its own stage 1 redoes the research ideation just did.
- `competitor-playbook` vs `competitor-research` — playbook says "runs with research"
  while carrying its own copy of the same numbers.

Not broken, but every skill description is paid for in context on every turn. 23
descriptions ≈ 4.5 KB of standing prompt.

### 3.4 Inconsistent frontmatter

7 skills carry `license: MIT` + `metadata: {author, version, requires}`; the other 16
carry nothing. Harmless to OpenCode, but it makes it impossible to tell at a glance
which skills are vendored vs channel-owned. `gta6-clipper` and `remotion-best-practices`
have no provenance block at all despite being third-party.

---

## 4. What is genuinely good

- Every `name:` matches its folder; every description is a proper "use when…" trigger.
- The **local-wiring blocks** (added 2026-11-17/18/20) are the strongest part of the
  library: each one names the exact script, quota cost and fallback.
- `thumbnail-hooks` is the only skill carrying measured, dated evidence (six patterns
  with live proof rows) plus a refresh rule — that is the model the others should copy.
- `comment-hooks` is genuinely field-tested and its anti-pattern list is specific.
- Script names, asset paths, tool names and encoding all check out.
- The gta6-clipper exclusion is properly documented in `.gitignore`.

---

## Ranked fix list

1. **Write `policy-guard`** (with categories 1, 2.1, 2.3, 2.4) — unblocks 21 skills.
2. **Repair the 3 corrupted paths in `gta6-clipper/SKILL.md` + 1 in `SKILL-REFERENCE.md`.**
3. **Resolve the P4/P5 8–15 min vs 1–5 min conflict** — one number, in AGENTS.md first.
4. **Refresh `AGENTS.md §3`** to the 2026-11-21 numbers.
5. **Add fallback lines to the 10 dead TubeLab skills**, or park them in `_disabled/`.
6. **Fix the remotion router's dead links.**
7. Add a "not cleared for reused footage" banner to `gta6-clipper`.
