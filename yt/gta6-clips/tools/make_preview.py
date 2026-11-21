"""Preview of every Runner animation and emoji: tools/sprites/_preview.mp4 (animations one after another with their name) and _preview_sheet.png.
usage: python make_preview.py"""
import json, subprocess, tempfile
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

SPR = Path(__file__).parent / "sprites"; FONT = ImageFont.truetype("C:/Windows/Fonts/impact.ttf", 34); SMALL = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 20)
names = sorted(p.name for p in (SPR / "animations").iterdir() if p.is_dir() and any(p.glob("f*.png")))
S = 540
sheet = Image.new("RGB", (6 * 180, ((len(names) + 5) // 6) * 200), (24, 24, 24)); sd = ImageDraw.Draw(sheet)
with tempfile.TemporaryDirectory() as td:
    n = 0
    for name in names:
        man = json.loads((SPR / "animations" / name / "manifest.json").read_text(encoding="utf-8")); fs = sorted((SPR / "animations" / name).glob("f*.png"))
        emo = SPR / "emoji"
        for k, f in enumerate(fs):
            bg = Image.new("RGB", (S, S), (16, 16, 16)); im = Image.open(f).resize((S, S)); bg.paste(im, (0, 0), im)
            d = ImageDraw.Draw(bg); d.text((14, 10), name.upper(), font=FONT, fill=(245, 245, 220)); d.text((14, S - 34), man["use"][:62], font=SMALL, fill=(170, 170, 150))
            bg.save(f"{td}/p{n:05d}.png"); n += 1
        mid = Image.open(fs[len(fs) // 2]).resize((170, 170)); i = names.index(name)
        sheet.paste(Image.new("RGB", (170, 170), (16, 16, 16)), ((i % 6) * 180 + 5, (i // 6) * 200 + 4)); sheet.paste(mid, ((i % 6) * 180 + 5, (i // 6) * 200 + 4), mid)
        sd.text(((i % 6) * 180 + 8, (i // 6) * 200 + 176), name, font=SMALL, fill=(245, 245, 220))
    out = SPR / "_preview.mp4"
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-framerate", "30", "-i", f"{td}/p%05d.png", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "20", str(out)], check=True)
sheet.save(SPR / "_preview_sheet.png"); print(len(names), "animations,", n, "frames ->", out)
