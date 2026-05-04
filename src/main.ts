#!/usr/bin/env node
import {
  cancel,
  intro,
  isCancel,
  multiselect,
  outro,
  spinner,
} from "@clack/prompts";
import process from "node:process";

import { getRuntime } from "./helpers/getRuntime.ts";
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
  intro(`Hi! 👋 (Running on ${runtime})`);

  const selectedPackages = (await multiselect({
    message: "Which libraries would you like to install?",
    options: PACKAGE_OPTIONS,
    required: false,
  })) as string[];

  if (isCancel(selectedPackages)) {
    cancel("Installation cancelled.");
    process.exit(0);
  }

  const docsMapping: Record<string, string> = {};
  for (const pkg of selectedPackages) {
    const doc = await installPackagesAndFetchDocs([pkg]);
    if (typeof doc === "string") {
      docsMapping[pkg] = doc;
    }
  }

  const s = spinner();
  s.start("Creating folder structure...");
  try {
    const sdaFolder = createFolderStructure(selectedPackages);

    ensureGitignore();

    ensureEnvFile();

    updateProjectConfig(getProjectTasks());

    ensureReadme(runtime);

    ensureAgents(docsMapping);

    s.stop(`✅ Folder structure created in ${sdaFolder}/`);
  } catch (error) {
    s.stop("❌ Failed to create folder structure.");
    console.error(error);
    process.exit(1);
  }

  outro("You are all set! 🙌");
}

main().catch(console.error);
