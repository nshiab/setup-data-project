import { expect, test, vi } from "vite-plus/test";
import { spawn, spawnSync } from "node:child_process";
import { once } from "node:events";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  realpathSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { join, resolve } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { temporaryProject } from "./helpers/utils.ts";
import { acquireSdaLock, SDA_LOCK_DIRECTORY } from "../src/helpers/sdaLock.ts";

temporaryProject();
const hasBun = spawnSync("bun", ["--version"]).status === 0;
const lockModule = new URL("../src/helpers/sdaLock.ts", import.meta.url).href;

test.each([false, true])(
  "an sda request selects the oldest watcher claim (denied PID probe: %s)",
  async (denied) => {
    for (const suffix of ["10000000", "20000000"]) {
      mkdirSync(join(SDA_LOCK_DIRECTORY, `${process.pid}-${suffix}-0000-0000-0000-000000000000`), {
        recursive: true,
      });
    }
    const [contender, watcher] = readdirSync(SDA_LOCK_DIRECTORY);
    const entry = resolve("sda/main.ts");
    const projectRoot = realpathSync(process.cwd());
    writeFileSync(
      join(SDA_LOCK_DIRECTORY, contender, "owner.json"),
      JSON.stringify({ ticket: 2, command: "npm run sda", projectRoot }),
    );
    writeFileSync(
      join(SDA_LOCK_DIRECTORY, watcher, "owner.json"),
      JSON.stringify({ ticket: 1, command: "npm run sda:watch", projectRoot, watchEntry: entry }),
    );
    if (denied) {
      vi.spyOn(process, "kill").mockImplementation(() => {
        throw Object.assign(new Error("Operation not permitted"), { code: "EPERM" });
      });
    }
    await expect(acquireSdaLock("npm run sda")).rejects.toMatchObject({
      watcher: { directory: resolve(SDA_LOCK_DIRECTORY, watcher), entry, pid: process.pid },
    });
  },
);

test.skipIf(process.platform === "win32").each(["fresh", "crashed", "choosing"])(
  "simultaneous Node/Bun starts elect one owner with a %s lock",
  async (state) => {
    writeFileSync(
      "worker.mjs",
      `import { acquireSdaLock } from ${JSON.stringify(lockModule)};
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { setTimeout as delay } from "node:timers/promises";
const [name, mode] = process.argv.slice(2);
process.on("SIGTERM", () => process.exit(0));
if (mode === "choosing") mkdirSync(".sda-cache/lock/" + process.pid + "-" + randomUUID(), { recursive: true });
writeFileSync("ready-" + name, "");
if (mode === "choosing") {
  setInterval(() => {}, 1000);
} else {
  while (!existsSync("start")) await delay(5);
  try {
    await acquireSdaLock("npm run " + (Number(name) % 2 ? "sda:watch" : "sda"));
    writeFileSync("result-" + name, "acquired:" + process.pid);
    setInterval(() => {}, 1000);
  } catch (error) {
    writeFileSync("result-" + name, error.message);
    process.exitCode = 1;
  }
}
`,
    );
    const workers: { child: ReturnType<typeof spawn>; closed: Promise<unknown> }[] = [];
    const start = (name: string, mode = "acquire") => {
      const child = spawn(hasBun && Number(name) % 2 ? "bun" : process.execPath, [
        "worker.mjs",
        name,
        mode,
      ]);
      const worker = { child, closed: once(child, "close") };
      workers.push(worker);
      return worker;
    };
    const result = (name: string) => readFileSync("result-" + name, "utf8");
    try {
      let abandoned: (typeof workers)[number] | undefined;
      if (state !== "fresh") {
        abandoned = start("previous", state === "choosing" ? "choosing" : "acquire");
        await vi.waitFor(() => expect(existsSync("ready-previous")).toBe(true));
        if (state === "crashed") {
          writeFileSync("start", "");
          await vi.waitFor(() => expect(result("previous")).toMatch(/^acquired:/));
          abandoned.child.kill("SIGKILL");
          await abandoned.closed;
          expect(readdirSync(".sda-cache/lock")).toHaveLength(1);
          rmSync("start");
        }
      }
      const names = Array.from({ length: 8 }, (_, i) => String(i));
      const contenders = names.map((name) => start(name));
      await vi.waitFor(() => {
        for (const name of names) expect(existsSync("ready-" + name)).toBe(true);
      });
      writeFileSync("start", "");
      if (state === "choosing" && abandoned) {
        await vi.waitFor(() => expect(readdirSync(".sda-cache/lock").length).toBeGreaterThan(1));
        await delay(50);
        for (const name of names) {
          if (existsSync("result-" + name)) expect(result(name)).not.toMatch(/^acquired:/);
        }
        abandoned.child.kill("SIGKILL");
        await abandoned.closed;
      }
      await vi.waitFor(() => {
        for (const name of names) expect(existsSync("result-" + name)).toBe(true);
      });
      const winners = names.filter((name) => result(name).startsWith("acquired:"));
      expect(winners).toHaveLength(1);
      const winner = winners[0];
      const winnerPid = contenders[Number(winner)].child.pid;
      expect(readdirSync(".sda-cache/lock")).toEqual([
        expect.stringMatching(new RegExp(`^${winnerPid}-`)),
      ]);
      for (const name of names) {
        if (name !== winner) expect(result(name)).toContain("is already running");
      }
      const later = start("later");
      await later.closed;
      expect(result("later")).toContain("is already running");
      expect(readdirSync(".sda-cache/lock")).toEqual([
        expect.stringMatching(new RegExp(`^${winnerPid}-`)),
      ]);
    } finally {
      for (const { child } of workers) child.kill("SIGTERM");
      await Promise.all(workers.map(({ closed }) => closed));
    }
    expect(readdirSync(".sda-cache/lock")).toEqual([]);
  },
  15000,
);
