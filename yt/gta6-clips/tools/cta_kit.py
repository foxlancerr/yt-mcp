"""End-screen CTA kit: the Runner talks to viewers in the last 2-4 s of a Short. Transparent overlay + sound effects, FFmpeg composite.
usage (module): import cta_kit; sel = cta_kit.choose(plan, captions, cfg, key); cta_kit.apply(video, out, sel, dur=..., hook=...)
usage (CLI):    python cta_kit.py preview                      (builds the library sprites/cta/<preset>/ + sheet + preview mp4)
                python cta_kit.py apply in.mp4 out.mp4 <type|preset> ["custom *text*"]
Presets (graphic): subscribe, like, comment, next, team. Gestures (Runner, from his own standing frame, never redrawn):
point (leans to the button + bobbing arrow), thumbs, wave (rocks side to side), celebrate (hop + confetti), curious (tilt + ?), laugh (bounce + HA HA).
There is no new arm art, so "pointing" = lean + arrow. The CTA only uses the bottom band, so the payoff above stays visible.
Wording lives in sprites/cta/cta_templates.json (edit freely). Rule: never the same CTA twice in a row (cta_history.json)."""
import hashlib, json, math, subprocess, sys
from pathlib import Path
from PIL import Image, ImageDraw
import runner_engine as RE
from runner_engine import CREAM, RED, LRED, BLACK, GREEN, _font, outline_text, draw_heart, draw_star

HERE = Path(__file__).resolve().parent
LIB = HERE / "sprites" / "cta"
SOUNDS = HERE.parents[2] / ".agents" / "skills" / "gta6-clipper" / "sounds"
W, FPS, DUR = 1080, 30, 3.2
GRAY = (170, 170, 150)

PRESETS = {   # graphic -> default gesture, sound effects (time, file, volume)
    "subscribe": dict(gesture="point", sfx=[(0.05, "whoosh", 0.6), (0.55, "ding", 0.7), (1.75, "ding", 0.8)]),
    "like":      dict(gesture="thumbs", sfx=[(0.05, "whoosh", 0.6), (0.5, "ding", 0.7), (1.5, "vine_boom", 0.35)]),
    "comment":   dict(gesture="point", sfx=[(0.05, "whoosh", 0.6), (0.5, "ding", 0.7), (1.6, "ding", 0.6)]),
    "next":      dict(gesture="curious", sfx=[(0.05, "whoosh", 0.7), (0.5, "bass_drop", 0.45)]),
    "team":      dict(gesture="curious", sfx=[(0.05, "whoosh", 0.6), (0.5, "ding", 0.7), (0.75, "ding", 0.7)]),
}


# ---------------------------------------------------------------- easing
def clamp(x, a=0.0, b=1.0): return max(a, min(b, x))
def out_cubic(x): x = clamp(x); return 1 - (1 - x) ** 3
def out_back(x): x = clamp(x); c = 1.70158; return 1 + (c + 1) * (x - 1) ** 3 + c * (x - 1) ** 2
def pop(u, t0, d=0.4): return out_back((u - t0) / d) if u >= t0 else 0.0


# ---------------------------------------------------------------- text
def parse(text):
    """'Did you *laugh*? LIKE!' -> [(word, is_red)]; punctuation touching a *marked* word stays glued to it (kept in the same word)."""
    import re
    out = []
    for m in re.finditer(r"\*([^*]+)\*(\S*)|(\S+)", text):
        if m.group(1) is not None:
            ws = m.group(1).split()
            for i, w in enumerate(ws): out.append((w + (m.group(2) if i == len(ws) - 1 else ""), True))
        else:
            out.append((m.group(3), False))
    return out


