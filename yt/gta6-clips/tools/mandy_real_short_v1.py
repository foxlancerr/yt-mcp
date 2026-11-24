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
m.TITLE = ("MANDY MADE THE FIRST MOVE.", "BUT WHO IS SHE?")

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
FA = (700, 190, 520, 347, 720)         # Mandy's face, living room
FB = (700, 20, 520, 347, 720)
FC = (640, 120, 520, 347, 720)


def cs(name, a, b, da, db): return lambda: m.card_text(name, a, b), [da, db]


SEGS = [
    dict(k="clip", ss=71.3, d=2.8, mode=HOOKF, moves=[(0.0, 2.8, "push", 0.14)], caps=[(0.1, 2.75, "MANDY: \"I'm not gonna jump you unless—\"")], pop=(0.2, 2.7, "SHE FLIRTED FIRST."), title=False),                       # 0 HOOK: cut on the pause after "unless"
    dict(k="clip", ss=74.0, d=0.1, fr=1.0, mode=HOOKF, moves=[(0.0, 1.1, "push", 0.10)], mono=True, glitch=[(0.0, 0.25), (0.8, 1.1)], caps=[(0.05, 1.1, "The real Mandy is revealed at the end.")], pop=(0.05, 1.1, "WHAT DID JASON DO?"), title=False, mute=True),         # 1 FREEZE, B&W, open loop
    dict(k="clip", ss=28.4, d=4.1, mode=OUT, moves=[(0.0, 1.2, "punch", 0.15), (1.2, 4.1, "push", 0.06)], caps=[(0.1, 4.0, "MANDY: \"He's not getting the rent until he fixes my sink.\"")], title=True),   # 2
    dict(k="clip", ss=32.5, d=3.9, mode=OUTF, moves=[(0.0, 3.9, "push", 0.10)], caps=[(0.2, 3.8, "\"So you'll have to come in and take care of that first.\"")], title=True),   # 3 same take, new angle
    dict(k="clip", ss=42.9, d=5.1, mode=OUT, moves=[(0.0, 5.1, "push", 0.08)], caps=[(0.1, 2.3, "\"Technically, a sink is a fix.\""), (3.0, 5.0, "\"Don't make this weird. Come on.\"")], title=True),   # 4
    dict(k="clip", ss=63.0, d=6.8, mode=HALL, moves=[(0.0, 6.8, "push", 0.10)], caps=[(0.2, 6.2, "MANDY: \"I've been doing all my dishes in the bathroom.\"")], title=True, glitch=[(0.0, 0.2)]),   # 5
    dict(k="clip", ss=69.8, d=6.7, mode=DOOR, moves=[(0.4, 1.8, "punch", 0.12), (4.0, 6.7, "push", 0.12)], caps=[(0.4, 6.5, "MANDY: \"I'm not gonna jump you unless you want me to.\"")], title=True, flash_hard=[6.1]),   # 6 the hook line, in full
    dict(k="clip", ss=216.8, d=7.6, mode=JAS, moves=[(0.0, 7.6, "push", 0.08)], caps=[(0.1, 2.7, "JASON: \"I think that's called stalking, Mandy.\""), (4.5, 7.4, "MANDY: \"It's not stalking if you've met in person.\"")], title=True),   # 7 under the sink, face only
    dict(k="clip", ss=227.2, d=9.4, mode=JAS2, moves=[(0.0, 9.4, "push", 0.08)], caps=[(0.2, 4.6, "MANDY: \"I have to keep breaking appliances to get you to come see me.\""), (7.5, 9.3, "\"Whatever. I'm just kidding.\"")], pop=(7.6, 9.3, "JUST KIDDING?"), title=True),   # 8
    dict(k="clip", ss=268.0, d=7.4, mode=FA, moves=[(0.0, 7.4, "push", 0.06)], caps=[(0.1, 1.2, "MANDY: \"Who are you with?\""), (1.9, 2.6, "JASON: \"Nobody.\""), (3.4, 4.4, "MANDY: \"You're lying.\"")], title=True, glitch=[(0.0, 0.2)]),   # 9
    dict(k="clip", ss=275.4, d=7.2, mode=FB, moves=[(0.0, 7.2, "push", 0.06)], caps=[(4.7, 7.1, "MANDY: \"She told me you have an ex-girlfriend in prison.\"")], title=True),   # 10
    dict(k="clip", ss=292.3, d=8.7, mode=FC, moves=[(0.4, 1.6, "punch", 0.15), (6.4, 8.7, "punch", 0.15)], caps=[(0.5, 4.6, "MANDY: \"What does a convict have that I don't have?\""), (6.6, 8.5, "\"We were supposed to get married.\"")], pop=(6.6, 8.6, "MARRIED?!"), flash_hard=[6.5], title=True),   # 11 PEAK 1
    dict(k="card", imgs=lambda: m.card_text("who", "BUT WHO IS", "THE REAL MANDY?", mood="confused"), durs=[1.0, 1.2], glitch=[(0.0, 0.25)]),                        # 12
    dict(k="card", imgs=lambda: m.card_text("cast", "THE CAST LIST SAYS", "LEXIE SHOAIBI."), durs=[1.0, 1.4], moves=[(0.0, 2.4, "push", 0.05)], flash_hard=[1.0]),   # 13
    dict(k="clip", src=LEXIE, ss=0.0, d=13.1, mode=LX, moves=[(0.0, 13.1, "push", 0.06), (5.6, 6.6, "punch", 0.12)], title=True, flash_hard=[5.7], pop=(5.7, 7.2, "I PLAY MANDY."),
         caps=[(0.1, 2.2, "LEXIE SHOAIBI: \"Now that GTA 6 is finally out,"), (2.3, 3.9, "I can share with you guys a secret,"), (3.95, 5.5, "which is that I'm in it."), (5.7, 8.5, "I play Mandy, I do her voiceover"),
               (8.6, 10.9, "and I do her motion capture and she's a lot of fun."), (11.0, 13.1, "So if you play the game, let me know if you find me.\"")]),     # 14 her own announcement, whole (her upload "Hi I'm Mandy!", 2026-11-19)
    dict(k="card", imgs=lambda: m.card_text("yes", "WOULD YOU HAVE", "SAID YES?", mood="determined"), durs=[1.4, 2.2], moves=[(0.0, 3.6, "push", 0.05)]),           # 16 simple closing question
]


