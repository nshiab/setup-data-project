import { existsSync, writeFileSync } from "node:fs";

export function ensureEnvFile() {
  if (!existsSync(".env")) {
    writeFileSync(".env", "");
  }
}
