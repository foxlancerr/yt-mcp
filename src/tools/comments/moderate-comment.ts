import { z } from "zod";
import { runTool, toolText } from "../../lib/errors.js";
import { commentIdSchema } from "../../schemas/common.js";
import type { ToolRegistrar } from "../types.js";

export const registerModerateComment: ToolRegistrar = (
  server,
  { clients },
) => {
  server.registerTool(
    "moderate_comment",
    {
      title: "Moderate a comment",
      description:
        "Set the moderation status of one or more comments. Only available to the channel owner on their own videos.",
      inputSchema: {
        commentIds: z
          .array(commentIdSchema)
          .min(1)
          .max(50)
          .describe("Comment IDs to moderate (up to 50)."),
        status: z
          .enum(["heldForReview", "published", "rejected"])
          .describe("Target moderation status."),
        banAuthor: z
          .boolean()
          .optional()
          .describe(
            "When status='rejected', also ban the comment author from commenting on the channel.",
          ),
      },
    },
    async ({ commentIds, status, banAuthor }) =>
      runTool(
        async () => {
          await clients.data.comments.setModerationStatus({
            id: commentIds,
            moderationStatus: status,
            banAuthor,
          });
          return commentIds.length;
        },
        (count) =>
          toolText(
            `Moderation status set to "${status}" on ${count} comment(s).`,
          ),
      ),
  );
};
