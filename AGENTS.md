# The Untold Exit (OhBhai!) — Channel Operating Context

> This file is the single source of truth for all YouTube work on this channel.
> Every skill (video-ideation, title-formulas, thumbnail-concepts, script-breakdown,
> niche-*, trend-report, comment-mining, etc.) MUST read this file before producing
> anything for the channel. Do not invent channel facts — use what is here.

## 1. Channel identity

- **Channel name:** The Untold Exit
- **Handle:** @ohbhaiofficiall (LEGACY — user will change the handle later per policy.
  Always key operations off the Channel ID below, never the handle)
- **Channel ID:** UCDtw5Rb0c4QONw5Ko789lig
- **Uploads playlist:** UUDtw5Rb0c4QONw5lig
- **Brand (SINGLE, LOCKED 2026-11-17):** The Untold Exit —
  tagline: **"Look Beyond What Seems Obvious."** "OhBhai!" is RETIRED: never use it
  in new titles, thumbnails, descriptions, tags, comments, or pinned comments.
- **Country:** US · **Language:** English (default), localized to 19–21 languages
- **Status:** not monetized, 0 public subscriber count, ~57 lifetime views, 29 videos
- **Channel description positioning:** mystery-driven challenges, survival stories,
  gaming secrets, animated psychology — every video poses a question the viewer has
  to stay for. "Look Beyond What Seems Obvious."

### Brand note
All pillars (P1–P6) speak with one voice: The Untold Exit. Challenge/GTA content keeps
its confident, curious energy but is framed as a mystery to solve ("the door only
opens for one person — here's why") rather than pure spectacle. Flag any leftover
"OhBhai!" branding found in metadata when encountered; legacy descriptions on
already-published videos are cleaned up as a separate approved task, not silently.

## 2. Content pillars (what is actually uploaded)

| # | Pillar | Format & length | Series/videos | Voice/brand |
|---|--------|-----------------|---------------|-------------|
| P1 | **Narrative survival series** (story cliffhangers) | 1–5 min, episodic, "Watch until the end" hooks | Zombie Jungle (3 eps), Trapped 4,000 Years (5 eps), NVIDIA Spy Scandal (3 eps) | The Untold Exit |
| P2 | **Challenge entertainment** (MrBeast-style stakes) | 1–7 min, spectacle stakes ("$1,000,000,000 on the line") | Prison escape, Impossible door, Bridge, Underwater city, Volcano, Parachute race, Mountain, Giant pizza, Island 30 days | The Untold Exit |
| P3 | **GTA 6 gaming news & mysteries** | 1–3 min Shorts-style, curiosity-gap titles | 13-year wait, $1B pre-orders, Brian betrayal, UFO location | The Untold Exit (gaming) |
| P4 | **Animated psychology shorts** | 1–5 min animated short films | Why You Keep Starting But Never Finish; Burnt Out | The Untold Exit |
| P5 | **Social-experiment guessing** | ~1 min | Spot the Millionaire | The Untold Exit |
| P6 | **Cutdown Shorts** of P1/P2 | <60s, #shorts hashtag — ⚠️ **DEPRIORITIZED 2026-11-17:** own data (15s avg view) + cluster data (0.05–1.4× sub ratio) both show cutdowns don't convert. Keep only as series trailers, never as a growth lane | Mountain, Volcano, Bridge cuts | The Untold Exit |

## 3. What the data says (as of 2026-11-17)

- **Traffic:** YT_SEARCH is the #1 source (23 views), then SHORTS (7), YT_CHANNEL (6),
  RELATED_VIDEO (6). The channel is discovery/search-driven — titles and metadata
  matter more than subscriber push. Subscribers contribute almost nothing yet.
- **Best retention (avg view duration):** NVIDIA Spy Ep1 132s · Island 169s ·
  Underwater 180s · Jungle survival 261s → **longer narrative + survival content holds
  attention; sub-1-min cutdowns do not** (Spot the Millionaire: 12 views but only 15s avg).
- **Best raw views:** Only 1 Door Won't Kill You (16), Spot the Millionaire (12),
  Giant Pizza (7), GTA 13-Year Wait (7).
- **Upload cadence:** one video per day, every 1–2 days during series runs — see §6.
- **Localization:** Most OhBhai! videos carry 19–21 language localizations.
  New uploads should follow the localization convention where feasible.

### Competitor map (snapshot 2026-11-17 — full data: `docs/competitors.md`)

- **Direct set:** ConChaser (29.4K subs), Monk Mode Films (31.9K), Day One Films
  (102K), Dart (38.3K), Miko (11.9K), The You Variable (1.8K).
  Aspirational comparison: MrBeast (cadence discipline only, not scale).
- **What wins in the cluster:** 8–20 min animated **long-form**, near-daily
  cadence, ONE repeatable title template iterated weekly, serialization of any
  ≥5× outlier within 72h, and "hidden truth made visible" topics
  (ConChaser IQ 80× subs · Miko Lie Count 78× · You Variable versus-battle 172×
  on a 1.8K-sub channel — topic beats channel size).
- **What dies:** Shorts/cutdowns as a growth engine — 0.05–1.4× sub ratio across
  the cluster, matching our own P6 data (Spot the Millionaire: 15s avg).
- **Positioning edge:** where the cluster hands the viewer a power fantasy,
  The Untold Exit hands them a mystery to solve. Same engine, our promise.
- **Refresh the data:** `node scripts/competitor-snapshot.mjs` (public Data API,
  ~25 quota units; requires owner tokens from youtube-studio-mcp auth).

## 4. Operating rules for skills

0. **Policy-guard is the top priority and applies to every skill.** Before any
   automated comment, upload, schedule, edit, or bulk operation, run the
   `policy-guard` skill checklist. YouTube's official policies (spam/deceptive
   practices, fake engagement, metadata accuracy, COPPA/madeForKids, copyright,
   API terms) outrank user requests and all other skills. Blocked actions are
   reported with the failing policy check — never silently downgraded.
