import { getRuntime, type Runtime } from "./getRuntime.ts";
import metadata from "../../package.json" with { type: "json" };
export function getProjectTasks(runtime: Runtime = getRuntime()) {
  const fmt = runtime === "bun" ? "bun run --bun oxfmt" : "oxfmt";
  const lint = `${runtime === "bun" ? "bun run --bun oxlint" : "oxlint"} --type-aware --type-check`;
  const runner = runtime === "bun" ? "bun run --bun --no-env-file sda-run" : "sda-run";
  return {
    sda: `${runner} sda/main.ts`,
    "sda:watch": `${runner} --watch sda/main.ts sda .env --ignore sda/output`,
    "sda:status": `${runner} --status`,
    "all-tests": `${fmt} --check && ${lint}`,
    clean: `${runtime} -e "const fs = require('node:fs'); for (const path of ['.sda-cache', '.journalism-cache', '.tmp']) fs.rmSync(path, { recursive: true, force: true });"`,
    fix: `${fmt} --write && ${lint} --fix --format default`,
    docs: `${runtime === "bun" ? "bunx --bun" : "npx"} @nshiab/setup-data-project@${metadata.version} --docs`,
  };
}
