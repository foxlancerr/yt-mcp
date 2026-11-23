"""More streamer-reaction clips for render_reaction_short.py (merged into its CLIPS). Times are in the raw window file
(clips/<key>/raw/source.mp4); `segments` are jump-cut pieces joined in order, and every caption/pop/event time below is on the OUTPUT timeline.
Raw -> output mapping for speed-mandy-part2: A = raw - 7.4 (0-23.2s) · B1 = raw - 84.1 (23.2-45.5s) · B2 = raw - 87.4 (45.5-63.6s).
Caption times come from faster-whisper word timestamps (edit/wordtimes.json). Speaker labels: MANDY / JASON are read from the game's own subtitles."""

EXTRA = {
 "speed-mandy-part2": dict(
  vid="qSyo5d-dVzA", src_offset="2:04:00", start=0.0, dur=0.0,
  segments=[(7.4, 30.6), (107.3, 129.6), (132.9, 151.0)],
  cam=(4, 466, 380, 234), game=(400, 120, 1330, 830),
  hook=("MANDY CONFRONTS JASON", "WHAT DID SPEED SAY?"),
  caps=[(0.3, 3.7, 'MANDY: "Why don\'t you like me?"'), (3.8, 5.2, 'JASON: "I do like you."'), (5.3, 7.3, 'JASON: "I\'m with nobody."'),
        (7.4, 9.5, 'MANDY: "You\'re lying."'), (9.6, 10.8, 'JASON: "No, I\'m not."'), (10.9, 12.2, 'MANDY: "Yes, you are."'),
        (12.3, 15.0, 'MANDY: "I talked to the bartender at the Rusty Anchor."'), (15.1, 18.7, 'MANDY: "...you have an ex-girlfriend in prison."'),
        (18.8, 20.0, 'JASON: "No, I don\'t."'), (20.1, 21.7, 'MANDY: "You\'re getting back together with her?"'), (21.8, 23.1, 'JASON: "No, it\'s complicated."'),
        (23.3, 24.9, 'JASON: "Listen, I\'m sorry you\'re upset."'), (25.0, 28.4, 'MANDY: "Just stop with the mind games."'), (28.8, 31.9, 'JASON: "I\'m not mind-gaming you."'),
        (32.2, 34.0, 'MANDY: "I need time, Jason."'), (34.1, 35.6, 'JASON: "What do you need? Time?"'), (35.7, 37.5, 'JASON: "You just said you wanted to marry me."'),
        (37.6, 40.4, 'SPEED: "She just said she wanted to marry me, bro."'), (42.3, 45.4, 'MANDY: "I can\'t talk to you when you\'re like this."'),
        (45.6, 49.3, 'MANDY: "Just go, Jason. You got what you came for."'), (49.4, 51.2, 'SPEED: "All right, bro."'),
        (52.7, 55.2, 'SPEED: "Yo, Jason, you stupid a**!"'), (58.5, 61.0, 'SPEED: "My god, bro."'), (61.2, 63.6, 'SPEED: "Stupid Jason, bro."')],
  pops=[(15.1, 17.8, "EX IN PRISON?!"), (35.7, 38.2, "MARRY ME?!")],
  mute=[],
  punch=[(37.6, 40.2), (61.2, 63.6)],                       # facecam zoom punch on Speed's two reactions
  events=[dict(t0=0.3, kind="hook", text="why? what is she asking? mystery"),
          dict(t0=15.2, kind="gameplay", text="she says he has an ex-girlfriend in prison, omg"),
          dict(t0=18.9, kind="gameplay", text="jason denies it, sneaky, hide", tags=["hide"]),
          dict(t0=25.1, kind="gameplay", text="angry, mind games", tags=["angry"]),
          dict(t0=35.8, kind="gameplay", text="you just said you wanted to marry me, omg"),
          dict(t0=38.2, kind="dialogue", text="wait, why? speed is confused"),
          dict(t0=45.8, kind="gameplay", text="oh no, just go jason"),
          dict(t0=52.8, kind="dialogue", text="lol, stupid jason"),
          dict(t0=61.3, kind="dialogue", text="lmao, stupid jason bro")],
  notes="Cut from three pieces of the same scene; the stream's chat, logo, timer, viewer counter and minimap are cropped out. The Provoke/Defuse button prompt is outside the crop. The scene has revealing swimwear and a sexual-tension theme: age restriction or limited ads are possible.",
  caption_text="Mandy confronts Jason about an ex-girlfriend in prison in GTA 6, and IShowSpeed reacts. Reaction from IShowSpeed's GTA 6 stream.",
  tags="#gta6 #ishowspeed #gtavi #mandy #shorts"),
}

