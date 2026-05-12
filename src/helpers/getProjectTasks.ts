import { getRuntime } from "./getRuntime.ts";

export function getProjectTasks() {
  const runtime = getRuntime();

  return {
    sda: runtime === "deno"
      ? "deno run -A --env --watch sda/main.ts"
      : runtime === "bun"
      ? "bun run --watch sda/main.ts"
      : "node --env-file=.env --watch --experimental-strip-types sda/main.ts",
    clean: "rm -rf .sda-cache .journalism-cache .tmp",
  };
}
