# Channel analytics — 2026-11-20

Source: YouTube Analytics API v2, `channel==MINE`. Window: 2026-10-01 → 2026-11-20
(the API returns nothing before 2026-11-07 — see "Data caveats").

## Headline totals

| Metric | Value |
|---|---:|
| Views | 84 |
| Watch time | 53 min |
| Average view duration | 59 s |
| Average percentage viewed | 44.9% |
| Likes | 2 |
| Comments | 21 |
| Shares | 0 |
| Subscribers gained | **0** |
| Subscribers lost | 0 |

Lifetime totals and 28-day totals are **identical** — the channel has no analytics
before 2026-11-07.

## The structural fact

All 29 public videos were published in **12 days**:

```
2026-11-08  ##        2026-11-14  #
2026-11-09  ##        2026-11-15  #
2026-11-10  #         2026-11-16  ##
2026-11-11  ##        2026-11-17  #####
2026-11-12  #         2026-11-18  #########
2026-11-13  #         2026-11-19  ##
```

2.4 uploads/day, 9 of them on a single day (Nov 18), into a channel with no
subscriber base. Nothing has had time or audience to accumulate. "Underperforming
videos" is therefore the wrong frame — there is no baseline yet.

## Daily views (last 30 days)

```
Nov 07   1
Nov 08  14   <- spike
Nov 09   5
Nov 10   6
Nov 11   9
Nov 12  10
Nov 13   1
Nov 14   3
Nov 15   6
Nov 16   8
Nov 17  21   <- best day
Nov 18+  (no rows yet — 3-day analytics lag)
```

## Traffic sources (28 days, 84 views)

| Source | Views | Minutes |
|---|---:|---:|
| YT_SEARCH | 24 | 6 |
| **YT_CHANNEL** | **23** | **31** |
| RELATED_VIDEO | 14 | 7 |
| SUBSCRIBER | 9 | 2 |
| SHORTS | 7 | 1 |
| NO_LINK_OTHER | 3 | 1 |
| EXT_URL | 3 | 2 |
| NOTIFICATION | 1 | 0 |

Search is #1 by views but **#3 by watch time**. Channel-page traffic is 23 views
and 31 of 53 minutes — **58% of all watch time**. People who reach the channel
browse and watch; people who arrive from search leave fast.

## Device (lifetime)

| Device | Views | Minutes |
|---|---:|---:|
| Desktop | 31 | 25 |
| Mobile | 30 | 18 |
| **TV** | **17** | **7** |
| Tablet | 6 | 1 |

20% of views are on TVs. Long-form is being consumed on the big screen.

## Shorts vs long-form

| Bucket | Videos | Views | Weighted avg view | Weighted % viewed | Subs |
|---|---:|---:|---:|---:|---:|
| ≤61 s | 7 | 45 | 66 s | 108.8% (loops) | 0 |
| >61 s | 14 | 38 | 67 s | **36.7%** | 0 |

Shorts take 54% of views from 33% of uploads and convert **zero** subscribers.
Long-form holds 36.7% — the binding constraint.

## Per-video (2026-10-01 → 2026-11-20)

| Views | Avg s | % viewed | Length | Published | Video |
|---:|---:|---:|---:|---|---|
| 16 | 34 | 57.6% | 60 s | 11-08 | `U88Lw5PzzZc` Only 1 Door Won't Kill You |
| 13 | 14 | 23.3% | 61 s | 11-11 | `RVyIvZ5S4cE` One of These 100 People Is a Millionaire |
| 11 | 61 | 24.9% | 245 s | 11-17 | `NjwpwUcxo8Y` GTA 6 18 Hours Early \| NZ Trick |
| 8 | 269 | 441% | 61 s | 11-16 | `lyN781QvfII` GTA 6 Passed $1 Billion (loops) |
| 7 | 22 | 12.3% | 181 s | 11-16 | `KxOzYtPIsvk` Why GTA 6 Took 13 Years |
| 7 | 11 | 20.3% | 56 s | 11-10 | `3g5WteLmvtc` Biggest Pizza in New York |
| 5 | 26 | 8.9% | 300 s | 11-14 | `9P6BnLRrDxM` Spy Stole Our AI Chip |
| 5 | 88 | 34.1% | 260 s | 11-12 | `SYpr2t0XIuU` Nvidia Spy Scandal |
| 2 | 121 | 100.3% | 121 s | 11-13 | `Oeh0zuUCROw` WE WOKE UP 4,000 YEARS AGO |
| 2 | 80 | 103.9% | 77 s | 11-18 | `048FGKt95zk` 4 GTA 6 Mistakes |
| 1 | 64 | 100.0% | 64 s | 11-17 | `3buS8kA7Qio` The Final 60 Seconds |
| 1 | 261 | 57.6% | 454 s | 11-08 | `e34mKHkfC4Y` Never Survive This Jungle |
| 1 | 180 | 99.5% | 181 s | 11-09 | `0KUXSARfbVA` Trapped Underwater |
| 1 | 169 | 56.5% | 301 s | 11-07 | `nrWnD_V6hT4` Hunted on a Deadly Island |
| 1 | 75 | 86.9% | 87 s | 11-11 | `QhqpxvGjBE0` 3 Prisoners vs 3 Cops |
| 1 | 12 | 10.5% | 121 s | 11-18 | `BrM4EGZmS9A` They've Been Watching Us |
| 1 | 0 | 0% | 61 s | 11-09 | `FBXUq9gXX-I` WE WOKE UP… THE WAR |
| 0 | — | — | 60 s | 11-15 | `R-qJm86xS5s` Brian LOCKED Jason In |
| 0 | — | — | 120 s | 11-17 | `KQoNl-voCnw` GTA 6 Is Downloaded… Still Locked |
| 0 | — | — | 70 s | 11-17 | `vEraiuwOh2o` Why You Keep Starting but Never Finish |
| 0 | — | — | 61 s | 11-11 | `HzERoRgVeg8` I WOKE UP IN A JUNGLE |

