import { expect, test } from "vite-plus/test";
import { execFileSync, spawn, spawnSync } from "node:child_process";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { temporaryProject } from "./helpers/utils.ts";
const entry = fileURLToPath(new URL("../src/main.ts", import.meta.url));
temporaryProject();
test("help exits without project files", () => {
  expect(execFileSync(process.execPath, [entry, "--help"], { encoding: "utf8" })).toContain(
    "--docs",
  );
  expect(readdirSync(".")).toEqual([]);
});
test("argument errors exit unsuccessfully without files", () => {
  expect(() =>
    execFileSync(process.execPath, [entry, "--sda", "--docs"], { stdio: "pipe" }),
  ).toThrow();
  expect(readdirSync(".")).toEqual([]);
});
test("docs-only leaves package files, env, source and instructions unchanged", () => {
  const files = {
    "package.json": '{"type":"commonjs","scripts":{"test":"custom"}}',
    ".env": "CUSTOM=yes",
    "README.md": "custom readme",
    "AGENTS.md": "custom policy",
    "main.ts": "// custom source",
  };
  for (const [path, content] of Object.entries(files)) writeFileSync(path, content);
  expect(execFileSync(process.execPath, [entry, "--docs"], { encoding: "utf8" })).toContain(
    "No library documentation to download.",
  );
  expect(readdirSync(".").sort()).toEqual(Object.keys(files).sort());
  for (const [path, content] of Object.entries(files))
    expect(readFileSync(path, "utf8")).toBe(content);
  writeFileSync("package.json", '{"dependencies":{"@nshiab/journalism-format":"1.1.14"}}');
  const result = spawnSync(process.execPath, [entry, "--docs"], {
    encoding: "utf8",
    timeout: 3000,
  });
  expect(result.error).toBeUndefined();
  expect(result.status).toBe(1);
  expect(result.stdout).toContain("Could not determine the installed version");
  expect(result.stdout).toContain("Documentation incomplete.");
  expect(result.stdout).not.toContain("Documentation downloaded.");
  expect(readdirSync(".").sort()).toEqual(Object.keys(files).sort());
});
test("cancelling library selection creates no project files", async () => {
  const child = spawn(process.execPath, [entry], { stdio: ["pipe", "pipe", "pipe"] });
  const code = await new Promise<number | null>((resolve, reject) => {
    child.on("error", reject);
    child.on("close", resolve);
    child.stdout.on("data", (data: Buffer) => {
      if (data.toString().includes("Which libraries")) child.stdin.write("\u0003");
    });
  });
  expect(code).toBe(0);
  expect(readdirSync(".")).toEqual([]);
});

test("combined library flags install without prompts and failures stop the spinner", () => {
  const result = spawnSync(process.execPath, [entry, "--format", "--geo", "--format"], {
    env: { ...process.env, PATH: "" },
    timeout: 3000,
    encoding: "utf8",
  });
  expect(result.error).toBeUndefined();
  expect(result.status).toBe(1);
  expect(result.stderr).toContain("failed");
  expect(result.stderr).toContain(
    "install @nshiab/journalism-format @nshiab/journalism-geo failed",
  );
  expect(result.stdout).not.toContain("Which libraries");
  expect(result.stdout).toContain("Package installation failed");
});
