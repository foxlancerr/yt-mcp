import { z } from "zod";
import { runTool, toolText } from "../../lib/errors.js";
import { commentIdSchema } from "../../schemas/common.js";
import type { ToolRegistrar } from "../types.js";

export const registerMarkCommentAsSpam: ToolRegistrar = (
  server,
  { clients },
) => {
  server.registerTool(
    "mark_comment_as_spam",
    {
      title: "Mark comments as spam",
      description: "Flag one or more comments as spam.",
      inputSchema: {
        commentIds: z.array(commentIdSchema).min(1).max(50),
      },
    },
    async ({ commentIds }) =>
      runTool(
        async () => {
          await clients.data.comments.markAsSpam({ id: commentIds });
          return commentIds.length;
        },
        (count) => toolText(`Marked ${count} comment(s) as spam.`),
      ),
  );
};
