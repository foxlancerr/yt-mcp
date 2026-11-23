import { readFile, writeFile } from "node:fs/promises";

const a = JSON.parse(await readFile("yt/story/outreach-intl-targets.json", "utf8"));
const b = JSON.parse(await readFile("yt/story/outreach-replier-activity.json", "utf8"));

const EU = new Set(["DE", "PL", "RU", "FR", "IT", "ES", "NL", "GB", "TR", "CA"]);
const seen = new Map();
for (const r of [...b, ...a]) {
  if (!EU.has(r.market)) continue;
  if (!r.channelId) continue;
  if (!seen.has(r.id)) seen.set(r.id, r);
}
const out = [...seen.values()];
await writeFile("yt/story/outreach-eu-targets.json", JSON.stringify(out, null, 2));
const byMarket = {};
for (const r of out) byMarket[r.market] = (byMarket[r.market] ?? 0) + 1;
console.log(`${out.length} EU-eligible targets`, byMarket);
