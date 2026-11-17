import { runTool, toolError, toolJson } from "../../lib/errors.js";
import type { ToolRegistrar } from "../types.js";

export const registerGetMyChannel: ToolRegistrar = (server, { clients }) => {
  server.registerTool(
    "get_my_channel",
    {
      title: "Get my YouTube channel",
      description:
        "Returns the authenticated user's channel: id, title, description, statistics (subs, views, video count), branding, and default language. No arguments.",
      inputSchema: {},
    },
    async () =>
      runTool(
        async () => {
          const res = await clients.data.channels.list({
            mine: true,
            part: ["snippet", "statistics", "brandingSettings", "status", "contentDetails"],
          });
          const channel = res.data.items?.[0];
          if (!channel) {
            throw new Error(
              "No channel found for the authenticated user. The Google account may not have a YouTube channel yet.",
            );
          }
          return {
            id: channel.id,
            title: channel.snippet?.title,
            description: channel.snippet?.description,
            customUrl: channel.snippet?.customUrl,
            publishedAt: channel.snippet?.publishedAt,
            country: channel.snippet?.country,
            statistics: channel.statistics,
            uploadsPlaylistId:
              channel.contentDetails?.relatedPlaylists?.uploads,
            status: channel.status,
            branding: channel.brandingSettings,
          };
        },
        (value) => toolJson(value),
      ).catch((err: Error) => toolError(err.message)),
  );
};
