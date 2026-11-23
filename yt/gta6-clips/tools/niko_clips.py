"""IShowSpeed meets Niko Bellic in GTA 6: landscape 4-minute cut. Source: his stream OIeLbmyraRQ "BEATING GTA 6 RIGHT NOW 100% (FINAL MISSION)".
Window A = stream 1:40:40-1:44:50 (source clock 0-250), window B = stream 3:08:50-3:10:10 (source clock 1000-1080, i.e. B time + 1000).
Everything below is written in SOURCE time and converted to OUTPUT time by `mapper`. Words: YouTube auto-captions + faster-whisper (edit/wordtimes);
only lines both support are captioned; game lines are unlabelled (speaker not confirmed unless the game names him)."""
import json, re
from pathlib import Path
from cass_clips import mapper

MEDIA = Path(__file__).resolve().parents[1] / "media" / "niko"
A, B = MEDIA / "win_niko.mp4", MEDIA / "win_niko2.mp4"

PIECES = [            # (window, start, end, options) in output order. B times are real window seconds; the mapper clock adds 1000 for B
    ("A", 150.0, 155.2),                       # 0 teaser: "please, please, I beg you" + Speed's hands up (game blurred)
    ("A", 23.5, 54.0),                         # 1 arrival: "Look who it is", "He's from GTA 4"
    ("A", 54.0, 84.0),                         # 2 the problem: shipment, cartels, Olaf
    ("A", 91.5, 112.0),                        # 3 "I haven't killed anybody since 2012"
    ("A", 112.3, 136.0),                       # 4 "clean up your mess" / "I have a plan"
    ("A", 138.5, 147.0),                       # 5 "Nico, relax"
    ("A", 147.0, 172.0, {"freeze": 0.7}),      # 6 the plea and "what happens next" (game blurred)
    ("A", 172.0, 194.0),                       # 7 Speed's reaction
    ("A", 194.0, 209.0, {"speed": 1.25}),      # 8 the plan, sped up
    ("A", 226.5, 236.0),                       # 9 "they play the GTA 4 music"
    ("B", 21.0, 71.0),                         # 10 the other clip: the field, "that's the main character from GTA 4"
]
SEG = [(1000 + p[1] if p[0] == "B" else p[1], 1000 + p[2] if p[0] == "B" else p[2], *(p[3:] or [{}])) for p in PIECES]
O = mapper([(s, e, o) for s, e, o in SEG], tail_from=140)       # the teaser repeats A 150-155: later items map to the plea in piece 6
TOT = O.total


def T(a, b=None):
    return (O(a), O(b)) if b is not None else O(a)


def B_(t):
    return 1000 + t


def conv(lst):
    out = []
    for a, b, *r in lst:
        try:
            out.append((O(a), O(b), *r))
        except ValueError:
            pass
    return out


