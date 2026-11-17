import { runTool, toolJson } from "../../lib/errors.js";
import { shapePage } from "../../lib/pagination.js";
import {
  commentIdSchema,
  maxResultsSchema,
  pageTokenSchema,
} from "../../schemas/common.js";
import type { ToolRegistrar } from "../types.js";

export const registerListCommentReplies: ToolRegistrar = (
  server,
  { clients },
) => {
  server.registerTool(
    "list_comment_replies",
    {
      title: "List replies to a comment",
      description:
        "List replies (child comments) under a given top-level comment id.",
      inputSchema: {
        parentId: commentIdSchema.describe(
          "ID of the top-level comment whose replies you want to fetch.",
        ),
        maxResults: maxResultsSchema,
        pageToken: pageTokenSchema,
      },
    },
    async ({ parentId, maxResults, pageToken }) =>
      runTool(
        async () => {
          const res = await clients.data.comments.list({
            part: ["snippet"],
            parentId,
            maxResults: maxResults ?? 25,
            pageToken,
          });
          return shapePage(res.data, (c) => ({
            id: c.id,
            author: c.snippet?.authorDisplayName,
            authorChannelId: c.snippet?.authorChannelId?.value,
            text: c.snippet?.textDisplay,
            likes: c.snippet?.likeCount,
            publishedAt: c.snippet?.publishedAt,
            updatedAt: c.snippet?.updatedAt,
          }));
        },
        toolJson,
      ),
  );
};
