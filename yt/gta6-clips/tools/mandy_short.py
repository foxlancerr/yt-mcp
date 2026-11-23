"""Mandy Part 3 Short: "Mandy Cried. Then She Threatened Jason." Built from yt/story/gta6-mandy-crying-part3/story.md.
Footage: Punish's 1080p capture FJOXuas-OBg (clean, no overlays), crying scene 5:52-6:08. Crops are head-and-shoulders only (the story's rule: no bikini framing).
Cards (sink, trunk, yard, photo, text) are flat 2D pictures drawn here in the locked palette. Then: SFX mix -> Runner reactions -> end CTA.
usage: python mandy_short.py [--cards-only] [--no-cta]"""
import json, subprocess, sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

sys.path.insert(0, str(Path(__file__).parent))
from render_reaction_short import zoom_chain
import reaction_kit

ROOT = Path(__file__).resolve().parents[1]
D = ROOT / "clips" / "mandy-cried"; RAW = D / "raw"; E = D / "edit"; E.mkdir(exist_ok=True); CARDS = E / "cards"; CARDS.mkdir(exist_ok=True)
SRC = RAW / "punish.mkv"
SOUNDS = ROOT.parents[1] / ".agents" / "skills" / "gta6-clipper" / "sounds"
FB, FI = "C\\:/Windows/Fonts/arialbd.ttf", "C\\:/Windows/Fonts/impact.ttf"
CREAM, RED, DRED, BLACK = (245, 245, 220), (255, 0, 0), (139, 0, 0), (0, 0, 0)
IMPACT = "C:/Windows/Fonts/impact.ttf"
MOOD = ROOT / "tools" / "sprites" / "character" / "mood"
W, H = 1080, 1920


# ------------------------------------------------------------------------------------------------------------------ 2D cards
def font(sz): return ImageFont.truetype(IMPACT, sz)


def text_c(d, y, s, sz, fill, ow=8):
    f = font(sz)
    while d.textlength(s, font=f) > 960 and sz > 40: sz -= 4; f = font(sz)
    w = d.textlength(s, font=f); d.text(((W - w) / 2, y), s, font=f, fill=fill, stroke_width=ow, stroke_fill=BLACK)


def new(): im = Image.new("RGB", (W, H), BLACK); return im, ImageDraw.Draw(im)


def runner(im, mood, h, x, y):
    r = Image.open(MOOD / f"{mood}.png").convert("RGBA"); r = r.resize((int(r.width * h / r.height), h), Image.LANCZOS); im.paste(r, (x, y), r)


def ol(d, shape, fill, kind="rect", w=7, r=24):       # flat fill, thick black-ish outline (cream on black needs a red/cream rim, so the outline is dark red)
    if kind == "rect": d.rounded_rectangle(shape, radius=r, fill=fill, outline=DRED, width=w)
    elif kind == "ell": d.ellipse(shape, fill=fill, outline=DRED, width=w)
    else: d.polygon(shape, fill=fill, outline=DRED)


def card_text(name, l1, l2=None, c1=CREAM, c2=RED, mood=None):
    outs = []
    for k, lines in enumerate([[(l1, c1)]] + ([[(l1, c1), (l2, c2)]] if l2 else [])):
        im, d = new()
        for j, (s, c) in enumerate(lines): text_c(d, 640 + j * 210, s, 150 if len(s) < 16 else 112, c)
        if mood: runner(im, mood, 420, 80, 1380)
        p = CARDS / f"{name}_{k}.png"; im.save(p); outs.append(p)
    return outs


