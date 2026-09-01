import { getRuntime } from "./getRuntime.ts";

export function getProjectTasks() {
  const runtime = getRuntime();

  return {
    sda: runtime === "deno"
      ? "deno run -A --env --watch --check sda/main.ts"
      : runtime === "bun"
      ? "bun run --watch sda/main.ts"
      : "node --env-file-if-exists=.env --watch --experimental-strip-types sda/main.ts",
    "all-tests": runtime === "deno"
      ? "deno fmt --check sda && deno lint && deno check sda/main.ts && deno test -A --permit-no-files"
      : runtime === "bun"
      ? "bun test --pass-with-no-tests"
      : "node --env-file-if-exists=.env --experimental-strip-types --test",
    clean: "rm -rf .sda-cache .journalism-cache .tmp",
  };
}
