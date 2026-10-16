import { deepStrictEqual as assertEquals } from "node:assert";
import { test } from "vite-plus/test";
import { log } from "@clack/prompts";
import { readFileSync, symlinkSync, writeFileSync } from "node:fs";
import { ensureGitignore, GITIGNORE_SENTINEL } from "../src/helpers/ensureGitignore.ts";
import { GITIGNORE_ENTRIES } from "../src/helpers/gitignoreEntries.ts";
import { temporaryProject } from "./helpers/utils.ts";
temporaryProject();

test("ensureGitignore - should create .gitignore without a leading blank line", () => {
  const messages: string[] = [];
  log.info = (message) => messages.push(message);

  ensureGitignore();
  assertEquals(
    readFileSync(".gitignore", "utf-8"),
    `${GITIGNORE_SENTINEL}\n${GITIGNORE_ENTRIES.join("\n")}\n`,
  );
  assertEquals(messages, ["Created .gitignore"]);
});

test("ensureGitignore - should append the complete block when the sentinel is absent", () => {
  const messages: string[] = [];
  log.info = (message) => messages.push(message);
  writeFileSync(".gitignore", "node_modules\ncustom-entry\n");

  ensureGitignore();

  assertEquals(
    readFileSync(".gitignore", "utf-8"),
    `node_modules\ncustom-entry\n\n${GITIGNORE_SENTINEL}\n${GITIGNORE_ENTRIES.join("\n")}\n`,
  );
  assertEquals(messages, ["Updated .gitignore"]);
});

test("ensureGitignore - should append missing entries to a file containing the sentinel", () => {
  const content = `custom-entry\n  ${GITIGNORE_SENTINEL}  \n`;
  writeFileSync(".gitignore", content);

  ensureGitignore();

  assertEquals(readFileSync(".gitignore", "utf-8"), content + GITIGNORE_ENTRIES.join("\n") + "\n");
});

test("ensureGitignore - should not recognize the old sentinel", () => {
  writeFileSync(".gitignore", "# Added by setup-data-project\n");

  ensureGitignore();

  const content = readFileSync(".gitignore", "utf-8");
  assertEquals(content.includes(GITIGNORE_SENTINEL), true);
});

test("ensureGitignore - should preserve a symlinked .gitignore", () => {
  writeFileSync("shared.gitignore", "custom-entry\n");
  symlinkSync("shared.gitignore", ".gitignore");

  ensureGitignore();

  assertEquals(readFileSync("shared.gitignore", "utf-8"), "custom-entry\n");
});
