import { z } from "zod";
import { runTool, toolJson } from "../../lib/errors.js";
import { videoIdSchema } from "../../schemas/common.js";
import type { ToolRegistrar } from "../types.js";

export const registerUpdateVideoStatus: ToolRegistrar = (
  server,
  { clients },
) => {
  server.registerTool(
    "update_video_status",
    {
      title: "Update video privacy / publish / madeForKids",
      description:
        "Change a video's privacy status, scheduled publish time, made-for-kids flag, or license. Costs 50 quota units.",
      inputSchema: {
        videoId: videoIdSchema,
        privacyStatus: z.enum(["private", "unlisted", "public"]).optional(),
        publishAt: z
          .string()
          .optional()
          .describe(
            "RFC3339 datetime to schedule publication. Only valid when privacyStatus='private'.",
          ),
        madeForKids: z.boolean().optional(),
        license: z.enum(["youtube", "creativeCommon"]).optional(),
        embeddable: z.boolean().optional(),
        publicStatsViewable: z.boolean().optional(),
      },
    },
    async (input) =>
      runTool(
        async () => {
          const current = await clients.data.videos.list({
            id: [input.videoId],
            part: ["status"],
          });
          const existing = current.data.items?.[0]?.status;
          if (!existing) {
            throw new Error(`Video ${input.videoId} not found.`);
          }
          const res = await clients.data.videos.update({
            part: ["status"],
            requestBody: {
              id: input.videoId,
              status: {
                privacyStatus:
                  input.privacyStatus ?? existing.privacyStatus ?? "private",
                publishAt: input.publishAt ?? existing.publishAt,
                madeForKids: input.madeForKids ?? existing.madeForKids,
                license: input.license ?? existing.license,
                embeddable: input.embeddable ?? existing.embeddable,
                publicStatsViewable:
                  input.publicStatsViewable ?? existing.publicStatsViewable,
              },
            },
          });
          return res.data.status;
        },
        toolJson,
      ),
  );
};
