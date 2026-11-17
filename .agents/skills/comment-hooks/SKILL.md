---
name: comment-hooks
description: Use when drafting or posting any comment or reply from the channel (reply_to_comment, pinned comments, community engagement) — writes short human comments with curiosity, trigger and dopamine hooks that make viewers answer. Field-tested against real comment-section data (Nov 2026). Reads AGENTS.md first.
license: MIT
metadata:
  author: the-untold-exit
  version: "1.1"
  requires: AGENTS.md
---

# Comment Hooks

## Overview

Every comment the channel posts is bait — not filler. A reply has one job: make the
viewer reply back, rewatch, or open the next episode. Comments are written like a
friend who knows something you don't, not like a brand account.

**Hard rules — never violate:**
- No AI tone: no "Great question!", "Thanks for watching!", "We're glad…",
  "That means a lot", "I appreciate…", no perfect grammar pleasantries, no sign-offs.
- No hashtags, no self-promo links, no "Subscribe!" begging.
- **One idea per comment. Punchline or question goes LAST.**
- **Length: ideal 5–15 words, hard cap 20 for outreach comments.** Pinned comments on
  own videos may run to 2 short sentences (they carry episode hooks). Comment sections
  punish essays — a 100+ word comment earns near-zero replies (verified in the field
  data below: the 200-word "strategy" comment got 1 like; the 9-word one got 19K).
- Lowercase-casual or plain sentence case is fine; never corporate-polished.
- Emoji: own-channel comments (pinned, replies) = **no emoji** (brand voice).
  Outreach on other channels = **at most ONE casual emoji (😭 😂 💀)** and only when
  that section's native tone uses them (flagged to user 2026-11-17; user can veto).

## The three hook types (use at least one per comment)

### 1. Curiosity — open a loop the viewer has to close
Tease what they missed or what comes next. Specific beats vague.
- "Rewatch the scene at 0:34. He wasn't the one who locked it."
- "The reason she took the chip is in episode 1. Nobody's caught it yet."
- "There's one detail on that map that changes the whole theory. Not saying which."

### 2. Trigger — poke a position people defend
Division drives replies. Frame it as a choice, never an insult.
- "Prisoners win that in under a minute. Cops have zero chance and everyone knows it."
- "Everyone says Team. Solo is the obvious answer. Fight me in the replies."
- "You picked the wrong door and you know it."

### 3. Dopamine — promise a payoff for answering
Reward engagement with insider info, next-episode intel, or a decision that matters.
- "Episode 3 answers this. Most people guess wrong until they see it."
- "The next episode starts 10 seconds after this one ends. You'll see why that matters."
- "Last person to guess right in this thread picks the ending of episode 4. Go."

### Question endings — the reply-forcing close
End with a question that is specific, binary, or personal. Never "What do you think?"
- "Team or solo. One word."
- "Did you catch it on first watch, or did you need the rewatch?"
- "First thing you'd grab before the timer hits zero. Go."

## Field-tested formulas (from real comment sections, Nov 2026)

Source data: three full comment threads — a psychology-animation channel, MrBeast
($250K Hunger Games, 67M views), Dude Perfect (School Stereotypes). Patterns below
are ranked by observed likes.

1. **Timestamp callout** — `MM:SS` + a micro-reaction to that exact second. Proves
   watch time better than anything. "20:25 'Mr. Least' is crazy" (225) ·
   "13:51 he did not just..." (220) · "0:17 this is so relatable".
2. **As-a-X confession** — "as a [identity], i can confirm/feel like…". Only when
   honest or plausibly universal. "as a homeschooler i feel like im watching a
   documentary" (856) · "as a teacher, it's like watching a documentary" (92).
3. **Ultra-short verdict** — one word or line taking a side. "Obsession" (25) ·
   "discipline screamin 5 AM is so wierd" (281).
4. **Meta/irony observation** — zoom out on the absurdity of the situation.
   "hollywood needs $200M and 3 years for this, he just needed a random saturday" (6.6K) ·
   "modern people rediscover how extremely overpowered spears are" (19K).
5. **Character sympathy joke** — mourn or defend a person/character in the video.
   "a moment of silence for juan" (10K) · "nolan was in his prime until he did him dirty" (2K).
6. **Timeline meme** — `year: thing` ladder ending in a prediction.
   "2021: squid game / 2026: hunger game / 2031: maze runner" (43K).
7. **Powerscaling debate bait** — assign the contenders different win conditions.
   "ego wins in a race. discipline wins with time, and obsession wins in a fight" (31).
