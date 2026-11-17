import { z } from "zod";
import { runTool, toolJson } from "../../lib/errors.js";
import { shapePage } from "../../lib/pagination.js";
import {
  channelIdSchema,
  maxResultsSchema,
  pageTokenSchema,
  videoIdSchema,
} from "../../schemas/common.js";
import type { ToolRegistrar } from "../types.js";

export const registerListCommentThreads: ToolRegistrar = (
  server,
  { clients },
) => {
  server.registerTool(
    "list_comment_threads",
    {
      title: "List comment threads",
      description:
        "List top-level comment threads. Provide either `videoId` (comments on that video) or `channelId` (all comment threads across that channel's videos — pass your own channel ID from `get_my_channel`).",
      inputSchema: {
        videoId: videoIdSchema.optional(),
        channelId: channelIdSchema
          .optional()
          .describe(
            "When set, returns all threads across that channel's videos. Mutually exclusive with videoId.",
          ),
        order: z
          .enum(["time", "relevance"])
          .optional()
          .describe("Sort order. Default: time."),
        moderationStatus: z
          .enum(["heldForReview", "likelySpam", "published"])
          .optional()
          .describe(
            "Only available when the authenticated user is the channel owner. Returns comments awaiting moderation.",
          ),
        searchTerms: z
          .string()
          .optional()
          .describe("Match comments containing these terms."),
        maxResults: maxResultsSchema,
        pageToken: pageTokenSchema,
      },
    },
    async ({
      videoId,
      channelId,
      order,
      moderationStatus,
      searchTerms,
      maxResults,
      pageToken,
    }) =>
      runTool(
        async () => {
          if (!videoId && !channelId) {
            throw new Error(
              "Provide either `videoId` or `channelId`. Use `get_my_channel` to retrieve your own channel ID.",
            );
          }
          if (videoId && channelId) {
            throw new Error(
              "Provide only one of `videoId` or `channelId`, not both.",
            );
          }
          const res = await clients.data.commentThreads.list({
            part: ["snippet", "replies"],
            videoId,
            allThreadsRelatedToChannelId: channelId,
            order,
            moderationStatus,
            searchTerms,
            maxResults: maxResults ?? 25,
            pageToken,
          });
          return shapePage(res.data, (thread) => ({
            id: thread.id,
            topLevelComment: {
              id: thread.snippet?.topLevelComment?.id,
              author:
                thread.snippet?.topLevelComment?.snippet?.authorDisplayName,
              authorChannelId:
                thread.snippet?.topLevelComment?.snippet?.authorChannelId
                  ?.value,
              text: thread.snippet?.topLevelComment?.snippet?.textDisplay,
              likes: thread.snippet?.topLevelComment?.snippet?.likeCount,
              publishedAt:
                thread.snippet?.topLevelComment?.snippet?.publishedAt,
              updatedAt: thread.snippet?.topLevelComment?.snippet?.updatedAt,
            },
            totalReplyCount: thread.snippet?.totalReplyCount,
            canReply: thread.snippet?.canReply,
            videoId: thread.snippet?.videoId,
          }));
        },
        toolJson,
      ),
  );
};
