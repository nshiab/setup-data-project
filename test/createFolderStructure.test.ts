import { assertEquals, assertExists } from "@std/assert";
import { log } from "@clack/prompts";
import { join } from "node:path";
import { readFileSync, symlinkSync, writeFileSync } from "node:fs";
import { createFolderStructure } from "../src/helpers/createFolderStructure.ts";
import { createTestDir } from "./helpers/utils.ts";

Deno.test("createFolderStructure - should create the correct files and folders", () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  try {
    const messages: string[] = [];
    log.info = (message) => messages.push(message);

    createFolderStructure([]);
    assertExists(join("sda", "data"));
    assertExists(join("sda", "helpers"));
    assertExists(join("sda", "output"));
    assertExists(join("sda", "tests"));
    assertExists(join("sda", "main.ts"));
    assertEquals(messages, ["Created sda/main.ts"]);
  } finally {
    Deno.chdir(originalCwd);
    cleanup();
  }
});

Deno.test("createFolderStructure - should use @nshiab/simple-data-analysis-core if selected", () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  try {
    createFolderStructure(["@nshiab/simple-data-analysis-core"]);
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

Deno.test("createFolderStructure - should preserve an existing main.ts", () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  try {
    Deno.mkdirSync("sda");
    writeFileSync(join("sda", "main.ts"), "// Keep my code\n");

    createFolderStructure(["@nshiab/simple-data-analysis"]);

    assertEquals(
      readFileSync(join("sda", "main.ts"), "utf-8"),
      "// Keep my code\n",
    );
  } finally {
    Deno.chdir(originalCwd);
    cleanup();
  }
});

Deno.test("createFolderStructure - should preserve a symlinked main.ts", () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  try {
    Deno.mkdirSync("sda");
    writeFileSync("linked-main.ts", "// Linked code\n");
    symlinkSync(join("..", "linked-main.ts"), join("sda", "main.ts"));

    createFolderStructure([]);

    assertEquals(readFileSync("linked-main.ts", "utf-8"), "// Linked code\n");
  } finally {
    Deno.chdir(originalCwd);
    cleanup();
  }
});
