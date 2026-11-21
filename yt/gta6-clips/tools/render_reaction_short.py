"""Streamer-reaction Short (face on top, game below, The Runner reacting in the bottom band).
usage: python render_reaction_short.py <key>        (keys in CLIPS)
Step 1: FFmpeg builds the base: blurred game background, facecam crop (top), game crop (middle, stream overlays cut out),
        persistent hook title, captions on the face/game seam, one pattern-interrupt pop, profanity muted, brand tag.
Step 2: reaction_kit overlays The Runner's animations + emoji, chosen by reaction_engine from the real events listed.
Step 3: checks the output (size, fps, duration, audio) and writes caption.md / source.md."""
import json, subprocess, sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import reaction_kit

ROOT = Path(__file__).resolve().parents[1]
FB, FI = "C\\:/Windows/Fonts/arialbd.ttf", "C\\:/Windows/Fonts/impact.ttf"

CLIPS = {
 "speed-mandy-sink": dict(
  vid="qSyo5d-dVzA", src_offset="2:01:15", start=9.0, dur=62.0,
  cam=(4, 466, 380, 234), game=(400, 90, 1300, 862),          # crops in the 1920x1080 source: facecam, game without chat/logo/timer/minimap
  hook=("Speed MISREAD what", "Mandy WANTED in GTA 6"),
  caps=[(0.1, 1.8, "\"Where's your plunger?\""), (1.9, 4.8, "MANDY: \"Bathroom. Across the hall.\""), (10.6, 12.8, "\"Why am I getting a plunger?\""),
        (12.9, 15.2, "MANDY: \"Well, then get to work.\""), (16.4, 18.8, "SPEED: I'm about to fix her sink."), (18.9, 21.7, "SPEED: Who she think I am, Fix-It Felix?"),
        (27.8, 30.5, "SPEED: Oh my god."), (34.0, 36.2, "\"Oh, you lost?\""), (36.2, 38.0, "\"Oh yeah, I'm lost.\""), (38.0, 40.6, "MANDY: \"Not this sink, silly.\""),
        (41.0, 43.9, "\"The kitchen sink.\""), (44.0, 46.6, "SPEED: Chat, I'm stupid."), (46.6, 49.4, "SPEED: I thought she meant HER sink."),
        (49.9, 52.6, "SPEED: I'm tweaking. My fault, my fault."), (53.9, 56.6, "SPEED: Chat, I thought she meant her sink."), (56.6, 59.4, "SPEED: Bro, did you think...?"),
        (60.3, 62.0, "SPEED: Okay.")],
  pops=[(34.0, 36.4, "WRONG SINK?!")],
  mute=[(15.7, 16.45)],                                          # profanity at the start of "I'm about to fix her sink"
  punch=(44.0, 46.6),                                            # facecam zoom punch on the facepalm
  events=[dict(t0=0.3, kind="hook", text="which sink? mystery"),
          dict(t0=10.7, kind="dialogue", text="why am I getting a plunger?"),
          dict(t0=16.5, kind="dialogue", text="who she think I am", tags=["mad"]),
          dict(t0=34.2, kind="gameplay", text="not this sink, silly", tags=["omg"]),
          dict(t0=44.2, kind="dialogue", text="I thought she meant her sink, facepalm", tags=["lmao"]),
          dict(t0=50.0, kind="dialogue", text="my fault my fault", tags=["lol"]),
          dict(t0=60.3, kind="dialogue", text="okay", tags=["phew"])],
  notes="The window ends before Mandy's swimsuit scene.",
  caption_text="Speed thought Mandy meant a different sink in GTA 6. Reaction from IShowSpeed's GTA 6 stream.",
  tags="#gta6 #ishowspeed #gtavi #gaming #shorts"),
}


from speed_clips import EXTRA   # more clips live in speed_clips.py
CLIPS.update(EXTRA)


def dt(f, font, color, size, x, y, en, extra=""):
    return f"drawtext=fontfile='{font}':textfile={f}:fontcolor={color}:fontsize={size}:x={x}:y={y}:enable='between(t,{en[0]},{en[1]})'{extra}"


