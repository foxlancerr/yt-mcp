---
name: comment-hooks
description: Use when drafting or posting any comment or reply from the channel (reply_to_comment, pinned comments, community engagement) — writes short human comments with curiosity, trigger and dopamine hooks that make viewers answer. No emoji, no AI tone. Reads AGENTS.md first.
license: MIT
metadata:
  author: the-untold-exit
  version: "1.0"
  requires: AGENTS.md
---

# Comment Hooks

## Overview

Every comment the channel posts is bait — not filler. A reply has one job: make the
viewer reply back, rewatch, or open the next episode. Comments are written like a
friend who knows something you don't, not like a brand account.

**Hard rules — never violate:**
- No emoji. Ever.
- No AI tone: no "Great question!", "Thanks for watching!", "We're glad…",
  "That means a lot", "I appreciate…", no perfect grammar pleasantries, no sign-offs.
- No hashtags, no self-promo links, no "Subscribe!" begging.
- Max 2 short sentences. Comment sections punish essays.
- Lowercase-casual or plain sentence case is fine; never corporate-polished.

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

## Pillar voice (from AGENTS.md)

- P1/P2 (OhBhai! challenge + series): confident, playful, a little cocky. Facts of the
  story as bait. Episode tease is the strongest close.
- P3 (GTA): knowing-gamer tone, rumor-flavored, never "according to reports".
- P4 (The Untold Exit, psychology): calm, direct, slightly confrontational with the
  viewer's own excuse. "You don't lack motivation. You lack a reason."

## Workflow

1. Read AGENTS.md for pillar + series context. Identify which pillar the video is.
2. Read the comment being answered. Reply to the person's actual point — the hook
   attaches to their comment, it is not a canned template.
3. Draft the reply (1–2 sentences, one hook type minimum, question close where natural).
4. **Show all drafts to the user for approval. Never post without confirmation.**
5. Post via `reply_to_comment` (youtube-studio). Fix typos later via `update_comment`.
6. Spam/hate: don't engage, don't reply — flag with `mark_comment_as_spam`.
7. For pinned comments on a new upload: front-load the episode's central mystery as a
   question ("You have 60 seconds and 4 doors. Which one?") — pinned = the video's
   first hook outside the video.

## Anti-examples (what this skill must never produce)

- "Thanks for the support! More content coming soon 🙌" — AI tone, emoji, zero hook.
- "That's a great question! The answer will be in our next video." — corporate, empty.
- "I completely agree with you. Great observation!" — agreement closes loops; hooks
  open them.
