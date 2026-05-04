import { assertExists } from "@std/assert";
import { readFileSync } from "node:fs";
import { ensureReadme } from "../src/helpers/ensureReadme.ts";
import { createTestDir } from "./helpers/utils.ts";

Deno.test("ensureReadme - should create README.md if not exists", async () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  try {
    await ensureReadme("deno");
    assertExists("README.md");
    const content = readFileSync("README.md", "utf-8");
    assert(
      content.includes("setup-data-project"),
      "Should include link to project",
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
