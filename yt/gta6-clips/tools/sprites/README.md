# Runner sprite library

One folder per animation. Each folder holds transparent PNG frames (`f001.png`, ...), `manifest.json` (fps, frame count, purpose) and `_sheet.png` (6-frame preview).

| Folder | What it shows | Use it for |
|---|---|---|
| `walk/` | Your original 240-frame walk cycle (source for everything below, untouched) | Base movement |
| `mood/` | Your 10 mood poses (angry, confused, determined, excited, fearful, hurt, neutral, sad, shocked) | Still reaction cut-ins |
| `love/` | Dance sway + cream hearts floating up + "AWW!" bubble (3.33s, loops) | Wholesome or loved moments |
| `laugh/` | Bouncing laugh + HA HA bubble | After a fail or a joke |
| `shock/` | Shake + !! + sweat + "NO WAY!" | Surprise, crash |
| `curiosity/` | Head tilt + bouncing ? + "WAIT...?" | **Curiosity hook**, first 1-2s |
| `reveal/` | Pop-in + stars + !! + "LOOK!" | Pay-off right after a curiosity gap |
| `nervous/` | Shiver + sweat + ? | Suspense, risk |
| `angry/` | Shake + anger marks + "HEY!" | Conflict, getting caught |
| `dizzy/` | Sway + spinning stars | Drunk or hit moments |
| `relief/` | Slow walk + breath puff | Loop-out ending |
| `dance/` | Dance + hearts + stars | Win, celebration |
| `fall/` | Trip, fall, get up + "OOF!" | Fails |
| `suspense/` | Frozen pose + sweat + ? | The held beat before a payoff |

Rebuild or add one: edit `LIB` in `../make_animation_library.py`, then `python make_animation_library.py <name>`. A folder that already has frames is never overwritten (delete it to rebuild).

Overlay on a video: `ffmpeg -i clip.mp4 -framerate 30 -i love/f%03d.png -filter_complex "[0][1]overlay=x:y:shortest=1" out.mp4`

The `.png` files are git-ignored by the repo's rule for `yt/gta6-clips`.
