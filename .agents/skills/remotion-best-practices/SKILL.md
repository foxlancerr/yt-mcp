---
name: remotion-best-practices
description: Use when creating or editing video programmatically with Remotion (React-based video framework) — scaffolding a Remotion project, writing compositions or stills, animating with useCurrentFrame and interpolate, burning in captions or subtitles, embedding video and audio, building map fly-throughs, looking up current Remotion APIs, or checking Remotion licensing. Routes to the right Remotion workflow file.
---

# Remotion best practices — router

Remotion makes video with React: you write components, and Remotion renders them
frame by frame to MP4 or PNG. Package version: **4.0.545**.

Load **one** workflow file for the task at hand. Each is self-contained; do not
read all of them.

| Task | Load |
|---|---|
| New project, new composition or still | [remotion-create/REFERENCE.md](remotion-create/REFERENCE.md) |
| Writing markup, animation, effects, audio, images, text | [remotion-markup/REFERENCE.md](remotion-markup/REFERENCE.md) |
| Making elements editable in Remotion Studio | [remotion-interactivity/REFERENCE.md](remotion-interactivity/REFERENCE.md) |
| Captions, subtitles, transcription, SRT import | [remotion-captions/REFERENCE.md](remotion-captions/REFERENCE.md) |
| Map animation and fly-throughs | [remotion-maps/REFERENCE.md](remotion-maps/REFERENCE.md) |
| Looking up a current API or doc page | [remotion-docs/REFERENCE.md](remotion-docs/REFERENCE.md) |
| Licensing, pricing, commercial use | [remotion-license/REFERENCE.md](remotion-license/REFERENCE.md) |

## Rules that apply before you pick a workflow

- **Read current docs, not memory.** Remotion's API moves. When unsure about a
  component or prop, use `remotion-docs` to search Algolia and fetch the page
  with a `.md` suffix.
- **Open Remotion Studio before writing markup**, so the user can see changes
  and steer. Do not build a whole video blind.
- **Animate with `useCurrentFrame()` + `interpolate()`.** CSS `transition` and
  `animation`, and Tailwind animation classes, do not render correctly.
- **Get `fps` from `useVideoConfig()`** for any seconds-to-frames maths.
- **Keep `useCurrentFrame()` in the smallest component** that needs it.
- **Preserve user edits** made outside the conversation. If a change looks
  surprising, ask rather than overwrite.

## Licensing, stated plainly

Remotion is free for individuals and small teams; companies above the threshold
need a paid company licence. Before shipping anything commercial, read
`remotion-license/REFERENCE.md` and the pricing page. Do not assume "open source"
means "free for a business".

## Known gaps in this package

These links point to files that are not in this package (checked 2026-11-21, 22 links in 8 files). Do not follow them; use `remotion-docs` to search the live docs instead.

- Missing folders: `remotion-studio/`, `remotion-render/`, `remotion-multimedia/` (get-audio-duration, get-video-dimensions, get-video-duration).
- Missing files in `remotion-markup/`: `video-editing.md`, `transitions.md`, `sfx.md`. `remotion-markup/remotion-maps/` holds only an icon and `openai.yaml`; use the top-level `remotion-maps/REFERENCE.md`.
- Pages that contain these links: `remotion-create/REFERENCE.md`, `remotion-interactivity/REFERENCE.md`, `remotion-interactivity/timeline-structure.md`, and in `remotion-markup/`: `audio.md`, `calculate-metadata.md`, `motion-blur.md`, `multi-scene-video.md`, `REFERENCE.md`.