def card_sink():
    im, d = new()
    ol(d, (180, 860, 900, 1160), CREAM, r=70)                       # basin
    ol(d, (240, 900, 840, 1100), (30, 30, 30), r=50, w=5)
    ol(d, (500, 640, 580, 880), CREAM)                              # faucet column
    ol(d, (500, 640, 760, 720), CREAM, r=34)                        # faucet spout
    ol(d, (440, 1160, 640, 1500), CREAM, r=18)                      # pipe
    ol(d, (410, 1230, 670, 1300), CREAM, r=28)                      # trap bend
    ol(d, (520, 1320, 880, 1400), (232, 200, 170), r=38)            # the finger lying on the pipe
    ol(d, (800, 1328, 870, 1392), (255, 235, 220), r=20, w=5)       # nail
    ol(d, (760, 1380, 880, 1420), RED, r=20, w=0)                   # red tip
    d.rounded_rectangle((250, 520, 830, 640), radius=18, fill=RED, outline=BLACK, width=6)
    text_c(d, 520, "REPORTED", 100, CREAM, ow=4)
    text_c(d, 1580, "THE SINK", 96, CREAM)
    p = CARDS / "sink.png"; im.save(p); return [p]


def card_trunk():
    outs = []
    for k in range(3):
        im, d = new(); d.polygon([(100, 1020), (980, 1020), (940, 1500), (140, 1500)], fill=(40, 40, 40), outline=CREAM)       # open trunk
        d.polygon([(100, 1020), (980, 1020), (880, 640), (200, 640)], fill=(25, 25, 25), outline=CREAM)                       # lid
        if k == 0:       # cleaver + tape
            ol(d, (300, 1160, 700, 1260), CREAM, r=14); ol(d, (640, 1180, 860, 1240), (120, 80, 40), r=18)
            ol(d, (680, 1290, 880, 1490), CREAM, "ell"); ol(d, (740, 1350, 820, 1430), BLACK, "ell")
            lab = "CLEAVER. TAPE."
        elif k == 1:     # acid
            ol(d, (360, 1090, 700, 1490), RED, r=40); ol(d, (450, 1020, 610, 1100), CREAM, r=12)
            d.polygon([(500, 1230), (560, 1230), (530, 1360)], fill=BLACK); text_c(d, 1180, "ACID", 70, CREAM, ow=0)
            lab = "BATTERY ACID."
        else:            # rope + loppers
            for r_ in range(5): ol(d, (260 + r_ * 18, 1180 + r_ * 18, 620 - r_ * 18, 1460 - r_ * 18), None, "ell", w=10)
            ol(d, (680, 1080, 760, 1480), CREAM, r=14); ol(d, (820, 1080, 900, 1480), CREAM, r=14)
            lab = "ROPE. LOPPERS."
        text_c(d, 440, "THE TRUNK", 110, CREAM); text_c(d, 1580, lab, 100, RED)
        p = CARDS / f"trunk_{k}.png"; im.save(p); outs.append(p)
    return outs


def card_yard():
    im, d = new()
    d.rectangle((0, 1100, W, H), fill=(22, 18, 16)); d.line((0, 1100, W, 1100), fill=CREAM, width=6)
    d.ellipse((200, 1180, 880, 1380), fill=(10, 4, 4), outline=DRED, width=10)        # the filled-in, body-sized patch
    d.ellipse((260, 1210, 820, 1350), outline=RED, width=7)                              # red circle on the anomaly
    ol(d, (900, 760, 935, 1250), CREAM, r=10); d.polygon([(870, 1250), (965, 1250), (918, 1360)], fill=CREAM, outline=DRED)       # shovel leaning
    ol(d, (90, 1000, 260, 1160), RED, r=28); ol(d, (150, 960, 200, 1010), CREAM, r=8)       # acid tub
    text_c(d, 440, "THE YARD", 130, CREAM); text_c(d, 1450, "FRESH EARTH.", 100, RED)
    p = CARDS / "yard.png"; im.save(p); return [p]


def card_photo():
    im, d = new()
    ol(d, (160, 700, 920, 1300), CREAM, r=10, w=14); d.rectangle((200, 740, 880, 1260), fill=(30, 28, 24))
    for k, (name, x) in enumerate((("JASON", 330), ("MANDY", 540), ("CAL", 750))):      # three flat figures at the Rusty Anchor
        d.ellipse((x - 55, 880, x + 55, 990), fill=CREAM, outline=DRED, width=6); d.rounded_rectangle((x - 70, 1000, x + 70, 1210), radius=40, fill=CREAM, outline=DRED, width=6)
        f = font(44); w = d.textlength(name, font=f); d.text((x - w / 2, 1215), name, font=f, fill=RED, stroke_width=3, stroke_fill=BLACK)
    text_c(d, 440, "A FRAMED PHOTO", 105, CREAM); text_c(d, 1400, "RUSTY ANCHOR", 100, RED)
    p = CARDS / "photo.png"; im.save(p); return [p]


