import { existsSync, writeFileSync } from "node:fs";
import { ProjectManifest } from "./projectManifest.ts";
import { getRuntime } from "./getRuntime.ts";
import { installPackages } from "./installPackages.ts";
import metadata from "../../package.json" with { type: "json" };
const tools = ["vite-plus", "@types/node"];
export async function ensureTooling(manifest: ProjectManifest): Promise<void> {
  const runtime = getRuntime();
  const runtimeTools = runtime === "bun" ? [...tools, "@types/bun"] : tools;
  const installed = manifest.getInstalledPackages();
  await installPackages(
    [
      ...runtimeTools.filter((pkg) => !installed.includes(pkg)).map((pkg) => `${pkg}@latest`),
      ...(installed.includes(metadata.name) ? [] : [`${metadata.name}@${metadata.version}`]),
    ],
    { development: true },
  );
  if (
    ![
      "vite.config.ts",
      "vite.config.js",
      "vite.config.mts",
      "vite.config.mjs",
      "vite.config.cts",
      "vite.config.cjs",
    ].some((file) => existsSync(file))
  ) {
    writeFileSync(
      "vite.config.ts",
      `import { defineConfig, loadEnv } from "vite-plus";

export default defineConfig({
  test: { env: loadEnv("test", process.cwd(), "") },
  lint: { options: { typeAware: true, typeCheck: true } },
  fmt: { ignorePatterns: ["docs/**", "sda/data/**", "sda/output/**"] },
});
`,
    );
  }
  if (!existsSync("tsconfig.json"))
    writeFileSync(
      "tsconfig.json",
      `{
  "compilerOptions": {
    "target": "ES2023",
    "module": "NodeNext",
    "strict": true,
    "noEmit": true,
    "allowImportingTsExtensions": true,
    "erasableSyntaxOnly": ${runtime === "node"},
    "types": ${runtime === "bun" ? '["node", "bun"]' : '["node"]'},
    "skipLibCheck": true
  },
  "include": ["sda/**/*.ts", "vite.config.*"]
}
`,
    );
}
