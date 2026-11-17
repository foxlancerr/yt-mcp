import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { Readable } from "node:stream";
import { z } from "zod";
import { runTool, toolJson } from "../../lib/errors.js";
import { videoIdSchema } from "../../schemas/common.js";
import type { ToolRegistrar } from "../types.js";

function mimeFromExt(path: string): string {
  const lower = path.toLowerCase();
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".gif")) return "image/gif";
  return "image/jpeg";
}

async function fetchAsStream(
  url: string,
): Promise<{ body: Readable; mimeType: string }> {
  const res = await fetch(url);
  if (!res.ok || !res.body) {
    throw new Error(`Failed to fetch thumbnail from URL: ${res.status}`);
  }
  const mimeType =
    res.headers.get("content-type")?.split(";")[0]?.trim() ?? "image/jpeg";
  return { body: Readable.fromWeb(res.body as never), mimeType };
}

export const registerSetVideoThumbnail: ToolRegistrar = (
  server,
  { clients },
) => {
  server.registerTool(
    "set_video_thumbnail",
    {
      title: "Set a custom video thumbnail",
      description:
        "Upload a custom thumbnail for a video from a local file path or remote URL. JPG / PNG / GIF up to 2MB. Costs 50 quota units.",
      inputSchema: {
        videoId: videoIdSchema,
        imagePath: z
          .string()
          .optional()
          .describe("Absolute local file path. Mutually exclusive with imageUrl."),
        imageUrl: z
          .string()
          .url()
          .optional()
          .describe("HTTPS URL to download the image from."),
      },
    },
    async ({ videoId, imagePath, imageUrl }) =>
      runTool(
        async () => {
          if ((!imagePath && !imageUrl) || (imagePath && imageUrl)) {
            throw new Error(
              "Provide exactly one of `imagePath` or `imageUrl`.",
            );
          }
          let body: Readable;
          let mimeType: string;
          if (imagePath) {
            const stats = await stat(imagePath);
            if (stats.size > 2 * 1024 * 1024) {
              throw new Error(
                "Thumbnail file exceeds 2MB. YouTube rejects larger files.",
              );
            }
            body = createReadStream(imagePath);
            mimeType = mimeFromExt(imagePath);
          } else {
            const fetched = await fetchAsStream(imageUrl!);
            body = fetched.body;
            mimeType = fetched.mimeType;
          }
          const res = await clients.data.thumbnails.set({
            videoId,
            media: { body, mimeType },
          });
          return {
            videoId,
            thumbnails: res.data.items?.[0],
          };
        },
        toolJson,
      ),
  );
};