EXTRA["speed-cry"] = dict(
  vid="qSyo5d-dVzA", src_offset="see src_note", start=0.0, dur=0.0,
  # raw/source.mp4 = three windows joined: a (stream 11:26:50, 0-65s), b (5:29:00, 65-185s), c (9:44:20, 185-230s)
  segments=[(23.1, 28.4), (200.9, 206.8), (70.5, 80.7), (120.7, 125.4), (161.5, 170.9), (29.6, 40.9), (48.2, 58.0)],
  cam=(4, 466, 380, 234), game=(400, 120, 1330, 830),
  hook=("SPEED'S NAME IS IN GTA 6", "WAIT FOR HIS DAD"),
  caps=[(0.05, 3.1, 'SPEED: "Bro, my name is really in the game, chat!"'), (3.2, 5.3, 'SPEED: "My name is in the game!"'),
        (5.4, 8.5, 'SPEED: "This game took 13 years, bro."'), (8.6, 11.1, 'SPEED: "13 long years."'),
        (13.4, 17.4, 'SPEED: "Oh, my baby! Hey, my baby!"'), (19.1, 21.3, 'SPEED: "Oh my gosh."'),
        (21.5, 23.4, 'SPEED: "This is wild."'), (23.9, 26.1, ("SPEED: \"I don't even know what to say.\"")),
        (27.2, 28.5, 'SPEED: "This is amazing."'), (28.6, 30.8, 'SPEED: "I finally got my girl, bro."'), (30.9, 33.4, ("SPEED: \"I'm about to bring her back to my house.\"")),
        (33.9, 35.4, ("SPEED: \"I've been waiting for this moment.\"")),
        (35.5, 38.9, 'SPEED: "Watkins, bro! My name is in the game, bro!"'), (39.8, 44.7, ("SPEED: \"I'm about to cry, bro.\"")), (45.8, 46.9, 'SPEED: "Watkins, baby!"'),
        (49.1, 51.7, 'SPEED: "They put my dad in the game, bro!"'), (51.9, 54.2, 'SPEED: "They put my DAD in the game, bro!"')],
  pops=[(6.7, 9.3, "13 YEARS!"), (49.1, 51.6, "HIS DAD?!")],
  mute=[],
  punch=[(35.5, 37.6), (49.1, 51.0)],
  events=[dict(t0=0.3, kind="hook", text="wait, his name is in the game? mystery"),
          dict(t0=13.5, kind="dialogue", text="oh my baby, aww, love"),
          dict(t0=27.2, kind="dialogue", text="this is amazing, wow"),
          dict(t0=35.6, kind="dialogue", text="my name is in the game, omg"),
          dict(t0=39.9, kind="dialogue", text="i'm about to cry, wholesome"),
          dict(t0=49.2, kind="dialogue", text="they put my dad in the game, omg")],
  cta=dict(loop=True),
  src_note="three windows of the same stream (stream clock): 11:26:50 + 23.1-28.4s, 29.6-40.9s, 48.2-58.0s; 5:29:00 + 5.5-15.7s, 55.7-60.4s, 96.5-105.9s; 9:44:20 + 15.9-21.8s",
  notes="Speed is excited, not visibly crying: the hook quotes his words ('I'm about to cry') and does not claim he cried. The 'about to cry' line is from YouTube's auto-captions; Whisper heard it as 'not the crowd', so confirm it by ear before upload. '13 years' comes from Whisper and is probably Speed's voice over the game's dialogue (listen to confirm). The stream's chat, logo, timer, viewer counter and minimap are cropped out.",
  caption_text="IShowSpeed finds his own name, then his dad's, in GTA 6. Reaction from IShowSpeed's GTA 6 stream.",
  tags="#gta6 #ishowspeed #gtavi #shorts")


