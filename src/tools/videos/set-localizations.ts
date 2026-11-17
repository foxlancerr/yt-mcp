import { z } from "zod";
import { runTool, toolJson } from "../../lib/errors.js";
import { videoIdSchema } from "../../schemas/common.js";
import type { ToolRegistrar } from "../types.js";

export const registerSetLocalizations: ToolRegistrar = (
  server,
  { clients },
) => {
  server.registerTool(
    "set_localizations",
    {
      title: "Set translated title/description per language",
      description:
        "Replace the localizations map on a video (title/description per BCP-47 language tag). Pass `merge=true` to keep existing locales not present in the input.",
      inputSchema: {
        videoId: videoIdSchema,
        localizations: z
          .record(
            z.string(),
            z.object({
              title: z.string().min(1).max(100),
              description: z.string().max(5000).optional(),
            }),
          )
          .describe(
            "Object keyed by BCP-47 language tag (e.g. 'es', 'es-AR', 'pt-BR').",
          ),
        merge: z
          .boolean()
          .default(true)
          .describe(
            "If true (default), merge with existing localizations. If false, replace fully.",
          ),
      },
    },
    async ({ videoId, localizations, merge }) =>
      runTool(
        async () => {
          let existing: Record<
            string,
            { title?: string | null; description?: string | null }
          > = {};
          if (merge) {
            const current = await clients.data.videos.list({
              id: [videoId],
              part: ["localizations"],
            });
            existing = (current.data.items?.[0]?.localizations ?? {}) as typeof existing;
          }
          const next: Record<string, { title: string; description?: string }> = {};
          for (const [lang, loc] of Object.entries(existing)) {
            if (loc.title) {
              next[lang] = {
                title: loc.title,
                description: loc.description ?? undefined,
              };
            }
          }
          for (const [lang, loc] of Object.entries(localizations)) {
            next[lang] = { title: loc.title, description: loc.description };
          }
          const res = await clients.data.videos.update({
            part: ["localizations"],
            requestBody: { id: videoId, localizations: next },
          });
          return res.data.localizations;
        },
        toolJson,
      ),
  );
};
