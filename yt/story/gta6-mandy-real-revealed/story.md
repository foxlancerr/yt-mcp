# Story: "Who Is the Real Mandy in GTA 6?" (90 s Short)

**Skills used:** `story-pipeline`, `script-breakdown` (beat order), `visual-style`, `title-formulas` (30–40 characters), `thumbnail-hooks`, `gta6-clipper` rules, manual policy check (AGENTS.md §4.0).
**Pillar:** P3 · **Format:** 9:16 Short, 90 s (you set 1:30) · **Status:** research and edit plan. Nothing rendered, uploaded or scheduled. **Build is waiting on a footage source (§2).**
**Different from** `gta6-mandy-crying-part3` (that story is about her threat scene). This one is about the romance question and who plays her.

---

## 1. Research (2026-11-24)

**Evidence source:** YouTube Data API via `scripts/trend-scan.mjs` (2 queries) and `scripts/tag-scan.mjs`, about 308 units. TubeLab is not connected. I also read two articles (The Direct, SVG), ran web searches, and downloaded the top 98 s Mandy Short to count cuts and transcribe it.
**Not retrievable, so not used:** Instagram, Facebook, TikTok and X pages. They return nothing readable without a login, and I did not use cookies or any workaround. The actress's Instagram post is known only through outlets and a YouTube re-upload.

### 1.1 About the links you sent
- The title you typed, **"Mandy From GTA 6 Revealed! 👱‍♀️"**, is a Short by **Cayo, 2.38M views**.
- The URL you sent (`j2TinDauTEI`) is a different video: Asmongold Clips, **"Rockstar is f*cked.."**, 3.09M views, 3:36. Its own description says it is about the actress's "controversial TikToks about men". It is not a reveal video and not romance footage.
- "Real-life romance clips" and "he revealed his identity" do not match anything I found. Mandy is a woman; the actress is Lexie Shoaibi. I found **nothing public about her romantic life, and I did not look**.

### 1.2 What wins on Mandy (last 14 days)

| Video | Views | Subs | Ratio | Length |
|---|---|---|---|---|
| IGN, "Why you might want to take a closer look at Mandy" | 4.18M | 20.1M | 0.2× | 46 s |
| Caramel Hydra, "How-to Date Mandy" | 4.01M | n/a | n/a | Short |
| Project Americas, "I Secretly Followed Mandy…" | 2.74M | n/a | n/a | Short |
| ObbersGTA, "Never Fix Mandy's Sink" | 2.71M | n/a | n/a | Short |
| **Cayo, "Mandy From GTA 6 Revealed!"** | **2.38M** | n/a | n/a | Short |
| **Apex Films, "Can You Romance Mandy… (Creepy Secret)"** | **1.15M** | 588 | **1,952×** | 98 s |
| Zero Thickness, "What Jason Found in Mandy's Sink" | 562K | 226 | 2,488× | 8 min |
| Lexie Shoaibi's own "Hi I'm Mandy!" re-upload | 130K | 1.2K | 105× | 14 s |

Scan summary: median 235K views, median ratio 25× subs, 12 of 15 results are Shorts, short median 227K.
**Tags in use:** `gta 6`, `gta vi`, `mandy gta 6`, `mandy gta vi`, `rockstar games`, `jasonduval`. Hashtags: `#gta6` (21 of 25), `#gtavi`, `#gta`, `#mandy`, `#shorts`.

### 1.3 Direction analysis of the best 1:30-class video (Apex Films, `kB5MeJWLH_U`, 98 s)
- **13 cuts in 97 s** (about one every 7 s). Slower than our 3–4 s rule, so we beat it with zoom beats.
- **Script shape:** the hook states two questions in the first 15 s ("can Jason romance Mandy?" and "what did Rockstar hide?"), then answers them in order. One planted question, one payoff. It has chapters (0:00, 0:19, 0:54, 1:13).
- **Weak spots we avoid:** a "subscribe right now" mid-video, a "Part 2 drops later today" promise, and several single-source claims (the yard mound, the trunk items, "Rockstar blocks side flings").
- **Opening line pattern that won:** "Everyone paused GTA 6 the second…". The open question carries it.

### 1.4 Fact sheet (only these may be said or captioned)

| Fact | Source |
|---|---|
| Mandy is Jason's ex, first seen in Chapter 1's Pipework mission | Apex, IGN, several outlets |
| Lexie Shoaibi plays Mandy (voice and motion capture) | The Direct, SVG, Complex; her own Instagram video dated 2026-11-19 |
| She posted on launch day and asked players to find her in the game | The Direct |
| Her earlier credits: short films "Paradise by the Dashboard Light" (2016), "Atom" (2021) | The Direct, Insider Gaming |
| In the Pipework scene Jason walks out; Provoke or Defuse both end with him leaving | Apex only. **Confirm on frame** |
| Some people online falsely claimed to be Mandy | Insider Gaming |

**Do not state:** side-fling blocking, the yard mound, the trunk contents (single source, and unconfirmed on frame). Do not name anyone who was wrongly linked to the role (a streamer and a model were named by other outlets). The Short says only "others claimed it. The cast list says otherwise."
**Spelling:** The Direct writes "Shoaibi", SVG writes "Shoaib". Use **Shoaibi** (her own channel and Complex use it).

