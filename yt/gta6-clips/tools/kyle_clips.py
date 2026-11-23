"""GTA 6 Kyle ("Red Hulk") hug Short, built from yt/story/gta6-red-hulk-hug/story-v2.md.
Source: Speedy Boykins' upload JEaW9KnTijQ of IShowSpeed's stream (stream game clock 20:12-20:14), 1080p, clips/speed-kyle/raw/source.mp4.
Everything below is written in SOURCE time and converted to OUTPUT time by `mapper` (cass_clips). Words: faster-whisper + the video's own captions.
Layout of the source (1920x1080): facecam (0,462)-(388,702), game full frame, chat top right (x>1700,y<270), timer bottom right, minimap bottom left.
Source facts seen on frame: the clip opens after Kyle has transformed; he throws a man (8 s), a helicopter is in the sky (12-20 s), a red burst at 20 s,
the aftermath (24-60 s), Kyle sitting at the barn (66-88 s), the HUG/DECLINE prompt (92-96 s), the hug (96-104.5 s), Kyle jumps away (113.5 s)."""
from cass_clips import build, mapper

PIECES = [
    (100.2, 103.0, {"freeze": 1.0}),   # 0 HOOK: "Hey, you hurting me!" (mid-hug), then a 1 s freeze in B&W
    (8.0, 12.0),                       # 1 Kyle throws a man
    (12.0, 16.0),                      # 2 helicopter overhead
    (19.0, 22.6),                      # 3 the red burst (PEAK 1 at 20.0); starts after the profanity at 17-18.7
    (24.2, 28.2),                      # 4 the aftermath, "Is that Hulk?"
    (40.4, 43.8),                      # 5 "That's Red Hulk!"
    (66.0, 70.0),                      # 6 Kyle sitting by the barn, "Bro!"
    (71.0, 75.0),                      # 7 "Hey, you okay, buddy?"
    (81.2, 86.2),                      # 8 "Look, big guy. You need to leave."
    (87.6, 91.4),                      # 9 "Buddy?"  (the card sits on its last 2 s)
    (91.4, 105.2),                     # 10 THE HUG, unbroken (PEAK 2 at 101.6)
    (106.6, 109.0),                    # 11 "I feel bad, bro."
    (111.6, 116.0),                    # 12 Kyle jumps away
    (102.9, 103.0, {"freeze": 3.2}),   # 13 the hook frame again (loop), B&W, under the call to action
]
K = build("speed-kyle", PIECES, dict(
    tail_from=91.0, cam=(4, 462, 384, 238), camfull_crop=(100, 470, 230, 230),
    hook=("HE HUGGED GTA 6'S", "MONSTER. IT HURT."),
    caps=[(9.0, 10.0, '"What the hell?"'), (11.9, 13.4, '"Is that Hulk smash?"'), (24.7, 26.0, '"Is that Hulk?"'), (40.8, 42.0, '"That\'s Red Hulk!"'),
          (66.7, 67.1, '"Bro!"'), (71.0, 73.1, '"Hey, you okay, buddy?"'), (83.3, 85.9, '"You need to leave."'), (88.0, 88.6, '"Buddy?"'),
          (93.0, 94.2, 'SPEED: "Should I hug him?"'), (95.0, 96.1, 'SPEED: "I feel like I gotta hug him."'), (97.3, 98.8, 'SPEED: "I feel bad, bro."'),
          (101.6, 103.0, 'SPEED: "Hey, you hurting me!"'), (106.6, 108.4, 'SPEED: "I feel bad, bro."')],
    pops=[(20.0, 22.6, "KYLE?!"), (40.6, 43.2, "RED HULK?!"), (92.0, 94.8, "A HUG?!"), (101.6, 104.2, "IT HURTS?!")],
    fx=dict(
        cam=[(24.7, 26.0, "punch", 0.12), (40.8, 42.0, "punch", 0.14), (71.0, 72.4, "punch", 0.10), (93.0, 94.2, "punch", 0.10), (101.6, 103.0, "punch", 0.14), (106.6, 108.0, "punch", 0.10)],
        game=[(8.2, 9.6, "punch", 0.15), (12.2, 13.6, "punch", 0.15), (19.3, 20.6, "punch", 0.15), (20.0, 20.4, "impact", 12), (24.4, 25.8, "punch", 0.15), (40.6, 42.0, "punch", 0.15),
              (66.2, 67.6, "punch", 0.15), (71.2, 72.6, "punch", 0.15), (81.4, 82.8, "punch", 0.15), (87.8, 89.2, "punch", 0.15),
              (92.4, 93.9, "punch", 0.15), (96.0, 97.5, "punch", 0.15), (99.0, 100.5, "punch", 0.15), (101.6, 103.0, "punch", 0.15), (101.6, 101.9, "shake", 5),
              (106.8, 108.2, "punch", 0.15), (111.8, 113.2, "punch", 0.15), (113.5, 113.9, "impact", 9)]),
    whip_at=[], flash=[], camfull=[(40.8, 42.0)],
    sfx=[(66.0, "whoosh", 0.4), (91.4, "whoosh", 0.35), (113.4, "whoosh", 0.5), (20.0, "bass_drop", 0.7), (40.8, "ding", 0.5), (101.6, "vine_boom", 0.5)],
    events=[dict(t0=8.4, kind="dialogue", text="what the hell, is that hulk smash", tags=["omg"]), dict(t0=20.2, kind="gameplay", text="he burst, no way", tags=["omg"]),
            dict(t0=40.9, kind="dialogue", text="that's red hulk, wow", tags=["omg"]), dict(t0=71.2, kind="dialogue", text="hey you okay buddy, so sad"),
            dict(t0=93.2, kind="dialogue", text="should i hug him, wait"), dict(t0=97.5, kind="dialogue", text="i feel bad bro, sad"),
            dict(t0=101.8, kind="dialogue", text="you hurting me, oh no"), dict(t0=107.0, kind="dialogue", text="i feel bad bro, sad"), dict(t0=112.5, kind="dialogue", text="he jumped away, wait why")],
    cta=dict(loop=True, type="emotional", text="Would you have *HUGGED* him? *COMMENT* 1 or 2!", preset="comment"),
    src_note="Speedy Boykins' upload JEaW9KnTijQ of IShowSpeed's GTA 6 stream: 0:08-0:28, 0:40-0:44, 1:06-1:16 and 1:27-1:56 of that upload (stream game clock 20:12-20:14)",
    notes="SPOILER: optional Strangers & Freaks mission. Speed's own lines come from his voice; game lines are unlabelled. 'Red Hulk' is a fan nickname; the game's character is Kyle.",
    caption_text="Speed meets GTA 6's Kyle McKittrick, the fan-nicknamed 'Red Hulk', and gets a hug prompt. Reaction from IShowSpeed's GTA 6 stream.",
    tags="#gta6 #shorts #ishowspeed #redhulk"))
