import { runTool, toolJson } from "../../lib/errors.js";
import type { ToolRegistrar } from "../types.js";

export const registerListChannelSections: ToolRegistrar = (
  server,
  { clients },
) => {
  server.registerTool(
    "list_channel_sections",
    {
      title: "List channel sections",
      description:
        "List the sections shown on the authenticated channel's homepage (e.g. 'Recent uploads', 'Popular videos', custom playlists).",
      inputSchema: {},
    },
    async () =>
      runTool(
        async () => {
          const res = await clients.data.channelSections.list({
            mine: true,
            part: ["snippet", "contentDetails"],
          });
          return (res.data.items ?? []).map((s) => ({
            id: s.id,
            type: s.snippet?.type,
            style: s.snippet?.style,
            title: s.snippet?.title,
            position: s.snippet?.position,
            playlists: s.contentDetails?.playlists,
            channels: s.contentDetails?.channels,
          }));
        },
        toolJson,
      ),
  );
};
