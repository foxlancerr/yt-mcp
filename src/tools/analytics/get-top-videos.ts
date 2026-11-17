import { z } from "zod";
import { runTool, toolJson } from "../../lib/errors.js";
import { parseDateRange } from "../../lib/date-range.js";
import { queryAnalytics } from "../../lib/analytics.js";
import { dateRangeSchema } from "../../schemas/common.js";
import type { ToolRegistrar } from "../types.js";

const SUPPORTED_SORT_METRICS = [
  "views",
  "estimatedMinutesWatched",
  "averageViewDuration",
  "subscribersGained",
  "likes",
] as const;

export const registerGetTopVideos: ToolRegistrar = (server, { clients }) => {
  server.registerTool(
    "get_top_videos",
    {
      title: "Get top videos by metric",
      description:
        "Rank the channel's videos by a chosen metric over a date range. Returns top N videos with their key stats.",
      inputSchema: {
        dateRange: dateRangeSchema,
        sortBy: z
          .enum(SUPPORTED_SORT_METRICS)
          .default("views")
          .describe("Metric to sort by (descending)."),
        limit: z
          .number()
          .int()
          .min(1)
          .max(50)
          .default(10)
          .describe("Number of videos to return."),
      },
    },
    async ({ dateRange, sortBy, limit }) =>
      runTool(
        async () => {
          const range = parseDateRange(dateRange);
          const result = await queryAnalytics(clients.analytics, {
            ...range,
            metrics:
              "views,estimatedMinutesWatched,averageViewDuration,subscribersGained,likes",
            dimensions: "video",
            sort: `-${sortBy}`,
            maxResults: limit,
          });
          return {
            range,
            sortBy,
            videos: result.rows,
          };
        },
        toolJson,
      ),
  );
};
