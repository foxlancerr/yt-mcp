import { z } from "zod";
import { runTool, toolJson } from "../../lib/errors.js";
import { parseDateRange } from "../../lib/date-range.js";
import { queryAnalytics } from "../../lib/analytics.js";
import { dateRangeSchema, videoIdSchema } from "../../schemas/common.js";
import type { ToolRegistrar } from "../types.js";

export const registerGetAudienceDemographics: ToolRegistrar = (
  server,
  { clients },
) => {
  server.registerTool(
    "get_audience_demographics",
    {
      title: "Get audience demographics",
      description:
        "Audience breakdown by age group, gender, or country. Returns viewer percentage by selected dimension.",
      inputSchema: {
        dateRange: dateRangeSchema,
        breakdown: z
          .enum(["ageGroup", "gender", "ageGroup_and_gender", "country"])
          .default("ageGroup_and_gender"),
        videoId: videoIdSchema
          .optional()
          .describe("Limit to a single video. Omit for channel-wide."),
        topCountries: z
          .number()
          .int()
          .min(1)
          .max(50)
          .optional()
          .describe("When breakdown='country', limit to top N (default 25)."),
      },
    },
    async ({ dateRange, breakdown, videoId, topCountries }) =>
      runTool(
        async () => {
          const range = parseDateRange(dateRange);
          const dimensions =
            breakdown === "ageGroup_and_gender"
              ? "ageGroup,gender"
              : breakdown;
          const metric =
            breakdown === "country" ? "views" : "viewerPercentage";
          const result = await queryAnalytics(clients.analytics, {
            ...range,
            metrics: metric,
            dimensions,
            filters: videoId ? `video==${videoId}` : undefined,
            sort: breakdown === "country" ? "-views" : undefined,
            maxResults:
              breakdown === "country" ? (topCountries ?? 25) : undefined,
          });
          return {
            range,
            breakdown,
            metric,
            rows: result.rows,
          };
        },
        toolJson,
      ),
  );
};