EXTRA["speed-gator"] = dict(
  vid="qSyo5d-dVzA", src_offset="see src_note", start=0.0, dur=0.0,
  # raw/source.mp4 = a (stream 4:14:20, 0-145s) + b (stream 17:38:15, 145-255s)
  segments=[(6.5, 13.9), (33.9, 39.4), (57.5, 71.5), (89.8, 97.2), (181.0, 200.0), (232.9, 242.3)],
  cam=(4, 466, 380, 234), game=(400, 120, 1330, 830),
  hook=("SPEED FEARED GATORS IN GTA 6", "13 HOURS LATER IT HAPPENED"),
  caps=[(0.4, 2.9, 'SPEED: "Bro, if I get bit by a damn alligator..."'), (5.6, 7.4, 'SPEED: "Imagine I die to an alligator."'),
        (8.0, 12.8, 'SPEED: "Wait, I hear that... Oh my gosh, ALLIGATOR!"'),
        (15.9, 20.5, 'SPEED: "Miss me! Oh my gosh!"'), (20.8, 26.8, 'SPEED: "No way! Oh my god! Oh, hell no!"'),
        (27.1, 31.0, 'SPEED: "Bro, I almost died to an alligator, bro."'), (31.2, 34.2, 'SPEED: "I almost just DIED to an alligator."'),
        (36.0, 38.9, '"Yeah, baby! We did it, girl!"'),
        (41.1, 44.4, 'SPEED: "Mom! Mom got bit by an alligator!"'), (48.4, 51.0, '"Thank you, God. Thank you, Jesus."'),
        (51.2, 53.3, 'SPEED: "Mom got bit by an alligator!"'),
        (53.4, 56.6, 'SPEED: "Chat, why y\'all laughing? What\'s funny, bro?"'), (56.7, 60.0, 'SPEED: "Mama just got bit by an alligator and y\'all laughing!"')],
  pops=[(9.4, 12.2, "ALLIGATOR!?"), (41.1, 43.9, "HER MOM?!")],
  cards=[(33.4, 35.6, "13 HOURS", "LATER...")],
  mute=[(17.55, 18.15), (46.7, 47.4)],
  punch=[(8.9, 11.6), (41.1, 43.5), (56.7, 59.5)],
  sfx=[(0.2, "heartbeat", 0.30), (8.3, "vine_boom", 0.35), (33.4, "bass_drop", 0.5), (41.2, "vine_boom", 0.4)],
  events=[dict(t0=0.3, kind="hook", text="scary swamp, nervous, hide", tags=["hide"]),
          dict(t0=3.6, kind="hook", text="what is that sound? why? mystery"),
          dict(t0=8.3, kind="dialogue", text="oh my gosh alligator, omg"),
          dict(t0=16.2, kind="gameplay", text="danger, scary, risk"),
          dict(t0=21.0, kind="dialogue", text="no way, oh my god"),
          dict(t0=27.6, kind="dialogue", text="phew, safe, i survived"),
          dict(t0=35.9, kind="hook", text="wait, what happens 13 hours later? mystery"),
          dict(t0=41.3, kind="dialogue", text="mom got bit by an alligator, omg"),
          dict(t0=49.0, kind="dialogue", text="oh no, her mom"),
          dict(t0=56.8, kind="dialogue", text="lol, y'all laughing")],
  cta=dict(loop=True, type="funny"),
  src_note="two windows of the same stream (stream clock): 4:14:20 + 6.5-13.9s, 33.9-39.4s, 57.5-71.5s, 89.8-97.2s; 17:38:15 + 36.0-55.0s, 87.9-97.3s",
  notes="Callback: at 4:14:27 Speed says 'if I get bit by a damn alligator... imagine I die to an alligator', then a gator ambushes his character; 13h24m later on the stream clock (17:38:57) Lucia's mother Mia is bitten and he says 'Mom got bit by an alligator'. Profanity muted at 17.55-18.15s and 46.7-47.4s. Unlabelled quotes are game lines. The stream's chat, logo, timer, viewer counter and minimap are cropped out.",
  caption_text="IShowSpeed feared alligators in GTA 6. 13 hours later, Lucia's mom got bitten by one. Reaction from IShowSpeed's GTA 6 stream.",
  tags="#gta6 #ishowspeed #gtavi #shorts")


