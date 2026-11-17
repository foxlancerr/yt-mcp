import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

export interface GoogleApiErrorShape {
  code?: number;
  message?: string;
  errors?: Array<{ reason?: string; message?: string }>;
  status?: string;
}

function asGoogleError(err: unknown): GoogleApiErrorShape | null {
  if (typeof err !== "object" || err === null) return null;
  const maybeResponse = (err as { response?: { data?: { error?: unknown } } })
    .response;
  const errorPayload = maybeResponse?.data?.error;
  if (errorPayload && typeof errorPayload === "object") {
    return errorPayload as GoogleApiErrorShape;
  }
  if ("code" in err || "message" in err) {
    return err as GoogleApiErrorShape;
  }
  return null;
}

export function formatGoogleError(err: unknown): string {
  const gerr = asGoogleError(err);
  if (gerr) {
    const reasons =
      gerr.errors
        ?.map((e) => e.reason ?? e.message)
        .filter((s): s is string => Boolean(s))
        .join(", ") ?? "";
    const status = gerr.status ?? gerr.code ?? "unknown";
    const message = gerr.message ?? "Unknown Google API error";
    return reasons
      ? `[${status}] ${message} (${reasons})`
      : `[${status}] ${message}`;
  }
  if (err instanceof Error) return err.message;
  return String(err);
}

export function toolError(message: string): CallToolResult {
  return {
    isError: true,
    content: [{ type: "text", text: message }],
  };
}

export function toolText(text: string): CallToolResult {
  return {
    content: [{ type: "text", text }],
  };
}

export function toolJson(value: unknown): CallToolResult {
  return {
    content: [
      { type: "text", text: JSON.stringify(value, null, 2) },
    ],
  };
}

export async function runTool<T>(
  fn: () => Promise<T>,
  onSuccess: (value: T) => CallToolResult,
): Promise<CallToolResult> {
  try {
    const value = await fn();
    return onSuccess(value);
  } catch (err) {
    return toolError(formatGoogleError(err));
  }
}
