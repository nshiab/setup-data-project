import { expect, test } from "vite-plus/test";
import { readFileSync } from "node:fs";
import { posix } from "node:path";
import { combinePlotDocs } from "../src/helpers/combinePlotDocs.ts";
import { splitPlotDocs } from "../src/helpers/splitPlotDocs.ts";
import { PLOT_DOC_PAGES } from "../src/helpers/plotDocPages.ts";

test("split Plot pages preserve examples, local links, external links and license", () => {
  const code = "```md\n[Code](#plot-features--scales)\n```";
  const script = '<script>\nconst link = "#plot-features--scales";\n</script>';
  const documents = new Map(PLOT_DOC_PAGES.map((page) => [page, "# API\n\nAn example."]));
  documents.set("features/scales.md", "# Scales\n\n## Options {#options}");
  documents.set(
    "marks/bar.md",
    `# Bar

[Scales](../features/scales.md#options)
[Self](#bar)
[Omitted](./tip.md)
[External](https://example.com/)
[Reference]: ../features/scales.md
<a href="../features/scales.md#options">Options</a>

${code}
${script}
Inline \`[Code](#plot-features--scales)\`.
`,
  );
  const reference = combinePlotDocs("0.6.17", documents).replace(
    "<!-- setup-data-project:",
    "## Upstream license\n\nTest license\n\n<!-- setup-data-project:",
  );
  const files = splitPlotDocs(reference, "0.6.17");
  const bar = files.get("marks/bar.md");
  for (const fragment of [
    "[Scales](../features/scales.md#plot-features--scales--options)",
    "[Self](#plot-marks--bar--bar)",
    "[Omitted](https://github.com/observablehq/plot/tree/v0.6.17/docs/marks/tip.md)",
    "[External](https://example.com/)",
    "[Reference]: ../features/scales.md#plot-features--scales",
    '<a href="../features/scales.md#plot-features--scales--options">Options</a>',
    code,
    script,
    "Inline `[Code](#plot-features--scales)`.",
  ])
    expect(bar).toContain(fragment);
  expect(files.get("llms.txt")).toContain("# Observable Plot 0.6.17");
  expect(files.get("llms.txt")).toContain("[License](./LICENSE)");
  expect(files.get("LICENSE")).toBe("Test license\n");
  expect(files.get("transforms/stack.md")).not.toContain("Test license");
  expect(files.size).toBe(PLOT_DOC_PAGES.length + 2);
  expect(() => splitPlotDocs(reference, "0.6.18")).toThrow();
  expect(() =>
    splitPlotDocs(reference.replace("# marks/bar.md", "# ../../escape.md"), "0.6.17"),
  ).toThrow();
});

test("the existing cached reference splits into pages with valid local Markdown links", () => {
  const reference = readFileSync(
    new URL("../docs-cache/observable-plot/0.6.17/llm.md", import.meta.url),
    "utf8",
  );
  const files = splitPlotDocs(reference, "0.6.17");
  expect(files.get("LICENSE")).toContain("Copyright 2020-2025 Observable, Inc.");
  for (const [page, content] of files) {
    for (const match of content.matchAll(/\]\(([^\s)]+)\)/g)) {
      if (/^[a-z]+:/i.test(match[1])) continue;
      const [path, fragment] = match[1].split("#");
      const target = path ? posix.join(posix.dirname(page), path) : page;
      expect(files.has(target), `${page}: ${match[1]}`).toBe(true);
      if (fragment) expect(files.get(target), `${page}: ${match[1]}`).toContain(`id="${fragment}"`);
    }
  }
});
