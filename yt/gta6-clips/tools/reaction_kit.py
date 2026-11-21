"""Reusable reaction overlay: composites the Runner's pre-rendered animation frames (and a pop-in emoji) onto any video with FFmpeg.
usage (module): from reaction_kit import overlay; overlay("in.mp4", events, "out.mp4", corner="br", height_frac=0.18)
usage (CLI):    python reaction_kit.py in.mp4 events.json out.mp4 [corner=br|bl|band] [height_frac=0.18]
events.json = [{"t0":1.0,"kind":"gameplay","text":"police chase starts"}, ...]. reaction_engine.plan() chooses the emotion; events with
no matching emotion get no reaction. Every reaction slides in (0.25s) and out (0.25s) and is clipped to the animation's own length.
The character stays about height_frac of the screen tall (default 18%) and sits in a corner so gameplay and captions stay visible."""
import json, subprocess, sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import reaction_engine

SPR = Path(__file__).parent / "sprites"



def _probe(path):
    from media_probe import probe
    r = probe(path); return r["width"], r["height"], r["duration"]


def build_cmd(src, plan, out, corner="br", height_frac=0.18, with_emoji=True, emoji_beside=False, stop_at=None):
    W, H, dur = _probe(src)
    if stop_at: dur = min(dur, stop_at)             # reactions end before the end-screen CTA starts
    margin = int(0.03 * W)
    ins0 = None
    ins, fcs, last, n = ["-i", str(src)], [], "[0:v]", 1
    for i, q in enumerate(plan):
        adir = SPR / "animations" / q["animation"]; man = json.loads((adir / "manifest.json").read_text(encoding="utf-8"))
        side = int(round(height_frac * H / man["char_frac"] / 2) * 2)                 # canvas side so the Runner is height_frac of the screen tall
        esz = int(round(height_frac * H * 0.55 / 2) * 2)
        X = {"br": W - side - margin, "bl": margin, "band": (W - side) // 2}.get(corner, W - side - margin)
        Y = (H - side) if man.get("edge_anchored") else (H - side - int(0.02 * H))   # a peeking Runner hides behind the real bottom edge
        t0 = q["t0"]; t1 = min(q["t1"], t0 + man["seconds"], dur); L = t1 - t0
        if L < 0.4:
            continue
        ins += ["-framerate", str(man["fps"]), "-i", str(adir / "f%03d.png")]
        fcs.append(f"[{n}:v]format=rgba,scale={side}:{side},fade=t=in:st=0:d=0.2:alpha=1,fade=t=out:st={L - 0.2:.2f}:d=0.2:alpha=1,setpts=PTS-STARTPTS+{t0}/TB[a{i}]")
        yexpr = f"{Y}+if(lt(t,{t0}+0.2),({t0}+0.2-t)/0.2*{int(0.02 * H)},0)"            # tiny rise while fading in: always on screen
        fcs.append(f"{last}[a{i}]overlay=x={X}:y='{yexpr}':enable='between(t,{t0},{t1})':eof_action=pass[v{i}]"); last = f"[v{i}]"; n += 1
        if with_emoji and q.get("emoji"):
            edir = SPR / "emoji" / q["emoji"]
            if edir.exists():
                ins += ["-framerate", "30", "-i", str(edir / "f%03d.png")]
                cx = X + side // 2                                  # the Runner is centred in his canvas; put the emoji beside the head, level with it
                ex = cx - int(0.27 * side) - esz if (corner != 'bl' and emoji_beside) else cx + int(0.20 * side)
                ey = Y + int(0.55 * side) - esz // 2 - int(0.10 * side)
                ex = max(0, min(W - esz, ex)); ey = max(0, min(H - esz, ey))            # always fully on screen
                fcs.append(f"[{n}:v]format=rgba,scale={esz}:{esz},setpts=PTS-STARTPTS+{t0 + 0.2}/TB[e{i}]")
                fcs.append(f"{last}[e{i}]overlay=x={ex}:y={ey}:enable='between(t,{t0 + 0.2},{min(t1, t0 + 0.2 + 1.0)})':eof_action=pass[w{i}]"); last = f"[w{i}]"; n += 1
    if not fcs:
        return None
    fc = ";".join(fcs); assert fc.endswith(last); fc = fc[: -len(last)] + "[vout]"
    return ["ffmpeg", "-y", "-loglevel", "error", *ins, "-filter_complex", fc, "-map", "[vout]", "-map", "0:a?", "-c:v", "libx264", "-preset", "medium", "-crf", "20",
            "-pix_fmt", "yuv420p", "-c:a", "copy", str(out)]


def overlay(src, events, out, corner="br", height_frac=0.18, with_emoji=True, emoji_beside=False, stop_at=None):
    plan = reaction_engine.plan(events)
    cmd = build_cmd(src, plan, out, corner, height_frac, with_emoji, emoji_beside, stop_at)
    if cmd is None:
        print("no matching reactions: nothing added"); return plan
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        raise RuntimeError(r.stderr[-1500:])
    return plan


if __name__ == "__main__":
    a = sys.argv; ev = json.loads(Path(a[2]).read_text(encoding="utf-8"))
    pl = overlay(a[1], ev, a[3], a[4] if len(a) > 4 else "br", float(a[5]) if len(a) > 5 else 0.18)
    for q in pl: print(f"{q['t0']:>5}s {q['emotion']:<9} {q['word']:<12} anim={q['animation']} emoji={q['emoji']}  <- {q['why']}")
