#!/usr/bin/env node
// Outreach target finder — international. One search per country, local language.
//
//   node scripts/outreach-intl.mjs [hours=72]
//
// 20 queries x 100 units = ~2,000 units. Use when the batch must span countries.
// Country note: the Data API exposes no channel country for videos, so each row carries
// the region/language that SURFACED it. Never claim a creator's nationality from that.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { homedir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

const root = dirname(fileURLToPath(import.meta.url));
const hours = parseInt(process.argv[2] || "72", 10);

const QUERIES = [
  ["BR", "pt-BR", "GTA 6 dicas"],
  ["MX", "es-419", "GTA 6 trucos"],
  ["ES", "es-ES", "GTA 6 secretos"],
  ["DE", "de-DE", "GTA 6 Tipps"],
  ["FR", "fr-FR", "GTA 6 astuces"],
  ["IT", "it-IT", "GTA 6 trucchi"],
  ["PL", "pl-PL", "GTA 6 poradnik"],
  ["TR", "tr-TR", "GTA 6 rehber"],
  ["ID", "id-ID", "GTA 6 tips"],
  ["PH", "en-PH", "GTA 6 tips"],
  ["IN", "hi-IN", "GTA 6"],
  ["JP", "ja-JP", "GTA 6 攻略"],
  ["KR", "ko-KR", "GTA 6 공략"],
  ["RU", "ru-RU", "GTA 6 секреты"],
  ["NL", "nl-NL", "GTA 6 tips"],
  ["SA", "ar-SA", "GTA 6 أسرار"],
  ["US", "en", "GTA 6 tips"],
  ["GB", "en", "GTA 6 secrets"],
  ["CA", "en", "GTA 6 mistakes"],
  ["AU", "en", "GTA 6 easter eggs"],
];

const secret = JSON.parse(
  await readFile(join(root, "..", "src", "config", "tokens.json"), "utf8"),
).installed;
const tokens = JSON.parse(
  await readFile(join(homedir(), ".config", "youtube-studio-mcp", "tokens.json"), "utf8"),
);
const oauth = new OAuth2Client(secret.client_id, secret.client_secret);
oauth.setCredentials({ refresh_token: tokens.refresh_token });
const yt = google.youtube({ version: "v3", auth: oauth });

const since = new Date(Date.now() - hours * 3600_000).toISOString();
const seen = new Map();

for (const [region, lang, q] of QUERIES) {
  let r;
  try {
    r = await yt.search.list({
      part: ["snippet"],
      q,
      type: ["video"],
      order: "viewCount",
      regionCode: region,
      relevanceLanguage: lang,
      publishedAfter: since,
      maxResults: 10,
    });
  } catch (e) {
    console.error(`skip ${region}: ${e.message}`);
    continue;
  }
  for (const it of r.data.items || []) {
    const id = it.id?.videoId;
    if (!id || seen.has(id)) continue;
    seen.set(id, { region, lang, query: q });
  }
}

const allIds = [...seen.keys()];
const vidsItems = [];
const chanIdSet = new Set();
for (let i = 0; i < allIds.length; i += 50) {
  const chunk = await yt.videos.list({
    part: ["snippet", "statistics", "contentDetails"],
    id: allIds.slice(i, i + 50).join(","),
  });
  for (const v of chunk.data.items || []) {
    vidsItems.push(v);
    chanIdSet.add(v.snippet.channelId);
  }
}

const chanIds = [...chanIdSet];
const subs = new Map();
for (let i = 0; i < chanIds.length; i += 50) {
  const chans = await yt.channels.list({ part: ["statistics"], id: chanIds.slice(i, i + 50).join(",") });
  for (const c of chans.data.items || []) subs.set(c.id, +c.statistics.subscriberCount);
}

function seconds(iso) {
  const m = /^P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso || "");
  if (!m) return 0;
  return +(m[1] || 0) * 86400 + +(m[2] || 0) * 3600 + +(m[3] || 0) * 60 + +(m[4] || 0);
}

const rows = [];
for (const v of vidsItems) {
  const s = subs.get(v.snippet.channelId) || 0;
  const views = +v.statistics.viewCount;
  const meta = seen.get(v.id);
  const desc = (v.snippet.description || "").replace(/\s+/g, " ").trim();
  rows.push({
    id: v.id,
    market: meta.region,
    lang: meta.lang,
    query: meta.query,
    channel: v.snippet.channelTitle,
    channelId: v.snippet.channelId,
    subs: s,
    views,
    ratio: s ? +(views / s).toFixed(1) : null,
    dur: seconds(v.contentDetails.duration),
    published: v.snippet.publishedAt.slice(0, 16),
    title: v.snippet.title,
    desc,
  });
}

const eligible = rows
  .filter((r) => r.subs >= 1_000 && r.subs <= 800_000 && r.views >= 300 && r.dur >= 15 && r.desc.length >= 40)
  .sort((a, b) => b.ratio - a.ratio);

console.log(`\n=== OUTREACH CANDIDATES — INTERNATIONAL (last ${hours}h) ===`);
console.log(`${rows.length} unique · ${eligible.length} eligible · markets: ${[...new Set(eligible.map((r) => r.market))].join(",")}\n`);
for (const r of eligible) {
  console.log(`[${r.market}/${r.lang}] ${r.id}  ${String(r.subs).padStart(7)}s  ${String(r.views).padStart(8)}v  ${r.ratio}x  ${String(r.dur).padStart(4)}s  ${r.published}`);
  console.log(`   C: ${r.channel}`);
  console.log(`   T: ${r.title.slice(0, 110)}`);
  console.log(`   D: ${r.desc.slice(0, 220)}`);
  console.log("");
}

const out = join(root, "..", "yt", "story", "outreach-intl-targets.json");
await mkdir(dirname(out), { recursive: true });
await writeFile(out, JSON.stringify(eligible, null, 2));
console.log(`wrote ${out}\nquota: ~${QUERIES.length * 100 + 2}`);