def card_final(name="final"):
    outs = []
    for k, lines in enumerate([[("SHE CRIED.", CREAM)], [("SHE CRIED.", CREAM), ("THEN SHE WARNED HIM.", RED)]]):
        im, d = new()
        for j, (t_, c) in enumerate(lines): text_c(d, 560 + j * 210, t_, 150, c)
        if k:
            f = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 40); t_ = "Look Beyond What Seems Obvious."; w = d.textlength(t_, font=f); d.text(((W - w) / 2, 900), t_, font=f, fill=(170, 170, 150))
        p = CARDS / f"{name}_{k}.png"; im.save(p); outs.append(p)
    return outs


def card_loop():
    im, d = new(); text_c(d, 560, "LOOK BEYOND", 130, CREAM); text_c(d, 740, "WHAT SEEMS OBVIOUS.", 104, RED)
    f = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 40); w = d.textlength("THE UNTOLD EXIT", font=f); d.text(((W - w) / 2, 980), "THE UNTOLD EXIT", font=f, fill=(170, 170, 150))
    p = CARDS / "loop.png"; im.save(p); return [p]


# ------------------------------------------------------------------------------------------------------------------ timeline
# crop modes in the 1920x1080 capture: wide = both heads, face = Mandy's head and shoulders (no body)
WIDE = (430, 235, 900, 450, 540); FACE = (880, 400, 360, 240, 720); JASON = (360, 250, 480, 320, 720); SINK = (0, 0, 1920, 960, 540); PRI1 = (680, 330, 520, 310, 644); PRI2 = (800, 450, 300, 290, 720)         # x, y, w, h, panel height
TITLE = ("MANDY CRIED.", "THEN SHE THREATENED JASON.")
SEGS = [
    dict(k="clip", ss=352.3, d=2.8, mode=WIDE, moves=[(0.0, 2.8, "push", 0.12)], caps=[(0.1, 2.0, 'JASON: "What the hell are you even crying about?"')], title=False),                     # 0 HOOK
    dict(k="clip", ss=354.5, d=0.1, fr=1.3, mode=FACE, moves=[(0.0, 1.4, "push", 0.10)], mono=True, glitch=[(0.0, 0.25), (1.1, 1.4)], pop=(0.1, 1.4, "SHE'S CRYING."), title=False, mute=True),   # 1 FREEZE
    dict(k="clip", ss=354.5, d=3.7, mode=FACE, moves=[(0.0, 0.9, "punch", 0.15), (2.7, 3.7, "punch", 0.15)], caps=[(0.15, 2.0, 'MANDY: "What goes around comes around, you know."'), (2.8, 3.7, "\"You'll get yours, Jason.\"")], pop=(2.8, 3.7, "YOU'LL GET YOURS"), title=True),   # 2 THE THREAT, whole
    dict(k="clip", ss=360.2, d=4.3, mode=WIDE, moves=[(0.0, 4.3, "push", 0.08)], caps=[(0.2, 2.7, 'JASON: "All right, well, that sounds like a you problem, Mandy."'), (2.8, 4.3, 'MANDY: "Just go, Jason."')], title=True),   # 3 dismissal + exit
    dict(k="clip", ss=364.9, d=3.2, mode=JASON, moves=[(0.0, 1.1, "punch", 0.15)], caps=[(0.3, 3.0, 'MANDY: "Oh, I need time, Jason."')], title=True),                                   # 4
    dict(k="card", imgs=lambda: card_text("warn", "THAT WASN'T A BREAKUP.", "IT WAS A WARNING.", mood="determined"), durs=[1.2, 1.4], glitch=[(0.0, 0.2)]),                                 # 5 the one reframe card
    dict(k="clip", ss=183.0, d=3.8, mode=SINK, moves=[(0.0, 3.8, "push", 0.08)], caps=[(0.1, 1.9, "JASON: \"You sure there's nothing blocking this?\""), (2.6, 3.7, 'MANDY: "Um, no? Like, what?"')], pop=(2.0, 3.7, "WHAT'S IN THE SINK?"), title=True, glitch=[(0.0, 0.2)]),   # 6 REAL: the sink scene
    dict(k="clip", ss=186.8, d=3.8, mode=SINK, moves=[(0.0, 1.2, "punch", 0.15), (1.4, 3.8, "push", 0.10)], caps=[(1.4, 3.3, "JASON: \"Guess we'll find out.\"")], title=True),   # 7 REAL
    dict(k="clip", ss=292.4, d=3.4, mode=PRI1, moves=[(0.2, 1.6, "punch", 0.15), (1.6, 3.4, "push", 0.08)], caps=[(0.4, 2.7, "MANDY: \"What does a convict have that I don't have?\"")], pop=(0.4, 2.0, "SHE KNOWS?!"), title=True, glitch=[(0.0, 0.2)]),   # 8 REAL: the prison-wife jealousy
    dict(k="clip", ss=298.9, d=1.7, mode=PRI2, moves=[(0.0, 1.7, "push", 0.12)], caps=[(0.0, 1.65, 'MANDY: "We were supposed to get married."')], pop=(0.0, 1.6, "MARRIED?!"), title=True, flash_hard=[0.0]),   # 9 REAL
    dict(k="clip", ss=353.2, d=3.6, mode=FACE, moves=[(0.0, 3.6, "push", 0.06)], title=False, mute=True),                                                                      # 10 PAYOFF: her face, heartbeat only
    dict(k="clip", ss=356.7, d=3.6, mode=FACE, moves=[(0.5, 1.9, "punch", 0.15), (0.6, 3.4, "shake", 3)], caps=[(0.6, 2.1, "MANDY: \"You'll get yours, Jason.\"")], pop=(2.0, 3.5, "A YOU PROBLEM?"), title=True),    # 11 the echo
    dict(k="card", imgs=card_final, durs=[1.6, 2.2], moves=[(0.0, 3.8, "push", 0.06)]),                                                                                           # 12 final card

]


