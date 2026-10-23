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
      return `- Observable Plot charts and maps: start at \`docs/observable-plot/llms.txt\`, then read the relevant pages for use with writeChart and writeMap.`;
    return `- \`${pkg.value}\`: start at \`docs/${pkg.value.slice("@nshiab/".length)}/llms.txt\`, then read the relevant API pages and examples.`;
  });
  ensureManagedSection({
    path: "AGENTS.md",
    name: "agents",
    createContent: (section) => section,
    content: `Read README.md for project guidance and package.json for the installed libraries and scripts. Prefer the installed data libraries when they cover the task.

Before starting work, run \`${run} sda:status\` and follow its instructions.

Use sda/main.ts as the entry point and sda/helpers/ for reusable helpers. Put source data in sda/data/ and results in sda/output/.

Put tests in sda/test/ and prefer the runtime's built-in test runner. When adding tests, extend the \`all-tests\` script to run them after the existing checks.

Library documentation in docs/ is generated and ignored by Git. Run \`${run} docs\` when documentation is missing or after dependency changes; resolve refresh failures before using possibly stale references. Edit project source files rather than downloaded documentation.

${links.join("\n")}

Run \`${run} sda\` to fix and check code, then execute the analysis once. Use \`${run} sda:watch\` to watch for changes.

The clean script removes cached results and temporary files. Run it only when those cached results can be discarded.

Before handing off code changes, run \`${run} all-tests\` and resolve failures.`,
  });
}
