import { assertEquals } from "@std/assert";
import { readFileSync, symlinkSync, writeFileSync } from "node:fs";
import {
  ensureGitignore,
  GITIGNORE_SENTINEL,
} from "../src/helpers/ensureGitignore.ts";
import { GITIGNORE_ENTRIES } from "../src/helpers/gitignoreEntries.ts";
import { createTestDir } from "./helpers/utils.ts";

Deno.test("ensureGitignore - should create .gitignore without a leading blank line", () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  try {
    ensureGitignore();
    assertEquals(
      readFileSync(".gitignore", "utf-8"),
      `${GITIGNORE_SENTINEL}\n${GITIGNORE_ENTRIES.join("\n")}\n`,
    );
  } finally {
    Deno.chdir(originalCwd);
    cleanup();
  }
});

Deno.test("ensureGitignore - should append the complete block when the sentinel is absent", () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  try {
    writeFileSync(".gitignore", "node_modules\ncustom-entry\n");

    ensureGitignore();

    assertEquals(
      readFileSync(".gitignore", "utf-8"),
      `node_modules\ncustom-entry\n\n${GITIGNORE_SENTINEL}\n${
        GITIGNORE_ENTRIES.join("\n")
      }\n`,
    );
  } finally {
    Deno.chdir(originalCwd);
    cleanup();
  }
});

Deno.test("ensureGitignore - should preserve any file containing the sentinel", () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  try {
    const content = `custom-entry\n  ${GITIGNORE_SENTINEL}  \n`;
    writeFileSync(".gitignore", content);

    ensureGitignore();

    assertEquals(readFileSync(".gitignore", "utf-8"), content);
  } finally {
    Deno.chdir(originalCwd);
    cleanup();
  }
});

Deno.test("ensureGitignore - should not recognize the old sentinel", () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  try {
    writeFileSync(".gitignore", "# Added by setup-data-project\n");

    ensureGitignore();

    const content = readFileSync(".gitignore", "utf-8");
    assertEquals(content.includes(GITIGNORE_SENTINEL), true);
  } finally {
    Deno.chdir(originalCwd);
    cleanup();
  }
});

Deno.test("ensureGitignore - should preserve a symlinked .gitignore", () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  try {
    writeFileSync("shared.gitignore", "custom-entry\n");
    symlinkSync("shared.gitignore", ".gitignore");

    ensureGitignore();

    assertEquals(
      readFileSync("shared.gitignore", "utf-8"),
      "custom-entry\n",
    );
  } finally {
    Deno.chdir(originalCwd);
    cleanup();
  }
});
