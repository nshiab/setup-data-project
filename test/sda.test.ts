import { afterAll, beforeAll, expect, test, vi } from "vite-plus/test";
import { execFileSync, spawn, spawnSync } from "node:child_process";
import { once } from "node:events";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  rmSync,
  statSync,
  readFileSync,
  renameSync,
  symlinkSync,
  truncateSync,
  writeFileSync,
} from "node:fs";
import { fileURLToPath } from "node:url";
import { setTimeout as delay } from "node:timers/promises";
import { getProjectTasks } from "../src/helpers/getProjectTasks.ts";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { extract } from "tar";
import metadata from "../package.json" with { type: "json" };
import { temporaryProject } from "./helpers/utils.ts";

temporaryProject();
const modules = fileURLToPath(new URL("../node_modules", import.meta.url));
const hasBun = spawnSync("bun", ["--version"]).status === 0;

const repository = fileURLToPath(new URL("..", import.meta.url));
const windows = process.platform === "win32";
const npm = windows ? "npm.cmd" : "npm";
let fixture: string;
let installedModules: string;
let runner: string;
beforeAll(async () => {
  fixture = mkdtempSync(join(tmpdir(), "sda-package-test-"));
  execFileSync(process.execPath, [join(modules, "vite-plus/bin/vp"), "pack"], { cwd: repository });
  execFileSync(npm, ["pack", "--ignore-scripts", "--pack-destination", fixture], {
    cwd: repository,
    stdio: "pipe",
    shell: windows,
  });
  const archive = join(
    fixture,
    metadata.name.replace("@", "").replace("/", "-") + "-" + metadata.version + ".tgz",
  );
  await extract({ file: archive, cwd: fixture });
  symlinkSync(modules, join(fixture, "package/node_modules"), windows ? "junction" : "dir");
  const project = join(fixture, "project");
  mkdirSync(project);
  writeFileSync(join(project, "package.json"), '{"private":true}');
  // Install the unpacked release locally so tests need no registry access or cached dependencies.
  execFileSync(
    npm,
    ["install", "--offline", "--ignore-scripts", "--no-audit", "--no-fund", "../package"],
    { cwd: project, stdio: "pipe", shell: windows },
  );
  installedModules = join(project, "node_modules");
  runner = join(installedModules, "@nshiab/setup-data-project/dist/sda.mjs");
  if (!windows) {
    symlinkSync(join(modules, "vite-plus"), join(installedModules, "vite-plus"), "dir");
    symlinkSync(join(modules, "vite-plus/bin/vp"), join(installedModules, ".bin/vp"));
    symlinkSync(join(modules, "@types"), join(installedModules, "@types"), "dir");
  }
}, 30000);
afterAll(() => {
  if (fixture) rmSync(fixture, { recursive: true, force: true });
});

