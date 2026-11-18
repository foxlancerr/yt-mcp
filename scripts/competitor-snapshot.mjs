#!/usr/bin/env node
// competitor-snapshot — refresh the cluster data referenced by AGENTS.md §3
// and competitor-playbook. Costs ~25 quota units.
//
// Usage:
//   node scripts/competitor-snapshot.mjs            # resolve+cache handles, scan 25 uploads each
//   node scripts/competitor-snapshot.mjs --uploads 15
//
// Writes docs/competitors-data.md (raw numbers only — the editorial analysis
// in docs/competitors.md stays hand-written and is never overwritten).

import { readFile, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

const root = dirname(fileURLToPath(import.meta.url));
const CACHE = join(root, "..", "docs", "competitors.channels.json");
const OUT = join(root, "..", "docs", "competitors-data.md");

// Candidate handles per channel, tried in order (each miss costs 0 units).
// `expect` = subs recorded in docs/competitors.md; a handle whose channel is more
// than 2x off is rejected as the wrong channel (same-name impostors exist).
const CLUSTER = [
  { name: "ConChaser", expect: 29_400, hint: "What If You Could See Everyone's IQ", handles: ["conchaser", "con_chaser", "conchaseryt"] },
  { name: "Monk Mode Films", expect: 31_900, hint: "LUST VS LOVE animated short film", handles: ["monkmodefilms", "monkmode", "monkmodefilm"] },
  { name: "Day One Films", expect: 102_000, hint: "DISCIPLINE An Animated Short Film", handles: ["dayonefilms", "dayone", "day1films"] },
  { name: "Dart", expect: 38_300, hint: "boxing vs stickman battle", handles: ["dart", "dartyt", "dartfilms", "dartgta"] },
  { name: "Miko", expect: 11_900, hint: "What If You Could See Everyone's Lie Count", handles: ["miko", "mikoyt", "mikofilms"] },
  { name: "The You Variable", expect: 1_830, hint: "Who Actually Wins Obsession vs Ego", handles: ["theyouvariable", "youvariable"] },
  { name: "MrBeast", expect: 527_000_000, hint: "MrBeast challenge", handles: ["mrbeast"] },
];

const plausible = (subs, expect) => {
  const n = +subs || 0;
  if (n <= 0) return false; // a 0-sub lookalike is never the cluster channel
  if (!expect) return true;
  return n >= expect / 2 && n <= expect * 2;
};

const uploadsArg = process.argv.indexOf("--uploads");
const uploads = uploadsArg > -1 ? parseInt(process.argv[uploadsArg + 1] || "25", 10) : 25;

async function client() {
  const clientSecret = JSON.parse(
    await readFile(join(root, "..", "src", "config", "tokens.json"), "utf8"),
  ).installed;
  const tokens = JSON.parse(
    await readFile(
      join(homedir(), ".config", "youtube-studio-mcp", "tokens.json"),
      "utf8",
    ),
  );
  const oauth = new OAuth2Client(
    clientSecret.client_id,
    clientSecret.client_secret,
  );
  oauth.setCredentials({ refresh_token: tokens.refresh_token });
  return google.youtube({ version: "v3", auth: oauth });
}

const yt = await client();

function seconds(iso) {
  const m = /^P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso || "");
  if (!m) return 0;
  return (+(m[1] || 0)) * 86400 + (+(m[2] || 0)) * 3600 + (+(m[3] || 0)) * 60 + (+(m[4] || 0));
}
const median = (a) => {
  if (!a.length) return 0;
  const s = [...a].sort((x, y) => x - y);
  const mid = s.length >> 1;
  return s.length % 2 ? s[mid] : Math.round((s[mid - 1] + s[mid]) / 2);
};

// 1) resolve handles (cached)
let cache = {};
try {
  cache = JSON.parse(await readFile(CACHE, "utf8"));
} catch {}

for (const c of CLUSTER) {
  if (cache[c.name]) continue;
  for (const h of c.handles) {
    try {
      const r = await yt.channels.list({ part: ["id", "statistics"], forHandle: h });
      const item = r.data.items?.[0];
      if (!item) continue;
      if (!plausible(+item.statistics.subscriberCount, c.expect)) {
        console.log(`! ${c.name}: @${h} has ${item.statistics.subscriberCount} subs — not the cluster channel, skipping`);
        continue;
      }
      cache[c.name] = item.id;
      break;
    } catch {
      /* handle miss */
    }
  }
  if (!cache[c.name]) console.log(`! unresolved: ${c.name} (tried ${c.handles.join(", ")})`);
}
await writeFile(CACHE, JSON.stringify(cache, null, 2));

// 1b) optional search fallback for channels whose handle is unknown (100 units each,
// only runs with --resolve; result is cached forever after).
const doResolve = process.argv.includes("--resolve");
if (doResolve) {
  for (const c of CLUSTER) {
    if (cache[c.name]) continue;
    try {
      const s = await yt.search.list({
        part: ["snippet"],
        q: `${c.name} ${c.hint}`,
        type: ["video"],
        order: "relevance",
        maxResults: 8,
      });
      const ids = [...new Set((s.data.items || []).map((i) => i.snippet.channelId))];
      if (!ids.length) continue;
      const cs = await yt.channels.list({
        part: ["id", "statistics"],
        id: ids.join(","),
        maxResults: 50,
      });
      const hit = (cs.data.items || []).find((ch) =>
        plausible(+ch.statistics.subscriberCount, c.expect),
      );
      if (hit) {
        cache[c.name] = hit.id;
        console.log(`✓ resolved via search: ${c.name} → ${hit.id} (${hit.statistics.subscriberCount} subs)`);
      } else {
        console.log(`! search found no plausible channel for ${c.name}`);
      }
    } catch (e) {
      console.log(`! search failed for ${c.name}: ${e.message}`);
    }
  }
  await writeFile(CACHE, JSON.stringify(cache, null, 2));
}

