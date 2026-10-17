import { log } from "@clack/prompts";
import { existsSync, mkdirSync, mkdtempSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { splitPlotDocs } from "./splitPlotDocs.ts";
import { combinePlotDocs } from "./combinePlotDocs.ts";
import { PLOT_DOC_PAGES } from "./plotDocPages.ts";
import type { PackageDocs } from "./fetchPackageDocs.ts";

// Replace local documentation only after every page is ready.
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
    if (llm === undefined) llm = await generatePlotReference(version);
    const files = splitPlotDocs(llm, version);
    mkdirSync("docs", { recursive: true });
    const staging = mkdtempSync(join("docs", ".plot-"));
    const contents = join(staging, "contents");
    const backup = join(staging, "previous");
    try {
      for (const [page, content] of files) {
        const path = join(contents, page);
        mkdirSync(dirname(path), { recursive: true });
        writeFileSync(path, content);
      }
      if (existsSync(directory)) renameSync(directory, backup);
      try {
        renameSync(contents, directory);
      } catch (error) {
        if (existsSync(backup)) renameSync(backup, directory);
        throw error;
      }
    } finally {
      rmSync(staging, { recursive: true, force: true });
    }
    return { llm, index: files.get("llms.txt"), plot: { version, pages: [...PLOT_DOC_PAGES] } };
  } catch (error) {
    log.warn(
      `Could not fetch complete Observable Plot documentation for ${tag}. ` +
        "Existing files were preserved, but may not match the installed " +
        "version. Resolve the refresh failure before using this reference. " +
        String(error),
    );
    return {};
  }
}

export async function generatePlotReference(version: string): Promise<string> {
  if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(version))
    throw new Error("An exact Plot version is required.");
  const tag = `v${version}`;
  const pages = PLOT_DOC_PAGES;
  const documents = new Map<string, string>();
  const failed: string[] = [];
  // Fetch in small batches to avoid overwhelming GitHub on the first run.
  for (let offset = 0; offset < pages.length; offset += 8) {
    await Promise.all(
      pages.slice(offset, offset + 8).map(async (page) => {
        try {
          const url =
            "https://raw.githubusercontent.com/observablehq/plot/" +
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
  const response = await fetch(
    `https://raw.githubusercontent.com/observablehq/plot/refs/tags/${tag}/LICENSE`,
  );
  if (!response.ok) throw new Error(`Could not fetch Plot's license: HTTP ${response.status}`);
  const license = await response.text();
  const completion = `<!-- setup-data-project:observable-plot:${version}:complete -->`;
  return combinePlotDocs(version, documents).replace(
    completion,
    `## Upstream license\n\n${license.trim()}\n\n${completion}`,
  );
}

function isStoredReference(content: string, version: string): boolean {
  const source = `https://github.com/observablehq/plot/tree/v${version}/docs`;
  const metadata = content.split(/\n\s*\n/)[1]?.replace(/\s+/g, " ");
  if (
    !content.startsWith(`# Observable Plot ${version}\n\n`) ||
    metadata !== `Package: \`@observablehq/plot@${version}\`. Source: [v${version}](${source}).` ||
    !content.trimEnd().endsWith(`<!-- setup-data-project:observable-plot:${version}:complete -->`)
  )
    return false;

  // Match actual page sections, not TOC entries. Require every selected page
  // exactly once and some upstream heading/content after its source record.
  const sections = [
    ...content.matchAll(/<a id="(plot-[^"]+)"><\/a>\n\n# ([^\n]+\.md)\n\nSource:\s+([^\s]+)\n\n/g),
  ];
  if (sections.length !== PLOT_DOC_PAGES.length) return false;
  const found = new Set<string>();
  for (let index = 0; index < sections.length; index++) {
    const section = sections[index];
    const page = section[2];
    const id = `plot-${page.replace(/\.md$/, "").replaceAll("/", "--")}`;
    if (
      !PLOT_DOC_PAGES.includes(page) ||
      found.has(page) ||
      section[1] !== id ||
      section[3] !== `${source}/${page}`
    )
      return false;
    const body = content.slice(section.index + section[0].length, sections[index + 1]?.index);
    if (!/^#{1,6}\s+\S/m.test(body)) return false;
    found.add(page);
  }
  return true;
}
