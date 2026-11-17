import { runInteractiveAuth, type OAuthOptions } from "../auth/oauth.js";

export async function runAuthCommand(options: OAuthOptions): Promise<number> {
  try {
    const { scopes, tokenPath } = await runInteractiveAuth(options);
    process.stderr.write(
      `\n✓ Authorization complete.\n` +
        `  Token saved to: ${tokenPath}\n` +
        `  Granted scopes:\n${scopes.map((s) => `    - ${s}`).join("\n")}\n\n` +
        `You can now use youtube-studio-mcp from your MCP client.\n`,
    );
    return 0;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    process.stderr.write(`\nAuthorization failed: ${msg}\n`);
    return 1;
  }
}
