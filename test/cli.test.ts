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

test.each(["new", "existing"])(
  "combined library flags install latest in %s projects without prompts and failures stop the spinner",
  (project) => {
    const dependencies = {
      "@nshiab/journalism-format": "1.0.0",
      "@nshiab/journalism-geo": "1.0.0",
      "@nshiab/journalism-ai": "1.0.0",
    };
    if (project === "existing") {
      writeFileSync("package.json", JSON.stringify({ type: "module", dependencies }));
    }
    const result = spawnSync(process.execPath, [entry, "--format", "--geo", "--format"], {
      env: { ...process.env, PATH: "" },
      timeout: 3000,
      encoding: "utf8",
    });
    expect(result.error).toBeUndefined();
    expect(result.status).toBe(1);
    expect(result.stderr).toContain("failed");
    expect(result.stderr).toContain(
      "install @nshiab/journalism-format@latest @nshiab/journalism-geo@latest failed",
    );
    expect(result.stdout).not.toContain("Which libraries");
    expect(result.stdout).not.toContain("What would you like to do?");
    expect(result.stderr).not.toContain("@nshiab/journalism-ai");
    expect(result.stdout).toContain("Package installation failed");
  },
);

test("the SDA flag upgrades an installed library to latest without prompting", () => {
  writeFileSync(
    "package.json",
    JSON.stringify({ dependencies: { "@nshiab/simple-data-analysis": "6.0.0" } }),
  );
  const result = spawnSync(process.execPath, [entry, "--sda"], {
    env: { ...process.env, PATH: "" },
    timeout: 3000,
    encoding: "utf8",
  });
  expect(result.error).toBeUndefined();
  expect(result.status).toBe(1);
  expect(result.stderr).toContain("install @nshiab/simple-data-analysis@latest failed");
  expect(result.stdout).not.toContain("What would you like to do?");
});

test.each(["keep", "update"])("interactive setup can %s an installed library", async (action) => {
  writeFileSync(
    "package.json",
    JSON.stringify({
      dependencies: {
        "@nshiab/simple-data-analysis": "6.0.0",
        "@observablehq/plot": "0.6.17",
      },
    }),
  );
  const child = spawn(process.execPath, [entry], {
    env: { ...process.env, PATH: "" },
    stdio: ["pipe", "pipe", "pipe"],
    timeout: 3000,
  });
  let output = "";
  let errors = "";
  let stage = 0;
  child.stdout.on("data", (data: Buffer) => {
    output += data.toString();
    if (stage === 0 && output.includes("Which libraries")) {
      stage++;
      child.stdin.write(" \r");
    } else if (stage === 1 && output.includes("What would you like to do?")) {
      stage++;
      child.stdin.write(action === "update" ? "\u001b[B\r" : "\r");
    }
  });
  child.stderr.on("data", (data: Buffer) => {
    errors += data.toString();
  });
  const code = await new Promise<number | null>((resolve, reject) => {
    child.on("error", reject);
    child.on("close", resolve);
  });
  expect(code).toBe(1);
  expect(stage).toBe(2);
  expect(output).toContain("Keep existing version");
  expect(output).toContain("Update to latest");
  if (action === "update") {
    expect(errors).toContain("install @nshiab/simple-data-analysis@latest failed");
  } else {
    expect(errors).toContain("oxfmt@latest");
    expect(errors).not.toContain("@nshiab/simple-data-analysis");
  }
});