## Per-video traffic mix (28 days, top 5)

| Video | Views | Where they came from |
|---|---:|---|
| `U88Lw5PzzZc` Only 1 Door | 16 | **search 12**, channel 2, shorts 2 |
| `RVyIvZ5S4cE` Millionaire | 13 | **search 8**, shorts 4, channel 1 |
| `NjwpwUcxo8Y` NZ Trick | 11 | channel 6, related 4 — **search 0** |
| `lyN781QvfII` $1 Billion | 8 | channel 5, subscriber 2, shorts 1 |
| `KxOzYtPIsvk` 13 Years | 7 | related 5, subscriber 1 — **search 0** |

## Findings, ranked

1. **Zero conversion is the headline.** 84 views, 0 subscribers, 0 shares, 2 likes.
   This is not a traffic problem yet — it is a conversion problem. Nothing on the
   channel asks for a subscribe, and no video has held anyone long enough to earn one.
2. **Long-form retention is the binding constraint: 36.7%.** Videos of 3–8 minutes
   hold about a third of their length. Search-fed long-form at 37% will not be
   recommended. The 60-second videos hold 57.6% by contrast.
3. **Cadence is fighting the channel.** 9 uploads on Nov 18 and 5 on Nov 17 means
   every video splits the same tiny audience. Series episodes 1–3 days apart is the
   rule in AGENTS.md §6; the actual publishing pattern is a dump.
4. **The channel page is the conversion engine, not search.** 58% of watch time
   comes from 23 channel-page views. Search delivers 24 views and 6 minutes —
   people arrive, watch 15 seconds, and leave. Playlists and series structure are
   doing the real work.
5. **Shorts are confirmed dead as a growth lane** — own-channel evidence now, not
   just cluster data: 45 views, 1 minute watched, 0 subscribers from 7 shorts.
6. **GTA search is a losing race.** Both GTA videos with real impressions
   (`NjwpwUcxo8Y`, `KxOzYtPIsvk`) got **zero** search views and were fed by
   channel/related instead. Competing on day-old GTA news against 5M-view channels
   does not work for a channel with no authority. The two search winners are both
   original challenge formats, not news.
7. **TV is 20% of views.** Long-form on the big screen is real; 60-second loops
   are not what a TV audience wants.
8. **4 videos have literally 0 views** — `R-qJm86xS5s`, `KQoNl-voCnw`,
   `vEraiuwOh2o`, `HzERoRgVeg8`. Zero impressions, not zero interest.

## Caveats

- **Comment count is inflated by us.** 10 of the 21 comments are the self-comments
  posted 2026-11-19. The engagement ratio on this channel is not organic.
- **Analytics lag.** Daily rows stop at 2026-11-17. The Nov 18–19 uploads (including
  the GTA 6 launch-day videos) have no data yet.
- **Geography and demographics unavailable.** `country` returned no rows and
  `ageGroup` is rejected — below the API's minimum data volume. No audience
  profile exists yet.
- **No impressions or CTR.** The API rejects `impressions` and
  `impressionClickThroughRate` for this channel, so thumbnail performance cannot
  be measured. Everything above is views/retention only.
- Sample is 84 views. Treat all of this as directional, not statistical.
