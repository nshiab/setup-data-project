import { assertEquals, assertThrows } from "@std/assert";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { ProjectManifest } from "../src/helpers/projectManifest.ts";
import { createTestDir } from "./helpers/utils.ts";

Deno.test("ProjectManifest - should update Deno tasks and read imports", () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  try {
    writeFileSync(
      "deno.json",
      JSON.stringify({
        tasks: { test: "deno test" },
        imports: {
          "@nshiab/simple-data-analysis": "jsr:@nshiab/simple-data-analysis",
        },
      }),
    );

    const manifest = ProjectManifest.open("deno");
    manifest.updateTasks({ sda: "deno run sda/main.ts" });

    const updated = JSON.parse(readFileSync("deno.json", "utf-8"));
    assertEquals(updated.tasks, {
      test: "deno test",
      sda: "deno run sda/main.ts",
    });
    assertEquals(manifest.getInstalledPackages(), [
      "@nshiab/simple-data-analysis",
    ]);
  } finally {
    Deno.chdir(originalCwd);
    cleanup();
  }
});

Deno.test("ProjectManifest - should update package scripts and read dependencies", () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  try {
    writeFileSync(
      "package.json",
      JSON.stringify({
        scripts: { start: "node index.js" },
        dependencies: { "@nshiab/journalism-format": "latest" },
        devDependencies: { "@nshiab/journalism-ai": "latest" },
      }),
    );

    const manifest = ProjectManifest.open("node");
    manifest.updateTasks({ sda: "node sda/main.ts" });

    const updated = JSON.parse(readFileSync("package.json", "utf-8"));
    assertEquals(updated.scripts, {
      start: "node index.js",
      sda: "node sda/main.ts",
    });
    assertEquals(manifest.getInstalledPackages(), [
      "@nshiab/journalism-format",
      "@nshiab/journalism-ai",
    ]);
  } finally {
    Deno.chdir(originalCwd);
    cleanup();
  }
});

Deno.test("ProjectManifest - should create the runtime manifest when missing", () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  try {
    const denoManifest = ProjectManifest.open("deno");
    denoManifest.updateTasks({ sda: "deno run sda/main.ts" });
    assertEquals(existsSync("deno.json"), true);

    Deno.removeSync("deno.json");
    const nodeManifest = ProjectManifest.open("node");
    nodeManifest.updateTasks({ sda: "node sda/main.ts" });
    const packageConfig = JSON.parse(readFileSync("package.json", "utf-8"));
    assertEquals(packageConfig.name, "data-project");
    assertEquals(packageConfig.type, "module");
  } finally {
    Deno.chdir(originalCwd);
    cleanup();
  }
});

Deno.test("ProjectManifest - should fail before changing an invalid manifest", () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  try {
    const invalidManifest = '{ "imports": {';
    writeFileSync("deno.json", invalidManifest);

    assertThrows(
      () => ProjectManifest.open("deno"),
      Error,
      "Failed to parse deno.json",
    );
    assertEquals(readFileSync("deno.json", "utf-8"), invalidManifest);
  } finally {
    Deno.chdir(originalCwd);
    cleanup();
  }
});

Deno.test("ProjectManifest - should reload changes made by a package manager", () => {
  const { tempDir, cleanup } = createTestDir();
  const originalCwd = Deno.cwd();
  Deno.chdir(tempDir);

  try {
    writeFileSync("package.json", JSON.stringify({ dependencies: {} }));
    const manifest = ProjectManifest.open("node");

    writeFileSync(
      "package.json",
      JSON.stringify({
        dependencies: { "@nshiab/simple-data-analysis": "latest" },
      }),
    );
    manifest.reload();

    assertEquals(manifest.getInstalledPackages(), [
      "@nshiab/simple-data-analysis",
    ]);
  } finally {
    Deno.chdir(originalCwd);
    cleanup();
  }
});
