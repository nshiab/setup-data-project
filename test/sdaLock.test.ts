import { expect, test, vi } from "vite-plus/test";
import { spawn, spawnSync } from "node:child_process";
import { once } from "node:events";
import { existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { setTimeout as delay } from "node:timers/promises";
import { temporaryProject } from "./helpers/utils.ts";

temporaryProject();
const hasBun = spawnSync("bun", ["--version"]).status === 0;
const lockModule = new URL("../src/helpers/sdaLock.ts", import.meta.url).href;

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
if (mode === "choosing") mkdirSync("sda/.sda-lock/" + process.pid + "-" + randomUUID(), { recursive: true });
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
          expect(existsSync("sda/.sda.pid")).toBe(true);
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
        await vi.waitFor(() => expect(readdirSync("sda/.sda-lock").length).toBeGreaterThan(1));
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
      expect(readFileSync("sda/.sda.pid", "utf8")).toBe(`${winnerPid}\n`);
      for (const name of names) {
        if (name !== winner) expect(result(name)).toContain("is already running");
      }
      const later = start("later");
      await later.closed;
      expect(result("later")).toContain("is already running");
      expect(readFileSync("sda/.sda.pid", "utf8")).toBe(`${winnerPid}\n`);
    } finally {
      for (const { child } of workers) child.kill("SIGTERM");
      await Promise.all(workers.map(({ closed }) => closed));
    }
    expect(existsSync("sda/.sda.pid")).toBe(false);
    expect(readdirSync("sda/.sda-lock")).toEqual([]);
  },
  15000,
);
