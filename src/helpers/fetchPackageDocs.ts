import { log } from "@clack/prompts";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { join, posix } from "node:path";
import { x } from "tar";
import { DOCUMENTED_PACKAGES } from "./packageRegistry.ts";
export interface PackageDocs {
  readme?: string;
  index?: string;
  llm?: string;
  plot?: { version: string; pages: string[] };
}
export async function fetchPackageDocs(pkg: string, version: string): Promise<PackageDocs> {
  const config = DOCUMENTED_PACKAGES.find(
    (item) => item.value === pkg && item.value.startsWith("@nshiab/"),
  );
  if (!config || !/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/.test(version))
    throw new Error(`Unsupported package or version: ${pkg}@${version}`);
  const repo = pkg.slice("@nshiab/".length);
  mkdirSync("docs", { recursive: true });
  const staging = mkdtempSync(join("docs", ".download-"));
  const contents = join(staging, "contents");
  const target = join("docs", repo);
  const backup = join(staging, "previous");
  try {
    const url = `https://github.com/nshiab/${repo}/releases/download/v${version}/documentation.tar.gz`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status} from ${url}`);
    const archive = join(staging, "documentation.tar.gz");
    writeFileSync(archive, Buffer.from(await response.arrayBuffer()));
    mkdirSync(contents);
    let unsafeEntry: string | undefined;
    await x({
      file: archive,
      cwd: contents,
      strict: true,
      preservePaths: false,
      filter(path, entry) {
        const normalized = posix.normalize(path);
        if (
          path.includes("\\") ||
          path.startsWith("/") ||
          normalized === ".." ||
          normalized.startsWith("../") ||
          !("type" in entry) ||
          !["File", "Directory"].includes(entry.type)
        ) {
          unsafeEntry = path;
          return false;
        }
        return true;
      },
    });
    if (unsafeEntry !== undefined) throw new Error(`Unsafe archive entry: ${unsafeEntry}`);
    for (const path of ["README.md", "LICENSE", "llms.txt", "docs"]) {
      if (!existsSync(join(contents, path)))
        throw new Error(`Documentation archive is missing ${path}.`);
    }
    const readme = readFileSync(join(contents, "README.md"), "utf8");
    const index = readFileSync(join(contents, "llms.txt"), "utf8");
    if (existsSync(target)) renameSync(target, backup);
    try {
      renameSync(contents, target);
    } catch (error) {
      if (existsSync(backup)) renameSync(backup, target);
      throw error;
    }
    return { readme, index };
  } catch (error) {
    log.warn(
      `Could not refresh ${pkg}@${version}: ${String(error)} Existing documentation was preserved and may be stale. Run the docs script again after resolving the error.`,
    );
    return {};
  } finally {
    rmSync(staging, { recursive: true, force: true });
  }
}
