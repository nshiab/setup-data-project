import { assertEquals, assertExists } from "@std/assert";
import { readFileSync, writeFileSync } from "node:fs";
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
    assert(!content.includes("[journalism]"));
    assert(!content.includes("[simple-data-analysis]"));
  } finally {
    Deno.chdir(originalCwd);
    cleanup();
  }
});

Deno.test("ensureReadme - should update installed library families across runs", async () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  try {
    await ensureReadme("deno", ["@nshiab/simple-data-analysis"]);
    writeFileSync("README.md", readFileSync("README.md", "utf-8") + "\nCustom");

    await ensureReadme("deno", [
      "@nshiab/simple-data-analysis",
      "@nshiab/journalism-format",
    ]);

    const content = readFileSync("README.md", "utf-8");
    assert(content.includes("[simple-data-analysis]"));
    assert(content.includes("[journalism]"));
    assert(content.endsWith("Custom"));
    assertEquals(
      content.match(/setup-data-project:libraries:start/g)?.length,
      1,
    );
  } finally {
    Deno.chdir(originalCwd);
    cleanup();
  }
});

Deno.test("ensureReadme - should not change a file without markers", async () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  try {
    writeFileSync("README.md", "User README");
    await ensureReadme("deno", ["@nshiab/journalism-format"]);
    assertEquals(readFileSync("README.md", "utf-8"), "User README");
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
