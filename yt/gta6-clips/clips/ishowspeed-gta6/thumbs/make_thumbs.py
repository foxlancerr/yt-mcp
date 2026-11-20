from PIL import Image, ImageDraw, ImageFont, ImageEnhance
from pathlib import Path
P = Path(__file__).parent / "parts"; OUT = Path(__file__).parent
CREAM, RED, BLACK, GREEN = (245,245,220), (255,0,0), (0,0,0), (0,255,127)
F = lambda s: ImageFont.truetype("C:/Windows/Fonts/impact.ttf", s)
def txt(d, xy, t, size, fill, stroke=8, anchor="la"):
    d.text(xy, t, font=F(size), fill=fill, stroke_width=stroke, stroke_fill=BLACK, anchor=anchor)
runner = Image.open(P / "runner.png").convert("RGBA"); runner = runner.crop(runner.getbbox())
def put_runner(img, h, x, y, flip=False):
    r = runner.resize((int(runner.width * h / runner.height), h), Image.LANCZOS)
    if flip: r = r.transpose(Image.FLIP_LEFT_RIGHT)
    img.alpha_composite(r, (x, y))
def dim(im, f): return ImageEnhance.Brightness(im).enhance(f)

# A: anomaly pointer (T6) - one red circle on the GTA minimap in a real street
a = dim(Image.open(P / "street.png").convert("RGB"), 0.85).convert("RGBA"); d = ImageDraw.Draw(a)
txt(d, (40, 18), "LOOK", 170, CREAM); txt(d, (40, 175), "CLOSER", 170, RED)
d.ellipse((122-118, 590-118, 122+118, 590+118), outline=RED, width=12)
d.line((330, 380, 235, 520), fill=RED, width=12); d.polygon([(205, 560), (258, 506), (232, 484)], fill=RED)
put_runner(a, 300, 1010, 395)
a.convert("RGB").save(OUT / "thumb_A_look-closer.png")

# B: versus split (T4) - real couch vs GTA-HUD street
b = Image.new("RGBA", (1280, 720), BLACK)
couch = Image.open(P / "couch.png").convert("RGBA"); street = Image.open(P / "street.png").convert("RGBA")
mask_l = Image.new("L", (1280, 720), 0); ImageDraw.Draw(mask_l).polygon([(0,0),(700,0),(580,720),(0,720)], fill=255)
b.paste(dim(couch.convert("RGB"), 0.9), (0, 0), mask_l)
mask_r = Image.new("L", (1280, 720), 0); ImageDraw.Draw(mask_r).polygon([(720,0),(1280,0),(1280,720),(600,720)], fill=255)
b.paste(dim(street.convert("RGB"), 0.9), (0, 0), mask_r); d = ImageDraw.Draw(b)
d.line((710, 0, 590, 720), fill=RED, width=14)
txt(d, (30, 500), "REAL", 150, CREAM); txt(d, (1250, 500), "GAME?", 150, RED, anchor="ra")
put_runner(b, 230, 560, 470)
b.convert("RGB").save(OUT / "thumb_B_real-or-game.png")

# C: number-as-hero (T1) on pitch black - own assets only, no third-party footage
c = Image.new("RGBA", (1280, 720), BLACK); d = ImageDraw.Draw(c)
put_runner(c, 640, 30, 40)
txt(d, (1250, 70), "GTA 6?", 260, CREAM, anchor="ra"); txt(d, (1250, 380), "OR REAL?", 150, RED, anchor="ra")
d.text((1250, 640), "THE UNTOLD EXIT", font=F(44), fill=GREEN, anchor="ra")
c.convert("RGB").save(OUT / "thumb_C_gta6-real.png")
print("ok")
