import { expect, test, vi } from "vite-plus/test";
import { execFileSync, spawn, spawnSync } from "node:child_process";
import { once } from "node:events";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  symlinkSync,
  truncateSync,
  writeFileSync,
} from "node:fs";
import { fileURLToPath } from "node:url";
import { setTimeout as delay } from "node:timers/promises";
import { getProjectTasks } from "../src/helpers/getProjectTasks.ts";
import { ensureSdaRunner } from "../src/helpers/ensureSdaRunner.ts";
import { temporaryProject } from "./helpers/utils.ts";

temporaryProject();
const modules = fileURLToPath(new URL("../node_modules", import.meta.url));
const hasBun = spawnSync("bun", ["--version"]).status === 0;

test("the generated runner passes formatting checks", () => {
  writeFileSync("package.json", '{"type":"module"}');
  ensureSdaRunner();
  execFileSync(process.execPath, [
    `${modules}/vite-plus/bin/vp`,
    "fmt",
    "--check",
    "scripts/sda.mjs",
  ]);
});

for (const runtime of ["node", "bun"] as const) {
  test.skipIf(process.platform === "win32" || (runtime === "bun" && !hasBun))(
    `${runtime}: PID file identifies the runner, prevents duplicates, and is removed on shutdown`,
    async () => {
      mkdirSync("sda");
      ensureSdaRunner();
      writeFileSync(".env", "");
      writeFileSync("sda/main.ts", "");
      writeFileSync("fix.cjs", "");
      writeFileSync("package.json", JSON.stringify({ scripts: { fix: "node fix.cjs" } }));
      const command = runtime === "bun" ? "bun" : process.execPath;
      const args = ["scripts/sda.mjs", "sda/main.ts"];
      const child = spawn(command, args, { stdio: "ignore" });
      const closed = once(child, "close");
      try {
        await vi.waitFor(() => expect(readFileSync(".sda.pid", "utf8")).toBe(`${child.pid}\n`));
        const duplicate = spawnSync(command, args, { encoding: "utf8" });
        expect(duplicate.status).toBe(1);
        expect(duplicate.stderr).toContain(".sda.pid already exists");
        expect(readFileSync(".sda.pid", "utf8")).toBe(`${child.pid}\n`);
      } finally {
        child.kill("SIGTERM");
        await closed;
      }
      expect(existsSync(".sda.pid")).toBe(false);

      // A crash can leave a stale file; preserve it for verification instead of guessing ownership.
      writeFileSync(".sda.pid", "999999999\n");
      const stale = spawnSync(command, args, { encoding: "utf8" });
      expect(stale.status).toBe(1);
      expect(stale.stderr).toContain("remove the file if stale");
      expect(readFileSync(".sda.pid", "utf8")).toBe("999999999\n");
    },
    10000,
  );

  test.skipIf(process.platform === "win32" || (runtime === "bun" && !hasBun))(
    `${runtime}: folders and explicit files trigger fixed runs without a resolver`,
    async () => {
      mkdirSync("sda/helpers", { recursive: true });
      mkdirSync("sda/data");
      mkdirSync("sda/output");
      ensureSdaRunner();
      symlinkSync(modules, "node_modules", "dir");
      writeFileSync(".gitignore", "node_modules/\nsda/output/\n");
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
        ["run", "sda", "--", "shared", "extra.txt"],
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
        output = "";
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
    ensureSdaRunner();
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
    const child = spawn(process.execPath, ["scripts/sda.mjs", "sda/main.ts", ".env"], {
      stdio: "ignore",
    });
    const closed = once(child, "close");
    try {
      await vi.waitFor(() => expect(readFileSync("checks.txt", "utf8")).toBe("check\n"));
      expect(readFileSync(".sda.pid", "utf8")).toBe(`${child.pid}\n`);
      if (phase === "fixing") {
        const fixerPid = Number(readFileSync("fixer.pid", "utf8"));
        child.kill("SIGINT");
        await closed;
        expect(existsSync(".sda.pid")).toBe(false);
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
      expect(existsSync(".sda.pid")).toBe(false);
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
    ensureSdaRunner();
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
    const child = spawn(process.execPath, ["scripts/sda.mjs", "sda/main.ts", ".env"], {
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
