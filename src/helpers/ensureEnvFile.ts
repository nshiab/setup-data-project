import { lstatSync, writeFileSync } from "node:fs";

export function ensureEnvFile() {
  if (lstatSync(".env", { throwIfNoEntry: false }) === undefined) {
    writeFileSync(".env", "");
  }
}
