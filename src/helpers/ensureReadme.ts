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
  const hasSda = installedPackageConfigs.some((pkg) => pkg.type === "sda");
  const hasJournalism = installedPackageConfigs.some((pkg) =>
    pkg.type === "journalism"
  );

  const libraryLinks = [
    hasSda
      ? "[simple-data-analysis](https://github.com/nshiab/simple-data-analysis)"
      : "",
    hasJournalism ? "[journalism](https://github.com/nshiab/journalism)" : "",
  ].filter(Boolean);
  const librarySection = libraryLinks.length === 0
    ? ""
    : `It has installed ${libraryLinks.join(" and ")} libraries, along with
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
- Use the \`sda/main.ts\` file to clean and process your raw data. Write the
  results to the \`sda/output\` folder.

When working on your project, use the following command:

- \`${runCommand} sda\` will watch your \`sda/main.ts\` and its dependencies.
  Whenever you save changes, the data will be reprocessed.
- \`${runCommand} clean\` will remove cache and temporary files, if present.

Have fun!`,
  });
  if (status === "created" || status === "updated") {
    log.info("Updated README.md");
  }
}
