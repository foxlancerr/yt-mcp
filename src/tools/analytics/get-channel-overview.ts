import { z } from "zod";
import { runTool, toolJson } from "../../lib/errors.js";
import { parseDateRange } from "../../lib/date-range.js";
import { queryAnalytics } from "../../lib/analytics.js";
import { dateRangeSchema } from "../../schemas/common.js";
import type { ToolRegistrar } from "../types.js";

const BASE_METRICS = [
  "views",
  "estimatedMinutesWatched",
  "averageViewDuration",
  "subscribersGained",
  "subscribersLost",
  "likes",
  "comments",
  "shares",
];

export const registerGetChannelOverview: ToolRegistrar = (
  server,
  { clients },
) => {
  server.registerTool(
    "get_channel_overview",
    {
      title: "Get channel overview metrics",
      description:
        "Aggregate metrics for the channel over a date range: views, watch minutes, avg view duration, subs gained/lost, likes, comments, shares. Optionally include estimatedRevenue (requires monetary scope, set ENABLE_MONETARY=true at server start).",
      inputSchema: {
        dateRange: dateRangeSchema,
        includeRevenue: z
          .boolean()
          .optional()
          .describe(
            "If true, also include estimatedRevenue, estimatedAdRevenue, cpm. Requires monetary scope.",
          ),
      },
    },
    async ({ dateRange, includeRevenue }) =>
      runTool(
        async () => {
          const range = parseDateRange(dateRange);
          const metrics = [
            ...BASE_METRICS,
            ...(includeRevenue
              ? ["estimatedRevenue", "estimatedAdRevenue", "cpm"]
              : []),
          ].join(",");
          const result = await queryAnalytics(clients.analytics, {
            ...range,
            metrics,
          });
          return {
            range,
            totals: result.rows[0] ?? {},
          };
        },
        toolJson,
      ),
  );
};
