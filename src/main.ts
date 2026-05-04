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

async function main() {
  const runtime = getRuntime();
  console.log();
  intro(`Hi! 👋 (Running on ${runtime})`);

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

  const docsMapping: Record<string, string> = {};
  const sInstall = spinner();
  sInstall.start("Installing packages and fetching documentation...");

  for (const pkg of packagesToInstall) {
    try {
      const doc = await installPackagesAndFetchDocs([pkg]);
      if (typeof doc === "string") {
        docsMapping[pkg] = doc;
      }
    } catch (error) {
      sInstall.stop(`❌ Failed to install ${pkg}.`);
      console.error(error);
      process.exit(1);
    }
  }
  sInstall.stop("✅ Packages installed and documentation fetched.");

  const s = spinner();
  s.start("Creating folder structure...");
  try {
    const sdaFolder = await createFolderStructure(packagesToInstall);

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

  outro("You are all set! 🙌");
}

main().catch(console.error);