O = mapper(PIECES, 91.0)
TOTAL = K["_total"]
K.update(vid="JEaW9KnTijQ", streamer="IShowSpeed (via Speedy Boykins)", src_title="iShowSpeed Finds A HULK-LIKE MONSTER In GTA 6", game=(420, 60, 1280, 850))

# hook (output time 0-3.8): the teaser line sits at the end of piece 0; the same words repeat at 101.6 in the hug
K["caps"].insert(0, (1.3, 2.8, 'SPEED: "Hey, you hurting me!"'))
# own camera plan (no automatic flashes on pops: flashes only on peaks), so fx is given in full
K["fx"] = dict(cam=sorted(K["fx_extra"].get("cam", [])) + [(0.0, 2.8, "push", 0.08)],
               game=sorted(K["fx_extra"].get("game", [])) + [(0.0, 2.8, "push", 0.12)], flash=[])
K["fx_extra"] = {}
K["mono"] = [(0.0, 3.8)]      # black-and-white only in the 3.8 s hook (user: not the whole video)
K["glitch"] = [(2.7, 2.95), (3.6, 3.8), (round(O.start(6) - 0.05, 2), round(O.start(6) + 0.22, 2))]
K["flash_hard"] = [3.76, round(O(20.0), 2), round(O(101.6), 2)]
K["cards"] = [(round(O.start(9) + 1.8, 2), round(O.start(10), 2), "THEN THE GAME", "OFFERED A HUG")]
K["sfx"] += [(0.2, "riser", 0.9), (2.7, "glitch", 0.8), (3.7, "whoosh", 0.7), (round(O.start(9) + 1.8, 2), "heartbeat", 0.55), (round(O.start(13) - 0.2, 2), "heartbeat", 0.4)]
EXTRA = {"speed-kyle": K}

if __name__ == "__main__":
    print("TOTAL", TOTAL)
    for k in range(len(PIECES)): print("piece", k, "out", O.start(k))
    print("mute", K["mute"], "flash_hard", K["flash_hard"], "cards", K["cards"])
