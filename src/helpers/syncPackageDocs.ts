import { log } from "@clack/prompts";
import { existsSync, readFileSync, rmSync } from "node:fs";
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
    const docPath = join("docs", pkg.value.split("/")[1] + ".md");

    if (!installedSet.has(pkg.value)) {
      if (existsSync(docPath)) {
        rmSync(docPath);
        log.info(`Removed stale documentation at ${docPath}.`);
      }
      continue;
    }

    if (!existsSync(docPath) && !refreshedSet.has(pkg.value)) {
      await fetchPackageDocs(pkg.value, { silent: true });
    }

    if (existsSync(docPath)) {
      docsMapping[pkg.value] = readFileSync(docPath, "utf-8");
    }
  }

  return docsMapping;
}
