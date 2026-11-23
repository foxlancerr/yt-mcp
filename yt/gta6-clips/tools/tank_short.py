"""GTA 6 tank Short: "Can One Tank Beat GTA 6's 6 Stars?" Built from yt/story/gta6-jason-lucia-6-star-tank-war-vice-beach/story.md.
Footage: Champs Network upload CdrKgo44AWk, 1080p (user states permission and rights, 2026-11-23). Their mark (bottom right), the blurred minimap (bottom left)
and the game subtitles (bottom) are cropped out of every shot: all crops stay above y=880 of the 1920x1080 frame.
Reuses the compositor in mandy_short.py (segments, effects, SFX, Runner reactions, end card) with this clip's paths and timeline.
usage: python tank_short.py"""
import json, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
import mandy_short as m
import reaction_kit

ROOT = m.ROOT
D = ROOT / "clips" / "tank-war"; RAW = D / "raw"; E = D / "edit"; E.mkdir(exist_ok=True); CARDS = E / "cards"; CARDS.mkdir(exist_ok=True)
m.D, m.E, m.CARDS, m.SRC = D, E, CARDS, RAW / "champs.mkv"
m.TITLE = ("CAN ONE TANK BEAT", "GTA 6'S 6 STARS?")

# crop modes (x, y, w, h, panel height): every box stays inside y < 880, away from the bottom-right mark and bottom-left minimap
MID = (240, 30, 1440, 840, 630)       # wide beach view
TIGHT = (420, 240, 1080, 630, 630)    # the vehicle, centred
CLOSE = (560, 380, 800, 480, 648)     # tighter on the vehicle
STARS = (1380, 30, 520, 150, 156)     # HUD stars, top right
HUDW = (480, 40, 1440, 840, 630)      # right-aligned: keeps the HUD stars (top right) in frame
LEFT = (0, 30, 1440, 840, 630)        # left-aligned: keeps the on-screen wanted-level message (top left) in frame
SEGS = [
    dict(k="clip", ss=461.4, d=3.5, mode=TIGHT, moves=[(0.0, 3.5, "push", 0.12)], pop=(0.2, 3.4, "ONE TANK. SIX STARS."), title=False),                                         # 0 HOOK (helicopter overhead, a beat before it blows)
    dict(k="clip", ss=464.85, d=0.1, fr=1.0, mode=TIGHT, moves=[(0.0, 1.1, "push", 0.10)], mono=True, glitch=[(0.0, 0.25), (0.8, 1.1)], title=False, mute=True),                  # 1 FREEZE, B&W
    dict(k="clip", ss=47.0, d=4.0, mode=MID, moves=[(0.0, 1.2, "punch", 0.15), (1.2, 4.0, "push", 0.08)], caps=[(0.2, 3.7, "A tank. A beach. No plan.")], title=True),             # 2
    dict(k="clip", ss=66.0, d=4.0, mode=HUDW, moves=[(0.0, 4.0, "push", 0.12)], caps=[(0.2, 3.8, "Three stars. It kept going.")], title=True),                                      # 3
    dict(k="clip", ss=143.0, d=4.0, mode=HUDW, moves=[(0.4, 1.8, "punch", 0.15), (2.0, 4.0, "push", 0.08), (2.0, 2.4, "shake", 4)], pop=(0.3, 3.8, "SIX STARS."), flash_hard=[2.0], title=True),   # 4 PEAK 1
    dict(k="clip", ss=196.0, d=3.6, mode=MID, moves=[(0.0, 3.6, "push", 0.10)], caps=[(0.2, 3.4, "Firing from the turret.")], title=True),                                          # 5
    dict(k="clip", ss=311.5, d=4.5, mode=LEFT, moves=[(0.0, 4.5, "push", 0.06)], pop=(1.4, 4.4, "YOU CAN'T LOSE IT."), title=True, glitch=[(0.0, 0.2)]),                           # 6 the game's own message + the first helicopter
    dict(k="clip", ss=365.0, d=3.6, mode=MID, moves=[(0.0, 1.4, "punch", 0.15), (1.4, 3.6, "push", 0.08)], caps=[(0.2, 3.4, "Then the heavy armour rolled in.")], title=True),     # 7
    dict(k="clip", ss=463.6, d=4.6, mode=TIGHT, moves=[(0.0, 1.2, "push", 0.08), (1.3, 2.7, "punch", 0.15), (1.4, 1.8, "shake", 5)], pop=(1.5, 4.3, "SHOT DOWN."), flash_hard=[1.4], title=True),   # 8 PEAK 2: the hook scene pays off
    dict(k="clip", ss=514.0, d=4.0, mode=MID, moves=[(0.0, 4.0, "push", 0.08)], caps=[(0.2, 3.7, "SWAT. Armour. It kept firing.")], title=True),                                    # 9
    dict(k="clip", ss=540.2, d=5.2, mode=TIGHT, moves=[(0.0, 3.6, "push", 0.08), (3.6, 4.0, "shake", 5)], caps=[(0.2, 2.6, "Then one hit.")], flash_hard=[3.8], title=True),        # 10 the hit, then the WASTED screen
    dict(k="card", imgs=lambda: m.card_text("end", "TANK VS 6 STARS.", "WASTED.", mood="shocked"), durs=[1.4, 2.0], moves=[(0.0, 3.4, "push", 0.06)]),                                 # 11 end card
]