def wrap(s, n=30):
    out, line = [], ""
    for w in s.split():
        if len(line) + len(w) + 1 > n and line: out.append(line); line = w
        else: line = (line + " " + w).strip()
    return "\n".join(out + [line])


def render(key, cta=None):
    c = CLIPS[key]; d = ROOT / "clips" / key; E = d / "edit"; E.mkdir(exist_ok=True)
    src = d / "raw" / "source.mp4"; segs = c.get("segments")
    lay = [(x[2] if len(x) > 2 else {}) for x in segs] if segs else []     # a segment may carry its own crops: (start, end, dict(cam=(x,y,w,h), game=(x,y,w,h)))
    segs = [(x[0], x[1]) for x in segs] if segs else segs
    dur = round(sum(e - s for s, e in segs), 3) if segs else c["dur"]            # segments = jump-cut pieces of the raw window, joined in order
    cx, cy, cw, ch = c["cam"]; gx, gy, gw, gh = c["game"]
    CAM_H, CAM_Y = 665, 160; GAME_H = int(round(1080 * gh / gw / 2) * 2)   # keeps the game's aspect; 862px tall cuts off the game's own subtitles
    GAME_Y = CAM_Y + CAM_H + 10; BAND_Y = GAME_Y + GAME_H
    chain = []
    for i, (txt, col, yy) in enumerate(((c["hook"][0], "0xF5F5DC", 14), (c["hook"][1], "0xFF0000", 84))):
        f = E / f"hook{i}.txt"; f.write_text(txt, encoding="utf-8")
        chain.append(dt(f.name, FI, col, 66, "(w-text_w)/2", yy, (0, dur), ":borderw=6:bordercolor=black"))
    for i, (a, b, t) in enumerate(c["caps"]):
        f = E / f"cap{i}.txt"; f.write_text(wrap(t, 30), encoding="utf-8")
        chain.append(dt(f.name, FB, "0xF5F5DC", 50, "(w-text_w)/2", f"{CAM_Y + CAM_H - 40}-text_h", (a, b), ":borderw=6:bordercolor=black:line_spacing=8"))
    for i, (a, b, t) in enumerate(c["pops"]):
        f = E / f"pop{i}.txt"; f.write_text(t, encoding="utf-8")
        chain.append(dt(f.name, FI, "0xFF0000", f"'92+30*max(0,1-(t-{a})*5)'", 50, BAND_Y + 40, (a, b), ":borderw=7:bordercolor=black"))
    for i, (a, b, l1, l2) in enumerate(c.get("cards", [])):      # full-frame title card (e.g. "13 HOURS / LATER"): darkens the frame, the clip audio keeps playing underneath
        chain.append(f"drawbox=x=0:y=0:w=iw:h=ih:color=black@0.86:t=fill:enable='between(t,{a},{b})'")
        for j, (txt, col, yy) in enumerate(((l1, "0xF5F5DC", 700), (l2, "0xFF0000", 880))):
            f = E / f"card{i}_{j}.txt"; f.write_text(txt, encoding="utf-8")
            chain.append(dt(f.name, FI, col, f"'150+40*max(0,1-(t-{a})*4)'", "(w-text_w)/2", yy, (a, b), ":borderw=8:bordercolor=black"))
    tag = E / "tag.txt"; tag.write_text("THE UNTOLD EXIT", encoding="utf-8")
    chain.append(dt(tag.name, FB, "0xAAAA96", 26, 40, 1870, (0, dur)))
    chain.append(f"fade=t=in:st=0:d=0.25,fade=t=out:st={dur - 0.4:.2f}:d=0.4")
    punches = c["punch"] if isinstance(c["punch"], list) else [c["punch"]]
    pz = "+".join(f"between(t,{a},{b})" for a, b in punches)
    camz = f"scale=w='trunc(1080*(1+0.10*min(1,{pz}))/2)*2':h=-2:eval=frame,crop=1080:{CAM_H}"
    vol = ",".join(f"volume=0:enable='between(t,{a},{b})'" for a, b in c["mute"]) or "anull"
    if segs:      # every piece gets its own crops (default = the clip's cam/game), then the pieces are joined stream by stream
        pre = ""
        for k, (s, e) in enumerate(segs):
            cc = lay[k].get("cam", c["cam"]); gg = lay[k].get("game", c["game"])
            pre += (f"[0:v]trim=start={s}:end={e},setpts=PTS-STARTPTS,fps=30,split=3[sa{k}][sb{k}][sg{k}];"
                    f"[sa{k}]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,boxblur=30:3,eq=brightness=-0.18:saturation=0.85[bg{k}];"
                    f"[sb{k}]crop={cc[2]}:{cc[3]}:{cc[0]}:{cc[1]},scale=1080:{CAM_H},setsar=1[cm{k}];"
                    f"[sg{k}]crop={gg[2]}:{gg[3]}:{gg[0]}:{gg[1]},scale=1080:{GAME_H},setsar=1[gm{k}];"
                    f"[0:a]atrim=start={s}:end={e},asetpts=PTS-STARTPTS[ta{k}];")
        n = len(segs)
        pre += "".join(f"[bg{k}]" for k in range(n)) + f"concat=n={n}:v=1:a=0[bg];" + "".join(f"[cm{k}]" for k in range(n)) + f"concat=n={n}:v=1:a=0[cam0];"
        pre += "".join(f"[gm{k}]" for k in range(n)) + f"concat=n={n}:v=1:a=0[game];" + "".join(f"[ta{k}]" for k in range(n)) + f"concat=n={n}:v=0:a=1[ac];"
        fc = (pre + f"[cam0]{camz}[cam];"
              f"[bg][cam]overlay=0:{CAM_Y}[v1];[v1][game]overlay=0:{GAME_Y},format=yuv420p," + ",".join(chain) + "[v];"
              f"[ac]{vol},afade=t=in:st=0:d=0.2,afade=t=out:st={dur - 0.5:.2f}:d=0.5[aout]")
    else:
        fc = ("[0:v]fps=30,split=3[a][b][g];"
              f"[a]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,boxblur=30:3,eq=brightness=-0.18:saturation=0.85[bg];"
              f"[b]crop={cw}:{ch}:{cx}:{cy},scale=1080:{CAM_H},{camz}[cam];"
              f"[g]crop={gw}:{gh}:{gx}:{gy},scale=1080:{GAME_H}[game];"
              f"[bg][cam]overlay=0:{CAM_Y}[v1];[v1][game]overlay=0:{GAME_Y},format=yuv420p," + ",".join(chain) + "[v];"
              f"[0:a]{vol},afade=t=in:st=0:d=0.2,afade=t=out:st={dur - 0.5:.2f}:d=0.5[aout]")
    base = E / "base.mp4"
    import os
    if os.environ.get("REUSE_BASE") and base.exists(): r = type("R", (), dict(returncode=0))()      # REUSE_BASE=1: skip the slow base render when only reactions or the CTA changed
    else: r = subprocess.run(["ffmpeg", "-y", "-loglevel", "error", *([] if segs else ["-ss", str(c["start"]), "-t", str(dur)]), "-i", str(src), "-filter_complex", fc,
                        "-map", "[v]", "-map", "[aout]", "-r", "30", "-c:v", "libx264", "-preset", "medium", "-crf", "19", "-c:a", "aac", "-b:a", "160k", str(base)],
                       capture_output=True, text=True, cwd=str(E))
    if r.returncode: print("base FAILED", r.stderr[-1500:]); return False
    if c.get("sfx"):      # sound effects from gta6-clipper/sounds mixed under the clip: [(t, name, volume)]
        sd = ROOT.parents[1] / ".agents" / "skills" / "gta6-clipper" / "sounds"; sf = [(t, sd / f"{n}.wav", v) for t, n, v in c["sfx"] if (sd / f"{n}.wav").exists()]
        fcs = "".join(f"[{k + 1}:a]aformat=sample_rates=44100:channel_layouts=stereo,adelay={int(t * 1000)}|{int(t * 1000)},volume={v}[x{k}];" for k, (t, _, v) in enumerate(sf))
        fcs += "[0:a]aformat=sample_rates=44100:channel_layouts=stereo[a0];[a0]" + "".join(f"[x{k}]" for k in range(len(sf))) + f"amix=inputs={len(sf) + 1}:normalize=0:duration=first[ao]"
        sb = E / "base_sfx.mp4"; rs = subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(base), *sum((["-i", str(p)] for _, p, _ in sf), []), "-filter_complex", fcs, "-map", "0:v", "-map", "[ao]", "-c:v", "copy", "-c:a", "aac", "-b:a", "160k", str(sb)], capture_output=True, text=True)
        if rs.returncode: print("sfx FAILED", rs.stderr[-800:]); return False
        base = sb
    out = d / ("final_cta.mp4" if cta else "final.mp4"); cta_on = bool(cta if cta is not None else c.get("cta")); cta_dur = 3.2
    plan = reaction_kit.overlay(str(base) if not cta_on else str(base), c["events"], str(E / "with_reactions.mp4") if cta_on else str(out), corner="br", height_frac=0.13, emoji_beside=True,
                                stop_at=(dur - cta_dur - 0.1) if cta_on else None)
    (E / "reactions.json").write_text(json.dumps(plan, indent=1), encoding="utf-8")
    if cta_on:    # end-screen CTA: the Runner talks to viewers; wording, gesture and graphic chosen from this clip's real reactions and captions
        import cta_kit
        ct = c["cta"] if isinstance(c.get("cta"), dict) else {}
        sel = cta_kit.choose(plan, [x[2] for x in c["caps"]], dict(cliffhanger=ct.get("cliffhanger"), type=ct.get("type")), key, history_file=ct.get("history"))
        if ct.get("text"): sel.update(text=ct["text"], preset=ct.get("preset", sel["preset"]))
        info = cta_kit.apply(str(E / "with_reactions.mp4"), str(out), sel, dur=cta_dur, hook=(c["hook"][1] if ct.get("loop") else None), work=E / "cta")
        (E / "cta.json").write_text(json.dumps(dict(sel, **info), indent=1), encoding="utf-8"); print("cta:", sel["type"], "|", sel["text"], "|", sel["preset"], sel.get("gesture"))
    from media_probe import probe
    pr = probe(out)
    assert (pr["width"], pr["height"]) == (1080, 1920) and abs(pr["duration"] - dur) < 0.3 and pr["has_audio"], pr   # verify before claiming success
    link = f"https://www.youtube.com/watch?v={c['vid']}"
    win = ", ".join(f"{s:.1f}-{e:.1f}s" for s, e in segs) if segs else f"{c['start']:.0f}s, {dur:.0f}s long"
    (d / "caption.md").write_text(f"{c['caption_text']}\n\nFootage: IShowSpeed, {link} ({c.get('src_note') or 'stream ' + c['src_offset'] + ' + ' + win})\n\n{c['tags']}\n", encoding="utf-8")
    (d / "source.md").write_text(
        f"# Source\n\n- URL: {link} (IShowSpeed, \"PLAYING GTA 6 EARLY ACCESS GAMEPLAY GET IN HERE!\")\n- License: standard YouTube license. **Not Creative Commons, no written permission on file.**\n"
        f"- Decision: the user instructed on 2026-11-21 to source it from YouTube without CC or permission and accepted the copyright risk.\n"
        f"- Window: {c.get('src_note') or 'stream ' + c['src_offset'] + ' + ' + win} (total {dur:.1f}s).\n- Removed: chat, stream logo, stream timer, viewer counter, minimap (cropped out). Profanity muted at {c['mute']}.\n"
        f"- Not removed: game audio and any music under it; Speed's voice. {c.get('notes', '')}\n"
        f"- Captions: from YouTube's auto captions + faster-whisper, checked against both. Unlabelled quotes are game lines whose speaker I could not confirm.\n", encoding="utf-8")
    (ROOT / "output").mkdir(exist_ok=True); (ROOT / "output" / f"gta6-{key}{'-cta' if out.name == 'final_cta.mp4' else ''}.mp4").write_bytes(out.read_bytes())
    print(key, "ok", json.dumps(pr)); return True


if __name__ == "__main__":
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    for k in (args or list(CLIPS)): render(k, cta=True if "--cta" in sys.argv else None)
