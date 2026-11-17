import type { AnalyticsApi } from "../clients/youtube.js";

export interface RawAnalyticsRow {
  [column: string]: string | number;
}

export interface RawAnalyticsResult {
  startDate: string;
  endDate: string;
  columns: string[];
  rows: RawAnalyticsRow[];
}

export interface QueryAnalyticsParams {
  startDate: string;
  endDate: string;
  metrics: string;
  dimensions?: string;
  filters?: string;
  sort?: string;
  maxResults?: number;
  currency?: string;
  ids?: string;
}

export async function queryAnalytics(
  analytics: AnalyticsApi,
  params: QueryAnalyticsParams,
): Promise<RawAnalyticsResult> {
  const res = await analytics.reports.query({
    ids: params.ids ?? "channel==MINE",
    startDate: params.startDate,
    endDate: params.endDate,
    metrics: params.metrics,
    dimensions: params.dimensions,
    filters: params.filters,
    sort: params.sort,
    maxResults: params.maxResults,
    currency: params.currency,
  });
  const columns =
    res.data.columnHeaders?.map((h) => h.name).filter((n): n is string =>
      Boolean(n),
    ) ?? [];
  const rows: RawAnalyticsRow[] = (res.data.rows ?? []).map((row) => {
    const obj: RawAnalyticsRow = {};
    columns.forEach((col, i) => {
      const cell = (row as Array<string | number>)[i];
      if (cell !== undefined) obj[col] = cell;
    });
    return obj;
  });
  return {
    startDate: params.startDate,
    endDate: params.endDate,
    columns,
    rows,
  };
}
