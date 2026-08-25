import { assertEquals, assertExists } from "@std/assert";
import { log } from "@clack/prompts";
import { readFileSync } from "node:fs";
import { ensureAgents } from "../src/helpers/ensureAgents.ts";
import { createTestDir } from "./helpers/utils.ts";

Deno.test("ensureAgents - should create AGENTS.md", async () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  try {
    const messages: string[] = [];
    log.info = (message) => messages.push(message);

    await ensureAgents({}, "deno");
    assertExists("AGENTS.md");
    const content = readFileSync("AGENTS.md", "utf-8");
    assert(
      content.includes('Always use "sda/main.ts"'),
      "Should include basic instructions",
    );
    assert(
      content.includes(
        "<!-- Do not remove / setup-data-project:agents:start -->",
      ),
    );
    assert(
      content.includes(
        "<!-- Do not remove / setup-data-project:agents:end -->",
      ),
    );
    assert(
      content.includes(
        '"sda/data" folder, which is ignored by Git.',
      ),
    );
    assert(
      content.includes(
        '"sda/output" folder, which is also ignored by Git.',
      ),
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
    assertEquals(messages, ["Created AGENTS.md"]);
  } finally {
    Deno.chdir(originalCwd);
    cleanup();
  }
});

Deno.test("ensureAgents - should recommend a one-shot SDA command", async () => {
  const cases = [
    {
      runtime: "deno",
      command: "deno run -A --env --check sda/main.ts",
      watchedCommand: "deno task sda",
    },
    {
      runtime: "bun",
      command: "bun run sda/main.ts",
      watchedCommand: "npm run sda",
    },
    {
      runtime: "node",
      command:
        "node --env-file-if-exists=.env --experimental-strip-types sda/main.ts",
      watchedCommand: "npm run sda",
    },
  ];

  for (const { runtime, command, watchedCommand } of cases) {
    const { tempDir, cleanup } = createTestDir();
    const originalCwd = Deno.cwd();
    Deno.chdir(tempDir);

    try {
      await ensureAgents({}, runtime);
      const content = readFileSync("AGENTS.md", "utf-8");
      assert(content.includes(`\`${command}\``));
      assert(!content.includes(`\`${watchedCommand}\``));
      assert(content.includes("watch mode"));
    } finally {
      Deno.chdir(originalCwd);
      cleanup();
    }
  }
});

Deno.test("ensureAgents - should caution against unnecessary cache cleaning", async () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  try {
    await ensureAgents({}, "deno");
    const content = readFileSync("AGENTS.md", "utf-8");
    assert(content.includes("`deno task clean`"));
    assert(
      content.includes(
        "Do not run it routinely. Cached results can be especially valuable for computationally expensive operations or API calls.",
      ),
    );
    assert(
      content.includes(
        "If you are unsure whether the caches should be removed, ask the user first.",
      ),
    );
  } finally {
    Deno.chdir(originalCwd);
    cleanup();
  }
});

Deno.test("ensureAgents - should recommend tests for each runtime", async () => {
  const cases = [
    { runtime: "deno", command: "deno task all-tests" },
    { runtime: "bun", command: "bun run all-tests" },
    { runtime: "node", command: "npm run all-tests" },
  ];

  for (const { runtime, command } of cases) {
    const { tempDir, cleanup } = createTestDir();
    const originalCwd = Deno.cwd();
    Deno.chdir(tempDir);

    try {
      await ensureAgents({}, runtime);
      const content = readFileSync("AGENTS.md", "utf-8");
      assert(
        content.includes(
          `Before handing off your work, always run \`${command}\`, even if no tests have been added yet. Fix any errors or warnings it reports.`,
        ),
      );
      assert(
        content.includes(
          'Put tests in the "sda/tests" folder. Write focused tests for reusable helpers and important data transformations when appropriate. When testing a helper from "sda/helpers/functionName.ts", name its test file "sda/tests/functionName.test.ts".',
        ),
      );
      assertEquals(content.split(command).length - 1, 1);
    } finally {
      Deno.chdir(originalCwd);
      cleanup();
    }
  }
});

