# Metadata pass — 2026-11-20 (underperformers only)

Scope: videos that are not performing, ranked by YouTube Analytics (2026-10-01 → 2026-11-20)
rather than by guesswork. Applied through the existing engine
`scripts/metadata-refresh.mjs` (`--only <id> --apply`), so nothing outside this set
was touched. 9 videos · ~470 units.

## Why these nine

| Video | Views | Avg % viewed | Verdict |
|---|---:|---:|---|
| `9P6BnLRrDxM` | 5 | 8.9% | worst retention on the channel + no "Nvidia" in title |
| `BrM4EGZmS9A` | 1 | 10.5% | title had no subject at all; 28 stuffed tags |
| `KxOzYtPIsvk` | 7 | 12.3% | title sold a release date that has passed |
| `3g5WteLmvtc` | 7 | 20.3% | generic title, no "New York" hook |
| `RVyIvZ5S4cE` | 13 | 23.3% | "Spot the Millionaire" sold as a format, not a question |
| `NjwpwUcxo8Y` | 11 | 24.9% | "GTA6" unspaced breaks the search term; future tense now wrong |
| `vEraiuwOh2o` | 0 | — | grammar error in the title ("Never Finish") |
| `Q8n13DQlphU` | 0 | — | "3 Hidden Secrets" — no searchable topic |
| `Zr3VEAtCxD8` | 3 | — | typo "Monitized" + stray `."` |

Channel best for reference: `U88Lw5PzzZc` 57.6%, `e34mKHkfC4Y` 57.6%,
`0KUXSARfbVA` 99.5%, `lyN781QvfII` 441% (loop replay).

## Applied

| Video | Title before → after | Tags | Notes |
|---|---|---|---|
| `9P6BnLRrDxM` | HOT SPY STOLE OUR AI CHIP… THEN OUR CEO RESIGNED (Part 2) → **Spy Stole Our AI Chip… Then Our CEO Resigned (Nvidia Part 2)** | 11→12 | dropped "true story animation" / "tech documentary" — the body says the story is fictional |
| `BrM4EGZmS9A` | THEY'VE BEEN WATCHING US SINCE WE ARRIVED (Part 3) → **They've Been Watching Us \| 4,000 Years in the Past (Part 3)** | 28→13 | removed Messi, Ronaldo, MrBeast, ben azelart, "catch and cook", "last to leave" — stuffed lanes the channel does not publish |
| `KxOzYtPIsvk` | The INSANE Story Behind GTA 6's 13-Year Wait \| GTA 6 Release Date → **Why GTA 6 Took 13 Years \| Rockstar's Real Development Story** | 14→14 | body corrected "arrives November 19, 2026" → "arrived"; 11 chapters preserved |
| `3g5WteLmvtc` | 100 People vs 1 Giant Pizza \| Animated Food Challenge → **We Made the Biggest Pizza in New York for 100 People** | 11→11 | |
| `RVyIvZ5S4cE` | Spot the Millionaire. 3 Clues. \| Animated Guessing Challenge → **One of These 100 People Is a Millionaire \| 3 Clues** | 11→11 | new lead line carries the primary keyword |
| `NjwpwUcxo8Y` | Rockstar Won't Explain... Play Early GTA6? \| GTA 6 Release Time → **How Players Got GTA 6 18 Hours Early \| NZ Trick** | 15→15 | 6 chapters preserved |
| `vEraiuwOh2o` | Why You Keep Starting But Never Finish → **Why You Keep Starting but Never Finish Anything** | 14→14 | |
| `Q8n13DQlphU` | 3 Hidden Secrets That Save You Time → **3 Time Habits That Actually Save You Hours** | 12→12 | |
| `Zr3VEAtCxD8` | GTA 6 Channels Make Millions. One Flow Channel Monitized." → **GTA 6 Channels Make Millions. One Flow Channel Got Monetized.** | 15→13 | |

## Verification (read back from the API)

- 9/9 titles match the plan
- chapters preserved: `KxOzYtPIsvk` 11 · `NjwpwUcxo8Y` 6 · `Zr3VEAtCxD8` 8
- hashtags: 3–4 per video (limit 15, house target ≤4)
- tags: 11–15 per video
- legacy brand "OhBhai": 0
- titles: 42–61 chars (mobile truncation threshold ~60)

## Not touched, deliberately

| Video | Reason |
|---|---|
| `lgUnPMbWsYw` | public *upcoming live broadcast*, 0:00 duration, "Giveaway Gifts" with no giveaway — needs a delete/unlist decision, not a retitle |
| `JyBvL6ilRf8` | iShowSpeed content — real-person right-of-publicity question, not a metadata question |
| `sSoXsBdFyrg` | published 2026-11-19, no analytics yet — no data to act on |
| 15 scheduled videos | `privacyStatus: private` — never modified |

## Honest read

At 16 views for the best video, metadata is not the binding constraint — distribution is.
These changes fix real defects (typos, false tense, dead keyword lanes, unsearchable
titles), and search is this channel's #1 traffic source, so they are worth having.
But do not expect them to move view counts on their own; a video needs impressions
before a better title can convert any.
