import { z } from "zod";
import { runTool, toolJson } from "../../lib/errors.js";
import { videoIdSchema } from "../../schemas/common.js";
import type { ToolRegistrar } from "../types.js";

export const registerGetVideoDetails: ToolRegistrar = (
  server,
  { clients },
) => {
  server.registerTool(
    "get_video_details",
    {
      title: "Get full video details",
      description:
        "Fetch full info for one or more videos: snippet, status, statistics, contentDetails, topicDetails. Up to 50 IDs per call.",
      inputSchema: {
        videoIds: z.array(videoIdSchema).min(1).max(50),
      },
    },
    async ({ videoIds }) =>
      runTool(
        async () => {
          const res = await clients.data.videos.list({
            id: videoIds,
            part: [
              "snippet",
              "status",
              "statistics",
              "contentDetails",
              "topicDetails",
              "localizations",
            ],
          });
          return (res.data.items ?? []).map((v) => ({
            id: v.id,
            title: v.snippet?.title,
            description: v.snippet?.description,
            tags: v.snippet?.tags,
            categoryId: v.snippet?.categoryId,
            defaultLanguage: v.snippet?.defaultLanguage,
            defaultAudioLanguage: v.snippet?.defaultAudioLanguage,
            publishedAt: v.snippet?.publishedAt,
            duration: v.contentDetails?.duration,
            definition: v.contentDetails?.definition,
            licensedContent: v.contentDetails?.licensedContent,
            privacyStatus: v.status?.privacyStatus,
            uploadStatus: v.status?.uploadStatus,
            madeForKids: v.status?.madeForKids,
            publishAt: v.status?.publishAt,
            statistics: v.statistics,
            topics: v.topicDetails?.topicCategories,
            localizations: v.localizations,
          }));
        },
        toolJson,
      ),
  );
};
