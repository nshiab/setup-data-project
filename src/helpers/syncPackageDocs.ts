import { log } from "@clack/prompts";
import { existsSync, mkdirSync, renameSync, rmSync } from "node:fs";
import { join } from "node:path";
import { fetchPackageDocs, type PackageDocs } from "./fetchPackageDocs.ts";
import { SUPPORTED_PACKAGES } from "./packageRegistry.ts";

export async function syncPackageDocs(
  installedPackages: string[],
  installedVersions: Record<string, string>,
): Promise<Record<string, PackageDocs>> {
  const installedSet = new Set(installedPackages);
  const docsMapping: Record<string, PackageDocs> = {};

  for (const pkg of SUPPORTED_PACKAGES) {
    const repoName = pkg.value.split("/")[1];
    const docsDirectory = join("docs", repoName);
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

    const version = installedVersions[pkg.value];
    if (version === undefined) {
      log.warn(
        `Could not determine the exact installed version of ${pkg.value}. ` +
          "Existing local documentation was preserved but will not be " +
          "included in AGENTS.md.",
      );
      continue;
    }

    const docs = await fetchPackageDocs(pkg.value, version, { silent: true });
    if (docs.readme !== undefined || docs.llm !== undefined) {
      docsMapping[pkg.value] = docs;
    }
  }

  return docsMapping;
}
