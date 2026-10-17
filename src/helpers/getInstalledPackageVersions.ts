import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { isObject } from "./jsonObject.ts";
export function getInstalledPackageVersions(
  packageSpecifiers: Record<string, string>,
): Record<string, string> {
  const versions: Record<string, string> = {};
  for (const pkg of Object.keys(packageSpecifiers)) {
    const path = join("node_modules", pkg, "package.json");
    if (!existsSync(path)) continue;
    const config: unknown = JSON.parse(readFileSync(path, "utf8"));
    if (
      isObject(config) &&
      typeof config.version === "string" &&
      /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/.test(config.version)
    )
      versions[pkg] = config.version;
  }
  return versions;
}
