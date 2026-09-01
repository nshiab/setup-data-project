import { log } from "@clack/prompts";
import { ensureManagedSection } from "./ensureManagedSection.ts";
import { getInstalledPackageConfigs } from "./packageRegistry.ts";

export function ensureReadme(
  runtime: string,
  installedPackages: string[] = [],
) {
  let runCommand = "npm run";
  if (runtime === "deno") {
    runCommand = "deno task";
  } else if (runtime === "bun") {
    runCommand = "bun run";
  }

  const installedPackageConfigs = getInstalledPackageConfigs(
    installedPackages,
  );
  const hasSdaCore = installedPackageConfigs.some((pkg) =>
    pkg.value === "@nshiab/simple-data-analysis-core"
  );
  const hasFullSda = installedPackageConfigs.some((pkg) =>
    pkg.value === "@nshiab/simple-data-analysis"
  );
  const hasJournalism = installedPackageConfigs.some((pkg) =>
    pkg.type === "journalism"
  );

  const libraryLinks = [
    hasSdaCore
      ? "[simple-data-analysis-core](https://github.com/nshiab/simple-data-analysis-core)"
      : "",
    hasFullSda
      ? "[simple-data-analysis](https://github.com/nshiab/simple-data-analysis)"
      : "",
    hasJournalism ? "[journalism](https://github.com/nshiab/journalism)" : "",
  ].filter(Boolean);
  const librarySection = libraryLinks.length === 0
    ? ""
    : `It has installed ${libraryLinks.join(" and ")} ${
      libraryLinks.length === 1 ? "library" : "libraries"
    }, along with
up-to-date documentation and AI agent instructions.`;

  const status = ensureManagedSection({
    path: "README.md",
    name: "libraries",
    content: librarySection,
    createContent: (managedSection) =>
      `This repository was created with
[setup-data-project](https://github.com/nshiab/setup-data-project/).

${managedSection}

Here's the recommended workflow:

- Put your raw data in the \`sda/data\` folder. Note that this folder is
  ignored by Git.
- Use the \`sda/main.ts\` file to process your raw data. Write the
  results to the \`sda/output\` folder, which is also ignored by Git.
- Put your tests in the \`sda/tests\` folder.

When working on your project, use the following commands:

- \`${runCommand} sda\` will watch your \`sda/main.ts\` and its dependencies.
  Whenever you save changes, the data will be reprocessed.
- \`${runCommand} all-tests\` will run the project's test command.
- \`${runCommand} clean\` will remove cache and temporary files, if present.

Have fun!`,
  });
  if (status === "created") {
    log.info("Created README.md");
  } else if (status === "updated") {
    log.info("Updated README.md");
  }
}
