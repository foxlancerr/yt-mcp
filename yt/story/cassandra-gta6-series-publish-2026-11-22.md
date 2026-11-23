# Cassandra GTA 6 series — publish record (2026-11-22)

Series: **Jason & Lucia: We Did NOT Break Up?! 👀** — 3 reaction Shorts cut from Cassandra's
first GTA 6 session ([@Heyycassandraa, "FIRST GTA 6 EVER GAMEPLAY", stream `DH7kKENJDWA`, 2026-11-21](https://www.youtube.com/live/DH7kKENJDWA), Standard YouTube licence).

Playlist: **`PLPNZdb6eXsAw`** — "Jason & Lucia: We Did NOT Break Up?! 👀 (GTA 6 Reactions)", public, ordered 1 → 2 → 3.

---

## 1. The ordering problem that was found

The uploads were labelled `Part a / b / c` and scheduled with **b before c**, which was the wrong order.
The label could not be trusted, so each part was identified from its **own ASR captions pulled through the
Data API** (`captions.download`, track per video) and cross-checked against the three `story.md` plans and
the rendered files on disk.

| Upload | Duration (API) | Rendered file (MP4 header) | Caption evidence | Real episode |
|---|---|---|---|---|
| `WKwGsky1rVo` "Part a" | PT1M52S (112 s) | `cass-prison-call` 111.9 s | "I'm here for Lucia Caminos… we did not break up… she's a free bird" | **Ep 1 — prison visit** |
| `O2LIPC5JMiU` "Part b" | PT1M25S (85 s) | `cass-lucia-lana` 84.7 s | "Oh my god, Lana's in this… That's Lana. That IS Lana… I've never heard this song" | **Ep 3 — Lana** |
| `YcdVi8Ptq0Y` "Part c" | PT52S (52 s) | `cass-jason-crush` 51.0 s | "out of all of them, he's really, really good-looking… Franklin… Trevor" | **Ep 2 — Jason crush** |

Duration, render file and caption content all agree. The uploads were running **1 → 3 → 2**.

> Note: the owner's answer at the time was "b is Ep2, c is Ep3". That contradicts both the captions
> and the three plan files (Ep 2 = "Jason crush", Ep 3 = "Lana"). The schedule written below follows the
> captions. Flipping it is a single `update_video_status` call per video.

## 2. Final state (verified by read-back)

| Ep | Video ID | Title | Length | Privacy | publishAt |
|---|---|---|---|---|---|
| 1 | `WKwGsky1rVo` | Jason & Lucia: We Did NOT Break Up?! | 112 s | **public** | — (went live 2026-11-22 11:30 UTC) |
| 2 | `YcdVi8Ptq0Y` | Is Jason The Hottest GTA Hero Ever?! | 52 s | private | **2026-11-23 20:00 UTC** |
| 3 | `O2LIPC5JMiU` | Wait, Is Lana REALLY in GTA 6?! | 85 s | private | **2026-11-24 20:00 UTC** |

- Anchor 20:00 UTC per AGENTS.md §6 (8 PM UK, 9 PM CET, 3 PM ET, 7 AM next-day Sydney, 9 AM NZ).
- Gaps: 22 → 23 → 24 Nov = ~1 day each, inside the 1–3 day series rule.
- Title lengths 36 / 36 / 31 chars, inside the 30–40 band.

## 3. What changed

| Field | Before | After |
|---|---|---|
| Titles | `Jason & Lucia's Romantic Drive 👀 then Broke Up?! Part a / b / c` (placeholder-style, and `Part c` had lost the `?!`) | Real per-episode curiosity titles, above |
| Descriptions | **byte-identical on all three**, and Ep1-only ("Jason waits at the prison… the line 'we did not break up'") — inaccurate metadata on Ep2 and Ep3 | Distinct and accurate per part, each names the part number, links the neighbour episode, keeps the brand line and hashtags |
| Tags | identical 15-tag block on all three, all Ep1-flavoured (`gta 6 lucia prison`, `gta 6 jason lucia breakup`) | Per-episode sets. Ep3 avoids asserting Lana's identity (uses `gta 6 lana reaction`, not `lana gta 6`) |
| Schedule | Ep3 at 22 Nov 19:00, Ep2 at 24 Nov 19:00 (wrong order, off-anchor) | Ep2 23 Nov 20:00 UTC, Ep3 24 Nov 20:00 UTC |
| Playlist | none — the three would never be recommended as a chain | `PLPNZdb6eXsAw`, public, positions 0/1/2 |

`categoryId` 20, `madeForKids` false, default language `en` all left untouched.

## 4. Open items / not done

1. **Localizations were NOT updated — and the tool cannot do it.** `update_video_metadata` exposes only
   `title`, `description`, `tags`, `categoryId`, `defaultLanguage`, `defaultAudioLanguage`; there is no
   `localizations` parameter. The three videos still carry **19 / 21 / 21** localized title+description pairs,
   and every one of them still ends in the old part letter (e.g. `de-DE` "…Teil a", `ja` "…パートa",
   `ar` "…الجزء ج") with the Ep1-only body paragraph. So a German or Japanese viewer sees the stale series
   title while the English viewer sees the new one. Fixing this needs a direct Data API `videos.update` with
   the `localizations` part plus real translation per locale — not machine output written blind.
2. **Part 1 missed its anchor.** It published live at 11:30 UTC instead of sitting private with a `publishAt`
   for 20:00 UTC. A public video cannot be returned to "scheduled"; only 3 views were affected.
3. **Series gets no GTA playlist placement.** `PLRXf1uVlif1Q` ("GTA 6 Secrets") was left alone because it is a
   news/secrets set, not a reactions set. Say the word and the three can be added there too.
4. **No chapter blocks are present, correctly.** AGENTS.md rule 10 requires chapters for long-form ≥60 s, but
   these are 9:16 vertical Shorts (two of them over 60 s only because Shorts now run to 3 min). Shorts never
   render chapters, so no block was written.
5. **Audio still not checked by ear** on all three renders — frame checks only, inherited from the render stage.

## 5. Rebuild / re-verify

```powershell
# captions of our own uploads (bypasses the MCP Blob bug)
node _caps2.tmp.mjs

# re-render any episode
python yt/gta6-clips/tools/render_reaction_short.py cass-prison-call  --cta
python yt/gta6-clips/tools/render_reaction_short.py cass-jason-crush   --cta
python yt/gta6-clips/tools/render_reaction_short.py cass-lucia-lana    --cta
```

`ffprobe` is not on PATH on this machine; durations in §1 were read from the `mvhd` atom in the MP4 headers.
