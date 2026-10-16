import { getRuntime, type Runtime } from "./getRuntime.ts";
import metadata from "../../package.json" with { type: "json" };
export function getProjectTasks(runtime: Runtime = getRuntime()) {
  return {
    sda:
      runtime === "bun"
        ? "bun run --watch sda/main.ts"
        : "node --env-file-if-exists=.env --watch sda/main.ts",
    test: "vp test --passWithNoTests",
    "all-tests": `vp check && ${runtime === "bun" ? "bun" : "npm"} run test`,
    clean: "rm -rf .sda-cache .journalism-cache .tmp",
    fix: "vp check --fix",
    docs: `${runtime === "bun" ? "bunx --bun" : "npx"} @nshiab/setup-data-project@${metadata.version} --docs`,
  };
}