8. **Direct question to creator/community** — "where'd you guys get the bear?!" (35).
   Questions addressed to the creator get creator replies, and a creator reply
   multiplies visibility (MrBeast's own pinned "what should i recreate next?" = 25K).
9. **Underrated-gem discovery** — "came from [platform] expecting a big channel, found
   a gem" (25). Small/adjacent channels only, and only when plausibly true.

**Formula selection by video size:** big channels (MrBeast-tier) → formulae 4, 5, 6, 7
(jokes and observations; questions get buried). Small/mid channels → formulae 2, 8, 9
(personal + questions; the creator actually replies).

**Creator-reply fishing:** comments most likely to get a creator reply are short
questions about the production ("how long did this take to film") or character jokes.
Those replies are worth more than 100 like-less comments.

## Anti-patterns (verified in the same data — these earn nothing or look spammy)

- **Essay comments** — the 200-word "The Strategy for Success: Start with Vision…"
  comment: 1 like. Nobody reads past the first line.
- **Covert product plugs** — "As Zael Veynor exposes in *Glow They Never Saw*…"
  (book-ad pattern, appears verbatim multiple times = detected spam). Violates
  spam policy too; policy-guard rejects these.
- **Empty praise** — "fire video", "great content". Zero hook, zero reply.
- **Engagement farming with nothing attached** — "anyone from instagram?" (gets
  likes but no substance, trains the section to ignore the account).
- **Neutral plot restatement** — summarizing what happened adds no take, no loop,
  no question. If the comment works as a plot summary, it fails.

## Pillar voice (from AGENTS.md)

- P1/P2 (OhBhai! challenge + series): confident, playful, a little cocky. Facts of the
  story as bait. Episode tease is the strongest close.
- P3 (GTA): knowing-gamer tone, rumor-flavored, never "according to reports".
- P4 (The Untold Exit, psychology): calm, direct, slightly confrontational with the
  viewer's own excuse. "You don't lack motivation. You lack a reason."

## Outreach: commenting on OTHER channels' videos

Use `post_video_comment` (youtube-studio) to comment on videos the channel does NOT
own. This is growth outreach: the goal is that the other video's viewers notice the
comment, find it genuinely good, and click through to the channel.

**Relevance is the whole game — the comment must prove the commenter actually watched
the video:**
1. Reference a concrete moment, detail, timestamp, or claim from THAT video.
2. Attach a hook to their content (see hook types above), never to our channel:
   - Curiosity: "everyone's arguing about the ending, but the real hint is at 2:10."
   - Trigger: "solo had that race won until the third jump. change my mind."
   - Dopamine/answer-bait: "who else caught the reflection in the window at 0:47?"
3. NEVER mention our channel, our videos, "check my channel", or drop links. A
   self-promo comment gets deleted, reported, and poisons the account. Discovery comes
   from the channel name being interesting enough to click.
4. Match the video's tone (a comedy video gets a joke comment; a serious breakdown
   gets a sharp observation). Voice stays human per the hard rules above — no AI tone,
   ≤20 words, at most one casual emoji when that section's tone is emoji-native.
5. NEVER post the same or near-same text on multiple videos. Duplicates trip YouTube's
   spam filter. Every comment is unique.

**Volume discipline (spam-policy safety):**
- Max ~10 outreach comments/day, spread across different channels and hours.
  Never burst 5 comments on one channel in an hour.
- Prefer recent uploads and small/mid channels in adjacent niches (see AGENTS.md
  pillars) — big channels bury comments; small channels reply.
- If a comment gets a reply from the creator, prioritize that thread over new posts.
- Show every draft to the user for approval before posting. Never auto-post outreach.

**Risk note (tell the user once per session if outreach is requested):** automated
or mass commenting can be flagged by YouTube's spam systems and, at scale, can restrict
the account's commenting ability. The caps above exist to keep this safe; exceeding
them on purpose is not supported by this skill.

## Workflow

1. Read AGENTS.md for pillar + series context. Identify which pillar the video is.
2. Read the comment being answered. Reply to the person's actual point — the hook
   attaches to their comment, it is not a canned template.
3. Draft the reply (1–2 sentences, one hook type minimum, question close where natural).
4. **Show all drafts to the user for approval. Never post without confirmation.**
5. On own videos: post via `reply_to_comment`. On other channels' videos:
   `post_video_comment` (see Outreach section above). Fix typos later via `update_comment`.
6. Spam/hate: don't engage, don't reply — flag with `mark_comment_as_spam`.
7. For pinned comments on a new upload: front-load the episode's central mystery as a
   question ("You have 60 seconds and 4 doors. Which one?") — pinned = the video's
   first hook outside the video.

## Anti-examples (what this skill must never produce)

- "Thanks for the support! More content coming soon 🙌" — AI tone, emoji, zero hook.
- "That's a great question! The answer will be in our next video." — corporate, empty.
- "I completely agree with you. Great observation!" — agreement closes loops; hooks
  open them.

## Skill network

- **Runs after:** AGENTS.md (mandatory — pillar voice), comment-mining (reply in audience language), script-breakdown (central question for pins), policy-guard (Category 1 — mandatory before posting)
- **Hands off to:** policy-guard (every draft passes Category 1 checks)
- **Gate:** policy-guard checks every write action this skill produces (comments, uploads, schedules, edits).

