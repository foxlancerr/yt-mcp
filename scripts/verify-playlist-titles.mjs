#!/usr/bin/env node
// Verify applied titles: exact text, length, appended phrase presence.
import { readFile } from "node:fs/promises";

const snap = JSON.parse(
  await readFile(new URL("../yt/story/gta6-playlist-seo/verify-titles.json", import.meta.url), "utf8"),
);
const plan = JSON.parse(
  await readFile(new URL("../yt/story/gta6-playlist-seo/titles-plan.json", import.meta.url), "utf8"),
);
const expect = new Map(plan.results.map((r) => [r.id, r.next]));

let fail = 0;
for (const v of snap.videos) {
  const want = expect.get(v.id);
  const ok = want ? v.title === want : true;
  if (!ok) fail++;
  const mark = want ? (ok ? "✅" : "❌") : "  ";
  console.log(`${mark} ${String(v.title.length).padStart(3)}  ${v.title}`);
  if (!ok) console.log(`    expected: ${want}`);
}
console.log(`\ntitles matching plan: ${[...expect.keys()].length - fail}/${[...expect.keys()].length}`);
if (fail) process.exit(1);
