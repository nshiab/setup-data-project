import { getRuntime, type Runtime } from "./getRuntime.ts";
import metadata from "../../package.json" with { type: "json" };
export function getProjectTasks(runtime: Runtime = getRuntime()) {
  const vp = runtime === "bun" ? "bun run --bun vp" : "vp";
  const runner = runtime === "bun" ? "bun run --bun --no-env-file sda-run" : "sda-run";
  return {
    sda: `${runner} sda/main.ts`,
    "sda:watch": `${runner} --watch sda/main.ts sda .env --ignore sda/output`,
    "sda:status": `${runner} --status`,
    "all-tests": `${vp} check && ${vp} test --passWithNoTests`,
    clean: `${runtime} -e "const fs = require('node:fs'); for (const path of ['.sda-cache', '.journalism-cache', '.tmp']) fs.rmSync(path, { recursive: true, force: true });"`,
    fix: `${vp} check --fix`,
    docs: `${runtime === "bun" ? "bunx --bun" : "npx"} @nshiab/setup-data-project@${metadata.version} --docs`,
  };
}
