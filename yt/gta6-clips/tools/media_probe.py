"""probe(path) -> dict(width, height, fps, duration, has_audio). Uses ffprobe when present, otherwise parses `ffmpeg -i` (ffprobe.exe went missing on 2026-11-21)."""
import json, re, shutil, subprocess


def probe(path):
    if shutil.which("ffprobe"):
        j = json.loads(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "stream=codec_type,width,height,r_frame_rate:format=duration", "-of", "json", str(path)], capture_output=True, text=True).stdout)
        v = next(s for s in j["streams"] if s["codec_type"] == "video"); n, d = v["r_frame_rate"].split("/")
        return dict(width=v["width"], height=v["height"], fps=float(n) / float(d), duration=float(j["format"]["duration"]), has_audio=any(s["codec_type"] == "audio" for s in j["streams"]))
    err = subprocess.run(["ffmpeg", "-hide_banner", "-i", str(path)], capture_output=True, text=True).stderr
    m = re.search(r"Stream #\d+:\d+.*?Video:.*?, (\d{2,5})x(\d{2,5})", err); fps = re.search(r"(\d+(?:\.\d+)?) fps", err); dur = re.search(r"Duration: (\d+):(\d+):(\d+\.\d+)", err)
    if not (m and dur):
        raise RuntimeError("could not read media info: " + err[-300:])
    return dict(width=int(m[1]), height=int(m[2]), fps=float(fps[1]) if fps else 0.0, duration=int(dur[1]) * 3600 + int(dur[2]) * 60 + float(dur[3]), has_audio="Audio:" in err)
