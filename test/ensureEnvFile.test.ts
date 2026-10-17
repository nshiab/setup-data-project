import { deepStrictEqual as assertEquals } from "node:assert";
import { test, expect } from "vite-plus/test";
import { existsSync } from "node:fs";
const assertExists = (path: string) => expect(existsSync(path)).toBe(true);
import { log } from "@clack/prompts";
import { readFileSync, symlinkSync, writeFileSync } from "node:fs";
import { ensureEnvFile } from "../src/helpers/ensureEnvFile.ts";
import { temporaryProject } from "./helpers/utils.ts";
temporaryProject();

test("ensureEnvFile - should create .env if it does not exist", () => {
  const messages: string[] = [];
  log.info = (message) => messages.push(message);

  ensureEnvFile();
  assertExists(".env");
  assertEquals(messages, ["Created .env"]);
});

test("ensureEnvFile - should not overwrite .env if it already exists", () => {
  const messages: string[] = [];
  log.info = (message) => messages.push(message);
  writeFileSync(".env", "MY_VAR=hello");

  ensureEnvFile();

  assertEquals(readFileSync(".env", "utf-8"), "MY_VAR=hello");
  assertEquals(messages, []);
});

test("ensureEnvFile - should preserve a symlinked .env", () => {
  writeFileSync("shared.env", "MY_VAR=shared");
  symlinkSync("shared.env", ".env");

  ensureEnvFile();

  assertEquals(readFileSync("shared.env", "utf-8"), "MY_VAR=shared");
});
