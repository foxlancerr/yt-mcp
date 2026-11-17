import { runTool, toolJson } from "../../lib/errors.js";
import { shapePage } from "../../lib/pagination.js";
import {
  maxResultsSchema,
  pageTokenSchema,
} from "../../schemas/common.js";
import type { ToolRegistrar } from "../types.js";

export const registerListMyPlaylists: ToolRegistrar = (
  server,
  { clients },
) => {
  server.registerTool(
    "list_my_playlists",
    {
      title: "List my playlists",
      description: "List playlists owned by the authenticated channel.",
      inputSchema: {
        maxResults: maxResultsSchema,
        pageToken: pageTokenSchema,
      },
    },
    async ({ maxResults, pageToken }) =>
      runTool(
        async () => {
          const res = await clients.data.playlists.list({
            mine: true,
            part: ["snippet", "status", "contentDetails"],
            maxResults: maxResults ?? 25,
            pageToken,
          });
          return shapePage(res.data, (pl) => ({
            id: pl.id,
            title: pl.snippet?.title,
            description: pl.snippet?.description,
            itemCount: pl.contentDetails?.itemCount,
            privacyStatus: pl.status?.privacyStatus,
            publishedAt: pl.snippet?.publishedAt,
            thumbnailUrl:
              pl.snippet?.thumbnails?.high?.url ??
              pl.snippet?.thumbnails?.default?.url,
          }));
        },
        toolJson,
      ),
  );
};
