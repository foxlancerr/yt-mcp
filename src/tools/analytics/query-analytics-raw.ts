import { z } from "zod";
import { runTool, toolJson } from "../../lib/errors.js";
import { parseDateRange } from "../../lib/date-range.js";
import { queryAnalytics } from "../../lib/analytics.js";
import { dateRangeSchema } from "../../schemas/common.js";
import type { ToolRegistrar } from "../types.js";

export const registerQueryAnalyticsRaw: ToolRegistrar = (
  server,
  { clients },
) => {
  server.registerTool(
    "query_analytics_raw",
    {
      title: "Raw analytics query (escape hatch)",
      description:
        "Direct access to youtubeAnalytics.reports.query for any combination of metrics, dimensions, filters, and sort. Reference: https://developers.google.com/youtube/analytics/dimensions",
      inputSchema: {
        dateRange: dateRangeSchema,
        metrics: z
          .string()
          .min(1)
          .describe(
            "Comma-separated list of metrics (e.g. 'views,estimatedMinutesWatched').",
          ),
        dimensions: z
          .string()
          .optional()
          .describe("Comma-separated dimensions (e.g. 'day,country')."),
        filters: z
          .string()
          .optional()
          .describe(
            "Filter expression (e.g. 'video==dQw4w9WgXcQ;country==US').",
          ),
        sort: z
          .string()
          .optional()
          .describe(
            "Sort spec (prefix with '-' for descending, e.g. '-views').",
          ),
        maxResults: z.number().int().min(1).max(10000).optional(),
        currency: z
          .string()
          .length(3)
          .optional()
          .describe("ISO 4217 currency for revenue metrics (e.g. 'USD')."),
      },
    },
    async (input) =>
      runTool(
        async () => {
          const range = parseDateRange(input.dateRange);
          const result = await queryAnalytics(clients.analytics, {
            ...range,
            metrics: input.metrics,
            dimensions: input.dimensions,
            filters: input.filters,
            sort: input.sort,
            maxResults: input.maxResults,
            currency: input.currency,
          });
          return result;
        },
        toolJson,
      ),
  );
};
