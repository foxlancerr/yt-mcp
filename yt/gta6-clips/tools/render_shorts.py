"""Render the 4 approved GTA 6 Shorts (CC-licensed sources) with The Runner in the blur band.
usage: python render_shorts.py [cruise|vercetti|beer|details|all]
Layout: blurred copy of the gameplay fills 1080x1920; the real gameplay stays intact in the middle; The Runner and effects only
appear in the blurred band under the gameplay; hook text in the top blur; captions under the gameplay."""
import json, subprocess, sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from runner_engine import render_frames

ROOT = Path(__file__).resolve().parents[1]           # yt/gta6-clips
FONT_B, FONT_I = "C\\:/Windows/Fonts/arialbd.ttf", "C\\:/Windows/Fonts/impact.ttf"
CREAM, RED, GREY = "0xF5F5DC", "0xFF0000", "0xAAAA96"
R = "red"

SHORTS = {
 "cruise": dict(
  idea="lunar-cruise-ship", vid="OnWC__OxyTk", start=174.0, dur=30.0, layout="h",
  hook=("3 STARS ON", "A CRUISE SHIP"),
  caps=[(0.3, 3.8, "Already at 3 stars. Running."), (4.0, 10.0, "Across the open deck"), (10.5, 14.5, "Security closes in"),
        (14.8, 19.6, "A struggle at the railing"), (19.8, 26.0, "Rifle up, he fights back"), (26.2, 30.0, "Still moving. Still 3 stars.")],
  beats=[dict(t0=0, t1=3, mode="walk", speed=1.6, fx=["exclaim"]), dict(t0=3, t1=10.5, mode="walk", speed=1.8, fx=["sweat"]),
         dict(t0=10.5, t1=14.5, mode="shake", fx=["exclaim", "sweat"]), dict(t0=14.5, t1=19.5, mode="shiver", fx=["sweat", "anger"]),
         dict(t0=19.5, t1=26, mode="bounce", fx=["anger"]), dict(t0=26, t1=30, mode="walk", speed=0.8, fx=["breath", "sweat"])],
  bubbles=[(14.8, 17.5, "HEY!"), (19.8, 22.6, "FIGHT BACK!")],
  caption_text="3 wanted stars on a GTA 6 cruise ship: a chase, a cop and a rifle. Real gameplay from LunarGaming (CC BY).",
  tags="#gta6 #gtavi #gaming #gta6gameplay #shorts"),
 "vercetti": dict(
  idea="lunar-vercetti-early", vid="TPF8W1_mk7I", start=7.0, dur=25.0, layout="h",
  hook=("TOMMY'S MANSION", "TOO EARLY?"),
  caps=[(0.3, 2.4, "Riding to the Vercetti Estate"), (2.5, 5.2, "Past the gatehouse"), (5.4, 10.6, "Down a quiet road"),
        (10.8, 15.5, "Crime reported!"), (17.0, 21.5, "Up the driveway"), (21.8, 25.0, "On foot at the mansion")],
  beats=[dict(t0=0, t1=3, mode="walk", speed=1.2, fx=["question"]), dict(t0=3, t1=7.5, mode="walk", speed=1.4, fx=[]),
         dict(t0=7.5, t1=10.8, mode="walk", speed=1.8, fx=[]), dict(t0=10.8, t1=16.8, mode="shake", fx=["exclaim", "sweat"]),
         dict(t0=16.8, t1=21.5, mode="walk", speed=1.5, fx=["question"]), dict(t0=21.5, t1=25, mode="jump", fx=["hearts"])],
  bubbles=[(11.0, 13.4, "UH OH!")],
  caption_text="Riding to Tommy Vercetti's mansion early in GTA 6. Real gameplay from LunarGaming (CC BY).",
  tags="#gta6 #gtavi #vicecity #gaming #shorts"),
 "beer": dict(
  idea="vandal-beer-drunk", vid="8IyAE72VaXQ", start=12.2, dur=15.2, layout="v",
  hook=("TOO MANY BEERS", "IN GTA 6?"),
  caps=[(0.1, 1.9, "But as you keep drinking,"), (1.9, 3.1, "you stop earning focus"), (3.2, 5.2, "the screen starts to blur"),
        (5.2, 6.4, "with a color filter"), (7.3, 8.8, "and the camera starts moving"), (8.8, 12.3, "walking gets wobbly"),
        (12.5, 15.0, "jump, and he falls ridiculously")],
  beats=[dict(t0=0, t1=3.2, mode="walk", speed=1.2, fx=["hearts"]), dict(t0=3.2, t1=7.3, mode="sway", fx=["dizzy"]),
         dict(t0=7.3, t1=12.5, mode="sway", fx=["dizzy", "sweat"]), dict(t0=12.5, t1=14.4, mode="trip", fx=["sweat"]),
         dict(t0=14.4, t1=15.2, mode="laugh", fx=["haha"])],
  bubbles=[(8.9, 11.4, "WOBBLY!")],
  caption_text="What happens if you drink too much beer in GTA 6? Original video by Vandal (CC BY), Spanish voiceover with English captions (machine-translated).",
  tags="#gta6 #gtavi #gaming #funny #shorts"),
 "details": dict(
  idea="vandal-5-details", vid="dSUN8AgrRso", start=18.6, dur=15.2, layout="v",
  hook=("PHONE WHILE DRIVING", "IN GTA 6"),
  caps=[(0.1, 2.3, "He pulls out his phone while driving"), (2.3, 5.2, "the camera focuses on it"), (5.2, 7.2, "so he crashes, like real life"),
        (7.2, 9.4, "You can hold hands"), (9.4, 12.7, "walking together through the city"), (12.7, 15.2, "and a mechanic lets you hug")],
  beats=[dict(t0=0, t1=2.3, mode="walk", speed=1.3, fx=["question"]), dict(t0=2.3, t1=5.2, mode="shiver", fx=["sweat", "exclaim"]),
         dict(t0=5.2, t1=7.2, mode="shake", fx=["exclaim", "anger"]), dict(t0=7.2, t1=12.7, mode="dance", fx=["hearts"]),
         dict(t0=12.7, t1=14.2, mode="bounce", fx=["hearts"]), dict(t0=14.2, t1=15.2, mode="walk", speed=0.7, fx=["breath"])],
  bubbles=[(12.8, 14.4, "AWW!")],
  caption_text="Phone while driving, hand holding and hugs in GTA 6. Original video by Vandal (CC BY), Spanish voiceover with English captions (machine-translated).",
  tags="#gta6 #gtavi #gaming #gta6details #shorts"),
}


