import { fetchPlotDocs } from "../src/helpers/fetchPlotDocs.ts";
import { rmSync } from "node:fs";

const version = Deno.args[0];
if (
  Deno.args.length !== 1 ||
  !/^\d+\.\d+\.\d+(?:-[\w.-]+)?$/.test(version ?? "")
) {
  throw new Error("Usage: deno task cache-plot-docs <exact-version>");
}

const licenseResponse = await fetch(
  `https://raw.githubusercontent.com/observablehq/plot/refs/tags/v${version}/LICENSE`,
);
if (!licenseResponse.ok) {
  throw new Error(`Could not fetch Plot's license: ${licenseResponse.status}`);
}
const license = await licenseResponse.text();
const originalDirectory = Deno.cwd();
const temporaryDirectory = Deno.makeTempDirSync({ prefix: "plot-docs-" });
let reference: string;
try {
  Deno.chdir(temporaryDirectory);
  const docs = await fetchPlotDocs(version, { preferStored: false });
  if (!docs.llm || !docs.plot) {
    throw new Error(
      `Could not generate complete Plot documentation for ${version}`,
    );
  }
  const completion =
    `<!-- setup-data-project:observable-plot:${version}:complete -->`;
  reference = docs.llm.replace(
    completion,
    `## Upstream license\n\n${license.trim()}\n\n${completion}`,
  );
} finally {
  Deno.chdir(originalDirectory);
  Deno.removeSync(temporaryDirectory, { recursive: true });
}

const directory = new URL(
  `../docs-cache/observable-plot/${version}/`,
  import.meta.url,
);
Deno.mkdirSync(directory, { recursive: true });
const temporaryFile = new URL(".llm.md.tmp", directory);
const outputFile = new URL("llm.md", directory);
try {
  Deno.writeTextFileSync(temporaryFile, reference);
  Deno.renameSync(temporaryFile, outputFile);
} finally {
  rmSync(temporaryFile, { force: true });
}
console.log(`Saved ${outputFile.pathname}`);
