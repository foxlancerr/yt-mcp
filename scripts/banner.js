#!/usr/bin/env node
// Prepends the CLI shebang to dist/index.js after tsc emit.
// (tsup used to add this via its banner option, but tsup/rollup's native
// binary is blocked by Windows Application Control on this machine.)
import { readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, "..", "dist", "index.js");

const content = await readFile(dist, "utf8");
if (!content.startsWith("#!")) {
  await writeFile(dist, `#!/usr/bin/env node\n${content}`);
  console.log("banner added to dist/index.js");
}
