"""Cassandra (@Heyycassandraa) GTA 6 Shorts. Source: https://www.youtube.com/watch?v=DH7kKENJDWA (her first GTA 6 stream, 2h10m).
Everything below is written in SOURCE time (seconds of raw/source.mp4, the ordered cut) and converted to OUTPUT time by `mapper`,
so speed ramps and freeze frames never break a caption or a camera move. Words come from faster-whisper (edit/wordtimes.json).
Stream layout (1920x1080): face cam (0,365)-(416,762) at the left, game 8..1912 x 65..1015, chat bottom right, social ticker on top,
the game's own subtitles at y~958 (cropped out, they carry profanity)."""
import json, re
from pathlib import Path

CL = Path(__file__).resolve().parents[1] / "clips"
BAD = {"fuck", "fucking", "shit", "bitch", "dick", "pussy"}


def mapper(segs, tail_from=None):
    st, o = [], 0.0
    for s in segs:
        op = s[2] if len(s) > 2 else {}; sp = op.get("speed") or 1; fr = op.get("freeze") or 0
        st.append((s[0], s[1], o, sp)); o += (s[1] - s[0]) / sp + fr
    def f(t):
        for s, e, o0, sp in (reversed(st) if tail_from is not None and t >= tail_from else st):   # times >= tail_from use the LAST matching piece (the teaser repeats the final line)
            if s - 1e-6 <= t <= e + 1e-6: return round(o0 + (t - s) / sp, 3)
        raise ValueError(f"time {t} is outside the cut")
    f.start = lambda k: round(st[k][2], 3); f.total = round(o, 3)
    return f


def swears(key, f):
    """Mute ranges (output time) for every profane word whisper heard."""
    p = CL / key / "edit" / "wordtimes.json"
    if not p.exists(): return []
    out = []
    for seg in json.loads(p.read_text(encoding="utf-8")):
        for w in seg["words"]:
            if re.sub(r"[^a-z]", "", w[2].lower()) in BAD:
                try: a = f(w[0])
                except ValueError: continue      # the word is in a part of the source that is not used
                out.append((round(a - 0.06, 2), round(a + min(w[1] - w[0], 0.55) + 0.08, 2)))
    return out


def build(key, segs, items):
    """items: dict with source-time lists; returns a CLIPS entry (output time)."""
    O = mapper(segs, items.get("tail_from")); T = lambda x: [(O(a), O(b), *r) for a, b, *r in x]
    fx = {k: T(v) for k, v in items.get("fx", {}).items()}
    cfg = dict(
        vid="DH7kKENJDWA", streamer="Cassandra (@Heyycassandraa)", src_title="FIRST GTA 6 EVER GAMEPLAY :) YAYAYYAYAY",
        segments=segs, cam=items.get("cam", (20, 378, 360, 222)), game=(420, 70, 1160, 860), camfull_crop=items.get("camfull_crop", (70, 368, 280, 280)),      # head and shoulders only (no neckline): tight crops
        hook=items["hook"], caps=T(items["caps"]), pops=T(items["pops"]),
        mute=sorted(set(swears(key, O)) | set(T(items.get("mute", [])))),
        fx_extra=fx, whip=[O.start(k) for k in items.get("whip_at", [])], camfull=[(O(a), O(b)) for a, b in items.get("camfull", [])],
        sfx=[(O(t), n, v) for t, n, v in items.get("sfx", [])], events=[dict(e, t0=O(e["t0"])) for e in items["events"]],
        cta=items["cta"], src_note=items["src_note"], notes=items.get("notes", ""), caption_text=items["caption_text"], tags=items["tags"])
    cfg["fx_extra"]["flash"] = [O(t) for t in items.get("flash", [])]
    cfg["_total"] = O.total
    return cfg


