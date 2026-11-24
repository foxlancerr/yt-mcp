"""GTA 6 Mandy Short: "Mandy made the first move. But who is she?" Built from yt/story/gta6-mandy-real-revealed/story.md.
Footage: Punish's 1080p capture FJOXuas-OBg, "Jason Fixes Mandy's Sink Scene" (user states rights and permission, 2026-11-24).
Crops: game subtitles and Punish's mark (bottom) are cropped out; close-ups of Mandy are head-and-neck only, never body framing.
Real-life part: text cards only (cast list, voice + motion capture, her launch-day post). No photo or clip of the actress.
Ending is one simple question card (no Runner end card, no arrows). Reuses the compositor in mandy_short.py.
usage: python mandy_real_short.py"""
import json, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
import mandy_short as m
import reaction_kit

ROOT = m.ROOT
D = ROOT / "clips" / "mandy-real"; RAW = D / "raw"; E = D / "edit"; E.mkdir(exist_ok=True); CARDS = E / "cards"; CARDS.mkdir(exist_ok=True)
m.D, m.E, m.CARDS, m.SRC = D, E, CARDS, RAW / "punish.mkv"
m.TITLE = ("MEET THE REAL MANDY.", "NOW WATCH HER FLIRT.")

# crop modes (x, y, w, h, panel height) in the 1920x1080 capture. All stay above y=900.
HOOKF = (800, 415, 300, 200, 720)      # Mandy's face at the bedroom door
OUT = (240, 60, 1200, 675, 608)        # outside the bungalow, wide
OUTF = (850, 300, 300, 200, 720)       # Mandy's face outside
HALL = (200, 0, 1280, 720, 607)        # hallway, wide
DOOR = (700, 150, 600, 400, 720)       # at the bedroom door, to the chin
JAS = (1250, 420, 640, 427, 720)       # Jason under the sink (Mandy is out of this crop)
JAS2 = (1250, 380, 640, 427, 720)
LX = (0, 110, 608, 450, 800)            # Lexie Shoaibi's own upload, head and shoulders
LEXIE = RAW / "lexie_yt.mkv"
SALON = RAW / "lexie_salon.mkv"
SL = (0, 200, 608, 450, 800)            # her salon clip, head and shoulders
FA = (700, 190, 520, 347, 720)         # Mandy's face, living room
FB = (700, 20, 520, 347, 720)
FC = (640, 120, 520, 347, 720)


def cs(name, a, b, da, db): return lambda: m.card_text(name, a, b), [da, db]