def text_layer(text, width, max_h, start=84):
    """big cream Impact text, *emphasis* in red, wrapped to fit width x max_h. Returns RGBA image."""
    words = parse(text.replace("{name}", "").strip())
    d = ImageDraw.Draw(Image.new("RGBA", (10, 10)))
    for size in range(start, 40, -4):
        f = _font(size); lines, cur, cw = [], [], 0
        for w, r in words:
            ww = d.textlength(w + " ", font=f)
            if cur and cw + ww > width: lines.append(cur); cur, cw = [], 0
            cur.append((w, r, ww)); cw += ww
        lines.append(cur)
        lh = int(size * 1.12)
        if len(lines) * lh <= max_h and len(lines) <= 3: break
    img = Image.new("RGBA", (width + 40, len(lines) * lh + 20), (0, 0, 0, 0)); dd = ImageDraw.Draw(img)
    for i, ln in enumerate(lines):
        tot = sum(x[2] for x in ln); x = (img.width - tot) / 2
        for w, r, ww in ln:
            dd.text((x, 10 + i * lh), w, font=f, fill=(LRED if r else CREAM) + (255,), stroke_width=7, stroke_fill=BLACK + (255,))
            x += ww
    return img


# ---------------------------------------------------------------- graphics (all in the locked palette)
def rr(d, box, fill, r=26, ow=6): d.rounded_rectangle(box, radius=r, fill=fill + (255,), outline=BLACK + (255,), width=ow)


def thumb(d, x, y, s):
    d.rounded_rectangle((x - s * 0.55, y - s * 0.1, x + s * 0.65, y + s * 0.95), radius=int(s * 0.2), fill=CREAM + (255,), outline=BLACK + (255,), width=5)
    d.polygon([(x - s * 0.35, y - s * 0.1), (x - s * 0.1, y - s * 0.95), (x + s * 0.25, y - s * 0.85), (x + s * 0.15, y - s * 0.1)], fill=CREAM + (255,), outline=BLACK + (255,))
    for k in range(3): d.line((x - s * 0.4, y + s * (0.2 + k * 0.25), x + s * 0.5, y + s * (0.2 + k * 0.25)), fill=BLACK + (255,), width=3)


def bell(size, ang):
    im = Image.new("RGBA", (size, size), (0, 0, 0, 0)); d = ImageDraw.Draw(im); s = size
    d.pieslice((s * .2, s * .12, s * .8, s * .86), 180, 360, fill=CREAM + (255,), outline=BLACK + (255,), width=5)
    d.rectangle((s * .2, s * .48, s * .8, s * .72), fill=CREAM + (255,)); d.line((s * .2, s * .48, s * .2, s * .72), fill=BLACK + (255,), width=5); d.line((s * .8, s * .48, s * .8, s * .72), fill=BLACK + (255,), width=5)
    d.rounded_rectangle((s * .1, s * .7, s * .9, s * .82), radius=8, fill=CREAM + (255,), outline=BLACK + (255,), width=5)
    d.ellipse((s * .4, s * .84, s * .6, s * 1.0), fill=RED + (255,), outline=BLACK + (255,), width=4)
    return im.rotate(ang, resample=Image.BICUBIC, center=(s / 2, s * .1))


def cursor(layer, x, y, s=46):
    d = ImageDraw.Draw(layer)
    pts = [(x, y), (x, y + s), (x + s * .26, y + s * .76), (x + s * .46, y + s * 1.12), (x + s * .62, y + s * 1.04), (x + s * .44, y + s * .7), (x + s * .78, y + s * .7)]
    d.polygon(pts, fill=CREAM + (255,), outline=BLACK + (255,)); d.line(pts + [pts[0]], fill=BLACK + (255,), width=5)


def burst(layer, cx, cy, u, t0, n=9, r0=40, r1=170):
    if u < t0: return
    k = clamp((u - t0) / 0.7)
    for i in range(n):
        a = i * 2 * math.pi / n + 0.3; r = r0 + (r1 - r0) * out_cubic(k); al = int(255 * (1 - k)); x, y = cx + math.cos(a) * r, cy + math.sin(a) * r
        if i % 2: draw_heart(layer, x, y, 30 * (1 - 0.4 * k), fill=RED, alpha=al)
        else: draw_star(layer, x, y, 24 * (1 - 0.4 * k), alpha=al)


def scaled(layer, im, cx, cy, sc):
    if sc <= 0.02: return
    im2 = im.resize((max(1, int(im.width * sc)), max(1, int(im.height * sc))), Image.LANCZOS)
    layer.alpha_composite(im2, (int(cx - im2.width / 2), int(cy - im2.height / 2)))