test("the published package provides an executable watcher", () => {
  expect(readFileSync(runner, "utf8")).toMatch(/^#!\/usr\/bin\/env node/);
  expect(existsSync(join(installedModules, ".bin/sda-watch"))).toBe(true);
  if (process.platform !== "win32") expect(statSync(runner).mode & 0o111).not.toBe(0);
  symlinkSync(installedModules, "node_modules", windows ? "junction" : "dir");
  // Adding a second binary must preserve package-name resolution for the setup command.
  expect(
    execFileSync(npm, ["exec", "--offline", "--", metadata.name, "--help"], {
      encoding: "utf8",
      shell: windows,
    }),
  ).toContain("--docs");
  if (hasBun)
    expect(
      execFileSync("bunx", ["--bun", "--no-install", metadata.name, "--help"], {
        encoding: "utf8",
      }),
    ).toContain("--docs");
});

for (const runtime of ["node", "bun"] as const) {
  test.skipIf(windows || (runtime === "bun" && !hasBun))(
    `${runtime}: sda fixes before one execution, reloads the environment, and returns failures`,
    () => {
      mkdirSync("sda");
      writeFileSync(".env", "SDA_ONCE_TEST=first\n");
      writeFileSync(
        "package.json",
        JSON.stringify({
          type: "module",
          scripts: { ...getProjectTasks(runtime), fix: "node fix.cjs" },
        }),
      );
      writeFileSync(
        "fix.cjs",
        `const fs = require("node:fs");
fs.appendFileSync("runs.txt", "fix\\n");
if (fs.existsSync("fail-fix")) process.exit(2);
`,
      );
      writeFileSync(
        "sda/main.ts",
        `import { appendFileSync, existsSync } from "node:fs";
if (existsSync("sda/.sda.pid")) throw new Error("Single execution created a watcher PID");
appendFileSync("runs.txt", (process.versions.bun ? "bun" : "node") + ":" + process.env.SDA_ONCE_TEST + "\\n");
if (existsSync("fail-analysis")) process.exit(3);
`,
      );
      const run = () => {
        const result = spawnSync(runtime === "bun" ? "bun" : npm, ["run", "sda"], {
          encoding: "utf8",
          timeout: 5000,
        });
        expect(result.error, result.stdout + result.stderr).toBeUndefined();
        expect(existsSync("sda/.sda.pid")).toBe(false);
        return result;
      };
      expect(run().status).toBe(0);
      let expected = `fix\n${runtime}:first\n`;
      expect(readFileSync("runs.txt", "utf8")).toBe(expected);
      writeFileSync(".env", "SDA_ONCE_TEST=second\n");
      expect(run().status).toBe(0);
      expected += `fix\n${runtime}:second\n`;
      expect(readFileSync("runs.txt", "utf8")).toBe(expected);
      writeFileSync("fail-fix", "");
      expect(run().status).toBe(2);
      expected += "fix\n";
      expect(readFileSync("runs.txt", "utf8")).toBe(expected);
      rmSync("fail-fix");
      writeFileSync("fail-analysis", "");
      expect(run().status).toBe(3);
      expect(readFileSync("runs.txt", "utf8")).toBe(expected + `fix\n${runtime}:second\n`);
    },
    15000,
  );

  test.skipIf(process.platform === "win32" || (runtime === "bun" && !hasBun))(
    `${runtime}: PID file identifies the runner, prevents duplicates, and is removed on shutdown`,
    async () => {
      mkdirSync("sda");
      writeFileSync(".env", "");
      writeFileSync("sda/main.ts", "");
      writeFileSync("fix.cjs", "");
      writeFileSync("package.json", JSON.stringify({ scripts: { fix: "node fix.cjs" } }));
      const command = runtime === "bun" ? "bun" : process.execPath;
      const args = [runner, "sda/main.ts"];
      const child = spawn(command, args, { stdio: "ignore" });
      const closed = once(child, "close");
      try {
        await vi.waitFor(() => expect(readFileSync("sda/.sda.pid", "utf8")).toBe(`${child.pid}\n`));
        const duplicate = spawnSync(command, args, { encoding: "utf8" });
        expect(duplicate.status).toBe(1);
        expect(duplicate.stderr).toContain(
          `${runtime === "bun" ? "bun" : "npm"} run sda:watch appears to be already running and watching this project's files`,
        );
        expect(duplicate.stderr).toContain(`PID ${child.pid} from sda/.sda.pid`);
        expect(duplicate.stderr).toContain("Stop the existing watcher with Ctrl+C");
        expect(readFileSync("sda/.sda.pid", "utf8")).toBe(`${child.pid}\n`);
      } finally {
        child.kill("SIGTERM");
        await closed;
      }
      expect(existsSync("sda/.sda.pid")).toBe(false);

      // Recreate the file left by a crash using a process known to have exited.
      writeFileSync("sda/.sda.pid", `${child.pid}\n`);
      const restarted = spawn(command, args, { stdio: "ignore" });
      const restartedClosed = once(restarted, "close");
      try {
        await vi.waitFor(() =>
          expect(readFileSync("sda/.sda.pid", "utf8")).toBe(`${restarted.pid}\n`),
        );
        expect(spawnSync(command, args).status).toBe(1);
        expect(readFileSync("sda/.sda.pid", "utf8")).toBe(`${restarted.pid}\n`);
      } finally {
        restarted.kill("SIGTERM");
        await restartedClosed;
      }
      expect(existsSync("sda/.sda.pid")).toBe(false);

      // Live unrelated processes and malformed files must not be mistaken for dead runners.
      for (const value of [`${process.pid}\n`, "", "0", "-1", "invalid", "2147483648"]) {
        writeFileSync("sda/.sda.pid", value);
        const blocked = spawnSync(command, args, { encoding: "utf8" });
        expect(blocked.status).toBe(1);
        expect(blocked.stderr).toContain("sda/.sda.pid");
        if (value !== `${process.pid}\n`) {
          expect(blocked.stderr).toContain("does not contain a valid process ID");
          expect(blocked.stderr).toContain("Check that no SDA watcher is running");
          expect(blocked.stderr).toContain("delete sda/.sda.pid, then try again");
        }
        expect(readFileSync("sda/.sda.pid", "utf8")).toBe(value);
      }
    },
    10000,
  );

  test.skipIf(process.platform === "win32" || (runtime === "bun" && !hasBun))(
    `${runtime}: folders and explicit files trigger fixed runs without a resolver`,
    async () => {
      mkdirSync("sda/helpers", { recursive: true });
      mkdirSync("sda/data");
      mkdirSync("sda/output");
      symlinkSync(installedModules, "node_modules", "dir");
      writeFileSync(".gitignore", "node_modules/\nsda/output/\nsda/.sda.pid\n");
      writeFileSync(
        "package.json",
        JSON.stringify({ type: "module", scripts: getProjectTasks(runtime) }),
      );
      writeFileSync(
        "vite.config.ts",
        'import { defineConfig } from "vite-plus";\nexport default defineConfig({ lint: { options: { typeAware: true, typeCheck: true }, rules: { "no-debugger": "error" } }, fmt: { ignorePatterns: ["sda/data/**", "sda/output/**"] } });\n',
      );
      writeFileSync(
        "tsconfig.json",
        JSON.stringify({
          compilerOptions: {
            target: "ES2023",
            module: "NodeNext",
            strict: true,
            noEmit: true,
            allowImportingTsExtensions: true,
            types: ["node"],
            skipLibCheck: true,
          },
          include: ["sda/**/*.ts"],
        }),
      );
      writeFileSync(".env", "SDA_WATCH_TEST=loaded\n");
      writeFileSync(
        "sda/main.ts",
        'import { appendFileSync } from "node:fs";\nimport { value } from "./helpers/value.ts";\nimport "../external.ts";\nvoid value;\nappendFileSync("sda/output/runs.txt", `${process.env.SDA_WATCH_TEST}\\n`);\n',
      );
      writeFileSync("external.ts", "export const external = 1;\n");
      writeFileSync("extra.txt", "one");
      const helper = "sda/helpers/value.ts";
      writeFileSync(helper, 'export const value: number = "invalid";\n');
      const child = spawn(
        runtime === "bun" ? "bun" : "npm",
        ["run", "sda:watch", "--", "shared", "extra.txt"],
        {
          detached: true,
          stdio: ["ignore", "pipe", "pipe"],
        },
      );
      let output = "";
      let expected = "";
      child.stdout.on("data", (data: Buffer) => (output += data.toString()));
      child.stderr.on("data", (data: Buffer) => (output += data.toString()));
      const waitForError = () =>
        vi.waitFor(() => expect(output).toContain("Fix failed."), { timeout: 10000 });
      const waitForRun = async (environment = "loaded") => {
        expected += `${environment}\n`;
        await vi.waitFor(
          () => {
            expect(existsSync("sda/output/runs.txt"), output).toBe(true);
            expect(readFileSync("sda/output/runs.txt", "utf8"), output).toBe(expected);
          },
          { timeout: 10000 },
        );
      };
      const expectNoRun = async () => {
        await delay(500);
        expect(output).not.toContain("Fixing and checking...");
        expect(readFileSync("sda/output/runs.txt", "utf8")).toBe(expected);
      };
      try {
        await waitForError();
        expect(output).toContain("2322");
        expect(output).toContain("\u001b[2J");
        expect(existsSync("sda/output/runs.txt")).toBe(false);
        writeFileSync(helper, "export const value:number=1\n");
        await waitForRun();
        expect(readFileSync(helper, "utf8")).toBe("export const value: number = 1;\n");
        expect(existsSync("scripts")).toBe(false);
        expect(existsSync(".sda.pid")).toBe(false);
        output = "";
        writeFileSync("sda/.sda.pid", readFileSync("sda/.sda.pid", "utf8"));
        await expectNoRun();
        writeFileSync(helper, 'export const value: number = "invalid again";\n');
        await waitForError();
        expect(readFileSync("sda/output/runs.txt", "utf8")).toBe(expected);
        writeFileSync(helper, "export const value: number = 2;\n");
        await waitForRun();
        output = "";
        // Even an imported file outside the selected folders must not trigger a run.
        writeFileSync("external.ts", "export const external = 2;\n");
        writeFileSync("sda/output/result.json", "{}");
        writeFileSync("tsconfig.json", readFileSync("tsconfig.json", "utf8") + "\n");
        await expectNoRun();
        writeFileSync("sda/unrelated.ts", "export const unrelated = 1;\n");
        await waitForRun();
        mkdirSync("sda/nested/deep", { recursive: true });
        writeFileSync("sda/nested/deep/notes.txt", "one");
        await waitForRun();
        writeFileSync("sda/nested/deep/notes.txt", "two");
        await waitForRun();
        writeFileSync("sda/data/input.json", "{}");
        await waitForRun();
        // Sparse datasets larger than readFile's limit must never be read by the watcher.
        writeFileSync("sda/data/large.bin", "");
        truncateSync("sda/data/large.bin", 3 * 1024 ** 3);
        await waitForRun();
        writeFileSync("extra.txt", "two");
        await waitForRun();
        // Watch paths can be created later, removed, and restored.
        mkdirSync("shared/deep", { recursive: true });
        writeFileSync("shared/deep/notes.txt", "one");
        await waitForRun();
        renameSync("shared", "shared.saved");
        await waitForRun();
        renameSync("shared.saved", "shared");
        await waitForRun();
        writeFileSync("shared/deep/notes.txt", "two");
        await waitForRun();
        writeFileSync(".env", "SDA_WATCH_TEST=changed\n");
        await waitForRun("changed");
        output = "";
        renameSync(helper, "helper.saved");
        await waitForError();
        renameSync("helper.saved", helper);
        await waitForRun("changed");
        writeFileSync("replacement.ts", "export const value = 3;\n");
        renameSync("replacement.ts", helper);
        await waitForRun("changed");
        output = "";
        await expectNoRun();
        const main = readFileSync("sda/main.ts", "utf8");
        writeFileSync("sda/main.ts", main + "debugger;\n");
        await waitForError();
        expect(output).toContain("no-debugger");
        expect(readFileSync("sda/output/runs.txt", "utf8")).toBe(expected);
        writeFileSync("sda/main.ts", main);
        await waitForRun("changed");
        expect(existsSync("sda/main.js")).toBe(false);
      } finally {
        if (child.pid && child.exitCode === null && child.signalCode === null) {
          const closed = once(child, "close");
          process.kill(-child.pid, "SIGTERM");
          await closed;
        }
      }
    },
    60000,
  );
}

test.skipIf(process.platform === "win32").each(["fixing", "analysis"])(
  "runner discards stale check results and cleans up during %s",
  async (phase) => {
    mkdirSync("sda");
    writeFileSync(".env", "");
    writeFileSync("package.json", JSON.stringify({ scripts: { fix: "node fix.cjs" } }));
    // Control fix completion to make an edit during checking deterministic.
    writeFileSync(
      "fix.cjs",
      `const fs = require("node:fs");
fs.writeFileSync("fixer.pid", String(process.pid));
fs.appendFileSync("checks.txt", "check\\n");
const timer = setInterval(() => {
  if (fs.existsSync("release-check")) { clearInterval(timer); process.exit(0); }
}, 20);
`,
    );
    writeFileSync(
      "sda/main.ts",
      `import { writeFileSync } from "node:fs";
writeFileSync("analysis.pid", String(process.pid));
setInterval(() => {}, 1000);
`,
    );
    const child = spawn(process.execPath, [runner, "sda/main.ts", ".env"], {
      stdio: "ignore",
    });
    const closed = once(child, "close");
    try {
      await vi.waitFor(() => expect(readFileSync("checks.txt", "utf8")).toBe("check\n"));
      expect(readFileSync("sda/.sda.pid", "utf8")).toBe(`${child.pid}\n`);
      if (phase === "fixing") {
        const fixerPid = Number(readFileSync("fixer.pid", "utf8"));
        child.kill("SIGINT");
        await closed;
        expect(existsSync("sda/.sda.pid")).toBe(false);
        expect(() => process.kill(fixerPid, 0)).toThrow();
        return;
      }
      writeFileSync("sda/main.ts", readFileSync("sda/main.ts", "utf8") + "\n// changed\n");
      await delay(250);
      writeFileSync("release-check", "");
      await vi.waitFor(() => expect(existsSync("analysis.pid")).toBe(true));
      expect(readFileSync("checks.txt", "utf8")).toBe("check\ncheck\n");
      const analysisPid = Number(readFileSync("analysis.pid", "utf8"));
      child.kill("SIGINT");
      await closed;
      expect(existsSync("sda/.sda.pid")).toBe(false);
      expect(() => process.kill(analysisPid, 0)).toThrow();
    } finally {
      child.kill("SIGTERM");
      await closed;
    }
  },
  15000,
);

test.skipIf(process.platform === "win32").each(["shutdown", "restart"])(
  "runner terminates descendants that ignore SIGTERM before %s completes",
  async (action) => {
    mkdirSync("sda");
    writeFileSync(".env", "");
    writeFileSync("package.json", JSON.stringify({ scripts: { fix: "node fix.cjs" } }));
    writeFileSync("fix.cjs", "");
    writeFileSync(
      "worker.cjs",
      `const fs = require("node:fs");
process.on("SIGTERM", () => {});
fs.appendFileSync("workers.txt", process.pid + "\\n");
setInterval(() => fs.appendFileSync("heartbeat-" + process.pid, "."), 20);
`,
    );
    writeFileSync(
      "sda/main.ts",
      `import { spawn } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
if (existsSync("workers.txt")) {
  for (const pid of readFileSync("workers.txt", "utf8").trim().split("\\n").map(Number)) {
    try { process.kill(pid, 0); writeFileSync("overlap", "yes"); } catch {}
  }
}
spawn(process.execPath, ["worker.cjs"], { stdio: "ignore" });
setInterval(() => {}, 1000);
`,
    );
    const child = spawn(process.execPath, [runner, "sda/main.ts", ".env"], {
      stdio: "ignore",
    });
    const closed = once(child, "close");
    const workers = () =>
      existsSync("workers.txt")
        ? readFileSync("workers.txt", "utf8").trim().split("\n").map(Number)
        : [];
    const expectStopped = (pid: number) =>
      vi.waitFor(() => expect(() => process.kill(pid, 0)).toThrow(), { timeout: 3000 });
    try {
      await vi.waitFor(() => expect(workers()).toHaveLength(1), { timeout: 5000 });
      if (action === "restart") {
        writeFileSync("sda/main.ts", readFileSync("sda/main.ts", "utf8") + "\n// changed\n");
        await vi.waitFor(() => expect(workers()).toHaveLength(2), { timeout: 5000 });
        expect(existsSync("overlap")).toBe(false);
        await expectStopped(workers()[0]);
      }
      child.kill("SIGTERM");
      await closed;
      for (const pid of workers()) await expectStopped(pid);
    } finally {
      child.kill("SIGTERM");
      await closed;
      // Clean up leaked workers even when the regression assertion fails.
      for (const pid of workers()) {
        try {
          process.kill(pid, "SIGKILL");
        } catch (error) {
          expect(error).toHaveProperty("code", "ESRCH");
        }
      }
    }
  },
  15000,
);
