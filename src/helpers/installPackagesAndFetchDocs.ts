import { spinner } from "@clack/prompts";
import * as childProcess from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { getRuntime } from "./getRuntime.ts";

export const commandRunner = {
  exec: childProcess.exec,
};

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
        const installCmd = runtime === "deno"
          ? (isObservablePlot ? "deno add npm:" + p : "deno add jsr:" + p)
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

      // Documentation logic
      if (pkg === "@observablehq/plot") {
        continue;
      }

      const sFetch = spinner();
      try {
        if (!options.silent) {
          sFetch.start("Fetching documentation for " + pkg + "...");
        }
        const repoName = pkg.split("/")[1];
        const url = "https://raw.githubusercontent.com/nshiab/" + repoName +
          "/refs/heads/main/llm.md";

        const response = await fetch(url);
        if (response.ok) {
          const docContent = await response.text();
          writeFileSync(join("docs", repoName + ".md"), docContent);
          if (!options.silent) {
            sFetch.stop("✅ Documentation for " + pkg + " saved!");
          }
          lastDoc = docContent;
        } else {
          if (!options.silent) {
            sFetch.stop(
              "⚠️  No documentation (llm.md) found for " + pkg +
                ". Skipping doc fetch.",
            );
          }
        }
      } catch (error) {
        if (!options.silent) {
          sFetch.stop("❌ Failed to fetch documentation for " + pkg + ".");
        }
        console.error(error);
      }
    }
    return lastDoc;
  }
}