def dt(f, font_, color, size, x, y, en, extra=""):
    return f"drawtext=fontfile='{font_}':textfile={f}:fontcolor={color}:fontsize={size}:x={x}:y={y}:enable='between(t,{en[0]},{en[1]})'{extra}"


def wrap(s, n=26):
    out, line = [], ""
    for w in s.split():
        if len(line) + len(w) + 1 > n and line: out.append(line); line = w
        else: line = (line + " " + w).strip()
    return "\n".join(out + [line])


def run(cmd, cwd=None):
    r = subprocess.run(cmd, capture_output=True, text=True, cwd=cwd)
    if r.returncode: print("FAILED", " ".join(map(str, cmd))[:200], r.stderr[-1500:]); sys.exit(1)


def effects(s, tot, i):
    """drawtext / mono / glitch / flash layers shared by clip and card segments (all times local to the segment)."""
    ch = []
    for a, b in s.get("glitch", []): ch.insert(0, f"rgbashift=rh=-12:bh=12:gv=5:enable='between(t,{a:.2f},{b:.2f})',noise=alls=38:allf=t:enable='between(t,{a:.2f},{b:.2f})'")
    for ft in s.get("flash_hard", []): ch.append(f"drawbox=x=0:y=0:w=iw:h=ih:color=white@0.95:t=fill:enable='between(t,{ft:.2f},{ft + 0.10:.2f})'")
    if s.get("mono"): ch.insert(0, f"hue=s=0,eq=contrast=1.3:brightness=-0.03")
    return ch


