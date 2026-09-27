import { log } from "@clack/prompts";
import { mkdirSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { combinePlotDocs } from "./combinePlotDocs.ts";
import type { PackageDocs } from "./fetchPackageDocs.ts";

// Publish one reference only after every tagged page has been fetched.
export async function fetchPlotDocs(version: string): Promise<PackageDocs> {
  const tag = `v${version}`;
  const directory = join("docs", "observable-plot");
  try {
    const response = await fetch(
      `https://api.github.com/repos/observablehq/plot/git/trees/${tag}?recursive=1`,
    );
    if (!response.ok) throw new Error(`GitHub tree: ${response.status}`);
    const tree = await response.json() as {
      truncated?: boolean;
      tree: { type: string; path: string }[];
    };
    if (tree.truncated) throw new Error("GitHub returned an incomplete tree");
    const pages = tree.tree.filter((entry) =>
      entry.type === "blob" &&
      /^docs\/(?:[\w-]+\/)*[\w-]+\.md$/.test(entry.path)
    ).map((entry) => entry.path.slice("docs/".length)).sort();
    if (
      !["api.md", "getting-started.md", "what-is-plot.md"].every((page) =>
        pages.includes(page)
      )
    ) {
      throw new Error("The tag is missing Plot's overview or API index");
    }

    const documents = new Map<string, string>();
    const failed: string[] = [];
    // Fetch in small batches to avoid overwhelming GitHub on the first run.
    for (let offset = 0; offset < pages.length; offset += 8) {
      await Promise.all(
        pages.slice(offset, offset + 8).map(async (page) => {
          try {
            const url = "https://raw.githubusercontent.com/observablehq/plot/" +
              `refs/tags/${tag}/docs/${page}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const content = await response.text();
            documents.set(page, content);
          } catch {
            failed.push(page);
          }
        }),
      );
    }

    if (failed.length > 0) {
      throw new Error(`Could not fetch ${failed.length} Markdown pages`);
    }
    const llm = combinePlotDocs(version, documents);
    mkdirSync(directory, { recursive: true });
    const temporaryPath = join(directory, ".llm.md.tmp");
    try {
      writeFileSync(temporaryPath, llm);
      renameSync(temporaryPath, join(directory, "llm.md"));
    } finally {
      rmSync(temporaryPath, { force: true });
    }
    return { llm, plot: { version, pages } };
  } catch (error) {
    log.warn(
      `Could not fetch complete Observable Plot documentation for ${tag}. ` +
        "Existing files were preserved, but may not match the installed " +
        "version. Plot documentation will not be included in AGENTS.md. " +
        String(error),
    );
    return {};
  }
}
