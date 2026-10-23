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
  const vp = runtime === "bun" ? "bun run --bun vp" : "npx vp";
  const links = getInstalledPackageConfigs(installedPackages).map((pkg) => {
    if (pkg.value === "@observablehq/plot")
      return `- Observable Plot charts and maps: start at \`docs/observable-plot/llms.txt\`, then read the relevant pages for use with writeChart and writeMap.`;
    return `- \`${pkg.value}\`: start at \`docs/${pkg.value.slice("@nshiab/".length)}/llms.txt\`, then read the relevant API pages and examples.`;
  });
  ensureManagedSection({
    path: "AGENTS.md",
    name: "agents",
    createContent: (section) => section,
    content: `Read package.json for the installed libraries and scripts. Prefer the installed data libraries when they cover the task.

Use sda/main.ts as the entry point and sda/helpers/ for reusable helpers. Put tests in sda/tests/, source data in sda/data/, and results in sda/output/. Import test utilities from \`vite-plus/test\`.

Run \`${run} sda\` to fix and check code, then execute the analysis once. Use \`${run} sda:watch\` to watch for changes. Before handing off code changes, run \`${run} all-tests\` and resolve failures.

Before starting work, run \`${run} sda:status\` and follow its instructions.

For a focused test run, use \`${vp} test sda/tests/example.test.ts\`, replacing the path with your test file. Add \`--watch\` for test-driven development.

The clean script removes cached results and temporary files. Run it only when those cached results can be discarded.

Library documentation in docs/ is generated and ignored by Git. Run \`${run} docs\` when documentation is missing or after dependency changes; resolve refresh failures before using possibly stale references. Edit project source files rather than downloaded documentation.

${links.join("\n")}`,
  });
}
