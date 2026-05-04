import { spinner } from "@clack/prompts";
import * as childProcess from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import process from "node:process";
import { getRuntime } from "./getRuntime.ts";

export const commandRunner = {
  execSync: childProcess.execSync,
};

export async function installPackagesAndFetchDocs(selectedPackages: string[]) {
  const runtime = getRuntime();

  if (Array.isArray(selectedPackages) && selectedPackages.length > 0) {
    if (!existsSync("docs")) {
      mkdirSync("docs");
    }

    for (const pkg of selectedPackages) {
      const s = spinner();
      const installCmd = runtime === "deno"
        ? `deno add jsr:${pkg}`
        : runtime === "bun"
        ? `bun add ${pkg}`
        : `npm install ${pkg}`;

      s.start(`Installing ${pkg} via ${runtime}...`);

      try {
        commandRunner.execSync(installCmd, { stdio: "ignore" });
        s.stop(`✅ ${pkg} installed!`);

        const sFetch = spinner();
        sFetch.start(`Fetching documentation for ${pkg}...`);
        const repoName = pkg.split("/")[1];
        const url =
          `https://raw.githubusercontent.com/nshiab/${repoName}/refs/heads/main/llm.md`;

        const response = await fetch(url);
        if (response.ok) {
          const docContent = await response.text();
          writeFileSync(join("docs", `${repoName}.md`), docContent);
          sFetch.stop(`✅ Documentation for ${pkg} saved!`);
        } else {
          sFetch.stop(`❌ No documentation found for ${pkg}.`);
        }
      } catch (error) {
        s.stop(`❌ Failed to install ${pkg}.`);
        console.error(error);
        process.exit(1);
      }
    }
  }
}