Deno.test("ensureAgents - should include journalism functions when present", async () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  try {
    const docsMapping = {
      "@nshiab/journalism-format":
        "# API Reference\n## formatDate\n## camelCase",
    };
    await ensureAgents(docsMapping, "deno");
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

Deno.test("ensureAgents - should exclude journalism function documentation headings", async () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  try {
    const docsMapping = {
      "@nshiab/journalism-ai": [
        "# API Reference",
        "## askGemini",
        "### Signature",
        "### Parameters",
        "### Examples",
        "## askGeminiPool",
        "### Signature",
        "### Parameters",
        "### Returns",
        "### Examples",
      ].join("\n"),
    };
    await ensureAgents(docsMapping, "deno");
    const content = readFileSync("AGENTS.md", "utf-8");

    assert(content.includes("askGemini"));
    assert(content.includes("askGeminiPool"));
    assert(!content.includes("Signature"));
    assert(!content.includes("Parameters"));
    assert(!content.includes("Returns"));
    assert(!content.includes("Examples"));
  } finally {
    Deno.chdir(originalCwd);
    cleanup();
  }
});

Deno.test("ensureAgents - should include sda classes and methods when present", async () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  try {
    const docsMapping = {
      "@nshiab/simple-data-analysis":
        "# SDA\n## class SimpleDB\n#### constructor\n#### ai\n## class SimpleTable\n#### select\n#### filter",
    };
    await ensureAgents(docsMapping, "deno");
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

Deno.test("ensureAgents - should not create empty bullets for SDA parameter headings", async () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  try {
    const docsMapping = {
      "@nshiab/simple-data-analysis":
        "## class SimpleDB\n#### Parameters\n#### newTable",
    };
    await ensureAgents(docsMapping, "deno");
    const content = readFileSync("AGENTS.md", "utf-8");

    assert(content.includes("class SimpleDB"));
    assert(content.includes("  - newTable"));
    assert(!content.includes("\n  - \n"));
  } finally {
    Deno.chdir(originalCwd);
    cleanup();
  }
});

Deno.test("ensureAgents - should link to the installed SDA package docs", async () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  try {
    const docsMapping = {
      "@nshiab/simple-data-analysis-core":
        "# SDA Core\n## class SimpleDB\n#### select",
    };
    await ensureAgents(
      docsMapping,
      "deno",
      ["@nshiab/simple-data-analysis-core"],
    );
    const content = readFileSync("AGENTS.md", "utf-8");
    assert(content.includes('"simple-data-analysis-core" library'));
    assert(
      content.includes('"./docs/simple-data-analysis-core.md"'),
    );
  } finally {
    Deno.chdir(originalCwd);
    cleanup();
  }
});

Deno.test("ensureAgents - should rebuild all installed APIs across runs", async () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  try {
    const messages: string[] = [];
    log.info = (message) => messages.push(message);

    await ensureAgents(
      { "@nshiab/simple-data-analysis": "## class SimpleDB\n#### select" },
      "deno",
      ["@nshiab/simple-data-analysis"],
    );
    await ensureAgents(
      {
        "@nshiab/simple-data-analysis": "## class SimpleDB\n#### select",
        "@nshiab/journalism-format": "## formatDate",
      },
      "deno",
      ["@nshiab/simple-data-analysis", "@nshiab/journalism-format"],
    );

    const content = readFileSync("AGENTS.md", "utf-8");
    assert(content.includes("SimpleDB"));
    assert(content.includes("formatDate"));
    assert(content.includes("@nshiab/simple-data-analysis"));
    assert(content.includes("@nshiab/journalism-format"));
    assertEquals(content.match(/Always verify if there is a/g)?.length, 1);
    assertEquals(messages, ["Created AGENTS.md", "Updated AGENTS.md"]);
  } finally {
    Deno.chdir(originalCwd);
    cleanup();
  }
});

Deno.test("ensureAgents - should omit library guidance with no installed packages", async () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  try {
    await ensureAgents({}, "deno", []);
    const content = readFileSync("AGENTS.md", "utf-8");
    assert(!content.includes("@nshiab/"));
    assert(
      content.includes(
        "<!-- Do not remove / setup-data-project:agents:start -->",
      ),
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
