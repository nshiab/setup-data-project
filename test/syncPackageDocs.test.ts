import { assertEquals } from "@std/assert";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fetchPackageDocs } from "../src/helpers/installPackagesAndFetchDocs.ts";
import { syncPackageDocs } from "../src/helpers/syncPackageDocs.ts";
import { createTestDir } from "./helpers/utils.ts";

Deno.test("syncPackageDocs - should fetch missing, load existing, and remove stale docs", async () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  const originalFetch = globalThis.fetch;
  Deno.chdir(tempDir);
  mkdirSync(join("docs", "simple-data-analysis"), { recursive: true });
  writeFileSync(
    join("docs", "simple-data-analysis", "README.md"),
    "# Simple Data Analysis",
  );
  writeFileSync(
    join("docs", "simple-data-analysis", "llm.md"),
    "## SimpleDB",
  );
  mkdirSync(join("docs", "journalism-ai"), { recursive: true });
  writeFileSync(join("docs", "journalism-ai", "llm.md"), "## stale");
  globalThis.fetch = (((url: string) =>
    Promise.resolve({
      ok: true,
      text: () =>
        Promise.resolve(
          url.endsWith("/README.md") ? "# Format" : "## formatDate",
        ),
    })) as unknown) as typeof fetch;

  try {
    const mapping = await syncPackageDocs([
      "@nshiab/simple-data-analysis",
      "@nshiab/journalism-format",
    ]);

    assertEquals(
      mapping["@nshiab/simple-data-analysis"],
      "## SimpleDB",
    );
    assertEquals(mapping["@nshiab/journalism-format"], "## formatDate");
    assertEquals(existsSync(join("docs", "journalism-ai")), false);
    assertEquals(
      readFileSync(join("docs", "journalism-format", "README.md"), "utf-8"),
      "# Format",
    );
  } finally {
    globalThis.fetch = originalFetch;
    Deno.chdir(originalCwd);
    cleanup();
  }
});

Deno.test("fetchPackageDocs - should preserve old docs when refresh fails", async () => {
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
    await fetchPackageDocs("@nshiab/journalism-format", { silent: true });
    assertEquals(readFileSync(readmePath, "utf-8"), "old README");
    assertEquals(readFileSync(llmDocsPath, "utf-8"), "old docs");
  } finally {
    globalThis.fetch = originalFetch;
    Deno.chdir(originalCwd);
    cleanup();
  }
});

Deno.test("syncPackageDocs - should migrate legacy API docs", async () => {
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
    const mapping = await syncPackageDocs(["@nshiab/journalism-format"]);
    const llmDocsPath = join("docs", "journalism-format", "llm.md");

    assertEquals(mapping["@nshiab/journalism-format"], "## legacyFormatDate");
    assertEquals(existsSync(legacyPath), false);
    assertEquals(readFileSync(llmDocsPath, "utf-8"), "## legacyFormatDate");
    assertEquals(
      readFileSync(join("docs", "journalism-format", "README.md"), "utf-8"),
      "# Format README",
    );
  } finally {
    globalThis.fetch = originalFetch;
    Deno.chdir(originalCwd);
    cleanup();
  }
});
