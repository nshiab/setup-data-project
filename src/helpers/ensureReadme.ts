import { ensureManagedSection } from "./ensureManagedSection.ts";
import { getInstalledPackageConfigs } from "./packageRegistry.ts";
import type { Runtime } from "./getRuntime.ts";
export function ensureReadme(runtime: Runtime, installedPackages: string[] = []) {
  const run = runtime === "bun" ? "bun run" : "npm run";
  const libraries = getInstalledPackageConfigs(installedPackages)
    .map((pkg) => `\`${pkg.value}\``)
    .join(", ");
  ensureManagedSection({
    path: "README.md",
    name: "libraries",
    createContent: (section) =>
      `# Data project\n\nCreated with [setup-data-project](https://github.com/nshiab/setup-data-project).\n\n${section}`,
    content: `${libraries ? `Installed libraries: ${libraries}.\n\n` : ""}Use sda/main.ts to process source data from sda/data/ and write results to sda/output/. Both data folders are ignored by Git. Put reusable helpers in sda/helpers/ and tests in sda/test/.

- \`${run} sda\`: run \`${run} fix\`, then run the analysis once if checks pass.
- \`${run} sda:watch\`: do the same on changes to sda/ and .env, excluding sda/output/.
- \`${run} sda:status\`: check whether an SDA run or watcher is active.
- \`${run} all-tests\`: check formatting, lint, and TypeScript types. When adding tests, extend this script to run them after the existing checks.
- \`${run} fix\`: format files, apply automatic lint fixes, and check types.
- \`${run} docs\`: refresh documentation for the installed library versions.
- \`${run} clean\`: delete cached results and temporary files in .sda-cache/, .journalism-cache/, and .tmp/.

SDA blocks simultaneous runs. Recovery after a forced termination is best effort.

In VS Code, install the recommended Oxc extension for formatting and linting. Generated .vscode/settings.json enables formatting and lint fixes on save, plus visual line wrapping. Existing VS Code configuration files are preserved.

The generated docs/ folder is ignored by Git. Refresh it after cloning or updating dependencies. See AGENTS.md for documentation pointers.`,
  });
}
