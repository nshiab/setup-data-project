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
import { getInstalledPackages } from "./helpers/getInstalledPackages.ts";
import { PACKAGE_OPTIONS } from "./helpers/packageOptions.ts";
import { updateProjectConfig } from "./helpers/updateProjectConfig.ts";
import { ensureGitignore } from "./helpers/ensureGitignore.ts";
import { ensureReadme } from "./helpers/ensureReadme.ts";
import { installPackagesAndFetchDocs } from "./helpers/installPackagesAndFetchDocs.ts";
import { getProjectTasks } from "./helpers/getProjectTasks.ts";
import { createFolderStructure } from "./helpers/createFolderStructure.ts";
import { ensureEnvFile } from "./helpers/ensureEnvFile.ts";
import { ensureAgents } from "./helpers/ensureAgents.ts";
import { SUPPORTED_PACKAGES } from "./helpers/packageRegistry.ts";
import { syncPackageDocs } from "./helpers/syncPackageDocs.ts";

async function main() {
  const runtime = getRuntime();
  console.log();
  intro(`Hi! 👋 (Running on ${runtime})`);

  updateProjectConfig(getProjectTasks());

  const installedPackages = getInstalledPackages();
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

  updateProjectConfig(getProjectTasks());

  const supportedPackageNames = new Set(
    SUPPORTED_PACKAGES.map((pkg) => pkg.value),
  );
  const finalInstalledPackages = getInstalledPackages().filter((pkg) =>
    supportedPackageNames.has(pkg)
  );
  const docsMapping = await syncPackageDocs(
    finalInstalledPackages,
    packagesToInstall,
  );

  await createFolderStructure(packagesToInstall);

  ensureGitignore();

  await ensureEnvFile();

  await ensureReadme(runtime, finalInstalledPackages);

  await ensureAgents(docsMapping, runtime, finalInstalledPackages);

  outro("You are all set! 🙌");
}

main().catch(console.error);
