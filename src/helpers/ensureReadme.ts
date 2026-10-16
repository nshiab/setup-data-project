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
    content: `${libraries ? `Installed libraries: ${libraries}.\n\n` : ""}Use sda/main.ts to process source data from sda/data/ and write results to sda/output/. Both data folders are ignored by Git. Put reusable helpers in sda/helpers/ and tests in sda/tests/. Import test utilities from \`vite-plus/test\`.

- \`${run} sda\`: run the analysis and watch for changes.
- \`${run} all-tests\`: check types, lint, formatting, and tests.
- \`${run} fix\`: apply formatting and automatic fixes.
- \`${run} docs\`: refresh documentation for the installed library versions.

The generated docs/ folder is ignored by Git. Refresh it after cloning or updating dependencies. See AGENTS.md for documentation pointers.`,
  });
}
