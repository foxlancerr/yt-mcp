// Read-only audit: list public uploads + whether each has any comments.
// Usage: node scripts/comment-audit.mjs [uploadsPlaylistId]
// Defaults to The Untold Exit uploads playlist. Outputs JSON lines, cheapest reads.
import { homedir } from "node:os";
import { join } from "node:path";
import { google } from "googleapis";

const base = join(homedir(), ".config", "youtube-studio-mcp");
const tokens = JSON.parse(await import("node:fs/promises").then(fs => fs.readFile(join(base, "tokens.json"), "utf8")));
// Client secret lives in the repo config (src/config/tokens.json); the legacy
// ~/.config/youtube-studio-mcp/client_secret.json path no longer exists.
const secret = JSON.parse(await import("node:fs/promises").then(fs => fs.readFile(join("src", "config", "tokens.json"), "utf8"))).installed;
const auth = new google.auth.OAuth2({ clientId: secret.client_id, clientSecret: secret.client_secret });
auth.setCredentials({ refresh_token: tokens.refresh_token });
const yt = google.youtube({ version: "v3", auth });

const uploads = process.argv[2] || "UUDtw5Rb0c4QONw5Ko789lig";

const rows = [];
let pageToken;
do {
  const pl = await yt.playlistItems.list({ part: ["snippet", "contentDetails"], playlistId: uploads, maxResults: 50, pageToken });
  for (const i of pl.data.items ?? []) {
    rows.push({
      videoId: i.snippet?.resourceId?.videoId,
      title: i.snippet?.title,
      publishedAt: i.contentDetails?.videoPublishedAt ?? i.snippet?.publishedAt,
      duration: i.contentDetails?.duration,
    });
  }
  pageToken = pl.data.nextPageToken;
} while (pageToken);

// Filter out private/unlisted via videos.list status (50 per call, 1 unit each)
const ids = rows.map(r => r.videoId).filter(Boolean);
const status = new Map();
for (let i = 0; i < ids.length; i += 50) {
  const v = await yt.videos.list({ part: ["status"], id: ids.slice(i, i + 50), maxResults: 50 });
  for (const it of v.data.items ?? []) status.set(it.id, it.status?.privacyStatus);
}

const out = [];
for (const r of rows) {
  const privacy = status.get(r.videoId);
  if (!r.videoId || privacy !== "public") continue;
  let hasComments = null, error = null;
  try {
    const ct = await yt.commentThreads.list({ part: ["snippet"], videoId: r.videoId, maxResults: 1 });
    hasComments = (ct.data.items ?? []).length > 0;
  } catch (e) {
    error = String(e?.message ?? e).slice(0, 100);
  }
  out.push({ ...r, privacy, hasComments, error });
}

const noComments = out.filter(r => r.hasComments === false);
const withComments = out.filter(r => r.hasComments !== false);
console.log(JSON.stringify({ totalPublic: out.length, noComments, withComments, readUnitsApprox: Math.ceil(out.length * 2) }, null, 2));
