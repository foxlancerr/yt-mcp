---
name: competitor-playbook
description: Use when ideating videos, writing titles, planning formats, or deciding length/cadence for The Untold Exit — holds the 2026-11-17 competitor cluster intelligence (ConChaser, Monk Mode Films, Day One Films, Dart, Miko, The You Variable) and how to refresh it. Works WITHOUT the TubeLab MCP (uses the YouTube Data API snapshot script).
---

# Competitor Playbook (The Untold Exit)

## Overview

The Untold Exit competes in an animated "What If / hidden-truth" long-form cluster.
This skill holds the measured facts about that cluster and converts them into
format, title, length, and cadence decisions. Full data lives in
`docs/competitors.md`. Never contradict this data without a fresh snapshot.

## Refreshing the data

```sh
node scripts/competitor-snapshot.mjs          # all 7 channels, ~25 quota units
node scripts/competitor-snapshot.mjs ConChaser Miko   # subset
```

Public Data API reads through the owner OAuth tokens from `youtube-studio-mcp auth`.
Re-run weekly or before any ideation batch older than 14 days. If tokens are
missing, run the youtube-studio-mcp auth flow first.

## Measured cluster facts (2026-11-17)

| Channel | Subs | Recent-10 median views | Winning template |
|---|---:|---:|---|
| ConChaser | 29.4K | 61,189 | "What If You Could See ___" · 11–20 min · daily |
| Monk Mode Films | 31.9K | 45,782 | Discipline films · serialized 11-part runs · daily |
| Day One Films | 102K | 40,577 | "X | An Animated Short Film" · 2.5–9 min · 1–3 days |
| Dart | 38.3K | 151,716 | "Boxing vs ___" stickman battles · 40–80s · 2/wk |
| Miko | 11.9K | 14,905 | "What If You Could See ___" · 9–14 min · daily |
| The You Variable | 1.8K | 2,271 | "___ vs ___ — Who Actually Wins?" · 12–15 min · daily |

Key outliers: ConChaser IQ 2.35M (80× subs) · Miko Lie Count 933K (78×) ·
You Variable "Who Actually Wins?" 315K (172×) · Day One DISCIPLINE 6.25M (61×).

## Decision rules

1. **Length.** Ideate P4/P5 experiments as 8–15 minute long-form. Every channel's
   shorts underperform (0.05–1.4× sub ratio); The Untold Exit's own cutdowns
   (15s avg) agree. P6 cutdowns are trailers only, never a growth lane.
2. **Template iteration.** Pick ONE title template per batch and repeat it across
   at least 3 videos before judging it ("What If You Could See ___?",
   "___ vs ___ — Who Actually Wins?", "Why You ___ But Never ___.").
3. **Topic family.** "Hidden personal truth made visible" (lies, crushes, wealth,
   IQ, time left) massively outperforms random powers — Miko's truth-revealing
   videos did 165K–933K while its random-power videos did 2.7K–10K.
4. **Serialization trigger.** Any video ≥5× the channel's recent median gets a
   part 2 scheduled within 72h (Monk Mode's LUST VS LOVE ran 11 daily parts,
   337K→672K, without subs churning off).
5. **Cadence.** Near-daily or every 1–3 days while a template is being tested.
   Gaps over 3 days (already banned by §6 series rules) apply to this testing too.
6. **Positioning.** Frame every "What If" as a mystery to solve, per the brand
   ("Look Beyond What Seems Obvious") — the cluster hands over power fantasies;
   The Untold Exit hands over a question. Do not copy power-fantasy framing
   verbatim.
7. **Title discipline.** Full curiosity frame in every title, every time. No
   "part02"-style placeholders (measured waste: You Variable's "part02", 2.4K).

## Skill network

- **Runs with:** video-ideation, title-formulas, thumbnail-concepts (use these
  rules as their input constraints), story-pipeline (full idea → story
  production consumes this playbook), visual-style (character + 2D style for
  all generated panels).
- **Feeds:** reverse-engineer-channel teardowns when a competitor outliers again.
- **Gate:** policy-guard checks anything this playbook produces before it is
  uploaded, scheduled, or posted.
