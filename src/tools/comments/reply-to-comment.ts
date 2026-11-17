import { z } from "zod";
import { runTool, toolJson } from "../../lib/errors.js";
import { commentIdSchema } from "../../schemas/common.js";
import type { ToolRegistrar } from "../types.js";

export const registerReplyToComment: ToolRegistrar = (server, { clients }) => {
  server.registerTool(
    "reply_to_comment",
    {
      title: "Reply to a comment",
      description:
        "Post a reply under an existing top-level comment. Costs 50 quota units.",
      inputSchema: {
        parentId: commentIdSchema.describe(
          "ID of the top-level comment to reply to.",
        ),
        text: z
          .string()
          .min(1)
          .max(10000)
          .describe("Reply text. Plain text; YouTube renders links."),
      },
    },
    async ({ parentId, text }) =>
      runTool(
        async () => {
          const res = await clients.data.comments.insert({
            part: ["snippet"],
            requestBody: {
              snippet: { parentId, textOriginal: text },
            },
          });
          return {
            id: res.data.id,
            text: res.data.snippet?.textDisplay,
            publishedAt: res.data.snippet?.publishedAt,
            parentId: res.data.snippet?.parentId,
          };
        },
        toolJson,
      ),
  );
};
