import { ensureManagedSection } from "./ensureManagedSection.ts";
import { getInstalledPackageConfigs } from "./packageRegistry.ts";
import type { Runtime } from "./getRuntime.ts";
export function ensureReadme(runtime: Runtime, installedPackages: string[] = []) {
  const run = runtime === "bun" ? "bun run" : "npm run";
  const vp = runtime === "bun" ? "bun run --bun vp" : "npx vp";
  const libraries = getInstalledPackageConfigs(installedPackages)
    .map((pkg) => `\`${pkg.value}\``)
    .join(", ");
  ensureManagedSection({
    path: "README.md",
    name: "libraries",
    createContent: (section) =>
      `# Data project\n\nCreated with [setup-data-project](https://github.com/nshiab/setup-data-project).\n\n${section}`,
    content: `${libraries ? `Installed libraries: ${libraries}.\n\n` : ""}Use sda/main.ts to process source data from sda/data/ and write results to sda/output/. Both data folders are ignored by Git. Put reusable helpers in sda/helpers/ and tests in sda/tests/. Import test utilities from \`vite-plus/test\`.

- \`${run} sda\`: run \`${run} fix\`, then run the analysis once if checks pass.
- \`${run} sda:watch\`: do the same on changes to sda/ and .env, excluding sda/output/.
- \`${run} all-tests\`: check types, lint, formatting, and tests; succeeds when no tests exist.
- \`${run} fix\`: apply formatting and automatic fixes.
- \`${run} docs\`: refresh documentation for the installed library versions.
- \`${run} clean\`: delete cached results and temporary files in .sda-cache/, .journalism-cache/, and .tmp/.

For test-driven development, run one test file and watch for changes with \`${vp} test sda/tests/example.test.ts --watch\`. Replace the path with your test file.

In VS Code, install the recommended Vite+ extension pack for Oxc formatting and linting and the Vitest test runner. Generated .vscode/settings.json enables formatting and lint fixes on save, plus visual line wrapping. Existing VS Code configuration files are preserved.

The generated docs/ folder is ignored by Git. Refresh it after cloning or updating dependencies. See AGENTS.md for documentation pointers.`,
  });
}
