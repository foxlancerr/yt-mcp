# scripts/ — what is here and what it is for

Every script here talks to the channel's own OAuth tokens (`src/config/tokens.json` +
`~/.config/youtube-studio-mcp/tokens.json`). Nothing here uploads or publishes on its own.
Audit of 2026-11-21 removed 18 one-shot scripts; the survivors are the ones that can be run
again on a new video, a new idea or a new month.

## Research — what is working right now

| Script | Cost | Use |
|---|---|---|
| `trend-scan.mjs "<query>" [days] [n]` | ~102/query | Keyword medians, outliers, Shorts share. Stage 1 of `story-pipeline`. |
| `tag-scan.mjs "<query>" [days]` | ~104 | Real tags/hashtags from top videos + Shorts. |
| `competitor-snapshot.mjs` | ~25 | Refreshes the cluster data in AGENTS.md §3. |
| `channel-uploads.mjs <handle> [n]` | ~5 | Resolve a handle, list recent uploads with views and view/sub ratio. |

## Sourcing — footage we are allowed to use

| Script | Cost | Use |
|---|---|---|
| `cc-search.mjs "<query>"` | ~100 | Find CC BY licensed sources for a query. |
| `cc-viral-scan.mjs <days> "<q>"...` | ~100/query | Recent high-view CC BY videos only. |
| `cc-video-info.mjs <id>...` | ~1/video | Re-verify `status.license` before cutting. |

## Channel state — read-only audits

| Script | Use |
|---|---|
| `channel-audit.mjs` | Branding, every upload, engagement, playlists, sections. Writes a report. |
| `channel-status.mjs` | Identity, stats, scheduled queue, 7-day pulse. |
| `channel-schedule-analytics.mjs` | `publishAt` queue + 28-day traffic and retention. |
| `audit-video.mjs <id>` | One video: snippet, status, localizations, playlist membership. |
| `comment-audit.mjs` | Which uploads have comments (cheapest possible read). |
| `playlist-audit.mjs <playlistId>` | Full playlist dump, used before any description rewrite. |
| `dump-metadata.mjs` | Offline metadata dump for planning edits. |
| `video-boost-check.mjs <id>` | Pre/post publish analytics for one video. |

## Outreach

| Script | Cost | Use |
|---|---|---|
| `outreach-targets-v2.mjs [hours]` | ~800 | Tier-1/2 biased target pool, 8 English queries. |
| `outreach-intl.mjs [hours]` | ~2,000 | 20 countries, local language, 20 queries. |
| `outreach-replier-check.mjs` | ~96 | **Scores which creators actually reply** in their own comments. Run before drafting. |
| `outreach-video-details.mjs <id>...` | ~3 | Read-only title/channel/country/subs/views/description head. |
| `post-outreach.mjs <drafts.json> [--post]` | 1/comment | The only poster. Pre-flight + cross-batch history block. |
| `check-replies.mjs` | ~1/thread | Find replies to our comments so we can answer them. |
| `verify-comments.mjs [posted.json]` | 1/comment | Confirms posted comments are still live. |

`post-outreach.mjs` refuses to send when: over 20 words, under 5 words, contains a link,
hashtag or self-promo, AI filler ("thanks", "great video"), near-duplicate of another draft
(>55% word overlap), **already posted on that video or near-duplicate of any earlier post**
(>60% overlap across every `yt/story/*.json`), more than 10 per run.

Recommended order: `outreach-intl.mjs` → `outreach-replier-check.mjs` → drafts JSON →
`post-outreach.mjs` (dry run) → user approval → `post-outreach.mjs --post` →
`verify-comments.mjs` → next morning `check-replies.mjs`.

## Harness

| File | Use |
|---|---|
| `yt-mcp.ps1 [auth]` | Runs `youtube-studio-mcp` with OAuth paths preset. |
| `banner.js` | Build step: prepends the CLI shebang to `dist/index.js`. |

## Removed on 2026-11-21 (recoverable from git history)

Date-stamped batches that already ran — `post-outreach-2026-11-19.mjs`,
`post-outreach-2026-11-21.mjs`, `post-tier1-outreach-7.mjs`, `post-self-comments-10.mjs`,
`post-pinned-comments.mjs`, `post-channel-comments.mjs` + its two batch JSONs.

Applied one-offs hardcoded to November state — `metadata-refresh.mjs`,
`catalog-boost-apply.mjs`, `gta6-playlist-seo.mjs`, `gta6-playlist-titles.mjs`,
`verify-playlist-seo.mjs`, `verify-playlist-titles.mjs`, `video-boost-apply.mjs`,
`catalog-audit.mjs`.

Duplicates and scaffolding — `post-comments.mjs` (merged into `post-outreach.mjs`),
`outreach-targets-countries.mjs` (a third target finder), `dbg-comments.mjs`.

Old reports in `yt/story/*.md` still name some of these; they are historical records of
batches, not live instructions.
