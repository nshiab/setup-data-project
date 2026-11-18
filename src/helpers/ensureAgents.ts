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

Do data analysis and processing in \`sda/\`. When installed, use Simple Data Analysis (\`@nshiab/simple-data-analysis\`) or Simple Data Analysis Core (\`@nshiab/simple-data-analysis-core\`) for loading, cleaning, joining, and aggregating data, and for other transformations.

Use \`sda/main.ts\` as the entry point and \`sda/helpers/\` for reusable helpers. Keep one function per helper file, with the file named after the function. Put source data in \`sda/data/\` and analysis results in \`sda/output/\`.

Save static charts to \`sda/output/\` as \`.png\` files unless the user requests another format.

Add focused tests for error-prone transformations, reusable logic with meaningful edge cases, and bug fixes. Mirror source paths under sda/test/: for example, sda/helpers/cleanRows.ts maps to sda/test/helpers/cleanRows.test.ts. Prefer the runtime's built-in test runner.

Run \`${run} sda\` to fix and check code, then execute the analysis once.

Run \`${run} sda:clean\` only when cached results and temporary files can be discarded.

Before handing off analysis code changes, run \`${run} sda:test\` and resolve failures.

## Web projects

If the user asks for a web page, dashboard, or interactive visualization, create \`src/\` if it does not exist. Put \`index.html\` at the root of \`src/\`, keep all site assets inside it, and use relative URLs for local files so the folder can be uploaded directly to a static host. Use HTML, CSS, and vanilla JavaScript unless the user specifies a different stack.

When the site needs data, prepare it in \`sda/\` and export only the data the site needs into \`src/\`, in a browser-readable format such as JSON. Load that export from the page and use browser JavaScript to render it and handle interactions such as filtering or highlighting.

For charts, use the user's chosen library, Observable Plot if already installed, or native browser APIs, in that order. Add web dependencies only when the user explicitly requests them. If you use the installed Observable Plot, copy its browser bundle and its D3 dependency's browser bundle into \`src/\`. Load D3 before Plot.

Use \`${run} sda:preview\` to serve \`src/\` locally. Open the URL it prints. The browser refreshes when files in \`src/\` change. For a deliverable-specific command, use an alias for that script such as \`sda:dash\` for a dashboard, \`sda:interactive\` for a standalone interactive chart, or \`sda:web\` for a web page. Preserve existing scripts.

Verify the page and its interactions in a browser. Share the preview command and local URL, and tell the user that \`src/\` is ready to upload to a static host.`,
  });
}
