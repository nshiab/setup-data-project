import { posix } from "node:path";

// The Plot source uses ATX headings, explicit VitePress IDs, and Markdown fences.
// Keep code verbatim; rewrite only prose links and anchors while joining pages.
export function combinePlotDocs(
  version: string,
  documents: Map<string, string>,
): string {
  const pages = [...documents.keys()].sort();
  const source = `https://github.com/observablehq/plot/tree/v${version}/docs`;
  const anchors = new Map<string, Map<string, string>>();
  const sections = new Map<
    string,
    { line: number; title: string; id: string }[]
  >();
  const pageId = (page: string) =>
    `plot-${page.replace(/\.md$/, "").replaceAll("/", "--")}`;

  for (const page of pages) {
    const ids = new Map<string, string>();
    const headings: { line: number; title: string; id: string }[] = [];
    const counts = new Map<string, number>();
    proseLines(documents.get(page)!, (line, number) => {
      for (const match of line.matchAll(/\bid=["']([^"']+)["']/g)) {
        ids.set(match[1], `${pageId(page)}--${match[1]}`);
      }
      const heading = line.match(/^ {0,3}#{1,6}\s+(.+?)\s*#*\s*$/);
      if (!heading) return line;
      const explicit = heading[1].match(/\{#([^}]+)\}/)?.[1];
      const title = heading[1].replace(/\s*\{#[^}]+\}/g, "");
      const slug = explicit ?? title.replace(/<[^>]*>/g, "")
        .toLowerCase().replace(/[^\p{L}\p{N}_\s-]/gu, "")
        .trim().replace(/\s+/g, "-");
      const count = counts.get(slug) ?? 0;
      counts.set(slug, count + 1);
      const localId = `${slug}${count ? `-${count}` : ""}`;
      const id = `${pageId(page)}--${localId}`;
      ids.set(localId, id);
      headings.push({ line: number, title, id });
      return line;
    });
    anchors.set(page, ids);
    sections.set(page, headings);
  }

  function link(target: string, page: string): string {
    if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(target)) return target;
    const [pathAndQuery, fragment] = target.split("#", 2);
    const path = pathAndQuery.split("?", 1)[0];
    const resolved = path === "" ? page : posix.normalize(
      path.startsWith("/")
        ? path.slice(1)
        : posix.join(posix.dirname(page), path),
    );
    const markdown = [resolved, `${resolved}.md`, `${resolved}/index.md`]
      .find((candidate) => documents.has(candidate));
    if (markdown) {
      const id = fragment
        ? anchors.get(markdown)?.get(decodeURIComponent(fragment))
        : pageId(markdown);
      if (id) return `#${id}`;
      // Preserve an upstream target when a fragment is not a known heading/ID.
      return `${source}/${markdown}${fragment ? `#${fragment}` : ""}`;
    }
    if (resolved.endsWith(".md")) {
      return `${source}/${resolved}${fragment ? `#${fragment}` : ""}`;
    }
    const base = "https://raw.githubusercontent.com/observablehq/plot/" +
      `refs/tags/v${version}/docs/`;
    return path.startsWith("/")
      ? new URL(`public${target}`, base).href
      : new URL(target, `${base}${page}`).href;
  }

  const contents = pages.flatMap((page) => [
    `- [${page}](#${pageId(page)})`,
    ...(sections.get(page) ?? []).map(({ title, id }) =>
      `  - [${title.replace(/[\[\]]/g, "")}](#${id})`
    ),
  ]).join("\n");
  const combined = pages.map((page) => {
    const headings = new Map(
      sections.get(page)!.map((heading) => [heading.line, heading]),
    );
    const body = proseLines(documents.get(page)!, (line, number) => {
      const heading = headings.get(number);
      // Inline code also remains verbatim. Plot's prose links have simple destinations.
      line = line.split(/(`+[^`]*`+)/g).map((part, index) => {
        if (index % 2) return part;
        return part.replace(
          /(\]\()([^\s)]+)([^)]*\))/g,
          (_, before, target, after) =>
            `${before}${link(target, page)}${after}`,
        ).replace(
          /^( {0,3}\[[^\]]+\]:\s*)(\S+)/,
          (_, before, target) => `${before}${link(target, page)}`,
        ).replace(
          /(?<!:)\b(href|src)=(["'])([^"']+)\2/g,
          (_, attr, quote, target) =>
            `${attr}=${quote}${link(target, page)}${quote}`,
        ).replace(
          /\bid=(["'])([^"']+)\1/g,
          (_, quote, id) =>
            `id=${quote}${anchors.get(page)?.get(id) ?? id}${quote}`,
        );
      }).join("");
      return heading
        ? `<a id="${heading.id}"></a>\n\n${line.replace(/\s*\{#[^}]+\}/g, "")}`
        : line;
    });
    return `<a id="${
      pageId(page)
    }"></a>\n\n# ${page}\n\nSource: ${source}/${page}\n\n${body}`;
  }).join("\n\n---\n\n");
  return `# Observable Plot ${version}\n\nPackage: \`@observablehq/plot@${version}\`. Source: [v${version}](${source}).\n\nThis reference combines selected upstream documentation for static charts and maps. Introductory and site pages, interaction helpers, and the Auto and Tip marks are omitted. Vue components and plot fences are retained as source examples. Use the table of contents to find API signatures and examples; links to omitted pages lead to the tagged upstream documentation.\n\n## Table of contents\n\n${contents}\n\n---\n\n${combined}\n\n<!-- setup-data-project:observable-plot:${version}:complete -->\n`;
}

function proseLines(
  content: string,
  transform: (line: string, number: number) => string,
): string {
  let fence: { character: string; length: number } | undefined;
  let script = false;
  return content.split("\n").map((line, number) => {
    const marker = line.match(/^ {0,3}(`{3,}|~{3,})/);
    if (fence) {
      if (
        marker?.[1][0] === fence.character &&
        marker[1].length >= fence.length && /^ {0,3}(?:`+|~+)\s*$/.test(line)
      ) fence = undefined;
      return line;
    }
    if (marker) {
      fence = { character: marker[1][0], length: marker[1].length };
      return line;
    }
    if (/^\s*<script\b/.test(line)) script = true;
    if (script) {
      if (/<\/script>/.test(line)) script = false;
      return line;
    }
    return transform(line, number);
  }).join("\n");
}
