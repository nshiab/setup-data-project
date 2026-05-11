import { assertEquals } from "@std/assert";
import { stub } from "@std/testing/mock";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { updateProjectConfig } from "../src/helpers/updateProjectConfig.ts";
import { createTestDir } from "./helpers/utils.ts";
import { runtimeConfig } from "../src/helpers/getRuntime.ts";
import {
  commandRunner,
  installPackagesAndFetchDocs,
} from "../src/helpers/installPackagesAndFetchDocs.ts";

Deno.test("updateProjectConfig - should update deno.json if it exists", () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  try {
    const initialConfig = { tasks: { test: "deno test" } };
    writeFileSync("deno.json", JSON.stringify(initialConfig, null, 2));

    const newTasks = { sda: "deno run sda/main.ts" };
    updateProjectConfig(newTasks);

    const updatedConfig = JSON.parse(readFileSync("deno.json", "utf-8"));
    assertEquals(updatedConfig.tasks.test, "deno test");
    assertEquals(updatedConfig.tasks.sda, "deno run sda/main.ts");
  } finally {
    Deno.chdir(originalCwd);
    cleanup();
  }
});

Deno.test("updateProjectConfig - should update package.json if it exists and no deno.json", () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  try {
    const initialConfig = { scripts: { start: "node index.js" } };
    writeFileSync("package.json", JSON.stringify(initialConfig, null, 2));

    const newTasks = { sda: "node --watch sda/main.ts" };
    updateProjectConfig(newTasks);

    const updatedConfig = JSON.parse(readFileSync("package.json", "utf-8"));
    assertEquals(updatedConfig.scripts.start, "node index.js");
    assertEquals(updatedConfig.scripts.sda, "node --watch sda/main.ts");
  } finally {
    Deno.chdir(originalCwd);
    cleanup();
  }
});

Deno.test("updateProjectConfig - should create config in nested folder if it doesn't exist", () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();

  // Clean up any existing stub
  // @ts-ignore: Mocking for testing
  if (runtimeConfig.getRuntime.restore) {
    // @ts-ignore: Mocking for testing
    runtimeConfig.getRuntime.restore();
  }

  try {
    // 1. Run in an empty folder (tempDir)
    Deno.chdir(tempDir);
    // Use Deno by default for this test
    const denoStub = stub(runtimeConfig, "getRuntime", () => "deno" as const);

    try {
      updateProjectConfig({ "task1": "deno run main.ts" });
      assertEquals(
        existsSync(join(tempDir, "deno.json")),
        true,
        "deno.json should be created in root",
      );

      // 2. Create a new folder in it.
      const nestedDir = join(tempDir, "nested");
      mkdirSync(nestedDir);

      // 3. cd in it.
      Deno.chdir(nestedDir);

      // 4. Call the script again.
      updateProjectConfig({ "task2": "deno run main.ts" });

      // Check if deno.json was created in nested folder
      assertEquals(
        existsSync(join(nestedDir, "deno.json")),
        true,
        "deno.json should be created in nested folder",
      );
    } finally {
      if (!denoStub.restored) denoStub.restore();
    }
  } finally {
    Deno.chdir(originalCwd);
    cleanup();
  }
});

Deno.test("updateProjectConfig - Node runtime simulation in nested folder", async () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();

  // Check if runtimeConfig is already stubbed
  // @ts-ignore: Mocking for testing
  if (runtimeConfig.getRuntime.restore) {
    // @ts-ignore: Mocking for testing
    runtimeConfig.getRuntime.restore();
  }

  try {
    Deno.chdir(tempDir);
    // Mock getRuntime to return "node"
    const runtimeStub = stub(
      runtimeConfig,
      "getRuntime",
      () => "node" as const,
    );

    // Mock commandRunner.exec to simulate package installation
    const execStub = stub(
      commandRunner,
      "exec",
      ((_cmd: string, callback: unknown) => {
        // Simulate npm behavior: if package.json exists in root/parent, it doesn't create one here.
        // BUT wait, in our test we want to see if our fix works.
        // Let's NOT create it automatically in exec anymore, to see if updateProjectConfig does it.
        if (typeof callback === "function") {
          // @ts-ignore: Mocking Node.js callback
          callback(null, "", "");
        }
        // @ts-ignore: Mocking ChildProcess return
        return {};
      }) as unknown as typeof commandRunner.exec,
    );

    // Mock fetch for docs
    const originalFetch = globalThis.fetch;
    globalThis.fetch = ((() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve("# Docs"),
      })) as unknown) as typeof fetch;

    try {
      // 1. Run in root (an empty folder)
      // In reality, if it's an empty folder, npm install will look for a package.json upwards.
      // If it finds one in a parent directory, it will install there and NOT create one in the current folder.
      // This is likely the "bug" or behavior causing issues in nested folders.

      const pkg = "@nshiab/simple-data-analysis";

      // Simulate running the script in root (tempDir)
      await installPackagesAndFetchDocs([pkg], { silent: true });
      updateProjectConfig({ "sda": "node sda/main.ts" });

      // In root, package.json should exist because it's the "start"
      assertEquals(
        existsSync(join(tempDir, "package.json")),
        true,
        "package.json should exist in root",
      );

      // 2. Create a new folder in it.
      const nestedDir = join(tempDir, "nested");
      mkdirSync(nestedDir);

      // 3. cd in it.
      Deno.chdir(nestedDir);

      // 4. Call the script again.
      // We simulate a behavior where npm install DOES NOT create a package.json because it found one in the parent.
      // In our mock, we need to reflect that.

      // Redefine execStub to simulate "finding parent package.json" behavior
      execStub.restore();
      const execStubNested = stub(
        commandRunner,
        "exec",
        ((_cmd: string, callback: unknown) => {
          // Simulate npm behavior: if package.json exists in parent, it doesn't create one here.
          // We don't create it here.
          if (typeof callback === "function") {
            // @ts-ignore: Mocking Node.js callback
            callback(null, "", "");
          }
          // @ts-ignore: Mocking ChildProcess return
          return {};
        }) as unknown as typeof commandRunner.exec,
      );

      try {
        await installPackagesAndFetchDocs([pkg], { silent: true });
        updateProjectConfig({ "sda": "node sda/main.ts" });

        // This is where the failure should happen if the user's report is correct.
        // Our current updateProjectConfig returns early if package.json doesn't exist.
        assertEquals(
          existsSync(join(nestedDir, "package.json")),
          true,
          "package.json should be created in nested folder even if npm didn't create it",
        );
      } finally {
        execStubNested.restore();
      }
    } finally {
      runtimeStub.restore();
      // execStub.restore(); // This is the duplicate one
      globalThis.fetch = originalFetch;
    }
  } finally {
    Deno.chdir(originalCwd);
    cleanup();
  }
});
