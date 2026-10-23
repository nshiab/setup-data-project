import { expect, test, vi } from "vite-plus/test";
import { spawn, spawnSync } from "node:child_process";
import { once } from "node:events";
import { randomUUID } from "node:crypto";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  realpathSync,
  writeFileSync,
} from "node:fs";
import { fileURLToPath } from "node:url";
import { temporaryProject } from "./helpers/utils.ts";

temporaryProject();
const runner = fileURLToPath(new URL("../src/sda.ts", import.meta.url));
const status = () => spawnSync(process.execPath, [runner, "--status"], { encoding: "utf8" });

test("status without an active run creates no files and runs no fixes", () => {
  writeFileSync("package.json", JSON.stringify({ scripts: { fix: "exit 99" } }));
  const result = status();
  expect(result.status, result.stderr).toBe(0);
  expect(result.stdout).toContain("No active SDA process found");
  expect(readdirSync(".")).toEqual(["package.json"]);
});

test("status ignores dead owners without modifying their records", async () => {
  const child = spawn(process.execPath, ["-e", ""]);
  await once(child, "close");
  const claim = `sda/.sda-lock/${child.pid}-${randomUUID()}`;
  mkdirSync(claim, { recursive: true });
  writeFileSync("sda/.sda.pid", `${child.pid}\n`);
  const result = status();
  expect(result.status, result.stderr).toBe(0);
  expect(existsSync(claim)).toBe(true);
  expect(readFileSync("sda/.sda.pid", "utf8")).toBe(`${child.pid}\n`);
});

test("status refuses malformed PIDs without changing files", () => {
  mkdirSync("sda");
  writeFileSync("sda/.sda.pid", "invalid");
  const result = status();
  expect(result.status).toBe(2);
  expect(result.stderr).toContain("Unable to verify SDA status");
  expect(readFileSync("sda/.sda.pid", "utf8")).toBe("invalid");
});

test("status refuses an unrelated live PID, even before the PID file is published", async () => {
  const child = spawn(process.execPath, ["-e", "setInterval(() => {}, 1000)"]);
  const closed = once(child, "close");
  const claim = `sda/.sda-lock/${child.pid}-${randomUUID()}`;
  try {
    mkdirSync(claim, { recursive: true });
    expect(status().status).toBe(2);
    expect(existsSync("sda/.sda.pid")).toBe(false);
    writeFileSync("sda/.sda.pid", `${child.pid}\n`);
    expect(status().status).toBe(2);
    writeFileSync(
      `${claim}/owner.json`,
      JSON.stringify({
        ticket: 1,
        command: "npm run sda",
        projectRoot: realpathSync(process.cwd()),
      }),
    );
    expect(status().status).toBe(2);
    expect(child.exitCode).toBe(null);
    expect(existsSync(claim)).toBe(true);
  } finally {
    child.kill();
    await closed;
  }
});

test("status refuses an SDA process belonging to another directory", async () => {
  mkdirSync("other/sda", { recursive: true });
  writeFileSync("other/.env", "");
  writeFileSync("other/package.json", JSON.stringify({ scripts: { fix: "node fix.cjs" } }));
  writeFileSync("other/fix.cjs", "");
  writeFileSync(
    "other/sda/main.ts",
    'import { existsSync } from "node:fs"; setInterval(() => { if (existsSync("stop")) process.exit(0); }, 50);',
  );
  const child = spawn(process.execPath, [runner, "sda/main.ts"], {
    cwd: "other",
    stdio: "ignore",
  });
  const closed = once(child, "close");
  try {
    await vi.waitFor(() => expect(existsSync("other/sda/.sda.pid")).toBe(true));
    mkdirSync("sda");
    writeFileSync("sda/.sda.pid", `${child.pid}\n`);
    // A PID alone is insufficient on Windows; a copied owner record must not
    // turn another project's process into a verified local run either.
    expect(status().status).toBe(2);
    cpSync("other/sda/.sda-lock", "sda/.sda-lock", { recursive: true });
    const result = status();
    expect(result.status).toBe(2);
    expect(result.stderr).toContain("could not be verified as this project's SDA process");
    expect(child.exitCode).toBe(null);
  } finally {
    writeFileSync("other/stop", "");
    await closed;
  }
}, 15000);
