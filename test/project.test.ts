import { expect, test } from "vite-plus/test";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { ProjectManifest } from "../src/helpers/projectManifest.ts";
import { getProjectTasks } from "../src/helpers/getProjectTasks.ts";
import { getRuntime } from "../src/helpers/getRuntime.ts";
import { getInstalledPackageVersions } from "../src/helpers/getInstalledPackageVersions.ts";
import { parseArguments } from "../src/helpers/parseArguments.ts";
import { createFolderStructure } from "../src/helpers/createFolderStructure.ts";
import { ensureEnvFile } from "../src/helpers/ensureEnvFile.ts";
import { ensureGitignore } from "../src/helpers/ensureGitignore.ts";
import { ensureAgents } from "../src/helpers/ensureAgents.ts";
import { ensureReadme } from "../src/helpers/ensureReadme.ts";
import { ensureVscode } from "../src/helpers/ensureVscode.ts";
import { temporaryProject } from "./helpers/utils.ts";
temporaryProject();
test("new VS Code files pass the default formatter without fixes", () => {
  writeFileSync("package.json", '{"name":"editor-config-check","type":"module"}');
  ensureVscode();
  const vp = fileURLToPath(new URL("../node_modules/vite-plus/bin/vp", import.meta.url));
  expect(() =>
    execFileSync(process.execPath, [vp, "fmt", "--check", ".vscode"], { stdio: "pipe" }),
  ).not.toThrow();
});
test("VS Code setup preserves existing JSONC settings while adding missing recommendations", () => {
  mkdirSync(".vscode");
  const settings = '{\n  // My editor preferences\n  "editor.wordWrap": "off",\n}\n';
  writeFileSync(".vscode/settings.json", settings);
  ensureVscode();
  expect(readFileSync(".vscode/settings.json", "utf8")).toBe(settings);
  expect(readFileSync(".vscode/extensions.json", "utf8")).toContain(
    "VoidZero.vite-plus-extension-pack",
  );
  const extensions = '{"recommendations":["my.extension"]}';
  writeFileSync(".vscode/extensions.json", extensions);
  ensureVscode();
  expect(readFileSync(".vscode/extensions.json", "utf8")).toBe(extensions);
});
test("Bun wins over Node compatibility version", () => {
  expect(getRuntime({ bun: "1.3.0", node: "24.0.0" })).toBe("bun");
  expect(getRuntime({ node: "24.21.0" })).toBe("node");
  expect(getProjectTasks("bun").docs).toContain("bunx --bun");
  expect(getProjectTasks("node").sda).toBe("node --env-file-if-exists=.env --watch sda/main.ts");
});
test("flags preserve noninteractive selection and isolate docs-only", () => {
  expect(parseArguments([]).packages).toEqual([]);
  expect(parseArguments(["--sda-core", "--format", "--geo", "--format"]).packages).toEqual([
    "@nshiab/simple-data-analysis-core",
    "@nshiab/journalism-format",
    "@nshiab/journalism-geo",
  ]);
  expect(parseArguments(["--docs"]).docs).toBe(true);
  expect(parseArguments(["--sda", "--sda-core"]).packages).toHaveLength(2);
  expect(() => parseArguments(["--docs", "--sda"])).toThrow();
  expect(() => parseArguments(["--geo", "--docs"])).toThrow();
  expect(() => parseArguments(["--runtime", "bun"])).toThrow();
});
test("opening manifests is read-only and setup preserves scripts and versions", () => {
  const fresh = ProjectManifest.open();
  expect(existsSync("package.json")).toBe(false);
  fresh.updateTasks(getProjectTasks("node"));
  writeFileSync(
    "package.json",
    JSON.stringify({
      type: "module",
      scripts: { test: "custom-test", sda: "custom-run" },
      dependencies: { "@nshiab/journalism-format": "~1.1.0" },
    }),
  );
  const manifest = ProjectManifest.open();
  manifest.updateTasks(getProjectTasks("node"));
  const text = readFileSync("package.json", "utf8");
  expect(text).toContain("custom-test");
  expect(text).toContain("custom-run");
  expect(text).toContain("npm run test");
  expect(manifest.getInstalledPackageSpecifiers()["@nshiab/journalism-format"]).toBe("~1.1.0");
  manifest.reload();
  expect(manifest.getInstalledPackages()).toEqual(["@nshiab/journalism-format"]);
});
test("documentation versions come from installed packages, not requested ranges or stale locks", () => {
  mkdirSync("node_modules/@nshiab/journalism-format", { recursive: true });
  writeFileSync("node_modules/@nshiab/journalism-format/package.json", '{"version":"1.1.14"}');
  writeFileSync(
    "package-lock.json",
    '{"packages":{"node_modules/@nshiab/journalism-format":{"version":"1.1.1"}}}',
  );
  expect(
    getInstalledPackageVersions({
      "@nshiab/journalism-format": "^1.1.0",
      "@nshiab/journalism-ai": "3.0.6",
    }),
  ).toEqual({ "@nshiab/journalism-format": "1.1.14" });
});
test("reruns preserve source, .env and unmanaged documentation while updating managed commands", () => {
  createFolderStructure(["@nshiab/simple-data-analysis-core"]);
  expect(readFileSync("sda/main.ts", "utf8")).toContain("await sdb.close()");
  for (const path of ["sda/helpers", "sda/tests", "sda/data", "sda/output"])
    expect(existsSync(path)).toBe(true);
  writeFileSync("sda/main.ts", "// custom analysis");
  writeFileSync(".env", "SECRET=preserved");
  ensureEnvFile();
  createFolderStructure([]);
  ensureGitignore();
  ensureReadme("node", ["@nshiab/simple-data-analysis-core"]);
  ensureAgents({}, "node", ["@nshiab/simple-data-analysis-core"]);
  const readme = readFileSync("README.md", "utf8");
  const agents = readFileSync("AGENTS.md", "utf8");
  writeFileSync("README.md", `Custom intro\n${readme}\nCustom footer`);
  writeFileSync("AGENTS.md", `Custom policy\n${agents}`);
  ensureReadme("bun", ["@nshiab/simple-data-analysis-core"]);
  ensureAgents({}, "bun", ["@nshiab/simple-data-analysis-core"]);
  expect(readFileSync("README.md", "utf8")).toContain("Custom footer");
  expect(readFileSync("README.md", "utf8")).toContain("bun run docs");
  expect(readFileSync("README.md", "utf8")).not.toContain("npm run docs");
  expect(readFileSync("AGENTS.md", "utf8")).toContain("Custom policy");
  expect(readFileSync("AGENTS.md", "utf8")).toContain("docs/simple-data-analysis-core/llms.txt");
  expect(readFileSync(".gitignore", "utf8")).toContain("docs/");
  expect(readFileSync(".env", "utf8")).toBe("SECRET=preserved");
  expect(readFileSync("sda/main.ts", "utf8")).toBe("// custom analysis");
  writeFileSync("README.md", "Entirely custom README");
  ensureReadme("node");
  expect(readFileSync("README.md", "utf8")).toBe("Entirely custom README");
});

test("malformed manifests fail before writing", () => {
  writeFileSync("package.json", "{broken");
  expect(() => ProjectManifest.open()).toThrow();
  expect(readFileSync("package.json", "utf8")).toBe("{broken");
  writeFileSync("package.json", "[]");
  expect(() => ProjectManifest.open()).toThrow("JSON object");
});

test("initial npm manifests get an ESM default while explicit CommonJS is rejected without writes", () => {
  writeFileSync("package.json", '{"name":"analysis","private":true}');
  ProjectManifest.open().updateTasks(getProjectTasks("node"));
  expect(readFileSync("package.json", "utf8")).toContain('"type": "module"');
  writeFileSync("package.json", '{"type":"commonjs"}');
  expect(() => ProjectManifest.open().updateTasks(getProjectTasks("node"))).toThrow("ESM project");
  expect(readFileSync("package.json", "utf8")).toBe('{"type":"commonjs"}');
});
