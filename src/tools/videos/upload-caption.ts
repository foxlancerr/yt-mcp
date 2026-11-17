import { createReadStream } from "node:fs";
import { Readable } from "node:stream";
import { z } from "zod";
import { runTool, toolJson } from "../../lib/errors.js";
import { videoIdSchema } from "../../schemas/common.js";
import type { ToolRegistrar } from "../types.js";

export const registerUploadCaption: ToolRegistrar = (server, { clients }) => {
  server.registerTool(
    "upload_caption",
    {
      title: "Upload a caption track",
      description:
        "Attach a new caption track to a video from an SRT/VTT/SBV file. Provide either filePath or text content directly.",
      inputSchema: {
        videoId: videoIdSchema,
        language: z
          .string()
          .describe("BCP-47 language tag, e.g. 'en', 'es-AR'."),
        name: z
          .string()
          .min(1)
          .max(150)
          .describe(
            "Display name for the caption track (e.g. 'English (manual)').",
          ),
        filePath: z
          .string()
          .optional()
          .describe("Path to SRT/VTT/SBV file."),
        text: z
          .string()
          .optional()
          .describe("Caption content as a string (alternative to filePath)."),
        isDraft: z.boolean().default(false),
      },
    },
    async (input) =>
      runTool(
        async () => {
          if ((!input.filePath && !input.text) || (input.filePath && input.text)) {
            throw new Error("Provide exactly one of `filePath` or `text`.");
          }
          const body: Readable = input.filePath
            ? createReadStream(input.filePath)
            : Readable.from([input.text!]);
          const res = await clients.data.captions.insert({
            part: ["snippet"],
            requestBody: {
              snippet: {
                videoId: input.videoId,
                language: input.language,
                name: input.name,
                isDraft: input.isDraft,
              },
            },
            media: { body, mimeType: "application/octet-stream" },
          });
          return {
            id: res.data.id,
            language: res.data.snippet?.language,
            name: res.data.snippet?.name,
            status: res.data.snippet?.status,
          };
        },
        toolJson,
      ),
  );
};