const resolved = CLUSTER.filter((c) => cache[c.name]);
if (!resolved.length) {
  console.error("No channels resolved — run with --resolve or set handles in CLUSTER.");
  process.exit(1);
}

// 2) channel stats + uploads playlists (one call)
const chans = await yt.channels.list({
  part: ["snippet", "statistics", "contentDetails"],
  id: resolved.map((c) => cache[c.name]).join(","),
  maxResults: 50,
});
const byId = new Map(chans.data.items.map((c) => [c.id, c]));

const report = [];
for (const c of resolved) {
  const ch = byId.get(cache[c.name]);
  if (!ch) continue;
  if (!plausible(+ch.statistics.subscriberCount, c.expect)) {
    console.log(`! ${c.name}: cached channel has ${ch.statistics.subscriberCount} subs — stale id, delete docs/competitors.channels.json to re-resolve`);
    delete cache[c.name];
    continue;
  }
  const playlist = ch.contentDetails.relatedPlaylists.uploads;
  let items;
  try {
    items = await yt.playlistItems.list({
      part: ["contentDetails"],
      playlistId: playlist,
      maxResults: uploads,
    });
  } catch (e) {
    console.log(`! ${c.name}: uploads playlist unreadable (${e.code || e.message}) — skipped`);
    continue;
  }
  const ids = (items.data.items || []).map((i) => i.contentDetails.videoId);
  if (!ids.length) continue;

  const vids = await yt.videos.list({
    part: ["snippet", "statistics", "contentDetails"],
    id: ids.join(","),
  });
  const views = vids.data.items.map((v) => ({
    id: v.id,
    title: v.snippet.title.replace(/\s+/g, " ").trim(),
    views: +v.statistics.viewCount,
    dur: seconds(v.contentDetails.duration),
    when: v.snippet.publishedAt.slice(0, 10),
  }));
  const dates = views.map((v) => Date.parse(v.when)).sort((a, b) => a - b);
  const gaps = dates.slice(1).map((d, i) => (d - dates[i]) / 86_400_000);
  const top = [...views].sort((a, b) => b.views - a.views)[0];
  const subs = +ch.statistics.subscriberCount;

  report.push({
    name: c.name,
    id: ch.id,
    subs,
    median10: median([...views].sort((a, b) => b.when.localeCompare(a.when)).slice(0, 10).map((v) => v.views)),
    shorts: views.filter((v) => v.dur < 90).length,
    longs: views.filter((v) => v.dur >= 300).length,
    total: views.length,
    cadence: gaps.length ? +median(gaps).toFixed(1) : null,
    top,
    ratio: subs ? +(top.views / subs).toFixed(1) : null,
    medianDur: median(views.map((v) => v.dur)),
  });
}

report.sort((a, b) => b.median10 - a.median10);

const stamp = new Date().toISOString().slice(0, 10);
const md = [
  `# Competitor raw data (generated ${stamp})`,
  "",
  "> Raw numbers only, from YouTube Data API v3 (last " + uploads + " uploads/channel).",
  "> Regenerate: `node scripts/competitor-snapshot.mjs`. Editorial analysis lives in",
  "> `docs/competitors.md` — this file never replaces it.",
  "",
  "| Channel | Subs | Median views (recent 10) | Mix (short/long of " + uploads + ") | Cadence (median gap) | Median length | Top video | Top / subs |",
  "|---|---:|---:|---|---:|---:|---|---:|",
  ...report.map(
    (r) =>
      `| ${r.name} | ${r.subs.toLocaleString()} | ${r.median10.toLocaleString()} | ${r.shorts} short / ${r.longs} long | ${r.cadence ?? "-"}d | ${r.medianDur}s | ${r.top.title.slice(0, 55).replace(/\|/g, "/")} (${r.top.views.toLocaleString()}) | ${r.ratio ?? "-"}× |`,
  ),
  "",
  "## Moves implied by this snapshot",
  "",
  "- Best median views: " + report[0].name + " (" + report[0].median10.toLocaleString() + ")",
  "- Best topic-vs-size proof: " +
    [...report].sort((a, b) => (b.ratio || 0) - (a.ratio || 0))[0].name +
    " (" + [...report].sort((a, b) => (b.ratio || 0) - (a.ratio || 0))[0].ratio + "× subs)",
  "- Shorts share across cluster: " +
    Math.round((report.reduce((s, r) => s + r.shorts, 0) / report.reduce((s, r) => s + r.total, 0)) * 100) +
    "% of recent uploads",
  "",
  "quota: ~" + (7 + resolved.length + resolved.length + Math.ceil(resolved.length * uploads / 50)) + " units",
  "",
].join("\n");

await writeFile(OUT, md);
console.log(md);
console.log(`\nwrote ${OUT}`);
console.log(`cache: ${CACHE}`);
