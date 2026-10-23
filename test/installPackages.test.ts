import { expect, test, vi } from "vite-plus/test";
import { chmodSync, readFileSync, writeFileSync } from "node:fs";
import { installPackages } from "../src/helpers/installPackages.ts";
import { getRuntime } from "../src/helpers/getRuntime.ts";
import { ensureTooling } from "../src/helpers/ensureTooling.ts";
import { ProjectManifest } from "../src/helpers/projectManifest.ts";
import metadata from "../package.json" with { type: "json" };
import { temporaryProject } from "./helpers/utils.ts";
vi.mock("../src/helpers/getRuntime.ts", () => ({ getRuntime: vi.fn(() => "node") }));
temporaryProject();
test("package manager failures reject with an actionable command", async () => {
  vi.mocked(getRuntime).mockReturnValue("node");
  vi.stubEnv("PATH", "");
  try {
    await expect(installPackages(["@nshiab/simple-data-analysis-core"])).rejects.toThrow(
      "install @nshiab/simple-data-analysis-core failed",
    );
  } finally {
    vi.unstubAllEnvs();
  }
});
test.skipIf(process.platform === "win32")(
  "npm and Bun receive their own development dependency flags",
  async () => {
    for (const runtime of ["node", "bun"]) {
      const bun = runtime === "bun";
      const command = bun ? "bun" : "npm";
      vi.mocked(getRuntime).mockReturnValue(bun ? "bun" : "node");
      writeFileSync(
        command,
        `#!${process.execPath}\nrequire("node:fs").writeFileSync("arguments.json", JSON.stringify(process.argv.slice(2)));\n`,
      );
      chmodSync(command, 0o755);
      vi.stubEnv("PATH", process.cwd());
      try {
        await installPackages(["oxfmt@latest"], { development: true });
        const args: unknown = JSON.parse(readFileSync("arguments.json", "utf8"));
        expect(args).toEqual(
          bun ? ["add", "--dev", "oxfmt@latest"] : ["install", "--save-dev", "oxfmt@latest"],
        );
        writeFileSync("package.json", '{"private":true}');
        await ensureTooling(ProjectManifest.open());
        const tooling: unknown = JSON.parse(readFileSync("arguments.json", "utf8"));
        expect(tooling).toEqual([
          bun ? "add" : "install",
          bun ? "--dev" : "--save-dev",
          "oxfmt@latest",
          "oxlint@latest",
          "oxlint-tsgolint@latest",
          "@types/node@latest",
          ...(bun ? ["@types/bun@latest"] : []),
          `${metadata.name}@${metadata.version}`,
        ]);
      } finally {
        vi.unstubAllEnvs();
      }
    }
  },
);
