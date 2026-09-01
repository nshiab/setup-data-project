import { log, spinner } from "@clack/prompts";
import * as childProcess from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { getRuntime } from "./getRuntime.ts";

export const commandRunner = {
  exec: childProcess.exec,
};

// Temporary: remove this bypass after the 2.0 release window.
// https://github.com/nshiab/setup-data-project/issues/15
const PACKAGES_WITH_FRESH_DENO_RELEASES = new Set([
  "@nshiab/simple-data-analysis-core",
  "@nshiab/simple-data-analysis",
]);

export async function fetchPackageDocs(
  pkg: string,
  options: { silent?: boolean } = {},
): Promise<string | undefined> {
  if (!existsSync("docs")) {
    mkdirSync("docs");
  }

  const sFetch = spinner();
  if (!options.silent) {
    sFetch.start("Fetching documentation for " + pkg + "...");
  }

  try {
    const repoName = pkg.split("/")[1];
    const url = "https://raw.githubusercontent.com/nshiab/" + repoName +
      "/refs/heads/main/llm.md";
    const response = await fetch(url);

    if (!response.ok) {
      if (!options.silent) {
        sFetch.stop("⚠️  No documentation (llm.md) found for " + pkg + ".");
      }
      log.warn(
        `Documentation for ${pkg} could not be refreshed. Rerun the script ` +
          "later to try again.",
      );
      return undefined;
    }

    const docContent = await response.text();
    writeFileSync(join("docs", repoName + ".md"), docContent);
    if (!options.silent) {
      sFetch.stop("✅ Documentation for " + pkg + " saved!");
    }
    return docContent;
  } catch (error) {
    if (!options.silent) {
      sFetch.stop("❌ Failed to fetch documentation for " + pkg + ".");
    }
    log.warn(
      `Documentation for ${pkg} could not be refreshed. Rerun the script ` +
        "later to try again.",
    );
    console.error(error);
    return undefined;
  }
}

export async function installPackagesAndFetchDocs(
  selectedPackages: string[],
  options: { silent?: boolean } = {},
): Promise<string | void> {
  const runtime = getRuntime();

  if (Array.isArray(selectedPackages) && selectedPackages.length > 0) {
    if (!existsSync("docs")) {
      mkdirSync("docs");
    }

    let lastDoc = "";
    for (const pkg of selectedPackages) {
      const s = spinner();

      const pkgsToInstall = [pkg];
      if (
        pkg === "@nshiab/simple-data-analysis" ||
        pkg === "@nshiab/journalism-dataviz"
      ) {
        pkgsToInstall.push("@observablehq/plot");
      }

      for (const p of pkgsToInstall) {
        const isObservablePlot = p === "@observablehq/plot";
        const minimumDependencyAgeOption =
          PACKAGES_WITH_FRESH_DENO_RELEASES.has(p) ? " --min-dep-age=0" : "";
        const installCmd = runtime === "deno"
          ? (isObservablePlot
            ? "deno add npm:" + p
            : "deno add" + minimumDependencyAgeOption + " jsr:" + p)
          : runtime === "bun"
          ? "bun add " + p
          : "npm install " + p;

        if (!options.silent) {
          s.start("Installing " + p + " via " + runtime + "...");
        }

        try {
          await new Promise((resolve, reject) => {
            commandRunner.exec(installCmd, (error) => {
              if (error) {
                reject(error);
              } else {
                resolve(void 0);
              }
            });
          });
          if (!options.silent) {
            s.stop("✅ " + p + " installed!");
          }
        } catch (error) {
          if (!options.silent) {
            s.stop("❌ Failed to install " + p + ".");
          }
          throw error;
        }
      }

      const docContent = await fetchPackageDocs(pkg, options);
      if (docContent !== undefined) {
        lastDoc = docContent;
      }
    }
    return lastDoc;
  }
}
