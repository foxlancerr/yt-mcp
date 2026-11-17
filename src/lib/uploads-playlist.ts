import type { DataApi } from "../clients/youtube.js";

let cached: string | null = null;

export async function getUploadsPlaylistId(data: DataApi): Promise<string> {
  if (cached) return cached;
  const res = await data.channels.list({
    mine: true,
    part: ["contentDetails"],
  });
  const id = res.data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
  if (!id) {
    throw new Error(
      "Could not resolve the uploads playlist. Does the authenticated account have a YouTube channel?",
    );
  }
  cached = id;
  return id;
}

export function resetUploadsPlaylistCache(): void {
  cached = null;
}
