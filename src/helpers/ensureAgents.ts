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
  const command = runtime === "bun" ? "bun run sda/main.ts" : "node --env-file=.env sda/main.ts";
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

For a single execution, run \`${command}\`. The sda script watches for changes. Before handing off code changes, run \`${run} all-tests\` and resolve failures.

Before editing, check .sda.pid. If present, verify that its PID belongs to this project's scripts/sda.mjs runner using the process command and working directory. Stop that runner with SIGTERM and wait for it to exit before editing. Tell the user you stopped the watcher and that they can restart it with \`${run} sda\` after the work is done. Remove a stale PID file only after verifying it no longer identifies this project's runner. Leave the watcher running for read-only work.

The clean script removes cached results and temporary files. Run it only when those cached results can be discarded.

Library documentation in docs/ is generated and ignored by Git. Run \`${run} docs\` when documentation is missing or after dependency changes; resolve refresh failures before using possibly stale references. Edit project source files rather than downloaded documentation.

${links.join("\n")}`,
  });
}
