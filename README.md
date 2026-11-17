# youtube-studio-mcp

[![npm version](https://img.shields.io/npm/v/youtube-studio-mcp.svg)](https://www.npmjs.com/package/youtube-studio-mcp)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

An MCP server for **YouTube channel owners**. Manage comments, analytics, videos, and playlists from Claude, Cursor, Windsurf, Cline, or any MCP-compatible client.

> Unlike other YouTube MCP servers (which read public transcripts and metadata), `youtube-studio-mcp` authenticates as the channel owner and exposes write-side workflows: replying to comments, editing video metadata, querying Analytics, uploading videos, and more.

## What you can do

- **Comments** — list, reply, edit, delete, moderate, mark as spam (7 tools)
- **Analytics** — channel overview, top videos, audience demographics, traffic sources, revenue, raw query escape hatch (7 tools)
- **Videos** — list, get details, edit metadata/status, set thumbnail, delete, **upload (resumable)**, manage captions and localizations (11 tools)
- **Playlists** — list, create, update, add/remove/reorder items (4 tools)
- **Channel** — info, branding, sections (3 tools)

**32 tools total.**

## Install

```bash
npx youtube-studio-mcp
```

Or globally:

```bash
npm install -g youtube-studio-mcp
```

## Setup

You need a Google Cloud project with the YouTube Data API v3 and YouTube Analytics API enabled, plus a Desktop OAuth client. The full walkthrough is in [`docs/SETUP.md`](./docs/SETUP.md).

After downloading `client_secret.json`:

```bash
export YOUTUBE_OAUTH_CLIENT_PATH=/absolute/path/to/client_secret.json
npx youtube-studio-mcp auth
```

## Configure your MCP client

Add to your client config (Claude Desktop example):

```json
{
  "mcpServers": {
    "youtube-studio": {
      "command": "npx",
      "args": ["-y", "youtube-studio-mcp"],
      "env": {
        "YOUTUBE_OAUTH_CLIENT_PATH": "/absolute/path/to/client_secret.json"
      }
    }
  }
}
```

Set `ENABLE_MONETARY=true` if you also want revenue scopes (re-run `auth` after toggling).

Tested with Claude Desktop, Claude Code, Cursor, Windsurf, and Cline.

## Tools

See [`docs/TOOLS.md`](./docs/TOOLS.md) for the full tool catalog.

## Quota

The YouTube Data API has a default quota of **10,000 units per day**. Uploads cost 1,600 units each. See [`docs/QUOTA.md`](./docs/QUOTA.md) for the cost table and how to request more quota.

## Example workflows

```text
You: "Get my channel overview for last 30 days and the top 5 videos by watch time."
Claude → get_channel_overview + get_top_videos
```

```text
You: "List unmoderated comments on my latest 3 videos and suggest replies for the friendly ones."
Claude → list_my_videos + list_comment_threads + reply_to_comment
```

```text
You: "Upload /Users/me/render.mp4 as 'Episode 14', schedule it for next Friday at 18:00 UTC."
Claude → upload_video (privacyStatus=private, publishAt=...)
```

## Security

- Tokens are stored at `~/.config/youtube-studio-mcp/tokens.json` with `0600` permissions.
- `client_secret.json` is never read on every request — only on auth and on token refresh.
- The MCP runs locally over stdio; it never opens a network port for incoming connections.

## License

MIT
