import { z } from "zod";
import { runTool, toolText } from "../../lib/errors.js";
import type { ToolRegistrar } from "../types.js";

export const registerDownloadCaption: ToolRegistrar = (
  server,
  { clients },
) => {
  server.registerTool(
    "download_caption",
    {
      title: "Download a caption track",
      description:
        "Download the text of a caption track. Returns SRT by default. Note: third-party caption tracks may not be downloadable via API.",
      inputSchema: {
        captionId: z
          .string()
          .describe("Caption ID from `list_captions`."),
        format: z.enum(["srt", "vtt", "sbv"]).default("srt"),
        translateTo: z
          .string()
          .optional()
          .describe(
            "Optional BCP-47 language tag to machine-translate the track to.",
          ),
      },
    },
    async ({ captionId, format, translateTo }) =>
      runTool(
        async () => {
          const res = await clients.data.captions.download({
            id: captionId,
            tfmt: format,
            tlang: translateTo,
          });
          if (typeof res.data === "string") return res.data;
          if (Buffer.isBuffer(res.data)) return res.data.toString("utf8");
          return String(res.data);
        },
        (text) => toolText(text),
      ),
  );
};
