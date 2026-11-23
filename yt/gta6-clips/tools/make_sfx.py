"""Synthesises the two SFX the clipper library lacks (riser, glitch) with ffmpeg formulas. No samples, nothing to license.
usage: python make_sfx.py   -> writes riser.wav (3.6 s sweep) and glitch.wav (0.4 s) into .agents/skills/gta6-clipper/sounds/"""
import subprocess
from pathlib import Path

SD = Path(__file__).resolve().parents[3] / ".agents" / "skills" / "gta6-clipper" / "sounds"


def run(expr, dur, name, af=""):
    cmd = ["ffmpeg", "-y", "-loglevel", "error", "-f", "lavfi", "-i", f"aevalsrc={expr.replace(',', chr(92) + ',')}:d={dur}:s=44100"]
    if af: cmd += ["-af", af]
    subprocess.run(cmd + [str(SD / name)], check=True)


# riser: tone sweeping 180 -> 2400 Hz with a rising level, plus noise shimmer; ends at full level so the flash lands on the peak
run("(0.18+0.55*t/3.6)*sin(2*PI*(180*t+(2220/(2*3.6))*t*t))+0.10*(t/3.6)*(random(0)-0.5)", 3.6, "riser.wav", "afade=t=in:d=0.3,afade=t=out:st=3.55:d=0.05,volume=0.9")
# glitch: stuttering FM burst, gated on and off
run("0.7*sin(2*PI*1500*t*(1+0.6*sin(2*PI*45*t)))*gt(sin(2*PI*22*t),-0.2)+0.25*(random(1)-0.5)", 0.4, "glitch.wav", "afade=t=out:st=0.34:d=0.06")
print("wrote", SD / "riser.wav", SD / "glitch.wav")
