import { assertEquals } from "@std/assert";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { getInstalledPackageVersions } from "../src/helpers/getInstalledPackageVersions.ts";
import { createTestDir } from "./helpers/utils.ts";

Deno.test("getInstalledPackageVersions - should resolve a Deno lock version", () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);
  writeFileSync(
    "deno.lock",
    JSON.stringify({
      version: "5",
      specifiers: {
        "jsr:@nshiab/simple-data-analysis@^6.0.0": "6.0.2",
      },
    }),
  );

  try {
    assertEquals(
      getInstalledPackageVersions({
        "@nshiab/simple-data-analysis":
          "jsr:@nshiab/simple-data-analysis@^6.0.0",
      }),
      { "@nshiab/simple-data-analysis": "6.0.2" },
    );
  } finally {
    Deno.chdir(originalCwd);
    cleanup();
  }
});

Deno.test("getInstalledPackageVersions - should use the installed package version", () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);
  const packageDirectory = join(
    "node_modules",
    "@nshiab",
    "simple-data-analysis",
  );
  mkdirSync(packageDirectory, { recursive: true });
  writeFileSync(
    join(packageDirectory, "package.json"),
    JSON.stringify({ version: "6.0.2" }),
  );

  try {
    assertEquals(
      getInstalledPackageVersions({
        "@nshiab/simple-data-analysis": "^6.0.0",
      }),
      { "@nshiab/simple-data-analysis": "6.0.2" },
    );
  } finally {
    Deno.chdir(originalCwd);
    cleanup();
  }
});

Deno.test("getInstalledPackageVersions - should fall back to package-lock", () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);
  writeFileSync(
    "package-lock.json",
    JSON.stringify({
      packages: {
        "node_modules/@nshiab/journalism-format": { version: "1.1.10" },
      },
    }),
  );

  try {
    assertEquals(
      getInstalledPackageVersions({
        "@nshiab/journalism-format": "^1.1.0",
      }),
      { "@nshiab/journalism-format": "1.1.10" },
    );
  } finally {
    Deno.chdir(originalCwd);
    cleanup();
  }
});

Deno.test("getInstalledPackageVersions - should fall back to bun.lock", () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);
  writeFileSync(
    "bun.lock",
    `{
      "packages": {
        "@nshiab/journalism-format": ["@nshiab/journalism-format@1.1.10", "", {}, "sha512-test"]
      }
    }`,
  );

  try {
    assertEquals(
      getInstalledPackageVersions({
        "@nshiab/journalism-format": "^1.1.0",
      }),
      { "@nshiab/journalism-format": "1.1.10" },
    );
  } finally {
    Deno.chdir(originalCwd);
    cleanup();
  }
});

Deno.test("getInstalledPackageVersions - should accept only exact manifest versions", () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  try {
    assertEquals(
      getInstalledPackageVersions({
        "@nshiab/journalism-format": "1.1.10",
        "@nshiab/journalism-ai": "^1.2.0",
      }),
      { "@nshiab/journalism-format": "1.1.10" },
    );
  } finally {
    Deno.chdir(originalCwd);
    cleanup();
  }
});
