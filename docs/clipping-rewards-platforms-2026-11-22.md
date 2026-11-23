# Clipping rewards: platforms, payout maths and the GTA 6 board

**Read date:** 2026-11-22 (all figures are a snapshot, not live).
**Scope:** the campaign you sent (`contentrewards.com/c/campaigns/a5c63fad…`, the $12,500 LACY pool),
every platform that pays for clips, and what a clip has to do to actually get paid.
**Feeds:** `.agents/skills/viral-moment-engine/references/paid-campaigns.md` (the operating layer)
and `campaigns/gta6-board-2026-11-22.json` (machine-readable rules).

> Every number below came from the page named next to it, read on 2026-11-22. Campaign budgets
> drain hourly and rates get edited. Re-read the campaign page before cutting anything.

---

## 1. The campaign you sent, decoded

| Field | Value | Source |
|---|---|---|
| Name | $12,500 LACY GTA VI Marathon Pool Campaign | Reach rules page |
| Run by | Reach, "powered by LACY" | reachclipping.com/LACYGTA |
| Model | **Pool** — no per-view rate, split by share of views at the end | Reach rules |
| Minimum to qualify | **750,000 approved views** (Content Rewards' own article says 1,000,000 — they disagree; treat 1M as the safe number) | Reach page vs CR article |
| Platforms | TikTok, Instagram Reels, YouTube Shorts, X | Reach rules |
| Source footage | Lacy's GTA marathon streams from 18 Nov 2026 onward | Reach rules |
| Hard caption rules | must name LACY **and** use `#LACY` | Reach rules |
| Audience rule | **≥50% native English-speaking** (US, CA, AU, UK, NZ) | Reach rules |
| Other bans | logos, hate-farming, botting, collab posts, mismatched thumbnails, non-matching captions | Reach rules |
| Submit window | within **30 minutes** of posting | Reach rules |
| Live pool state | 5,965 approved clips · 2,428 clippers · ~89.4M views | CR article, 22 Nov 00:00 PT |

### The number nobody puts in the headline

$12,500 ÷ 89.4M views = **$0.14 per 1,000 views** — before the platform fee, which Reach's own
documentation says comes out of the headline pool.

Then apply the floor. If you scraped together exactly the 750K minimum and the pool closed at
~90M qualifying views, your share is 0.83% → about **$104**. At 1M views you'd take roughly **$140**.

For 750,000–1,000,000 views. Read that again.

The pools are not scams — they are *lotteries with a work requirement*. A pool pays the same
$12,500 whether the crowd delivers 20M or 120M views, so your rate falls every time another
clipper joins. Lacy's pool went from 18.9M views (18 Nov) to 89.4M (22 Nov) in four days.
Your share of a fixed pot is being diluted in real time.

**Verdict: do not chase this pool.** Not because it is unfair, but because the maths needs
~1M views to return ~$140, and a channel with no audience will not produce that.

### Effective CPM of every open GTA 6 pool

| Pool | Pot | Views to date | Effective $/1K | Floor to qualify |
|---|---:|---:|---:|---|
| Lacy (Reach) | $12,500 | 89.4M | **$0.14** | 750K–1M |
| Kai Cenat (Clipped & Shipped) | $10,000 | 38.9M | **$0.26** | 750K |
| Clix (Reach) | $5,000 | 10.6M | **$0.47** | 400K |
| YourRAGE (Reach) | $5,000 | — | — | 500K |

Against $1.00–$2.00 per 1,000 on per-view campaigns. A pool needs a **3–14× better** view count
just to break even, and it pays nothing at all below the floor.

---

## 2. The payout maths that should drive the edit

Every per-view campaign pays:

```
payout = 0 if views < minimum
payout = min( cap , views / 1000 × rate )      otherwise
then × 0.90 (Content Rewards creator fee)
```

Two consequences most clippers miss:

1. **The floor decides whether the clip was worth making, not the view count.** RUCKUS pays from
   10,000 views on one post. A 9,000-view clip — a *good* clip by normal standards — earns $0.
   A 10,100-view clip earns $20.
2. **The cap makes volume beat virality.** At a $150 cap and $2.00/1K, one clip maxes out at
   75,000 views. Ten clips at 75K views pay $1,500; one clip at 750,000 views pays $150.
   Content Rewards also forbids submitting the same finished clip to two campaigns — so re-cut
   with a new hook, don't repost.

### What the same 50,000 views are worth

| Campaign | Rate | Cap | Take-home at 50K views |
|---|---:|---:|---:|
| Ruckus (dasgasd3m) | $2.00 | $150 | **$90** |
| BrettLiftsXP | $2.00 | — | ~$90 |
| Lauren Hamden | $1.50 | $250 | **$67.50** |
| Dylan Page | $1.20 | $250 | **$54** |
| Bobby Van Riper | $1.50 | $150 | **$67.50** |
| BenDaDonnn × Puffco | $1.00 | — | **$45** |
| Gattouz0 | $0.35 | — | **$15.75** |
| Tokyo Girl (music) | $0.70 | $35 | **$31.50** (capped) |
| Lacy pool | — | — | **~$7.80** (share of pool) |

That table is the whole strategy. Rate and cap are the product; the clip is the input.

---

## 3. The GTA 6 board, 22 Nov 2026

53 live campaigns mention GTA 6; **51 still paying**, ~$143K left, typical $1.00/1K, top $3.00.
Only 19 are streamer-clipping campaigns — the rest are music (26) and logo (3) briefs, which want
*edits*, not streamer moments. Mixing those up wastes a clip.

### Worth cutting, ranked for a small account

| Campaign | Rate | Cap / floor | Platforms | Budget left | Why |
|---|---:|---|---|---|---|
| **BenDaDonnn × Puffco** | $1.00 | — | FB, IG, TikTok, X, YT | **$9.8K of $10K** | Biggest untouched budget, 5 platforms, 90+ days |
| **Ruckus — dasgasd3m** | **$2.00** | $150 / $20 min (10K views) | TikTok, YT | $906 | Highest real rate on a clipping brief; ends 19 Dec |
| **Dylan Page** | $1.20 | $250 / $4 | IG, TikTok, YT, X | **$5K of $5K** | Untouched; must show Dylan + `#DylanPage` |
| **Pilat** | $1.00 | — | IG, TikTok, X, YT | **$2.5K of $2.5K** | Untouched |
| **Boeshi** | $1.00 | $300 | IG, TikTok, YT | $1.7K of $1.75K | Untouched, 90+ days |
| **AsianJeff** | $1.00 | $300 / $10 | IG, TikTok, YT, X | $1.9K of $2.5K | 6 days left — urgency |
| **BrettLiftsXP** | **$2.00** | — | IG, TikTok, YT | $825 | High rate, small pot |
| **Lucky Latvian** | **$2.00** | — | IG, TikTok, X, YT | $668 | High rate, 2 days left |
| **Bobby Van Riper** | $1.50 | $150 | IG, TikTok, YT | $964 | 90+ days |
| **Lauren Hamden** | $1.50 | $250 / $15 | IG, TikTok only | $3.4K of $5K | Needs a dedicated account |
| KreekCraft | $0.50 | $500 / $5 | IG, TikTok, YT | $3.2K of $6.8K | Must show his stream overlay |
| Gattouz0 | $0.35 | — | IG, TikTok, X | $9.7K | Huge pot, low rate — volume play only |
| ClipUp (logo) | $0.30 | — | IG, TikTok, YT | $15K | Logo brief, not a moment brief |

**Skip:** Jamieson ($3.00 headline but only $908 left and it's a music brief), the Clipster music
campaigns unless you can cut to the beat, and all four pools.

### The universal rejection list

A clip is rejected — and earns nothing — for any one of these:

- under the campaign's floor views
- posted on an app the brief does not list
- missing the required name or hashtag (`#LACY`, `#Clix`, `#DylanPage`, `#dasgasdom3`)
- the streamer is not in the actual edit, only in the intro
- AI-generated video (Reach: **one strike and you are out of every Reach campaign, permanently**)
- bot views, collab posts, reposts (permanent ban)
- AI voiceover or translated subtitles (RUCKUS)
- leaked or pre-18-Nov footage, Rockstar trailers, screenshots or art (RUCKUS)
- isolated cutscenes, story endings (Rockstar's own policy — takedown)
- glitches, cheats, money exploits (Rockstar policy)
- a false or negative narrative about the streamer
- logos on screen (Lacy)
- a caption missing the ad disclosure
- submitted more than 30 minutes after posting
- the account's audience is in a different niche (Lacy: a bird-watching profile posting LACY clips)

Notice how much of that list is **paperwork, not editing**. Most non-payers fail a rule, not a hook.

### What a paying clip actually looks like

Distilled from the briefs plus ClipCPM's board:

- **9:16 vertical**, captions burned in, facecam visible above gameplay
- **streamer on screen the whole time**, not just the intro card
- **original stream audio**, his words kept intact — never cut so he says the opposite
- **his name in the first two words** of the caption and the on-screen hook
- **required hashtag** in the caption
- 20–45s, opening on the strangest second
- ad disclosure at the start
- posted from an account whose feed is *only* that niche

The most-viewed GTA clip on any live campaign was 21.5M views: *"DID HE JUST CRACK LACY??"* —
a creator name plus a jaw-drop. Not a keyword, not an emotion word.

---

## 4. Every platform, and whether it is worth your time

Ranked by whether it can pay a small account for GTA 6 clips today.

| Platform | Model | Fee | Payout | GTA 6 today? | Verdict |
|---|---|---|---|---|---|
| **Content Rewards** (inside Whop) | CPM + pool + per-post + retainer | 10% creator fee (7% on some older) | 7-day earning + 3-day hold, ~10-day rounds; $1 min to balance | **Yes — 17 of 19 streamer campaigns** | **Primary.** Only place with this much choice; brand reviews every clip |
| **Clipster** | CPM | 5% on withdrawal | balance after campaign ends, $50 min | Yes — mostly music/edits briefs | **Secondary.** Use for beat-cut GTA edits, not streamer moments |
| **Reach** (reachclipping.com) | CPM + pools, runs campaigns *on* Content Rewards | via CR | via CR | Yes — Lacy, Clix, YourRAGE, AsianJeff, Pilat, Lauren | Read the rules page, join on CR |
| **ClipLaunch** | CPM, on CR | via CR | via CR | Yes — KreekCraft, Boeshi, Diego, Lauren | Join on CR |
| **Clipping Nation** | CPM, on CR | via CR | via CR | Yes — Tomo, Bobby Van Riper | Join on CR |
| **ClipCPM** (clipcpm.com) | **Aggregator, not a payer** | none | none | Tracks 8 platforms, ~53 GTA 6 campaigns | **Use daily** — best board in the market; CSV export |
| **GTA CPM** (gtacpm.com) | Aggregator | none | none | GTA-only board + calculator | Use for rate checks |
| **Clipstake** | CPM, crypto rails | ~20% | Net-7 | 1 logo campaign ($0.20/1K) | Weak for GTA |
| **Ssemble Clip Rewards** | CPM inside an editor | — | — | "GTA 6 Normal Life" $1.00/1K, $200 pot | Tiny; ignore |
| **Vyro** | CPM | not published | 7–10 days after campaign ends, $10 min | Rarely GTA | 5,000-view floor per post; no payouts in RU/BY/UA/NG |
| **Clipping.io** | CPM | — | per-clip caps | Occasionally | Capped-risk tests only |
| **ClipFarm** (Airrack) | CPM via Whop | via Whop | via Whop | Mixed | Community, not an edge |
| **Klippify** | CPM | — | Stripe | Sometimes | Small board |
| **Reach.cat** | CPM, crypto | 10% | Net-7, no KYC | Occasionally | Different company from Reach |
| **Promote.fun** | CPM, crypto (Solana) | 12% | Net-7 | Rare | Sports/music leaning |
| **Clipster / Clipping.net / ClipHaven / Findclout / ClipAffiliates** | CPM marketplaces | 9–25% | varies | sporadic | Clipping.net charges 25% — check before joining |
| **Try Shoot / Elev8or / Navo UGC** | CPM marketplaces | 0–7% | 72h / $5–$10 min | Little GTA | Worth a look only if CR dries up |
| **Fiverr / Upwork / Kreatli** | **Fixed pay per edit** | 20% / 0–15% | on delivery | n/a | Pays for the edit, not the views. Real option at 0 followers |

### Read the "best platform" lists with suspicion

Nearly every ranking article I read is written by a platform that ranks itself first — Try Shoot
puts Try Shoot at #1, Kreatli puts Kreatli first, Growthr puts Clipper first. The neutral sources
are the **aggregators** (ClipCPM, Clipping Atlas, Clipping Collective, ClipClap), because they run
no campaigns. Where the vendor lists disagree, trust the aggregator that shows its read date.

Also note the contradiction in the market itself: Clipping Atlas reports a $3.60 average CPM for
Whop while Content Rewards reports its own median as $1.00. Averages across a board full of
leftover campaigns are not your rate. Use the campaign page.

---

## 5. The honest read for this channel

Facts, not discouragement:

- The Untold Exit has ~0 subscribers and ~57 lifetime views.
- A campaign clip pays nothing until it clears 10,000 views on a single post (RUCKUS) or ~$2
  (Tokyo Girl). That is a **higher bar than any video on your channel has ever hit.**
- Campaign rules also require the account's audience to match the niche, and Reach explicitly
  recommends a *dedicated* account (`LACYClips`, `LACYDaily`). Posting LACY clips to a mystery
  channel breaks the rule and dilutes the brand you just locked.

So the correct configuration is **two lanes, not one**:

| Lane | Account | Goal | Skill |
|---|---|---|---|
| Brand | The Untold Exit | P1–P6, search traffic, monetisation later | `story-pipeline` |
| Rewards | a fresh niche account per streamer | clear the floor, get paid | `viral-moment-engine` campaign mode |

Do not merge them. A clip that earns $18 on a campaign account and a mystery Short on the brand
account are not the same product, and each one hurts the other's targeting.

And the timing truth: launch week is when these campaigns and their views exist. $143K across 53
GTA 6 campaigns on 22 Nov, and the Clipster music budgets are already 90%+ spent. This is a
window measured in weeks, not a permanent income.

---

## 6. Sources

Read 2026-11-22:

- `contentrewards.com/c/campaigns/a5c63fad-cd53-4b81-9305-4a2d1696872a` (title only — the page body
  is client-rendered and shows a skeleton without a session)
- `reachclipping.com/LACYGTA` — the Lacy rules page, full text
- `contentrewards.com/articles/gta-6-clipping` — 13 campaigns, pool stats, Rockstar policy summary
- `contentrewards.com/articles/get-paid-clip-streamers`, `…/how-much-do-clippers-make`,
  `…/how-much-does-content-rewards-pay`, `…/clipping-pool-campaigns`, `…/whop-clipping-alternatives`
- `clipcpm.com/gta-6` — the 53-campaign board, budgets left, briefs, read 22 Nov 04:07 ET
- `docs.google.com/document/d/16y5Pv5OltUMG7HSLhiZBBHUBAUggd2Gd4gmikazoGnU` — RUCKUS dasgasd3m brief
- `gta6clippers.com/campaigns`, `gtaclipper.com/campaigns`, `oakgen.ai/blog/gta-6-clipping-campaigns` —
  cross-checks on rates, floors and the Lacy 750K/1M discrepancy
- `clippingatlas.xyz/best-clipping-platforms`, `clippingatlas.com/blog/best-clipping-platforms`,
  `growthr.com/resources/best-clipping-platforms`, `clipclap.io/clipping-rates`,
  `clippingcollective.com/guides/clipping-campaign-data-2026`,
  `marketplace.kreatli.com/guides/best-clipping-platforms`, `tryshoot.com/best-clipping-platforms`,
  `onmainstage.com/blog/best-clipping-platforms`, `darebay.com/en/earnings/best-clipping-platforms` —
  platform comparison (several are vendor-owned; see §4)
- `clypse.ai/blog/gta-6-clipping`, `clipspeed.ai/blog/gta-6-clipping.html`,
  `capsai.co/blogs/gta-6-clipping-campaign`, `gtasixclipping.com/how-to/gta-6-clipping-campaigns`
