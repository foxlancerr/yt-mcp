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