### 1.5 Honest note on "1M views"
No edit can promise 1M. The proof: a 98 s explainer from a 588-subscriber channel reached 1.15M with a two-question hook and in-order answers. The Mandy lane is saturated, so the angle that has room is one clean answer: **who plays her**, not a tenth sink video.

---

## 2. Source and rights (blocking item)

The only footage options and their status:

| Source | Status |
|---|---|
| Game capture by a creator (Punish, Champs Network, others) | **No permission on file** for this idea. You gave it for the Champs tank video only |
| Lexie Shoaibi's own Instagram video | Her content. Needs her permission |
| Asmongold Clips / IGN / Cayo | Third-party commentary. Not cleared |

My earlier Mandy footage folder `clips/mandy-cried/` is also gone from disk, so it can't be reused.
**What I need from you:** which footage you hold rights to for this one (a named capture of Pipework, or your own recording). The build below is ready to run the moment a source exists.

---

## 3. Script (90 s)

Our voice, no quotes from the actress, no private-life claims. Beats follow `script-breakdown`: hook, promise, stakes, open loop, escalation, payoff.

| Time | Beat | Line on screen |
|---|---|---|
| 0–4.5 | Hook | `SHE PULLED HIM BACK IN.` (mid-flirt, then freeze) |
| 4.5–12 | Promise | `Can Jason say yes to Mandy?` |
| 12–24 | Stakes | `His ex. Lucia is about to be out.` (confirm timing in game) |
| 24–40 | Escalation 1 | `She turns on the charm.` |
| 40–52 | Escalation 2 (the answer) | `He walks out. Every time.` (confirm Provoke and Defuse on frame) |
| 52–64 | Re-hook | `But who is she, really?` |
| 64–78 | Reveal | `Lexie Shoaibi. Voice and motion capture.` |
| 78–86 | Payoff | `She told players to find her in the game.` |
| 86–90 | Close | `Would you have said yes?` |

CTA: **one small line, no Runner end card, no arrows.** Per your request it is only the closing line above, on the last frame, same B&W freeze as 0:00 so it loops.

---

## 4. Curiosity hook (0–4.5 s), exactly as specified

| Out time | What happens | Layer |
|---|---|---|
| 0.00–0.20 | Black, low riser starts | riser under the whole hook |
| 0.20–3.00 | Mandy mid-flirt clip in **black-and-white**, 3% push, line `SHE PULLED HIM BACK IN.` | mono |
| 3.00–4.00 | **1.0 s freeze**, still B&W, hairline glitch tear | glitch stab |
| 4.00–4.20 | **3-frame white flash**, then **full colour** | whoosh |

Crops stay head-and-shoulders (no body framing), as in the earlier Mandy cut.

## 5. Shot list (to be confirmed on frame once footage exists)

| # | Out | Content | Move / effect |
|---|---|---|---|
| 1 | 4.5–12 | Jason arrives at Mandy's door | punch 115%, hold |
| 2 | 12–24 | Kitchen / sink opening | slow push |
| 3 | 24–40 | The flirt in the bedroom | 3.5 s zoom cadence, no cut mid-line |
| 4 | 40–52 | Jason leaves (**PEAK 1**) | white flash, bass drop, 3-frame micro-vibration |
| 5 | 52–64 | Text card: `WHO IS SHE?`, B&W flicker | glitch transition |
| 6 | 64–78 | Credits / cast reveal, our own cards (no actress photo unless she permits) | punch, whoosh |
| 7 | 78–86 | **PEAK 2**: the launch-day line card | flash, tension tone |
| 8 | 86–90 | Hook frame again, B&W | loops to 0:00 |

Cadence: a new angle, punch-in or card every 3–4 s, tight jump cuts to erase dead air, but no line is cut before it lands. Effects (glitch, vibration, flash) only on the peaks. Sound: riser, glitch, whoosh, bass drop, heartbeat; no licensed music; game audio low under our SFX; mute any profanity (word times checked at render).

## 6. Titles (30–40 characters)

| # | Title | Chars |
|---|---|---|
| **1 PRIMARY** | **Who Is the Real Mandy in GTA 6?** | 31 |
| 2 | Can You Romance Mandy in GTA 6? | 31 |
| 3 | Mandy's Actress Revealed Herself | 32 |

The primary promises a name and the video gives one, from a public cast list and her own post.

## 7. Thumbnail

**Text (2 words):** **SHE ANSWERED** (alternate: NOT BLONDE, a true point from SVG that Mandy is beach-blonde and the actress is a brunette). Completes the title, does not repeat it.

