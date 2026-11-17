import { runTool, toolJson } from "../../lib/errors.js";
import { getUploadsPlaylistId } from "../../lib/uploads-playlist.js";
import { shapePage } from "../../lib/pagination.js";
import {
  maxResultsSchema,
  pageTokenSchema,
} from "../../schemas/common.js";
import type { ToolRegistrar } from "../types.js";

export const registerListMyVideos: ToolRegistrar = (server, { clients }) => {
  server.registerTool(
    "list_my_videos",
    {
      title: "List my videos",
      description:
        "List videos uploaded by the authenticated channel (newest first). Returns video IDs plus minimal snippet. Use `get_video_details` for full info.",
      inputSchema: {
        maxResults: maxResultsSchema,
        pageToken: pageTokenSchema,
      },
    },
    async ({ maxResults, pageToken }) =>
      runTool(
        async () => {
          const uploadsId = await getUploadsPlaylistId(clients.data);
          const res = await clients.data.playlistItems.list({
            playlistId: uploadsId,
            part: ["snippet", "contentDetails", "status"],
            maxResults: maxResults ?? 25,
            pageToken,
          });
          return shapePage(res.data, (item) => ({
            videoId: item.contentDetails?.videoId,
            title: item.snippet?.title,
            description: item.snippet?.description?.slice(0, 200),
            publishedAt: item.contentDetails?.videoPublishedAt,
            privacyStatus: item.status?.privacyStatus,
            thumbnailUrl:
              item.snippet?.thumbnails?.high?.url ??
              item.snippet?.thumbnails?.default?.url,
          }));
        },
        toolJson,
      ),
  );
};
