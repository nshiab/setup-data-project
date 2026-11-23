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
    content: `See [AGENTS.md](AGENTS.md) for the project's AI agent instructions.

${libraries ? `Installed libraries: ${libraries}.\n\n` : ""}## Data analysis

Use \`sda/main.ts\` to process source data from \`sda/data/\` and write results to \`sda/output/\`. Git ignores both data folders. Put reusable helpers in \`sda/helpers/\`. Use \`sda/test/\` for analysis tests named \`*.test.ts\`.${runtime === "bun" ? " Use Bun 1.3.1 or newer to run checks before adding your first test." : ""}

- \`${run} sda\`: run \`${run} sda:fix\`, then run the analysis once if checks pass.
- \`${run} sda:fix\`: format files, apply automatic lint fixes, and check types under sda/.
- \`${run} sda:watch\`: rerun fixes and analysis when sda/ or .env changes, excluding sda/output/.
- \`${run} sda:status\`: check whether an analysis run or analysis watcher is active.
- \`${run} sda:test\`: check formatting, lint, and TypeScript types under sda/, then run its tests.
- \`${run} sda:test:watch\`: rerun checks and tests when analysis files or project settings change, excluding sda/output/.
- \`${run} sda:clean\`: delete cached results and temporary files in .sda-cache/, .journalism-cache/, and .tmp/.

## Editor and documentation

In VS Code, install the recommended Oxc extension for formatting and linting. The generated \`.vscode/settings.json\` enables formatting on save, Oxc lint fixes on explicit saves, and word wrapping. Setup preserves existing VS Code configuration files.

Run \`${run} sda:docs\` after installing or updating an SDA, journalism, or Observable Plot package. It refreshes the local docs for the versions installed in your project. Git ignores \`docs/\`.`,
  });
}
