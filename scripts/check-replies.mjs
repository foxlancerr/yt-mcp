#!/usr/bin/env node
// Find replies to our posted comments (outreach + own-video) so we can reply back.
import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

const root = dirname(fileURLToPath(import.meta.url));
const clientSecret = JSON.parse(
  await readFile(join(root, "..", "src", "config", "tokens.json"), "utf8"),
).installed;
const tokens = JSON.parse(
  await readFile(join(homedir(), ".config", "youtube-studio-mcp", "tokens.json"), "utf8"),
);
const oauth = new OAuth2Client(clientSecret.client_id, clientSecret.client_secret);
oauth.setCredentials({ refresh_token: tokens.refresh_token });
const yt = google.youtube({ version: "v3", auth: oauth });

const ids = [
  // today's outreach
  "UgwZ3rC_HJDv1LCTdmF4AaABAg", "UgwtD9wzdrBKX40PSFB4AaABAg", "UgyIaYnI4QeX2Umm-kN4AaABAg",
  // Nov 17 batch
  "UgwbZLBMiC4E4Q9TV-14AaABAg", "UgwCr1YFYV_uDg2vWBt4AaABAg", "UgwEn7bIZEw9_sqyVm94AaABAg",
  "UgwRkSfovWp_gicM5Xt4AaABAg", "UgwrRoxlB8_iQyaC3YR4AaABAg", "UgwYuL-Irqny8tZXA_p4AaABAg",
  "UgwZVy_6JZS_0Uou1e54AaABAg", "Ugx0YI2bSn16hp1tC-J4AaABAg", "Ugx4Ov2tWKahSVeoEmJ4AaABAg",
  "UgxCDDQJzkYV-i-HeNh4AaABAg", "UgxpJCOnGuDhhgoRuxh4AaABAg", "Ugy4vJ8zJKn5b8IJ6jl4AaABAg",
  "Ugy8vAhoUCQf7ecJIKJ4AaABAg", "UgyaQaD5kQYXUooeFF54AaABAg", "UgymLxO43MbMyc0uW_d4AaABAg",
  "UgymY2WVX7m_uEXnUUV4AaABAg", "UgyZ8D5mWWeePBxDwMl4AaABAg", "UgzpW8QXUZKKeWR8VdB4AaABAg",
  "Ugzr4nVoC3HkCeMI-994AaABAg", "UgzyE-ExwBGl1IpKwDV4AaABAg",
];

for (const id of ids) {
  try {
    const meta = await yt.comments.list({ part: ["snippet"], id: [id] });
    const c = meta.data.items?.[0]?.snippet;
    if (!c) { console.log(`[${id}] NOT FOUND (deleted?)`); continue; }
    let rep = [];
    try {
      const replies = await yt.comments.list({ part: ["snippet"], parentId: id, maxResults: 20 });
      rep = replies.data.items ?? [];
    } catch { /* replies may be disabled */ }
    if (rep.length === 0) continue;
    console.log(`\n=== ${id} | video ${c.videoId} | ours: "${c.textOriginal.slice(0, 70)}"`);
    for (const r of rep) {
      const rs = r.snippet;
      console.log(`  REPLY(${rs.authorDisplayName}): "${rs.textOriginal.replace(/\n/g, " ").slice(0, 140)}"  [${r.id}]`);
    }
  } catch (e) {
    console.log(`[${id}] error: ${e.message.slice(0, 80)}`);
  }
}
console.log("\nscan complete");
