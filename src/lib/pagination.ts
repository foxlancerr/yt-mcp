export interface PaginatedResponse<T> {
  items: T[];
  nextPageToken?: string;
  prevPageToken?: string;
  totalResults?: number;
}

export function shapePage<T, R>(
  response: {
    items?: T[] | null;
    nextPageToken?: string | null;
    prevPageToken?: string | null;
    pageInfo?: { totalResults?: number | null };
  },
  transform: (item: T) => R,
): PaginatedResponse<R> {
  return {
    items: (response.items ?? []).map(transform),
    nextPageToken: response.nextPageToken ?? undefined,
    prevPageToken: response.prevPageToken ?? undefined,
    totalResults: response.pageInfo?.totalResults ?? undefined,
  };
}
