"""The Runner animation engine (The Untold Exit style).
Uses ONLY the crisp walk cycle from public/images/character-walk-overlay.mp4 (no redesign). Reactions come from body motion
(bounce, shake, sway, trip, jump, freeze) plus effect marks drawn in the sheet's own language (cream fill, thick black outline,
red accent marks, sweat drops, '!!', '?', hearts, breath puff, dizzy stars, speech bubble). Output: RGBA frames for a band."""
import math
from pathlib import Path
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont

HERE = Path(__file__).resolve().parent
WALK = HERE / "sprites" / "walk"
CREAM, RED, LRED, BLACK, GREEN = (245, 245, 220), (255, 0, 0), (255, 49, 49), (0, 0, 0), (0, 255, 127)
FONT = "C:/Windows/Fonts/impact.ttf"
_cache = {}


def _matte(rgb, thr=38):
    dark = (rgb.max(axis=2) < thr).astype(np.uint8)
    # silhouette = close the thin, broken outline, then fill the outer contour: black hair inside stays opaque
    nd = (1 - dark).astype(np.uint8)
    closed = cv2.morphologyEx(nd, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (25, 25)))
    cnts, _ = cv2.findContours(closed, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    mask = np.zeros(dark.shape, np.uint8)
    cv2.drawContours(mask, cnts, -1, 255, thickness=cv2.FILLED)
    a = cv2.GaussianBlur(mask, (0, 0), 1.2)
    return np.dstack([rgb, a])


def load_walk():
    if "walk" in _cache:
        return _cache["walk"]
    files = sorted(WALK.glob("f*.png"))
    frames = [_matte(np.array(Image.open(f).convert("RGB"))) for f in files]
    boxes = [Image.fromarray(f[:, :, 3]).getbbox() for f in frames]
    x0 = min(b[0] for b in boxes); y0 = min(b[1] for b in boxes); x1 = max(b[2] for b in boxes); y1 = max(b[3] for b in boxes)
    out = [Image.fromarray(f[y0:y1, x0:x1], "RGBA") for f in frames]
    _cache["walk"] = out
    return out


def _font(sz):
    return ImageFont.truetype(FONT, sz)


def outline_text(d, xy, t, size, fill, stroke=6, anchor="mm"):
    d.text(xy, t, font=_font(size), fill=fill, stroke_width=stroke, stroke_fill=BLACK, anchor=anchor)


def heart_pts(cx, cy, s):
    pts = []
    for i in range(60):
        t = i / 60 * 2 * math.pi
        x = 16 * math.sin(t) ** 3
        y = -(13 * math.cos(t) - 5 * math.cos(2 * t) - 2 * math.cos(3 * t) - math.cos(4 * t))
        pts.append((cx + x * s / 16, cy + y * s / 16))
    return pts


def draw_heart(layer, cx, cy, s, fill=CREAM, alpha=255):
    ov = Image.new("RGBA", layer.size, (0, 0, 0, 0)); d = ImageDraw.Draw(ov)
    pts = heart_pts(cx, cy, s)
    d.polygon(pts, fill=fill + (alpha,))
    d.line(pts + [pts[0]], fill=BLACK + (alpha,), width=max(4, int(s / 7)), joint="curve")
    d.polygon(heart_pts(cx - s * 0.12, cy - s * 0.18, s * 0.28), fill=(255, 255, 255, int(alpha * 0.8)))
    layer.alpha_composite(ov)


def draw_drop(layer, cx, cy, s, alpha=255):
    ov = Image.new("RGBA", layer.size, (0, 0, 0, 0)); d = ImageDraw.Draw(ov)
    pts = [(cx, cy - s)] + [(cx + math.sin(a) * s * 0.55, cy + s * 0.15 + (-math.cos(a)) * s * 0.55) for a in np.linspace(0.6, 2 * math.pi - 0.6, 24)]
    d.polygon(pts, fill=CREAM + (alpha,)); d.line(pts + [pts[0]], fill=BLACK + (alpha,), width=max(3, int(s / 6)))
    layer.alpha_composite(ov)


def draw_cloud(layer, cx, cy, r, alpha=255):
    ov = Image.new("RGBA", layer.size, (0, 0, 0, 0)); d = ImageDraw.Draw(ov)
    blobs = [(0, 0, r), (-r * 0.8, r * 0.2, r * 0.7), (r * 0.8, r * 0.15, r * 0.75), (-r * 0.2, -r * 0.55, r * 0.7), (r * 0.5, -r * 0.4, r * 0.55)]
    for dx, dy, rr in blobs:
        d.ellipse((cx + dx - rr - 5, cy + dy - rr - 5, cx + dx + rr + 5, cy + dy + rr + 5), fill=BLACK + (alpha,))
    for dx, dy, rr in blobs:
        d.ellipse((cx + dx - rr, cy + dy - rr, cx + dx + rr, cy + dy + rr), fill=CREAM + (alpha,))
    layer.alpha_composite(ov)


def draw_star(layer, cx, cy, r, alpha=255):
    ov = Image.new("RGBA", layer.size, (0, 0, 0, 0)); d = ImageDraw.Draw(ov)
    pts = []
    for i in range(10):
        a = -math.pi / 2 + i * math.pi / 5; rr = r if i % 2 == 0 else r * 0.45
        pts.append((cx + rr * math.cos(a), cy + rr * math.sin(a)))
    d.polygon(pts, fill=CREAM + (alpha,)); d.line(pts + [pts[0]], fill=BLACK + (alpha,), width=4)
    layer.alpha_composite(ov)


def draw_bubble(layer, cx, cy, text, size=64, bounce=0.0):
    ov = Image.new("RGBA", layer.size, (0, 0, 0, 0)); d = ImageDraw.Draw(ov)
    f = _font(size); tw = d.textlength(text, font=f); w, h = tw + 60, size + 36
    x0, y0 = cx - w / 2, cy - h / 2 - bounce
    d.rounded_rectangle((x0 - 6, y0 - 6, x0 + w + 6, y0 + h + 6), radius=26, fill=BLACK + (255,))
    d.rounded_rectangle((x0, y0, x0 + w, y0 + h), radius=22, fill=CREAM + (255,))
    d.polygon([(cx - 26, y0 + h), (cx + 8, y0 + h), (cx - 4, y0 + h + 34)], fill=CREAM + (255,))
    d.text((cx, y0 + h / 2 + 3), text, font=f, fill=BLACK + (255,), anchor="mm")
    layer.alpha_composite(ov)


def draw_effects(layer, effects, head, u, S):
    """effects: names active now; head=(x,y) pixel anchor; u=local seconds in beat; S=scale (1 = 640px sprite)."""
    hx, hy = head
    for fx in effects:
        if fx == "hearts":
            for i in range(5):
                ph = (u * 0.6 + i * 0.2) % 1.0
                x = hx + (i - 2) * 38 * S + math.sin(ph * 6 + i) * 22 * S
                y = hy - 40 * S - ph * 260 * S
                draw_heart(layer, x, y, (34 + 12 * (i % 3)) * S, alpha=int(255 * (1 - ph ** 2)))
        elif fx == "sweat":
            for i, sx in enumerate((-70, 70)):
                ph = (u * 1.4 + i * 0.5) % 1.0
                draw_drop(layer, hx + sx * S, hy - 30 * S + ph * 60 * S, 22 * S, alpha=int(255 * (1 - ph * 0.7)))
        elif fx == "exclaim":
            if int(u * 8) % 2 == 0 or u < 0.5:
                outline_text(ImageDraw.Draw(layer), (hx + 10 * S, hy - 120 * S), "!!", int(110 * S), RED, stroke=7)
        elif fx == "question":
            outline_text(ImageDraw.Draw(layer), (hx + 10 * S, hy - 115 * S - abs(math.sin(u * 5)) * 18 * S), "?", int(120 * S), CREAM, stroke=7)
        elif fx == "anger":
            d = ImageDraw.Draw(layer)
            for k in range(3):
                a = -0.5 + k * 0.5
                d.line((hx + 60 * S * math.cos(a) + 20, hy - 20 * S + 60 * S * math.sin(a), hx + 100 * S * math.cos(a) + 20, hy - 20 * S + 100 * S * math.sin(a)), fill=LRED, width=int(10 * S))
        elif fx == "dizzy":
            for i in range(3):
                a = u * 5 + i * 2.1
                draw_star(layer, hx + math.cos(a) * 85 * S, hy - 95 * S + math.sin(a) * 22 * S, 22 * S)
        elif fx == "breath":
            for i in range(4):
                ph = (u * 0.55 + i * 0.25) % 1.0
                draw_cloud(layer, hx + 60 * S + ph * 190 * S, hy + 40 * S - ph * 70 * S, (14 + ph * 34) * S, alpha=int(255 * (1 - ph)))
        elif fx == "haha":
            draw_bubble(layer, hx + 120 * S, hy - 150 * S, "HA HA!", int(70 * S), bounce=abs(math.sin(u * 9)) * 14 * S)
        elif fx == "star3":  # wanted stars badge
            for i in range(3):
                draw_star(layer, hx - 60 * S + i * 60 * S, hy - 150 * S, 24 * S)


def render_frames(duration, fps, size, beats, bubbles=(), runner_h=620, ground=70):
    """yield PIL RGBA frames of `size` (w,h). beats: list of dict(t0,t1,mode,fx,speed)."""
    walk = load_walk(); W, H = size
    sprites = {}
    def sprite(i):
        i %= len(walk)
        if i not in sprites:
            s = walk[i]; r = runner_h / s.height
            sprites[i] = s.resize((int(s.width * r), runner_h), Image.LANCZOS)
        return sprites[i]
    S = runner_h / 640
    n = int(round(duration * fps))
    for fi in range(n):
        t = fi / fps
        beat = next((b for b in beats if b["t0"] <= t < b["t1"]), {"mode": "walk", "fx": []})
        u = t - beat.get("t0", 0); mode = beat.get("mode", "walk"); speed = beat.get("speed", 1.0)
        idx = int(t * 24 * speed) if mode not in ("freeze", "tilt") else 12
        sp = sprite(idx)
        ang, dx, dy, sc = 0.0, 0.0, 0.0, 1.0
        if mode == "bounce":
            dy = -abs(math.sin(u * 7)) * 40 * S
        elif mode == "jump":
            ph = (u * 1.6) % 1.0; dy = -math.sin(ph * math.pi) * 150 * S; ang = -6 * math.sin(ph * math.pi)
        elif mode == "shake":
            dx = math.sin(u * 55) * 14 * S; dy = math.sin(u * 37) * 5 * S
        elif mode == "shiver":
            dx = math.sin(u * 70) * 6 * S; ang = math.sin(u * 40) * 2
        elif mode == "sway":
            ang = math.sin(u * 3.2) * 14; dx = math.sin(u * 3.2) * 60 * S
        elif mode == "trip":
            dur = beat["t1"] - beat["t0"]; k = min(u / (dur * 0.35), 1.0)
            ang = -78 * math.sin(min(k, 1) * math.pi / 2) if u < dur * 0.6 else -78 * max(0, 1 - (u - dur * 0.6) / (dur * 0.4))
            dx = -150 * S * k; dy = 18 * S * k
        elif mode == "dance":
            ang = math.sin(u * 8) * 12; dy = -abs(math.sin(u * 8)) * 30 * S; dx = math.sin(u * 4) * 40 * S
        elif mode == "laugh":
            dy = -abs(math.sin(u * 11)) * 28 * S; ang = math.sin(u * 11) * 6; dx = math.sin(u * 23) * 5 * S
        elif mode == "pop":
            sc = 1 + 0.18 * max(0, 1 - u * 4) * (1 if u < 0.25 else 0)
        elif mode == "tilt":
            ang = -10
        elif mode == "walk":
            dy = -abs(math.sin(t * 12 * speed)) * 6 * S
        base_x = W * 0.5 + math.sin(t * 0.7) * 90 * S
        img = Image.new("RGBA", size, (0, 0, 0, 0))
        spr = sp if sc == 1 else sp.resize((int(sp.width * sc), int(sp.height * sc)), Image.LANCZOS)
        cw, ch = int(spr.width * 2.6), int(spr.height * 1.5)          # pivot canvas: rotate about the feet
        canvas = Image.new("RGBA", (cw, ch), (0, 0, 0, 0)); canvas.alpha_composite(spr, (cw // 2 - spr.width // 2, ch - spr.height))
        if ang:
            canvas = canvas.rotate(ang, resample=Image.BICUBIC, center=(cw / 2, ch))
        ox = int(base_x + dx - cw / 2); oy = int(H - ground + dy - ch)
        # paste with clipping to the band
        sx0, sy0 = max(0, -ox), max(0, -oy); dx0, dy0 = max(ox, 0), max(oy, 0)
        crop = canvas.crop((sx0, sy0, min(cw, W - ox), min(ch, H - oy)))
        if crop.width > 0 and crop.height > 0:
            img.alpha_composite(crop, (dx0, dy0))
        head = (base_x + dx + sp.width * 0.14, H - ground + dy - sp.height * 0.80)
        active = list(beat.get("fx", []))
        draw_effects(img, active, head, u, S)
        for (b0, b1, text) in bubbles:
            if b0 <= t < b1:
                draw_bubble(img, head[0] + 150 * S, head[1] - 150 * S, text, int(64 * S), bounce=abs(math.sin((t - b0) * 9)) * 12 * S)
        yield img
