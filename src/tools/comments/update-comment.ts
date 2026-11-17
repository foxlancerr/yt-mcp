import { z } from "zod";
import { runTool, toolJson } from "../../lib/errors.js";
import { commentIdSchema } from "../../schemas/common.js";
import type { ToolRegistrar } from "../types.js";

export const registerUpdateComment: ToolRegistrar = (server, { clients }) => {
  server.registerTool(
    "update_comment",
    {
      title: "Edit your own comment",
      description:
        "Update the text of a comment authored by the authenticated user. Cannot edit other users' comments. Costs 50 quota units.",
      inputSchema: {
        commentId: commentIdSchema,
        text: z.string().min(1).max(10000),
      },
    },
    async ({ commentId, text }) =>
      runTool(
        async () => {
          const res = await clients.data.comments.update({
            part: ["snippet"],
            requestBody: {
              id: commentId,
              snippet: { textOriginal: text },
            },
          });
          return {
            id: res.data.id,
            text: res.data.snippet?.textDisplay,
            updatedAt: res.data.snippet?.updatedAt,
          };
        },
        toolJson,
      ),
  );
};
