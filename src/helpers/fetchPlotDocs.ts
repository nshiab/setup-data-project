import { log } from "@clack/prompts";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import type { PackageDocs } from "./fetchPackageDocs.ts";

// Keep the upstream Markdown hierarchy so examples and relative links survive.
export async function fetchPlotDocs(version: string): Promise<PackageDocs> {
  const tag = `v${version}`;
  const repository = "https://github.com/observablehq/plot";
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

    const headings = new Map<string, string[]>();
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
            const path = join(directory, page);
            mkdirSync(dirname(path), { recursive: true });
            writeFileSync(path, content);
            headings.set(
              page,
              content.split("\n").filter((line) => /^#{1,2}\s/.test(line)),
            );
          } catch {
            failed.push(page);
          }
        }),
      );
    }

    mkdirSync(directory, { recursive: true });
    if (failed.length > 0) {
      throw new Error(`Could not fetch ${failed.length} Markdown pages`);
    }
    const index = [
      `# Observable Plot ${version}: local documentation index`,
      "",
      `Package: \`@observablehq/plot@${version}\`. Source: [${tag}](${repository}/tree/${tag}/docs).`,
      "",
      "Use this generated index to find API names and examples in the original Markdown pages. Upstream api.md uses a Vue template; the links below are readable without rendering it.",
      "",
      ...pages.flatMap((page) => [
        `## [${page}](${page})`,
        "",
        ...(headings.get(page) ?? []).map((heading) => {
          const anchor = heading.match(/\{#([^}]+)\}/)?.[1];
          const label = heading.replace(/^#+\s+/, "").replace(
            /\s*\{#[^}]+\}/g,
            "",
          ).trim();
          return `- [${label}](${page}${anchor ? `#${anchor}` : ""})`;
        }),
        "",
      ]),
    ].join("\n");
    writeFileSync(join(directory, "INDEX.md"), index);
    return { plot: { version, pages } };
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