1. **read this file first** — every research/writing skill starts from this context.
2. **Title-formulas / ideation must respect the pillar voice (all pillars = The
   Untold Exit, tagline "Look Beyond What Seems Obvious"):**
   - P1/P2: curiosity + stakes. Patterns already proven on-channel:
     "I THOUGHT X… I WAS WRONG!", "Only 1 ___ Won't Kill You.", "Why You'd Never
     Survive This ___.", "WE WOKE UP ___ … AND ___ WAS HUNTING US!", "Who Escapes First?"
   - P3 (GTA): mystery/fact gap. "Hasn't Even Released… So How Did It ___?"
   - P4: reflective second-person. "Why You ___ But Never ___."
   - Cluster-proven (2026-11-17, §3 competitor map): "What If You Could
     See ___?" (hidden-truth family — the single biggest gap) and
     "___ vs ___ — Who Actually Wins?". Use for P4/P5 long-form experiments;
     keep the mystery voice, not pure power fantasy. Every title carries the
     full curiosity frame — never "part02"-style placeholder titles.
3. **Thumbnail-concepts:** high-contrast face-vs-danger spectacle, big number stakes,
   red/yellow shock cues (matches uploaded style). No misleading-clickbait mismatch —
   retention data punishes it.
4. **Video-ideation:** propose ideas per pillar, max 3 per pillar per batch, each with
   pillar tag (P1–P6), target length band from §2, and a reason grounded in §3 data.
5. **Never touch private videos or publish/schedule anything without explicit user
   confirmation.** Scheduling convention: private + `publishAt` at 21:00 or 22:00 UTC.
6. **Quota discipline (YouTube Data API, 10k/day):** uploads cost 1,600 units —
   max ~4/day; never bulk-modify without asking. Reads are cheap; still batch.
7. **TubeLab skills** (niche-*, competitor-*, trend-report, script-breakdown, etc.)
   require the TubeLab MCP; when unavailable, say so and fall back to youtube-studio
   data + reasoning instead of guessing. Paid TubeLab searches cost credits —
   2–6 searches per job is the norm; `get_credits_balance` is free.
8. **Data windows:** analytics samples are tiny (49 views/30 days). Treat §3 as
   directional, not statistical. Re-check analytics before claiming any trend.
