# Metadata Refresh — 2026-11-18

Scope: all **24 public videos** + **channel branding**. The 15 scheduled videos were
not touched (AGENTS §4.5).

---

## 1. What the keywords are based on

Live `trend-scan` runs, 7-day window, 2026-11-18 (~600 quota units total):

| Query | Median views | Median views/subs | Top outlier | Length mix |
|---|---:|---:|---|---|
| `gta 6 gameplay` | 5,435,094 | 8× | 22.5M (136×) | 7 of 10 under 90s |
| `gta 6 lucia` | 2,436,644 | **20×** | 12.0M (20×) | 7 of 10 under 90s |
| `gta 6 tips` | 1,364,810 | 3× | 801K from 857 subs (**935×**) | 4 short / 5 long |
| `gta 6 secrets` | 844,057 | 1× | 8.5M in a **6-second** video (1,390×) | 6 short / 4 long |
| `survival story animated` | 494,963 | 6× | 2.46M (5.5×) | shorts median 929K |
| `why you procrastinate` | 1,503 | 42× | small niche, high ratio | shorts median 1.4K |

**Terms adopted:** `gta 6 lucia`, `gta 6 first hour`, `gta 6 launch night`,
`gta 6 release time`, `things not to do gta 6`, `gta 6 secrets`, `gta 6 tips`,
`survival story animated`, `animated survival story`, `why you procrastinate`.

**Terms deliberately rejected** even though they are the biggest in the scan:
- `gta 6 vs gta 5` (22.5M / 8.5M results) — no video compares them. Using it would
  be a metadata claim the video doesn't deliver.
- `30 fps` (22.5M + 7.2M) — no performance content on the channel.
- `last to leave` / `giant builds` — dead lane in the 2026-11-17 cluster data, and
  the channel no longer publishes that content.

---

## 2. Titles changed (14 of 24)

| Video | Was | Now | Chars |
|---|---|---|---:|
| `3buS8kA7Qio` | 🔴 The Final 60 Seconds… \| Worldwide Launch Countdown 24/7 | The Final 60 Seconds Before GTA 6 \| GTA 6 Launch Countdown | 92→58 |
| `PsdNCzTWHXs` | …\| GTA 6 live countdown \| GTA 6 release | …\| GTA 6 Pre-Order Bonuses | 72→59 |
| `SYpr2t0XIuU` | Nvidia Spy Scandal: Hired a Spy… (Can We Stop Them?) | Nvidia Spy Scandal: We Hired a Spy to Steal Our $5B Chips | 84→57 |
| `lyN781QvfII` | GTA 6 Hasn't Even Released… So How Did It Pass $1 Billion! | GTA 6 Passed $1 Billion Before Launch | 77→56 |
| `DrxALhLInLA` | GTA 6 Gameplay Hacked WON'T STOP… (BANNED or Continue) | The GTA 6 Leak That Changed Gaming Forever | 70→56 |
| `oh2D72vToCQ` | …in Every Country… When Can YOU Play? | GTA 6 Unlocks at Different Times Everywhere… When Can YOU Play? | 70→63 |
| `KxOzYtPIsvk` | …GTA 6's... 13-Year Wait?! | …GTA 6's 13-Year Wait | 70→65 |

Keyword appends (title kept, one phrase added):
`6Z_tNlGfhEw` → `| GTA 6 Lucia Story` (52→56) ·
`U88Lw5PzzZc` → `| Animated Survival Challenge` (27→56) ·
`e34mKHkfC4Y` → `| Animated Survival Story` (36→61) ·
`0KUXSARfbVA` → `| Animated Survival Story` (36→62) ·
`3g5WteLmvtc` → `| Animated Food Challenge` (28→53) ·
`RVyIvZ5S4cE` → `| Animated Guessing Challenge` (30→60) ·
`Q8n13DQlphU` → `3 Hidden Secrets That Save You Time` (30→35, was lowercase).

**Every title is now ≤68 chars.** Six were over 70 before; two of those were the
parked rewrites that were waiting on approval.

---