CAPS = conv([
    (24.5, 27.2, '"Oh no. Look who it is."'), (28.0, 31.5, '"It\'s been a long time."'), (34.5, 37.5, '"Giorgio, cover your balls."'),
    (47.0, 50.0, 'SPEED: "He\'s from GTA 4!"'), (51.0, 54.0, 'SPEED: "That\'s from GTA 4!"'),
    (56.0, 58.5, '"Is it about a shipment?"'), (60.0, 63.0, '"We\'re going to get it back."'), (68.0, 70.5, '"It\'s too late, Giorgio."'),
    (72.0, 76.5, '"We\'ve already missed too many shipments."'), (77.0, 80.0, '"The cartels decided to go another way."'), (81.0, 83.5, '"Olaf Jensen."'),
    (92.0, 95.0, '"I haven\'t killed anybody since 2012."'), (96.0, 100.0, '"No, no, no... please, you can\'t."'), (100.5, 102.5, '"You can do both."'),
    (112.5, 116.5, '"We tried to clean up your mess, and you bring the mess home with you."'), (117.5, 120.5, '"Just give me Dan and a few of the guys."'),
    (121.0, 124.0, '"The next shipment\'s already left."'), (130.0, 133.0, '"I have a plan. I promise you."'),
    (139.0, 141.5, '"Nico, Nico... relax."'), (143.5, 146.0, '"I was a kid in 2012."'),
    (148.5, 152.5, '"Please, please... I beg you."'), (162.0, 166.5, '"One more chance, Giorgio. I don\'t have to tell you what happens next."'),
    (172.0, 174.0, 'SPEED: "Oh my god."'), (174.5, 177.5, 'SPEED: "My brother too young, bro!"'), (177.6, 181.0, 'SPEED: "These young kids always trying to lurk."'),
    (186.0, 189.0, 'SPEED: "Act like I don\'t know who that is."'),
    (194.5, 197.5, '"How are we supposed to fix this?"'), (198.0, 203.0, '"There will be 20,000 containers on that ship."'),
    (228.0, 232.0, 'SPEED: "Oh, they play the GTA 4 music as well!"'),
    (B_(26.0), B_(29.0), '"Go. Your check will come in the mail."'), (B_(36.0), B_(42.0), '"I thought that annoying little Italian was dead for sure."'),
    (B_(44.0), B_(46.5), '"So, we good here?"'), (B_(50.0), B_(54.0), '"You can go. He\'ll drive you this way."'),
    (B_(57.0), B_(61.0), 'SPEED: "That\'s the main character from GTA 4."'), (B_(61.5), B_(65.0), '"I guess it\'s time to go home."'),
    (B_(66.0), B_(67.3), '"I was beginning to like it down here."'),
])
CAPS.insert(0, (0.3, 4.9, '"Please, please... I beg you."'))      # the teaser plays A 150-155.2 (items at those source times land in piece 6)
POPS = conv([
    (24.8, 27.8, "LOOK WHO IT IS"), (47.2, 50.2, "FROM GTA 4?!"), (92.0, 95.0, "SINCE 2012?!"), (139.3, 142.0, "NIKO?!"),
    (148.8, 152.0, "I BEG YOU"), (172.0, 175.0, "OH MY GOD"), (186.0, 189.0, "WHO IS THAT?"), (228.0, 231.5, "GTA 4 MUSIC?!"),
    (B_(57.0), B_(61.0), "THE MAIN CHARACTER"),
])

# slow push or pull on every piece, so the picture never sits still; punches on the beats
MOVES = []
for k, (s, e, *_r) in enumerate(SEG):
    a = O(s); b = O(e) if k != 6 else O(e)
    MOVES.append((a, b, "push" if k % 2 == 0 else "pull", 0.07))
MOVES += [(*conv([(24.8, 27.0)])[0], "punch", 0.12), (*conv([(47.2, 49.5)])[0], "punch", 0.14), (*conv([(92.0, 94.5)])[0], "punch", 0.12),
          (*conv([(139.3, 141.5)])[0], "punch", 0.14), (*conv([(162.0, 166.0)])[0], "push", 0.10), (*conv([(186.0, 188.5)])[0], "punch", 0.10),
          (*conv([(B_(57.0), B_(60.0))])[0], "punch", 0.12), (O(92.0), O(92.6), "impact", 12), (O(139.3), O(139.9), "impact", 12), (O(172.0), O(172.6), "impact", 14)]
WHIPS = [O.start(k) for k in (1, 2, 3, 4, 5, 6, 9)]          # whip pan at the joins that jump in time or place
MOVES += [(t, t + 0.35, "whip", 160 if i % 2 == 0 else -160) for i, t in enumerate(WHIPS)]
FLASH = [O.start(k) for k in (1, 7, 9, 10)] + [O(148.0)]

# profanity: stream auto-caption bleeps + whisper-detected words, muted
BLEEPS_A = [20.56, 55.12, 69.2, 74.4, 75.6, 86.64, 88.72, 103.76, 134.16, 190.64]
BLEEPS_B = [3.6, 7.12, 7.36, 10.32, 12.16, 30.72, 37.68, 49.28]
WHISPER_BAD_A = [68.98, 86.38, 88.5, 103.58, 105.12, 125.68, 133.9]
WHISPER_BAD_B = [30.62, 37.32, 49.14]
MUTES = set()
for t in BLEEPS_A + WHISPER_BAD_A + [B_(x) for x in BLEEPS_B + WHISPER_BAD_B]:
    try:
        a = O(t); MUTES.add((round(a - 0.08, 2), round(a + 0.5, 2)))
    except ValueError:
        pass
