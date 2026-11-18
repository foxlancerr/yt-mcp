#!/usr/bin/env node
// Verify the applied GTA 6 playlist SEO changes against the live API snapshot.
import { readFile } from "node:fs/promises";

const verify = JSON.parse(
  await readFile(new URL("../yt/story/gta6-playlist-seo/verify.json", import.meta.url), "utf8"),
);
const plan = JSON.parse(
  await readFile(new URL("../yt/story/gta6-playlist-seo/plan.json", import.meta.url), "utf8"),
);

const primary = new Map(plan.results.map((r) => [r.id, r.primary]));
const added = new Map(plan.results.map((r) => [r.id, r.added]));
let failures = 0;

console.log("id            primary keyword            kw  tags  #   len   chapters");
for (const v of verify.videos) {
  const p = primary.get(v.id);
  if (!p) continue;
  const d = v.description.toLowerCase();
  const hasPrimary = d.includes(p.toLowerCase());
  const hits = [p, ...(added.get(v.id) || [])].filter((k) => d.includes(k.toLowerCase())).length;
  const tags = (v.description.match(/#[\p{L}\p{N}_]+/gu) || []).length;
  const ohbhai = /ohbhai/i.test(v.description) || v.tags.some((t) => /ohbhai/i.test(t));
  const chapters = v.chapters.length;
  const ok = hasPrimary && tags >= 3 && tags <= 5 && !ohbhai && v.description.length < 5000;
  if (!ok) failures++;
  console.log(
    `${v.id}  ${(hasPrimary ? p : "MISSING " + p).padEnd(27)} ${String(hits).padStart(2)}  ${String(v.tags.length).padStart(4)}  ${String(tags).padStart(2)}  ${String(v.description.length).padStart(4)}  ${chapters}${ok ? "" : "   <-- CHECK"}`,
  );
}

const publicVideos = verify.videos.filter((v) => v.privacy === "public");
console.log(`\npublic videos: ${publicVideos.length} | failures: ${failures}`);
if (failures) process.exit(1);
