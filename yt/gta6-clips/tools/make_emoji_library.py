"""Build the flat 2D emoji library in the Untold Exit palette: tools/sprites/emoji/<name>/ with a still and a pop-in animation.
usage: python make_emoji_library.py [name ...]     (no names = all). Never overwrites a folder that already has frames.
Drawn here with Pillow (no third-party emoji art, so no licence issue): cream fill, thick black outline, red accents, green only for 'good'.
Each folder: still.png (512), f001..f030.png (256, RGBA, 30 fps: 0.3s overshoot pop-in, then a gentle bob), manifest.json."""
import json, math, sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).parent / "sprites" / "emoji"
CREAM, RED, LRED, BLK, GREEN = (245, 245, 220, 255), (255, 0, 0, 255), (255, 49, 49, 255), (0, 0, 0, 255), (0, 255, 127, 255)
N = 512; LW = 16
FONT = "C:/Windows/Fonts/impact.ttf"


def canvas():
    im = Image.new("RGBA", (N, N), (0, 0, 0, 0)); return im, ImageDraw.Draw(im)


def face(d, fill=CREAM):
    d.ellipse((40, 40, 472, 472), fill=fill, outline=BLK, width=LW)


def heart(d, cx, cy, s, fill=RED):
    pts = []
    for i in range(80):
        t = i / 80 * 2 * math.pi
        pts.append((cx + 16 * math.sin(t) ** 3 * s / 16, cy - (13 * math.cos(t) - 5 * math.cos(2 * t) - 2 * math.cos(3 * t) - math.cos(4 * t)) * s / 16))
    d.polygon(pts, fill=fill); d.line(pts + [pts[0]], fill=BLK, width=10, joint="curve")


def star(d, cx, cy, r, fill=CREAM, pts_n=5, inner=0.45):
    pts = []
    for i in range(pts_n * 2):
        a = -math.pi / 2 + i * math.pi / pts_n; rr = r if i % 2 == 0 else r * inner
        pts.append((cx + rr * math.cos(a), cy + rr * math.sin(a)))
    d.polygon(pts, fill=fill); d.line(pts + [pts[0]], fill=BLK, width=10, joint="curve")


def drop(d, cx, cy, s, fill=CREAM):
    pts = [(cx, cy - s)] + [(cx + math.sin(a) * s * 0.6, cy + s * 0.2 - math.cos(a) * s * 0.6) for a in [0.6 + i * (2 * math.pi - 1.2) / 24 for i in range(25)]]
    d.polygon(pts, fill=fill); d.line(pts + [pts[0]], fill=BLK, width=9, joint="curve")


def eye(d, cx, cy, r=40, px=0, py=0):
    d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=(255, 255, 255, 255), outline=BLK, width=10)
    d.ellipse((cx - r * 0.45 + px, cy - r * 0.45 + py, cx + r * 0.45 + px, cy + r * 0.45 + py), fill=BLK)


def txt(d, xy, s, size, fill=CREAM):
    d.text(xy, s, font=ImageFont.truetype(FONT, size), fill=fill, stroke_width=12, stroke_fill=BLK, anchor="mm")


def e_heart(): im, d = canvas(); heart(d, 256, 262, 250); return im
def e_heart_eyes():
    im, d = canvas(); face(d); heart(d, 170, 215, 130); heart(d, 342, 215, 130)
    d.arc((130, 250, 382, 420), 20, 160, fill=BLK, width=LW); return im
def e_kiss():
    im, d = canvas(); face(d); eye(d, 170, 215, 34); d.arc((290, 195, 380, 245), 200, 340, fill=BLK, width=LW)
    d.ellipse((215, 330, 295, 380), fill=RED, outline=BLK, width=10); heart(d, 395, 330, 90); return im
def e_laugh_cry():
    im, d = canvas(); face(d)
    d.line((110, 190, 190, 225, 110, 255), fill=BLK, width=LW, joint="curve"); d.line((402, 190, 322, 225, 402, 255), fill=BLK, width=LW, joint="curve")
    d.chord((130, 270, 382, 440), 0, 180, fill=BLK, outline=BLK, width=8); d.chord((170, 290, 342, 360), 0, 180, fill=CREAM)
    drop(d, 90, 290, 50); drop(d, 422, 290, 50); return im
