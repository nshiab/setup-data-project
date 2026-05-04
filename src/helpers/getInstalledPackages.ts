import { existsSync, readFileSync } from "node:fs";

export function getInstalledPackages(): string[] {
  let configFile = "";
  let depKeys: string[] = [];

  if (existsSync("deno.json")) {
    configFile = "deno.json";
    depKeys = ["imports"];
  } else if (existsSync("package.json")) {
    configFile = "package.json";
    depKeys = ["dependencies", "devDependencies"];
  }

  if (configFile === "") return [];

  try {
    const content = readFileSync(configFile, "utf-8");
    const config = JSON.parse(content);
    const installed: string[] = [];

    for (const key of depKeys) {
      if (config[key]) {
        installed.push(...Object.keys(config[key]));
      }
    }
    return installed;
  } catch (_e) {
    return [];
  }
}