SEGS = [
    dict(k="clip", src=LEXIE, ss=0.3, d=4.15, mode=LX, moves=[(0.0, 4.15, "push", 0.10)], caps=[(0.0, 1.9, "LEXIE SHOAIBI: \"Now that GTA 6 is finally out,"), (2.0, 3.5, "I can share with you guys a secret,"), (3.65, 4.1, "which is that—\"")], pop=(0.2, 4.0, "MANDY'S SECRET."), title=False),   # 0 HOOK: her own announcement, cut on "which is that"
    dict(k="clip", src=LEXIE, ss=4.43, d=0.1, fr=1.0, mode=LX, moves=[(0.0, 1.1, "push", 0.10)], mono=True, glitch=[(0.0, 0.25), (0.8, 1.1)], pop=(0.05, 1.1, "WHAT IS IT?"), title=False, mute=True),   # 1 FREEZE, B&W
    dict(k="clip", ss=28.4, d=4.1, mode=OUT, moves=[(0.0, 1.2, "punch", 0.15), (1.2, 4.1, "push", 0.06)], flash_hard=[1.27], caps=[(0.1, 4.0, "MANDY: \"He's not getting the rent until he fixes my sink.\"")], title=True),   # 2 snap to colour; her clip runs in the corner
    dict(k="clip", ss=32.5, d=3.9, mode=OUTF, moves=[(0.0, 3.9, "push", 0.10)], caps=[(0.2, 3.8, "\"So you'll have to come in and take care of that first.\"")], title=True),   # 3
    dict(k="clip", ss=42.9, d=5.1, mode=OUT, moves=[(0.0, 5.1, "push", 0.08)], caps=[(0.1, 2.3, "\"Technically, a sink is a fix.\""), (3.0, 5.0, "\"Don't make this weird. Come on.\"")], title=True),   # 4
    dict(k="clip", ss=63.0, d=6.8, mode=HALL, moves=[(0.0, 6.8, "push", 0.10)], caps=[(0.2, 6.2, "MANDY: \"I've been doing all my dishes in the bathroom.\"")], title=True, glitch=[(0.0, 0.2)]),   # 5
    dict(k="clip", ss=69.8, d=6.7, mode=DOOR, moves=[(0.4, 1.8, "punch", 0.12), (4.0, 6.7, "push", 0.12)], caps=[(0.4, 6.5, "MANDY: \"I'm not gonna jump you unless you want me to.\"")], title=True, flash_hard=[6.1]),   # 6
    dict(k="clip", ss=216.8, d=7.6, mode=JAS, moves=[(0.0, 7.6, "push", 0.08)], caps=[(0.1, 2.7, "JASON: \"I think that's called stalking, Mandy.\""), (4.5, 7.4, "MANDY: \"It's not stalking if you've met in person.\"")], title=True),   # 7
    dict(k="clip", ss=227.2, d=9.4, mode=JAS2, moves=[(0.0, 9.4, "push", 0.08)], caps=[(0.2, 4.6, "MANDY: \"I have to keep breaking appliances to get you to come see me.\""), (7.5, 9.3, "\"Whatever. I'm just kidding.\"")], pop=(7.6, 9.3, "JUST KIDDING?"), title=True),   # 8
    dict(k="clip", ss=268.0, d=7.4, mode=FA, moves=[(0.0, 7.4, "push", 0.06)], caps=[(0.1, 1.2, "MANDY: \"Who are you with?\""), (1.9, 2.6, "JASON: \"Nobody.\""), (3.4, 4.4, "MANDY: \"You're lying.\"")], title=True, glitch=[(0.0, 0.2)]),   # 9
    dict(k="clip", ss=275.4, d=7.2, mode=FB, moves=[(0.0, 7.2, "push", 0.06)], caps=[(4.7, 7.1, "MANDY: \"She told me you have an ex-girlfriend in prison.\"")], title=True),   # 10
    dict(k="clip", ss=282.6, d=10.2, mode=FC, moves=[(0.0, 10.2, "push", 0.08)], caps=[(0.9, 3.8, "MANDY: \"You're getting back together with her, aren't you?\"")], title=True),   # 11 continuous with 10, new angle
    dict(k="clip", ss=292.8, d=8.2, mode=FC, moves=[(0.2, 1.4, "punch", 0.15), (6.0, 8.2, "punch", 0.15)], caps=[(0.1, 4.0, "MANDY: \"What does a convict have that I don't have?\""), (6.1, 8.0, "\"We were supposed to get married.\"")], pop=(6.1, 8.1, "MARRIED?!"), flash_hard=[6.0], title=True),   # 12 PEAK
    dict(k="clip", src=SALON, ss=26.0, d=4.0, mode=SL, moves=[(0.0, 4.0, "push", 0.08)], mute=True, caps=[(0.2, 2.0, "Lexie Shoaibi, in real life."), (2.1, 3.9, "Mandy is beach-blonde.")], pop=(0.2, 2.0, "BRUNETTE."), title=True, glitch=[(0.0, 0.2)]),   # 13 real-life insert (her own salon upload, 2026), silent
    dict(k="card", imgs=lambda: m.card_text("cast", "THE CAST LIST SAYS", "LEXIE SHOAIBI.", mood="determined"), durs=[1.0, 1.8], glitch=[(0.0, 0.2)], flash_hard=[1.0]),   # 14
    dict(k="card", imgs=lambda: m.card_text("yes", "WOULD YOU HAVE", "SAID YES?"), durs=[1.4, 2.2], moves=[(0.0, 3.6, "push", 0.05)]),   # 15 simple closing question
]

PIP_T0 = 5.25                          # out time where her clip resumes in the corner (her t=4.45)
PIP_LEX0, PIP_LEX1 = 4.45, 13.12
PIP_CAPS = [(5.25, 6.4, "I'm in it."), (6.52, 9.4, "I play Mandy, I do her voiceover"), (9.4, 11.7, "and I do her motion capture and she's a lot of fun."), (11.84, 13.92, "So if you play the game, let me know if you find me.")]


def add_pip(base, out):
    """Her own clip in the bottom-left corner while the game scenes play; game sound ducked under her voice."""
    dur = PIP_LEX1 - PIP_LEX0; t1 = PIP_T0 + dur
    tx = []
    for j, (a, b, t) in enumerate(PIP_CAPS):
        f = E / f"pip{j}.txt"; f.write_text(m.wrap(t, 24), encoding="utf-8")
        tx.append(f"drawtext=fontfile='{m.FB}':textfile={f.name}:fontcolor=0xF5F5DC:fontsize=40:x=470:y=1585:borderw=5:bordercolor=black:line_spacing=8:enable='between(t,{a},{b})'")
    lab = E / "piplab.txt"; lab.write_text("LEXIE SHOAIBI", encoding="utf-8")
    tx.append(f"drawtext=fontfile='{m.FI}':textfile={lab.name}:fontcolor=0xFF0000:fontsize=34:x=470:y=1530:borderw=5:bordercolor=black:enable='between(t,{PIP_T0},{t1:.2f})'")
    fc = (f"[1:v]crop=608:520:0:90,scale=400:-1,setsar=1,format=yuv420p,setpts=PTS-STARTPTS+{PIP_T0}/TB[p];"
          f"[0:v][p]overlay=40:1530:enable='between(t,{PIP_T0},{t1:.2f})':eof_action=pass,drawbox=x=36:y=1526:w=408:h=350:color=0xF5F5DC:t=4:enable='between(t,{PIP_T0},{t1:.2f})'," + ",".join(tx) + "[v];"
          f"[0:a]volume='if(between(t,{PIP_T0},{t1:.2f}),0.22,1)':eval=frame,aformat=sample_rates=44100:channel_layouts=stereo[a0];"
          f"[1:a]aformat=sample_rates=44100:channel_layouts=stereo,volume=1.15,adelay={int(PIP_T0 * 1000)}|{int(PIP_T0 * 1000)}[a1];[a0][a1]amix=inputs=2:normalize=0:duration=first[ao]")
    m.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(base), "-ss", str(PIP_LEX0), "-t", str(dur), "-i", str(LEXIE), "-filter_complex", fc, "-map", "[v]", "-map", "[ao]", "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-c:a", "aac", "-b:a", "160k", str(out)], cwd=str(E))


