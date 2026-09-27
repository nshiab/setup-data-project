import { log } from "@clack/prompts";
import { mkdirSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { combinePlotDocs } from "./combinePlotDocs.ts";
import { PLOT_DOC_PAGES } from "./plotDocPages.ts";
import type { PackageDocs } from "./fetchPackageDocs.ts";

// Publish one reference only after every tagged page has been fetched.
export async function fetchPlotDocs(
  version: string,
  options: { preferStored?: boolean } = {},
): Promise<PackageDocs> {
  const tag = `v${version}`;
  const directory = join("docs", "observable-plot");
  try {
    let llm: string | undefined;
    if (options.preferStored !== false) {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/nshiab/setup-data-project/" +
            `refs/heads/main/docs-cache/observable-plot/${version}/llm.md`,
        );
        if (response.ok) {
          const cached = await response.text();
          if (isStoredReference(cached, version)) llm = cached;
        }
      } catch {
        // A cache is an optimization. An unavailable cache never blocks the tag.
      }
    }
    if (llm === undefined) llm = await generateReference(version);
    mkdirSync(directory, { recursive: true });
    const temporaryPath = join(directory, ".llm.md.tmp");
    try {
      writeFileSync(temporaryPath, llm);
      renameSync(temporaryPath, join(directory, "llm.md"));
    } finally {
      rmSync(temporaryPath, { force: true });
    }
    return { llm, plot: { version, pages: [...PLOT_DOC_PAGES] } };
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

async function generateReference(version: string): Promise<string> {
  const tag = `v${version}`;
  const pages = PLOT_DOC_PAGES;
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
  return combinePlotDocs(version, documents);
}

function isStoredReference(content: string, version: string): boolean {
  const source = `https://github.com/observablehq/plot/tree/v${version}/docs`;
  if (
    !content.startsWith(`# Observable Plot ${version}\n\n`) ||
    !content.includes(
      `Package: \`@observablehq/plot@${version}\`. Source: [v${version}](${source}).`,
    ) ||
    !content.trimEnd().endsWith(
      `<!-- setup-data-project:observable-plot:${version}:complete -->`,
    )
  ) return false;

  // Match actual page sections, not TOC entries. Require every selected page
  // exactly once and some upstream heading/content after its source record.
  const sections = [
    ...content.matchAll(
      /<a id="(plot-[^"]+)"><\/a>\n\n# ([^\n]+\.md)\n\nSource: ([^\n]+)\n\n/g,
    ),
  ];
  if (sections.length !== PLOT_DOC_PAGES.length) return false;
  const found = new Set<string>();
  for (let index = 0; index < sections.length; index++) {
    const section = sections[index];
    const page = section[2];
    const id = `plot-${page.replace(/\.md$/, "").replaceAll("/", "--")}`;
    if (
      !PLOT_DOC_PAGES.includes(page) || found.has(page) || section[1] !== id ||
      section[3] !== `${source}/${page}`
    ) return false;
    const body = content.slice(
      section.index! + section[0].length,
      sections[index + 1]?.index,
    );
    if (!/^#{1,6}\s+\S/m.test(body)) return false;
    found.add(page);
  }
  return true;
}