def main():
    outs, S, t = [], [], 0.0
    for i, s in enumerate(SEGS):
        m.SRC = s.get("src", RAW / "punish.mkv"); p, d = m.seg(i, s); outs.append(p); S.append(round(t, 3)); t = round(t + d, 3); print("seg", i, "start", S[-1], "dur", d)
    lst = E / "all.txt"; lst.write_text("".join(f"file '{p.name}'\n" for p in outs), encoding="utf-8")
    base = E / "base.mp4"
    m.run(["ffmpeg", "-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", lst.name, "-vf", f"fade=t=in:st=0:d=0.2,fade=t=out:st={t - 0.4:.2f}:d=0.4", "-af", f"afade=t=in:st=0:d=0.2,afade=t=out:st={t - 0.5:.2f}:d=0.5",
           "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-c:a", "aac", "-b:a", "160k", str(base)], cwd=str(E))
    sfx = [(0.2, "riser", 0.9), (2.75, "glitch", 0.8), (S[2] - 0.05, "whoosh", 0.7), (S[5] - 0.05, "whoosh", 0.35), (S[6] + 6.1, "bass_drop", 0.6), (S[7] - 0.05, "whoosh", 0.35), (S[8] + 7.6, "ding", 0.5),
           (S[9] - 0.05, "whoosh", 0.4), (S[11] + 6.5, "bass_drop", 0.9), (S[12], "glitch", 0.6), (S[12] + 0.3, "heartbeat", 0.7), (S[14] - 0.05, "whoosh", 0.4), (S[14] + 5.7, "bass_drop", 0.8), (S[15], "ding", 0.6)]
    sf = [(a, m.SOUNDS / f"{n}.wav", v) for a, n, v in sfx if (m.SOUNDS / f"{n}.wav").exists()]
    fcs = "".join(f"[{k + 1}:a]aformat=sample_rates=44100:channel_layouts=stereo,adelay={int(a * 1000)}|{int(a * 1000)},volume={v}[x{k}];" for k, (a, _, v) in enumerate(sf))
    fcs += "[0:a]aformat=sample_rates=44100:channel_layouts=stereo[a0];[a0]" + "".join(f"[x{k}]" for k in range(len(sf))) + f"amix=inputs={len(sf) + 1}:normalize=0:duration=first[ao]"
    sb = E / "base_sfx.mp4"
    m.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(base), *sum((["-i", str(p)] for _, p, _ in sf), []), "-filter_complex", fcs, "-map", "0:v", "-map", "[ao]", "-c:v", "copy", "-c:a", "aac", "-b:a", "160k", str(sb)])
    events = [dict(t0=0.4, kind="dialogue", text="she flirted first, wait"), dict(t0=S[2] + 0.4, kind="dialogue", text="fix my sink, uh huh"), dict(t0=S[6] + 1.0, kind="dialogue", text="unless you want me to, whoa", tags=["omg"]),
              dict(t0=S[8] + 1.0, kind="dialogue", text="breaking appliances to see me, aww"), dict(t0=S[8] + 7.7, kind="dialogue", text="just kidding, sure"), dict(t0=S[10] + 5.0, kind="dialogue", text="ex-girlfriend in prison, uh oh"),
              dict(t0=S[11] + 6.7, kind="dialogue", text="supposed to get married, omg", tags=["omg"])]
    out = D / "final.mp4"
    reaction_kit.overlay(str(sb), events, str(out), corner="br", height_frac=0.13, emoji_beside=True, stop_at=S[12] - 0.1)
    from media_probe import probe
    pr = probe(out); print("mandy-real ok", json.dumps(pr), "cards from", S[12]); (ROOT / "output").mkdir(exist_ok=True); (ROOT / "output" / "gta6-mandy-real.mp4").write_bytes(out.read_bytes())


if __name__ == "__main__":
    main()
