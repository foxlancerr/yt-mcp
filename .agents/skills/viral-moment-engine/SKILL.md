---
name: viral-moment-engine
description: Niche-agnostic short-form research and direction system. Finds moments with viral potential instead of just popular videos, proves why a cold viewer keeps watching, scores each moment out of 100 across nine dimensions, and turns the winner into a complete scene-by-scene production plan with camera, sound, subtitles, titles and thumbnail hooks. The niche is a profile, not a fork. Use for /discover /viral /emotional /funny /mystery /story /clip /top10 in any niche, or phrases like "find moments worth clipping", "why would anyone watch this", "turn this moment into a Shorts plan", "what hook should this have".
---

# Viral moment engine

**This skill is deliberately not niche-specific.** The method is the same for any subject; the
*subject* lives in a profile file. Swapping niche means writing a new profile, not editing this
file. GTA 6 ships as [`profiles/gta6.md`](profiles/gta6.md) and is the reference example.

**Local rules (The Untold Exit):** read `AGENTS.md` first. Brand is The Untold Exit (tagline
"Look Beyond What Seems Obvious"); "OhBhai!" is retired. Manual policy check before anything
publishes (`AGENTS.md` §4.0). Source footage needs a verified licence or written permission;
`yt/gta6-clips/COPYRIGHT.md` is the checklist.

---

## 0. What this skill is for

Most clipping pipelines ask *"what is popular?"* and then cut 30 seconds out of it. That produces
reposts that nobody finishes. This skill asks a different question:

> **"If a stranger sees second one with no context, do they have to know what happens next?"**

Everything below exists to answer that with evidence instead of vibes. There is no trick that
makes a scene viral. What can be engineered is a stronger opening, a clear story, escalating
tension, visual variety and a real payoff.

---

## 1. The niche profile

A profile file supplies what changes per subject:

| Field | Example (GTA 6) |
|---|---|
| `subject` | Grand Theft Auto VI only — no GTA V, Online, RDR |
| `proof_of_subject` | a frame or caption showing Lucia / Jason / Leonida / Vice City UI |
| `search_phrases` | the 12 moment phrases below, written in the subject's language |
| `creators` | Kai Cenat, IShowSpeed, CaseOh, N3on, female streamers, emerging channels |
| `archetypes` | relationship drama, police chaos, discovery, fail, lost progress |
| `banned` | other games, leaks, story endings inside a Short |
| `language` | English unless the user says otherwise |
| `campaigns` | the paid briefs running in this subject, with rate, cap and floor |

Rules for a profile:
1. Never widen the subject silently. Out of niche = out.
2. Phrases are written **as a viewer would type them**, not as internal jargon.
3. If a new niche arrives, copy `profiles/gta6.md` and edit the table. Do not fork this file.

### 1.1 Two modes — decide before you search

| Mode | Objective | Optimise | Read |
|---|---|---|---|
| **Channel** | grow the brand account | average view duration, retention | the rest of this file |
| **Paid campaign** | earn from a brief | **clearing the payout floor** | `references/paid-campaigns.md` first |

Paid mode is not "the same edit, posted elsewhere". A campaign pays nothing below a minimum view
count, caps what one clip can earn, and rejects clips for paperwork. Switch objectives or the work
is wasted. Detect the mode from `references/paid-campaigns.md` §1 and say which one you are in.

---

## 2. Stage 1 — Discovery (find opportunities, not hits)

### 2.1 Query library
Search phrases are built from **moment types × subject**, not from "viral clips". For GTA 6 the
proven set is:

`<subject> streamer funniest moments` · `streamer shocked reaction` · `Lucia Jason drama
reaction` · `NPC crazy interaction` · `police chase gone wrong` · `unexpected death reaction` ·
`hidden secret discovery reaction` · `streamer fails mission` · `six star wanted level reaction` ·
`streamer loses everything` · `weirdest encounter` · `final mission ending reaction`

Plus `creator + moment`: `Kai Cenat GTA 6 shocked reaction`, `IShowSpeed GTA 6 funny moments`,
`CaseOh GTA 6 unexpected encounter`, `N3on GTA 6 crazy reaction`, `GTA 6 female streamer reaction`.

Search **recent uploads and livestream VODs**, not only Shorts. A Short is a symptom; the VOD is
the source of truth you can timestamp.

### 2.2 What makes a candidate worth opening
Rank by velocity, never by total views:

- views per hour since publish
- views ÷ channel subscribers (breakout ratio — a 900-sub channel at 400K views beats a 2M
  sub channel at 500K)
- engagement relative to views (likes **and** comments)
- how far it overperforms that creator's own median
- whether the moment is being re-clipped or discussed elsewhere
- **standalone clarity**: can a stranger understand it with zero stream context?

