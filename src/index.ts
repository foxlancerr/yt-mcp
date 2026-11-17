import { runAuthCommand } from "./cli/auth.js";
import { startServer } from "./server.js";

interface CliOptions {
  command: "serve" | "auth" | "help";
}

function parseArgs(argv: string[]): CliOptions {
  const [, , subcommand] = argv;
  if (!subcommand || subcommand === "serve") return { command: "serve" };
  if (subcommand === "auth") return { command: "auth" };
  if (subcommand === "-h" || subcommand === "--help" || subcommand === "help") {
    return { command: "help" };
  }
  return { command: "help" };
}

function printHelp(): void {
  process.stderr.write(
    `youtube-studio-mcp\n\n` +
      `Usage:\n` +
      `  youtube-studio-mcp           Start the MCP server over stdio.\n` +
      `  youtube-studio-mcp auth      Run the interactive OAuth flow.\n` +
      `  youtube-studio-mcp help      Show this help.\n\n` +
      `Environment:\n` +
      `  YOUTUBE_OAUTH_CLIENT_PATH  Path to client_secret.json (required).\n` +
      `  YOUTUBE_TOKEN_PATH         Override token storage location (optional).\n` +
      `  ENABLE_MONETARY            Set to 'true' to request revenue scope.\n`,
  );
}

function readEnv(): { clientSecretPath: string; enableMonetary: boolean } {
  const clientSecretPath = process.env.YOUTUBE_OAUTH_CLIENT_PATH;
  if (!clientSecretPath) {
    throw new Error(
      "YOUTUBE_OAUTH_CLIENT_PATH is required. Set it to the absolute path of your Google OAuth client_secret.json.",
    );
  }
  return {
    clientSecretPath,
    enableMonetary: process.env.ENABLE_MONETARY === "true",
  };
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv);

  if (args.command === "help") {
    printHelp();
    process.exit(0);
  }

  const env = readEnv();

  if (args.command === "auth") {
    const code = await runAuthCommand(env);
    process.exit(code);
  }

  await startServer(env);
}

main().catch((err) => {
  const message = err instanceof Error ? err.message : String(err);
  process.stderr.write(`\nyoutube-studio-mcp error: ${message}\n`);
  process.exit(1);
});
