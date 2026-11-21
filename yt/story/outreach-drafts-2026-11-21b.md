# Outreach drafts by country — 2026-11-21 (NOT POSTED)

**Flow:** `comment-hooks` → `scripts/outreach-targets-countries.mjs` (3 scans) → captions/descriptions read for every video → manual policy check (AGENTS.md §4.0) → **waiting for the user's yes**. Nothing has been posted.
**Result:** 12 drafts, 12 different channels, 8 countries (country = what each channel shows on its own page, via `channels.list`). The user asked for 20: the pool did not hold more. After the language, size and "already used" filters, only 12 small-to-mid English videos with a visible country were left across three scans.
**Quota:** about 3,500 units (3 scans of 14, 14 and 7 regions, plus 16 detail reads). Searches cannot be repeated cheaply today.

| # | Country | Channel | Subs | Video | Grounded in | Comment | Words |
|---|---|---|---:|---|---|---|---:|
| 1 | US | Six Star Gaming | 566 | `0jDDLRHYhtY` | 0:05 "clothes and hair stay wet after a swim" | jason's hair staying wet after the swim is the detail i didn't know i needed. how long does it last? | 20 |
| 2 | US | Schlayer | 33.4K | `2hFeCc5PJ6Y` | 0:36–0:40 "register the Emerus with Moses for $30,000" | registering the emerus with moses for $30k is the real cheat code. worth it over clone keys? | 17 |
| 3 | CA | Gangster Gaming | 1.2K | `KVhMk5o3x8c` | 0:13 "stay at home if you don't like talking to people", 0:33 "who was wrong?" | telling a stranger to stay home for saying what's up is wild. who threw the first shove? | 17 |
| 4 | CA | IVCRASHES | 11.9K | `NQwCR156bFE` | description: "which car took the least damage?" (no captions) | crash test #3: which car took the least damage? my money is on the truck. am i wrong? | 18 |
| 5 | GB | Zynxize | 409K | `GMZzFJsf844` | caption at 12:43 "alligator" | 12:43 the alligator never misses. which clip in this episode did you almost cut? | 14 |
| 6 | GB | GTA Intel | 9K | `GprmRMxusSs` | 0:09 bike keeps the bags you wear, a van holds four | van holds four bags, a bike only what you wear. which ride do you rob a bank in? | 18 |
| 7 | IN | The GTA Assassin | 350K | `IcQYzo0Gm1w` | 0:00–0:12 "26 now, GTA 5 at 13, GTA 7 after 13 years = 39" | you were 13 for gta 5. if gta 7 takes 13 more years, are you still playing at 39? | 19 |
| 8 | IN | Red parasite | 480K | `622WqCl9cP4` | description: military jet, "Can I escape the military chase?" (no captions) | stealing the jet is the easy part. how long did the army chase you after takeoff? | 16 |
| 9 | PK | ZERO FAME | 5.8K | `IeI9gjKU2o0` | description: P-996 Lazer, Mile Zero Air Station, 6 stars (no captions) | the p-996 lazer from mile zero air station sounds suicidal. how many stars before you got airborne? | 17 |
| 10 | NZ | Musty Sky | 151K | `JzANWBYklrA` | title: "Secret Decay Fix", "5-second focus exploit" | does the secret decay fix still work after strength hits max? asking before i spend a week grinding. | 18 |
| 11 | MY | RTeX | 91.6K | `3KxbNGoSfow` | description: "what happens when both sides are completely blocked?" | both sides blocked has to be the glitch of the year. did you try it in a van? | 18 |
| 12 | TR | NextGenPlayz | 88.4K | `HOlRTu5Jy9o` | title: stolen fighter jet, 6-star chase | 6 stars on a stolen jet is brutal. low altitude or max altitude to escape? | 15 |

Hook coverage: timestamp callout (5) · creator question (4, 8, 9, 10, 11) · trigger/position (3, 6) · personal curiosity (1, 7, 12) · cost/value debate (2).

## Policy check (`comment-hooks`, manual)

- **Volume:** the skill caps outreach at about 10 a day. The 2026-11-21 batch already posted 10 (07:30–07:52 UTC), so these should wait until 2026-11-22: 10 then, the last 2 on 2026-11-23, randomized 90–240s gaps, one comment per channel. Posting all 12 today is not supported by the skill.
- **Content rules:** every draft is 14–20 words, unique, no link, no hashtag, no channel mention, no self-promo, no emoji, no invented personal experience. Each references something in that video's captions, description or title (column "Grounded in").
- **Language:** English only. Portuguese, Spanish, Polish, French, German and Indonesian videos found in the scans were dropped.
- **Not verified:** whether any of these creators will reply (no one can promise that), and the claims in videos 4, 8, 9 and 12 beyond their descriptions, since those videos have no captions. Comments there only echo the creator's own stated premise.
- **Risk (per the skill, once per session):** automated or mass commenting can be flagged by YouTube's spam systems and can restrict the account's commenting. The cap and the one-per-channel rule exist for that reason.

## To post (after the user's yes)

Nothing runs yet. A posting script is not created. Once approved, it will copy `scripts/post-outreach-2026-11-21.mjs` with these 12 drafts, preview by default, and post only with `--post`.
