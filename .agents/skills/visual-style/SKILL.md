---
name: visual-style
description: Use when generating ANY visual for The Untold Exit — storyboard panels, scene prompts, thumbnails, banners. Holds the locked 2D style, the character bible ("The Runner", from public/images/character-storyboard-01 and -02), the palette, and the dopamine visual-prompt template.
---

# Visual Style & Character Bible — The Untold Exit

## Overview

Every visual the channel publishes is 2D, flat, high-contrast, and built from ONE
locked system: pitch-black worlds, cream figures, red danger accents. The same
character — **"The Runner"** — carries every story. Consistency is the brand;
never invent a new style, palette, or protagonist.

**Reference sheets (ground truth — view them before generating anything):**
- `public/images/character-storyboard-01.jpg` — rotation/angles, action progression, anatomy library, camera-angle language, palette
- `public/images/character-storyboard-02.jpg` — angles, emotion & action, toga variant, storyboard A/B/C example, full palette

## The character: "The Runner"

A small, cream-skinned chibi-style young man. Big expressive head, simple body,
**dark-red knotted headband** (always on — it is the silhouette signature).

| Variant | Wardrobe | Use for |
|---|---|---|
| **Survivor** | Cream martial-arts gi, belt | P1 survival, P2 challenges, P3 gaming |
| **Ancient** | Tattered cream toga/tunic, dirt smudges | P1 historical (Trapped 4,000 Years), epic stakes |

- **Emotions on file:** neutral, confused, shocked, angry, sad, terrified, excited,
  fearful, hurt, determined — conveyed with wide eyes, sweat drops, red anger
  marks on the headband/cheeks, head-clutching hands.
- **Gesture library:** closed fist, open palm, clutching head, pointing, "stop" hand.
- **Action progression:** crouch/prepare → leap upward → mid-air apex → land/roll →
  crouch/look back → stand/run. Also: push, vault, hide.
- **Feet:** planted, running, tripping, kicking small stones.

## Camera language (matches the reference sheets)

- **WIDE:** tiny protagonist dwarfed by silhouettes/environment — use for isolation
  and scale stakes.
- **MEDIUM:** full-body action or dialogue with the world visible.
- **CLOSE-UP:** face fills frame, red accent marks radiating — use for shock,
  realization, dopamine beats.
- Rotation set available: 0° / 45° / 90° (profile) / 135° / 180° (back).

## Locked palette

| Role | Hex | Use |
|---|---|---|
| Pitch black | `#000000` | Background, negative space, dread |
| Cream | `#F5F5DC` | Character fill, panels, text |
| Dark red | `#8B0000` | Headband, shadows, danger zones |
| Red | `#FF0000` | Alerts, "locked", emergency |
| Light red | `#FF3131` | Motion streaks, anger marks |
| Neon green | `#00FF7F` | ONE accent per story max — escape routes, "correct" answers, hope |

Style: thick clean black outlines, flat fills, no gradients, no realistic shading.
Panels may use cream backgrounds with black ink for "flashback/explainer" beats
(see storyboard example C panel: "EVERY EXIT LOCKED" — black world, red lock, neon red eyes).

## ⚠️ Brand

Label every asset, overlay and end-card **THE UNTOLD EXIT** with the tagline
"Look Beyond What Seems Obvious." The reference sheets carry the legacy "OHBHAI"
label — that brand is RETIRED (AGENTS.md §1). Do not render "OhBhai!" anywhere.

## Visual-prompt template (for image/video generation)

```
[CHARACTER] The Runner — cream-skinned chibi boy, oversized head, dark-red
knotted headband, [wardrobe: cream martial-arts gi + belt | tattered cream toga],
expression [emotion], pose [action/gesture], [hand detail if relevant].
[SCENE] [one-line scene action + continuity from storyboard].
[STYLE] 2D flat cartoon, thick clean black outlines, flat fills, no gradients,
pitch-black background #000000, cream #F5F5DC, red accents #FF0000/#8B0000,
[optional single] neon green #00FF7F accent for [escape/hope element].
[CAMERA] [wide: tiny figure vs silhouettes | medium | close-up with red accent
marks], [rotation angle].
[TEXT] [on-screen text if any, ≤5 words, cream or red].
```

Generate prompts per storyboard panel, never per arbitrary scene. One prompt =
one panel from the storyboard grid, same timeline timestamps.

## Skill network

- **Runs with:** story-pipeline (consumes its storyboard grid), thumbnail-concepts
  (thumbnails use the same palette + close-up shock language).
- **Gate:** policy-guard — no real-brand assets beyond nominative references, no
  misleading imagery (thumbnail text must be answerable by the video).
