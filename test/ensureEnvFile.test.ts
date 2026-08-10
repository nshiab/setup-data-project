import { assertEquals, assertExists } from "@std/assert";
import { log } from "@clack/prompts";
import { readFileSync, symlinkSync, writeFileSync } from "node:fs";
import { ensureEnvFile } from "../src/helpers/ensureEnvFile.ts";
import { createTestDir } from "./helpers/utils.ts";

Deno.test("ensureEnvFile - should create .env if it does not exist", () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  try {
    const messages: string[] = [];
    log.info = (message) => messages.push(message);

    ensureEnvFile();
    assertExists(".env");
    assertEquals(messages, ["Created .env"]);
  } finally {
    Deno.chdir(originalCwd);
    cleanup();
  }
});

Deno.test("ensureEnvFile - should not overwrite .env if it already exists", () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  try {
    const messages: string[] = [];
    log.info = (message) => messages.push(message);
    writeFileSync(".env", "MY_VAR=hello");

    ensureEnvFile();

    assertEquals(readFileSync(".env", "utf-8"), "MY_VAR=hello");
    assertEquals(messages, []);
  } finally {
    Deno.chdir(originalCwd);
    cleanup();
  }
});

Deno.test("ensureEnvFile - should preserve a symlinked .env", () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  try {
    writeFileSync("shared.env", "MY_VAR=shared");
    symlinkSync("shared.env", ".env");

    ensureEnvFile();

    assertEquals(readFileSync("shared.env", "utf-8"), "MY_VAR=shared");
  } finally {
    Deno.chdir(originalCwd);
    cleanup();
  }
});