MUTES = sorted(MUTES)

HOOK_END = O(155.2) if False else 5.2
CAMFULL = [(0.0, 5.2)] + conv([(35.0, 38.5), (150.5, 155.0), (B_(57.0), B_(60.8))])
BLUR = [(0.0, 5.2)] + conv([(147.0, 168.0)])          # the gun-to-the-head scene: blood and a threatened man, game blurred, Speed's face stays visible

SFX = [(O.start(1) - 0.05, "whoosh", 0.45), (O.start(6) - 0.05, "whoosh", 0.4), (O(92.0), "vine_boom", 0.6), (O(139.3), "vine_boom", 0.6), (O(172.0), "vine_boom", 0.7),
       (O(148.0), "bass_drop", 0.6), (O(172.0) - 0.75, "record_scratch", 0.6), (O.start(10) - 0.05, "whoosh", 0.45), (2.6, "heartbeat", 0.5)]

EVENTS = [dict(t0=O(24.8), kind="dialogue", text="oh no, look who it is, wait what"), dict(t0=O(47.5), kind="dialogue", text="he's from gta 4, omg", tags=["omg"]),
          dict(t0=O(92.2), kind="dialogue", text="since 2012, no way"), dict(t0=O(139.5), kind="dialogue", text="nico relax, wait"),
          dict(t0=O(149.5), kind="dialogue", text="i beg you, so sad"), dict(t0=O(186.0), kind="dialogue", text="who is that? wait"),
          dict(t0=O(228.5), kind="dialogue", text="they play the gta 4 music, let's go"), dict(t0=O(B_(58.0)), kind="dialogue", text="the main character from gta 4, wow, omg", tags=["omg"])]

CHAPTERS = [(O.start(1) + 0.3, O.start(1) + 5.0, "THE ARRIVAL"), (O.start(2) + 0.3, O.start(2) + 5.0, "THE SHIPMENT"), (O.start(3) + 0.3, O.start(3) + 5.0, "SINCE 2012"),
            (O.start(4) + 0.3, O.start(4) + 5.0, "THE PLAN"), (O.start(6) + 0.3, O.start(6) + 5.0, "ONE MORE CHANCE"), (O.start(7) + 0.3, O.start(7) + 5.0, "SPEED'S REACTION"),
            (O.start(10) + 0.3, O.start(10) + 5.0, "LATER IN THE STREAM")]

CLIPS = {"speed-niko-bellic-long": dict(
    srcs={"A": A, "B": B}, pieces=[(p[0], p[1], p[2], *(p[3:] or [])) for p in PIECES],
    _total=TOT, game=(390, 100, 1360, 765), cam=(2, 462, 386, 238), pip=(480, 296), big=(960, 592),
    hook=("NIKO BELLIC", "IS IN GTA 6?!"), hook_window=(0.0, 5.0), hook_y=(30, 128), hook_size=92,
    caps=CAPS, pops=POPS, moves=MOVES, whips=WHIPS, flash=FLASH, mute=MUTES, camfull=CAMFULL, blur=BLUR, sfx=SFX, events=EVENTS, chapters=CHAPTERS,
    ctas=[dict(t=173.4, text="Enjoying this? *SUBSCRIBE*!", preset="subscribe", dur=3.2),
          dict(t=round(TOT - 3.6, 2), text="Was Niko in GTA 6 your *favourite*? *SUBSCRIBE*!", preset="subscribe", dur=3.2)],
    src_note="IShowSpeed stream OIeLbmyraRQ: 1:41:03-1:44:50 area pieces (see story) and 3:09:11-3:10:01",
)}

if __name__ == "__main__":
    print("TOTAL", TOT)
    for k in range(len(SEG)):
        print("piece", k, "out", O.start(k), "len", round((SEG[k][1] - SEG[k][0]) / ((SEG[k][2].get("speed") or 1)) + (SEG[k][2].get("freeze") or 0), 2))
    print("mutes", MUTES); print("camfull", CAMFULL); print("blur", BLUR); print("whips", WHIPS); print("caps", len(CAPS), "pops", POPS)
