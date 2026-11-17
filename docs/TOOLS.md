# Tools Catalog

Total: **32 tools** across 5 areas. All tools authenticate as the channel owner and operate on your own channel/videos unless noted.

## Channel (3)

| Tool | Description |
|------|-------------|
| `get_my_channel` | Channel info: id, title, statistics, branding, uploads playlist ID. |
| `update_channel_branding` | Update channel description, keywords, country, default language, unsubscribed trailer. |
| `list_channel_sections` | List sections shown on your channel homepage. |

## Comments (7)

| Tool | Description |
|------|-------------|
| `list_comment_threads` | List top-level comment threads on a video or across the channel. Filter by moderation status. |
| `list_comment_replies` | List replies under a specific top-level comment. |
| `reply_to_comment` | Post a reply under a top-level comment. |
| `update_comment` | Edit your own comment. |
| `delete_comment` | Delete a comment you authored (or any comment on your videos as channel owner). |
| `moderate_comment` | Set moderation status (`heldForReview` / `published` / `rejected`). Optionally ban author. |
| `mark_comment_as_spam` | Flag comments as spam. |

## Playlists (4)

| Tool | Description |
|------|-------------|
| `list_my_playlists` | List playlists you own. |
| `create_playlist` | Create a new playlist (title, description, privacy, tags). |
| `update_playlist` | Update title / description / tags / privacy. |
| `manage_playlist_items` | Single tool for `add` / `remove` / `reorder` / `list` playlist items. |

## Analytics (7)

| Tool | Description |
|------|-------------|
| `get_channel_overview` | Aggregate metrics for a date range. Optional `includeRevenue`. |
| `get_top_videos` | Rank videos by metric (`views`, `estimatedMinutesWatched`, etc.). |
| `get_video_performance` | Per-video metrics including avg view duration, % watched, CTR, likes. |
| `get_audience_demographics` | Breakdown by age, gender, age+gender, or country. |
| `get_traffic_sources` | Where views come from (search, suggested, browse, external, ...). |
| `get_revenue_breakdown` | Ad / Premium / transactions revenue. Requires monetary scope. |
| `query_analytics_raw` | Escape hatch: arbitrary metrics + dimensions + filters + sort. |

## Videos (11)

| Tool | Description |
|------|-------------|
| `list_my_videos` | List videos uploaded by your channel. |
| `get_video_details` | Full info for up to 50 video IDs at once. |
| `update_video_metadata` | Title, description, tags, category, language. |
| `update_video_status` | Privacy, scheduled publish, made-for-kids, license, embeddable. |
| `set_video_thumbnail` | Upload a custom thumbnail from a local file or URL. |
| `delete_video` | Delete a video. Irreversible. |
| `upload_video` | Resumable upload from local path or HTTPS URL. Costs 1600 quota units. |
| `list_captions` | List caption tracks on a video. |
| `download_caption` | Download caption text (SRT/VTT/SBV), optionally translated. |
| `upload_caption` | Attach a new caption track from a file or string. |
| `set_localizations` | Set translated title/description per language. |

## Date ranges

Tools that take `dateRange` accept either a preset string or an explicit range:

- Presets: `last_7_days`, `last_14_days`, `last_28_days`, `last_30_days`, `last_90_days`, `last_365_days`
- Explicit: `YYYY-MM-DD..YYYY-MM-DD` (e.g. `2026-01-01..2026-01-31`)
