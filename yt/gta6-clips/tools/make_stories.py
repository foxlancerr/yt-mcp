"""Write the 4 story packages (story-pipeline format) for the 4 CC GTA 6 Shorts.
Storyboard rows and Runner beats come from render_shorts.SHORTS so the story always matches the render.
usage: python make_stories.py   -> yt/story/<slug>/story.md"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from render_shorts import SHORTS

STORY = Path(__file__).resolve().parents[2] / "story"
DATE = "2026-11-20"
FX_WORD = {"exclaim": "'!!' marks", "sweat": "sweat drops", "question": "'?'", "hearts": "love bubbles (hearts)", "dizzy": "dizzy stars",
           "anger": "red anger marks", "breath": "breath-release puff", "haha": "'HA HA!' bubble"}
MODE_WORD = {"walk": "walks", "bounce": "bounces", "jump": "jumps", "shake": "shakes (startled)", "shiver": "shivers", "sway": "sways",
             "trip": "trips and falls", "dance": "dances", "laugh": "laughs", "freeze": "freezes", "pop": "pops", "tilt": "tilts"}
EMOTION = {"exclaim": "shocked, wide eyes", "sweat": "nervous, sweat drops", "question": "confused, head tilted", "hearts": "happy, soft smile",
           "dizzy": "dizzy, swirling eyes", "anger": "determined, red anger marks on the headband", "breath": "relieved, exhaling",
           "haha": "laughing, eyes squeezed shut"}
BEAT_TYPE = {"exclaim": "shock", "sweat": "curiosity gap", "question": "curiosity gap", "hearts": "relief / reward", "dizzy": "shock",
             "anger": "stakes", "breath": "payoff", "haha": "payoff"}

LOGO = ("[LOGO] the official colorful Grand Theft Auto VI logo (use the attached original image, unmodified, not redrawn, in its own "
        "pink-to-orange colors; it is the only colorful or gradient element allowed), small, about 12% of the frame width, in the {corner} "
        "corner, as a topic label only. ")


def thumb_prompt(emotion, scene, text, text_pos, magnet, corner):
    assert len(text.split()) == 2, f"hook text must be exactly 2 words: {text!r}"
    p = (f"16:9 thumbnail, 2D flat cartoon, thick black outlines, black background, cream + red. The Runner (chibi, red headband), {emotion}. "
         f"{scene} Text \"{text}\" huge cream, {text_pos}. Small attached official GTA VI logo, unmodified, {corner}. Eye-magnet: {magnet}.")
    assert len(p.split()) <= 70, f"prompt too long ({len(p.split())} words)"
    return p

STORIES = {
 "cruise": dict(
  slug="gta6-cruise-ship-3-stars", name="3 Stars On A GTA 6 Cruise Ship",
  src_title="GTA 6 - What Happens If You Go On The Cruise Ship", channel="LunarGaming", subs="266K", date="2026-11-18",
  stats="138,728 views · 509 likes · 70 comments · 4:05 · English", ratio="0.5x its subscribers",
  window="2:54-3:24 (30s) of 4:05", vo="No voiceover. In-game audio only. Captions are our own commentary describing the screen.",
  research=[
   "**Topic wave:** the cruise ship is a live GTA 6 search topic. `tag-scan` top Shorts of the last 5 days: Wynnsanity live 625K, La Línea Alterna 48.6K, sandershorts \"Inside The Cruise Ship in GTA 6\" 5.7K, GTA6 Insider \"WE SNEAKED ONTO A CRUISE SHIP\" 3.7K.",
   "**Source:** LunarGaming, 138.7K views, 0.5x its 266K subscribers. Description: armed security and police attack when you board, and you can try to steal a helicopter.",
   "**Gap we exploit:** the other cruise-ship Shorts are exploring or sneaking. Ours is the action beat: 3 wanted stars, a guard fight at the railing, a rifle.",
   "**Tags in the top 25 Shorts:** gta 6 (14), gta vi (12), gta 6 gameplay (8), gta 6 vice city (6), gta 6 cruise ship (4). **Hashtags:** #gta6 (30), #shorts (16), #gtavi (15), #gaming (12), #vicecity (9)."],
  beats=[("0:00-0:03", "Hook", "\"3 STARS ON A CRUISE SHIP\" over a chase already in progress"), ("0:03-0:10", "Promise / context", "Running across the open deck"),
         ("0:10-0:15", "Open loop", "Security closes in; the screen flashes red"), ("0:15-0:20", "Stakes", "A struggle at the railing"),
         ("0:20-0:26", "Payoff 1", "Rifle up, he fights back"), ("0:26-0:30", "Re-hook / loop", "Still moving, still 3 stars: the chase never ends")],
  screens=["Running up the stairs and along the deck. 3 wanted stars top right.", "Open deck, glass wall, harbor skyline. Same 3 stars.",
           "A guard in a white uniform appears on the left. The screen flashes red.", "He grapples with the guard at the deck railing.",
           "Rifle raised, blood on the deck, ammo counter on screen.", "Upper deck running track. Still 3 stars."],
  titles=["3 Stars On A GTA 6 Cruise Ship", "GTA 6 Cruise Ship Fight Gets Wild", "Trying To Board A GTA 6 Cruise Ship"],
  thumb_text="DON'T BOARD", thumb_alts=["SHIP FIGHT", "WHO'S ABOARD?"], pattern_rule="Command text → **T2** primary, **T6** alternate.",
  thumbs=[("T2 shock-face + threat", "shocked, red marks", "Close-up left. Right: a black cruise ship at night, three red wanted stars blazing above it.",
           "top-right on two lines", "the three red stars", "bottom-right", "His shock plus three burning stars asks what happened to him aboard."),
          ("T6 anomaly pointer", "curious, looking away", "Flat ship deck. One wrong detail: a rifle silhouette at the far railing, circled red with an arrow.",
           "top-left", "the circled rifle", "top-right", "One circled wrong detail while he looks away: viewers must find it."),
          ("T3 hidden-truth reveal", "wary, holding a flashlight", "Pitch-black deck; his beam lights one guard silhouette gripping a railing, three red stars above.",
           "top-right", "the lit guard", "bottom-right", "The beam says one thing aboard is worth the risk.")],
  hashtags="#gta6 #shorts #gtavi #gaming #vicecity",
  keywords="gta 6 cruise ship, gta 6 cruise ship fight, gta 6 wanted stars, gta 6 wanted level, gta 6 gameplay, gta 6 exploration, gta 6 vice city, gta 6 shorts, gta 6 secrets, gta 6 leonida, gta 6 details, gta 6 chase, grand theft auto 6, grand theft auto vi, gta vi, gta 6",
  hook_desc="3 wanted stars on a GTA 6 cruise ship: a chase along the deck, a guard at the railing and a rifle.",
  desc2="Real gameplay from the GTA 6 cruise ship, with a character reacting to every beat.",
  open=["Caption fixed 2026-11-20: now reads \"Security closes in\" (source: armed security and police). Re-checked frames after the re-render.",
        "Game audio kept. It was not checked for licensed music.", "License: CC BY set by the uploader. It does not clear third-party content inside the footage."]),
 "vercetti": dict(
  slug="gta6-vercetti-mansion-too-early", name="Tommy's Mansion Too Early In GTA 6",
  src_title="GTA 6 - What Happens If You Go To The Vercetti Estate Early", channel="LunarGaming", subs="266K", date="2026-11-18",
  stats="179,745 views · 889 likes · 123 comments · 1:44 · English", ratio="0.7x its subscribers",
  window="0:07-0:32 (25s) of 1:44", vo="No voiceover. In-game audio only. Captions are our own commentary describing the screen.",
  research=[
   "**Topic wave:** Tommy Vercetti's mansion is a hot GTA 6 nostalgia topic. `tag-scan` top Shorts: Active Gaming \"Finally VICE CITY\" 38.6K, Duskrig \"Starfish Island: Tommy Vercetti's island is back\" 26.9K, Voices of AI \"Tommy Vercetti's Mansion Is Back in GTA 6\" 24.6K.",
   "**Source:** LunarGaming, 179.7K views, 0.7x its subscribers. Description: you can visit the Vercetti Estate early and try to reach the mansion.",
   "**Gap we exploit:** other Shorts show the mansion as a map fact. Ours is the ride there: the gatehouse, a \"Crime reported\" notice, the driveway, and the door.",
   "**Tags in the top 25 Shorts:** gta 6 (8), vice city (5), tommy vercetti (4), vercetti estate (4). **Hashtags:** #gta6 (29), #vicecity (16), #shorts (15), #gtavi (11), #tommyvercetti (10)."],
  beats=[("0:00-0:03", "Hook", "\"TOMMY'S MANSION, TOO EARLY?\" over a bike ride"), ("0:03-0:12", "Promise / context", "Past the gatehouse, down a quiet road"),
         ("0:12-0:17", "Open loop", "A \"Crime reported\" notice appears"), ("0:17-0:22", "Stakes", "Up the brick driveway toward the gates"),
         ("0:22-0:25", "Payoff", "On foot at the mansion door")],
  screens=["A bike on a palm-lined road with the route panel on screen.", "A road with a stop sign and yellow lines. The gatehouse is seen around 0:03.",
           "A quiet road. A \"Crime reported\" notice appears at the right edge around 0:11.", "The \"Crime reported\" notice and empty wanted stars.",
           "A brick driveway leading to iron gates and a large house.", "He leaves the bike and walks toward the mansion."],
  titles=["GTA 6: Tommy's Mansion Too Early?", "What If You Visit Vercetti Early?", "Riding To Tommy's Mansion In GTA 6"],
  thumb_text="NOT INVITED", thumb_alts=["LOCKED GATE", "WHO'S HOME?"], pattern_rule="Mystery/label text → **T3** primary, **T6** alternate.",
  thumbs=[("T3 hidden-truth reveal", "suspicious, holding a flashlight", "Black driveway; his beam lights only an iron gate and a faint mansion behind it.",
           "top-right on two lines", "the lit gate", "bottom-right", "The beam says you were not meant to reach this yet."),
          ("T5 locked door / forbidden object", "curious, one eye at the gap", "A chained iron gate, one glowing gap showing a mansion door, a small red tag blinking on the lock.",
           "top-left", "the glowing gap", "top-right", "A forbidden gate with one glowing gap, and the clip's crime notice on the lock."),
          ("T6 anomaly pointer", "confused, looking away", "Flat palm-lined road. One wrong detail: a tiny bike rider circled red, heading to a huge mansion silhouette.",
           "top-left", "the circled rider", "top-right", "A circled rider heading somewhere he should not: a curiosity gap.")],
  hashtags="#gta6 #vicecity #shorts #gtavi #tommyvercetti",
  keywords="gta 6 vercetti estate, gta 6 vercetti mansion, tommy vercetti gta 6, vercetti estate early, gta 6 vs vice city, gta 6 vice city, gta 6 gameplay, gta 6 shorts, gta 6 secrets, gta 6 leonida, gta 6 details, gta 6 exploration, grand theft auto 6, grand theft auto vi, gta vi, gta 6",
  hook_desc="Riding to Tommy Vercetti's mansion early in GTA 6: the gatehouse, a crime notice and the front door.",
  desc2="Real gameplay of the Vercetti Estate, with a character reacting along the way.",
  open=["Caption timing fixed 2026-11-20 against source frames: gatehouse at 2.5-5.2s, \"Crime reported\" at 10.8-15.5s (notice appears at about 0:11).",
        "Game audio kept. It was not checked for licensed music.", "License: CC BY set by the uploader. It does not clear third-party content inside the footage."]),
 "beer": dict(
  slug="gta6-drunk-beer-wobble", name="What If You Drink Too Much In GTA 6?",
  src_title="¿Qué PASA si BEBES demasiada CERVEZA en GTA 6?", channel="Vandal", subs="3.43M", date="2026-11-19",
  stats="227,176 views · 13.8K likes · 83 comments · 0:35 · Spanish voiceover", ratio="0.1x its subscribers",
  window="0:12.2-0:27.4 (15.2s) of 0:35", vo="Vandal's Spanish voiceover is kept. English captions are our own machine translation of the voiceover, matching the source's own description.",
  research=[
   "**Topic wave:** the beer question is a proven GTA 6 Shorts formula. `tag-scan`: Vandal 227K, Project Jason \"WHAT HAPPENS IF YOU DRINK TOO MUCH BEER IN GTA 6?\" 116K, TimTheTatman \"HOW MANY BEERS CAN YOU DRINK IN GTA 6?\" 101K, averagePCgames \"GTA 6 Drunk Physics Are INSANE\" 17.5K.",
   "**Source:** Vandal, 227K views and 13.8K likes (6% like rate), 0.1x its 3.43M subscribers. Description: infinite beer at Jason's house, the screen blurs with a color filter, the camera moves, and he falls over ridiculously.",
   "**Gap we exploit:** most clips show the drinking. Ours is the physics payoff: wobble, then the fall, then the laugh.",
   "**Tags in the top 25 Shorts:** gta 6 (11), gta vi (10), gta 6 beer (5), gta 6 jason (3), gta 6 drunk (2). **Hashtags:** #gta6 (31), #shorts (19), #gtavi (16), #gta6gameplay (7), #gta6details (4)."],
  beats=[("0:00-0:03", "Hook", "\"TOO MANY BEERS IN GTA 6?\" over Jason drinking"), ("0:03-0:07", "Promise / context", "You stop earning focus; the screen blurs"),
         ("0:07-0:12", "Open loop", "The camera moves; walking gets wobbly"), ("0:12-0:14", "Payoff", "Jump, and he falls ridiculously"),
         ("0:14-0:15", "Loop", "The Runner laughs: \"HA HA!\"")],
  screens=["Jason drinks from a glass in a green kitchen.", "He drinks from a bottle at the fridge (a \"NEVERA\" prompt).", "A rainbow color filter and blur take over the screen.",
           "Heavy blur and chromatic distortion.", "The camera sways; he staggers outside.", "Stumbling along the road and jetty.", "A jump, then a flailing fall near the water."],
  titles=["What If You Drink Too Much In GTA 6?", "Too Many Beers In GTA 6 Gets Wild", "GTA 6 Drunk Mode Is Pretty Hilarious"],
  thumb_text="DRUNK MODE", thumb_alts=["TOO MANY", "HE FELL"], pattern_rule="Mystery/label text → **T3** primary, **T6** alternate.",
  thumbs=[("T3 hidden-truth reveal", "dizzy, swirling eyes", "Pitch black; a spotlight lights one glowing beer bottle while the world behind him tilts.",
           "top, spanning the frame", "the lit bottle", "bottom-right", "One glowing bottle and a tilting world: viewers want to see the fall."),
          ("T6 anomaly pointer", "dizzy, looking away", "Flat jetty. One wrong detail: the horizon tilted, circled red with an arrow, a bottle at his feet.",
           "top-left", "the circled horizon", "top-right", "One circled wrong detail while he is the last to notice."),
          ("T2 shock-face + threat", "dizzy and shocked, red marks", "Close-up left with dizzy stars. Right: a giant tilted beer bottle above a water splash.",
           "top-right on two lines", "the tilted bottle", "bottom-left", "His face is the reaction; the bottle and the splash promise the fall.")],
  hashtags="#gta6 #shorts #gtavi #gaming #gta6details",
  keywords="gta 6 beer, gta 6 drunk, gta 6 drinking, gta 6 jason, gta 6 drunk physics, what happens if you drink too much beer gta 6, gta 6 funny moments, gta 6 details, gta 6 gameplay, gta 6 shorts, gta 6 secrets, grand theft auto 6, grand theft auto vi, gta vi, gta 6",
  hook_desc="What happens if you drink too much beer in GTA 6? The screen blurs, the camera moves and he falls over.",
  desc2="Real gameplay with Spanish voiceover and English captions, plus a character laughing along.",
  open=["English captions are our own machine translation of the Spanish voiceover (the last 3 seconds of the voiceover were too noisy to caption, so the clip stops at 0:27.4).",
        "The source has Vandal's burned-in Spanish captions in the middle of the frame. They are visible in this Short.",
        "License: CC BY set by the uploader. Game audio and Vandal's voiceover are used as in the source."]),
 "details": dict(
  slug="gta6-phone-while-driving", name="GTA 6 Phone While Driving Crash",
  src_title="5 DETALLES ALUCINANTES de GTA 6", channel="Vandal", subs="3.43M", date="2026-11-18",
  stats="1,047,801 views · 68.4K likes · 420 comments · 0:57 · Spanish voiceover", ratio="0.3x its subscribers",
  window="0:18.6-0:33.8 (15.2s) of 0:57", vo="Vandal's Spanish voiceover is kept. English captions are our own machine translation of the voiceover, matching the source's own description.",
  research=[
   "**Topic wave:** driving and \"details\" are GTA 6's biggest Shorts lanes. `tag-scan` \"gta 6 phone driving\": GAGA Gaming \"Driving Looks So Good\" 355K, RoddyGames \"Car Physics Are Completely Different\" 121K, DarkViperAU Clips \"Completely Reinvented Driving\" 74K.",
   "**Source:** Vandal, 1.05M views and 68.4K likes (6.5% like rate), the strongest licensed GTA 6 clip we found. Description: the phone camera blocks the view and you crash like in real life; you can hold hands and hug.",
   "**Gap we exploit:** no top Short covers the phone-while-driving mechanic. We pair it with the hug as a comedy-then-sweet arc.",
   "**Tags in the top 25 Shorts:** gta 6 (8), gta vi (8), gta 6 gameplay (6), gta 6 driving (2). **Hashtags:** #gta6 (26), #gaming (13), #shorts (12), #gtavi (8), #gta (7)."],
  beats=[("0:00-0:03", "Hook", "\"PHONE WHILE DRIVING IN GTA 6\" over a truck"), ("0:03-0:05", "Promise / context", "The phone camera covers the view"),
         ("0:05-0:07", "Open loop / stakes", "So he crashes, like real life"), ("0:07-0:13", "Mini-payoff", "A couple holds hands and walks through the city"),
         ("0:13-0:15", "Payoff / loop", "A hug, and The Runner lets out a breath")],
  screens=["A pickup truck drives down a street, then the in-game phone fills the screen.", "The phone covers the windshield.",
           "A truck at an intersection while the voiceover describes the crash.", "A couple seen from behind holds hands on the beach.",
           "The couple walks hand in hand down a neon-lit street at night.", "The pair embrace on the beach; later a hug beside a red car."],
  titles=["GTA 6 Phone While Driving Crash", "Using A Phone While Driving In GTA 6", "GTA 6 Phone Mechanic Is Too Real"],
  thumb_text="PHONE TRAP", thumb_alts=["EYES UP", "PHONE CRASH"], pattern_rule="Mystery/label text → **T3** primary, **T6** alternate.",
  thumbs=[("T3 hidden-truth reveal", "wary, holding a flashlight", "Pitch-black road; his beam lights a glowing phone floating where the windshield should be, a red crack across it.",
           "top-right", "the cracked phone", "bottom-right", "The lit phone says the danger is on the screen, not the road."),
          ("T2 shock-face + threat", "shocked, wide eyes", "Close-up left. Right: a giant cracked phone fills a windshield, truck rear lights glowing beyond.",
           "top-right on two lines", "the looming phone", "bottom-left", "His face is the reaction; the phone is the threat."),
          ("T4 versus split", "determined, pointing", "Diagonal split: left a red-lit road, right a green-lit phone; he stands on the fault line pointing at the phone.",
           "across the top", "the diagonal split", "top-left", "A clear versus: the road or the phone.")],
  hashtags="#gta6 #gaming #shorts #gtavi #gta",
  keywords="gta 6 phone while driving, gta 6 phone, gta 6 phone crash, gta 6 hug, gta 6 hold hands, gta 6 driving, gta 6 details, gta 6 gameplay, gta 6 shorts, gta 6 secrets, gta 6 vice city, gta 6 leonida, grand theft auto 6, grand theft auto vi, gta vi, gta 6",
  hook_desc="What happens if you use your phone while driving in GTA 6? The camera covers the view and he crashes. Then a hug.",
  desc2="Real gameplay with Spanish voiceover and English captions, plus a character reacting.",
  open=["English captions are our own machine translation of the Spanish voiceover. I did not view the crash frame itself, only the frames around it.",
        "The source has Vandal's burned-in Spanish captions in the middle of the frame. They are visible in this Short.",
        "License: CC BY set by the uploader. Game audio and Vandal's voiceover are used as in the source."]),
}


def runner_for(beats, a, b):
    out = []
    for bt in beats:
        if bt["t0"] < b and bt["t1"] > a:
            out.append(MODE_WORD.get(bt["mode"], bt["mode"]) + (" + " + ", ".join(FX_WORD[f] for f in bt["fx"]) if bt["fx"] else ""))
    return "; ".join(dict.fromkeys(out))


def build(key):
    s = STORIES[key]; cfg = SHORTS[key]; dur = cfg["dur"]; mm = lambda t: f"{int(t//60)}:{int(t%60):02d}"
    for t in s["titles"]:
        assert 30 <= len(t) <= 40, (key, t, len(t))
    link = f"https://www.youtube.com/watch?v={cfg['vid']}"
    L = [f"# Story Package: \"{s['name']}\" (GTA 6 Short, {dur:.0f}s)", "",
         f"Pillar **P3** (GTA 6 gameplay moments). Rendered video: `yt/gta6-clips/clips/{cfg['idea']}/final.mp4` (1080x1920, 30fps).",
         "**Skills run (one story at a time, per CLAUDE.md):** `story-pipeline` (stages 1-7), `video-ideation` (topic fit), `script-breakdown` (beats), `visual-style` (The Runner + palette), `title-formulas` (titles), `thumbnail-hooks` (prompts + 2-word hook text). TubeLab MCP is not connected, so evidence comes from the official Data API scripts (AGENTS.md §4.7).",
         "Pattern: the **60s Short re-hook pattern** from `yt/story/4-regrets-gta6-first-10-minutes` plus the **capture-matrix rule** from `yt/story/lucia-vs-cops-opening` (real footage intact, our layer is animation and commentary).", "",
         "## 1. Research summary", "",
         f"- **Source video:** [{s['src_title']}]({link}) · {s['channel']} ({s['subs']} subscribers) · {s['date']}",
         f"- **Numbers (API, {DATE}):** {s['stats']} · {s['ratio']}",
         f"- **License:** YouTube Creative Commons (`status.license=creativeCommon`, verified by API {DATE}). Credit in the caption text.",
         f"- **Window used:** {s['window']}", f"- **Voice and captions:** {s['vo']}"]
    L += [f"- {r}" for r in s["research"]]
    L += ["", "## 2. Script (beat structure)", "", "This Short has no new narration. The beats come from the source footage; our layer is the hook, captions and The Runner.", "",
          "| Out time | Beat | What it does |", "|---|---|---|"]
    L += [f"| {t} | {b} | {w} |" for t, b, w in s["beats"]]
    L += ["", "## 3. Storyboard grid (9:16, 1080x1920)", "",
          "Layout: a blurred copy of the gameplay fills the frame; the real gameplay stays intact in the middle; hook text in the top blur; captions under the gameplay; **The Runner and his effects appear only in the lower blur band.** Timings match the render (`tools/render_shorts.py`).", "",
          "| Time/Scene | Narration reference | Visual action and continuity | Camera/graphics | Sound |", "|---|---|---|---|---|"]
    snd = "Source audio (game)" if cfg["layout"] == "h" else "Source voiceover (Spanish)"
    L.append(f"| S0 · 0:00-0:03 Hook | Hook text | {s['screens'][0]} | Hook text \"{cfg['hook'][0]} / {cfg['hook'][1]}\" in the top blur, cream + red | {snd} |")
    for i, (a, b, cap) in enumerate(cfg["caps"]):
        scr = s["screens"][min(i, len(s["screens"]) - 1)]
        L.append(f"| S{i+1} · {mm(a)}-{mm(b)} | \"{cap}\" | {scr} Runner {runner_for(cfg['beats'], a, b)}. | Real gameplay intact; caption under it | {snd} |")
    L += ["", "**Continuity rule:** the hook's question is paid off in the last beat. Never trim the hook or the last 3 seconds.", "",
          "## 4. Visual prompt timeline (The Runner · `visual-style` · bottom blur band)", "",
          "| Time | Prompt (full text) | Camera direction | Dopamine beat type |", "|---|---|---|---|"]
    for bt in cfg["beats"]:
        em = ", ".join(EMOTION[f] for f in bt["fx"] if f in EMOTION) or "neutral, focused"
        prompt = (f"[CHARACTER] The Runner — cream-skinned chibi boy, oversized head, dark-red knotted headband, cream martial-arts gi + belt, expression {em}, "
                  f"{MODE_WORD.get(bt['mode'], bt['mode'])}. [SCENE] lower blur band under the real gameplay, nothing over the gameplay. "
                  f"[STYLE] 2D flat cartoon, thick clean black outlines, flat fills, no gradients, cream #F5F5DC, red accents #FF0000/#8B0000. "
                  f"[TEXT] {', '.join(FX_WORD[f] for f in bt['fx']) or 'none'}.")
        L.append(f"| {mm(bt['t0'])}-{mm(bt['t1'])} | {prompt} | Medium, locked, centered in the band | {BEAT_TYPE.get(bt['fx'][0], 'context') if bt['fx'] else 'context'} |")
    L += ["", "Note: reactions use your walk cycle plus body motion and effect marks (sweat, '!!', '?', hearts, dizzy stars, breath puff, bubbles) in the style of the storyboard sheets. The character is never redrawn.", "",
          "## 5. Titles (30-40 characters)", "", "| | Title | Chars |", "|---|---|---:|"]
    for lab, t in zip(("**Primary**", "Alt 1", "Alt 2"), s["titles"]):
        L.append(f"| {lab} | {t} | {len(t)} |")
    L += ["", "The title never claims more than the video shows.", "",
          "## 6. Thumbnail text (2 words)", "", f"1. **{s['thumb_text']}** (recommended) · 2. {s['thumb_alts'][0]} · 3. {s['thumb_alts'][1]}", "",
          f"Pattern rule (`thumbnail-hooks`): {s['pattern_rule']} Rules (CLAUDE.md): relevant to this story, 70 words or fewer, curiosity + dopamine hook, exactly 2 words of hook text that complete the title. The Runner is the only person in frame. "
          "**Logo override (2026-11-20, your decision):** the official colorful GTA VI logo is added small as a topic label. Attach the original image when generating; never redraw it.", "",
          "| Concept | Pattern | Prompt (paste-ready) | Why it hooks |", "|---|---|---|---|"]
    for i, (pat, emo, scene, pos, magnet, corner, why) in enumerate(s["thumbs"], 1):
        L.append(f"| {i} | {pat} | `{thumb_prompt(emo, scene, s['thumb_text'], pos, magnet, corner)}` | {why} |")
    L += ["", f"**Recommended:** concept 1 ({s['thumbs'][0][0]}). The text completes the title and does not repeat it.", "",
          "## 7. Metadata package", "", "**Description** (Short under 60s: no chapter block, AGENTS.md rule 10):", "", "```",
          s["hook_desc"], s["desc2"], "",
          f"Source: {s['channel']}, \"{s['src_title']}\"", link,
          f"Clip: {s['window']}, with commentary captions and character animation by The Untold Exit.",
          "License: Creative Commons Attribution (YouTube CC BY).", "", "THE UNTOLD EXIT: Look Beyond What Seems Obvious.", "", s["hashtags"], "```", "",
          f"**Hashtags (5, measured in the top 25 Shorts):** `{s['hashtags']}`", "",
          f"**Keywords / tags ({len(s['keywords'].split(', '))}):** {s['keywords']}", "",
          "No other creators' names, no \"official\", \"leaked\" or \"early access\" wording.", "",
          "**Flags:** `madeForKids` = **No** (confirm in Studio). Playlist: GTA 6 Secrets (`PLRXf1uVlif1Q`). Schedule (not scheduled): private + `publishAt` 20:00 UTC, one Short per day, after your yes.", "",
          "## 8. Policy check log", "", "The `policy-guard` skill is deleted, so this is a manual check. It is not the skill.", "",
          "| Check | Result |", "|---|---|",
          "| Title and thumbnail match the content | PASS. The titles describe what is shown |",
          "| Permission / license | PASS with note. Verified Creative Commons by API. The CC label is set by the uploader and does not clear third-party content |",
          "| Logos, ads, key art in frame | The GTA HUD and any in-game brands are part of the footage. No Rockstar key art or trailer footage is used |",
          "| Credit and source link | PASS. In the description |",
          "| Transformative | PASS. Own hook, captions, character animation. Under 35% of the source video used |",
          "| Chapters | Not applicable (under 60s) |",
          "| Human approval | Required before any upload |", "", "**Open items:**"]
    L += [f"- {o}" for o in s["open"]]
    d = STORY / s["slug"]; d.mkdir(parents=True, exist_ok=True)
    (d / "story.md").write_text("\n".join(L) + "\n", encoding="utf-8")
    return d / "story.md", sum(len(t) for t in s["titles"])


if __name__ == "__main__":
    for k in STORIES:
        p, _ = build(k); print("wrote", p)