def probe(path):
    r = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height",
                        "-of", "json", str(path)], capture_output=True, text=True)
    s = json.loads(r.stdout)["streams"][0]; return s["width"], s["height"]


def dt(textfile, font, color, size, x, y, en, extra=""):
    return (f"drawtext=fontfile='{font}':textfile={textfile}:fontcolor={color}:fontsize={size}:x={x}:y={y}:"
            f"enable='between(t,{en[0]},{en[1]})'{extra}")


def render(key):
    c = SHORTS[key]
    if c.get("events"):                                    # optional: reactions chosen from real events by reaction_engine
        from reaction_engine import events_to_beats
        beats, bubbles, _plan = events_to_beats(c["events"]); c = dict(c, beats=beats, bubbles=bubbles)
    d = ROOT / "clips" / c["idea"]; E = d / "edit"; E.mkdir(exist_ok=True)
    src = d / "raw" / "source.mp4"; dur = c["dur"]
    sw, sh = probe(src)
    if c["layout"] == "h":
        FW, FH, FX, FY = 1080, 608, 0, 290
        cap_y, cap_sz, BY = 925, 52, 990
        runner_h, ground = 620, 60
        hook_y, hook_sz = 70, 84
    else:
        FH = 1100; FW = int(round(sw * FH / sh / 2) * 2); FX = (1080 - FW) // 2; FY = 190
        cap_y, cap_sz, BY = 1300, 46, 1335
        runner_h, ground = 430, 40
        hook_y, hook_sz = 18, 70
    BH = 1920 - BY
    chain = []
    for i, (txt, col, yy) in enumerate(((c["hook"][0], CREAM, hook_y), (c["hook"][1], RED, hook_y + hook_sz + 8))):
        f = E / f"hook{i}.txt"; f.write_bytes(txt.encode("utf-8"))
        chain.append(dt(f.name, FONT_I, col, hook_sz, "(w-text_w)/2", yy, (0, 3.0), ":borderw=6:bordercolor=black"))
    for i, (a, b, t) in enumerate(c["caps"]):
        f = E / f"cap{i}.txt"; f.write_bytes(t.encode("utf-8"))
        chain.append(dt(f.name, FONT_B, CREAM, cap_sz, "(w-text_w)/2", cap_y, (a, b), ":borderw=5:bordercolor=black"))
    tag = E / "tag.txt"; tag.write_bytes("THE UNTOLD EXIT  |  Look Beyond What Seems Obvious.".encode())
    chain.append(dt(tag.name, FONT_B, GREY, 26, "(w-text_w)/2", 1880, (0, dur)))
    chain.append(f"fade=t=in:st=0:d=0.3,fade=t=out:st={dur-0.4:.2f}:d=0.4")
    fc = (f"[0:v]fps=30,split=2[a][b];"
          f"[a]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,boxblur=28:3,eq=brightness=-0.12:saturation=0.9[bg];"
          f"[b]scale={FW}:{FH}[fg];[bg][fg]overlay={FX}:{FY}[v1];[v1][1:v]overlay=0:{BY}:format=auto,format=yuv420p," + ",".join(chain) + "[v];"
          f"[0:a]afade=t=in:st=0:d=0.2,afade=t=out:st={dur-0.5:.2f}:d=0.5[a]")
    out = d / "final.mp4"
    cmd = ["ffmpeg", "-y", "-ss", str(c["start"]), "-t", str(dur), "-i", str(src),
           "-f", "rawvideo", "-pix_fmt", "rgba", "-s", f"1080x{BH}", "-framerate", "30", "-i", "pipe:0",
           "-filter_complex", fc, "-map", "[v]", "-map", "[a]", "-t", f"{dur}", "-r", "30",
           "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "160k", str(out)]
    log = open(E / "ffmpeg.log", "wb")                       # log to a file: a full stderr pipe would block ffmpeg
    p = subprocess.Popen(["ffmpeg", "-loglevel", "error", "-nostats"] + cmd[1:], stdin=subprocess.PIPE, stderr=log, cwd=str(E))
    for fr in render_frames(dur, 30, (1080, BH), c["beats"], c["bubbles"], runner_h=runner_h, ground=ground):
        p.stdin.write(fr.tobytes())
    p.stdin.close(); p.wait(); log.close()
    if p.returncode != 0:
        print(key, "FAILED", (E / "ffmpeg.log").read_text(errors="replace")[-800:]); return False
    (ROOT / "output").mkdir(exist_ok=True)
    (ROOT / "output" / f"gta6-{c['idea']}.mp4").write_bytes(out.read_bytes())
    link = f"https://www.youtube.com/watch?v={c['vid']}"
    (d / "caption.md").write_text(f"{c['caption_text']}\n\nSource: {link}\nLicense: Creative Commons Attribution (YouTube CC BY). Edited with commentary captions and animation by The Untold Exit.\n\n{c['tags']}\n", encoding="utf-8")
    (d / "source.md").write_text(
        f"# Source\n\n- URL: {link}\n- License: YouTube Creative Commons (verified `status.license=creativeCommon` by API, 2026-11-20)\n"
        f"- Window used: {c['start']:.1f}s to {c['start']+dur:.1f}s ({dur:.1f}s)\n- Credit: in caption text\n"
        f"- Open items: CC label is uploader-set; game audio/music under the footage was not cleared separately. "
        f"Vandal sources have burned-in Spanish captions. Captions in this Short are the Untold Exit's own commentary"
        f"{' and a machine translation of the Spanish voiceover' if c['layout']=='v' else ''}.\n", encoding="utf-8")
    print(key, "ok", out.stat().st_size // 1024, "KB"); return True


if __name__ == "__main__":
    keys = list(SHORTS) if len(sys.argv) < 2 or sys.argv[1] == "all" else sys.argv[1:]
    for k in keys:
        render(k)