# ---------------------------------------------------------------------------------------------------------------- Episode 1
P1 = [(0, 4.0, {"freeze": 0.5}), (4.0, 16.0), (16.0, 36.0, {"speed": 1.5}), (36.0, 70.0), (70.0, 100.0), (100.0, 105.4), (105.4, 111.6, {"speed": 0.75}), (111.6, 116.0)]
PRISON = build("cass-prison-call", P1, dict(
    hook=("JASON VISITS LUCIA", "IN PRISON. THEN?"),
    caps=[(0.3, 1.5, '"We broke up."'), (1.6, 2.8, '"We did not break up!"'), (2.9, 3.95, 'CASSANDRA: "Oh my god."'),
          (4.2, 7.0, '"I\'m here for Lucia Caminos."'), (7.2, 9.2, '"She\'s supposed to be getting out."'), (9.3, 10.2, '"What\'s your name?"'), (10.3, 12.2, '"Jason Duval."'),
          (49.0, 50.6, '"We broke up."'), (50.7, 51.8, '"We did not break up!"'), (51.9, 55.2, 'CASSANDRA: "Oh my god. I would not do this to him."'),
          (60.2, 63.2, 'CASSANDRA: "Who is the Jason actor?"'), (75.2, 79.6, 'CASSANDRA: "Why is everyone saying that? I don\'t understand."'),
          (79.8, 82.6, '"He\'s good..."'), (83.3, 85.8, '"He has everything he needs."'), (85.9, 88.4, '"I just gotta get out of here..."'), (89.4, 92.0, '"I\'m gonna give him a good life."'),
          (95.8, 97.0, '"Can I come see you?"'), (97.1, 100.4, '"I\'ll put you on the visitors list."'), (102.7, 105.4, 'CASSANDRA: "Oh my gosh! Let\'s go, queen!"'),
          (107.7, 110.0, 'CASSANDRA: "She\'s free! She\'s free!"'), (110.1, 112.6, '"She\'s a free bird."'), (113.9, 116.0, '"It\'s a story better than GTA 5."')],
    pops=[(7.2, 9.6, "SHE'S GETTING OUT?!"), (23.0, 25.6, "FLASHBACK?!"), (49.0, 51.8, "THEY BROKE UP?!"), (60.4, 63.2, "THE REAL JASON?!"), (89.4, 92.2, "A GOOD LIFE?"), (96.6, 99.6, "VISITORS LIST?!"), (107.9, 110.6, "SHE'S FREE!!")],
    # camera: cam = Cassandra's face, game = the scene. push/punch/tilt/track/impact/focus; whip_at = piece numbers where a whip pan joins two shots
    fx=dict(
        cam=[(2.9, 3.95, "punch", 0.14), (7.2, 8.2, "punch", 0.10), (23.0, 24.0, "punch", 0.10), (49.0, 50.0, "punch", 0.12), (60.4, 62.4, "punch", 0.12), (70.5, 99.0, "push", 0.12), (96.6, 97.6, "punch", 0.10), (102.8, 104.0, "punch", 0.12), (111.6, 116.0, "push", 0.08)],
        game=[(0.0, 4.0, "push", 0.10), (2.9, 3.4, "impact", 9), (4.2, 16.0, "push", 0.08), (16.0, 36.0, "pan", 22), (22.4, 26.4, "tilt", 2.5), (36.5, 49.0, "push", 0.07),
              (49.6, 50.2, "impact", 9), (50.7, 51.3, "impact", 11), (49.0, 52.8, "tilt", -3), (56.0, 70.0, "push", 0.08), (72.0, 99.0, "track", (0.22, 0.0, -0.2, 0.0, 0.1)),
              (96.6, 97.0, "impact", 7), (100.4, 105.0, "push", 0.06), (107.9, 108.4, "impact", 10), (111.6, 116.0, "pull", 0.10)]),
    whip_at=[1, 3, 5], flash=[4.01, 36.2, 70.2, 102.8],
    camfull=[(2.95, 4.0), (51.9, 55.0), (107.6, 110.2)],
    sfx=[(4.0, "record_scratch", 0.7), (7.2, "ding", 0.6), (49.0, "vine_boom", 0.8), (72.0, "heartbeat", 0.5), (107.8, "vine_boom", 0.8)],
    events=[dict(t0=0.3, kind="hook", text="wait what? mystery"), dict(t0=2.95, kind="dialogue", text="oh my god, omg", tags=["omg"]), dict(t0=7.2, kind="dialogue", text="she's getting out? wait"),
            dict(t0=23.0, kind="dialogue", text="is this a flashback? weird"), dict(t0=49.2, kind="dialogue", text="they broke up? no way"), dict(t0=52.5, kind="dialogue", text="I would not do this to him, so sad"),
            dict(t0=60.6, kind="dialogue", text="who is the jason actor? why"), dict(t0=89.6, kind="dialogue", text="a good life, aww"),
            dict(t0=102.9, kind="dialogue", text="let's go queen"), dict(t0=108.2, kind="dialogue", text="she's free, yay")],
    cta=dict(loop=True, cliffhanger=True, text="*SUBSCRIBE* for Part 2!", preset="subscribe"),
    src_note="stream 2:01:30-2:05:20 (pieces 2:03:04-08, 2:01:47-59, 2:02:30-50, 2:02:51-2:03:25, 2:04:00-30, 2:05:04-20)",
    notes="SPOILER: an early story scene. Cassandra's own lines come from her voice; game lines are unlabelled (speaker not confirmed). The face-cam takeover, freeze frame, slow-mo and 1.5x ramp are edits. No money, no promo.",
    caption_text="Jason visits the prison in GTA 6, and Cassandra reacts. Reaction from Cassandra's (@Heyycassandraa) GTA 6 stream.",
    tags="#gta6 #gtavi #lucia #jason #shorts"))

