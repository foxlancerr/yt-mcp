"""Build the Runner animation library: one folder per animation under tools/sprites/<name>/ with transparent PNG frames.
usage: python make_animation_library.py [name ...]      (no names = all)
Never overwrites a folder that already has frames (love/ was empty, walk/ and mood/ are the user's and are skipped).
Each folder gets: f001.png ... (RGBA, 800x800, 30 fps), manifest.json, _sheet.png (contact sheet for a quick look).
Uses the existing engine (runner_engine.render_frames), so the character is never redrawn: same walk sprites, same effects."""
import json, sys
from pathlib import Path
from PIL import Image

sys.path.insert(0, str(Path(__file__).parent))
from runner_engine import render_frames

SPR = Path(__file__).parent / "sprites" / "animations"
SIZE, FPS, RH, GROUND = (1100, 1100), 30, 560, 50   # canvas is larger than the Runner so hearts, breath, kisses and bubbles are never cut off

# name -> (seconds, beat dict, bubbles, purpose)
LIB = {
 "love":      (3.33, dict(mode="dance", fx=["hearts"], speed=1.0), [(0.3, 1.6, "AWW!")], "Heart bubbles float up while he sways. Use on a sweet, wholesome or loved moment. 3.33s = two full heart cycles (loops)."),
 "laugh":     (2.0,  dict(mode="laugh", fx=["haha"]), [], "Bouncing laugh with a HA HA bubble. Use after a fail or a joke."),
 "shock":     (1.6,  dict(mode="shake", fx=["exclaim", "sweat"]), [(0.2, 1.5, "NO WAY!")], "Shaking with !! and sweat. Use on a surprise or crash."),
 "curiosity": (2.4,  dict(mode="tilt", fx=["question"]), [(0.2, 2.2, "WAIT...?")], "Head tilt with a bouncing ?. The curiosity hook: plays in the first 1-2s before the reveal."),
 "reveal":    (1.6,  dict(mode="pop", fx=["exclaim", "star3"]), [(0.0, 1.4, "LOOK!")], "Pop-in scale with stars and !!. The pay-off beat right after a curiosity gap."),
 "nervous":   (2.4,  dict(mode="shiver", fx=["sweat", "question"]), [], "Shivering with sweat drops and ?. Use for suspense and risk."),
 "angry":     (2.0,  dict(mode="shake", fx=["anger"]), [(0.2, 1.8, "HEY!")], "Shaking with anger marks. Use for conflict or getting caught."),
 "dizzy":     (3.0,  dict(mode="sway", fx=["dizzy"]), [], "Swaying with spinning stars. Use for drunk or hit moments."),
 "relief":    (3.0,  dict(mode="walk", fx=["breath", "sweat"], speed=0.7), [], "Slow walk with a breath puff. Use at the end of a tense clip (loop-out beat)."),
 "dance":     (3.0,  dict(mode="dance", fx=["hearts", "star3"]), [], "Full dance with hearts and stars. Use for a win or a celebration."),
 "fall":      (2.2,  dict(mode="trip", fx=["sweat"]), [(0.9, 2.1, "OOF!")], "Trip and fall, then back up. Use for a fail."),
 "suspense":  (2.4,  dict(mode="freeze", fx=["sweat", "question"]), [], "Frozen pose with sweat and ?. A held beat before a payoff (the pause that builds the gap)."),
 # --- not walking: standing, peeking, drooping, recoiling, hopping (all from the user's own walk frames; no new art)
 "idle":       (3.0, dict(mode="idle", fx=[]), [], "Standing still, breathing (squash and stretch). Base for sitting-still moments and commentary corners."),
 "yay":         (2.4, dict(mode="celebrate", fx=["confetti"]), [(0.2, 2.2, "YAY!")], "Big hop with confetti. Win or achievement."),
 "letsgo":      (2.4, dict(mode="celebrate", fx=["star3"]), [(0.2, 2.2, "LET'S GO!")], "Hop with stars. Hype beat before something big."),
 "kisses":      (2.4, dict(mode="idle", fx=["kiss"]), [(0.2, 2.0, "MUAAH!")], "Standing, blowing kisses with hearts. Loving comment or thank-you."),
 "heart_eyes":  (2.0, dict(mode="idle", fx=["heart_eyes"]), [(0.3, 1.8, "SO PRETTY!")], "Standing with heart eyes popping. Gorgeous visual."),
 "cry_laugh":   (2.4, dict(mode="laugh", fx=["haha", "tears"]), [], "Laughing with tears. A very funny fail."),
 "sad":         (2.6, dict(mode="droop", fx=["tears"]), [(0.3, 2.4, "OH NO!")], "Sinks down with tears. Mission failed, loss."),
 "recoil":      (1.6, dict(mode="recoil", fx=["exclaim"]), [(0.1, 1.5, "WHAT?!")], "Snaps backwards in shock. Sudden event."),
 "peek":        (3.0, dict(mode="peek", fx=["question"]), [(1.0, 2.8, "...?")], "Rises from the bottom edge and peeks, then sinks. Curiosity, hide-and-seek, sneaking."),
 "thumbs":      (2.0, dict(mode="idle", fx=["thumbs"]), [(0.2, 1.8, "NICE!")], "Standing with a thumbs-up mark. Approval."),
}


def build(name):
    dur, beat, bubbles, why = LIB[name]
    d = SPR / name; d.mkdir(parents=True, exist_ok=True)
    if any(d.glob("f*.png")):
        print(name, "has frames, skipped"); return
    beat = dict(beat, t0=0, t1=dur)
    frames = []
    for i, fr in enumerate(render_frames(dur, FPS, SIZE, [beat], bubbles, runner_h=RH, ground=GROUND), 1):
        fr.save(d / f"f{i:03d}.png"); frames.append(fr)
    n = len(frames); pick = [frames[int(k * (n - 1) / 5)] for k in range(6)]
    sheet = Image.new("RGB", (6 * 200, 200), (0, 0, 0))
    for k, f in enumerate(pick):
        t = f.resize((200, 200)); sheet.paste(t, (k * 200, 0), t)
    sheet.save(d / "_sheet.png")
    (d / "manifest.json").write_text(json.dumps(dict(name=name, frames=n, fps=FPS, seconds=dur, size=list(SIZE), mode=beat["mode"],
        effects=beat["fx"], char_frac=round(RH / SIZE[1], 4), edge_anchored=(name == "peek"), bubbles=[b[2] for b in bubbles], use=why, note="RGBA PNG sequence, transparent background. Overlay with ffmpeg: -framerate 30 -i f%03d.png"), indent=2), encoding="utf-8")
    print(name, n, "frames ok")


if __name__ == "__main__":
    for nm in (sys.argv[1:] or list(LIB)):
        build(nm)
