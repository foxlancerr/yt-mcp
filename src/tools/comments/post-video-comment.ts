import { z } from "zod";
import { runTool, toolJson } from "../../lib/errors.js";
import type { ToolRegistrar } from "../types.js";

export const registerPostVideoComment: ToolRegistrar = (server, { clients }) => {
  server.registerTool(
    "post_video_comment",
    {
      title: "Post a comment on a video",
      description:
        "Post a new top-level comment on any video — your own channel or another channel's. " +
        "For comments on other channels, follow the comment-hooks skill: relevant to that " +
        "video, hook-driven, no emoji, no AI tone, no channel self-promotion unless the user " +
        "explicitly asks. Costs 50 quota units.",
      inputSchema: {
        videoId: z
          .string()
          .min(8)
          .describe("YouTube video ID (e.g. 'dQw4w9WgXcQ') to comment on."),
        text: z
          .string()
          .min(1)
          .max(10000)
          .describe("Comment text. Plain text."),
      },
    },
    async ({ videoId, text }) =>
      runTool(
        async () => {
          const res = await clients.data.commentThreads.insert({
            part: ["snippet"],
            requestBody: {
              snippet: {
                videoId,
                topLevelComment: { snippet: { textOriginal: text } },
              },
            },
          });
          return {
            threadId: res.data.id,
            commentId: res.data.snippet?.topLevelComment?.id,
            text: res.data.snippet?.topLevelComment?.snippet?.textDisplay,
            publishedAt:
              res.data.snippet?.topLevelComment?.snippet?.publishedAt,
            videoId: res.data.snippet?.videoId,
          };
        },
        toolJson,
      ),
  );
};
