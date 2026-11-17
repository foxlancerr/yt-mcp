import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ToolContext } from "./types.js";

import { registerGetMyChannel } from "./channel/get-my-channel.js";
import { registerUpdateChannelBranding } from "./channel/update-channel-branding.js";
import { registerListChannelSections } from "./channel/list-channel-sections.js";

import { registerListCommentThreads } from "./comments/list-comment-threads.js";
import { registerListCommentReplies } from "./comments/list-comment-replies.js";
import { registerReplyToComment } from "./comments/reply-to-comment.js";
import { registerPostVideoComment } from "./comments/post-video-comment.js";
import { registerUpdateComment } from "./comments/update-comment.js";
import { registerDeleteComment } from "./comments/delete-comment.js";
import { registerModerateComment } from "./comments/moderate-comment.js";
import { registerMarkCommentAsSpam } from "./comments/mark-comment-as-spam.js";

import { registerListMyPlaylists } from "./playlists/list-my-playlists.js";
import { registerCreatePlaylist } from "./playlists/create-playlist.js";
import { registerUpdatePlaylist } from "./playlists/update-playlist.js";
import { registerManagePlaylistItems } from "./playlists/manage-playlist-items.js";

import { registerGetChannelOverview } from "./analytics/get-channel-overview.js";
import { registerGetTopVideos } from "./analytics/get-top-videos.js";
import { registerGetVideoPerformance } from "./analytics/get-video-performance.js";
import { registerGetAudienceDemographics } from "./analytics/get-audience-demographics.js";
import { registerGetTrafficSources } from "./analytics/get-traffic-sources.js";
import { registerGetRevenueBreakdown } from "./analytics/get-revenue-breakdown.js";
import { registerQueryAnalyticsRaw } from "./analytics/query-analytics-raw.js";

import { registerListMyVideos } from "./videos/list-my-videos.js";
import { registerGetVideoDetails } from "./videos/get-video-details.js";
import { registerUpdateVideoMetadata } from "./videos/update-video-metadata.js";
import { registerUpdateVideoStatus } from "./videos/update-video-status.js";
import { registerSetVideoThumbnail } from "./videos/set-video-thumbnail.js";
import { registerDeleteVideo } from "./videos/delete-video.js";
import { registerUploadVideo } from "./videos/upload-video.js";
import { registerListCaptions } from "./videos/list-captions.js";
import { registerDownloadCaption } from "./videos/download-caption.js";
import { registerUploadCaption } from "./videos/upload-caption.js";
import { registerSetLocalizations } from "./videos/set-localizations.js";

const registrars = [
  registerGetMyChannel,
  registerUpdateChannelBranding,
  registerListChannelSections,

  registerListCommentThreads,
  registerListCommentReplies,
  registerReplyToComment,
  registerPostVideoComment,
  registerUpdateComment,
  registerDeleteComment,
  registerModerateComment,
  registerMarkCommentAsSpam,

  registerListMyPlaylists,
  registerCreatePlaylist,
  registerUpdatePlaylist,
  registerManagePlaylistItems,

  registerGetChannelOverview,
  registerGetTopVideos,
  registerGetVideoPerformance,
  registerGetAudienceDemographics,
  registerGetTrafficSources,
  registerGetRevenueBreakdown,
  registerQueryAnalyticsRaw,

  registerListMyVideos,
  registerGetVideoDetails,
  registerUpdateVideoMetadata,
  registerUpdateVideoStatus,
  registerSetVideoThumbnail,
  registerDeleteVideo,
  registerUploadVideo,
  registerListCaptions,
  registerDownloadCaption,
  registerUploadCaption,
  registerSetLocalizations,
];

export function registerAllTools(server: McpServer, ctx: ToolContext): void {
  for (const register of registrars) {
    register(server, ctx);
  }
}