def seg(i, s):
    out = E / f"seg{i:02d}.mp4"
    if s["k"] == "clip":
        cx, cy, cw, chh, ph = s["mode"]; fr = s.get("fr", 0); tot = round(s["d"] + fr, 3)
        ft, ch = [], []
        if s.get("title", True):
            for j, (txt, col, yy, sz) in enumerate(((TITLE[0], "0xF5F5DC", 60, 76), (TITLE[1], "0xFF0000", 150, 60))):
                f = E / f"t{i}_{j}.txt"; f.write_text(txt, encoding="utf-8"); ft.append(dt(f.name, FI, col, sz, "(w-text_w)/2", yy, (0, tot), ":borderw=6:bordercolor=black"))
        for j, (a, b, t) in enumerate(s.get("caps", [])):
            f = E / f"c{i}_{j}.txt"; f.write_text(wrap(t), encoding="utf-8"); ft.append(dt(f.name, FB, "0xF5F5DC", 50, "(w-text_w)/2", 1330, (a, b), ":borderw=6:bordercolor=black:line_spacing=8"))
        if s.get("pop"):
            a, b, t = s["pop"]; f = E / f"p{i}.txt"; f.write_text(t, encoding="utf-8"); ft.append(dt(f.name, FI, "0xFF0000", f"'96+30*max(0,1-(t-{a})*5)'", "(w-text_w)/2", 1130, (a, b), ":borderw=7:bordercolor=black"))
        z = zoom_chain(1080, ph, s.get("moves", []))
        pre = f"tpad=stop_mode=clone:stop_duration={fr}," if fr else ""
        fc = (f"[0:v]fps=30,{pre}split=2[a][b];[a]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,boxblur=30:3,eq=brightness=-0.22:saturation=0.8[bg];"
              f"[b]crop={cw}:{chh}:{cx}:{cy},scale=1080:{ph}:flags=lanczos,setsar=1,{z}[p];[bg][p]overlay=0:{(1920 - ph) // 2 - 60}," + ",".join(["format=yuv420p"] + effects(s, tot, i) + ft) + "[v];")
        vol = "volume=0" if s.get("mute") else "anull"
        fc += f"[0:a]atrim=0:{s['d']},asetpts=PTS-STARTPTS,{vol}" + (f",apad=pad_dur={fr}" if fr else "") + ",aformat=sample_rates=44100:channel_layouts=stereo[aout]"
        run(["ffmpeg", "-y", "-loglevel", "error", "-ss", str(s["ss"]), "-t", str(s["d"]), "-i", str(SRC), "-filter_complex", fc, "-map", "[v]", "-map", "[aout]", "-t", str(tot), "-r", "30",
             "-c:v", "libx264", "-preset", "fast", "-crf", "18", "-c:a", "aac", "-b:a", "160k", str(out)], cwd=str(E))
        return out, tot
    imgs = s["imgs"](); durs = s["durs"]; tot = round(sum(durs), 3)
    parts = []
    for j, (p, dd) in enumerate(zip(imgs, durs)):
        parts.append(E / f"seg{i:02d}_{j}.mp4")
        z = zoom_chain(1080, 1920, [m for m in s.get("moves", []) if True]) if j == 0 else "null"
        run(["ffmpeg", "-y", "-loglevel", "error", "-loop", "1", "-framerate", "30", "-t", str(dd), "-i", str(p), "-f", "lavfi", "-t", str(dd), "-i", "anullsrc=r=44100:cl=stereo",
             "-vf", f"{z},format=yuv420p", "-map", "0:v", "-map", "1:a", "-r", "30", "-c:v", "libx264", "-crf", "18", "-c:a", "aac", "-shortest", str(parts[-1])])
    lst = E / f"seg{i:02d}.txt"; lst.write_text("".join(f"file '{p.name}'\n" for p in parts), encoding="utf-8")
    run(["ffmpeg", "-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", lst.name, "-c", "copy", str(out)], cwd=str(E))
    if s.get("glitch") or s.get("flash_hard"):
        eff = ",".join(effects(s, tot, i)); o2 = E / f"seg{i:02d}_fx.mp4"
        run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(out), "-vf", eff, "-c:v", "libx264", "-crf", "18", "-c:a", "copy", str(o2)]); out = o2
    return out, tot


