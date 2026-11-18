import type { PackageDocs } from "./fetchPackageDocs.ts";
import { ensureManagedSection } from "./ensureManagedSection.ts";
import { getInstalledPackageConfigs } from "./packageRegistry.ts";
import type { Runtime } from "./getRuntime.ts";
export function ensureAgents(
  docsMapping: Record<string, PackageDocs>,
  runtime: Runtime,
  installedPackages: string[] = Object.keys(docsMapping),
) {
  const run = runtime === "bun" ? "bun run" : "npm run";
  const previewOverride = `${run} sda:preview${runtime === "node" ? " --" : ""} --dir src/report`;
  const setup = `${runtime === "bun" ? "bunx --bun" : "npx"} @nshiab/setup-data-project`;
  const analysisPackage = [
    "@nshiab/simple-data-analysis",
    "@nshiab/simple-data-analysis-core",
  ].find((pkg) => installedPackages.includes(pkg));
  const hasPlot = installedPackages.includes("@observablehq/plot");
  const analysisGuidance = analysisPackage
    ? `Use \`${analysisPackage}\` for loading, cleaning, joining, and aggregating data, and for other transformations.`
    : `If the task needs data processing or transformation, suggest \`${setup} --sda\` to install Simple Data Analysis${hasPlot ? "" : " with Observable Plot"} and download versioned documentation.`;
  const chartGuidance = hasPlot
    ? `Otherwise, use the installed Observable Plot.

When using Observable Plot, copy \`dist/plot.umd.min.js\` from the installed \`@observablehq/plot\` package and \`dist/d3.min.js\` from its installed \`d3\` dependency into the site folder. Look for both packages in \`node_modules/\`, including Plot's nested dependencies if D3 is not at the top level. Use relative script URLs to load D3 before Plot.`
    : `Otherwise, suggest \`${setup} --sda\` to install Simple Data Analysis with Observable Plot and download their documentation. Use native browser APIs if the user prefers to keep the current dependencies.`;
  const links = getInstalledPackageConfigs(installedPackages).map((pkg) => {
    if (pkg.value === "@observablehq/plot")
      return `- Observable Plot charts and maps: start at \`docs/observable-plot/llms.txt\`, then read the relevant pages for browser charts or for use with \`writeChart\` and \`writeMap\`.`;
    return `- \`${pkg.value}\`: start at \`docs/${pkg.value.slice("@nshiab/".length)}/llms.txt\`, then read the relevant API pages and examples.`;
  });
  ensureManagedSection({
    path: "AGENTS.md",
    name: "agents",
    createContent: (section) => section,
    content: `Read README.md for project guidance and package.json for the installed libraries and scripts. Use the installed libraries. Ask the user before adding a dependency.

${links.length ? `Documentation for these installed libraries is available locally:\n\n${links.join("\n")}\n\n` : ""}Before making changes or running project commands, run \`${run} sda:status\` and follow its instructions.

## Data analysis

Do data analysis and processing in \`sda/\`. ${analysisGuidance}

Use \`sda/main.ts\` as the entry point and \`sda/helpers/\` for reusable helpers. Keep one function per helper file, with the file named after the function. Put source data in \`sda/data/\` and analysis results in \`sda/output/\`.

Save static charts to \`sda/output/\` as \`.png\` files unless the user requests another format.

Add focused tests for error-prone transformations, reusable logic with meaningful edge cases, and bug fixes. Mirror source paths under sda/test/: for example, sda/helpers/cleanRows.ts maps to sda/test/helpers/cleanRows.test.ts. Prefer the runtime's built-in test runner.

To run the analysis once, use \`${run} sda\`. It fixes and checks code before running the analysis. If the analysis watcher is running, this command requests a run from the watcher and returns its output and exit code when it finishes.

Run \`${run} sda:clean\` only when cached results and temporary files can be discarded.

Before handing off analysis code changes, start with \`${run} sda:test\`. If formatting or lint checks fail, use \`${run} sda:fix\` for automatic fixes. Resolve any remaining failures and rerun \`${run} sda:test\` until it passes.

## Web projects

If the user asks for a web page, dashboard, or interactive visualization, create \`src/site/\` for the site unless the project calls for a different folder. Put \`index.html\` at the root of the site folder, keep all site assets inside it, and use relative URLs for local files so the folder can be uploaded directly to a static host. Use HTML, CSS, and vanilla JavaScript unless the user specifies a different stack.

When the site needs data, prepare it in \`sda/\` and export only the data the site needs into the site folder, in a browser-readable format such as JSON. Load that export from the page and use browser JavaScript to render it and handle interactions such as filtering or highlighting.

Add web dependencies only when the user explicitly requests them. For charts, use the user's chosen library. ${chartGuidance}

In \`package.json\`, add a script that runs \`${run} sda:preview\`. Use \`sda:dash\` for a dashboard, \`sda:interactive\` for a standalone interactive visualization, or \`sda:web\` for other web pages. For a different site folder, pass its path with \`--dir\`, for example \`${previewOverride}\`. Reuse an existing alias if it runs the same command. If the preferred name is taken, preserve the existing script and choose an unused name.

Run the alias to start the preview server, open the local URL it prints in a browser, and check the page and its interactions. The preview serves and watches only the site folder and refreshes the browser when its files change. Share the alias command and local URL with the user.

The \`sda:fix\`, \`sda:test\`, \`sda:watch\`, and \`sda:test:watch\` scripts target analysis code in \`sda/\`. Use the browser preview to verify web changes. When adding automated web tests at the user's request or to cover complex behavior, create \`src/test/\` and add a matching \`package.json\` script such as \`sda:dash:test\` that runs only the web tests using the project's test runner.`,
  });
}
