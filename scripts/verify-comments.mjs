import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

const file = process.argv[2] || "yt/story/2026-11-21-outreach-intl-posted.json";
const { posted } = JSON.parse(await readFile(file, "utf8"));

const secret = JSON.parse(await readFile("src/config/tokens.json", "utf8")).installed;
const tokens = JSON.parse(await readFile(join(homedir(), ".config", "youtube-studio-mcp", "tokens.json"), "utf8"));
const oauth = new OAuth2Client(secret.client_id, secret.client_secret);
oauth.setCredentials({ refresh_token: tokens.refresh_token });
const yt = google.youtube({ version: "v3", auth: oauth });

let live = 0;
for (const p of posted) {
  try {
    const r = await yt.comments.list({ part: ["snippet"], id: p.id, textFormat: "plainText" });
    const c = r.data.items?.[0]?.snippet;
    if (!c) {
      console.log(`MISSING  ${p.market} ${p.who}  ${p.id}`);
      continue;
    }
    live++;
    console.log(`LIVE  ${p.market} ${p.who}  ${c.publishedAt.slice(0, 16)}  "${c.textDisplay.slice(0, 78)}"`);
  } catch (e) {
    console.log(`ERROR  ${p.market} ${p.who}  ${p.id}  ${e.message.slice(0, 90)}`);
  }
}
console.log(`\n${live}/${posted.length} live`);
