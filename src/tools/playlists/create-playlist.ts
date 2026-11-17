import { z } from "zod";
import { runTool, toolJson } from "../../lib/errors.js";
import type { ToolRegistrar } from "../types.js";

export const registerCreatePlaylist: ToolRegistrar = (server, { clients }) => {
  server.registerTool(
    "create_playlist",
    {
      title: "Create a playlist",
      description: "Create a new playlist on the authenticated channel.",
      inputSchema: {
        title: z.string().min(1).max(150),
        description: z.string().max(5000).optional(),
        privacyStatus: z
          .enum(["private", "unlisted", "public"])
          .default("private"),
        tags: z.array(z.string()).max(50).optional(),
        defaultLanguage: z
          .string()
          .optional()
          .describe("BCP-47 language tag, e.g. 'en' or 'es-AR'."),
      },
    },
    async ({ title, description, privacyStatus, tags, defaultLanguage }) =>
      runTool(
        async () => {
          const res = await clients.data.playlists.insert({
            part: ["snippet", "status"],
            requestBody: {
              snippet: { title, description, tags, defaultLanguage },
              status: { privacyStatus },
            },
          });
          return {
            id: res.data.id,
            title: res.data.snippet?.title,
            privacyStatus: res.data.status?.privacyStatus,
            publishedAt: res.data.snippet?.publishedAt,
          };
        },
        toolJson,
      ),
  );
};
