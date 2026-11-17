import { runTool, toolJson } from "../../lib/errors.js";
import { parseDateRange } from "../../lib/date-range.js";
import { queryAnalytics } from "../../lib/analytics.js";
import { dateRangeSchema, videoIdSchema } from "../../schemas/common.js";
import type { ToolRegistrar } from "../types.js";

export const registerGetTrafficSources: ToolRegistrar = (
  server,
  { clients },
) => {
  server.registerTool(
    "get_traffic_sources",
    {
      title: "Get traffic sources",
      description:
        "Where views are coming from: YouTube search, suggested videos, browse features, external, channel pages, etc.",
      inputSchema: {
        dateRange: dateRangeSchema,
        videoId: videoIdSchema.optional(),
      },
    },
    async ({ dateRange, videoId }) =>
      runTool(
        async () => {
          const range = parseDateRange(dateRange);
          const result = await queryAnalytics(clients.analytics, {
            ...range,
            metrics: "views,estimatedMinutesWatched",
            dimensions: "insightTrafficSourceType",
            filters: videoId ? `video==${videoId}` : undefined,
            sort: "-views",
          });
          return {
            range,
            rows: result.rows,
          };
        },
        toolJson,
      ),
  );
};
