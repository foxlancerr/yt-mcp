import { z } from "zod";
import { runTool, toolJson } from "../../lib/errors.js";
import { videoIdSchema } from "../../schemas/common.js";
import type { ToolRegistrar } from "../types.js";

export const registerUpdateVideoMetadata: ToolRegistrar = (
  server,
  { clients },
) => {
  server.registerTool(
    "update_video_metadata",
    {
      title: "Update video metadata (title, description, tags, category, language)",
      description:
        "Edit a video's snippet fields. Only provided fields are changed; existing values are preserved. Costs 50 quota units.",
      inputSchema: {
        videoId: videoIdSchema,
        title: z.string().min(1).max(100).optional(),
        description: z.string().max(5000).optional(),
        tags: z.array(z.string()).max(500).optional(),
        categoryId: z
          .string()
          .optional()
          .describe(
            "YouTube video category id (e.g. '22' = People & Blogs, '28' = Science & Technology). See videoCategories.list.",
          ),
        defaultLanguage: z.string().optional(),
        defaultAudioLanguage: z.string().optional(),
      },
    },
    async (input) =>
      runTool(
        async () => {
          const current = await clients.data.videos.list({
            id: [input.videoId],
            part: ["snippet"],
          });
          const existing = current.data.items?.[0]?.snippet;
          if (!existing) {
            throw new Error(`Video ${input.videoId} not found.`);
          }
          const res = await clients.data.videos.update({
            part: ["snippet"],
            requestBody: {
              id: input.videoId,
              snippet: {
                title: input.title ?? existing.title ?? "",
                description: input.description ?? existing.description,
                tags: input.tags ?? existing.tags,
                categoryId: input.categoryId ?? existing.categoryId ?? "22",
                defaultLanguage:
                  input.defaultLanguage ?? existing.defaultLanguage,
                defaultAudioLanguage:
                  input.defaultAudioLanguage ?? existing.defaultAudioLanguage,
              },
            },
          });
          return {
            id: res.data.id,
            title: res.data.snippet?.title,
            description: res.data.snippet?.description,
            tags: res.data.snippet?.tags,
            categoryId: res.data.snippet?.categoryId,
          };
        },
        toolJson,
      ),
  );
};
