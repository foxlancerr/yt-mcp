import { z } from "zod";
import { runTool, toolJson, toolText } from "../../lib/errors.js";
import { playlistIdSchema, videoIdSchema } from "../../schemas/common.js";
import type { ToolRegistrar } from "../types.js";

export const registerManagePlaylistItems: ToolRegistrar = (
  server,
  { clients },
) => {
  server.registerTool(
    "manage_playlist_items",
    {
      title: "Add, remove, or reorder playlist items",
      description:
        "Single tool for playlist item operations. Actions: 'add' inserts a video; 'remove' deletes a playlistItem by id; 'reorder' moves an item to a new position; 'list' returns current items.",
      inputSchema: {
        playlistId: playlistIdSchema,
        action: z.enum(["add", "remove", "reorder", "list"]),
        videoId: videoIdSchema
          .optional()
          .describe("Required when action='add'."),
        position: z
          .number()
          .int()
          .min(0)
          .optional()
          .describe(
            "0-based position. Optional when action='add' (defaults to end). Required when action='reorder'.",
          ),
        playlistItemId: z
          .string()
          .optional()
          .describe(
            "PlaylistItem ID (not video ID). Required when action='remove' or action='reorder'.",
          ),
        maxResults: z.number().int().min(1).max(50).optional(),
        pageToken: z.string().optional(),
      },
    },
    async ({
      playlistId,
      action,
      videoId,
      position,
      playlistItemId,
      maxResults,
      pageToken,
    }) =>
      runTool(
        async () => {
          if (action === "list") {
            const res = await clients.data.playlistItems.list({
              playlistId,
              part: ["snippet", "contentDetails", "status"],
              maxResults: maxResults ?? 25,
              pageToken,
            });
            return {
              kind: "list" as const,
              items: (res.data.items ?? []).map((it) => ({
                id: it.id,
                position: it.snippet?.position,
                videoId: it.snippet?.resourceId?.videoId,
                title: it.snippet?.title,
                channelTitle: it.snippet?.videoOwnerChannelTitle,
                privacyStatus: it.status?.privacyStatus,
              })),
              nextPageToken: res.data.nextPageToken ?? undefined,
            };
          }
          if (action === "add") {
            if (!videoId) {
              throw new Error("`videoId` is required when action='add'.");
            }
            const res = await clients.data.playlistItems.insert({
              part: ["snippet"],
              requestBody: {
                snippet: {
                  playlistId,
                  position,
                  resourceId: { kind: "youtube#video", videoId },
                },
              },
            });
            return {
              kind: "added" as const,
              id: res.data.id,
              position: res.data.snippet?.position,
              videoId: res.data.snippet?.resourceId?.videoId,
            };
          }
          if (action === "remove") {
            if (!playlistItemId) {
              throw new Error(
                "`playlistItemId` is required when action='remove'.",
              );
            }
            await clients.data.playlistItems.delete({ id: playlistItemId });
            return { kind: "removed" as const, id: playlistItemId };
          }
          // reorder
          if (!playlistItemId || position === undefined) {
            throw new Error(
              "`playlistItemId` and `position` are required when action='reorder'.",
            );
          }
          const current = await clients.data.playlistItems.list({
            id: [playlistItemId],
            part: ["snippet"],
          });
          const existing = current.data.items?.[0];
          if (!existing?.snippet?.resourceId) {
            throw new Error(`Playlist item ${playlistItemId} not found.`);
          }
          const res = await clients.data.playlistItems.update({
            part: ["snippet"],
            requestBody: {
              id: playlistItemId,
              snippet: {
                playlistId,
                position,
                resourceId: existing.snippet.resourceId,
              },
            },
          });
          return {
            kind: "reordered" as const,
            id: res.data.id,
            position: res.data.snippet?.position,
          };
        },
        (value) =>
          value.kind === "removed"
            ? toolText(`Removed playlist item ${value.id}.`)
            : toolJson(value),
      ),
  );
};
