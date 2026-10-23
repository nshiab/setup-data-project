import { expect, test } from "vite-plus/test";
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { getProjectTasks } from "../src/helpers/getProjectTasks.ts";
import { ProjectManifest } from "../src/helpers/projectManifest.ts";
import { temporaryProject } from "./helpers/utils.ts";

const hasBun = spawnSync("bun", ["--version"]).status === 0;
const cachePaths = [".sda-cache", ".journalism-cache", ".tmp"];
temporaryProject();

for (const runtime of ["node", "bun"] as const) {
  test.skipIf(runtime === "bun" && !hasBun)(
    `${runtime === "bun" ? "bun" : "npm"} run clean removes only cache paths from a project with spaces`,
    () => {
      mkdirSync("project with spaces");
      process.chdir("project with spaces");
      const tasks = getProjectTasks(runtime);
      expect(tasks.clean.startsWith(`${runtime} -e `)).toBe(true);
      ProjectManifest.open().updateTasks(tasks);

      const preservedFiles = {
        "package.json": readFileSync("package.json", "utf8"),
        ".env": "EXAMPLE=preserved\n",
        ".sda-cache-keep/cached.json": '{"keep":true}\n',
        "sda/output/report.csv": "name,value\nexample,1\n",
      };
      for (const [path, content] of Object.entries(preservedFiles)) {
        mkdirSync(dirname(path), { recursive: true });
        writeFileSync(path, content);
      }

      const clean = () => {
        const result = spawnSync(runtime === "bun" ? "bun" : "npm", ["run", "clean"], {
          encoding: "utf8",
          shell: runtime === "node" && process.platform === "win32",
          timeout: 10_000,
        });
        expect(result.error).toBeUndefined();
        expect(result.status, `${result.stdout}\n${result.stderr}`).toBe(0);
        for (const path of cachePaths) expect(existsSync(path)).toBe(false);
        for (const [path, content] of Object.entries(preservedFiles)) {
          expect(readFileSync(path, "utf8")).toBe(content);
        }
        expect(readdirSync(".").sort()).toEqual([".env", ".sda-cache-keep", "package.json", "sda"]);
      };

      for (const path of cachePaths) {
        const nested = join(path, "nested folder", "deeper");
        mkdirSync(nested, { recursive: true });
        writeFileSync(join(nested, "cached data.json"), '{"temporary":true}\n');
      }
      clean();

      for (const path of cachePaths) writeFileSync(path, "temporary cache file\n");
      clean();
      clean();
    },
    30_000,
  );
}
