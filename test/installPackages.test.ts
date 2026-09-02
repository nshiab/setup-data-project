import { assertEquals } from "@std/assert";
import { stub } from "@std/testing/mock";
import { runtimeConfig } from "../src/helpers/getRuntime.ts";
import {
  commandRunner,
  installPackages,
} from "../src/helpers/installPackages.ts";
import { createTestDir } from "./helpers/utils.ts";

Deno.test("installPackages - should install packages before docs are fetched", async () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);
  const commands: string[] = [];
  const execStub = stub(
    commandRunner,
    "exec",
    ((command: string, callback: unknown) => {
      commands.push(command);
      if (typeof callback === "function") callback(null, "", "");
      return {};
    }) as unknown as typeof commandRunner.exec,
  );

  try {
    await installPackages(
      ["@nshiab/simple-data-analysis"],
      { silent: true },
    );
    assertEquals(commands, [
      "deno add --min-dep-age=0 jsr:@nshiab/simple-data-analysis",
      "deno add npm:@observablehq/plot",
    ]);
  } finally {
    execStub.restore();
    Deno.chdir(originalCwd);
    cleanup();
  }
});

Deno.test("installPackages - should use npm install for Node", async () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);
  const execStub = stub(
    commandRunner,
    "exec",
    ((_command: string, callback: unknown) => {
      if (typeof callback === "function") callback(null, "", "");
      return {};
    }) as unknown as typeof commandRunner.exec,
  );
  const runtimeStub = stub(runtimeConfig, "getRuntime", () => "node" as const);

  try {
    await installPackages(
      ["@nshiab/simple-data-analysis"],
      { silent: true },
    );
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
    Deno.chdir(originalCwd);
    cleanup();
  }
});

Deno.test("installPackages - should use bun add for Bun", async () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);
  const execStub = stub(
    commandRunner,
    "exec",
    ((_command: string, callback: unknown) => {
      if (typeof callback === "function") callback(null, "", "");
      return {};
    }) as unknown as typeof commandRunner.exec,
  );
  const runtimeStub = stub(runtimeConfig, "getRuntime", () => "bun" as const);

  try {
    await installPackages(
      ["@nshiab/simple-data-analysis"],
      { silent: true },
    );
    assertEquals(
      execStub.calls[0].args[0],
      "bun add @nshiab/simple-data-analysis",
    );
  } finally {
    runtimeStub.restore();
    execStub.restore();
    Deno.chdir(originalCwd);
    cleanup();
  }
});
