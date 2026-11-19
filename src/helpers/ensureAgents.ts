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
    ? `Use \`${analysisPackage}\` methods whenever they fit. Reserve custom queries for gaps in those methods. Explain the gap to the user and offer to open a GitHub issue in the library's repository.

For scripts using the default in-memory \`SimpleDB\`, let unexpected errors stop the run so the script can be rerun. Call \`await sdb.close()\` at the end of the normal execution path. Calling it from \`catch\` or \`finally\` after a failure can remove cached results for steps the script never reached. Add error handling when the code or the user requires it.`
    : `If the task needs data processing or transformation, suggest \`${setup} --sda\` to install Simple Data Analysis${hasPlot ? "" : " with Observable Plot"} and download versioned documentation.`;
  const chartGuidance = hasPlot
    ? `Otherwise, use the installed Observable Plot.

When using Observable Plot, copy \`dist/plot.umd.min.js\` from the installed \`@observablehq/plot\` package and \`dist/d3.min.js\` from its installed \`d3\` dependency into the site folder. Look for both packages in \`node_modules/\`, including Plot's nested dependencies if D3 is not at the top level. Use relative script URLs to load D3 before Plot.`
    : `Otherwise, suggest \`${setup} --sda\` to install Simple Data Analysis with Observable Plot and download their documentation. Use native browser APIs if the user prefers to keep the current dependencies.`;
  const links = getInstalledPackageConfigs(installedPackages).map((pkg) => {
    const name =
      pkg.value === "@observablehq/plot" ? "observable-plot" : pkg.value.slice("@nshiab/".length);
    return `- \`${pkg.value}\` — \`docs/${name}/llms.txt\``;
  });
  ensureManagedSection({
    path: "AGENTS.md",
    name: "agents",
    createContent: (section) => `# Project instructions\n\n${section}`,
    content: `Read README.md for project guidance and package.json for the installed libraries and scripts. Ask the user before adding a dependency.

Keep changes focused on the user's request. Update README.md only when the user explicitly asks.

Before writing or changing code, search the documentation of relevant installed libraries. Prefer their classes, functions, and methods when they fit the task. If you find a missing feature or a bug, tell the user and offer to open a GitHub issue in the library's repository.

${links.length ? `Local library documentation:\n\n${links.join("\n")}\n\n` : ""}Before making changes or running project commands, run \`${run} sda:status\` and follow its instructions.

## Data analysis

Do data analysis and processing in \`sda/\`. Prioritize code that is easy to understand and review.

${analysisGuidance}

Use \`sda/main.ts\` as the entry point and \`sda/helpers/\` for reusable helpers. Keep one function per helper file, with the file named after the function. Put source data in \`sda/data/\` and analysis results in \`sda/output/\`.

Save static charts to \`sda/output/\` as \`.png\` files unless the user requests another format.

Add focused tests for error-prone transformations, reusable logic with meaningful edge cases, and bug fixes. Mirror source paths under sda/test/: for example, sda/helpers/cleanRows.ts maps to sda/test/helpers/cleanRows.test.ts. Prefer the runtime's built-in test runner.

To run the analysis once, use \`${run} sda\`. It fixes and checks code before running the analysis. If the analysis watcher is running, this command requests a run from the watcher and returns its output and exit code when it finishes.

Watch mode captures analysis output through pipes and prints it live. Check whether the output stream is a terminal before using features such as cursor control or interactive progress displays.

Run \`${run} sda:clean\` only when cached results and temporary files can be discarded.

Before handing off analysis code changes, start with \`${run} sda:test\`. If formatting or lint checks fail, use \`${run} sda:fix\` for automatic fixes. Resolve any remaining failures and rerun \`${run} sda:test\` until it passes.

## Web projects

If the user asks for a web page, dashboard, or interactive visualization, create \`src/site/\` for the site unless the project calls for a different folder. Put \`index.html\` at the root, keep all required assets in the site folder, and use relative URLs. Use HTML, CSS, and vanilla JavaScript with classic script tags unless the user specifies a different stack.

Default to one page. Use multiple pages when the user asks for them or when they make the site easier to navigate.

Show a “Last updated” timestamp near the top of each page and refresh it when the content or data changes. Ask which name and email to display as the public contact if the user hasn’t already provided them.

When the site needs data, prepare it in \`sda/\` and export only what the page needs as JSON to \`sda/output/\`. Generate a separate \`data.js\` in the site folder from that export and load it before the page code (so recipients can unzip the site and double-click \`index.html\` without a server).

Add web dependencies only when the user explicitly requests them. For charts, use the user's chosen library. ${chartGuidance}

In \`package.json\`, add a script that runs \`${run} sda:preview\`. Use \`sda:dash\` for a dashboard, \`sda:interactive\` for a standalone interactive visualization, or \`sda:web\` for other web pages. For a different site folder, pass its path with \`--dir\`, for example \`${previewOverride}\`. Reuse an existing alias if it runs the same command. If the preferred name is taken, preserve the existing script and choose an unused name.

Run the alias to start the preview server. Check the page and its interactions at the local URL it prints. The preview serves and watches only the site folder and refreshes the browser when its files change. Share the alias command and local URL with the user.

The \`sda:fix\`, \`sda:test\`, \`sda:watch\`, and \`sda:test:watch\` scripts target analysis code in \`sda/\`. Use the browser preview to verify web changes. When adding automated web tests at the user's request or to cover complex behavior, create \`src/test/\` and add a matching \`package.json\` script such as \`sda:dash:test\` that runs only the web tests using the project's test runner.`,
  });
}
