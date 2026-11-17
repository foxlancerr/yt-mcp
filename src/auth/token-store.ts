import { mkdir, readFile, writeFile, chmod } from "node:fs/promises";
import { dirname, join } from "node:path";
import { homedir } from "node:os";

export interface StoredTokens {
  refresh_token: string;
  access_token?: string;
  expiry_date?: number;
  token_type?: string;
  scope?: string;
  saved_at: number;
}

function defaultTokenPath(): string {
  const xdg = process.env.XDG_CONFIG_HOME;
  const base = xdg ?? join(homedir(), ".config");
  return join(base, "youtube-studio-mcp", "tokens.json");
}

export function getTokenPath(): string {
  return process.env.YOUTUBE_TOKEN_PATH ?? defaultTokenPath();
}

export async function loadTokens(): Promise<StoredTokens | null> {
  const path = getTokenPath();
  try {
    const raw = await readFile(path, "utf8");
    return JSON.parse(raw) as StoredTokens;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw err;
  }
}

export async function saveTokens(tokens: StoredTokens): Promise<string> {
  const path = getTokenPath();
  await mkdir(dirname(path), { recursive: true, mode: 0o700 });
  await writeFile(path, JSON.stringify(tokens, null, 2), {
    mode: 0o600,
  });
  await chmod(path, 0o600);
  return path;
}
