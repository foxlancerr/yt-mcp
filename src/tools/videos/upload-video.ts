import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { Readable } from "node:stream";
import { z } from "zod";
import { runTool, toolJson } from "../../lib/errors.js";
import type { ToolRegistrar } from "../types.js";

async function streamFromInput(
  path: string | undefined,
  url: string | undefined,
): Promise<{ body: Readable; mimeType: string; size?: number }> {
  if ((!path && !url) || (path && url)) {
    throw new Error("Provide exactly one of `filePath` or `fileUrl`.");
  }
  if (path) {
    const stats = await stat(path);
    return {
      body: createReadStream(path),
      mimeType: "video/*",
      size: stats.size,
    };
  }
  const res = await fetch(url!);
  if (!res.ok || !res.body) {
    throw new Error(`Failed to fetch video from URL: ${res.status}`);
  }
  return {
    body: Readable.fromWeb(res.body as never),
    mimeType:
      res.headers.get("content-type")?.split(";")[0]?.trim() ?? "video/*",
  };
}

export const registerUploadVideo: ToolRegistrar = (server, { clients }) => {
  server.registerTool(
    "upload_video",
    {
      title: "Upload a video (resumable)",
      description:
        "Upload a video to the authenticated channel. Supports local file path or HTTPS URL. Costs 1600 quota units per upload (expensive — use sparingly).",
      inputSchema: {
        filePath: z
          .string()
          .optional()
          .describe("Absolute local path to the video file."),
        fileUrl: z
          .string()
          .url()
          .optional()
          .describe("HTTPS URL to download the video from."),
        title: z.string().min(1).max(100),
        description: z.string().max(5000).optional(),
        tags: z.array(z.string()).max(500).optional(),
        categoryId: z
          .string()
          .default("22")
          .describe(
            "YouTube video category id. Default '22' = People & Blogs.",
          ),
        privacyStatus: z
          .enum(["private", "unlisted", "public"])
          .default("private"),
        publishAt: z
          .string()
          .optional()
          .describe(
            "RFC3339 datetime to schedule publication (only with privacyStatus='private').",
          ),
        madeForKids: z.boolean().default(false),
        defaultLanguage: z.string().optional(),
        defaultAudioLanguage: z.string().optional(),
        notifySubscribers: z.boolean().default(true),
      },
    },
    async (input) =>
      runTool(
        async () => {
          const { body, mimeType } = await streamFromInput(
            input.filePath,
            input.fileUrl,
          );
          const res = await clients.data.videos.insert({
            part: ["snippet", "status"],
            notifySubscribers: input.notifySubscribers,
            requestBody: {
              snippet: {
                title: input.title,
                description: input.description,
                tags: input.tags,
                categoryId: input.categoryId,
                defaultLanguage: input.defaultLanguage,
                defaultAudioLanguage: input.defaultAudioLanguage,
              },
              status: {
                privacyStatus: input.privacyStatus,
                publishAt: input.publishAt,
                madeForKids: input.madeForKids,
                selfDeclaredMadeForKids: input.madeForKids,
              },
            },
            media: { body, mimeType },
          });
          return {
            id: res.data.id,
            title: res.data.snippet?.title,
            privacyStatus: res.data.status?.privacyStatus,
            uploadStatus: res.data.status?.uploadStatus,
            url: res.data.id
              ? `https://youtu.be/${res.data.id}`
              : undefined,
          };
        },
        toolJson,
      ),
  );
};
