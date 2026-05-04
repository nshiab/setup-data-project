import { assertExists } from "@std/assert";
import { readFileSync } from "node:fs";
import { ensureAgents } from "../src/helpers/ensureAgents.ts";
import { createTestDir } from "./helpers/utils.ts";

Deno.test("ensureAgents - should create AGENTS.md", () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  try {
    ensureAgents({});
    assertExists("AGENTS.md");
    const content = readFileSync("AGENTS.md", "utf-8");
    assert(
      content.includes('Always use "sda/main.ts"'),
      "Should include basic instructions",
    );
    // Only check if it contains the header text which is part of the conditional section
    assert(
      !content.includes(
        'Here are the functions available in the "journalism" libraries',
      ),
      "Should not include journalism header if empty",
    );
    assert(
      !content.includes(
        'Here are the classes and their methods available in the "simple-data-analysis" library',
      ),
      "Should not include SDA header if empty",
    );
  } finally {
    Deno.chdir(originalCwd);
    cleanup();
  }
});

Deno.test("ensureAgents - should include journalism functions when present", () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  try {
    const docsMapping = {
      "@nshiab/journalism-format":
        "# API Reference\n## formatDate\n## camelCase",
    };
    ensureAgents(docsMapping);
    const content = readFileSync("AGENTS.md", "utf-8");
    assert(
      content.includes("### journalism-format"),
      "Should include journalism package name",
    );
    assert(content.includes("formatDate"), "Should include function names");
    assert(content.includes("camelCase"), "Should include function names");
  } finally {
    Deno.chdir(originalCwd);
    cleanup();
  }
});

Deno.test("ensureAgents - should include sda classes and methods when present", () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  try {
    const docsMapping = {
      "@nshiab/simple-data-analysis":
        "# SDA\n## class SimpleDB\n#### constructor\n#### ai\n## class SimpleTable\n#### select\n#### filter",
    };
    ensureAgents(docsMapping);
    const content = readFileSync("AGENTS.md", "utf-8");
    assert(content.includes("SimpleDB"), "Should include class name");
    assert(content.includes("SimpleTable"), "Should include class name");
    assert(content.includes("- ai"), "Should include method names");
    assert(content.includes("- select"), "Should include method names");
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
