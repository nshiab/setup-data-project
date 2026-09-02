import { assertEquals } from "@std/assert";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fetchPackageDocs } from "../src/helpers/fetchPackageDocs.ts";
import { syncPackageDocs } from "../src/helpers/syncPackageDocs.ts";
import { createTestDir } from "./helpers/utils.ts";

Deno.test("syncPackageDocs - should refresh exact versions and remove stale docs", async () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  const originalFetch = globalThis.fetch;
  Deno.chdir(tempDir);
  mkdirSync(join("docs", "simple-data-analysis"), { recursive: true });
  writeFileSync(
    join("docs", "simple-data-analysis", "llm.md"),
    "## old SimpleDB",
  );
  mkdirSync(join("docs", "journalism-ai"), { recursive: true });
  writeFileSync(join("docs", "journalism-ai", "llm.md"), "## stale");
  const fetchedUrls: string[] = [];
  globalThis.fetch = (((url: string) => {
    fetchedUrls.push(url);
    const repoName = url.includes("simple-data-analysis")
      ? "Simple Data Analysis"
      : "Format";
    return Promise.resolve({
      ok: true,
      text: () =>
        Promise.resolve(
          url.endsWith("/README.md") ? `# ${repoName}` : `## ${repoName} API`,
        ),
    });
  }) as unknown) as typeof fetch;

  try {
    const mapping = await syncPackageDocs(
      [
        "@nshiab/simple-data-analysis",
        "@nshiab/journalism-format",
      ],
      {
        "@nshiab/simple-data-analysis": "6.0.2",
        "@nshiab/journalism-format": "1.1.10",
      },
    );

    assertEquals(mapping["@nshiab/simple-data-analysis"], {
      readme: "# Simple Data Analysis",
      llm: "## Simple Data Analysis API",
    });
    assertEquals(mapping["@nshiab/journalism-format"], {
      readme: "# Format",
      llm: "## Format API",
    });
    assertEquals(existsSync(join("docs", "journalism-ai")), false);
    assertEquals(
      fetchedUrls.includes(
        "https://raw.githubusercontent.com/nshiab/simple-data-analysis/refs/tags/v6.0.2/llm.md",
      ),
      true,
    );
    assertEquals(
      fetchedUrls.includes(
        "https://raw.githubusercontent.com/nshiab/journalism-format/refs/tags/v1.1.10/README.md",
      ),
      true,
    );
  } finally {
    globalThis.fetch = originalFetch;
    Deno.chdir(originalCwd);
    cleanup();
  }
});

Deno.test("fetchPackageDocs - should preserve but exclude files when refresh fails", async () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  const originalFetch = globalThis.fetch;
  Deno.chdir(tempDir);
  const docsDirectory = join("docs", "journalism-format");
  mkdirSync(docsDirectory, { recursive: true });
  const readmePath = join(docsDirectory, "README.md");
  const llmDocsPath = join(docsDirectory, "llm.md");
  writeFileSync(readmePath, "old README");
  writeFileSync(llmDocsPath, "old docs");
  globalThis.fetch =
    ((() => Promise.resolve({ ok: false })) as unknown) as typeof fetch;

  try {
    const docs = await fetchPackageDocs(
      "@nshiab/journalism-format",
      "1.1.10",
      { silent: true },
    );
    assertEquals(docs, {});
    assertEquals(readFileSync(readmePath, "utf-8"), "old README");
    assertEquals(readFileSync(llmDocsPath, "utf-8"), "old docs");
  } finally {
    globalThis.fetch = originalFetch;
    Deno.chdir(originalCwd);
    cleanup();
  }
});

Deno.test("syncPackageDocs - should expose only files fetched successfully", async () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  const originalFetch = globalThis.fetch;
  Deno.chdir(tempDir);
  mkdirSync("docs");
  const legacyPath = join("docs", "journalism-format.md");
  writeFileSync(legacyPath, "## legacyFormatDate");
  globalThis.fetch = (((url: string) =>
    Promise.resolve(
      url.endsWith("/README.md")
        ? {
          ok: true,
          text: () => Promise.resolve("# Format README"),
        }
        : { ok: false },
    )) as unknown) as typeof fetch;

  try {
    const mapping = await syncPackageDocs(
      ["@nshiab/journalism-format"],
      { "@nshiab/journalism-format": "1.1.10" },
    );
    const llmDocsPath = join("docs", "journalism-format", "llm.md");

    assertEquals(mapping["@nshiab/journalism-format"], {
      readme: "# Format README",
    });
    assertEquals(existsSync(legacyPath), false);
    assertEquals(readFileSync(llmDocsPath, "utf-8"), "## legacyFormatDate");
  } finally {
    globalThis.fetch = originalFetch;
    Deno.chdir(originalCwd);
    cleanup();
  }
});

Deno.test("syncPackageDocs - should exclude docs without an exact version", async () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  const originalFetch = globalThis.fetch;
  Deno.chdir(tempDir);
  const docsDirectory = join("docs", "journalism-format");
  mkdirSync(docsDirectory, { recursive: true });
  writeFileSync(join(docsDirectory, "llm.md"), "## possibly stale");
  let fetched = false;
  globalThis.fetch = ((() => {
    fetched = true;
    return Promise.resolve({ ok: true });
  }) as unknown) as typeof fetch;

  try {
    const mapping = await syncPackageDocs(
      ["@nshiab/journalism-format"],
      {},
    );

    assertEquals(mapping, {});
    assertEquals(fetched, false);
    assertEquals(
      readFileSync(join(docsDirectory, "llm.md"), "utf-8"),
      "## possibly stale",
    );
  } finally {
    globalThis.fetch = originalFetch;
    Deno.chdir(originalCwd);
    cleanup();
  }
});
