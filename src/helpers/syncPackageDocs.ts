import { log } from "@clack/prompts";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  rmSync,
} from "node:fs";
import { join } from "node:path";
import { fetchPackageDocs } from "./installPackagesAndFetchDocs.ts";
import { SUPPORTED_PACKAGES } from "./packageRegistry.ts";

export async function syncPackageDocs(
  installedPackages: string[],
  docsAlreadyRefreshed: string[] = [],
): Promise<Record<string, string>> {
  const installedSet = new Set(installedPackages);
  const refreshedSet = new Set(docsAlreadyRefreshed);
  const docsMapping: Record<string, string> = {};

  for (const pkg of SUPPORTED_PACKAGES) {
    const repoName = pkg.value.split("/")[1];
    const docsDirectory = join("docs", repoName);
    const readmePath = join(docsDirectory, "README.md");
    const llmDocsPath = join(docsDirectory, "llm.md");
    const legacyDocsPath = join("docs", repoName + ".md");

    if (!installedSet.has(pkg.value)) {
      for (const path of [docsDirectory, legacyDocsPath]) {
        if (existsSync(path)) {
          rmSync(path, { recursive: true });
          log.info(`Removed stale documentation at ${path}.`);
        }
      }
      continue;
    }

    if (existsSync(legacyDocsPath)) {
      if (!existsSync(llmDocsPath)) {
        mkdirSync(docsDirectory, { recursive: true });
        renameSync(legacyDocsPath, llmDocsPath);
        log.info(`Moved documentation to ${llmDocsPath}.`);
      } else {
        rmSync(legacyDocsPath);
      }
    }

    if (
      (!existsSync(readmePath) || !existsSync(llmDocsPath)) &&
      !refreshedSet.has(pkg.value)
    ) {
      await fetchPackageDocs(pkg.value, { silent: true });
    }

    if (existsSync(llmDocsPath)) {
      docsMapping[pkg.value] = readFileSync(llmDocsPath, "utf-8");
    }
  }

  return docsMapping;
}