### 2.3 Hard rejections
- Total views from a 6-hour stream used as if they were the clip's performance.
- A snippet, title or thumbnail treated as proof a reaction happened.
- Any candidate whose subject cannot be verified from a frame or caption.
- Anything the source's owner has publicly refused (check the per-creator rules file).

---

## 3. Stage 2 — Analysis (find the actual moment)

### 3.1 Moment archetypes
A moment qualifies when it triggers at least two of: curiosity (*what is happening?*), suspense
(*why did that happen?*), surprise, fear, humour, empathy, controversy, mystery, recognition,
satisfaction. Map it to one archetype so the edit has a shape:

unexpected comedy · shock/disbelief · relationship tension · unpredictable NPC · escalating
danger · shocking failure · discovery/reveal · lost progress · chaos/spectacle · climax.

### 3.2 Scoring — 100 points, threshold 75
Score every candidate. **Write each sub-score, never just the total.**

| Dimension | Max | What earns it |
|---|---:|---|
| First-second hook | 15 | second one is the most unusual frame or reaction, no intro |
| Curiosity gap | 15 | a question exists in the first 3s that the clip answers |
| Emotional intensity | 15 | a face or voice actually changes, seen not described |
| Suspense / escalation | 15 | something new every few seconds; stakes rise |
| Payoff quality | 15 | the thing promised is **seen** in the last 40% |
| Visual storytelling | 10 | readable with sound off; picture carries meaning |
| Standalone clarity | 5 | no prior stream context needed |
| Replay / comment potential | 5 | a detail worth a second look, or a real argument to have |
| Trend momentum | 5 | the subject is rising now, not last month |

Two separate columns in the output: **verified performance** (numbers) and **creative
prediction** (my score). Never blur them.

### 3.2b The floor gate — pass/fail, not points
In paid mode the score is not the decision; the floor is. Add one gate:

> **Would a stranger who does not know this streamer still watch past second three?**

If the only reason to watch is prior stream context, the clip cannot clear a 5,000–10,000 view
minimum and the score is irrelevant. Pick another moment. Never log a paid clip without stating
its floor and whether this pick can clear it.

### 3.3 Evidence rules
- A field not inspected is written `UNVERIFIED`. Never fill it in.
- Timestamps are fixed on sentence boundaries after looking at frames at that time.
- Dialogue is quoted only from captions/transcript, with the stream clock it came from.
- Never claim a theory is confirmed story. Never put words in a creator's mouth.

---

## 4. Stage 3 — Production (turn the moment into a Short)

### 4.1 The curiosity loop
| Beat | Time | Job |
|---|---|---|
| Pattern interrupt | 0–1s | most unusual visual or reaction. No logo, no greeting, no "hey guys" |
| Open loop | 1–5s | plant one question, do not answer it |
| Build | 5–12s | setup, behaviour, suspicious detail |
| Escalation | 12–22s | new complication: reaction, movement, NPC, change |
| Payoff | 22–32s | the actual event, revealed |
| Trigger | last 2–3s | strongest reaction, odd detail, or a real question |

Timing is a starting template; the source's pacing decides the final length. Target 20–45s when
the material supports it.

### 4.2 Camera vocabulary (give each shot a purpose)
punch-in / punch-out · slow push-in · whip-pan · tracking crop · reaction close-up ·
freeze-frame + highlight · speed ramp into impact · brief shake on a genuine impact ·
split-screen gameplay + reaction · match cut between setup and payoff.

**Use motion to guide attention, not to keep every frame moving.** Zoom 0.05–0.14 in the local
renderer; more eats the picture. One movement per beat, not per second.

### 4.3 Sound and text
- Keep original dialogue where it matters; silence before a reveal beats music over it.
- Sound accent on impact, build under approaching danger — never a sting on every cut.
- Subtitles readable, synced, off faces, 2 lines max.
- Never fabricate a reaction, never AI-voice a real person.

### 4.4 Output contract — one card per pick
```
Idea + archetype:            Creator + original URL (verified):
Timestamp start–end (stream clock):      Recommended duration:
What actually happens:       Dialogue (quoted only if verified):
Why a stranger keeps watching (the loop, in one sentence):
Trigger map: curiosity / suspense / surprise / empathy / argument
Score: NN (15/15/15/15/15/10/5/5/5 — sub-scores written out)
Verified performance:        Creative prediction:
Scene timeline:              (see below, one row per shot)
Titles ×5:                   Thumbnail hooks ×5 (2–5 words):
Best title+thumb pair:       Description + hashtags:
Licence / permission note:   What is still UNVERIFIED:
```

Paid mode adds these lines to the same card (`references/paid-campaigns.md` §9):

```
Campaign + marketplace:      Model (per-view / pool / per-post):
Rate · cap · floor:          Views to floor / views to cap:
Required name + hashtag:     Platforms allowed:
Take-home at floor / at cap / at realistic views:
Compliance gate:             PASS / FAIL — every failed line listed
Account lane:                rewards account, never the brand channel
```

Scene timeline row shape:

| # | Source in→out | On screen | Said | Subtitle | Framing / move | Sound | → next |
|---|---|---|---|---|---|---|---|

### 4.5 Packaging
Titles use `title-formulas` (30–40 characters, curiosity without lying). Thumbnail text uses
`thumbnail-hooks` (exactly 2 words) and `thumbnail-concepts`. On-screen hooks and reaction beats
follow `runner-reactions` if the channel mascot is used.

---

## 5. What does not work (failure modes)

- **Teasing without paying off.** Delayed reveals past ~35s lose the viewer.
- **Shouting with no premise.** A peak with nothing nameable before it scores 0.
- **Total views as proof.** Velocity and breakout ratio are the signals.
- **Edits as originality.** Captions, zooms and transitions on someone else's footage are still
  someone else's footage. Original narration, commentary and a distinct story are what make a
  Short defensibly original; they still do not grant a licence.
- **Constant motion.** Zoom/shake on every cut reads as noise.
- **Fabricated drama.** Invented affairs, fake deaths, misleading thumbnails. Costs retention and
  risks the channel.

---

## 6. Metrics to track (per published Short)

| Metric | What it tells you |
|---|---|
| Views per hour | is it rising or dead |
| Views ÷ channel subs | breakout, size-independent |
| First 3-second retention | did the hook work |
| Average % viewed | did the story hold |
| Rewatches | replay trigger present |
| Shares per 1,000 views | would someone send it |
| Comments per 1,000 views | does it start an argument |

Small samples are directional only (`AGENTS.md` §4.8). Compare similar ages and creator sizes.

---

## 7. Pipeline and handoffs

```
Stage 0 CAMPAIGN   paid mode only: pick the brief by maths → floor, cap, props, deadline
Stage 1 DISCOVERY  trend/velocity search  → candidate list
Stage 2 ANALYSIS   inspect frames + captions → scored card (75+) + floor gate
Stage 3 PRODUCTION timeline + render      → finished Short
```

| Stage | Local owner |
|---|---|
| Paid brief selection, compliance gate, payout maths | `references/paid-campaigns.md` + `scripts/clip-campaign-check.mjs` |
| Subject discovery, GTA verification, per-creator rules | `gta6-streamer-hunter` |
| Download, transcribe, frame-peek, candidate windows, render, QC | `gta6-clipper` |
| Packaging and metadata | `title-formulas`, `thumbnail-hooks`, `thumbnail-concepts` |
| Mascot reactions, CTA, end card | `runner-reactions` |
| Programmatic video (timeline → mp4) | `remotion-best-practices` |
| Long-form story packages | `story-pipeline` |

**Can this setup actually watch the video?** Yes — `gta6-clipper` downloads with `yt-dlp`,
transcribes with whisper, and `peek.py` / `moments.py` extract frames and label motion. So
Stage 2 is genuinely automatable here; it is not limited to titles and metadata. What it may
**not** do is reuse footage without a licence — capability is not permission.

---

## 8. Commands

- `/discover` — today's strongest opportunities in the active niche profile.
- `/viral` — candidates with the highest recent view velocity.
- `/emotional` — shock, crying, anger, disbelief, joy.
- `/funny` — fails, unpredictable NPCs, unexpected events.
- `/mystery` — secrets, suspicious events, unanswered questions.
- `/story` — character drama, missions, unexpected endings.
- `/clip <url>` — inspect one source and return complete plans for its best moments.
- `/top10` — the ten highest-scoring **verified** moments (fewer is fine).
- `/female` — creators who state they are women, best moments (profile-dependent).
- `/paid` — every brief in the profile, ranked by rate × floor × budget left, with the effective
  CPM of each pool. Refuses pools that pay less per view than the best per-view brief.
- `/plan <campaign-id>` — one moment → complete plan + compliance gate for that brief.
- `/check <plan.json>` — deterministic pre-flight (`node scripts/clip-campaign-check.mjs`).

Default daily run is **five researched opportunities, not fifty**. Quality is the product.

---

## 9. Non-negotiables

1. Never fabricate a URL, timestamp, quote, reaction or game event.
2. Never label a theory as confirmed.
3. Never confuse a stream's total views with a clip's performance.
4. Licence first: verified CC, written permission, or your own capture. A viral source clip is
   research material, not publishing rights.
5. Keep the promised payoff. If the hook says "he lost everything", the Short must show it.
6. GTA 6 profile only, while that profile is active. Do not wander into another subject.
7. In paid mode, the brief outranks the creative idea. If the required name, hashtag, platform,
   audio rule or account lane does not fit, pick another brief — never post a clip that fails a
   written rule, and never send the same finished clip to two campaigns.
8. Never quote a rate without its cap and floor. A rate alone is not a price.
9. Campaign clips go on a dedicated account, never the brand channel. Both audiences lose when
   they are mixed (`references/paid-campaigns.md` §6).