def main():
    outs, S, t = [], [], 0.0
    for i, s in enumerate(SEGS):
        p, d = m.seg(i, s); outs.append(p); S.append(round(t, 3)); t = round(t + d, 3); print("seg", i, "start", S[-1], "dur", d)
    lst = E / "all.txt"; lst.write_text("".join(f"file '{p.name}'\n" for p in outs), encoding="utf-8")
    base = E / "base.mp4"
    m.run(["ffmpeg", "-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", lst.name, "-vf", f"fade=t=in:st=0:d=0.2,fade=t=out:st={t - 0.4:.2f}:d=0.4", "-af", f"afade=t=in:st=0:d=0.2,afade=t=out:st={t - 0.5:.2f}:d=0.5",
           "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-c:a", "aac", "-b:a", "160k", str(base)], cwd=str(E))
    sfx = [(0.2, "riser", 0.9), (2.75, "glitch", 0.8), (S[2] - 0.05, "whoosh", 0.7), (S[3] - 0.05, "whoosh", 0.35), (S[4] + 2.0, "bass_drop", 0.8), (S[6], "glitch", 0.5), (S[6] + 1.2, "heartbeat", 0.5),
           (S[7] - 0.05, "whoosh", 0.4), (S[8] + 1.4, "bass_drop", 0.8), (S[10] + 3.8, "vine_boom", 0.8), (S[10] + 4.3, "heartbeat", 0.7), (S[11], "ding", 0.6)]
    sf = [(a, m.SOUNDS / f"{n}.wav", v) for a, n, v in sfx if (m.SOUNDS / f"{n}.wav").exists()]
    fcs = "".join(f"[{k + 1}:a]aformat=sample_rates=44100:channel_layouts=stereo,adelay={int(a * 1000)}|{int(a * 1000)},volume={v}[x{k}];" for k, (a, _, v) in enumerate(sf))
    fcs += "[0:a]aformat=sample_rates=44100:channel_layouts=stereo[a0];[a0]" + "".join(f"[x{k}]" for k in range(len(sf))) + f"amix=inputs={len(sf) + 1}:normalize=0:duration=first[ao]"
    sb = E / "base_sfx.mp4"
    m.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(base), *sum((["-i", str(p)] for _, p, _ in sf), []), "-filter_complex", fcs, "-map", "0:v", "-map", "[ao]", "-c:v", "copy", "-c:a", "aac", "-b:a", "160k", str(sb)])
    events = [dict(t0=S[2] + 0.3, kind="gameplay", text="a tank on the beach, wait"), dict(t0=S[4] + 2.1, kind="gameplay", text="boom, no way", tags=["omg"]), dict(t0=S[6] + 1.2, kind="gameplay", text="a helicopter, uh oh"),
              dict(t0=S[8] + 1.5, kind="gameplay", text="shot down, omg", tags=["omg"]), dict(t0=S[10] + 4.0, kind="gameplay", text="wasted, oh no")]
    cta_dur = 3.4; out = D / "final_cta.mp4"
    plan = reaction_kit.overlay(str(sb), events, str(E / "with_reactions.mp4"), corner="br", height_frac=0.13, emoji_beside=True, stop_at=t - cta_dur - 0.1)
    import cta_kit
    sel = cta_kit.choose(plan, ["warning"], dict(type="unexpected"), "tank-war", history_file=None) | dict(text="Would the tank survive? Comment *1* yes, *2* no!", preset="comment")
    cta_kit.apply(str(E / "with_reactions.mp4"), str(out), sel, dur=cta_dur, hook=None, work=E / "cta")
    from media_probe import probe
    pr = probe(out); print("tank-war ok", json.dumps(pr)); (ROOT / "output").mkdir(exist_ok=True); (ROOT / "output" / "gta6-tank-war-cta.mp4").write_bytes(out.read_bytes())


if __name__ == "__main__":
    main()
