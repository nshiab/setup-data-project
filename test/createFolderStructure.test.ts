import { deepStrictEqual as assertEquals } from "node:assert";
import { test, expect } from "vite-plus/test";
import { existsSync, mkdirSync } from "node:fs";
const assertExists = (path: string) => expect(existsSync(path)).toBe(true);
import { join } from "node:path";
import { readFileSync, symlinkSync, writeFileSync } from "node:fs";
import { createFolderStructure } from "../src/helpers/createFolderStructure.ts";
import { temporaryProject } from "./helpers/utils.ts";
temporaryProject();

test("createFolderStructure - should create the correct files and folders", () => {
  createFolderStructure([]);
  assertExists(join("sda", "data"));
  assertExists(join("sda", "helpers"));
  assertExists(join("sda", "output"));
  assertExists(join("sda", "tests"));
  assertExists(join("sda", "main.ts"));
});

test("createFolderStructure - should use @nshiab/simple-data-analysis-core if selected", () => {
  createFolderStructure(["@nshiab/simple-data-analysis-core"]);
  const content = readFileSync(join("sda", "main.ts"), "utf-8");
  assertEquals(
    content.includes('import { SimpleDB } from "@nshiab/simple-data-analysis-core";'),
    true,
  );
});

test("createFolderStructure - should preserve an existing main.ts", () => {
  mkdirSync("sda");
  writeFileSync(join("sda", "main.ts"), "// Keep my code\n");

  createFolderStructure(["@nshiab/simple-data-analysis"]);

  assertEquals(readFileSync(join("sda", "main.ts"), "utf-8"), "// Keep my code\n");
});

test("createFolderStructure - should preserve a symlinked main.ts", () => {
  mkdirSync("sda");
  writeFileSync("linked-main.ts", "// Linked code\n");
  symlinkSync(join("..", "linked-main.ts"), join("sda", "main.ts"));

  createFolderStructure([]);

  assertEquals(readFileSync("linked-main.ts", "utf-8"), "// Linked code\n");
});
