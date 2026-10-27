import { expect, test, vi } from "vite-plus/test";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { ensureTooling } from "../src/helpers/ensureTooling.ts";
import { getRuntime } from "../src/helpers/getRuntime.ts";
import { installPackages } from "../src/helpers/installPackages.ts";
import { ProjectManifest } from "../src/helpers/projectManifest.ts";
import metadata from "../package.json" with { type: "json" };
import { temporaryProject } from "./helpers/utils.ts";

vi.mock("../src/helpers/getRuntime.ts", () => ({ getRuntime: vi.fn(() => "node") }));
vi.mock("../src/helpers/installPackages.ts", () => ({ installPackages: vi.fn() }));
temporaryProject();

test.each(["node", "bun"] as const)(
  "%s tooling enables static checks without a test runner",
  async (runtime) => {
    vi.mocked(getRuntime).mockReturnValue(runtime);
    await ensureTooling(ProjectManifest.open());
    expect(installPackages).toHaveBeenCalledWith(
      [
        "oxfmt@latest",
        "oxlint@latest",
        "oxlint-tsgolint@latest",
        "@types/node@latest",
        ...(runtime === "bun" ? ["@types/bun@latest"] : []),
        `${metadata.name}@${metadata.version}`,
      ],
      { development: true },
    );
    expect(JSON.parse(readFileSync(".oxlintrc.json", "utf8"))).toEqual({
      options: { typeAware: true, typeCheck: true },
    });
    expect(JSON.parse(readFileSync(".oxfmtrc.json", "utf8"))).toEqual({
      ignorePatterns: ["docs/**", "sda/data/**", "sda/output/**"],
    });
    expect(JSON.parse(readFileSync("tsconfig.json", "utf8"))).toMatchObject({
      compilerOptions: {
        noEmit: true,
        erasableSyntaxOnly: runtime === "node",
        types: runtime === "bun" ? ["node", "bun"] : ["node"],
      },
      include: ["sda/**/*.ts"],
    });
    expect(existsSync("vite.config.ts")).toBe(false);
    expect(existsSync("vitest.config.ts")).toBe(false);
  },
);

test.each(["json", "jsonc", "ts", "mts"])(
  "existing %s tooling configs and dependency versions are preserved",
  async (extension) => {
    vi.mocked(getRuntime).mockReturnValue("node");
    const dependencies = {
      oxfmt: "0.73.0",
      oxlint: "1.88.0",
      "oxlint-tsgolint": "7.0.2004",
      "@types/node": "24.19.2",
      [metadata.name]: "4.0.2",
    };
    const manifest = JSON.stringify({ devDependencies: dependencies });
    writeFileSync("package.json", manifest);
    const json = extension === "json" || extension === "jsonc";
    const lint = json ? `.oxlintrc.${extension}` : `oxlint.config.${extension}`;
    const fmt = json ? `.oxfmtrc.${extension}` : `oxfmt.config.${extension}`;
    const custom = json ? '{"custom":true}\n' : "export default {};\n";
    for (const file of [lint, fmt, "tsconfig.json", "vite.config.ts"]) writeFileSync(file, custom);
    await ensureTooling(ProjectManifest.open());
    expect(installPackages).toHaveBeenLastCalledWith([], { development: true });
    expect(readFileSync("package.json", "utf8")).toBe(manifest);
    for (const file of [lint, fmt, "tsconfig.json", "vite.config.ts"])
      expect(readFileSync(file, "utf8")).toBe(custom);
    if (extension !== "json") {
      expect(existsSync(".oxlintrc.json")).toBe(false);
      expect(existsSync(".oxfmtrc.json")).toBe(false);
    }
  },
);
