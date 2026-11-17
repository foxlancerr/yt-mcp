import { z } from "zod";
import { runTool, toolJson } from "../../lib/errors.js";
import { playlistIdSchema } from "../../schemas/common.js";
import type { ToolRegistrar } from "../types.js";

export const registerUpdatePlaylist: ToolRegistrar = (server, { clients }) => {
  server.registerTool(
    "update_playlist",
    {
      title: "Update a playlist",
      description:
        "Update playlist title, description, tags, and/or privacy. Only provided fields are changed; YouTube requires re-sending snippet.title, so we read the current playlist first.",
      inputSchema: {
        playlistId: playlistIdSchema,
        title: z.string().min(1).max(150).optional(),
        description: z.string().max(5000).optional(),
        tags: z.array(z.string()).max(50).optional(),
        privacyStatus: z.enum(["private", "unlisted", "public"]).optional(),
      },
    },
    async ({ playlistId, title, description, tags, privacyStatus }) =>
      runTool(
        async () => {
          const current = await clients.data.playlists.list({
            id: [playlistId],
            part: ["snippet", "status"],
          });
          const existing = current.data.items?.[0];
          if (!existing) {
            throw new Error(`Playlist ${playlistId} not found.`);
          }
          const res = await clients.data.playlists.update({
            part: ["snippet", "status"],
            requestBody: {
              id: playlistId,
              snippet: {
                title: title ?? existing.snippet?.title ?? "Untitled",
                description: description ?? existing.snippet?.description,
                tags: tags ?? existing.snippet?.tags,
                defaultLanguage: existing.snippet?.defaultLanguage,
              },
              status: {
                privacyStatus:
                  privacyStatus ?? existing.status?.privacyStatus ?? "private",
              },
            },
          });
          return {
            id: res.data.id,
            title: res.data.snippet?.title,
            description: res.data.snippet?.description,
            tags: res.data.snippet?.tags,
            privacyStatus: res.data.status?.privacyStatus,
          };
        },
        toolJson,
      ),
  );
};
