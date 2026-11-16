import { getRuntime, type Runtime } from "./getRuntime.ts";
export function getProjectTasks(runtime: Runtime = getRuntime()) {
  const fmt = runtime === "bun" ? "bun run --bun oxfmt" : "oxfmt";
  const lint = `${runtime === "bun" ? "bun run --bun oxlint" : "oxlint"} --type-aware --type-check`;
  const runner = runtime === "bun" ? "bun run --bun --no-env-file sda-run" : "sda-run";
  const tests =
    runtime === "bun"
      ? "bun test --pass-with-no-tests ./sda/test/"
      : 'node --env-file-if-exists=.env --test "sda/test/**/*.test.ts"';
  return {
    sda: `${runner} sda/main.ts`,
    "sda:watch": `${runner} --watch sda/main.ts sda .env --ignore sda/output`,
    "sda:status": `${runner} --status`,
    "sda:tests": `${fmt} --check && ${lint} && ${tests}`,
    "sda:tests:watch": `${runner} --watch-tests sda .env tsconfig.json --ignore sda/output`,
    clean: `${runner} --clean`,
    fix: `${fmt} --write && ${lint} --fix --format default`,
    docs: `${runtime === "bun" ? "bun run --bun --no-env-file " : ""}setup-data-project --docs`,
  };
}
