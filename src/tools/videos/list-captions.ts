import { runTool, toolJson } from "../../lib/errors.js";
import { videoIdSchema } from "../../schemas/common.js";
import type { ToolRegistrar } from "../types.js";

export const registerListCaptions: ToolRegistrar = (server, { clients }) => {
  server.registerTool(
    "list_captions",
    {
      title: "List captions for a video",
      description:
        "Return all caption tracks (subtitles) attached to a video, including auto-generated ones.",
      inputSchema: {
        videoId: videoIdSchema,
      },
    },
    async ({ videoId }) =>
      runTool(
        async () => {
          const res = await clients.data.captions.list({
            videoId,
            part: ["snippet"],
          });
          return (res.data.items ?? []).map((c) => ({
            id: c.id,
            language: c.snippet?.language,
            name: c.snippet?.name,
            trackKind: c.snippet?.trackKind,
            status: c.snippet?.status,
            isDraft: c.snippet?.isDraft,
            isAutoSynced: c.snippet?.isAutoSynced,
            isCC: c.snippet?.isCC,
            lastUpdated: c.snippet?.lastUpdated,
          }));
        },
        toolJson,
      ),
  );
};
