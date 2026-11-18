#!/usr/bin/env node
import { createReadStream, statSync, watch } from "node:fs";
import { readFile, realpath, stat } from "node:fs/promises";
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { extname, isAbsolute, join, relative, sep } from "node:path";
import { pipeline } from "node:stream/promises";
import { parseArgs } from "node:util";

const defaultSiteDirectory = "src/site";
const reloadPath = "/__sda_preview_reload";
const reloadScriptPath = `${reloadPath}.js`;
const reloadScript = `new EventSource("${reloadPath}").onmessage = () => location.reload();`;
const contentTypes: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".htm": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".geojson": "application/geo+json",
  ".csv": "text/csv; charset=utf-8",
  ".tsv": "text/tab-separated-values; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function fail(error: unknown) {
  console.error(`Preview failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
}

async function main() {
  const { values } = parseArgs({
    options: {
      dir: { type: "string", default: defaultSiteDirectory },
      help: { type: "boolean", short: "h" },
    },
  });
  if (values.help) {
    console.log(
      `Usage: sda-preview [--dir <path>]\nServe and watch ${defaultSiteDirectory}/ on localhost by default. Use --dir to preview a different directory.`,
    );
    return;
  }
  const directory = values.dir;
  if (!statSync(directory, { throwIfNoEntry: false })?.isDirectory()) {
    throw new Error(
      `Expected a site directory at "${directory}". Create it with an index.html page first.`,
    );
  }

  const root = await realpath(directory);
  const clients = new Set<ServerResponse>();
  let pendingReload: ReturnType<typeof setTimeout> | undefined;

  const watcher = watch(root, { recursive: true }, () => {
    clearTimeout(pendingReload);
    pendingReload = setTimeout(() => {
      for (const client of clients) client.write("data: reload\n\n");
    }, 80);
  });
  watcher.on("error", fail);

  async function respond(request: IncomingMessage, response: ServerResponse) {
    response.setHeader("Cache-Control", "no-store");
    if (request.method !== "GET" && request.method !== "HEAD") {
      response.writeHead(405, { Allow: "GET, HEAD" }).end();
      return;
    }
    const pathname = decodeURIComponent(new URL(request.url ?? "/", "http://localhost").pathname);
    if (pathname === reloadScriptPath) {
      response.writeHead(200, { "Content-Type": "text/javascript; charset=utf-8" });
      response.end(request.method === "HEAD" ? undefined : reloadScript);
      return;
    }
    if (pathname === reloadPath && request.method === "GET") {
      response.writeHead(200, { "Content-Type": "text/event-stream" });
      response.write(": connected\n\n");
      clients.add(response);
      response.on("close", () => clients.delete(response));
      return;
    }

    if (/[\\:\0]/.test(pathname) || pathname.split("/").some((part) => part.startsWith("."))) {
      throw new Error("Invalid path");
    }
    const file = await realpath(
      join(root, pathname.endsWith("/") ? pathname + "index.html" : pathname),
    );
    const withinRoot = relative(root, file);
    // Check the resolved path too, including symlinks to files outside the site directory.
    if (isAbsolute(withinRoot) || withinRoot.split(sep).some((part) => part.startsWith("."))) {
      throw new Error("File is outside the public site");
    }
    const info = await stat(file);
    if (!info.isFile()) throw new Error("Expected a file");

    const type = contentTypes[extname(file).toLowerCase()] ?? "application/octet-stream";
    response.setHeader("Content-Type", type);
    if (type.startsWith("text/html")) {
      if (request.method === "HEAD") {
        response.end();
        return;
      }
      const html = await readFile(file, "utf8");
      // Append the preview script so tag text inside the page cannot change where it runs.
      response.end(`${html}\n<script src="${reloadScriptPath}"></script>`);
      return;
    }

    response.setHeader("Content-Length", info.size);
    if (request.method === "HEAD") response.end();
    else await pipeline(createReadStream(file), response);
  }

  const server = createServer((request, response) => {
    void respond(request, response).catch(() => {
      if (response.headersSent) response.destroy();
      else
        response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("Not found");
    });
  });
  server.on("error", fail);
  server.listen(0, "127.0.0.1", () => {
    const address = server.address();
    if (address && typeof address === "object") {
      console.log(`Previewing ${directory} at http://127.0.0.1:${address.port}`);
    }
  });
}

void main().catch(fail);
