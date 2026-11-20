"""Cut The Runner poses from public/images/character-storyboard-01.jpg and the walk cycle from
character-walk-overlay.mp4 into transparent PNG sprites (black background removed by border flood fill,
so black hair and outlines inside the character stay opaque).
Output: yt/gta6-clips/tools/sprites/<name>.png  (+ walk/ frames)"""
import subprocess
from pathlib import Path
import cv2
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[3]
OUT = Path(__file__).parent / "sprites"; OUT.mkdir(exist_ok=True)

def matte(rgb: np.ndarray, thr=38) -> Image.Image:
    """rgb HxWx3 uint8 -> RGBA with border-connected near-black removed."""
    dark = (rgb.max(axis=2) < thr).astype(np.uint8)
    n, lab = cv2.connectedComponents(dark, connectivity=4)
    border = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]])).tolist())
    bg = np.isin(lab, [b for b in border if b != 0 and True]) & (dark == 1)
    alpha = np.where(bg, 0, 255).astype(np.uint8)
    alpha = cv2.GaussianBlur(alpha, (0, 0), 0.8)
    return Image.fromarray(np.dstack([rgb, alpha]), "RGBA")

def trim(im: Image.Image, pad=4) -> Image.Image:
    bb = im.getbbox()
    return im.crop((max(bb[0]-pad, 0), max(bb[1]-pad, 0), bb[2]+pad, bb[3]+pad))

def crop_pose(sheet: Image.Image, box, name, scale=6):
    c = sheet.crop(box)
    c = c.resize((c.width*scale, c.height*scale), Image.LANCZOS)
    rgb = np.array(c.convert("RGB"))
    im = trim(matte(rgb))
    im.save(OUT / f"{name}.png"); return im

if __name__ == "__main__":
    sheet = Image.open(ROOT / "public" / "images" / "character-storyboard-01.jpg").convert("RGB")
    # Full-body emotional spectrum (right-middle panel), boxes in sheet pixels (1024x765)
    poses = {
        "neutral":    (548, 262, 612, 352),
        "shocked":    (622, 262, 700, 352),
        "angry":      (706, 262, 780, 352),
        "sad":        (786, 262, 856, 352),
        "confused":   (880, 262, 950, 352),
        "confused2":  (548, 372, 622, 462),
        "excited":    (628, 368, 706, 462),
        "fearful":    (726, 372, 796, 462),
        "hurt":       (822, 372, 896, 462),
        "determined": (900, 372, 982, 462),
    }
    for k, b in poses.items():
        im = crop_pose(sheet, b, k); print(k, im.size)
    # walk cycle frames from the overlay video (crisp 720x1280)
    wd = OUT / "walk"; wd.mkdir(exist_ok=True)
    subprocess.run(["ffmpeg", "-y", "-i", str(ROOT / "public" / "images" / "character-walk-overlay.mp4"),
                    "-vf", "fps=24", str(wd / "f%03d.png")], capture_output=True)
    print("walk frames:", len(list(wd.glob("f*.png"))))
