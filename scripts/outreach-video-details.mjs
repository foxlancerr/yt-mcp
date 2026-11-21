#!/usr/bin/env node
// usage: node scripts/outreach-video-details.mjs id [id...]  -> read-only: title, channel, country, subs, views, comments, description head (about 3 units)
import { readFile } from "node:fs/promises"; import { homedir } from "node:os"; import { join, dirname } from "node:path"; import { fileURLToPath } from "node:url";
import { OAuth2Client } from "google-auth-library"; import { google } from "googleapis";
const root = dirname(fileURLToPath(import.meta.url));
const cs = JSON.parse(await readFile(join(root, "..", "src", "config", "tokens.json"), "utf8")).installed;
const tk = JSON.parse(await readFile(join(homedir(), ".config", "youtube-studio-mcp", "tokens.json"), "utf8"));
const o = new OAuth2Client(cs.client_id, cs.client_secret); o.setCredentials({ refresh_token: tk.refresh_token });
const yt = google.youtube({ version: "v3", auth: o });
const r = await yt.videos.list({ part: ["snippet", "statistics", "contentDetails"], id: process.argv.slice(2).join(",") });
const ch = await yt.channels.list({ part: ["snippet", "statistics"], id: [...new Set(r.data.items.map((v) => v.snippet.channelId))].join(",") });
const cm = new Map(ch.data.items.map((c) => [c.id, c]));
for (const v of r.data.items) {
  const c = cm.get(v.snippet.channelId);
  console.log(`\n${v.id} | ${v.snippet.channelTitle} | country=${c?.snippet.country || "?"} | subs ${c?.statistics.subscriberCount} | views ${v.statistics.viewCount} | comments ${v.statistics.commentCount ?? "off"} | ${v.contentDetails.duration} | lang=${v.snippet.defaultAudioLanguage || v.snippet.defaultLanguage || "?"} | ${v.snippet.publishedAt.slice(0, 10)}\nT: ${v.snippet.title}\nD: ${v.snippet.description.replace(/\s+/g, " ").slice(0, 380)}`);
}
