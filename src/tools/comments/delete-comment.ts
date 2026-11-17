import { runTool, toolText } from "../../lib/errors.js";
import { commentIdSchema } from "../../schemas/common.js";
import type { ToolRegistrar } from "../types.js";

export const registerDeleteComment: ToolRegistrar = (server, { clients }) => {
  server.registerTool(
    "delete_comment",
    {
      title: "Delete a comment",
      description:
        "Delete a comment authored by the authenticated user. Channel owners can also delete comments on their videos. Irreversible.",
      inputSchema: {
        commentId: commentIdSchema,
      },
    },
    async ({ commentId }) =>
      runTool(
        async () => {
          await clients.data.comments.delete({ id: commentId });
          return commentId;
        },
        (id) => toolText(`Comment ${id} deleted.`),
      ),
  );
};
