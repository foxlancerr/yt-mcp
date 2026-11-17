import { z } from "zod";

export const videoIdSchema = z
  .string()
  .min(8)
  .describe("YouTube video ID (e.g. 'dQw4w9WgXcQ').");

export const channelIdSchema = z
  .string()
  .min(8)
  .describe("YouTube channel ID (starts with 'UC...').");

export const playlistIdSchema = z
  .string()
  .min(8)
  .describe("YouTube playlist ID.");

export const commentIdSchema = z
  .string()
  .min(8)
  .describe("YouTube comment ID.");

export const pageTokenSchema = z
  .string()
  .optional()
  .describe("Opaque pagination token from a previous response's nextPageToken.");

export const maxResultsSchema = z
  .number()
  .int()
  .min(1)
  .max(100)
  .optional()
  .describe("Max items per page (1-100, default 25).");

export const dateRangeSchema = z
  .string()
  .describe(
    "Date range: preset ('last_7_days', 'last_14_days', 'last_28_days', 'last_30_days', 'last_90_days', 'last_365_days') or 'YYYY-MM-DD..YYYY-MM-DD'.",
  );
