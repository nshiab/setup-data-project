import { getRuntime, type Runtime } from "./getRuntime.ts";
import metadata from "../../package.json" with { type: "json" };
export function getProjectTasks(runtime: Runtime = getRuntime()) {
  const vp = runtime === "bun" ? "bun run --bun vp" : "vp";
  return {
    sda:
      runtime === "bun"
        ? "bun --no-env-file scripts/sda.mjs sda/main.ts sda .env --ignore sda/output"
        : "node scripts/sda.mjs sda/main.ts sda .env --ignore sda/output",
    "all-tests": `${vp} check && ${vp} test --passWithNoTests`,
    clean: "rm -rf .sda-cache .journalism-cache .tmp",
    fix: `${vp} check --fix`,
    docs: `${runtime === "bun" ? "bunx --bun" : "npx"} @nshiab/setup-data-project@${metadata.version} --docs`,
  };
}
