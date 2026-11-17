import { runTool, toolText } from "../../lib/errors.js";
import { videoIdSchema } from "../../schemas/common.js";
import type { ToolRegistrar } from "../types.js";

export const registerDeleteVideo: ToolRegistrar = (server, { clients }) => {
  server.registerTool(
    "delete_video",
    {
      title: "Delete a video",
      description:
        "Permanently delete a video from the authenticated channel. Irreversible. Costs 50 quota units.",
      inputSchema: {
        videoId: videoIdSchema,
      },
    },
    async ({ videoId }) =>
      runTool(
        async () => {
          await clients.data.videos.delete({ id: videoId });
          return videoId;
        },
        (id) => toolText(`Video ${id} deleted.`),
      ),
  );
};
