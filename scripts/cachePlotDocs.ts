import { existsSync, mkdirSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { generatePlotReference } from "../src/helpers/fetchPlotDocs.ts";
import { splitPlotDocs } from "../src/helpers/splitPlotDocs.ts";

async function main() {
  const [requestedVersion, ...extra] = process.argv.slice(2);
  if (extra.length > 0) throw new Error("Usage: npm run cache-plot-docs [-- <exact-version>]");
  let version = requestedVersion;
  if (version === undefined) {
    const response = await fetch("https://registry.npmjs.org/@observablehq%2fplot/latest");
    if (!response.ok)
      throw new Error(`Could not resolve Plot's latest version: HTTP ${response.status}`);
    const metadata: unknown = await response.json();
    if (
      typeof metadata !== "object" ||
      metadata === null ||
      !("version" in metadata) ||
      typeof metadata.version !== "string"
    )
      throw new Error("npm did not return a Plot version.");
    version = metadata.version;
  }
  if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(version))
    throw new Error("An exact Plot version is required.");
  const directory = new URL(`../docs-cache/observable-plot/${version}/`, import.meta.url);
  const output = new URL("llm.md", directory);
  if (requestedVersion === undefined && existsSync(output)) {
    console.log(`Observable Plot ${version} is already cached. Nothing to do.`);
    return;
  }
  const reference = await generatePlotReference(version);
  splitPlotDocs(reference, version);
  mkdirSync(directory, { recursive: true });
  const temporary = new URL(".llm.tmp.md", directory);
  try {
    writeFileSync(temporary, reference);
    renameSync(temporary, output);
  } finally {
    rmSync(temporary, { force: true });
  }
  console.log(
    `Saved ${output.pathname}. Review and commit it; keep earlier versions for pinned projects.`,
  );
}

await main();
