import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { YouTubeClients } from "../clients/youtube.js";

export interface ToolContext {
  clients: YouTubeClients;
}

export type ToolRegistrar = (server: McpServer, ctx: ToolContext) => void;
