# Channel Stats Audit — The Untold Exit

**Channel:** `UCDtw5Rb0c4QONw5Ko789lig` · **Pulled:** 2026-11-21
**Sources:** YouTube Analytics API (28d, finalized through 2026-11-17) + Data API video counters (live) + channel record

---

## 1. Headline

| Metric | Value | Read |
|---|---|---|
| Public videos | 30 (47 total incl. 17 private) | 9 were published in one day — Nov 18 |
| Lifetime views (video counters, live) | **~772** | almost all of it earned in the last 72h |
| Views in finalized analytics window (Oct 24 – Nov 17) | **84** | the 28-day "total" is really an 11-day total |
| Views Nov 18–20 (from video counters) | **~667** | **≈ 8× the previous 11 days, in 3 days** |
| Subscribers | **0** (confirmed, not hidden) | 700 views → 0 subs. This is the actual problem |
| Likes | 5 total across 30 videos | ~0.6% like rate |
| Channel-level viewCount field | 364 | **stale cache** — do not trust it |

**The one-line finding:** GTA 6 launch week multiplied the channel's traffic eightfold and the channel still converted zero subscribers, because the traffic arrived on 11 videos at once, in front of one 25-second reused clip that breaks the channel's own rules.

---

## 2. What actually moved the needle

| Video | Len | Views | Published | Note |
|---|---|---|---|---|
| iShowSpeed's First Look At GTA 6 | 0:25 | **315** | Nov 19 23:29 | **41% of all channel views.** Third-party clip |
| GTA 6 Unlocks at Different Times… When Can YOU Play? | 1:05 | **144** | Nov 18 | pure search-intent utility |
| Lucia Was Arrested In Her First Hour | 2:01 | **66** | Nov 18 | character story, launch moment |
| 3 Time Habits That Save You Hours | 0:34 | 32 | Nov 18 | P4 short, no GTA tie-in |
| They've Been Watching Us (4,000 Years Pt 3) | 2:01 | 31 | Nov 18 | best P1 number on the channel |
| How Players Got GTA 6 18 Hours Early (NZ Trick) | 4:05 | 27 | Nov 17 | longest GTA video, still landed |
| GTA 6's 5 Free Gifts Are Expiring | 1:31 | 25 | Nov 18 | |
| 4 GTA 6 Mistakes You Can't Undo | 1:17 | 17 | Nov 18 | |
| Only 1 Door Won't Kill You | 1:00 | 16 | Nov 8 | best retention of the old batch |
| GTA 6 Passed $1 Billion Before Launch | 1:01 | 13 | Nov 16 | **loops 4.4× per viewer** |
| One of These 100 People Is a Millionaire | 1:01 | 13 | Nov 11 | 23% retention — weakest format |
| GTA 6's STRANGEST Hidden Location | 1:41 | 8 | Nov 19 | |
| Why GTA 6 Took 13 Years | 3:01 | 7 | Nov 16 | 12% retention |
| Nvidia Spy Pt 2 / Pt 1 | 5:00 / 4:20 | 5 / 5 | Nov 14 / 12 | series stalled |
| GTA 6 Leak That Changed Gaming Forever | 3:44 | 4 | Nov 17 | |
| Brian LOCKED Jason In… But WHY? | 1:00 | 4 | Nov 15 | |
| 4,000 Years Pt 2 / Pt 1 | 2:01 / 1:01 | 2 / 1 | Nov 13 / 9 | serialisation not paying |
| 8 more videos | — | 1 each | — | noise |
| 🔴 GTA 6 Giveaway Gifts (Worldwide Launch Countdown) | **0:00** | **0** | Nov 18 | broken upload, public, title promises a giveaway |

### Pattern
1. **Launch-window GTA 6 search intent is the only traffic engine.** 144 views on "when can YOU play" proves viewers are searching utility right now, not watching stories.
2. **One 25s clip beat the entire catalogue combined** — including nine polished long-form uploads published the same day.
3. **Serialised P1/P2 series get 1–5 views.** Anime survival stories do not survive on a 0-sub channel.
4. **Duration is not the problem, discovery is.** The 4:05 NZ video got 27 views; the 5:00 Nvidia got 5. Title/search-intent decided it, not length.

---

## 3. Retention (real signals only)

`averageViewPercentage` — small samples, read directionally:

| Video | Len | Avg dur | Avg % | Interpretation |
|---|---|---|---|---|
| GTA 6 Passed $1 Billion Before Launch | 1:01 | 269s | **441%** | viewers loop it 4.4× — Shorts feed loves it |
| 4 GTA 6 Mistakes You Can't Undo | 1:17 | 80s | 104% | loops |
| The Final 60 Seconds Before GTA 6 | 1:04 | 64s | 100% | loops |
| Only 1 Door Won't Kill You | 1:00 | 34s | 57.6% | healthy for a 60s pick-a-door |
| How Players Got GTA 6 18 Hours Early | 4:05 | 61s | 24.9% | long form is not being watched |
| One of These 100 People Is a Millionaire | 1:01 | 14s | 23.3% | guess-format fails to hook |
| Why GTA 6 Took 13 Years | 3:01 | 22s | 12.3% | hook dies in 20s |
| They've Been Watching Us (Pt 3) | 2:01 | 12s | 10.5% | story cold-open too slow |