## 3. Compliance fixes found during the pass

These were not in the original audit — they surfaced while rewriting.

| Issue | Where | Action |
|---|---|---|
| **"OH BHAI" branding still live** | `U88Lw5PzzZc` (3 lines), `SYpr2t0XIuU` (section header) | Replaced with The Untold Exit copy |
| **Raw `Keywords:` dump line** | `SYpr2t0XIuU` | Deleted (metadata spam) |
| **Other creators' names as audience bait** | `U88`, `e34m`, `3g5`, `RVyI`, `0KUX`, `FBXU`, `OehO` | Removed the "if you enjoy MrBeast…" paragraphs and the lists of their video titles |
| **Malformed hashtag block** `#The Untold Exit` | `3g5WteLmvtc` | Removed; replaced with a valid block |
| **Duplicate hashtag blocks** | `KxOz`, `lyN`, `R-qJ`, `SYpr` (21 hashtags) | Consolidated to 3–4 |
| **0 tags** | `vEraiuwOh2o` | 14 tags added |
| **Legacy positioning copy** ("giant builds", "BIG CHALLENGES. CRAZY ADVENTURES. UNREAL FUN!") | several | Rewritten |

⚠️ **Retained on purpose:** `0KUXSARfbVA`, `FBXUq9gXX-I`, `Oeh0zuUCROw` still name
MrBeast / Ronaldo / Messi **as characters in the story**. Removing those lines would
misdescribe the video, so they stay. See §5.

---

## 4. Descriptions

- Every description ends with a curated **3–4 hashtag block** (was up to 21).
- Hashtags never exceed 15 (YouTube ignores all of them above that).
- Chapter blocks preserved verbatim on every video that had one.
- `U88Lw5PzzZc` got a **full rewrite** (1,674 → 647 chars): its old body was
  entirely someone else's template, including their video titles.
- Primary keyword sits in the first 160 characters on every video.

---

## 5. Open risk — needs your decision (not changed)

Three animated videos portray **real people as characters**:

| Video | Portrays |
|---|---|
| `FBXUq9gXX-I` | MrBeast, Ronaldo, Messi |
| `Oeh0zuUCROw` | MrBeast, Ronaldo, Messi |
| `0KUXSARfbVA` | MrBeast, Ronaldo, Messi, Donald Trump |

Each carries a fictional-context disclaimer ("not affiliated with, sponsored by or
endorsed by…"), which is the right mitigation and I kept it.

But a disclaimer does not create permission. Using real people's names and
likenesses in monetised entertainment is a **right-of-publicity** exposure that
metadata cannot fix. Options: leave as-is (highest risk), re-cut the characters,
or unlist. **I have not touched the videos themselves.**

---

## 6. What was not touched

- All 15 scheduled videos (Nov 18 → Dec 26), including the Nov 19 GTA slot.
- Playlist titles/descriptions.
- Channel handle (`@ohbhaiofficiall`), banner, trailer (trailer can't be set via API).
- Video files.

---

## 7. Post-write verification (read back from the API)

| Check | Result |
|---|---|
| Videos re-read | 24 |
| Titles over 70 chars | **0** (max 68) |
| Hashtags over 15 | **0** (max 4 per video) |
| Duplicate hashtags | **0** |
| Videos with 0 tags | **0** (316 tags total, ~13 avg) |
| Retired brand (`OhBhai` / `OH BHAI`) | **0** |
| Raw `Keywords:` lines | **0** |
| "If you enjoy MrBeast…" bait | **0** |
| Chapter blocks broken | **0** (the 2 flags were `00:00 UTC` inside Shorts, which have no chapter block) |
| Channel description | live, 662 chars |
| Channel keywords | live, 447 chars |
| Scheduled videos modified | **0 of 15** |

---

## 8. Quota

| Step | Units |
|---|---:|
| trend scans ×6 | ~612 |
| metadata reads | ~5 |
| `videos.update` ×24 | 1,200 |
| `videos.update` ×1 (pizza fix) | 50 |
| `channels.update` | 50 |
| **Total** | **~1,917** |