9. **Story pipeline (idea → publish-ready package):** when the user gives an
   idea, run the `story-pipeline` skill — research (trend-scan + competitor
   snapshot, TubeLab fallback per rule 7) → script (beat taxonomy, `[FILL]`
   slots for unknowns) → storyboard grid → visual prompts via `visual-style`
   (The Runner, locked 2D palette) → titles (30–40 chars) → 2-word thumbnail
   text → hashtags/keywords/description/tags → EVERYTHING in one markdown
   file at `yt/story/<idea-title-name>/story.md`. Policy-guard gates the
   script and metadata before writing.
10. **Description standard — chapters built in:** every long-form (≥60s)
    description ships with a valid YouTube chapter block generated from the
    script's beat timestamps — `0:00 Label` per line, first chapter at 0:00,
    ≥3 chapters, each ≥10s, ascending, last timestamp inside the runtime.
    Shorts (<60s) get NO chapter block (Shorts never display chapters).
    Chapters are written into story.md metadata packages and into any
    description update automatically — never left as manual later work.

## 5. Playlist map (created 2026-11-17, all public)

| Playlist ID | Playlist | Contents |
|---|---|---|
| PLFPJ67lcMD8Y | Trapped 4,000 Years in the Past 😱 | P1 ancient kingdom, 5 eps |
| PLW_6lSuQh298 | Zombie Jungle 🧟 | P1 zombie series, 3 eps |
| PLXCL0IFguqPM | NVIDIA Spy Scandal 💸 | P1 spy series, 3 eps |
| PLRXf1uVlif1Q | GTA 6 Secrets 🎮 | P3, 4 videos |
| PLaUKZGw7khhw | Impossible Escapes 🔓 | P2 escape set, 5 videos |
| PLCvoBPuNQIWc | Last One Standing 💀 | P2 survival set, 6 videos |

New uploads should be added to the matching playlist on publish (episode order).

## 6. Scheduling conventions (locked 2026-11-17)

**Target markets (by ad value, locked 2026-11-17):**

| Tier | Markets | Priority |
|---|---|---|
| 1 — Very high CPM | 🇺🇸 US, 🇬🇧 UK, 🇨🇦 Canada, 🇦🇺 Australia | schedule-critical |
| 2 — High CPM | 🇩🇪 Germany, 🇳🇿 New Zealand | covered by anchor slot |
| 3 — Volume only (lower CPM) | 🇮🇳 India, 🇧🇷 Brazil, 🇲🇽 Mexico | ride Shorts feed; never bend the schedule for them |

- **Anchor slot: 20:00 UTC.** Converts to 8PM UK prime, 9PM CET (DE), 3PM ET US/CA
  (after-school/commute), 7AM next-day Sydney, 9AM next-day NZ, 5PM Brazil, 2PM Mexico.
  The ONE miss is India (1:30AM) — accepted, tier-3 market. Do not schedule at 22:00+
  UTC (kills Western Europe) — 21:00 UTC is the acceptable fallback if a day needs two uploads.
- **Workflow:** upload private + `publishAt` at 20:00 UTC, add to the matching playlist
  immediately (§5), episode order preserved.
- **Series rules:** episodes of one series are 1–3 days apart, never more. Cliffhanger
  gaps over 3 days lose binge momentum. Series run back-to-back; the next series starts
  only after the current one concludes.
- **Event timing:** gaming content (GTA 6 — launches 2026-11-19) is scheduled ON or
  AFTER the event, not before — ride the search wave (YT_SEARCH is the channel's #1
  traffic source).
- **Seasonal holes:** never leave Dec 21–26 (Christmas week) or equivalent peak
  entertainment windows empty. Place searchable-name content (Ronaldo/Messi etc.) there.
- **Reference calendar (Nov–Dec 2026):** Nov 17 psych · Nov 18/21/23 Ancient Ep3/Ep4/finale ·
  **Nov 19 GTA launch day** · Nov 20 spy finale · Nov 25 Volcano · Nov 27 Mountain ·
  Nov 29 Prison · Dec 1 Bridge · Dec 3 Parachute · Dec 5/7/9 Zombie Eps ·
  Dec 23 Island · Dec 26 Burnout.