_KAI_FACE = dict(cam=(480, 230, 900, 554), game=(0, 0, 1660, 1036))      # window a is a full-screen webcam scene (Kai on his phone), not the game layout
EXTRA["kai-lucia"] = dict(
  vid="VZqAPdUvqnQ", src_offset="see src_note", start=0.0, dur=0.0,
  # raw/source.mp4 = c (day 1, 10:30:35, 0-35s) + a (day 1, 6:58:10, 35-70s) + b1 (day 2, 11:17:50, 70-150s) + b2 (day 2, 11:20:35, 150-190s)
  segments=[(3.0, 12.8), (16.9, 22.8), (46.4, 49.5, _KAI_FACE), (55.9, 59.0, _KAI_FACE), (75.0, 81.4), (84.8, 100.4), (140.5, 144.0), (160.7, 163.0), (169.0, 179.9)],
  cam=(16, 430, 360, 222), game=(400, 110, 1330, 830),
  hook=("KAI: LUCIA'S WITH ANOTHER MAN?", "THE GAME ANSWERS HIM"),
  caps=[(3.6, 9.8, 'KAI: "Whoa... whoa... why did she just leave like that?"'), (9.9, 15.7, 'KAI: "Was she mad? No kiss, no I love you, like nothing."'),
        (15.8, 18.8, 'KAI: "Lucia probably with another man right now. That\'s what I\'m saying."'), (18.9, 21.9, 'KAI: "She probably with a whole different person right now, bro."'),
        (24.0, 25.7, '"We need you to get on the inside."'), (25.8, 28.3, '"You start going to their gym. You start lifting."'),
        (28.8, 33.8, '"You say you met this one, Nate. You work them however you can."'), (33.9, 36.0, '"You use him to get to the others, to Kordell."'),
        (36.1, 38.3, '"We\'ll be watching, helping."'), (38.4, 40.4, '"What about Jason?"'), (40.5, 43.8, '"He got made. We can\'t take that risk."'),
        (47.5, 49.6, '"Wait a sec, have we met before?"'), (50.0, 51.3, '"Yeah, Nate. Nate."'), (51.4, 53.7, '"Nate, of course. Lucia."'),
        (53.8, 56.8, '"Yeah, I remember. Are you training with anybody?"'), (57.0, 60.5, '"No, actually, you think you can spot me?"')],
  pops=[(3.8, 6.3, "WHERE'D SHE GO?!"), (28.9, 31.6, "USE NATE"), (40.5, 43.6, "JASON GOT MADE")],
  cards=[(21.7, 23.7, "LUCIA'S", "REAL ORDERS")],
  mute=[],
  punch=[(3.7, 5.6), (15.9, 17.6), (18.9, 20.6)],
  sfx=[(0.2, "heartbeat", 0.30), (21.7, "bass_drop", 0.5), (28.9, "ding", 0.4), (40.6, "vine_boom", 0.35)],
  events=[dict(t0=0.4, kind="hook", text="why did she leave? mystery"),
          dict(t0=10.6, kind="dialogue", text="no way, what is happening?!"),
          dict(t0=16.2, kind="dialogue", text="another man, sneaky, hide", tags=["hide"]),
          dict(t0=19.2, kind="dialogue", text="whole different person, caught"),
          dict(t0=22.6, kind="hook", text="wait, what is the truth? mystery"),
          dict(t0=29.2, kind="dialogue", text="here it is, found it, reveal"),
          dict(t0=38.6, kind="dialogue", text="what about jason? why"),
          dict(t0=41.0, kind="dialogue", text="he got made, risk, danger"),
          dict(t0=54.2, kind="gameplay", text="careful, sneaky, hide", tags=["hide"])],
  cta=dict(loop=True),
  src_note="four windows of Kai Cenat's GTA 6 streams (stream clock): day 1 VZqAPdUvqnQ 10:30:35 + 3.0-12.8s and 16.9-22.8s, 6:58:10 + 11.4-14.5s and 20.9-24.0s; day 2 yX4DH_msPkI 11:17:50 + 5.0-11.4s, 14.8-30.4s and 70.5-74.0s, 11:20:35 + 10.7-13.0s and 19.0-29.9s",
  notes="SPOILER: shows a story mission (Lucia is told to get close to Nate to reach Kordell; Jason 'got made'). Debunks the reposts titled 'Kai Cenat Finds Out Lucia Is Cheating', which cut his jokes ('probably with another man', 'no kiss, no I love you') out of context. Only items verified in the game's own dialogue or in Kai's stream captions are used; the 'Jason is in on it' and 'snuggle buddy' claims could not be verified and are not in the clip. One slur (6:58:25) is cut out; no profanity remains. Window a is a full-screen webcam scene, shown with its own crops.",
  caption_text="SPOILER. Kai Cenat joked that Lucia was with another man in GTA 6. Here is what the game's own briefing says. Reaction footage from Kai Cenat's GTA 6 streams.",
  tags="#gta6 #kaicenat #gtavi #lucia #shorts")


