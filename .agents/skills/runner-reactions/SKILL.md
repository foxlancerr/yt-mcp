---
name: runner-reactions
description: Use when a Short, clip or story needs The Runner (the channel mascot) to react to real gameplay, dialogue or audience comments with frame-by-frame animations, emoji and reaction words. Local skill, no MCP needed.
---

# Runner reactions

The Runner is an expressive reaction mascot inside the Short: it reacts to what actually happens on screen or in a comment, never at random. It is never redesigned. All art comes from the user's own walk frames and storyboard sheets, plus flat emoji drawn in the locked palette.

## Where things live (`yt/gta6-clips/tools/`)

| Path | What |
|---|---|
| `sprites/character/walk`, `sprites/character/mood` | The user's source frames. Never edit or overwrite. |
| `sprites/animations/<name>/f001.png...` | Transparent frame-by-frame reactions (800x800, 30 fps) + `manifest.json` + `_sheet.png`. Includes non-walking ones: `idle`, `peek`, `sad`, `recoil`, `yay`, `kisses`, `heart_eyes`, `thumbs`. |
| `sprites/emoji/<name>/` | 21 flat 2D emoji, each `still.png` + 30 pop-in frames. |
| `sprites/words/reaction_words.json` | Reaction words by emotion, with the animation, emoji, mode and effects to use. |
| `reaction_engine.py` | Picks the emotion from a real event (keyword and tag rules). No match = no reaction. |
| `reaction_kit.py` | FFmpeg overlay: slide in/out, corner placement, character about 18% of screen height. |
| `make_animation_library.py`, `make_emoji_library.py` | Rebuild or add animations and emoji. Never overwrite a folder that has frames. |
| `runner_engine.py` | The frame engine (modes, effects, bubbles) used by the band layout in `render_shorts.py`. |

## Rules (every Short)

1. **Match the moment.** Each reaction needs an event: what happened in the footage, what the streamer said, or the audience comment. Write the event in `why`. No event, no reaction. Never random.
2. **Size and place:** 12-20% of screen height, in a fixed corner or the blur band under the gameplay. Never cover the gameplay, the hook text or the captions.
3. **Timing:** 0.5-2s per reaction, 0.8s minimum gap between two, slide in and out (0.25s each). One emoji at most per reaction.
4. **Hook:** use `curiosity` or `peek` in the first 1-2s only when the video really pays the question off. Use `reveal` or `yay` for the payoff and `relief` or `suspense` for loop endings.
5. **Palette and brand:** black, cream, dark red, red, light red and the one green only. No gradients. The brand is The Untold Exit, never "OhBhai!" (the old sheets carry that label: do not copy it).
6. **No new character art:** if a pose does not exist (for example sitting), say so and ask. Do not redraw the Runner. Do not use the extracted `mood/` stills mid-clip: they are cropped and inconsistent with the walk frames.
7. **Verify:** after rendering, check resolution, frame rate, audio sync and one frame during each reaction before saying it worked.

## Use

```
# plan only (what would react, and why)
python reaction_kit.py clip.mp4 events.json out.mp4 br 0.18
# in render_shorts.py: add "events": [...] to a SHORTS entry; reactions then come from reaction_engine
```

Event format: `{"t0": 3.2, "kind": "gameplay|dialogue|comment", "text": "...", "tags": []}`.

## Comment map (examples already in the rules)

"Love your videos" -> `love` (hearts, kisses) · "This is insane" -> `happy` (confetti) · "LOL" -> `laugh` · "No way" -> `shock` · "Part 2 please" -> `happy` (hop) · "mission failed" -> `sad`.

## End-screen CTA (last 3.2 s of every Short)

The Runner talks to viewers in the bottom band while the payoff stays visible above. Code: `yt/gta6-clips/tools/cta_kit.py`; wording: `tools/sprites/cta/cta_templates.json` (edit freely, `*word*` = red).

1. **Smart choice, never one generic CTA.** `cta_kit.choose()` reads the clip's real reaction plan (the last two reactions weigh most), its captions and a `cliffhanger` flag, then picks a type: funny -> "Did you laugh? LIKE!", unexpected -> "Did you see that coming?" / TEAM YES or NO, fail -> "Can you do better? COMMENT!", achievement -> "LIKE if that was insane!", emotional -> "Would you have waited? COMMENT!", cliffhanger -> "SUBSCRIBE" / "PART 2? You decide!". It skips the last 3 wordings used (`cta_history.json`).
2. **Presets (graphic):** `subscribe` (cursor clicks, button turns SUBSCRIBED, bell rings), `like` (button turns red, hearts and stars burst), `comment` (typing dots, then the reply lands), `next` (video card slides in, editable label such as PART 2), `team` (YES / NO).
3. **Gestures (the Runner's own standing frame, never redrawn):** point (lean + bobbing arrow; there is no arm art, so it is a lean), thumbs, wave (rocks), celebrate (hop + confetti), curious (tilt + ?), laugh. Sound effects come from `gta6-clipper/sounds` (whoosh, ding, vine_boom, bass_drop).
4. **Loop:** `cta=dict(loop=True)` adds a "REPLAY: <hook line 2>" strip in the last second, so the end points back to the opening.
5. **In a clip config** (`speed_clips.py` / `render_reaction_short.py`): add `cta=dict(loop=True)` (optional `cliffhanger=True`, `text=`, `preset=`). Reactions stop 0.1 s before the CTA. `python render_reaction_short.py <key> --cta` writes `final_cta.mp4` instead. `REUSE_BASE=1` skips the slow base render when only reactions or the CTA changed.
6. **Library and preview:** `python cta_kit.py preview` rebuilds `sprites/cta/<preset>/` (transparent RGBA PNG sequences, 1080x430), `_cta_sheet.png` and `_cta_preview.mp4`.

## Local wiring

- **Runs after:** `visual-style` (palette and character law), `story-pipeline` stage 3 (storyboard beats), `script-breakdown` (re-hook points).
- **Runs with:** `thumbnail-hooks` (same emoji language), `gta6-clipper` moments (the events).
- **Gate:** nothing is published without the user's yes. Reactions never state a fact the footage does not show.
- **Not installed:** Remotion. The pipeline is Python + Pillow + FFmpeg. Ask before adding Remotion (large download).
