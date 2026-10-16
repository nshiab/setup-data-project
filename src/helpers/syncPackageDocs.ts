import { log } from "@clack/prompts";
import { fetchPackageDocs, type PackageDocs } from "./fetchPackageDocs.ts";
import { fetchPlotDocs } from "./fetchPlotDocs.ts";
import { getInstalledPackageConfigs } from "./packageRegistry.ts";
export async function syncPackageDocs(
  installedPackages: string[],
  installedVersions: Record<string, string>,
): Promise<Record<string, PackageDocs>> {
  const mapping: Record<string, PackageDocs> = {};
  for (const pkg of getInstalledPackageConfigs(installedPackages)) {
    const version = installedVersions[pkg.value];
    if (!version) {
      log.warn(
        `Could not determine the installed version of ${pkg.value}. Install the project dependencies, then run the docs script again. Existing documentation may be stale.`,
      );
      continue;
    }
    const docs =
      pkg.value === "@observablehq/plot"
        ? await fetchPlotDocs(version)
        : await fetchPackageDocs(pkg.value, version);
    if (docs.index !== undefined || docs.plot) mapping[pkg.value] = docs;
  }
  return mapping;
}
