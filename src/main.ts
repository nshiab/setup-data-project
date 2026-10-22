#!/usr/bin/env node
import { cancel, intro, isCancel, multiselect, outro, select, spinner } from "@clack/prompts";
import process from "node:process";
import { execFileSync } from "node:child_process";

import { getRuntime } from "./helpers/getRuntime.ts";
import { PACKAGE_OPTIONS } from "./helpers/packageOptions.ts";
import { ensureGitignore } from "./helpers/ensureGitignore.ts";
import { ensureReadme } from "./helpers/ensureReadme.ts";
import { ensureTooling } from "./helpers/ensureTooling.ts";
import { ensureVscode } from "./helpers/ensureVscode.ts";
import { runPackageManager, installPackages } from "./helpers/installPackages.ts";
import { getProjectTasks } from "./helpers/getProjectTasks.ts";
import { createFolderStructure } from "./helpers/createFolderStructure.ts";
import { ensureEnvFile } from "./helpers/ensureEnvFile.ts";
import { ensureAgents } from "./helpers/ensureAgents.ts";
import { getInstalledPackageConfigs } from "./helpers/packageRegistry.ts";
import { ProjectManifest } from "./helpers/projectManifest.ts";
import { syncPackageDocs } from "./helpers/syncPackageDocs.ts";
import { getInstalledPackageVersions } from "./helpers/getInstalledPackageVersions.ts";
import { CLI_HELP, parseArguments } from "./helpers/parseArguments.ts";

async function main() {
  const cliOptions = parseArguments(process.argv.slice(2));
  if (cliOptions.help) {
    console.log(CLI_HELP);
    return;
  }

  const runtime = getRuntime();
  const projectManifest = ProjectManifest.open();
  if (cliOptions.docs) {
    await refreshDocs(projectManifest);
    return;
  }
  console.log();
  intro(`Hi! 👋 (Running on ${runtime})`);

  const installedPackages = projectManifest.getInstalledPackages();
  const options = PACKAGE_OPTIONS.map((opt) => ({
    ...opt,
    label: installedPackages.includes(opt.value)
      ? `${opt.label} \x1b[2m(installed)\x1b[22m`
      : opt.label,
  }));

  const selectedPackages =
    cliOptions.packages.length > 0
      ? cliOptions.packages
      : await multiselect({
          message:
            "Which libraries would you like to install?\n\x1b[2m(space to select, arrows to navigate, enter to confirm)\x1b[22m\n",
          options,
          required: false,
        });

  if (isCancel(selectedPackages)) {
    cancel("Installation cancelled.");
    process.exit(0);
  }

  const alreadyInstalled = selectedPackages.filter((pkg) => installedPackages.includes(pkg));

  const packagesToInstall: string[] = [];

  for (const pkg of selectedPackages) {
    if (alreadyInstalled.includes(pkg)) {
      if (cliOptions.packages.length > 0) continue;

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

  projectManifest.updateTasks(getProjectTasks(runtime));

  const sInstall = spinner();
  sInstall.start("Installing packages...");

  try {
    await installPackages(packagesToInstall);
    projectManifest.reload();
    const declared = projectManifest.getInstalledPackageSpecifiers();
    if (
      projectManifest
        .getInstalledPackages()
        .some((pkg) =>
          ["@nshiab/simple-data-analysis", "@nshiab/journalism-dataviz"].includes(pkg),
        ) &&
      !declared["@observablehq/plot"]
    ) {
      await installPackages(["@observablehq/plot"]);
      projectManifest.reload();
    }
    await ensureTooling(projectManifest);
    // Reinstall declared dependencies when a project was cloned without node_modules.
    projectManifest.reload();
    const versions = getInstalledPackageVersions(projectManifest.getInstalledPackageSpecifiers());
    if (projectManifest.getInstalledPackages().some((pkg) => !versions[pkg]))
      await runPackageManager(["install"]);
  } catch (error) {
    sInstall.stop("Package installation failed.");
    throw error;
  }
  sInstall.stop("Packages installed.");

  projectManifest.reload();
  const finalInstalledPackages = getInstalledPackageConfigs(
    projectManifest.getInstalledPackages(),
  ).map((pkg) => pkg.value);
  const docsMapping = await refreshDocs(projectManifest);

  const sConfig = spinner();
  sConfig.start("Preparing project files and configuration...");
  try {
    projectManifest.updateTasks(getProjectTasks());
    execFileSync(process.execPath, ["node_modules/vite-plus/bin/vp", "fmt", "package.json"], {
      stdio: "pipe",
    });

    createFolderStructure(finalInstalledPackages);
    ensureGitignore();
    ensureEnvFile();
    ensureVscode();
    ensureReadme(runtime, finalInstalledPackages);
    ensureAgents(docsMapping, runtime, finalInstalledPackages);
  } catch (error) {
    sConfig.stop("Project configuration failed.");
    throw error;
  }
  sConfig.stop("Project files and configuration ready.");

  outro(
    process.exitCode
      ? "Project setup complete; documentation needs attention."
      : "You are all set! 🙌",
  );
}

async function refreshDocs(manifest: ProjectManifest) {
  const packages = getInstalledPackageConfigs(manifest.getInstalledPackages()).map(
    (pkg) => pkg.value,
  );
  const sDocs = spinner();
  sDocs.start("Downloading documentation...");
  try {
    const mapping = await syncPackageDocs(
      packages,
      getInstalledPackageVersions(manifest.getInstalledPackageSpecifiers()),
    );
    if (Object.keys(mapping).length !== packages.length) {
      sDocs.stop("Documentation incomplete. See the warnings above.");
      process.exitCode = 1;
    } else {
      sDocs.stop(
        packages.length > 0 ? "Documentation downloaded." : "No library documentation to download.",
      );
    }
    return mapping;
  } catch (error) {
    sDocs.stop("Documentation download failed.");
    throw error;
  }
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`❌ Error: ${message}`);
  process.exitCode = 1;
});
