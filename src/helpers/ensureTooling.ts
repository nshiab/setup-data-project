import { existsSync, writeFileSync } from "node:fs";
import { ProjectManifest } from "./projectManifest.ts";
import { getRuntime } from "./getRuntime.ts";
import { installPackages } from "./installPackages.ts";
import metadata from "../../package.json" with { type: "json" };
const tools = ["oxfmt", "oxlint", "oxlint-tsgolint", "@types/node"];
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
    ![".oxlintrc.json", ".oxlintrc.jsonc", "oxlint.config.ts", "oxlint.config.mts"].some((file) =>
      existsSync(file),
    )
  ) {
    writeFileSync(
      ".oxlintrc.json",
      `{
  "options": { "typeAware": true, "typeCheck": true }
}
`,
    );
  }
  if (
    [".oxfmtrc.json", ".oxfmtrc.jsonc", "oxfmt.config.ts", "oxfmt.config.mts"].every(
      (file) => !existsSync(file),
    )
  )
    writeFileSync(
      ".oxfmtrc.json",
      `{
  "ignorePatterns": ["docs/**", "sda/data/**", "sda/output/**"]
}
`,
    );
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
  "include": ["sda/**/*.ts"]
}
`,
    );
}
