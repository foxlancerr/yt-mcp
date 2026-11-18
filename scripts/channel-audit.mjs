#!/usr/bin/env node
// Full channel audit: branding, every upload with status/length/engagement, playlists, sections.
import { readFile, writeFile } from "node:fs/promises";
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

const out = [];
const log = (...a) => out.push(a.join(" "));

const dur = (iso) => {
  const m = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/.exec(iso || "") || [];
  return (+m[1] || 0) * 3600 + (+m[2] || 0) * 60 + (+m[3] || 0);
};

// ---------- channel ----------
const ch = (
  await yt.channels.list({
    part: ["snippet", "brandingSettings", "contentDetails", "statistics", "status"],
    mine: true,
  })
).data.items[0];
const bs = ch.brandingSettings || {};
const bc = bs.channel || {};
log("=== CHANNEL ===");
log("title:", ch.snippet.title);
log("handle:", ch.snippet.customUrl || "(none)");
log("country:", ch.snippet.country || bc.country || "(unset)");
log("defaultLanguage:", bc.defaultLanguage || "(unset)");
log("subs:", ch.statistics.subscriberCount, "| views(channel):", ch.statistics.viewCount, "| videos:", ch.statistics.videoCount);
log("madeForKids:", ch.status.madeForKids, "| selfDeclared:", ch.status.selfDeclaredMadeForKids);
log("unsubscribedTrailer:", bc.unsubscribedTrailer || "(none)");
log("banner:", bs.image?.bannerExternalUrl ? "set" : "MISSING");
log("description chars:", (bc.description || "").length);
log("description head:", JSON.stringify((bc.description || "").slice(0, 120)));
log("keywords:", bc.keywords ? bc.keywords.slice(0, 400) : "(none)");
log("legacy brand 'OhBhai' in description:", /ohbhai/i.test(bc.description || "") ? "YES - FIX" : "no");

// ---------- uploads ----------
const up = await yt.playlistItems.list({
  part: ["contentDetails"],
  playlistId: ch.contentDetails.relatedPlaylists.uploads,
  maxResults: 50,
});
const ids = up.data.items.map((i) => i.contentDetails.videoId);
const videos = [];
for (let i = 0; i < ids.length; i += 50) {
  const chunk = ids.slice(i, i + 50);
  const r = await yt.videos.list({
    part: ["snippet", "status", "contentDetails", "statistics"],
    id: chunk.join(","),
  });
  videos.push(...r.data.items);
}

const rows = videos.map((v) => ({
  id: v.id,
  title: v.snippet.title,
  pub: v.snippet.publishedAt,
  at: v.status.publishAt || null,
  privacy: v.status.privacyStatus,
  upload: v.status.uploadStatus,
  len: dur(v.contentDetails.duration),
  views: +v.statistics.viewCount || 0,
  likes: +v.statistics.likeCount || 0,
  comments: +v.statistics.commentCount || 0,
  tags: (v.snippet.tags || []).length,
  descLen: (v.snippet.description || "").length,
  cat: v.snippet.categoryId,
  lang: v.snippet.defaultLanguage || v.snippet.defaultAudioLanguage || "(unset)",
  live: v.snippet.liveBroadcastContent,
  shorts: dur(v.contentDetails.duration) <= 61,
}));
rows.sort((a, b) => (a.pub < b.pub ? -1 : 1));

log("\n=== VIDEO TABLE ===");
log("PUBLISHED(UTC)   PRIVACY  LEN   VIEWS LIKE CMT TAGS DESC LANG   ID           TITLE");
for (const r of rows) {
  log(
    r.pub.slice(0, 16).padEnd(17),
    r.privacy.padEnd(8),
    String(r.len).padStart(4),
    String(r.views).padStart(5),
    String(r.likes).padStart(4),
    String(r.comments).padStart(3),
    String(r.tags).padStart(4),
    String(r.descLen).padStart(4),
    r.lang.padEnd(6),
    r.id,
    r.title.slice(0, 62),
  );
}

const pub = rows.filter((r) => r.privacy === "public");
const priv = rows.filter((r) => r.privacy !== "public");
log("\n=== AGGREGATES ===");
log("public:", pub.length, "| non-public:", priv.length, "| total:", rows.length);
log("public views sum:", pub.reduce((a, r) => a + r.views, 0), "(channel reports", ch.statistics.viewCount + ")");
log("public likes:", pub.reduce((a, r) => a + r.likes, 0), "| comments:", pub.reduce((a, r) => a + r.comments, 0));
log("shorts (<=61s):", pub.filter((r) => r.shorts).length, "| long:", pub.filter((r) => !r.shorts).length);
log("scheduled (publishAt in future):", rows.filter((r) => r.at && new Date(r.at) > new Date()).length);
log("private WITHOUT publishAt:", priv.filter((r) => !r.at).length);

const byDay = {};
for (const r of pub) (byDay[r.pub.slice(0, 10)] ||= []).push(r);
log("\n=== UPLOADS PER DAY (public) ===");
for (const d of Object.keys(byDay).sort()) {
  log(d, "->", byDay[d].length, "videos |", byDay[d].map((r) => r.title.slice(0, 34)).join(" || "));
}

const zero = pub.filter((r) => r.views === 0);
log("\n=== ZERO-VIEW PUBLIC:", zero.length, "===");
for (const r of zero) log(" ", r.id, r.pub.slice(0, 16), r.title.slice(0, 60));

log("\n=== BRANDING / METADATA FLAGS ===");
const ohbhai = rows.filter((r) => /ohbhai/i.test(r.title + " " + ""));
log("titles containing legacy brand:", ohbhai.length);
const longTitles = rows.filter((r) => r.title.length > 70);
log("titles >70 chars:", longTitles.length);
for (const r of longTitles) log("  ", r.title.length, r.id, r.title);
const noTags = pub.filter((r) => r.tags === 0);
log("public with 0 tags:", noTags.length, noTags.map((r) => r.id).join(","));
const shortDesc = pub.filter((r) => r.descLen < 200);
log("public with description <200 chars:", shortDesc.length, shortDesc.map((r) => r.id).join(","));
const noDesc = pub.filter((r) => r.descLen === 0);
log("public with empty description:", noDesc.length);
log("categoryIds used:", [...new Set(pub.map((r) => r.cat))].join(","));
log("defaultLanguage set:", pub.filter((r) => r.lang !== "(unset)").length, "/", pub.length);

// ---------- playlists ----------
const pls = await yt.playlists.list({ part: ["snippet", "contentDetails"], mine: true, maxResults: 50 });
log("\n=== PLAYLISTS ===");
for (const p of pls.data.items) {
  log(
    p.id,
    "|",
    String(p.contentDetails.itemCount).padStart(2),
    "|",
    p.snippet.title.slice(0, 50),
    "|",
    p.status?.privacyStatus || "",
  );
}

await writeFile(join(root, "..", "docs", "audit-latest.txt"), out.join("\n"), "utf8");
console.log(out.join("\n"));
