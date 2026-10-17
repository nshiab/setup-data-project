import { expect, test } from "vite-plus/test";
import { cleanPlotMarkdown } from "../src/helpers/cleanPlotMarkdown.ts";

test("website UI becomes Markdown without discarding prose, setup, or chart examples", () => {
  const source = `<script setup>
import data from "../data/example.ts";
const options = {color: "red"};
</script>

<a id="options"></a>
## Options <VersionBadge version="0.6.17" pr="123" />

The <span :style="{color: options.color}">red</span> line.
<p><label>Radius: <input v-model="radius">{{radius}}</label></p>

:::tip Keep this advice.
And its [link](#options). :::

:::warning
Keep this warning.
:::

:::plot defer https://example.com/interactive

\`\`\`js
Plot.dot(data, {r: 2}).plot();
\`\`\`

:::

<PlotRender :options='{color: {type: "linear"}}' defer method="legend" />

\`\`\`js-vue
Plot.dot(data, {r: {{radius}}}).plot();
\`\`\`
`;
  const result = cleanPlotMarkdown(source);
  for (const expected of [
    'import data from "../data/example.ts";',
    'const options = {color: "red"};',
    '<a id="options"></a>',
    "## Options (since v0.6.17)",
    "The red line.",
    "**Tip:** Keep this advice.\nAnd its [link](#options).",
    "**Warning:**\nKeep this warning.",
    "[Interactive example](https://example.com/interactive)",
    "```js\nPlot.dot(data, {r: 2}).plot();\n```",
    '```js\nPlot.legend({color: {type: "linear"}});\n```',
    "```text\nPlot.dot(data, {r: {{radius}}}).plot();\n```",
    "Interactive example template",
  ])
    expect(result).toContain(expected);
  for (const removed of [
    "<script",
    "</script>",
    "<VersionBadge",
    "<PlotRender",
    "<input",
    "<label",
    ":::plot",
    ":::tip",
  ])
    expect(result).not.toContain(removed);
  expect(cleanPlotMarkdown(result)).toBe(result);
});

test("literal markup in fenced and inline examples stays unchanged", () => {
  const literal =
    '````md\n```html\n<script>const example = ":::tip";</script>\n<VersionBadge version="1" />\n```\n````';
  const tildes = '~~~html\n<input v-model="value">\n~~~';
  const inline = '`<VersionBadge version="1" />` and `:::tip`';
  expect(cleanPlotMarkdown(`${literal}\n\n${tildes}\n\n${inline}`)).toBe(
    `${literal}\n\n${tildes}\n\n${inline}\n`,
  );
  expect(() => cleanPlotMarkdown("```js\nunterminated")).toThrow("Unclosed");
});

test("commented-out examples and inline markup cannot swallow subsequent pages", () => {
  const source =
    "<!-- Disabled example\n```js\nPlot.dot([]);\n``` -->\n\n" +
    '`<VersionBadge version="1" />`\n\n' +
    "```js\nPlot.barY(data).plot();\n```\n\n" +
    "# Next page\n\nKeep this prose.\n\n<!-- setup-data-project:observable-plot:0.6.17:complete -->";
  const cleaned = cleanPlotMarkdown(source);
  expect(cleaned).not.toContain("Disabled example");
  expect(cleaned).toContain('`<VersionBadge version="1" />`');
  expect(cleaned).toContain("```js\nPlot.barY(data).plot();\n```");
  expect(cleaned).toContain("# Next page\n\nKeep this prose.");
  expect(cleaned.trimEnd()).toMatch(/<!-- setup-data-project:observable-plot:0.6.17:complete -->$/);
});
