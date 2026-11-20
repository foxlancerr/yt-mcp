// usage: node scripts/cc-video-info.mjs <id> [id...]  -> license, stats, description head (videos.list, ~1 unit)
import { readFile } from "node:fs/promises"; import { homedir } from "node:os"; import { join, dirname } from "node:path"; import { fileURLToPath } from "node:url";
import { OAuth2Client } from "google-auth-library"; import { google } from "googleapis";
const root = dirname(fileURLToPath(import.meta.url));
const cs = JSON.parse(await readFile(join(root, "..", "src", "config", "tokens.json"), "utf8")).installed;
const tk = JSON.parse(await readFile(join(homedir(), ".config", "youtube-studio-mcp", "tokens.json"), "utf8"));
const o = new OAuth2Client(cs.client_id, cs.client_secret); o.setCredentials({ refresh_token: tk.refresh_token });
const r = await google.youtube({ version: "v3", auth: o }).videos.list({ part: ["snippet", "statistics", "status", "contentDetails"], id: process.argv.slice(2).join(",") });
for (const v of r.data.items) console.log(`\n${v.id} | ${v.snippet.channelTitle} | license=${v.status.license} | embeddable=${v.status.embeddable} | madeForKids=${v.status.madeForKids} | ${v.contentDetails.duration} | lang=${v.snippet.defaultAudioLanguage||v.snippet.defaultLanguage||"?"} | views ${v.statistics.viewCount} likes ${v.statistics.likeCount} comments ${v.statistics.commentCount}\n${v.snippet.title}\n${v.snippet.description.replace(/\s+/g," ").slice(0,420)}`);
