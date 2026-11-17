import { runTool, toolJson } from "../../lib/errors.js";
import { parseDateRange } from "../../lib/date-range.js";
import { queryAnalytics } from "../../lib/analytics.js";
import { dateRangeSchema } from "../../schemas/common.js";
import type { ToolRegistrar } from "../types.js";

export const registerGetRevenueBreakdown: ToolRegistrar = (
  server,
  { clients },
) => {
  server.registerTool(
    "get_revenue_breakdown",
    {
      title: "Get revenue breakdown",
      description:
        "Estimated revenue split (ad revenue, YouTube Premium, transactions). Requires the monetary scope — start the server with ENABLE_MONETARY=true and re-authorize.",
      inputSchema: {
        dateRange: dateRangeSchema,
      },
    },
    async ({ dateRange }) =>
      runTool(
        async () => {
          const range = parseDateRange(dateRange);
          const result = await queryAnalytics(clients.analytics, {
            ...range,
            metrics:
              "estimatedRevenue,estimatedAdRevenue,estimatedRedPartnerRevenue,grossRevenue,cpm,playbackBasedCpm,monetizedPlaybacks,adImpressions",
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
