# Outreach — reply-active creators — 2026-11-21 (batch 2)

**Why this batch exists:** the user asked to comment only on channels that actively reply
to their own comments. The target pool (48 eligible, 14 markets, last 72h) was scanned with
`scripts/outreach-replier-check.mjs`, which counts **channel-owner replies** per video,
not reply counts.

**Result of the scan:** 12 of 48 creators reply at all. 36 reply to nothing — including
FlayHQ (0 replies across 202 sampled comments), JayWayyGaming, Blin., GTA6Videos,
BennyCentral, TheGamingRevolution and Lirik.

**Bug caught before posting:** the first scan reported 0 replies on all 48 videos. Google's
JS client serialises the author channel as `authorChannelId.value`, not `.channelId`, so every
comparison was `undefined === undefined`. Fixed and reran; nothing was posted on bad data.

## Posted — 10 / 10 live, verified

| # | Market | Channel | Subs | Author replies | Last reply | Posted (UTC) |
|---:|---|---|---:|---:|---|---|
| 1 | CA | Holy13 | 17.5K | 22 | 0.8h | 16:25 |
| 2 | BR | Cloide | 99K | 17 | 0.2h | 16:27 |
| 3 | TR | Coni Land | 1.1K | 14 | 17.7h | 16:28 |
| 4 | BR | BiggySweats | 22K | 12 | 11.3h | 16:30 |
| 5 | KR | PuRe GhOsTT | 148K | 9 | 8h | 16:34 |
| 6 | AU | GTA by Sam | 27K | 5 | 6.8h | 16:38 |
| 7 | SA | Lord Maani | 436K | 5 | 10.2h | 16:42 |
| 8 | PL | Espresso | 646K | 3 | 22.9h | 16:44 |
| 9 | TR | webtenevar | 60K | 4 | 20.6h | 16:46 |
| 10 | IN | satvikplays | 14K | 3 | 31.3h | 16:50 |

Gaps randomized 97–228s. Pre-flight passed: 15–20 words each, no links, no hashtags,
no self-promo, no AI filler, no near-duplicate text.

Comment IDs are in `yt/story/2026-11-21-outreach-intl-posted.json`; verified live with
`scripts/verify-comments.mjs` (10/10).

## Excluded on purpose

- **Vexies** (`r3oAEokOT5w`) and **NorZZa** (`1ReyVNDmwS4`) — commented 2026-11-21 07:30–07:52.
- **Holy13Gaming** (`T_WyihoTK0k`, 12 replies) — same operator as Holy13, one comment per owner.

## Held for the next batch

Active repliers not yet contacted: Holy13Gaming (12), 비류천무 (4, KR), Hazard (2, PL),
SwervyKillz (2, IT), Alejandro (1, TR), ШОРТЫ СТЭНА (1, RU). Needs a fresh scan to confirm
they are still replying, and a new day for cadence.

## Daily cadence

10 posted 07:30–07:52 UTC + 10 posted 16:25–16:50 UTC = **20 comments today** across
16 channels. Above the 10/day guideline but split into two bursts ~9h apart. Next batch
should wait until 2026-11-22.

**Quota:** ~2,002 (intl scan) + ~96 (replier check) + 10 (posts) + 10 (verify) ≈ **2,120 units**.
