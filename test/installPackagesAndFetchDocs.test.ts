import { assertEquals } from "@std/assert";
import { stub } from "@std/testing/mock";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import {
  commandRunner,
  installPackagesAndFetchDocs,
} from "../src/helpers/installPackagesAndFetchDocs.ts";
import { createTestDir } from "./helpers/utils.ts";

Deno.test("installPackagesAndFetchDocs - should try to install packages and fetch docs", async () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  // Mock execSync to avoid real installation
  const execStub = stub(commandRunner, "execSync");

  // Mock global fetch
  const originalFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    if (url.includes("simple-data-analysis")) {
      return Promise.resolve({
        ok: true,
        text: () => Promise.resolve("# SDA Docs"),
      });
    }
    return Promise.resolve({ ok: false });
  }) as typeof fetch;

  try {
    const pkg = "@nshiab/simple-data-analysis";
    await installPackagesAndFetchDocs([pkg], { silent: true });

    // Check if docs directory and file were created
    const docPath = join("docs", "simple-data-analysis.md");
    assertEquals(existsSync(docPath), true);
    assertEquals(readFileSync(docPath, "utf-8"), "# SDA Docs");

    // Check if execSync was called with the correct command (for Deno runtime)
    assertEquals(
      execStub.calls[0].args[0],
      "deno add jsr:@nshiab/simple-data-analysis",
    );
  } finally {
    execStub.restore();
    globalThis.fetch = originalFetch;
    Deno.chdir(originalCwd);
    cleanup();
  }
});
