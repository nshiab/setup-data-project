import { spinner } from "@clack/prompts";
import * as childProcess from "node:child_process";
import { getRuntime } from "./getRuntime.ts";

export const commandRunner = {
  exec: childProcess.exec,
};

export async function installPackages(
  selectedPackages: string[],
  options: { silent?: boolean } = {},
): Promise<void> {
  const runtime = getRuntime();

  for (const selectedPackage of selectedPackages) {
    const packagesToInstall = [selectedPackage];
    if (
      selectedPackage === "@nshiab/simple-data-analysis" ||
      selectedPackage === "@nshiab/journalism-dataviz"
    ) {
      packagesToInstall.push("@observablehq/plot");
    }

    for (const pkg of packagesToInstall) {
      const s = spinner();
      const isObservablePlot = pkg === "@observablehq/plot";
      const installCmd = runtime === "deno"
        ? (isObservablePlot ? "deno add npm:" + pkg : "deno add jsr:" + pkg)
        : runtime === "bun"
        ? "bun add " + pkg
        : "npm install " + pkg;

      if (!options.silent) {
        s.start("Installing " + pkg + " via " + runtime + "...");
      }

      try {
        await new Promise<void>((resolve, reject) => {
          commandRunner.exec(installCmd, (error) => {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          });
        });
        if (!options.silent) {
          s.stop("✅ " + pkg + " installed!");
        }
      } catch (error) {
        if (!options.silent) {
          s.stop("❌ Failed to install " + pkg + ".");
        }
        throw error;
      }
    }
  }
}
