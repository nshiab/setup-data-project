import { assertEquals, assertExists } from "@std/assert";
import { readFileSync, writeFileSync } from "node:fs";
import { handleFileConflict } from "../src/helpers/handleFileConflict.ts";
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
