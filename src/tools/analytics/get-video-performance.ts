import { runTool, toolJson } from "../../lib/errors.js";
import { parseDateRange } from "../../lib/date-range.js";
import { queryAnalytics } from "../../lib/analytics.js";
import { dateRangeSchema, videoIdSchema } from "../../schemas/common.js";
import type { ToolRegistrar } from "../types.js";

export const registerGetVideoPerformance: ToolRegistrar = (
  server,
  { clients },
) => {
  server.registerTool(
    "get_video_performance",
    {
      title: "Get performance metrics for one video",
      description:
        "Per-video metrics over a date range: views, watch minutes, avg view duration, percentage viewed, CTR (impressions-based), likes/dislikes, comments, shares.",
      inputSchema: {
        videoId: videoIdSchema,
        dateRange: dateRangeSchema,
      },
    },
    async ({ videoId, dateRange }) =>
      runTool(
        async () => {
          const range = parseDateRange(dateRange);
          const result = await queryAnalytics(clients.analytics, {
            ...range,
            metrics:
              "views,estimatedMinutesWatched,averageViewDuration,averageViewPercentage,annotationClickThroughRate,likes,dislikes,comments,shares,subscribersGained,subscribersLost",
            filters: `video==${videoId}`,
          });
          return {
            videoId,
            range,
            metrics: result.rows[0] ?? {},
          };
        },
        toolJson,
      ),
  );
};