# --- Kai Cenat, GTA 6 club / drinking mission (day 1, VZqAPdUvqnQ) ---
# raw/source.mp4 = w1 (stream 5:47:40-5:48:25, 0-45s) + w2 (stream 5:53:05-5:53:40, 45-80s). Clean scene: no sexual content on screen, so no blur is needed.
EXTRA["kai-club"] = dict(
  vid="VZqAPdUvqnQ", streamer="Kai Cenat", src_title="PLAYING GTA 6 FOR THE FIRST TIME (DAY 1)", src_offset="see src_note", start=0.0, dur=0.0,
  segments=[(0.0, 9.0), (11.5, 24.0), (27.0, 45.0), (47.0, 63.0)],
  cam=(0, 432, 392, 220), game=(400, 170, 1300, 830),
  hook=("KAI HIT THE CLUB IN GTA 6", "THEN THE DANCE STARTED"),
  caps=[(0.2, 2.4, '"I\'ll get the first round."'), (2.5, 5.0, '"What\'s it going to be?"'), (5.1, 8.8, '"Three shots. Seriously, on me, bro."'),
        (9.4, 10.6, '"Love this."'), (10.7, 13.2, '"I\'ll take one, too." "Sure, man."'), (13.4, 16.0, '"Shots for everybody."'),
        (19.4, 21.4, '"Oh my god."'), (22.4, 25.0, '"Man, I already love this place."'), (30.6, 34.0, '"Come on, Jay. You sure you\'re ready?"'),
        (42.5, 45.0, '"I need to take a time out."'), (49.5, 55.0, '"No, no, no, no, no..."')],
  pops=[(5.0, 7.2, "3 SHOTS?!"), (13.5, 16.0, "SHOTS FOR EVERYBODY"), (30.6, 33.2, "DANCE TIME")],
  cards=[], mute=[],
  punch=[(2.6, 4.0), (19.4, 21.0), (42.6, 44.0), (49.6, 51.0)],
  sfx=[(5.0, "ding", 0.4), (13.5, "vine_boom", 0.3), (30.6, "vine_boom", 0.35)],
  events=[dict(t0=0.4, kind="hook", text="what is this place? mystery"),
          dict(t0=5.2, kind="dialogue", text="three shots, no way, what is happening?!"),
          dict(t0=13.8, kind="dialogue", text="haha so funny, laugh"),
          dict(t0=19.6, kind="dialogue", text="oh my god, wow, shocked"),
          dict(t0=30.8, kind="hook", text="wait, what is next? mystery"),
          dict(t0=42.8, kind="dialogue", text="no way, what is happening?!"),
          dict(t0=49.8, kind="dialogue", text="no no no, hide", tags=["hide"])],
  cta=dict(loop=True, type="funny"),
  src_note="two windows of Kai Cenat's GTA 6 day 1 stream (stream clock): 5:47:40 + 0-9.0s, 11.5-24.0s and 27.0-45.0s; 5:53:05 + 2.0-18.0s",
  notes="Story mission (Lucia, Jason and friends at a bar, a round of shots, a dance). Quotes are the stream's auto-captions; unlabelled lines are game or unattributed voices. No profanity remains. The scene shows no sexual content, so nothing is blurred.",
  caption_text="Kai Cenat's reaction to the GTA 6 club and drinking mission. Reaction footage from Kai Cenat's GTA 6 stream.",
  tags="#gta6 #kaicenat #gtavi #lucia #shorts")


