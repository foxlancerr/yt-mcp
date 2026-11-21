"""Transcribe only the windows around audio spikes (not the whole stream).
usage: python transcribe_windows.py <audio> <language> [top_k=6] [before=35] [length=70] [model=small]
Reads <audio>.spikes.json (from find_spikes.py), takes the top_k by score, writes <audio>.windows.json:
[{t, start, end, score_db, text:[{s,e,text}]}]. Run with the clipper venv python (faster-whisper)."""
import json, subprocess, sys, tempfile
from pathlib import Path
from faster_whisper import WhisperModel

audio = Path(sys.argv[1]); lang = sys.argv[2]
top_k = int(sys.argv[3]) if len(sys.argv) > 3 else 6; before = int(sys.argv[4]) if len(sys.argv) > 4 else 35
length = int(sys.argv[5]) if len(sys.argv) > 5 else 70; size = sys.argv[6] if len(sys.argv) > 6 else "small"
sp = json.loads(Path(str(audio) + ".spikes.json").read_text(encoding="utf-8"))["spikes"]
sp = sorted(sorted(sp, key=lambda q: -q["score_db"])[:top_k], key=lambda q: q["t"])
model = WhisperModel(size, device="cpu", compute_type="int8")
out = []
for q in sp:
    st = max(0, q["t"] - before)
    with tempfile.TemporaryDirectory() as td:
        wav = Path(td) / "w.wav"
        subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-ss", str(st), "-t", str(length), "-i", str(audio), "-ac", "1", "-ar", "16000", str(wav)], check=True)
        segs, _ = model.transcribe(str(wav), language=lang, vad_filter=True)
        text = [dict(s=round(s.start + st, 1), e=round(s.end + st, 1), text=s.text.strip()) for s in segs]
    out.append(dict(t=q["t"], start=st, end=st + length, score_db=q["score_db"], text=text))
    print(f"window {st}s: {len(text)} segments", flush=True)
Path(str(audio) + ".windows.json").write_text(json.dumps(out, ensure_ascii=False, indent=1), encoding="utf-8")
print("done", flush=True)
