"""Find reaction spikes (sudden loud moments) in a long stream's audio, cheaply (no transcription of the whole stream).
usage: python find_spikes.py <audio_file> [top_n=12] [min_gap_s=90]   -> prints and writes <audio>.spikes.json
Method: decode to 8 kHz mono, RMS per second, score = how far a second sits above its own 5-minute rolling median (in dB),
then keep the highest scores at least min_gap_s apart. Streams shout at big moments, so spikes are candidates, not decisions:
a person still reads the transcript window before anything is picked."""
import json, subprocess, sys
from pathlib import Path
import numpy as np

src = Path(sys.argv[1]); top_n = int(sys.argv[2]) if len(sys.argv) > 2 else 12; gap = int(sys.argv[3]) if len(sys.argv) > 3 else 90
SR = 8000
p = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", str(src), "-ac", "1", "-ar", str(SR), "-f", "s16le", "-"], capture_output=True)
a = np.frombuffer(p.stdout, dtype=np.int16).astype(np.float32) / 32768.0
n = len(a) // SR
if n < 60:
    sys.exit(f"audio too short or decode failed ({n}s): {p.stderr.decode(errors='replace')[:300]}")
rms = np.sqrt((a[: n * SR].reshape(n, SR) ** 2).mean(axis=1) + 1e-12)
db = 20 * np.log10(rms)
win = 300
pad = np.pad(db, (win // 2, win // 2), mode="edge")
med = np.array([np.median(pad[i:i + win]) for i in range(0, n, 1)]) if n < 4000 else np.interp(
    np.arange(n), np.arange(0, n, 10), [np.median(pad[i:i + win]) for i in range(0, n, 10)])
score = db - med
# 3-second smoothed so one pop does not win
sm = np.convolve(score, np.ones(3) / 3, mode="same")
order = np.argsort(sm)[::-1]; picks = []
for i in order:
    if sm[i] < 6: break
    if all(abs(int(i) - q["t"]) >= gap for q in picks):
        picks.append(dict(t=int(i), score_db=round(float(sm[i]), 1), level_db=round(float(db[i]), 1)))
    if len(picks) >= top_n: break
out = dict(file=src.name, seconds=n, spikes=sorted(picks, key=lambda q: q["t"]))
Path(str(src) + ".spikes.json").write_text(json.dumps(out, indent=1), encoding="utf-8")
print(f"{src.name}: {n}s decoded, {len(picks)} spikes")
for q in out["spikes"]:
    t = q["t"]; print(f"  {t//3600}:{t%3600//60:02d}:{t%60:02d}  +{q['score_db']} dB over local median")
