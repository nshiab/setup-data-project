import { assertEquals, assertStringIncludes } from "@std/assert";
import { combinePlotDocs } from "../src/helpers/combinePlotDocs.ts";

Deno.test("combinePlotDocs - links pages, explicit APIs, repeated headings and HTML IDs", () => {
  const docs = new Map([
    [
      "marks/bar.md",
      `# Bar mark

[Self](#barX), [second options](#options-1), [other](../features/scales.md#options).

## barX(*data*, *options*) {#barX}

## Options

## Options

The clip option<a id="clip" href="#clip"></a>.
[Clip](#clip)
[Scales](../features/scales.md)
[Scales title](../features/scales.md#scale-options)
`,
    ],
    [
      "features/scales.md",
      `# Scale options

## Options

[Bars](../marks/bar.md#barX)
[HTML ID](../marks/bar.md#clip)
[Page](../marks/bar.md)
`,
    ],
  ]);
  const llm = combinePlotDocs("0.6.17", docs);
  for (
    const fragment of [
      "[Self](#plot-marks--bar--barX)",
      "[second options](#plot-marks--bar--options-1)",
      "[other](#plot-features--scales--options)",
      '<a id="plot-marks--bar--barX"></a>',
      '<a id="plot-marks--bar--options-1"></a>',
      'id="plot-marks--bar--clip" href="#plot-marks--bar--clip"',
      "[HTML ID](#plot-marks--bar--clip)",
      "[Scales](#plot-features--scales)",
      "[Scales title](#plot-features--scales--scale-options)",
      "[Page](#plot-marks--bar)",
    ]
  ) assertStringIncludes(llm, fragment);
  const ids = [...llm.matchAll(/id="([^"]+)"/g)].map((match) => match[1]);
  assertEquals(new Set(ids).size, ids.length);
  for (const target of llm.matchAll(/\]\(#([^)]*)\)/g)) {
    assertEquals(ids.includes(target[1]), true, target[1]);
  }
  assertEquals(combinePlotDocs("0.6.17", new Map([...docs].reverse())), llm);
});

Deno.test("combinePlotDocs - keeps code and script examples verbatim and resolves assets upstream", () => {
  const code =
    '```js\n// [Link](./bar.md)\nconst example = "## Options {#options}";\n```';
  const longFence = "````md\n```js\n[Code](./bar.md)\n```\n````";
  const tildeFence = "~~~md\n# Heading in code\n[Example](./bar.md)\n~~~";
  const script =
    '<script setup>\nconst example = "[Link](./bar.md)";\n</script>';
  const llm = combinePlotDocs(
    "0.6.17",
    new Map([
      [
        "marks/bar.md",
        `# Bar

${code}

${longFence}

${tildeFence}

${script}

:::plot https://observablehq.com/example
${code}
:::

Inline \`[Link](./bar.md)\`.
![Screenshot](../images/chart.png)
![Root asset](/images/chart.png)
<img src="../images/chart.png">
[External](https://example.com/doc#anchor)
[Missing](./missing.md#anchor)
[Reference]: ./bar.md
`,
      ],
    ]),
  );
  for (
    const verbatim of [
      code,
      longFence,
      tildeFence,
      script,
      "Inline `[Link](./bar.md)`.",
    ]
  ) {
    assertStringIncludes(llm, verbatim);
  }
  assertStringIncludes(
    llm,
    "![Screenshot](https://raw.githubusercontent.com/observablehq/plot/refs/tags/v0.6.17/docs/images/chart.png)",
  );
  assertStringIncludes(
    llm,
    '<img src="https://raw.githubusercontent.com/observablehq/plot/refs/tags/v0.6.17/docs/images/chart.png">',
  );
  assertStringIncludes(
    llm,
    "![Root asset](https://raw.githubusercontent.com/observablehq/plot/refs/tags/v0.6.17/docs/public/images/chart.png)",
  );
  assertStringIncludes(llm, "[External](https://example.com/doc#anchor)");
  assertStringIncludes(llm, "[Reference]: #plot-marks--bar");
  assertEquals(llm.includes('id="plot-marks--bar--heading-in-code"'), false);
});
