#!/usr/bin/env node
// Interlinks all skills in .agents/skills by appending a "Skill network"
// section to each SKILL.md. Idempotent: skips files that already have it.
import { readFile, writeFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const skillsDir = join(fileURLToPath(import.meta.url), "..", "..", ".agents", "skills");

// network: { inputs: skills that feed this one, feeds: skills this one hands off to }
const network = {
  "policy-guard": {
    inputs: [],
    feeds: ["* every skill (mandatory gate before any write action)"],
    note: "Gates every write action from every skill. Runs first, always.",
  },
  "tubelab-mcp": {
    inputs: ["* every TubeLab skill (tool usage, costs, quirks)"],
    feeds: ["* every TubeLab skill"],
    note: "Reference layer: when a TubeLab call fails or a filter is unclear, read this before retrying.",
  },
  "niche-finder": {
    inputs: ["AGENTS.md (channel context)"],
    feeds: ["niche-validator (confirm before committing)", "niche-bending (twist a proven niche)", "channel-analysis", "monetization-research"],
  },
  "niche-validator": {
    inputs: ["niche-finder (shortlist to validate)"],
    feeds: ["channel-analysis (enter with a plan)", "niche-bending", "monetization-research"],
  },
  "niche-bending": {
    inputs: ["niche-finder", "reverse-engineer-channel (proven format to bend)", "trend-report (what works now)"],
    feeds: ["niche-validator (validate the bent niche)", "video-ideation (first ideas from the new angle)"],
  },
  "niche-watchlist": {
    inputs: ["niche-finder / niche-validator (niches worth monitoring)"],
    feeds: ["trend-report (digest of breakout channels)", "competitor-research (new entrants)"],
    note: "Scheduled read-only routine — policy-guard category A, safe to run unattended.",
  },
  "channel-analysis": {
    inputs: ["AGENTS.md (own channel: the-untold-exit)", "comment-mining (what the audience says)"],
    feeds: ["reverse-engineer-channel (teardown of what works)", "audit-channel-risk (exposure check)", "monetization-research (revenue gaps)", "competitor-research", "video-ideation"],
  },
  "competitor-research": {
    inputs: ["channel-analysis (positioning baseline)"],
    feeds: ["reverse-engineer-channel (teardown each rival)", "trend-report", "video-ideation (gap exploitation)"],
  },
  "reverse-engineer-channel": {
    inputs: ["competitor-research (rival set)", "trend-report (current winners)"],
    feeds: ["title-formulas (extract title patterns)", "thumbnail-concepts (extract thumbnail patterns)", "script-breakdown (hook/structure patterns)", "video-ideation", "niche-bending (format source)"],
  },
  "trend-report": {
    inputs: ["competitor-research (niche scope)", "reverse-engineer-channel (why winners win)"],
    feeds: ["title-formulas", "thumbnail-concepts", "script-breakdown", "video-ideation", "niche-watchlist (monitor what emerged)"],
  },
  "video-ideation": {
    inputs: ["AGENTS.md (mandatory — pillars P1-P6 and §3 data)", "trend-report", "comment-mining (audience asks in their words)", "competitor-research", "niche-bending"],
    feeds: ["title-formulas (title for each idea)", "thumbnail-concepts", "script-breakdown", "comment-hooks (pinned comment per idea)", "policy-guard (2.1 metadata accuracy before scheduling)"],
  },
  "title-formulas": {
    inputs: ["AGENTS.md (mandatory — pillar voice patterns)", "video-ideation (ideas needing titles)", "trend-report", "reverse-engineer-channel"],
    feeds: ["thumbnail-concepts (title+thumbnail as one unit)", "script-breakdown", "policy-guard (2.1 — title must match content honestly)"],
  },
  "thumbnail-concepts": {
    inputs: ["title-formulas (title to pair with)", "reverse-engineer-channel", "trend-report"],
    feeds: ["policy-guard (2.1 — thumbnail must not deceive)"],
  },
  "script-breakdown": {
    inputs: ["reverse-engineer-channel", "trend-report", "video-ideation"],
    feeds: ["title-formulas (align title with hook)", "comment-hooks (pinned comment carries the central question)"],
  },
  "comment-mining": {
    inputs: ["youtube-studio (own videos' comments) or TubeLab (any video)"],
    feeds: ["video-ideation (demand signal)", "comment-hooks (audience's own words as hook material)", "channel-analysis"],
  },
  "comment-hooks": {
    inputs: ["AGENTS.md (mandatory — pillar voice)", "comment-mining (reply in audience language)", "script-breakdown (central question for pins)", "policy-guard (Category 1 — mandatory before posting)"],
    feeds: ["policy-guard (every draft passes Category 1 checks)"],
  },
  "monetization-research": {
    inputs: ["channel-analysis", "niche-finder / niche-validator"],
    feeds: ["sponsorship-prospecting (turn revenue gaps into creator lists)"],
  },
  "sponsorship-prospecting": {
    inputs: ["monetization-research (what to sell)", "competitor-research (adjacent creators)"],
    feeds: [],
  },
  "audit-channel-risk": {
    inputs: ["channel-analysis", "policy-guard (existing policy exposures)"],
    feeds: ["policy-guard (fix list becomes enforcement targets)"],
  },
};

const dirs = (await readdir(skillsDir, { withFileTypes: true }))
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

let updated = 0;
for (const name of dirs) {
  const file = join(skillsDir, name, "SKILL.md");
  let content;
  try {
    content = await readFile(file, "utf8");
  } catch {
    continue;
  }
  if (content.includes("## Skill network")) continue;
  const n = network[name];
  if (!n) {
    console.log(`skip (no mapping): ${name}`);
    continue;
  }
  const lines = ["\n## Skill network", ""];
  lines.push(`- **Runs after:** ${n.inputs.join(", ")}`);
  lines.push(`- **Hands off to:** ${n.feeds.length ? n.feeds.join(", ") : "(terminal skill)"}`);
  if (n.note) lines.push(`- **Note:** ${n.note}`);
  lines.push(
    `- **Gate:** policy-guard checks every write action this skill produces (comments, uploads, schedules, edits).`,
    "",
  );
  await writeFile(file, content.replace(/\n*$/, "\n") + lines.join("\n") + "\n");
  updated++;
}
console.log(`updated ${updated} of ${dirs.length} skills`);
