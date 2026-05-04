import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { getRuntime } from "./getRuntime.ts";

export function updateProjectConfig(tasks: Record<string, string>) {
  const runtime = getRuntime();
  let configFile = "package.json";
  let key = "scripts";

  if (existsSync("deno.json")) {
    configFile = "deno.json";
    key = "tasks";
  } else if (!existsSync("package.json") && runtime === "deno") {
    configFile = "deno.json";
    key = "tasks";
    writeFileSync(configFile, JSON.stringify({ [key]: {} }, null, 2));
  } else if (!existsSync("package.json")) {
    return;
  }

  try {
    const content = readFileSync(configFile, "utf-8");
    const config = JSON.parse(content);
    config[key] = { ...config[key], ...tasks };
    writeFileSync(configFile, JSON.stringify(config, null, 2), "utf-8");
  } catch (_e) {
    // Silent fail if config is invalid
  }
}