def e_shocked():
    im, d = canvas(); face(d); eye(d, 165, 215, 48); eye(d, 347, 215, 48)
    d.line((115, 130, 215, 105), fill=BLK, width=LW); d.line((297, 105, 397, 130), fill=BLK, width=LW)
    d.ellipse((216, 330, 296, 420), fill=BLK); return im
def e_sad():
    im, d = canvas(); face(d); eye(d, 170, 220, 30, 0, 12); eye(d, 342, 220, 30, 0, 12)
    d.line((110, 160, 205, 185), fill=BLK, width=LW); d.line((402, 160, 307, 185), fill=BLK, width=LW)
    d.arc((170, 350, 342, 450), 200, 340, fill=BLK, width=LW); drop(d, 160, 330, 46); return im
def e_angry():
    im, d = canvas(); face(d); d.ellipse((40, 40, 472, 472), outline=BLK, width=LW)
    d.polygon([(105, 150), (215, 205), (215, 235), (105, 190)], fill=RED, outline=BLK); d.polygon([(407, 150), (297, 205), (297, 235), (407, 190)], fill=RED, outline=BLK)
    d.ellipse((140, 235, 200, 285), fill=BLK); d.ellipse((312, 235, 372, 285), fill=BLK)
    d.arc((170, 330, 342, 430), 200, 340, fill=BLK, width=LW)
    for a in (-30, 0, 30): d.line((420 + 0, 90 + a, 470, 70 + a * 1.4), fill=RED, width=14)
    return im
def e_scared():
    im, d = canvas(); face(d); eye(d, 165, 210, 44); eye(d, 347, 210, 44); d.line((115, 130, 215, 150), fill=BLK, width=LW); d.line((297, 150, 397, 130), fill=BLK, width=LW)
    pts = [(150 + i * 17, 370 + (12 if i % 2 else -12)) for i in range(15)]; d.line(pts, fill=BLK, width=LW, joint="curve"); drop(d, 440, 120, 50); return im
def e_confused():
    im, d = canvas(); face(d); eye(d, 170, 230, 34, -6, 4); eye(d, 342, 230, 34, -6, 4)
    d.line((110, 170, 215, 150), fill=BLK, width=LW); d.line((297, 175, 400, 150), fill=BLK, width=LW)
    d.line((170, 370, 340, 355), fill=BLK, width=LW); txt(d, (410, 80), "?", 150, RED); return im
def e_wow():
    im, d = canvas(); face(d); star(d, 170, 215, 62, RED); star(d, 342, 215, 62, RED)
    d.ellipse((216, 320, 296, 420), fill=BLK, outline=BLK); return im
def e_eyes():
    im, d = canvas()
    for cx in (150, 362):
        d.ellipse((cx - 80, 120, cx + 80, 400), fill=(255, 255, 255, 255), outline=BLK, width=LW); d.ellipse((cx - 5, 215, cx + 55, 305), fill=BLK)
    return im
def e_fire():
    im, d = canvas(); pts = [(256, 30), (330, 140), (370, 100), (440, 260), (400, 420), (256, 480), (112, 420), (72, 260), (140, 150), (180, 200)]
    d.polygon(pts, fill=LRED); d.line(pts + [pts[0]], fill=BLK, width=LW, joint="curve")
    d.polygon([(256, 200), (330, 330), (300, 430), (256, 450), (212, 430), (182, 330)], fill=CREAM, outline=BLK); return im
def e_star(): im, d = canvas(); star(d, 256, 270, 230); return im
def e_sparkles():
    im, d = canvas(); star(d, 220, 270, 190, CREAM, 4, 0.28); star(d, 395, 120, 80, RED, 4, 0.28); star(d, 400, 400, 60, CREAM, 4, 0.28); return im
def e_thumbs_up():
    im, d = canvas(); d.rounded_rectangle((60, 220, 170, 450), radius=24, fill=RED, outline=BLK, width=LW)
    pts = [(190, 250), (260, 70), (330, 95), (320, 200), (445, 200), (460, 260), (440, 410), (410, 450), (190, 450)]
    d.polygon(pts, fill=CREAM); d.line(pts + [pts[0]], fill=BLK, width=LW, joint="curve"); return im
