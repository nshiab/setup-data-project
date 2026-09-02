import { assertEquals } from "@std/assert";
import { stub } from "@std/testing/mock";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import {
  commandRunner,
  installPackagesAndFetchDocs,
} from "../src/helpers/installPackagesAndFetchDocs.ts";
import { createTestDir } from "./helpers/utils.ts";
import { runtimeConfig } from "../src/helpers/getRuntime.ts";

Deno.test("installPackagesAndFetchDocs - should try to install packages and fetch docs", async () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  // Mock exec to avoid real installation
  const execStub = stub(
    commandRunner,
    "exec",
    ((_cmd: string, callback: unknown) => {
      if (typeof callback === "function") {
        // @ts-ignore: Mocking Node.js callback
        callback(null, "", "");
      }
      // @ts-ignore: Mocking ChildProcess return
      return {};
    }) as unknown as typeof commandRunner.exec,
  );

  // Mock global fetch
  const originalFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    if (url.endsWith("/README.md")) {
      return Promise.resolve({
        ok: true,
        text: () => Promise.resolve("# SDA README"),
      });
    }
    return Promise.resolve({
      ok: true,
      text: () => Promise.resolve("# SDA Docs"),
    });
  }) as typeof fetch;

  try {
    const pkg = "@nshiab/simple-data-analysis";
    await installPackagesAndFetchDocs([pkg], { silent: true });

    // Check if both documentation files were created
    const docsDirectory = join("docs", "simple-data-analysis");
    const readmePath = join(docsDirectory, "README.md");
    const llmDocsPath = join(docsDirectory, "llm.md");
    assertEquals(existsSync(readmePath), true);
    assertEquals(readFileSync(readmePath, "utf-8"), "# SDA README");
    assertEquals(existsSync(llmDocsPath), true);
    assertEquals(readFileSync(llmDocsPath, "utf-8"), "# SDA Docs");

    // Check if execSync was called with the correct command (for Deno runtime)
    assertEquals(
      execStub.calls[0].args[0],
      "deno add --min-dep-age=0 jsr:@nshiab/simple-data-analysis",
    );
    assertEquals(
      execStub.calls[1].args[0],
      "deno add npm:@observablehq/plot",
    );
  } finally {
    execStub.restore();
    globalThis.fetch = originalFetch;
    Deno.chdir(originalCwd);
    cleanup();
  }
});

Deno.test("installPackagesAndFetchDocs - should use npm install for node runtime", async () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  const execStub = stub(
    commandRunner,
    "exec",
    ((_cmd: string, callback: unknown) => {
      if (typeof callback === "function") {
        // @ts-ignore: Mocking Node.js callback
        callback(null, "", "");
      }
      // @ts-ignore: Mocking ChildProcess return
      return {};
    }) as unknown as typeof commandRunner.exec,
  );
  const runtimeStub = stub(runtimeConfig, "getRuntime", () => "node" as const);
  const originalFetch = globalThis.fetch;
  globalThis.fetch = ((() =>
    Promise.resolve({
      ok: true,
      text: () => Promise.resolve("# Docs"),
    })) as unknown) as typeof fetch;

  try {
    const pkg = "@nshiab/simple-data-analysis";
    await installPackagesAndFetchDocs([pkg], { silent: true });

    assertEquals(
      execStub.calls[0].args[0],
      "npm install @nshiab/simple-data-analysis",
    );
    assertEquals(
      execStub.calls[1].args[0],
      "npm install @observablehq/plot",
    );
  } finally {
    runtimeStub.restore();
    execStub.restore();
    globalThis.fetch = originalFetch;
    Deno.chdir(originalCwd);
    cleanup();
  }
});

Deno.test("installPackagesAndFetchDocs - should use bun add for bun runtime", async () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  const execStub = stub(
    commandRunner,
    "exec",
    ((_cmd: string, callback: unknown) => {
      if (typeof callback === "function") {
        // @ts-ignore: Mocking Node.js callback
        callback(null, "", "");
      }
      // @ts-ignore: Mocking ChildProcess return
      return {};
    }) as unknown as typeof commandRunner.exec,
  );
  const runtimeStub = stub(runtimeConfig, "getRuntime", () => "bun" as const);
  const originalFetch = globalThis.fetch;
  globalThis.fetch = ((() =>
    Promise.resolve({
      ok: true,
      text: () => Promise.resolve("# Docs"),
    })) as unknown) as typeof fetch;

  try {
    const pkg = "@nshiab/simple-data-analysis";
    await installPackagesAndFetchDocs([pkg], { silent: true });

    assertEquals(
      execStub.calls[0].args[0],
      "bun add @nshiab/simple-data-analysis",
    );
  } finally {
    runtimeStub.restore();
    execStub.restore();
    globalThis.fetch = originalFetch;
    Deno.chdir(originalCwd);
    cleanup();
  }
});