# ---------------------------------------------------------------------------------------------------------------- Episode 3
P3 = [(0, 3.5, {"freeze": 0.4}), (3.5, 29.5), (29.5, 42.5), (42.5, 60.4, {"freeze": 0.6}), (60.4, 72.5), (72.5, 83.7)]
LANA = build("cass-lucia-lana", P3, dict(
    hook=("CASSANDRA HEARD IT", "LANA IN GTA 6?!"),
    caps=[(0.6, 3.4, 'CASSANDRA: "Oh my god, Lana\'s in this..."'), (8.9, 10.2, 'CASSANDRA: "I don\'t know yet."'), (10.4, 12.9, '"It\'s a good story."'),
          (21.6, 23.6, '"She is so pretty."'), (23.8, 27.0, 'CASSANDRA: "She looks exactly like Lucia."'), (27.1, 30.0, '"She looks 10 out of 10."'),
          (32.6, 37.6, 'CASSANDRA: "She posted a pic with the guy playing Jason."'), (42.6, 45.6, 'CASSANDRA: "Oh yes... oh my god!"'), (45.7, 48.0, '"That\'s Lana! That is Lana!"'),
          (50.0, 52.4, '"Sorry, I\'m putting it up."'), (52.9, 55.5, '"You guys hear that?"'), (57.8, 60.3, '"Oh my god, Lana\'s in this game!"'),
          (61.4, 62.9, '"What the...?"'), (63.1, 65.3, '"Girl, did you know that?"'), (65.4, 68.4, '"Lana\'s in this game!"'),
          (75.4, 78.0, 'CASSANDRA: this song is SO good'), (81.9, 83.7, '"I\'ve never heard this song before."')],
    pops=[(23.8, 26.6, "LOOKS LIKE LUCIA?!"), (32.6, 35.6, "THE REAL JASON?!"), (46.0, 48.6, "IS THAT LANA?!"), (59.2, 62.0, "LANA IN GTA 6?!"), (75.4, 78.0, "WHAT SONG?!")],
    fx=dict(
        cam=[(0.6, 3.5, "punch", 0.12), (23.8, 25.2, "punch", 0.10), (32.6, 34.0, "punch", 0.12), (42.8, 44.2, "punch", 0.10), (50.0, 52.4, "punch", 0.10), (63.1, 65.3, "punch", 0.12), (72.5, 83.7, "push", 0.08)],
        game=[(0.0, 3.5, "push", 0.10), (3.5, 29.5, "track", (0.2, -0.2, 0.1, 0.1, 0.1)), (29.5, 42.5, "push", 0.07), (46.0, 46.5, "impact", 10), (45.8, 48.4, "tilt", 3), (59.1, 59.6, "impact", 12), (57.8, 60.4, "push", 0.12),
              (61.4, 62.0, "shake", 7), (60.4, 72.5, "pull", 0.08), (72.5, 83.7, "push", 0.06)]),
    whip_at=[1, 3, 5], flash=[29.7, 46.0, 59.1],
    camfull=[(45.7, 47.9), (58.8, 60.4), (63.0, 65.4), (81.8, 83.6)],
    sfx=[(3.5, "record_scratch", 0.7), (46.0, "vine_boom", 0.8), (59.1, "bass_drop", 0.7), (60.4, "record_scratch", 0.6), (23.8, "ding", 0.6), (75.4, "ding", 0.5)],
    events=[dict(t0=0.5, kind="dialogue", text="omg lana's in this game", tags=["omg"]), dict(t0=13.0, kind="dialogue", text="aww she is so pretty, love"), dict(t0=23.9, kind="dialogue", text="looks exactly like lucia, wait"),
            dict(t0=32.7, kind="dialogue", text="she posted a pic with jason, omg"), dict(t0=46.1, kind="dialogue", text="that's lana, omg"), dict(t0=59.3, kind="dialogue", text="lana's in this game, no way"),
            dict(t0=63.2, kind="dialogue", text="did you know that? wait why"), dict(t0=75.6, kind="dialogue", text="this song is so good, yay"), dict(t0=82.0, kind="dialogue", text="never heard this song, amazing")],
    cta=dict(loop=True, type="unexpected", text="Did you see *LANA* coming? *SUBSCRIBE*!", preset="subscribe"),
    src_note="stream 2:05:16-2:06:51 (pieces 2:05:16-42, 2:05:42-55, 2:06:01-31, 2:06:40-51 and the 3.5 s teaser 2:06:16-19)",
    notes="Cassandra's own lines come from her voice. She says the name Lana; the clip does not say who Lana is. Profanity muted; the game's subtitles are cropped out.",
    caption_text="Cassandra hears a song in GTA 6 and loses it. Reaction from Cassandra's (@Heyycassandraa) GTA 6 stream.",
    tags="#gta6 #gtavi #lucia #jason #shorts"))

