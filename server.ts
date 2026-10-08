import { file } from "bun";
import { extname, resolve, sep } from "node:path";

const PORT = Number(Bun.env.PORT ?? 3000);
const publicDir = resolve(import.meta.dir, ".devcontainer", "public");

// MIME type mapping
const mimeTypes: Record<string, string> = {
  ".ts": "application/javascript",
  ".js": "application/javascript",
  ".json": "application/json",
  ".html": "text/html",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
};

Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    let relativePath: string;
    try {
      relativePath = decodeURIComponent(url.pathname.slice(1)) || "index.html";
    } catch {
      return new Response("Invalid URL path", { status: 400 });
    }

    const filePath = resolve(publicDir, relativePath);
    if (filePath !== publicDir && !filePath.startsWith(`${publicDir}${sep}`)) {
      return new Response("Forbidden", { status: 403 });
    }

    const targetFile = file(filePath);

    if (await targetFile.exists()) {
      // Get file extension
      const ext = extname(filePath).toLowerCase();
      
      // Handle TypeScript transpilation for browser modules
      if (ext === ".ts") {
        const result = await Bun.build({
          entrypoints: [filePath],
          format: "esm",
        });
        
        if (!result.success) {
          return new Response(`Build error: ${result.logs.join('\n')}`, { status: 500 });
        }
        
        const transpiled = await result.outputs[0].text();
        
        return new Response(transpiled, {
          headers: { "Content-Type": "application/javascript" }
        });
      }
      
      // Serve other file types normally
      const contentType = mimeTypes[ext] || "application/octet-stream";
      return new Response(targetFile, {
        headers: { "Content-Type": contentType }
      });
    }

    return new Response("File not found", { status: 404 });
  },
});

console.log(`Web server running at http://localhost:${PORT}`);