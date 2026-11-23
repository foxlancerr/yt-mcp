#!/usr/bin/env node
// Which creators actually reply to comments? Reads the eligible target pool and scores
// each video by how much the channel author engages in its own comment section.
//
//   node scripts/outreach-replier-check.mjs
//
// Uses commentThreads.list (1 unit per video). No writes.
import { readFile, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

const root = dirname(fileURLToPath(import.meta.url));
const targets = JSON.parse(
  await readFile(process.argv[2] ?? join(root, "..", "yt", "story", "outreach-intl-targets.json"), "utf8"),
);

const secret = JSON.parse(await readFile(join(root, "..", "src", "config", "tokens.json"), "utf8")).installed;
const tokens = JSON.parse(await readFile(join(homedir(), ".config", "youtube-studio-mcp", "tokens.json"), "utf8"));
const oauth = new OAuth2Client(secret.client_id, secret.client_secret);
oauth.setCredentials({ refresh_token: tokens.refresh_token });
const yt = google.youtube({ version: "v3", auth: oauth });

const hoursAgo = (iso) => (Date.now() - new Date(iso).getTime()) / 3_600_000;

// commentSnippet.authorChannelId is serialised as { value } by the JS client, not { channelId }.
const chOf = (snip) => snip?.authorChannelId?.value ?? snip?.authorChannelId?.channelId ?? null;
const out = [];

for (const t of targets) {
  let threads = [];
  let disabled = false;
  try {
    let pageToken = null;
    for (let page = 0; page < 2; page++) {
      const r = await yt.commentThreads.list({
        part: ["snippet", "replies"],
        videoId: t.id,
        order: "time",
        maxResults: 100,
        textFormat: "plainText",
        ...(pageToken ? { pageToken } : {}),
      });
      threads.push(...(r.data.items || []));
      pageToken = r.data.nextPageToken;
      if (!pageToken) break;
    }
  } catch (e) {
    if (/disabled/i.test(e.message)) {
      disabled = true;
    } else {
      out.push({ ...t, error: e.message.slice(0, 120) });
      continue;
    }
  }

  let totalComments = 0;
  let authorTop = 0;
  let authorReplies = 0;
  let lastAuthorAt = null;
  const answered = [];

  for (const th of threads) {
    const top = th.snippet.topLevelComment.snippet;
    totalComments++;
    if (chOf(top) === t.channelId) {
      authorTop++;
      if (!lastAuthorAt || top.publishedAt > lastAuthorAt) lastAuthorAt = top.publishedAt;
    }
    const reps = th.replies?.comments || [];
    totalComments += reps.length;
    const byAuthor = reps.filter((c) => chOf(c.snippet) === t.channelId);
    authorReplies += byAuthor.length;
    for (const c of byAuthor) {
      if (!lastAuthorAt || c.snippet.publishedAt > lastAuthorAt) lastAuthorAt = c.snippet.publishedAt;
    }
    if (byAuthor.length) {
      answered.push({
        top: top.textDisplay.replace(/\s+/g, " ").slice(0, 90),
        reply: byAuthor[0].snippet.textDisplay.replace(/\s+/g, " ").slice(0, 90),
      });
    }
  }

  const authorComments = authorTop + authorReplies;
  out.push({
    id: t.id,
    disabled,
    market: t.market,
    lang: t.lang,
    channel: t.channel,
    channelId: t.channelId,
    subs: t.subs,
    views: t.views,
    ratio: t.ratio,
    dur: t.dur,
    published: t.published,
    title: t.title,
    desc: t.desc,
    threadsSampled: threads.length,
    totalComments,
    authorTop,
    authorReplies,
    authorComments,
    authorRate: totalComments ? +(authorComments / totalComments * 100).toFixed(1) : 0,
    lastAuthorAt,
    hoursSinceAuthor: lastAuthorAt ? +hoursAgo(lastAuthorAt).toFixed(1) : null,
    examples: answered.slice(0, 3),
  });
}

const ranked = out
  .filter((r) => !r.error)
  .sort((a, b) => {
    const recent = (r) => (r.hoursSinceAuthor != null && r.hoursSinceAuthor < 36 ? 1 : 0);
    return (
      recent(b) - recent(a) ||
      b.authorReplies - a.authorReplies ||
      b.authorComments - a.authorComments ||
      b.authorRate - a.authorRate
    );
  });

console.log("\n=== CREATOR REPLY ACTIVITY (48 candidates) ===\n");
for (const r of ranked) {
  const flag = r.authorReplies >= 3 && r.hoursSinceAuthor != null && r.hoursSinceAuthor < 36 ? "ACTIVE" : "quiet ";
  console.log(
    `${flag} ${String(r.authorReplies).padStart(3)} author-replies / ${String(r.totalComments).padStart(3)} comments (${r.authorRate}%)  last ${r.hoursSinceAuthor ?? "-"}h  [${r.market}] ${r.id}  ${r.subs}s ${r.views}v  ${r.channel}`
  );
  if (r.examples?.length) {
    console.log(`        e.g. "${r.examples[0].top}" -> "${r.examples[0].reply}"`);
  }
}
const errs = out.filter((r) => r.error);
if (errs.length) {
  console.log("\nfailed reads:");
  for (const e of errs) console.log(`  x ${e.id} ${e.channel}: ${e.error}`);
}

await writeFile(join(root, "..", "yt", "story", "outreach-replier-activity.json"), JSON.stringify(ranked, null, 2));
console.log(`\nwrote yt/story/outreach-replier-activity.json · quota ~${targets.length}`);