# ---------------------------------------------------------------------------------------------------------------- Episode 2
# This window (stream 0:36-0:46) shows her in a low-cut top, so BOTH face crops stop at the chin (source y 372-594, chin ~580): head only.
P2 = [(117.4, 120.5, {"freeze": 0.4}), (57.2, 66.8, {"freeze": 0.3}), (71.3, 90.4), (95.2, 98.5), (105.3, 120.5)]
CRUSH = build("cass-jason-crush", P2, dict(
    cam=(60, 372, 360, 222), camfull_crop=(150, 372, 220, 220),
    hook=("CASSANDRA ON JASON", "SHE'S SHOCKED?!"),
    tail_from=117.3,
    caps=[(64.8, 66.7, 'CASSANDRA: "I\'m shocked."'),
          (71.6, 77.8, 'CASSANDRA: "...a really good-looking male GTA character."'), (77.9, 81.8, '"Usually they don\'t make them look too good."'),
          (84.9, 87.0, '"I really like Franklin."'), (87.5, 90.4, '"Franklin looked really good in GTA 5."'),
          (95.3, 98.3, '"He looks really good."'),
          (105.5, 108.6, 'CASSANDRA: "Trevor was crazy."'), (109.0, 111.0, '"He scared me."'), (112.3, 114.9, '"So it\'s too risky for me."'),
          (117.5, 118.8, 'CASSANDRA: "Okay, I\'m not gonna lie..."'), (118.9, 120.5, '"...he\'s really, really good-looking."')],
    pops=[(64.8, 66.7, "SHOCKED?!"), (72.0, 75.0, "GOOD-LOOKING?!"), (85.2, 88.0, "VS FRANKLIN?!"), (95.3, 98.0, "REALLY GOOD?!"), (112.4, 115.0, "TOO RISKY?!"), (118.2, 120.5, "SHE SAID IT!")],
    fx=dict(
        cam=[(64.8, 66.6, "punch", 0.14), (71.6, 73.0, "punch", 0.10), (85.0, 86.4, "punch", 0.10), (95.3, 96.7, "punch", 0.12), (105.4, 120.5, "push", 0.08)],
        game=[(57.2, 66.8, "push", 0.07), (71.3, 90.4, "track", (0.2, 0.0, 0.0, 0.1, 0.1)), (95.2, 98.5, "push", 0.10), (105.3, 114.9, "pull", 0.06),
              (118.9, 119.4, "impact", 9)]),
    whip_at=[1, 2, 4], flash=[95.3],
    camfull=[(64.8, 66.7), (118.4, 120.5)],
    sfx=[(64.8, "vine_boom", 0.7), (72.0, "ding", 0.6), (118.6, "bass_drop", 0.7), (85.2, "ding", 0.5)],
    events=[dict(t0=64.9, kind="dialogue", text="i'm shocked, no way"), dict(t0=72.0, kind="dialogue", text="really good looking, wait"),
            dict(t0=95.4, kind="dialogue", text="he looks really good, aww"), dict(t0=109.2, kind="dialogue", text="he scared me, omg", tags=["omg"]), dict(t0=118.6, kind="dialogue", text="out of all of them, he's good looking, wow")],
    cta=dict(loop=True, type="unexpected", text="Do you agree? *SUBSCRIBE* for more!", preset="subscribe"),
    src_note="stream 0:36:20-0:46:10 (pieces 0:41:41-52, 0:42:13-37 and 0:43:00-28; the teaser is the last line, 0:43:25-28)",
    notes="Cassandra's own lines come from her voice (faster-whisper small, low confidence on 'Jason is pretty?' so not captioned). Her opinion about Jason's looks; the clip makes no claim beyond what she says. Face crops head-only because of her top in this window.",
    caption_text="Cassandra gives her honest opinion on Jason's looks in GTA 6. Reaction from Cassandra's (@Heyycassandraa) GTA 6 stream.",
    tags="#gta6 #gtavi #jason #shorts"))

