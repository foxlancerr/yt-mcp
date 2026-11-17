import { google, youtube_v3, youtubeAnalytics_v2 } from "googleapis";
import type { OAuth2Client } from "google-auth-library";

export interface YouTubeClients {
  data: youtube_v3.Youtube;
  analytics: youtubeAnalytics_v2.Youtubeanalytics;
}

export function buildClients(auth: OAuth2Client): YouTubeClients {
  return {
    data: google.youtube({ version: "v3", auth }),
    analytics: google.youtubeAnalytics({ version: "v2", auth }),
  };
}

export type DataApi = youtube_v3.Youtube;
export type AnalyticsApi = youtubeAnalytics_v2.Youtubeanalytics;
