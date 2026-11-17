---
name: thumbnail-hooks
description: Use when converting 2-word thumbnail text into curiosity-type hook thumbnail IMAGE PROMPTS for The Untold Exit — encodes the trending thumbnail patterns of the niche (measured 2026-11) as ready-to-paste prompts in the locked 2D style and palette. Works without the TubeLab MCP.
---

# Thumbnail Hooks — 2-word text → curiosity prompt (locked style)

## Overview

Takes the chosen 2-word thumbnail text (from `story-pipeline` stage 6 or a
user prompt) and generates **3 paste-ready curiosity-hook thumbnail prompts**,
each built on a pattern that is measurably trending in the niche, rendered
in the locked `visual-style` system (The Runner, black/cream/red, one green
accent max). One concept is recommended. Nothing ships without policy-guard.

Read `visual-style` first (character bible + palette are law) and AGENTS.md
§4.3 (thumbnail voice: high-contrast, big-number stakes, shock cues, no
misleading-clickbait mismatch).

## The trending pattern library (evidence-measured, refresh quarterly)

Each pattern = a composition grammar that keeps winning in the GTA 6 / mystery
cluster (live API proof from the 2026-11-17/18 scans). The prompt MUST name
which pattern it uses.

| # | Pattern | Grammar | Trending proof (live scans) |
|---|---------|---------|------------------------------|
| T1 | **Number-as-hero** | The 2-word text rendered GIGANTIC (fills 40–60% of frame), glowing cream on pitch black; a small shocked Runner beneath it for scale; one red anomaly detail | "How Many Rockstar Maps Fit Inside GTA 6?!" 4.4M · "18 hours" claims own the launch SERP |
| T2 | **Shock-face + threat** | Extreme close-up of The Runner (wide eyes, red accent marks) occupying one half; the danger/object looming in the other half | "POV: Getting Banned While Launching GTA 6" 434K at 26.7K subs · MrJemison 403K |
| T3 | **Hidden-truth reveal** | A cream beam of light (flashlight/spotlight) illuminating the ONE glowing element in an otherwise black scene; everything else stays dark | Cluster's single biggest gap ("hidden truth made visible"); "The Quiet Corner" beats |
| T4 | **Versus split** | Hard diagonal split: left X (red-lit), right Y (green #00FF7F-lit), Runner standing on the fault line pointing at the contested element | "GTA 5 vs GTA 6: How Much Is Empty?!" 3.0M · "Real-Life Miami vs GTA 6" 789K at 367 subs |
| T5 | **Locked door / forbidden object** | A door, envelope, chain or seal — one gap in it glowing; Runner's hand or eye at the gap; red "forbidden" aura | PS5 "door almost shut" story · sealed-envelope silence beat |
| T6 | **Anomaly pointer** | Flat scene with ONE wrong detail; a thick red arrow or red circle marks it; Runner looking the other way (dramatic irony) | Map-anomaly content (VicePulse lane); classic curiosity-gap grammar |

**Pattern → text matching rule:** the 2-word text decides the pattern family —
- Number text ("18 HOURS", "1 BILLION") → **T1** primary, **T2** alt
- Question text ("WHAT'S IN?", "WHO WINS?") → **T3** primary, **T5** alt
- Command text ("PLAY EARLY", "DON'T DO") → **T2** primary, **T6** alt
- Versus text ("X VS Y") → **T4** primary
- Mystery/label text ("MAP TRUTH", "THE SILENCE") → **T3** primary, **T6** alt

## Curiosity rules (what makes it a HOOK, not a poster)

1. **Withhold one thing.** The thumbnail answers nothing — it makes the
   title's question feel urgent. Show the *frame* of the secret, never the secret.
2. **One eye-magnet.** Exactly one brightest point (glow, number, green accent).
   Two magnets = zero magnets.
3. **The Runner emotes.** Shock, dread or narrowed-eye suspicion — his face is
   the viewer's proxy. Red accent marks radiate on strong emotion only.
4. **Text never repeats the title.** It completes or contradicts it
   (`thumbnail-concepts` pitfall #5, kept).
5. **10% legibility test.** Shrink to 120×68 px: text must read instantly,
   silhouette must be unmistakable. If not, simplify.
6. **Void is the backdrop.** Pitch black #000000 dominates ≥50% of frame —
   the brand owns darkness; the cream figure and red accents pop against it.

## Prompt template (extends `visual-style`)

```
[THUMB] YouTube thumbnail, 16:9.
[CHARACTER] The Runner — cream-skinned chibi boy, oversized head, dark-red
knotted headband, cream martial-arts gi + belt, expression [emotion],
red accent marks [if strong emotion].
[SCENE] [pattern T# composition grammar with the ONE withheld element named].
[TEXT] "[the 2-word text]" — gigantic, bold, cream #F5F5DC (or red #FF0000
if alarm), slight tilt [optional], positioned [left/right], NOT overlapping
the character's face.
[STYLE] 2D flat cartoon, thick clean black outlines, flat fills, no
gradients, pitch-black background #000000 ≥50% of frame, cream #F5F5DC,
dark red #8B0000, red #FF0000 accents, [max one] neon green #00FF7F accent.
[COMPOSITION] [eye-magnet = the single brightest element] · silhouette
readable at 10% size.
```

## Output format

A 3-row table (append to `story.md` section 4 as "Thumbnail prompts" or return
standalone):

| Concept | Pattern | Prompt (paste-ready) | Why it hooks |
|---|---|---|---|

- Row 1 = the pattern the matching rule prescribes. Rows 2–3 = strongest alternates.
- Mark the recommended row in the chat reply, not the file (file stays neutral
  with 1 recommended noted in `story-pipeline` section 6).

## Policy-guard gate (run before output)

- ✅ 2.1 — text + withheld element are answerable by the video (no fake reveals)
- ✅ 2.3 — no real person's likeness; The Runner only (no celebrity faces)
- ✅ 2.4 — no leaked assets, no gameplay rips, no creator footage in the thumb
- ✅ Text ≤5 words total (2-word text + nothing else, or +1 tiny label)
- ✅ No "OhBhai!" anywhere; optional "THE UNTOLD EXIT" watermark bottom-right, 5% opacity
- Fail any → report the failing check, do not output the concept

## Local wiring (The Untold Exit — added 2026-11-18)

- **Runs after:** `story-pipeline` stage 6 (2-word text chosen) or called
  directly with user text.
- **Runs with:** `visual-style` (palette/character law), `thumbnail-concepts`
  (its TubeLab workflow is upstream research; when MCP is unavailable, THIS
  skill is the local pattern library + generator).
- **Pattern refresh:** re-run `node scripts/trend-scan.mjs "<niche query>" 7`
  monthly; any pattern whose proof row stops matching the live SERP gets
  re-verified before reuse (rule: evidence or it dies).
- **Quota:** pattern refresh ~100 units; prompt generation itself is free.

## Skill network

- **Runs after:** story-pipeline (stage 6), thumbnail-concepts (fallback body)
- **Runs with:** visual-style (mandatory), title-formulas (text must complete, not repeat, the title)
- **Hands off to:** policy-guard (gate), upload execution (user-confirmed only)
- **Gate:** policy-guard before any generated thumb is attached to a story package
