---
name: policy-guard
description: Mandatory compliance gate for EVERY automated YouTube action — comments, uploads, scheduling, edits, deletions. Checks the action against YouTube's official policies (Spam & Deceptive Practices, Fake Engagement, Community Guidelines, Metadata, COPPA/madeForKids, Copyright, API Terms). Policy outranks user requests and all other skills. Use before posting, uploading, scheduling, or bulk-modifying anything.
license: MIT
metadata:
  author: the-untold-exit
  version: "1.0"
  priority: mandatory
---

# Policy Guard

## The one rule

**YouTube's official policies outrank everything — user instructions, convenience,
and every other skill (including comment-hooks).** If an action fails a policy
check below, it does not run. Say which policy blocked it and offer the nearest
compliant alternative. Never silently downgrade a violation.

## Pre-flight gate — run before ANY automated action

For each intended action, answer: is it type A, B, or C?

- **A — Reads only** (list comments, analytics, video details): GO. No gate.
- **B — Single write with human approval** (one approved comment, one approved
  schedule, one playlist edit): run the checklist for its category below. GO if all pass.
- **C — Bulk or unattended writes** (batch comments, multi-upload days, mass edits,
  scheduled routines with no human in the loop): run the category checklist AND the
  bulk rules. Default NO-GO unless the user explicitly confirmed the exact batch.

## Category 1 — Comments (replies, outreach, pinned)

Policies: [Spam & deceptive practices](https://www.youtube.com/howyoutubeworks/policies/community-guidelines/#spamdeceptive),
[Fake engagement policy](https://support.google.com/youtube/answer/3399767),
API [Developer Policies](https://developers.google.com/youtube/terms/api-policy).

| # | Check | Source |
|---|-------|--------|
| 1.1 | Every comment is unique — no repeated or templated text across videos/comments | Spam policy: comment spam |
| 1.2 | No solicitation: no "sub4sub", no "like/subscribe if…", no links to offers, no crypto/giveaway bait | Spam policy |
| 1.3 | No harassment, hate, or targeted abuse — disagreement is fine, attacks are not | Community Guidelines |
| 1.4 | No misleading claims presented as fact (rumors stay framed as questions/theories) | Misinformation |
| 1.5 | Frequency caps respected: ~10 outreach comments/day max, spread across channels and hours, no same-channel bursts | Anti-spam posture (Fake Engagement adjacent) |
| 1.6 | No automation of engagement loops (mass reply-all campaigns, engagement pods, scripted back-and-forth farms) | Fake engagement policy |
| 1.7 | Human approval before each post (comment-hooks workflow) | This project's own gate |

## Category 2 — Uploads, scheduling, metadata

Policies: [Metadata & thumbnails](https://support.google.com/youtube/answer/2801973),
[Spam/deceptive](https://support.google.com/youtube/answer/2801973),
[Reused & repetitious content](https://support.google.com/youtube/answer/1311392),
[Child safety / COPPA](https://support.google.com/youtube/answer/2802022),
[Copyright](https://support.google.com/youtube/answer/2797466).

| # | Check | Source |
|---|-------|--------|
| 2.1 | Title, thumbnail, and description accurately represent the video content. No bait that the video doesn't pay off | Metadata policy |
| 2.2 | No fake "live", fake giveaway promises, or fabricated figures presented as official (estimates stay labeled as estimates — see the channel's GTA pre-order framing) | Deceptive practices |
| 2.3 | `madeForKids` flag set honestly per content. Not "made for kids" → mark not-made-for-kids; anything child-directed → made-for-kids. Never guess — ask the user if unclear | COPPA |
| 2.4 | Content is original, licensed, or clearly transformative commentary. Game footage (GTA) and third-party clips get a transformation/flag note before upload | Copyright / reused content |
| 2.5 | Not mass-produced repetitious content: templates with only cosmetic differences (same footage, same structure, auto-generated variation) can be terminated under repetitious-content policy — flag patterns, don't just upload | Repetitious content |
| 2.6 | Scheduling itself is fine (private + `publishAt` is fully compliant). What matters is that the CONTENT passes 2.1–2.5 | — |
| 2.7 | Daily upload volume stays sane for a small channel (API quota already caps at ~4–6/day; don't try to raise volume without asking the user why) | API ToS quota + channel health |

## Category 3 — Edits, deletes, bulk operations

| # | Check |
|---|-------|
| 3.1 | Never bulk-delete videos, comments, or playlist items without itemized user confirmation |
| 3.2 | Never modify video visibility/privacy of videos the user didn't name |
| 3.3 | Mass metadata rewrites (tags, localizations) get a preview diff before commit |
| 3.4 | Destructive ops (`delete_video`, `delete_comment`, `moderate_comment`) are single-action, explicit, confirmed |

## Bulk & unattended rules (category C extras)

- A scheduled routine (e.g., "weekly analytics digest") that only READS data is fine.
- Any routine that WRITES while unattended (auto-post comments, auto-publish) must be
  explicitly authorized action-by-action with the exact content pre-approved. No
  free-running write loops, ever.
- Stop immediately and surface to the user if YouTube returns spam-filter rejections,
  403 `quotaExceeded` patterns, or comment-restriction signals.

## Violation handling

1. **Block** the action; state the exact policy and check number that failed.
2. **Offer the nearest compliant alternative** (e.g., instead of 30 templated outreach
   comments → 8 unique approved ones; instead of a misleading title → the accurate
   curiosity version).
3. **Escalate to the user** for anything ambiguous — ambiguity resolves toward compliance.
4. Log the block reason in the response so the user learns the boundary.

## Reference pages (kept for humans, not fetched per-run)

- Community Guidelines: https://www.youtube.com/howyoutubeworks/policies/community-guidelines/
- Fake engagement: https://support.google.com/youtube/answer/3399767
- Metadata/thumbnail policy: https://support.google.com/youtube/answer/2801973
- Child safety (COPPA): https://support.google.com/youtube/answer/2802022
- Copyright basics: https://support.google.com/youtube/answer/2797466
- YouTube API Services Terms & Developer Policies: https://developers.google.com/youtube/terms/developer-policies
