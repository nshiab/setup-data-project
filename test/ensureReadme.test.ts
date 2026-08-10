import { assertEquals, assertExists } from "@std/assert";
import { log } from "@clack/prompts";
import { readFileSync, writeFileSync } from "node:fs";
import { ensureReadme } from "../src/helpers/ensureReadme.ts";
import { createTestDir } from "./helpers/utils.ts";

Deno.test("ensureReadme - should create README.md if not exists", async () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  try {
    const messages: string[] = [];
    log.info = (message) => messages.push(message);

    await ensureReadme("deno");
    assertExists("README.md");
    const content = readFileSync("README.md", "utf-8");
    assert(
      content.includes("setup-data-project"),
      "Should include link to project",
    );
    assert(content.includes("This repository was created with"));
    assert(content.includes("ignored by Git"));
    assert(
      content.includes(
        "<!-- Do not remove / setup-data-project:libraries:start -->",
      ),
    );
    assert(
      content.includes(
        "<!-- Do not remove / setup-data-project:libraries:end -->",
      ),
    );
    assert(!content.includes("[journalism]"));
    assert(!content.includes("[simple-data-analysis]"));
    assertEquals(messages, ["Created README.md"]);
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
    const messages: string[] = [];
    log.info = (message) => messages.push(message);

    await ensureReadme("deno", ["@nshiab/simple-data-analysis"]);
    writeFileSync("README.md", readFileSync("README.md", "utf-8") + "\nCustom");

    await ensureReadme("deno", [
      "@nshiab/simple-data-analysis",
      "@nshiab/journalism-format",
    ]);

    const content = readFileSync("README.md", "utf-8");
    assert(content.includes("[simple-data-analysis]"));
    assert(content.includes("[journalism]"));
    assert(content.includes("It has installed"));
    assert(content.includes("Whenever you save changes"));
    assert(content.endsWith("Custom"));
    assertEquals(
      content.match(/setup-data-project:libraries:start/g)?.length,
      1,
    );
    assertEquals(messages, ["Created README.md", "Updated README.md"]);
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
