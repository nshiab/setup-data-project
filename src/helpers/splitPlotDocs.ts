import { cleanPlotMarkdown } from "./cleanPlotMarkdown.ts";
import { posix } from "node:path";
import { proseLines } from "./combinePlotDocs.ts";
import { PLOT_DOC_PAGES } from "./plotDocPages.ts";

// Split the cached format without changing code examples or heading anchors.
export function splitPlotDocs(reference: string, version: string): Map<string, string> {
  const sections = [
    ...reference.matchAll(
      /<a id="(plot-[^"]+)"><\/a>\n\n# ([^\n]+\.md)\n\nSource:\s+([^\s]+)\n\n/g,
    ),
  ];
  const files = new Map<string, string>();
  const anchors = new Map<string, string>();
  const source = `https://github.com/observablehq/plot/tree/v${version}/docs`;
  const completion = `<!-- setup-data-project:observable-plot:${version}:complete -->`;
  if (!reference.trimEnd().endsWith(completion)) throw new Error("Incomplete Plot reference.");
  const end = reference.lastIndexOf(completion);
  const licenseStart = reference.lastIndexOf("\n## Upstream license\n", end);
  for (let index = 0; index < sections.length; index++) {
    const section = sections[index];
    const page = section[2];
    if (!PLOT_DOC_PAGES.includes(page) || files.has(page) || section[3] !== `${source}/${page}`)
      throw new Error(`Invalid Plot page: ${page}`);
    const body = reference
      .slice(section.index, sections[index + 1]?.index ?? (licenseStart >= 0 ? licenseStart : end))
      .trimEnd()
      .replace(/\n\n---$/, "");
    files.set(page, body);
    proseLines(body, (line) => {
      for (const match of line.matchAll(/\bid=["']([^"']+)["']/g)) anchors.set(match[1], page);
      return line;
    });
  }
  if (files.size !== PLOT_DOC_PAGES.length) throw new Error("Incomplete Plot pages.");

  for (const [page, body] of files) {
    const link = (id: string) => {
      const destination = anchors.get(id);
      return destination && destination !== page
        ? `${posix.relative(posix.dirname(page), destination)}#${id}`
        : `#${id}`;
    };
    files.set(
      page,
      cleanPlotMarkdown(
        proseLines(body, (line) =>
          line
            .split(/(`+[^`]*`+)/g)
            .map((part, index) =>
              index % 2
                ? part
                : part
                    .replace(
                      /(\]\()#([^\s)]+)([^)]*\))/g,
                      (_match: string, before: string, id: string, after: string) =>
                        `${before}${link(id)}${after}`,
                    )
                    .replace(
                      /^( {0,3}\[[^\]]+\]:\s*)#(\S+)/,
                      (_match: string, before: string, id: string) => `${before}${link(id)}`,
                    )
                    .replace(
                      /(?<!:)\b(href|src)=(["'])#([^"']+)\2/g,
                      (_match: string, attr: string, quote: string, id: string) =>
                        `${attr}=${quote}${link(id)}${quote}`,
                    ),
            )
            .join(""),
        ),
      ),
    );
  }
  const license =
    licenseStart >= 0
      ? reference.slice(licenseStart + "\n## Upstream license\n".length, end).trim()
      : undefined;
  if (license) files.set("LICENSE", license + "\n");
  const index =
    `# Observable Plot ${version}\n\n> Selected documentation for static charts and maps. Start here, then read the relevant pages.\n\n[Versioned upstream documentation](${source})${license ? " · [License](./LICENSE)" : ""}\n\n` +
    ["features", "marks", "transforms"]
      .map(
        (group) =>
          `## ${group[0].toUpperCase() + group.slice(1)}\n\n` +
          PLOT_DOC_PAGES.filter((page) => page.startsWith(`${group}/`))
            .map((page) => `- [${page}](./${page})`)
            .join("\n"),
      )
      .join("\n\n") +
    "\n";
  files.set("llms.txt", index);
  return files;
}
