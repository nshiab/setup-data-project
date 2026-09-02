import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

type JsonObject = Record<string, unknown>;

export function getInstalledPackageVersions(
  packageSpecifiers: Record<string, string>,
): Record<string, string> {
  const denoLock = readJsonFile("deno.lock");
  const packageLock = readJsonFile("package-lock.json");
  const bunLock = existsSync("bun.lock")
    ? readFileSync("bun.lock", "utf-8")
    : undefined;
  const versions: Record<string, string> = {};

  for (const [pkg, specifier] of Object.entries(packageSpecifiers)) {
    const version = specifier.startsWith("jsr:")
      ? getDenoLockVersion(pkg, specifier, denoLock) ??
        getExactVersion(specifier)
      : getNodeModulesVersion(pkg) ??
        getPackageLockVersion(pkg, packageLock) ??
        getBunLockVersion(pkg, bunLock) ??
        getExactVersion(specifier);

    if (version !== undefined) {
      versions[pkg] = version;
    }
  }

  return versions;
}

function getNodeModulesVersion(pkg: string): string | undefined {
  const packageJson = readJsonFile(
    join("node_modules", ...pkg.split("/"), "package.json"),
  );
  return typeof packageJson?.version === "string"
    ? getExactVersion(packageJson.version)
    : undefined;
}

function getDenoLockVersion(
  pkg: string,
  specifier: string,
  lock: JsonObject | undefined,
): string | undefined {
  if (!lock || !specifier.startsWith("jsr:")) return undefined;
  const specifiers = asObject(lock.specifiers);
  if (!specifiers) return undefined;

  const directVersion = specifiers[specifier];
  if (typeof directVersion === "string") return getExactVersion(directVersion);

  const prefix = `jsr:${pkg}@`;
  const matchingVersions = Object.entries(specifiers)
    .filter(([key, value]) =>
      key.startsWith(prefix) && typeof value === "string"
    )
    .flatMap(([, value]) => {
      const version = getExactVersion(value as string);
      return version === undefined ? [] : [version];
    });
  const uniqueVersions = [...new Set(matchingVersions)];
  return uniqueVersions.length === 1 ? uniqueVersions[0] : undefined;
}

function getPackageLockVersion(
  pkg: string,
  lock: JsonObject | undefined,
): string | undefined {
  if (!lock) return undefined;

  const packages = asObject(lock.packages);
  const packageEntry = packages
    ? asObject(packages[`node_modules/${pkg}`])
    : undefined;
  if (typeof packageEntry?.version === "string") {
    return getExactVersion(packageEntry.version);
  }

  const dependencies = asObject(lock.dependencies);
  const dependencyEntry = dependencies
    ? asObject(dependencies[pkg])
    : undefined;
  return typeof dependencyEntry?.version === "string"
    ? getExactVersion(dependencyEntry.version)
    : undefined;
}

function getBunLockVersion(
  pkg: string,
  lock: string | undefined,
): string | undefined {
  if (!lock) return undefined;
  const escapedPackage = pkg.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = lock.match(
    new RegExp(
      `"${escapedPackage}"\\s*:\\s*\\[\\s*"${escapedPackage}@(\\d+\\.\\d+\\.\\d+(?:-[0-9A-Za-z.-]+)?(?:\\+[0-9A-Za-z.-]+)?)"`,
    ),
  );
  return match?.[1];
}

function getExactVersion(specifier: string): string | undefined {
  return specifier.match(
    /(?:^|@)(\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?)$/,
  )?.[1];
}

function readJsonFile(path: string): JsonObject | undefined {
  if (!existsSync(path)) return undefined;
  try {
    return asObject(JSON.parse(readFileSync(path, "utf-8")));
  } catch {
    return undefined;
  }
}

function asObject(value: unknown): JsonObject | undefined {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? value as JsonObject
    : undefined;
}
