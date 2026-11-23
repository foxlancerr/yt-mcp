# Paid campaign mode

Use this when a clip is being made for money — a clipping campaign, a brand brief, a bounty — instead
of for the channel. It changes the objective, and therefore changes the edit.

**Everything here is arithmetic or a written rule from a campaign page. Nothing is a prediction.**

---

## 1. When campaign mode is on

Turn it on when any of these is true:

- the user names a campaign, a platform or a rewards site
- the user asks "what pays", "which campaign", "how much would this earn"
- the clip will be posted somewhere other than the channel

Turn it off for normal channel content. A campaign clip and a brand Short are different products
with different success conditions.

Live board: `docs/clipping-rewards-platforms-2026-11-22.md`. Machine-readable rules:
`campaigns/gta6-board-2026-11-22.json`. Validate a plan with
`node scripts/clip-campaign-check.mjs <plan.json> <campaign-id>`.

---

## 2. Stage 0 — pick the campaign before the moment

Most clippers pick a moment, then look for somewhere to post it. That is backwards. The campaign
decides what a moment has to be.

Score every candidate campaign on:

| Signal | Why it matters |
|---|---|
| **Rate per 1,000** | the only number that multiplies views into money |
| **Floor** (minimum views, or minimum payout) | below it you earn literally $0 |
| **Cap per clip** | above it extra views are free work — cap ÷ rate × 1000 = the clip's ceiling |
| **Budget left ÷ budget** | money already spent is money you cannot win |
| **Model: per-view vs pool** | per-view pays per clip; pool pays a split at the end |
| **Required props** (name, hashtag, overlay, song) | cheap to satisfy, fatal to miss |
| **Deadline** | a 2-day brief needs clips today |

### Pool arithmetic, always run it
```
effective $/1K = pool ÷ current approved views × 1000
your floor share = floor ÷ current views × pool
```
If the effective rate is under a third of the best per-view campaign, refuse the pool and say so.
A $12,500 headline on 89M views is $0.14 per 1,000 — worse than a $0.35 CPM campaign, and it
pays nothing until a six-figure floor.

### Per-view arithmetic, always run it
```
payout      = 0                          if views < floor
payout      = min(cap, views/1000 × rate) otherwise
take_home   = payout × 0.90              (platform fee, if the campaign charges one)
views_to_cap = cap ÷ rate × 1000
```
Write `views_to_cap` into the plan. It tells you when to stop promoting a clip and cut a new one.

---

## 3. The objective is the floor, not the ceiling

Channel content optimises average view duration. A campaign clip optimises
**probability of clearing the floor**, because below it the work is unpaid.

So the first shot is not "the most interesting moment". It is:

> **the most obvious, most legible, most name-carrying second of the stream.**

Add this gate to the §3.2 score. It is pass/fail, not points:

- **Floor credibility:** would a stranger who does not know this streamer still watch past
  second three? If the only reason to watch is prior context, it cannot clear a 10K floor.

If it fails, pick a different moment — do not "improve" the edit.

---

## 4. What the edit must contain

Derived from published briefs, not invented:

| Element | Rule |
|---|---|
| Aspect | 9:16 vertical |
| Captions | burned in, readable, off the face |
| Streamer | on screen for the body of the clip, not only an intro card |
| Audio | the original stream audio; keep his words and his meaning |
| Name | in the first two words of the on-screen hook and the caption |
| Hashtag | the campaign's required tag, if it names one |
| Disclosure | a clear ad/paid label at the start |
| Length | 20–45s when the material supports it |
| Logos | none, unless the brief asks for one |
| Music | muted or replaced if the brief says so (in-game radio is licensed music) |

Never AI-voice a real person. Never generate a fake reaction. Never cut an answer to mean the
opposite of what was said.

---

## 5. Compliance gate — run it before rendering, not after

Check each line. One miss is a rejection and a rejection pays zero.

- [ ] source footage is the exact stream/channel and date window the brief allows
- [ ] the streamer appears in the body of the clip
- [ ] required name in hook and caption
- [ ] required hashtag present, spelled exactly
- [ ] every platform used is on the brief's list
- [ ] clip is above the floor by design, and you know the ceiling
- [ ] no leak, no pre-release build, no trailer/screenshot/art from the publisher
- [ ] no isolated cutscene or story ending
- [ ] no glitch, cheat or money exploit
- [ ] no AI-generated video, AI voiceover or translated subtitles where banned
- [ ] no logo, no watermark, no other creator's clip
- [ ] disclosure present
- [ ] submitted within the brief's window (30 minutes on most Content Rewards briefs)
- [ ] account's existing audience is in the same niche as the campaign

`node scripts/clip-campaign-check.mjs` enforces the mechanical half of this list from the rules JSON.

---

## 6. Account hygiene

Campaign rules police the *account*, not only the clip.

- A brand channel posting unrelated clips risks rejection for audience/niche mismatch, and damages
  the brand's own targeting. **Use a dedicated account per campaign or per streamer.**
- Name the account for the streamer (`<Name>Clips`, `<Name>Daily`); profile picture from the
  campaign's own artwork where allowed.
- Keep the feed single-subject. One off-niche post can void a clip.
- Audience geography can be a hard rule (some campaigns require ≥50% native-English audience).
  Check before choosing the account.

---

## 7. Volume and re-cuts

Because of the cap, the unit of work is a **clip**, not a stream.

- One VOD → 5–10 candidate moments → separate clips, each with its own hook.
- The same moment may be re-cut for a *different* campaign, with a new hook and new opening
  second. The **same finished clip must never be submitted twice** — that is a stated rejection.
- When a clip hits `views_to_cap`, stop pushing it and cut the next one.

---

## 8. Ops timeline (Content Rewards, as published)

| Step | Timing |
|---|---|
| Submit the post link | within 30 min of posting |
| Views counted | until 30 days after submission |
| Earning round | 7 days earning + 3-day hold, new round ~every 10 days |
| Balance → wallet | from $1, via Whop |

Post when the target audience is awake — the clip only earns while views accrue inside that window.

---

## 9. Output contract additions

Append these to the §4.4 card whenever campaign mode is on:

```
Campaign + platform:         Model (per-view / pool / per-post):
Rate · cap · floor:          Views to floor / views to cap:
Required name + hashtag:     Platforms allowed:
Take-home at floor / at cap / at realistic views:
Compliance gate:             PASS / FAIL — list every failed line
Account lane:                (dedicated campaign account, never the brand channel)
```

`realistic views` is a prediction and must be labelled as one. `take-home` is arithmetic.

---

## 10. Failure modes specific to paid clipping

- **Chasing the headline pot.** A $12,500 pool diluted across 89M views pays like a $0.14 campaign.
  Check effective rate, then decide.
- **Optimising the ceiling.** A 500K-view clip at a $150 cap earns the same as a 75K-view clip.
- **Ignoring the floor.** Below the minimum, a beautiful clip is $0. Volume that clears the floor
  beats a single banger.
- **Paperwork.** Missing hashtag, wrong app, late submission, no disclosure. Most losses live here.
- **Using the brand account.** Breaks niche rules and both audiences.
- **Treating the board as permanent.** Budgets drain hourly. Re-read the campaign page on the day.
- **Vendor rankings.** The sites that rank platforms usually rank themselves first. Prefer
  aggregators (ClipCPM, Clipping Atlas, Clipping Collective) that show a read date.
