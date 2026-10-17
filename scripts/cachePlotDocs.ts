import { mkdirSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { generatePlotReference } from "../src/helpers/fetchPlotDocs.ts";
import { splitPlotDocs } from "../src/helpers/splitPlotDocs.ts";

const [version, ...extra] = process.argv.slice(2);
if (!version || extra.length > 0 || !/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(version)) {
  throw new Error("Usage: npm run cache-plot-docs -- <exact-version>");
}
const reference = await generatePlotReference(version);
splitPlotDocs(reference, version);
const directory = new URL(`../docs-cache/observable-plot/${version}/`, import.meta.url);
mkdirSync(directory, { recursive: true });
const temporary = new URL(".llm.tmp.md", directory);
const output = new URL("llm.md", directory);
try {
  writeFileSync(temporary, reference);
  renameSync(temporary, output);
} finally {
  rmSync(temporary, { force: true });
}
console.log(
  `Saved ${output.pathname}. Review and commit it; keep earlier versions for pinned projects.`,
);
