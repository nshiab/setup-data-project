import { assertEquals } from "@std/assert";
import { readFileSync, writeFileSync } from "node:fs";
import { ensureGitignore } from "../src/helpers/ensureGitignore.ts";
import { createTestDir } from "./helpers/utils.ts";

Deno.test("ensureGitignore - should create and update .gitignore", () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  try {
    // Test creation
    ensureGitignore();
    const content = readFileSync(".gitignore", "utf-8");
    assert(content.includes("sda/data"), "Should include sda/data");
    assert(
      content.includes("# Added by setup-data-project"),
      "Should include header",
    );

    // Test idempotency/appending
    writeFileSync(".gitignore", "my_custom_ignored_file\n");
    ensureGitignore();
    const updatedContent = readFileSync(".gitignore", "utf-8");
    assertEquals(updatedContent.startsWith("my_custom_ignored_file\n"), true);
    assert(
      updatedContent.includes("sda/data"),
      "Should still include sda/data",
    );
  } finally {
    Deno.chdir(originalCwd);
    cleanup();
  }
});

function assert(condition: boolean, msg?: string) {
  if (!condition) {
    throw new Error(msg || "Assertion failed");
  }
}