def e_party():
    im, d = canvas()
    for i in range(70):
        a = i * 2.399; r = 40 + (i * 53) % 200; x, y = 256 + r * math.cos(a), 256 + r * math.sin(a)
        col = (RED, CREAM, LRED, GREEN, CREAM)[i % 5]; w = 34
        pts = [(x + math.cos(a + k * 1.57) * w, y + math.sin(a + k * 1.57) * w * 0.5) for k in range(4)]
        d.polygon(pts, fill=col, outline=BLK)
    return im
def e_skull():
    im, d = canvas(); d.ellipse((70, 40, 442, 360), fill=CREAM, outline=BLK, width=LW); d.rounded_rectangle((150, 320, 362, 450), radius=30, fill=CREAM, outline=BLK, width=LW)
    d.ellipse((130, 170, 230, 270), fill=BLK); d.ellipse((282, 170, 382, 270), fill=BLK); d.polygon([(256, 280), (230, 330), (282, 330)], fill=BLK)
    for x in (205, 256, 307): d.line((x, 370, x, 440), fill=BLK, width=10)
    return im
def e_hundred(): im, d = canvas(); txt(d, (256, 230), "100", 270, RED); d.line((90, 390, 430, 390), fill=RED, width=22); d.line((130, 440, 390, 440), fill=RED, width=22); return im
def e_question(): im, d = canvas(); txt(d, (256, 256), "?", 460, CREAM); return im
def e_exclaim(): im, d = canvas(); txt(d, (256, 256), "!!", 400, RED); return im
def e_clap():
    im, d = canvas()
    L = [(235, 130), (150, 150), (95, 300), (130, 430), (215, 440), (250, 330)]; Rr = [(512 - x, y) for x, y in L]
    for pts in (L, Rr):
        d.polygon(pts, fill=CREAM); d.line(pts + [pts[0]], fill=BLK, width=LW, joint="curve")
    for a_ in (-1, 0, 1): d.line((256 + a_ * 90, 70, 256 + a_ * 130, 20), fill=RED, width=16)
    return im


EMOJI = {k[2:]: v for k, v in globals().items() if k.startswith("e_")}
WHEN = {"heart": "love, thanks", "heart_eyes": "love at first sight, gorgeous visuals", "kiss": "blowing kisses, thank-you", "laugh_cry": "hilarious fail", "shocked": "unexpected event",
        "sad": "oh no, mission failed", "angry": "frustration, getting caught", "scared": "danger, suspense", "confused": "curiosity gap, what is that?", "wow": "amazing visual, achievement",
        "eyes": "look closely, curiosity hook", "fire": "hype, best moment", "star": "reward, win", "sparkles": "reveal, clean moment", "thumbs_up": "approval, nice",
        "party": "celebration", "skull": "dead from laughing or a death", "hundred": "perfect, no notes", "question": "unanswered question", "exclaim": "alert, big moment", "clap": "applause"}


def ease_back(k, s=1.70158): k -= 1; return 1 + (s + 1) * k ** 3 + s * k ** 2


def build(name):
    d = OUT / name; d.mkdir(parents=True, exist_ok=True)
    if any(d.glob("f*.png")): print(name, "has frames, skipped"); return
    base = EMOJI[name](); base.save(d / "still.png")
    for i in range(30):
        t = i / 30; k = min(t / 0.3, 1.0); sc = ease_back(k) if k < 1 else 1 + 0.04 * math.sin((t - 0.3) * 9)
        bob = 0 if k < 1 else math.sin((t - 0.3) * 7) * 6
        sc = max(sc, 0.05); w = max(1, int(256 * sc)); f = base.resize((w, w), Image.LANCZOS)
        fr = Image.new("RGBA", (512, 512), (0, 0, 0, 0)); fr.alpha_composite(f if w <= 512 else f.crop(((w - 512) // 2, (w - 512) // 2, (w + 512) // 2, (w + 512) // 2)),
                                                                      (max(0, (512 - w) // 2), max(0, int((512 - w) // 2 + bob))))
        fr = fr.crop((128, 128, 384, 384))
        fr.save(d / f"f{i + 1:03d}.png")
    (d / "manifest.json").write_text(json.dumps(dict(name=name, frames=30, fps=30, size=[256, 256], use=WHEN[name], palette="flat cream / black / red / green only"), indent=2), encoding="utf-8")
    print(name, "ok")


if __name__ == "__main__":
    for n in (sys.argv[1:] or EMOJI): build(n)
