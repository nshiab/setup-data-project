import { getRuntime, type Runtime } from "./getRuntime.ts";
export function getProjectTasks(runtime: Runtime = getRuntime()) {
  const fmt = runtime === "bun" ? "bun run --bun oxfmt" : "oxfmt";
  const lint = `${runtime === "bun" ? "bun run --bun oxlint" : "oxlint"} --type-aware --type-check`;
  const runner = runtime === "bun" ? "bun run --bun --no-env-file sda-run" : "sda-run";
  const tests =
    runtime === "bun"
      ? "bun test --pass-with-no-tests ./sda/"
      : 'node --env-file-if-exists=.env --test "sda/**/*.test.ts"';
  return {
    sda: `${runner} sda/main.ts`,
    "sda:watch": `${runner} --watch sda/main.ts sda .env --ignore sda/output`,
    "sda:status": `${runner} --status`,
    "sda:test": `${fmt} --check sda && ${lint} sda && ${tests}`,
    "sda:test:watch": `${runner} --watch-test sda .env tsconfig.json --ignore sda/output`,
    "sda:clean": `${runner} --clean`,
    "sda:fix": `${fmt} --write sda && ${lint} --fix --format default sda`,
    "sda:docs": `${runtime === "bun" ? "bun run --bun --no-env-file " : ""}setup-data-project --docs`,
  };
}
