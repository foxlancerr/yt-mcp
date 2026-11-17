import { z } from "zod";
import { runTool, toolJson } from "../../lib/errors.js";
import type { ToolRegistrar } from "../types.js";

export const registerUpdateChannelBranding: ToolRegistrar = (
  server,
  { clients },
) => {
  server.registerTool(
    "update_channel_branding",
    {
      title: "Update channel branding (description, keywords, country)",
      description:
        "Update the authenticated channel's branding settings. Provide only the fields you want to change; existing values are preserved.",
      inputSchema: {
        description: z.string().max(1000).optional(),
        keywords: z
          .string()
          .max(500)
          .optional()
          .describe(
            "Channel keywords as a single space-separated string. Quote multi-word keywords.",
          ),
        country: z
          .string()
          .length(2)
          .optional()
          .describe("ISO 3166-1 alpha-2 country code (e.g. 'AR', 'US')."),
        defaultLanguage: z
          .string()
          .optional()
          .describe("BCP-47 language tag, e.g. 'en' or 'es-AR'."),
        unsubscribedTrailer: z
          .string()
          .optional()
          .describe(
            "Video ID shown as the channel trailer to non-subscribers.",
          ),
      },
    },
    async (input) =>
      runTool(
        async () => {
          const current = await clients.data.channels.list({
            mine: true,
            part: ["brandingSettings", "snippet"],
          });
          const channel = current.data.items?.[0];
          if (!channel) {
            throw new Error("No channel found for authenticated user.");
          }
          const existing = channel.brandingSettings?.channel ?? {};
          const merged = {
            title: existing.title ?? channel.snippet?.title ?? undefined,
            description: input.description ?? existing.description,
            keywords: input.keywords ?? existing.keywords,
            country: input.country ?? existing.country,
            defaultLanguage:
              input.defaultLanguage ?? existing.defaultLanguage,
            unsubscribedTrailer:
              input.unsubscribedTrailer ?? existing.unsubscribedTrailer,
          };
          const res = await clients.data.channels.update({
            part: ["brandingSettings"],
            requestBody: {
              id: channel.id,
              brandingSettings: { channel: merged },
            },
          });
          return res.data.brandingSettings?.channel;
        },
        toolJson,
      ),
  );
};
