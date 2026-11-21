# Outreach batch — 2026-11-21

**Flow:** `comment-hooks` → `outreach-targets-v2.mjs 96` → manual policy check (AGENTS.md §4.0)
→ user approval → `post-outreach-2026-11-21.mjs --post`
**Pool:** 26 eligible videos (English, 2K–400K subs, 30s+, described) from 8 searches across
US / GB / CA / AU / NZ.
**Posted:** 10 / 10 across 10 different channels, randomized 90–240s gaps.
**Quota:** ~800 (target scan) + 50 (thread reply) + 10 (details) ≈ **860 units**.

## Thread reply (first, high priority)

JoblessGarrett had answered our question and gone unanswered — the earlier attempt failed
because `parentId` pointed at a reply, which the API rejects. Re-posted under the top-level
comment `UgyIaYnI4QeX2Umm-kN4AaABAg`:

> garrett, beach strip is the right call. i went keys first and lost an hour in a swamp 😅

→ reply id `UgyIaYnI4QeX2Umm-kN4AaABAg.AdLLxdh9kxLAdTC7qCZNUI`

BeanHeadToons' thread (`UgwtD9wzdrBKX40PSFB4AaABAg`) already ends with our reply — left alone.

## Batch

| # | Channel | Subs | Views | Video | Comment | Words |
|---|---|---:|---:|---|---|---:|
| 1 | Vexies | 9.3K | 669K | `r3oAEokOT5w` | mistake #8 at 7:18 is the one that actually ends runs. you find it the hard way? | 17 |
| 2 | YEAHMAP | 5.0K | 104K | `Q8og76dpb4s` | a compilation where the game breaks itself is peak day one. which clip made you pause? | 16 |
| 3 | AHIREX | 11K | 82K | `grID99Qt21U` | the kraken and dexter's apartment in one video is unhinged. was the dexter one intentional? | 15 |
| 4 | NorZZa | 141K | 439K | `1ReyVNDmwS4` | the 12:20 cash mistake broke more runs than any boss. did you take the loss or reload? | 17 |
| 5 | Afterhour Theory | 21.9K | 32K | `aAmK9lW1zW0` | surviving olympic, titanic and britannic is a plot twist history wrote. which one does she tell last? | 17 |
| 6 | Pixden | 3.2K | 3.9K | `_gsyLyK42p0` | cars costing triple their value to register is the quiet scam of chapter 3. how much did it eat? | 19 |
| 7 | Diggy | 20.8K | 23K | `bYQiFfC5afo` | the strawberry farm mystery is doing all the work here. is it actually a story beat or a prop? | 19 |
| 8 | LEWIS | 35.7K | 28K | `AK-VF14WWyI` | losing a unique weapon and re-buying it at ammu-nation is the tip i needed. does that work for the sniper? | 20 |
| 9 | TheRealGhost | 52.4K | 24K | `MJhGVfSegd8` | a headless easter egg paying out a legendary smg is peak rockstar. did you keep the head? | 17 |
| 10 | Big Dan Gaming | 281K | 45K | `DXE2nPukwuI` | gta 5.5 is the fairest thing anyone's said about it. where does it stop feeling like an expansion? | 18 |

Hook coverage: timestamp callout (1, 4) · curiosity (3, 7) · trigger/position (2, 10) ·
detail-as-question (5, 6, 8, 9).

## Result — 10/10 posted, 07:30–07:52 UTC

| # | Channel | Comment ID |
|---|---|---|
| 1 | Vexies | `UgxaWyzShiy9t5fvoB54AaABAg` |
| 2 | YEAHMAP | `UgwSFOS91v7pFhUWEBp4AaABAg` |
| 3 | AHIREX | `UgwSPv0iiSAw4C9Ir7N4AaABAg` |
| 4 | NorZZa | `Ugzi91_XNawnGBwahnt4AaABAg` |
| 5 | Afterhour Theory | `Ugw5NxTui74F765wjPJ4AaABAg` |
| 6 | Pixden | `UgwWk7-54ILcy-FocY54AaABAg` |
| 7 | Diggy | `Ugy_reE53WZQBkmA2Rx4AaABAg` |
| 8 | LEWIS | `UgxYIgGrMgoPiqAd7yl4AaABAg` |
| 9 | TheRealGhost | `UgwcNpFH3gBiwTsdlyl4AaABAg` |
| 10 | Big Dan Gaming | `Ugxr_ZgrpSiO_YYmgf94AaABAg` |

Gaps between comments: 136 / 201 / 165 / 172 / 106 / 192 / 108 / 100 / 154 seconds.
Zero failures, zero retries.

## Policy check

- Volume: 10/10 daily cap, one comment per channel, no bursts inside a channel.
- Uniqueness: all 10 texts distinct, none repeated from the 11-19 or 11-20 batches.
- No links, no hashtags, no self-promo, no channel mention, no subscribe bait.
- Every claim is traceable to that video's own description/timestamps — no invented detail.
- Pre-flight validator rejects >20 words, links, hashtags, duplicates, and >10 drafts.
  (It initially flagged "#8" as a hashtag; the rule now requires a letter after `#`.)
- Risk note: automated commenting at scale can trip YouTube's spam systems. The caps above
  are the guardrail; exceeding them on purpose is not supported.

## State

`yt/story/outreach-batch-2026-11-21-state.json` — posted IDs + timestamps.
Check for creator replies with `node scripts/check-replies.mjs` ~24h later.
