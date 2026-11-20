# Runs youtube-studio-mcp with the OAuth paths preset.
# Usage:  .\scripts\yt-mcp.ps1 auth     (re-authorize the channel)
#         .\scripts\yt-mcp.ps1          (start the server on stdio)
$cfg = Join-Path $env:USERPROFILE ".config\youtube-studio-mcp"
$env:YOUTUBE_OAUTH_CLIENT_PATH = Join-Path $cfg "client_secret.json"
$env:YOUTUBE_TOKEN_PATH = Join-Path $cfg "tokens.json"
node (Join-Path $PSScriptRoot "..\dist\index.js") @args