**Rule that falls out of this:** anything over ~2:30 is currently un-watchable on this channel (12–25%). The formats that loop or hold are **55–80s**, single-question, captioned.

---

## 4. Traffic sources (finalized window, 84 views)

| Source | Views | Min watched |
|---|---|---|
| YT_SEARCH | 24 | 6 |
| YT_CHANNEL | 23 | 31 |
| RELATED_VIDEO | 14 | 7 |
| SUBSCRIBER | 9 | 2 |
| SHORTS | 7 | 1 |
| NO_LINK_OTHER | 3 | 1 |
| EXT_URL | 3 | 2 |
| NOTIFICATION | 1 | 0 |

- Search is still #1 — confirms the AGENTS.md §3 read.
- **SHORTS feed shows only 7 views in that window** → the Shorts pump did not start until the Nov 18–19 uploads (which analytics has not ingested yet). The next pull is the one that matters.
- YT_CHANNEL 23 views / 31 min = people clicking around the channel page, likely from a single visit session.
- SUBSCRIBER 9 views on a channel with **0 subscribers** = these are the channel owner / shared-link sessions. Ignore.

**Demographics & country: empty.** Both under YouTube's privacy threshold. There is no audience to profile yet — any market-targeting decision stays theoretical for now.

**Comments (21 in 28d):** every public video carries 1–3 comments at 1–31 views. That count is almost certainly **our own outreach and self-comments**, not inbound. Real audience comments are ≈ 0.

---

## 5. Risks found in the data

1. **`JyBvL6ilRf8` (iShowSpeed, 315 views, top video) is reused third-party footage.** Its own description says *"Clip: 0:00–0:03 and 0:09–0:31 of 1:06."* That contradicts the channel description (*"Everything here is our own animation and our own captures"*) and is the exact pattern YouTube cites for **reused-content monetisation denial**. It is also the only video that performed. This is a strategic fork, not a detail.
2. **`lgUnPMbWsYw` is public with duration 0:00** and a title promising *"GTA 6 Giveaway Gifts"*. A broken public video that advertises a giveaway is a fake-giveaway / spam signal with zero upside. Delete or re-upload.
3. **Nov 18 burst:** 9 public uploads in 24 hours split the launch-day traffic (median 25 views). Launch day was the one day to concentrate fire, and it was spread across nine titles.
4. **Duplicate playlist entry:** `BrM4EGZmS9A` appears twice in the uploads playlist.
5. **Metadata drift:** several Nov 18 descriptions carry the long templated "THE MYSTERY CHALLENGE 🔥" copy from the retired OhBhai! style. Not a policy issue, just off-brand.
6. **Channel-level `viewCount` (364) is a stale cache** and will understate reality in any report that reads it. Use video counters or `query_analytics_raw` with a 2–3 day lag offset.

---

## 6. What to change, in order

**This week**
1. **Concentrate, don't spray.** One launch-window GTA 6 upload per day at 20:00 UTC, not nine. The next 72h are still the highest-intent GTA 6 search window the channel will ever get.
2. **Build the 55–80s captioned Short as the default unit.** Loop-rate evidence (441% / 104% / 100%) says the Shorts feed is the only place this channel gets free distribution. Long form at 3–5 min is currently 12–25% retention — do not lead with it.
3. **Chase search intent, not story arcs.** "When can YOU play" (144) vs "Why GTA 6 Took 13 Years" (7) is the whole lesson: answer a question people are typing right now.
4. **Fix the two broken/risky videos** (delete or replace `lgUnPMbWsYw`, decide the reused clip) — needs your sign-off.
5. **Add a subscribe ask inside the first 20 seconds** of every Short. 700 views → 0 subs means the ask is either absent or buried.

**Structural**
6. **Every Short needs a named question in the title** (a noun the viewer can search): unlock time, price, map, character, mistake — not a mood.
7. **Stop uploading P1/P2 episodes on a schedule nobody is watching.** 1–5 views per episode. Ship them, but stop counting them as growth; do not let them consume the daily slot during the launch window.
8. **Re-pull analytics on 2026-11-23** (data through Nov 20–21) to see the real Shorts-feed spike and whether the 315-view clip brought any subs. Everything above is directional until that lands.

---

## 7. Data caveats

- Analytics lag is 2–3 days on this channel; the daily series stops at Nov 17 while video counters already include Nov 18–21.
- Latest full analytics window: 84 views. Video counters: ~772 lifetime. The gap is entirely Nov 18–21 traffic.
- Every retention figure except the 16-view Door and 13-view Millionaire is a 1–8 view sample. Treat as signal strength, not statistics.
- Demographics, countries, device split: unavailable (below privacy threshold).
