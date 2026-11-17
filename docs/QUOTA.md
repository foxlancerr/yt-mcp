# YouTube API Quota

The YouTube Data API has a default quota of **10,000 units per day** per Google Cloud project. Operations cost varying amounts of units.

## Quota cost reference

| Operation | Cost | Notes |
|-----------|-----:|-------|
| `videos.list`, `channels.list`, `playlistItems.list`, `commentThreads.list`, `comments.list`, `playlists.list`, `channelSections.list`, `captions.list` | 1 | Cheap reads. |
| `playlistItems.insert`, `playlists.insert`, `playlists.update` | 50 | |
| `videos.update`, `videos.delete` | 50 | |
| `comments.insert`, `comments.update`, `comments.delete`, `comments.setModerationStatus`, `comments.markAsSpam` | 50 each | |
| `thumbnails.set` | 50 | |
| `captions.insert`, `captions.update`, `captions.delete` | 400 | |
| `captions.download` | 200 | |
| **`videos.insert` (upload)** | **1600** | Most expensive. ~6 uploads/day on default quota. |
| `search.list` | 100 | Not used by this MCP. |

The Analytics API has a separate quota with similar daily caps; queries are typically cheap.

## Quick math

- Listing 100 comment threads daily: 1 unit/day. Plenty of room.
- Replying to 50 comments: 50 × 50 = 2,500 units. Stays within budget.
- Uploading 5 videos: 5 × 1,600 = 8,000 units. Use most of the daily quota.

## Requesting more quota

1. In Google Cloud Console, go to **APIs & Services → Quotas**.
2. Filter by **youtube.googleapis.com**.
3. Select the quota line and click **Edit quotas**.
4. Submit a request describing your use case (e.g. "Personal channel management via MCP server").

Approvals are typically reviewed within a few business days.

## Tips

- Cache results client-side when iterating.
- Prefer batch reads (e.g. `videos.list` with multiple IDs) over per-item calls.
- Don't poll comments aggressively — Google may flag the project for abuse.