def main():
    outs, S, t = [], [], 0.0
    for i, s in enumerate(SEGS):
        m.SRC = s.get("src", RAW / "punish.mkv"); p, d = m.seg(i, s); outs.append(p); S.append(round(t, 3)); t = round(t + d, 3); print("seg", i, "start", S[-1], "dur", d)
    lst = E / "all.txt"; lst.write_text("".join(f"file '{p.name}'\n" for p in outs), encoding="utf-8")
    base = E / "base.mp4"
    m.run(["ffmpeg", "-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", lst.name, "-vf", f"fade=t=in:st=0:d=0.2,fade=t=out:st={t - 0.4:.2f}:d=0.4", "-af", f"afade=t=in:st=0:d=0.2,afade=t=out:st={t - 0.5:.2f}:d=0.5",
           "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-c:a", "aac", "-b:a", "160k", str(base)], cwd=str(E))
    pip = E / "base_pip.mp4"; add_pip(base, pip); base = pip
    sfx = [(0.2, "riser", 0.9), (3.4, "glitch", 0.8), (S[2] - 0.05, "whoosh", 0.7), (S[2] + 1.27, "bass_drop", 0.7), (S[5] - 0.05, "whoosh", 0.35), (S[6] + 6.1, "bass_drop", 0.6), (S[7] - 0.05, "whoosh", 0.35), (S[8] + 7.6, "ding", 0.5),
           (S[9] - 0.05, "whoosh", 0.4), (S[12] + 6.0, "bass_drop", 0.9), (S[13], "whoosh", 0.4), (S[14], "glitch", 0.6), (S[14] + 0.3, "heartbeat", 0.7), (S[15], "ding", 0.6)]
    sf = [(a, m.SOUNDS / f"{n}.wav", v) for a, n, v in sfx if (m.SOUNDS / f"{n}.wav").exists()]
    fcs = "".join(f"[{k + 1}:a]aformat=sample_rates=44100:channel_layouts=stereo,adelay={int(a * 1000)}|{int(a * 1000)},volume={v}[x{k}];" for k, (a, _, v) in enumerate(sf))
    fcs += "[0:a]aformat=sample_rates=44100:channel_layouts=stereo[a0];[a0]" + "".join(f"[x{k}]" for k in range(len(sf))) + f"amix=inputs={len(sf) + 1}:normalize=0:duration=first[ao]"
    sb = E / "base_sfx.mp4"
    m.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(base), *sum((["-i", str(p)] for _, p, _ in sf), []), "-filter_complex", fcs, "-map", "0:v", "-map", "[ao]", "-c:v", "copy", "-c:a", "aac", "-b:a", "160k", str(sb)])
    events = [dict(t0=S[6] + 1.0, kind="dialogue", text="unless you want me to, whoa", tags=["omg"]),
              dict(t0=S[8] + 1.0, kind="dialogue", text="breaking appliances to see me, aww"), dict(t0=S[8] + 7.7, kind="dialogue", text="just kidding, sure"), dict(t0=S[10] + 5.0, kind="dialogue", text="ex-girlfriend in prison, uh oh"),
              dict(t0=S[12] + 6.2, kind="dialogue", text="supposed to get married, omg", tags=["omg"])]
    out = D / "final.mp4"
    reaction_kit.overlay(str(sb), events, str(out), corner="br", height_frac=0.13, emoji_beside=True, stop_at=S[14] - 0.1)
    from media_probe import probe
    pr = probe(out); print("mandy-real ok", json.dumps(pr), "cards from", S[14]); (ROOT / "output").mkdir(exist_ok=True); (ROOT / "output" / "gta6-mandy-real.mp4").write_bytes(out.read_bytes())


if __name__ == "__main__":
    main()
