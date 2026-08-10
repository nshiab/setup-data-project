#!/usr/bin/env node
import {
  cancel,
  intro,
  isCancel,
  multiselect,
  outro,
  select,
  spinner,
} from "@clack/prompts";
import process from "node:process";

import { getRuntime } from "./helpers/getRuntime.ts";
import { PACKAGE_OPTIONS } from "./helpers/packageOptions.ts";
import { ensureGitignore } from "./helpers/ensureGitignore.ts";
import { ensureReadme } from "./helpers/ensureReadme.ts";
import { installPackagesAndFetchDocs } from "./helpers/installPackagesAndFetchDocs.ts";
import { getProjectTasks } from "./helpers/getProjectTasks.ts";
import { createFolderStructure } from "./helpers/createFolderStructure.ts";
import { ensureEnvFile } from "./helpers/ensureEnvFile.ts";
import { ensureAgents } from "./helpers/ensureAgents.ts";
import { getInstalledPackageConfigs } from "./helpers/packageRegistry.ts";
import { ProjectManifest } from "./helpers/projectManifest.ts";
import { syncPackageDocs } from "./helpers/syncPackageDocs.ts";

async function main() {
  const runtime = getRuntime();
  console.log();
  intro(`Hi! 👋 (Running on ${runtime})`);

  const projectManifest = ProjectManifest.open(runtime);
  projectManifest.updateTasks(getProjectTasks());

  const installedPackages = projectManifest.getInstalledPackages();
  const options = PACKAGE_OPTIONS.map((opt) => ({
    ...opt,
    label: installedPackages.includes(opt.value)
      ? `${opt.label} \x1b[2m(installed)\x1b[22m`
      : opt.label,
  }));

  const selectedPackages = (await multiselect({
    message:
      "Which libraries would you like to install?\n\x1b[2m(space to select, arrows to navigate, enter to confirm)\x1b[22m\n",
    options,
    required: false,
  })) as string[];

  if (isCancel(selectedPackages)) {
    cancel("Installation cancelled.");
    process.exit(0);
  }

  const alreadyInstalled = selectedPackages.filter((pkg) =>
    installedPackages.includes(pkg)
  );

  const packagesToInstall: string[] = [];

  for (const pkg of selectedPackages) {
    if (alreadyInstalled.includes(pkg)) {
      const action = await select({
        message: `${pkg} is already installed. What would you like to do?`,
        options: [
          { value: "skip", label: "Keep existing version" },
          { value: "update", label: "Update to latest" },
        ],
      });

      if (isCancel(action)) {
        cancel("Installation cancelled.");
        process.exit(0);
      }

      if (action === "update") {
        packagesToInstall.push(pkg);
      }
    } else {
      packagesToInstall.push(pkg);
    }
  }

  const sInstall = spinner();
  sInstall.start("Installing packages and fetching documentation...");

  for (const pkg of packagesToInstall) {
    try {
      await installPackagesAndFetchDocs([pkg], { silent: true });
    } catch (error) {
      sInstall.stop(`❌ Failed to install ${pkg}.`);
      console.error(error);
      process.exit(1);
    }
  }
  sInstall.stop("✅ Packages installed and documentation fetched.");

  projectManifest.reload();
  projectManifest.updateTasks(getProjectTasks());

  const finalInstalledPackages = getInstalledPackageConfigs(
    projectManifest.getInstalledPackages(),
  ).map((pkg) => pkg.value);
  const docsMapping = await syncPackageDocs(
    finalInstalledPackages,
    packagesToInstall,
  );

  createFolderStructure(finalInstalledPackages);

  ensureGitignore();

  ensureEnvFile();

  await ensureReadme(runtime, finalInstalledPackages);

  await ensureAgents(docsMapping, runtime, finalInstalledPackages);

  outro("You are all set! 🙌");
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`❌ Error: ${message}`);
  process.exitCode = 1;
});
