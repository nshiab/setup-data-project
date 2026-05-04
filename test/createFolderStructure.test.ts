import { assertExists } from "@std/assert";
import { join } from "node:path";
import { createFolderStructure } from "../src/helpers/createFolderStructure.ts";
import { createTestDir } from "./helpers/utils.ts";

Deno.test("createFolderStructure - should create the correct files and folders", () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  try {
    createFolderStructure([]);
    assertExists(join("sda", "data"));
    assertExists(join("sda", "helpers"));
    assertExists(join("sda", "output"));
    assertExists(join("sda", "main.ts"));
  } finally {
    Deno.chdir(originalCwd);
    cleanup();
  }
});
