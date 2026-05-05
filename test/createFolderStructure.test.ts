import { assertEquals, assertExists } from "@std/assert";
import { join } from "node:path";
import { readFileSync } from "node:fs";
import { createFolderStructure } from "../src/helpers/createFolderStructure.ts";
import { createTestDir } from "./helpers/utils.ts";

Deno.test("createFolderStructure - should create the correct files and folders", async () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  try {
    await createFolderStructure([]);
    assertExists(join("sda", "data"));
    assertExists(join("sda", "helpers"));
    assertExists(join("sda", "output"));
    assertExists(join("sda", "main.ts"));
  } finally {
    Deno.chdir(originalCwd);
    cleanup();
  }
});

Deno.test("createFolderStructure - should use @nshiab/simple-data-analysis-core if selected", async () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  try {
    await createFolderStructure(["@nshiab/simple-data-analysis-core"]);
    const content = readFileSync(join("sda", "main.ts"), "utf-8");
    assertEquals(
      content.includes(
        'import { SimpleDB } from "@nshiab/simple-data-analysis-core";',
      ),
      true,
    );
  } finally {
    Deno.chdir(originalCwd);
    cleanup();
  }
});
