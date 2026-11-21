"""usage: python words_of.py in.mp4 out.json  -> faster-whisper (small, CPU int8) word timestamps [[start,end,word],...] with segments"""
import json, sys
from faster_whisper import WhisperModel
m = WhisperModel("small", device="cpu", compute_type="int8")
segs, _ = m.transcribe(sys.argv[1], language="en", word_timestamps=True, vad_filter=False, beam_size=5)
out = [dict(s=round(s.start, 2), e=round(s.end, 2), text=s.text.strip(), words=[[round(w.start, 2), round(w.end, 2), w.word.strip()] for w in s.words]) for s in segs]
json.dump(out, open(sys.argv[2], "w", encoding="utf-8"), indent=1)
for o in out: print(f'{o["s"]:7.2f}-{o["e"]:7.2f} {o["text"]}')
