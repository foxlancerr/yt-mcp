"""Smart reaction engine: picks an emotion for a real event, never at random.
An event is dict(t0, t1, kind, text, tags). kind = 'gameplay' (scene tags), 'dialogue' (what the streamer says), 'comment' (audience).
Rules are keyword / tag matches; an event that matches nothing returns None, so no reaction is shown. Rule order = priority.
Use: events_to_beats(events, dur) -> beats + bubbles for runner_engine.render_frames; plan_overlays(events) -> list for reaction_kit."""
import json, re
from pathlib import Path

WORDS = json.loads((Path(__file__).parent / "sprites" / "words" / "reaction_words.json").read_text(encoding="utf-8"))
WORDS.pop("_note", None)

# (emotion, regex over event text / tags). Scene tags are set by the person or the planner from what was actually seen or heard.
RULES = [
    ("sad",       r"\b(mission failed|wasted|busted|oh no|you died)\b"),
    ("laugh_cry", r"\b(lmao|lmfao|dead|dying|i'?m dead|rofl)\b|😭💀|💀"),
    ("laugh",     r"\b(lol|haha+|funny|hilarious|joke|oops|fail(ed)?s?)\b|😂|🤣"),
    ("kiss",      r"\b(muah|kiss|thank you|thanks)\b|😘"),
    ("love",      r"\b(love|cute|aww+|adorable|best|beautiful|wholesome)\b|❤|😍|🥰"),
    ("approve",   r"\b(nice|perfect|clean|goat|well done|good job)\b|👍|💯"),
    ("happy",     r"\b(yay|woohoo|let'?s go|win|won|achievement|amazing|celebrat\w+|part 2|insane)\b|🎉|🔥"),
    ("shock",     r"\b(explo\w+|crash\w*|no way|what\?+|wtf|omg|unbelievable|shock\w*|blown up|exploded)\b"),
    ("sad",       r"\b(mission failed|wasted|busted|died|dead end|oh no|sad|lost|failed)\b|😭"),
    ("angry",     r"\b(angry|mad|cops?|police|caught|chase[sd]?|wanted)\b"),
    ("nervous",   r"\b(danger|scary|scared|risk\w*|sneak\w*|hide|hiding|nervous|careful)\b"),
    ("curious",   r"\b(secret|hidden|what is|why|how|wait|look|mystery|strange|weird|odd)\b|\?"),
    ("reveal",    r"\b(here it is|found it|reveal\w*|there it is|finally)\b"),
    ("dizzy",     r"\b(drunk|wobbl\w+|dizzy|spinning)\b"),
    ("relief",    r"\b(phew|safe|escaped|made it|survived)\b"),
]
MIN_GAP = 0.8          # seconds between two reactions, so the character does not spam


def pick_emotion(event):
    hay = f"{event.get('text', '')} {' '.join(event.get('tags', []))}".lower()
    for emo, rx in RULES:
        if re.search(rx, hay):
            return emo
    return None


def plan(events, default_len=1.6):
    """-> list of dict(t0, t1, emotion, word, animation, emoji, why). Skips events with no matching emotion and enforces MIN_GAP."""
    out, last_end, used = [], -99.0, {}
    for ev in sorted(events, key=lambda e: e["t0"]):
        emo = pick_emotion(ev)
        if not emo or ev["t0"] < last_end + MIN_GAP - 1e-6:
            continue
        spec = WORDS[emo]; n = used.get(emo, 0); used[emo] = n + 1          # rotate words in order (not random) so repeats vary
        t1 = ev.get("t1", ev["t0"] + default_len)
        out.append(dict(t0=ev["t0"], t1=t1, emotion=emo, word=spec["words"][n % len(spec["words"])], animation=spec["animation"],
                        emoji=spec["emoji"][n % len(spec["emoji"])], mode=spec["mode"], fx=spec["fx"], why=f"{ev.get('kind', 'event')}: {ev.get('text', '')[:60]}"))
        last_end = t1
    return out


def events_to_beats(events):
    """Beats + bubbles for runner_engine.render_frames from real events."""
    p = plan(events); beats = [dict(t0=q["t0"], t1=q["t1"], mode=q["mode"], fx=q["fx"]) for q in p]
    bubbles = [(q["t0"], q["t1"], q["word"]) for q in p]
    return beats, bubbles, p
