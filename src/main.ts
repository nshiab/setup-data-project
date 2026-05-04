#!/usr/bin/env node
import {
  cancel,
  confirm,
  intro,
  isCancel,
  multiselect,
  outro,
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

async function main() {
  const runtime = getRuntime();
  console.log();
  intro(`Hi! 👋 (Running on ${runtime})`);

  const selectedPackages = (await multiselect({
    message:
      "Which libraries would you like to install? (Space to select, arrows to navigate, enter to confirm)",
    options: PACKAGE_OPTIONS,
    required: false,
  })) as string[];

  if (isCancel(selectedPackages)) {
    cancel("Installation cancelled.");
    process.exit(0);
  }

  const installedPackages = getInstalledPackages();
  const alreadyInstalled = selectedPackages.filter((pkg) =>
    installedPackages.includes(pkg)
  );

  const packagesToInstall: string[] = [];

  for (const pkg of selectedPackages) {
    if (alreadyInstalled.includes(pkg)) {
      const update = await confirm({
        message: `${pkg} is already installed. Do you want to update it?`,
        initialValue: false,
      });

      if (isCancel(update)) {
        cancel("Installation cancelled.");
        process.exit(0);
      }

      if (update) {
        packagesToInstall.push(pkg);
      }
    } else {
      packagesToInstall.push(pkg);
    }
  }

  const docsMapping: Record<string, string> = {};
  for (const pkg of packagesToInstall) {
    const doc = await installPackagesAndFetchDocs([pkg]);
    if (typeof doc === "string") {
      docsMapping[pkg] = doc;
    }
  }

  const s = spinner();
  s.start("Creating folder structure...");
  try {
    const sdaFolder = createFolderStructure(packagesToInstall);

    ensureGitignore();

    await ensureEnvFile();

    updateProjectConfig(getProjectTasks());

    await ensureReadme(runtime);

    await ensureAgents(docsMapping, runtime);

    s.stop(`✅ Folder structure created in ${sdaFolder}/`);
  } catch (error) {
    s.stop("❌ Failed to create folder structure.");
    console.error(error);
    process.exit(1);
  }

  outro("You are all set! Check the README.md to get started. 🙌");
}

main().catch(console.error);
