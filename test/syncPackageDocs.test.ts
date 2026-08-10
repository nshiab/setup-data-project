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
  mkdirSync("docs");
  writeFileSync(join("docs", "simple-data-analysis.md"), "## SimpleDB");
  writeFileSync(join("docs", "journalism-ai.md"), "## stale");
  globalThis.fetch = ((() =>
    Promise.resolve({
      ok: true,
      text: () => Promise.resolve("## formatDate"),
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
    assertEquals(existsSync(join("docs", "journalism-ai.md")), false);
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
  mkdirSync("docs");
  const docPath = join("docs", "journalism-format.md");
  writeFileSync(docPath, "old docs");
  globalThis.fetch =
    ((() => Promise.resolve({ ok: false })) as unknown) as typeof fetch;

  try {
    await fetchPackageDocs("@nshiab/journalism-format", { silent: true });
    assertEquals(readFileSync(docPath, "utf-8"), "old docs");
  } finally {
    globalThis.fetch = originalFetch;
    Deno.chdir(originalCwd);
    cleanup();
  }
});
