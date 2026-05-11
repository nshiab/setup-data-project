import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { getRuntime } from "./getRuntime.ts";

export function updateProjectConfig(tasks: Record<string, string>) {
  const runtime = getRuntime();
  let configFile = "package.json";
  let key = "scripts";

  if (existsSync("deno.json")) {
    configFile = "deno.json";
    key = "tasks";
  } else if (existsSync("package.json")) {
    configFile = "package.json";
    key = "scripts";
  } else if (runtime === "deno") {
    configFile = "deno.json";
    key = "tasks";
    writeFileSync(configFile, JSON.stringify({ [key]: {} }, null, 2));
  } else {
    configFile = "package.json";
    key = "scripts";
    writeFileSync(
      configFile,
      JSON.stringify(
        { name: "data-project", type: "module", [key]: {} },
        null,
        2,
      ),
    );
  }

  try {
    const content = readFileSync(configFile, "utf-8");
    const config = JSON.parse(content);
    config[key] = { ...(config[key] || {}), ...tasks };
    writeFileSync(configFile, JSON.stringify(config, null, 2), "utf-8");
  } catch (e) {
    if (e instanceof SyntaxError) {
      console.error(
        `❌ Error: Failed to parse ${configFile} as JSON. Please check its validity.`,
      );
    } else if (e instanceof Error) {
      console.error(`❌ Error: Could not update ${configFile}: ${e.message}`);
    } else {
      console.error(
        `❌ Error: An unexpected error occurred while updating ${configFile}.`,
      );
    }
  }
}
