import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import type { AddressInfo } from "node:net";
import { URL } from "node:url";
import { exec } from "node:child_process";
import { OAuth2Client } from "google-auth-library";
import { resolveScopes } from "./scopes.js";
import { loadTokens, saveTokens, type StoredTokens } from "./token-store.js";

interface ClientSecretFile {
  installed?: ClientSecretSection;
  web?: ClientSecretSection;
}

interface ClientSecretSection {
  client_id: string;
  client_secret: string;
  redirect_uris?: string[];
}

export interface OAuthOptions {
  clientSecretPath: string;
  enableMonetary?: boolean;
}

function readClientSecretSection(file: ClientSecretFile): ClientSecretSection {
  const section = file.installed ?? file.web;
  if (!section) {
    throw new Error(
      "client_secret.json must contain an 'installed' or 'web' section. " +
        "Create a Desktop app OAuth client in Google Cloud Console.",
    );
  }
  return section;
}

async function loadClientSecret(
  path: string,
): Promise<ClientSecretSection> {
  const raw = await readFile(path, "utf8");
  const parsed = JSON.parse(raw) as ClientSecretFile;
  return readClientSecretSection(parsed);
}

export async function getAuthorizedClient(
  options: OAuthOptions,
): Promise<OAuth2Client> {
  const tokens = await loadTokens();
  if (!tokens) {
    throw new Error(
      "No saved tokens found. Run `npx youtube-studio-mcp auth` to authorize.",
    );
  }
  const secret = await loadClientSecret(options.clientSecretPath);
  const client = new OAuth2Client({
    clientId: secret.client_id,
    clientSecret: secret.client_secret,
  });
  client.setCredentials({
    refresh_token: tokens.refresh_token,
    access_token: tokens.access_token,
    expiry_date: tokens.expiry_date,
    token_type: tokens.token_type,
    scope: tokens.scope,
  });
  client.on("tokens", (next) => {
    const merged: StoredTokens = {
      refresh_token: next.refresh_token ?? tokens.refresh_token,
      access_token: next.access_token ?? tokens.access_token,
      expiry_date: next.expiry_date ?? tokens.expiry_date,
      token_type: next.token_type ?? tokens.token_type,
      scope: next.scope ?? tokens.scope,
      saved_at: Date.now(),
    };
    saveTokens(merged).catch(() => {
      // Best effort. Library will retry refresh on next call.
    });
  });
  return client;
}

function openBrowser(url: string): void {
  const cmd =
    process.platform === "darwin"
      ? `open "${url}"`
      : process.platform === "win32"
        ? `start "" "${url}"`
        : `xdg-open "${url}"`;
  exec(cmd, () => {
    // Ignore: user can copy URL manually.
  });
}

export interface InteractiveAuthResult {
  scopes: string[];
  tokenPath: string;
}

export async function runInteractiveAuth(
  options: OAuthOptions,
): Promise<InteractiveAuthResult> {
  const secret = await loadClientSecret(options.clientSecretPath);
  const scopes = resolveScopes({
    enableMonetary: options.enableMonetary ?? false,
  });

  const { port, close, codePromise } = await bindLoopback();
  const redirectUri = `http://127.0.0.1:${port}`;
  const client = new OAuth2Client({
    clientId: secret.client_id,
    clientSecret: secret.client_secret,
    redirectUri,
  });
  const authUrl = client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: scopes,
  });

  process.stderr.write(
    `\nOpen this URL in your browser to authorize:\n\n  ${authUrl}\n\n`,
  );
  openBrowser(authUrl);

  let code: string;
  try {
    code = await codePromise;
  } finally {
    close();
  }

  const { tokens } = await client.getToken(code);
  if (!tokens.refresh_token) {
    throw new Error(
      "No refresh_token returned. Ensure prompt=consent and access_type=offline were applied, and revoke prior access at https://myaccount.google.com/permissions before retrying.",
    );
  }

  const stored: StoredTokens = {
    refresh_token: tokens.refresh_token,
    access_token: tokens.access_token ?? undefined,
    expiry_date: tokens.expiry_date ?? undefined,
    token_type: tokens.token_type ?? undefined,
    scope: tokens.scope ?? scopes.join(" "),
    saved_at: Date.now(),
  };
  const tokenPath = await saveTokens(stored);

  return { scopes, tokenPath };
}

interface BoundLoopback {
  port: number;
  close: () => void;
  codePromise: Promise<string>;
}

function bindLoopback(): Promise<BoundLoopback> {
  return new Promise((resolveBind, rejectBind) => {
    let resolveCode: (code: string) => void = () => {};
    let rejectCode: (err: Error) => void = () => {};
    const codePromise = new Promise<string>((res, rej) => {
      resolveCode = res;
      rejectCode = rej;
    });

    const server = createServer((req, res) => {
      if (!req.url) {
        res.writeHead(400).end("Missing URL");
        return;
      }
      const reqUrl = new URL(req.url, "http://127.0.0.1");
      const errParam = reqUrl.searchParams.get("error");
      if (errParam) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end(`Authorization failed: ${errParam}`);
        rejectCode(new Error(`OAuth error: ${errParam}`));
        return;
      }
      const codeParam = reqUrl.searchParams.get("code");
      if (codeParam) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(
          "<html><body style=\"font-family:sans-serif;padding:2rem\"><h2>Authorization successful.</h2><p>You can close this tab and return to your terminal.</p></body></html>",
        );
        resolveCode(codeParam);
      }
    });

    server.on("error", rejectBind);
    server.listen(0, "127.0.0.1", () => {
      const addr = server.address() as AddressInfo;
      resolveBind({
        port: addr.port,
        close: () => server.close(),
        codePromise,
      });
    });
  });
}