# teaser (output 0-3.5 s) is the same source line as the ending; its captions and moves are added in output time
CRUSH["caps"][:0] = [(0.1, 1.45, "CASSANDRA: \"Okay, I'm not gonna lie...\""), (1.5, 3.2, "\"...he's really, really good-looking.\"")]
CRUSH["fx_extra"]["cam"] = CRUSH["fx_extra"].get("cam", []) + [(0.1, 3.3, "punch", 0.12)]
CRUSH["fx_extra"]["game"] = CRUSH["fx_extra"].get("game", []) + [(0.0, 3.5, "push", 0.10)]
CRUSH["sfx"].append((3.1, "record_scratch", 0.7))
CRUSH["events"].append(dict(t0=0.3, kind="dialogue", text="omg he's really good looking", tags=["omg"]))

EXTRA = {"cass-prison-call": PRISON, "cass-lucia-lana": LANA, "cass-jason-crush": CRUSH}

if __name__ == "__main__":
    for k, v in EXTRA.items(): print(k, "total", v["_total"], "mute", v["mute"], "camfull", v["camfull"], "whip", v["whip"])

# the face stays full-screen through the freeze frames (they end after the piece boundary in output time)
PRISON["camfull"][0] = (2.95, 4.5)
LANA["camfull"][1] = (LANA["camfull"][1][0], 61.4)

# the closing pop collided with the subscribe call to action (frame check), so it is dropped
CRUSH["pops"] = [p for p in CRUSH["pops"] if p[2] != "SHE SAID IT!"]
