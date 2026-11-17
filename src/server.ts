import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { getAuthorizedClient, type OAuthOptions } from "./auth/oauth.js";
import { buildClients } from "./clients/youtube.js";
import { registerAllTools } from "./tools/index.js";

export interface ServerOptions extends OAuthOptions {
  name?: string;
  version?: string;
}

export async function startServer(options: ServerOptions): Promise<void> {
  const auth = await getAuthorizedClient(options);
  const clients = buildClients(auth);

  const server = new McpServer({
    name: options.name ?? "youtube-studio-mcp",
    version: options.version ?? "0.1.0",
  });

  registerAllTools(server, { clients });

  const transport = new StdioServerTransport();
  await server.connect(transport);
}