| Concept | Pattern | Prompt (about 60 words) | Why it hooks |
|---|---|---|---|
| **A, recommended** | T3 hidden-truth reveal | Flat 2D, thick outlines, pitch black. The Runner holds up a flat blonde wig like a mask, eyes narrowed; a cream beam from the top-left lights only the blank dark shape behind it. Cream text "SHE ANSWERED" bottom-left. Small unmodified GTA VI logo bottom-right. | The wig is the clue; the face is withheld |
| B | T2 shock-face + threat | Flat 2D, black frame. The Runner's wide-eyed face fills the left half with red shock marks; on the right a closed bedroom door with one glowing red phone-message bubble. Cream text "SHE ANSWERED". Small GTA VI logo bottom-right. (about 48 words) | The late-night message is a lure |
| C | T6 anomaly pointer | Flat 2D, black. A small cream kitchen sink; a thick red circle around the drain; the Runner looks the other way. Cream text "NOT BLONDE". Small GTA VI logo bottom-right. (about 40 words) | One wrong detail, dramatic irony |

The Runner is the only person in frame. **No real face, no photo of the actress.**

## 8. Metadata (90 s, so a chapter block is required by AGENTS.md §4.10)

**Description:**
```
Can Jason say yes to Mandy in GTA 6? And who is the real Mandy? Her actress answered on launch day.

0:00 Mandy Makes the First Move
0:31 Under the Sink
0:48 When the Flirting Turns to Jealousy
1:11 Who Is the Real Mandy?

Gameplay: Punish, "GTA 6 - Jason Fixes Mandy's Sink Scene" (https://www.youtube.com/watch?v=FJOXuas-OBg), used with permission. Cast information: Lexie Shoaibi's own post (Nov 19, 2026) and the GTA 6 cast list. Edit and commentary by The Untold Exit.

SPOILER: optional early-game scene, no late story.

Look Beyond What Seems Obvious.
```
Chapters: 5, last 1:04 < 1:30 ✓, each ≥12 s apart ✓, first at 0:00 ✓.
**Hashtags:** `#gta6 #mandy #gtavi #shorts`
**Tags:** gta 6 mandy, mandy gta 6, who plays mandy gta 6, lexie shoaibi, mandy actress gta 6, can you romance mandy, gta 6 pipework mission, jason and mandy, gta 6 secrets, gta vi, grand theft auto 6, rockstar games
**madeForKids:** false · **Category:** Gaming · **Proposed schedule (not applied):** private + `publishAt` 20:00 UTC.

## 9. Policy check log (AGENTS.md §4.0)

| Check | Result |
|---|---|
| Real person | Pass with limits: only the cast credit and her own public post. **Excluded:** her TikToks and the controversy, any private or romantic life, her photo or likeness, and anyone wrongly linked to the role |
| Harassment / targeting | Pass. No pile-on, no insinuation, nothing about her dating |
| Copyright | **BLOCKED until a permitted source exists** (§2) |
| Metadata accuracy | Pass if single-source claims stay out. Title and description match the video. "Real-life romance" is not implied |
| Spoilers | Disclosed, early-game only |
| Spam / copycat | Pass. Different angle from the Apex and Cayo videos |
| Chapters | 90 s video: block included, valid |
| COPPA | Not made for kids |
| Quota | About 308 units |

**Not verified:** Instagram was not readable, so her post is known through outlets only. The Provoke/Defuse outcome and the scene order are from one source and need frame checks. Nothing is uploaded or posted without your explicit yes.

---

## 10. Revision 2026-11-24: romance cut, built from the Punish capture

You asked for a more romantic scene. The real dialogue in Punish's capture (`FJOXuas-OBg`, transcribed with faster-whisper) is a flirt that Jason keeps deflecting, so the cut leads with it. All lines below are the game's own, taken from the transcript.

| Out | Source time | Beat |
|---|---|---|
| 0:00–0:04 | 73.2–76.3, freeze | Hook: "I'm not gonna jump you unless you want me to." B&W, freeze, flash |
| 0:04–0:17 | 28.4–36.4, 42.9–48.0 | Outside: "He's not getting the rent until he fixes my sink." "Don't make this weird." |
| 0:17–0:31 | 63.0–76.5 | The bedroom door: the hook line in full, flash on the line |
| 0:31–0:48 | 216.8–236.6 | Under the sink: "It's not stalking if you've met in person." "I have to keep breaking appliances to get you to come see me." "Whatever. I'm just kidding." |
| 0:48–1:11 | 268.0–301.0 | Jealousy: "Who are you with?" "ex-girlfriend in prison" "We were supposed to get married." (**PEAK 1**) |
| 1:11–1:27 | cards | Who is she? **The cast list says Lexie Shoaibi.** Voice and motion capture. Her own post, Nov 19. She asked players to find her in the game (**PEAK 2** on her name) |
| 1:27 | card | Closing question only: "Would you have said yes?" No Runner end card, no arrows |

**Kept out:** the swear words at 172.8 and 301.2, every body-framing shot (Mandy is in a bikini from the sink scene on, so those shots use Jason's face under the sink or head-and-neck crops), and anything about her private or real-life romance. The real person appears only as text.
**Not claimed:** that the scenes are a "romance route". They are one scene, and the story says only that Mandy flirts and Jason does not say yes. The title's "who is the real Mandy" is answered by the cast credit.
**Honest note on 1M:** romance framing helps the first 3 seconds, but no cut can promise 1M views.