def g_subscribe(layer, cx, cy, u, label=None):
    bw, bh = 470, 124; clicked = u >= 1.75
    img = Image.new("RGBA", (bw + 40, bh + 40), (0, 0, 0, 0)); d = ImageDraw.Draw(img)
    rr(d, (14, 14, 14 + bw, 14 + bh), CREAM if clicked else RED)
    outline_text(d, (14 + bw * 0.40, 14 + bh / 2 + 3), "SUBSCRIBED" if clicked else "SUBSCRIBE", 62 if clicked else 70, BLACK if clicked else CREAM, stroke=0 if clicked else 6)
    img.alpha_composite(bell(76, math.sin((u - 1.75) * 26) * 24 * max(0, 1 - (u - 1.75) * 1.1) if clicked else 0), (14 + bw - 86, 14 + (bh - 76) // 2))
    sc = pop(u, 0.5) * (1 - 0.09 * clamp(1 - abs(u - 1.78) * 12) + 0.04 * math.sin(u * 7) * (0 if clicked else 1))
    scaled(layer, img, cx, cy, sc)
    if u >= 0.9:   # cursor glides in, clicks
        k = out_cubic((u - 0.9) / 0.8); cursor(layer, cx + 230 - 250 * (1 - k) + 40, cy + 20 + 150 * (1 - k))
    if 1.75 <= u < 2.3:
        k = (u - 1.75) / 0.55; d2 = ImageDraw.Draw(layer); r = 60 + 150 * k
        d2.ellipse((cx + 230 - r + 40, cy + 20 - r, cx + 230 + r + 40, cy + 20 + r), outline=CREAM + (int(220 * (1 - k)),), width=6)


def g_like(layer, cx, cy, u, label=None):
    bw, bh = 330, 150; clicked = u >= 1.5
    img = Image.new("RGBA", (bw + 40, bh + 40), (0, 0, 0, 0)); d = ImageDraw.Draw(img)
    rr(d, (14, 14, 14 + bw, 14 + bh), RED if clicked else CREAM)
    tx, ty = 14 + 86, 14 + bh * 0.56
    d2 = ImageDraw.Draw(img); thumb(d2, tx, ty, 62 * (1.0 + 0.0))
    outline_text(d, (14 + bw * 0.68, 14 + bh / 2 + 4), "LIKE", 76, CREAM if clicked else BLACK, stroke=6 if clicked else 0)
    sc = pop(u, 0.5) * (1 + 0.2 * clamp(1 - abs(u - 1.55) * 7) * (1 if u >= 1.5 else 0.6))
    scaled(layer, img, cx, cy, sc); burst(layer, cx, cy, u, 1.5)


def g_comment(layer, cx, cy, u, label=None):
    bw, bh = 470, 176
    img = Image.new("RGBA", (bw + 40, bh + 80), (0, 0, 0, 0)); d = ImageDraw.Draw(img)
    d.polygon([(54, 14 + bh - 6), (112, 14 + bh - 6), (30, 14 + bh + 52)], fill=BLACK + (255,))
    rr(d, (14, 14, 14 + bw, 14 + bh), CREAM)
    d.polygon([(62, 14 + bh - 4), (104, 14 + bh - 4), (40, 14 + bh + 40)], fill=CREAM + (255,))
    if u < 1.55:     # typing dots
        for i in range(3):
            by = 14 + bh / 2 - abs(math.sin(u * 7 + i * 0.7)) * 22
            d.ellipse((14 + bw / 2 - 70 + i * 70 - 22, by - 22, 14 + bw / 2 - 70 + i * 70 + 22, by + 22), fill=RED + (255,), outline=BLACK + (255,), width=4)
    else:            # the reply lands
        k = clamp((u - 1.55) / 0.45)
        d.rounded_rectangle((44, 44, 44 + 360 * k, 78), radius=14, fill=BLACK + (255,)); d.rounded_rectangle((44, 98, 44 + 250 * k, 132), radius=14, fill=BLACK + (255,))
        draw_heart(img, 14 + bw - 70, 14 + bh - 44, 44 * pop(u, 1.9, 0.3), fill=RED)
    scaled(layer, img, cx, cy, pop(u, 0.5) * (1 + 0.05 * math.sin(u * 6)))


def g_next(layer, cx, cy, u, label="NEXT"):
    bw, bh = 400, 210
    img = Image.new("RGBA", (bw + 40, bh + 90), (0, 0, 0, 0)); d = ImageDraw.Draw(img)
    rr(d, (14, 54, 14 + bw, 54 + bh), BLACK, ow=8); d.rounded_rectangle((14, 54, 14 + bw, 54 + bh), radius=26, outline=CREAM + (255,), width=8)
    d.polygon([(14 + bw / 2 - 40, 54 + bh / 2 - 56), (14 + bw / 2 - 40, 54 + bh / 2 + 56), (14 + bw / 2 + 58, 54 + bh / 2)], fill=RED + (255,), outline=CREAM + (255,))
    d.rounded_rectangle((14 + bw / 2 - 110, 14, 14 + bw / 2 + 110, 80), radius=16, fill=RED + (255,), outline=BLACK + (255,), width=5)
    outline_text(d, (14 + bw / 2, 48), label, 50, CREAM, stroke=5)
    k = out_back(clamp((u - 0.5) / 0.5)); sh = math.sin(u * 60) * 6 if 1.5 < u < 1.8 else 0
    scaled(layer, img, cx + (1 - k) * 420 + sh, cy, 1.0 if k > 0 else 0)
    if u > 0.9: outline_text(ImageDraw.Draw(layer), (cx + 160, cy - 118 - abs(math.sin(u * 5)) * 18), "?", 110, CREAM, stroke=8)


def g_team(layer, cx, cy, u, label=None):
    for i, (txt, fill, tc, ox) in enumerate((("YES", GREEN, BLACK, -145), ("NO", RED, CREAM, 145))):
        bw, bh = 255, 140; img = Image.new("RGBA", (bw + 40, bh + 40), (0, 0, 0, 0)); d = ImageDraw.Draw(img)
        rr(d, (14, 14, 14 + bw, 14 + bh), fill); outline_text(d, (14 + bw / 2, 14 + bh / 2 + 4), txt, 84, tc, stroke=0 if tc == BLACK else 6)
        hot = 1 + 0.12 * max(0, math.sin(u * 5 + i * math.pi)) * (1 if u > 1.2 else 0)
        scaled(layer, img, cx + ox, cy, pop(u, 0.5 + i * 0.22) * hot)
    if u > 0.9: outline_text(ImageDraw.Draw(layer), (cx, cy - 112 - abs(math.sin(u * 5)) * 12), "?", 90, CREAM, stroke=7)


GRAPHICS = dict(subscribe=g_subscribe, like=g_like, comment=g_comment, next=g_next, team=g_team)


# ---------------------------------------------------------------- the Runner
def runner_motion(g, u, S):
    """-> angle (deg, + = counter-clockwise, he faces right so lean right = negative), dx, dy, scale, effects"""
    if g == "point": return -9 * out_cubic(u / 0.4) + math.sin(u * 6) * 2, 0, -abs(math.sin(u * 5)) * 14 * S, 1.0, []
    if g == "thumbs": return -4 * math.sin(u * 5), 0, -abs(math.sin(u * 6)) * 12 * S, 1 + 0.02 * math.sin(u * 8), ["thumbs"]
    if g == "wave": return math.sin(u * 7) * 11, math.sin(u * 3.5) * 10 * S, 0, 1.0, []
    if g == "celebrate": ph = (u * 1.9) % 1.0; return math.sin(u * 5) * 4, 0, -math.sin(ph * math.pi) * 90 * S, 1.0, ["confetti"]
    if g == "laugh": return math.sin(u * 11) * 6, math.sin(u * 23) * 4 * S, -abs(math.sin(u * 11)) * 22 * S, 1.0, ["haha"]
    return -10, 0, -abs(math.sin(u * 3)) * 6 * S, 1.0, ["question"]      # curious


def runner_layer(size, g, u, run_h, cx, ground):
    walk = RE.load_walk(); sp0 = walk[0]; r = run_h / sp0.height
    sp = sp0.resize((int(sp0.width * r), run_h), Image.LANCZOS); S = run_h / 640
    ang, dx, dy, sc, fx = runner_motion(g, u, S)
    if sc != 1: sp = sp.resize((int(sp.width * sc), int(sp.height * sc)), Image.LANCZOS)
    cw, ch = int(sp.width * 2.6), int(sp.height * 1.5); can = Image.new("RGBA", (cw, ch), (0, 0, 0, 0)); can.alpha_composite(sp, (cw // 2 - sp.width // 2, ch - sp.height))
    if ang: can = can.rotate(ang, resample=Image.BICUBIC, center=(cw / 2, ch))
    enter = out_cubic(u / 0.35); oy = (1 - enter) * run_h * 0.6
    img = Image.new("RGBA", size, (0, 0, 0, 0)); ox, oy2 = int(cx + dx - cw / 2), int(ground + dy + oy - ch)
    sx0, sy0 = max(0, -ox), max(0, -oy2); crop = can.crop((sx0, sy0, min(cw, size[0] - ox), min(ch, size[1] - oy2)))
    if crop.width > 0 and crop.height > 0: img.alpha_composite(crop, (max(ox, 0), max(oy2, 0)))
    head = (cx + dx + sp.width * 0.14, ground + dy + oy - sp.height * 0.80)
    RE.draw_effects(img, fx, head, u, S * 1.6)
    if enter < 1: img.putalpha(img.getchannel("A").point(lambda v: int(v * clamp(enter * 1.4))))
    return img


def arrow(layer, x, y, u):
    d = ImageDraw.Draw(layer); b = math.sin(u * 8) * 16; x += b
    pts = [(x, y - 20), (x + 70, y - 20), (x + 70, y - 46), (x + 128, y), (x + 70, y + 46), (x + 70, y + 20), (x, y + 20)]
    d.polygon(pts, fill=RED + (255,), outline=BLACK + (255,)); d.line(pts + [pts[0]], fill=BLACK + (255,), width=6)


# ---------------------------------------------------------------- compose
def frames(sel, dur=DUR, fps=FPS, rh=430, hook_line=None):
    """yield RGBA frames (W x rh) for one CTA. sel = dict(text, preset, gesture, label)."""
    preset = sel["preset"]; g = sel.get("gesture") or PRESETS[preset]["gesture"]
    tz = int(rh * 0.47); tl = text_layer(sel["text"], 960, tz - 10); run_h = int(rh * 0.46); ground = rh - 58; zone_y = tz + (rh - tz) / 2 - 4
    loop = text_layer("*REPLAY*: " + hook_line, 900, 70, start=44) if hook_line else None
    for i in range(int(round(dur * fps))):
        u = i / fps; img = Image.new("RGBA", (W, rh), (0, 0, 0, 0))
        k = out_back(clamp(u / 0.34)); sc = 1.0 + 0.55 * (1 - k)
        if u > 0.02: scaled(img, tl, W / 2, tz / 2 + 6, sc * (1 + 0.02 * math.sin(u * 6)))   # slam in, then breathe
        img.alpha_composite(runner_layer((W, rh), g, u, run_h, 250, ground))
        if g == "point" or preset in ("subscribe", "comment"):
            if u > 0.3: arrow(img, 345, int(zone_y) + 10, u)
        GRAPHICS[preset](img, 740 if preset != "team" else 735, int(zone_y), u, sel.get("label") or "NEXT")
        if loop is not None and u > dur - 1.0:
            k2 = clamp((u - (dur - 1.0)) / 0.3); li = loop.copy(); li.putalpha(li.getchannel("A").point(lambda v: int(v * k2)))
            img.alpha_composite(li, ((W - li.width) // 2, rh - li.height - 4))
        if u > dur - 0.25:   # fade out with the video
            f = clamp((dur - u) / 0.25); img.putalpha(img.getchannel("A").point(lambda v: int(v * f)))
        yield img


# ---------------------------------------------------------------- smart choice
def load_templates(): return json.loads((LIB / "cta_templates.json").read_text(encoding="utf-8"))


def classify(plan, captions="", cfg=None):
    """Real signals only: the clip's reaction plan (emotion per event), its captions, and flags in cfg. Returns (type, why)."""
    cfg = cfg or {}; txt = " ".join(captions).lower() if not isinstance(captions, str) else captions.lower()
    emos = [q["emotion"] for q in plan]; sc = {"funny": 0.0, "unexpected": 0.0, "fail": 0.0, "achievement": 0.0, "emotional": 0.0}
    for i, e in enumerate(emos):
        w = 1.0 + (1.5 if i >= len(emos) - 2 else 0)            # the mood at the end decides the CTA
        if e in ("laugh", "laugh_cry"): sc["funny"] += w
        elif e in ("shock", "curious", "nervous"): sc["unexpected"] += w
        elif e in ("happy", "approve", "reveal"): sc["achievement"] += w
        elif e in ("love", "kiss", "sad"): sc["emotional"] += w
        elif e in ("angry", "dizzy"): sc["fail"] += 0.3
    if any(k in txt for k in ("mission failed", "wasted", "busted", "you died", "failed")): sc["fail"] += 3
    why = ", ".join(f"{k} {v:.1f}" for k, v in sorted(sc.items(), key=lambda kv: -kv[1]) if v)
    if cfg.get("cliffhanger"): return "cliffhanger", "flagged cliffhanger in the clip config; " + why
    best = max(sc.items(), key=lambda kv: kv[1])
    return (best[0], why) if best[1] > 0 else ("general", "no reaction signal; " + why)


def choose(plan, captions="", cfg=None, key="", history_file=None):
    T = load_templates(); typ, why = classify(plan, captions, cfg); hist_f = Path(history_file or LIB / "cta_history.json")
    try: hist = json.loads(hist_f.read_text(encoding="utf-8"))
    except Exception: hist = []
    hist = [h for h in hist if h["key"] != key]          # a re-render of the same clip keeps its CTA
    recent = {h["text"] for h in hist[-3:]}
    opts = [v for v in T[typ] if v["text"] not in recent] or T[typ]
    sel = dict(opts[int(hashlib.md5((key + typ).encode()).hexdigest(), 16) % len(opts)]); sel.update(type=typ, why=why)
    hist.append(dict(key=key, type=typ, text=sel["text"], preset=sel["preset"])); hist_f.write_text(json.dumps(hist[-30:], indent=1), encoding="utf-8")
    return sel


# ---------------------------------------------------------------- render + FFmpeg
def build_frames(sel, out_dir, dur=DUR, rh=430, hook_line=None):
    out_dir = Path(out_dir); out_dir.mkdir(parents=True, exist_ok=True)
    for f in out_dir.glob("c*.png"): f.unlink()
    n = 0
    for i, im in enumerate(frames(sel, dur, FPS, rh, hook_line), 1): im.save(out_dir / f"c{i:03d}.png"); n = i
    return n


def apply(video, out, sel, dur=DUR, rh=430, hook=None, work=None):
    """Composite the CTA (last `dur` s) + its sound effects onto `video`. The video keeps its length."""
    from media_probe import probe
    pr = probe(video); vd = pr["duration"]; st = max(0.0, vd - dur); work = Path(work or Path(out).parent / "edit" / "cta"); build_frames(sel, work, dur, rh, hook)
    sfx = [(t, SOUNDS / f"{n}.wav", v) for t, n, v in sel.get("sfx", PRESETS[sel["preset"]]["sfx"]) if (SOUNDS / f"{n}.wav").exists()]
    ins = ["-i", str(video), "-framerate", str(FPS), "-i", str(work / "c%03d.png")]
    for _, p, _ in sfx: ins += ["-i", str(p)]
    fc = f"[1:v]format=rgba,setpts=PTS-STARTPTS+{st}/TB[c];[0:v][c]overlay=0:{1920 - rh}:eof_action=pass:enable='gte(t,{st})'[v]"
    a = "[0:a]"
    if sfx and pr["has_audio"]:
        for k, (t, _, v) in enumerate(sfx):
            ms = int((st + t) * 1000); fc += f";[{k + 2}:a]aformat=sample_rates=44100:channel_layouts=stereo,adelay={ms}|{ms},volume={v}[s{k}]"
        fc += ";[0:a]aformat=sample_rates=44100:channel_layouts=stereo[a0];[a0]" + "".join(f"[s{k}]" for k in range(len(sfx))) + f"amix=inputs={len(sfx) + 1}:normalize=0:duration=first[aout]"; a = "[aout]"
    r = subprocess.run(["ffmpeg", "-y", "-loglevel", "error", *ins, "-filter_complex", fc, "-map", "[v]", "-map", a, "-c:v", "libx264", "-preset", "medium", "-crf", "19", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "160k", "-t", str(vd), str(out)], capture_output=True, text=True)
    if r.returncode: raise RuntimeError(r.stderr[-1500:])
    return dict(start=st, dur=dur, sfx=[(round(st + t, 2), p.stem) for t, p, _ in sfx])


# ---------------------------------------------------------------- library + preview
DEMO = {"subscribe": "WAIT! Don't leave without *subscribing*!", "like": "LIKE if that was *insane*!", "comment": "*WHAT WOULD YOU DO?* Comment below!",
        "next": "*PART 2?* You decide!", "team": "TEAM *YES* or TEAM *NO*?"}


def make_library():
    """Default-text transparent PNG sequences per preset (reusable overlays) + a contact sheet + a preview mp4."""
    sheet = Image.new("RGB", (4 * 360, len(PRESETS) * 160), (16, 16, 16)); rows = []
    for ri, p in enumerate(PRESETS):
        sel = dict(text=DEMO[p], preset=p, label="PART 2" if p == "next" else None); d = LIB / p; d.mkdir(parents=True, exist_ok=True)
        for f in d.glob("f*.png"): f.unlink()
        fr = list(frames(sel))
        for i, im in enumerate(fr, 1): im.save(d / f"f{i:03d}.png")
        (d / "manifest.json").write_text(json.dumps(dict(name=p, frames=len(fr), fps=FPS, size=[W, 430], gesture=PRESETS[p]["gesture"], default_text=DEMO[p], sfx=[(t, n) for t, n, _ in PRESETS[p]["sfx"]],
                                                         note="RGBA PNG sequence 1080x430, place at y=1490 of a 1080x1920 Short for the last 3.2s. Custom text: cta_kit.apply()."), indent=1), encoding="utf-8")
        for ci, t in enumerate((0.45, 1.0, 1.9, 2.7)):
            im = fr[int(t * FPS)]; bg = Image.new("RGBA", im.size, (28, 28, 28, 255)); bg.alpha_composite(im); sheet.paste(bg.convert("RGB").resize((360, 143)), (ci * 360, ri * 160))
        rows.append((p, fr))
    sheet.save(LIB / "_cta_sheet.png")
    # preview video: 540x960 game-like backdrop, bottom band = CTA, 3.2s per preset
    pv = subprocess.Popen(["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", "540x960", "-r", "30", "-i", "-", "-c:v", "libx264", "-pix_fmt", "yuv420p", str(LIB / "_cta_preview.mp4")], stdin=subprocess.PIPE)
    for p, fr in rows:
        for im in fr:
            bg = Image.new("RGBA", (W, 1920), (22, 26, 22, 255)); dd = ImageDraw.Draw(bg); dd.rectangle((0, 160, W, 1480), fill=(60, 70, 55, 255)); outline_text(dd, (W / 2, 800), "STORY PAYOFF STAYS VISIBLE", 70, CREAM)
            bg.alpha_composite(im, (0, 1490)); pv.stdin.write(bg.convert("RGB").resize((540, 960)).tobytes())
    pv.stdin.close(); pv.wait()
    print("library ok:", ", ".join(PRESETS), "->", LIB)


if __name__ == "__main__":
    a = sys.argv[1:]
    if not a or a[0] == "preview": make_library()
    elif a[0] == "apply":
        T = load_templates(); arg = a[3]
        sel = dict(text=a[4], preset=arg if arg in PRESETS else T[arg][0]["preset"], type="manual") if len(a) > 4 else dict(T[arg][0] if arg in T else dict(text=DEMO[arg], preset=arg))
        print(apply(a[1], a[2], sel))
