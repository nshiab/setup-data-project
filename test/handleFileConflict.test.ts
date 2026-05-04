import { assertEquals, assertExists } from "@std/assert";
import { readFileSync, writeFileSync } from "node:fs";
import {
  handleFileConflict,
  PROMPT_OVERRIDE,
} from "../src/helpers/handleFileConflict.ts";
import { createTestDir } from "./helpers/utils.ts";

Deno.test("handleFileConflict - should create new file", async () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  try {
    const path = "test.txt";
    const content = "new content";
    const result = await handleFileConflict(path, content);

    assertEquals(result, "created");
    assertExists(path);
    assertEquals(readFileSync(path, "utf-8"), content);
  } finally {
    Deno.chdir(originalCwd);
    cleanup();
  }
});

Deno.test("handleFileConflict - should skip in Deno environment (default behavior for tests)", async () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  try {
    const path = "test.txt";
    const oldContent = "old content";
    const newContent = "new content";
    writeFileSync(path, oldContent);

    const result = await handleFileConflict(path, newContent);

    assertEquals(result, "skipped");
    assertEquals(readFileSync(path, "utf-8"), oldContent);
  } finally {
    Deno.chdir(originalCwd);
    cleanup();
  }
});

Deno.test("handleFileConflict - should overwrite when selected", async () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  const originalSelect = PROMPT_OVERRIDE.select;
  PROMPT_OVERRIDE.select = () => Promise.resolve("overwrite");

  try {
    const path = "test.txt";
    const oldContent = "old content";
    const newContent = "new content";
    writeFileSync(path, oldContent);

    const result = await handleFileConflict(path, newContent);

    assertEquals(result, "updated");
    assertEquals(readFileSync(path, "utf-8"), newContent);
  } finally {
    PROMPT_OVERRIDE.select = originalSelect;
    Deno.chdir(originalCwd);
    cleanup();
  }
});

Deno.test("handleFileConflict - should append when selected", async () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  const originalSelect = PROMPT_OVERRIDE.select;
  PROMPT_OVERRIDE.select = () => Promise.resolve("append");

  try {
    const path = "test.txt";
    const oldContent = "old content\n";
    const newContent = "new content";
    writeFileSync(path, oldContent);

    const result = await handleFileConflict(path, newContent);

    assertEquals(result, "updated");
    assertEquals(readFileSync(path, "utf-8"), oldContent + newContent);
  } finally {
    PROMPT_OVERRIDE.select = originalSelect;
    Deno.chdir(originalCwd);
    cleanup();
  }
});
