export const SCOPES = {
  youtube: "https://www.googleapis.com/auth/youtube",
  youtubeForceSsl: "https://www.googleapis.com/auth/youtube.force-ssl",
  youtubeUpload: "https://www.googleapis.com/auth/youtube.upload",
  analyticsReadonly: "https://www.googleapis.com/auth/yt-analytics.readonly",
  analyticsMonetaryReadonly:
    "https://www.googleapis.com/auth/yt-analytics-monetary.readonly",
} as const;

export function resolveScopes(options: { enableMonetary: boolean }): string[] {
  const base: string[] = [
    SCOPES.youtube,
    SCOPES.youtubeForceSsl,
    SCOPES.youtubeUpload,
    SCOPES.analyticsReadonly,
  ];
  if (options.enableMonetary) {
    base.push(SCOPES.analyticsMonetaryReadonly);
  }
  return base;
}
