import { assertEquals } from "@std/assert";
import { readFileSync, writeFileSync } from "node:fs";
import { updateProjectConfig } from "../src/helpers/updateProjectConfig.ts";
import { createTestDir } from "./helpers/utils.ts";

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
