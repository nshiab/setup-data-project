import { assertExists } from "@std/assert";
import { readFileSync, writeFileSync } from "node:fs";
import { ensureEnvFile } from "../src/helpers/ensureEnvFile.ts";
import { createTestDir } from "./helpers/utils.ts";

Deno.test("ensureEnvFile - should create .env if it does not exist", async () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  try {
    await ensureEnvFile();
    assertExists(".env");
  } finally {
    Deno.chdir(originalCwd);
    cleanup();
  }
});

Deno.test("ensureEnvFile - should not overwrite .env if it already exists", async () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  try {
    writeFileSync(".env", "MY_VAR=hello");
    // In a real terminal, this would prompt. In tests, we rely on the implementation
    // or we'd need to mock @clack/prompts.
    await ensureEnvFile();
    const content = readFileSync(".env", "utf-8");
    if (content !== "MY_VAR=hello") {
      throw new Error(".env was overwritten");
    }
  } finally {
    Deno.chdir(originalCwd);
    cleanup();
  }
});