def main():
    outs, starts, t = [], [], 0.0
    for i, s in enumerate(SEGS):
        p, d = seg(i, s); outs.append(p); starts.append(round(t, 3)); t = round(t + d, 3); print("seg", i, "start", starts[-1], "dur", d)
    lst = E / "all.txt"; lst.write_text("".join(f"file '{p.name}'\n" for p in outs), encoding="utf-8")
    base = E / "base.mp4"
    run(["ffmpeg", "-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", lst.name, "-vf", f"fade=t=in:st=0:d=0.2,fade=t=out:st={t - 0.4:.2f}:d=0.4", "-af", f"afade=t=in:st=0:d=0.2,afade=t=out:st={t - 0.5:.2f}:d=0.5",
         "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-c:a", "aac", "-b:a", "160k", str(base)], cwd=str(E))
    S = starts
    sfx = [(0.2, "riser", 0.9), (2.75, "glitch", 0.8), (S[2] - 0.05, "whoosh", 0.7), (S[2] + 2.8, "vine_boom", 0.7), (S[4] - 0.05, "whoosh", 0.4), (S[5], "bass_drop", 0.6),
           (S[6], "glitch", 0.5), (S[8] - 0.05, "whoosh", 0.4), (S[9], "bass_drop", 0.5), (S[10] + 0.1, "heartbeat", 0.7), (S[10] + 1.2, "heartbeat", 0.7), (S[10] + 2.3, "heartbeat", 0.7),
           (S[11] + 0.5, "vine_boom", 0.4), (S[12], "ding", 0.6), (S[12] + 1.6, "ding", 0.6)]
    sf = [(a, SOUNDS / f"{n}.wav", v) for a, n, v in sfx if (SOUNDS / f"{n}.wav").exists()]
    fcs = "".join(f"[{k + 1}:a]aformat=sample_rates=44100:channel_layouts=stereo,adelay={int(a * 1000)}|{int(a * 1000)},volume={v}[x{k}];" for k, (a, _, v) in enumerate(sf))
    fcs += "[0:a]aformat=sample_rates=44100:channel_layouts=stereo[a0];[a0]" + "".join(f"[x{k}]" for k in range(len(sf))) + f"amix=inputs={len(sf) + 1}:normalize=0:duration=first[ao]"
    sb = E / "base_sfx.mp4"; run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(base), *sum((["-i", str(p)] for _, p, _ in sf), []), "-filter_complex", fcs, "-map", "0:v", "-map", "[ao]", "-c:v", "copy", "-c:a", "aac", "-b:a", "160k", str(sb)])
    events = [dict(t0=0.3, kind="dialogue", text="why is she crying? wait"), dict(t0=2.9, kind="gameplay", text="she's crying, omg", tags=["omg"]), dict(t0=S[2] + 2.9, kind="dialogue", text="you'll get yours, so scary", tags=["omg"]),
              dict(t0=S[3] + 0.4, kind="dialogue", text="a you problem, huh? wait"), dict(t0=S[6] + 2.1, kind="gameplay", text="what's in the sink, no way", tags=["omg"]), dict(t0=S[8] + 0.5, kind="dialogue", text="she knows, uh oh"),
              dict(t0=S[10] + 0.3, kind="dialogue", text="her face, sad"), dict(t0=S[11] + 0.6, kind="dialogue", text="you'll get yours, scary")]
    cta_dur = 3.2; out = D / "final_cta.mp4"
    plan = reaction_kit.overlay(str(sb), events, str(E / "with_reactions.mp4"), corner="br", height_frac=0.13, emoji_beside=True, stop_at=t - cta_dur - 0.1)
    import cta_kit
    sel = dict(text="Did she *MEAN* it? Comment *1* yes, *2* no!", preset="comment", type="unexpected", gesture="point"); sel = cta_kit.choose(plan, ["warning"], dict(type="unexpected"), "mandy-cried", history_file=None) | dict(text=sel["text"], preset="comment")
    info = cta_kit.apply(str(E / "with_reactions.mp4"), str(out), sel, dur=cta_dur, hook=None, work=E / "cta")
    from media_probe import probe
    pr = probe(out); print("mandy-cried ok", json.dumps(pr)); (ROOT / "output").mkdir(exist_ok=True); (ROOT / "output" / "gta6-mandy-cried-cta.mp4").write_bytes(out.read_bytes())


if __name__ == "__main__":
    main()