# --- TEST ONLY: proves the blur path on Speed's suggestive club scene (hwSg39yIBGU 3:12:50 + 6-18s, 480p). Not for upload. ---
EXTRA["speed-blur-test"] = dict(
  vid="hwSg39yIBGU", streamer="IShowSpeed", src_title="PLAYING GTA 6 RIGHT NOW GET IN HERE!", src_offset="3:12:50", start=0.0, dur=0.0,
  segments=[(6.0, 18.0)],
  cam=(0, 192, 174, 98), game=(200, 30, 640, 400),
  hook=("BLUR TEST", "SUGGESTIVE SCENE CENSORED"),
  caps=[(1.0, 5.0, '"Do it sexy. Yeah, yeah."')], pops=[], cards=[], mute=[], punch=[(1.0, 2.0)], sfx=[],
  blur=[(0.0, 12.0)],
  events=[dict(t0=0.5, kind="hook", text="what is this? mystery")],
  src_note="test window", notes="test only", caption_text="test", tags="#test")


# --- 2-minute best-of: IShowSpeed finishes GTA 6 (final mission: chase, police shootout on the bridge, his reaction). Source: his 6 h stream OIeLbmyraRQ "BEATING GTA 6 RIGHT NOW 100% (FINAL MISSION)". ---
# raw/source.mp4 = three windows joined: A (stream 5:09:05, 0-220s) + B (5:13:55, 220-400s) + F (5:12:35, 400-490s). One continuous scene in stream order (no free-roam, no other mission).
EXTRA["speed-final-mission"] = dict(
  vid="OIeLbmyraRQ", streamer="IShowSpeed", src_title="BEATING GTA 6 RIGHT NOW 100% (FINAL MISSION)", src_offset="see src_note", start=0.0, dur=0.0,
  segments=[(0.0, 3.5), (3.5, 12.5), (12.5, 25.5), (25.5, 35.5), (35.5, 47.5), (47.5, 57.5), (57.5, 93.5), (93.5, 115.5), (115.5, 124.0)],      # raw/source.mp4 is already cut in output order (raw/source_full.mp4 = the three windows)
  cam=(4, 466, 384, 236), game=(420, 100, 1280, 850),
  hook=("52 HOURS. NO SLEEP.", "WHAT BROKE SPEED?"),
  caps=[(6.2, 10.4, 'SPEED: "Three days, y\'all. I have not slept in three days."'), (12.1, 14.8, 'SPEED: "I played to the end, man."'),
        (15.8, 18.2, 'SPEED: Wait... what is wrong with him?'), (18.8, 21.5, 'SPEED: "I played to the end. Something\'s not right."'),
        (21.8, 24.7, 'SPEED: "Oh my god. Oh no."'), (30.0, 31.5, 'SPEED: "We got to go in the water, bro."'),
        (33.4, 34.9, 'SPEED: "We got to go in the water!"'), (35.6, 37.0, 'SPEED: "...for y\'all to split up, bro!"'),
        (38.3, 39.9, 'SPEED: "There\'s no way, bro."'), (40.0, 41.8, 'SPEED: "Y\'all might as well just die together."'),
        (41.9, 43.4, 'SPEED: "Like Bonnie and Clyde, bro."'), (45.9, 47.5, 'SPEED: "No way I work this hard for y\'all to break up!"'),
        (47.6, 49.5, 'SPEED: "Let\'s swim for it, bro!"'), (52.4, 54.4, 'SPEED: "Let\'s go for it!"'), (55.9, 57.4, 'SPEED: "Let\'s swim for it!"'),
        (58.0, 61.5, 'Police block the bridge.'),
        (96.4, 98.3, 'SPEED: "Oh my god."'), (102.0, 106.5, 'SPEED: "I just played this game for 52 hours and they both just died, bro."'),
        (107.5, 110.4, 'SPEED: "They both just died, bro!"'), (116.0, 119.4, 'SPEED: "I\'m not trolling. I just played this for 52 hours, bro."'),
        (120.0, 123.6, 'SPEED: "I\'m not playing, bro. I swear to my dad."')],
  pops=[(6.3, 8.8, "3 DAYS NO SLEEP"), (18.8, 21.4, "NOT RIGHT?!"), (30.0, 32.5, "SWIM FOR IT?!"), (40.0, 42.5, "DIE TOGETHER?!"),
        (62.0, 64.8, "COPS OPEN FIRE"), (102.0, 105.0, "THEY BOTH DIED?!"), (116.0, 119.0, "NOT TROLLING")],
  mute=[(16.6, 17.0), (35.0, 35.35), (110.4, 111.3)],      # profanity: Speed at 16.8 and 110.6, a game character at 35.1
  blur=[(63.5, 83.5)],      # graphic close-ups of the shootout (blood, wounded character): game panel blurred, his face stays visible
  punch=[(18.8, 21.5), (96.4, 98.3), (102.0, 106.5), (116.0, 119.4)],
  fx_extra=dict(
    cam=[(1.0, 3.4, "push", 0.10), (30.0, 32.0, "tilt", 3), (57.5, 93.0, "push", 0.12), (62.0, 64.5, "tilt", -3.5), (93.5, 110.0, "push", 0.10),
         (102.0, 104.5, "tilt", -3.5), (116.0, 123.0, "push", 0.08)],
    game=[(30.0, 32.0, "tilt", -3), (40.0, 42.4, "tilt", 3), (49.0, 55.5, "focus", (0.14, 0.0, -0.1)), (58.0, 62.0, "focus", (0.25, 0.3, -0.1)),
          (62.0, 64.5, "tilt", 3.5), (86.0, 93.0, "pan", 40), (93.5, 110.0, "push", 0.10)],
    flash=[3.5, 12.5, 25.5, 35.5, 47.5, 57.5, 62.0, 93.5, 115.5]),
  sfx=[(6.3, "ding", 0.4), (40.0, "vine_boom", 0.3), (62.0, "vine_boom", 0.4), (102.0, "vine_boom", 0.4)],
  events=[dict(t0=0.4, kind="hook", text="what is this? police with guns, mystery"),
          dict(t0=6.4, kind="dialogue", text="three days without sleep, wow, tired"),
          dict(t0=18.9, kind="dialogue", text="something\'s not right, oh no, what is happening?!"),
          dict(t0=30.1, kind="gameplay", text="we got to go in the water, panic"),
          dict(t0=40.1, kind="dialogue", text="they might as well die together, like bonnie and clyde, no way"),
          dict(t0=47.7, kind="dialogue", text="let\'s swim for it, let\'s go, excited"),
          dict(t0=62.1, kind="gameplay", text="police open fire, shocked, omg"),
          dict(t0=96.5, kind="dialogue", text="oh my god, shocked, devastated"),
          dict(t0=102.1, kind="dialogue", text="they both just died, no no no, i can\'t believe it, sad"),
          dict(t0=116.1, kind="dialogue", text="i\'m not trolling, omg"),
          dict(t0=120.1, kind="dialogue", text="i swear to my dad, sad")],
  cta=dict(loop=True, type="emotional"),
  src_note="three windows of IShowSpeed\'s stream (stream clock): 5:09:05 + 37-46s, 50-63s, 112-122s, 137-149s, 172-182s; 5:12:35 + 5-41s; 5:13:55 + 54-76s, 160.5-169s",
  notes="SPOILER: final mission and ending of the story. The police shootout shows graphic close-ups (blood, a wounded character): the game panel is blurred for those 20 s (CENSORED label); remove 'blur' in the config for the unblurred cut (age restriction likely). Speed\'s words are from YouTube auto-captions and faster-whisper (they disagree in places, so lines the two did not both support were left out or shortened; confirm by ear). The credits song plays under the last 35 s (licensed music, Content ID likely). The clip does not claim tears. The stream\'s chat, logo, counters and minimap are cropped out.",
  caption_text="SPOILER: IShowSpeed after 52 hours of GTA 6, the final mission: the chase, the police shootout and his reaction. Reaction from IShowSpeed\'s GTA 6 stream.",
  tags="#gta6 #ishowspeed #gtavi #gta6ending #shorts")
