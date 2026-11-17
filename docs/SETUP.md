# Setup

This guide walks you through obtaining the Google OAuth credentials and authorizing `youtube-studio-mcp` against your YouTube channel.

## 1. Create a Google Cloud project

1. Open the [Google Cloud Console](https://console.cloud.google.com/).
2. Click the project selector at the top, then **New Project**.
3. Name it (e.g. `youtube-studio-mcp`) and click **Create**.

## 2. Enable the APIs

In your new project, enable both APIs:

1. [YouTube Data API v3](https://console.cloud.google.com/apis/library/youtube.googleapis.com)
2. [YouTube Analytics API](https://console.cloud.google.com/apis/library/youtubeanalytics.googleapis.com)

Click **Enable** on each page.

## 3. Configure the OAuth consent screen

1. Go to **APIs & Services → OAuth consent screen**.
2. Choose **External** user type and click **Create**.
3. Fill in:
   - App name: `youtube-studio-mcp` (or your own)
   - User support email: your email
   - Developer contact email: your email
4. **Scopes** step: leave empty (we request scopes at runtime).
5. **Test users** step: add the Google account(s) you want to authorize. Up to 100 testers are allowed in Testing mode, no Google verification needed.
6. Save and continue.

## 4. Create the OAuth client

1. Go to **APIs & Services → Credentials**.
2. Click **Create credentials → OAuth client ID**.
3. Application type: **Desktop app**.
4. Name: `youtube-studio-mcp desktop`.
5. Click **Create**, then **Download JSON**.
6. Save the file somewhere safe (e.g. `~/.config/youtube-studio-mcp/client_secret.json`). Do **not** commit it to git.

## 5. Authorize the MCP

Run the interactive auth command:

```bash
export YOUTUBE_OAUTH_CLIENT_PATH=/absolute/path/to/client_secret.json
npx youtube-studio-mcp auth
```

A browser tab will open asking you to sign in and grant access. You will see a warning that the app is unverified — click **Advanced → Continue** (this is your own app accessing your own data).

On success, a refresh token is written to:

```
~/.config/youtube-studio-mcp/tokens.json
```

Permissions are set to `0600` (owner read/write only).

## 6. Configure your MCP client

### Claude Desktop

Edit `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or the equivalent on Windows/Linux:

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

Restart Claude Desktop.

### Claude Code / Cursor / Windsurf / Cline

All support the same `command + args + env` format. Add an entry to their respective MCP config.

## Optional: enable revenue metrics

To use `get_revenue_breakdown` and the `includeRevenue` option on `get_channel_overview`, you must:

1. Set `ENABLE_MONETARY=true` in the env block.
2. Re-run `npx youtube-studio-mcp auth` to re-consent with the additional scope.

## Troubleshooting

- **"No refresh_token returned"** — Visit [google.com/permissions](https://myaccount.google.com/permissions), revoke `youtube-studio-mcp`, then re-run `auth`.
- **"Access blocked: This app's request is invalid"** — Make sure the OAuth client type is **Desktop app**, not Web.
- **"This app isn't verified"** — Expected in Testing mode. Click **Advanced → Continue to ...** to proceed.
- **Quota exceeded** — See `docs/QUOTA.md` for limits and how to request an increase.
