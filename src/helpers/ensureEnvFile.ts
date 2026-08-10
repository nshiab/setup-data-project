import { lstatSync, writeFileSync } from "node:fs";
import { log } from "@clack/prompts";

export function ensureEnvFile() {
  if (lstatSync(".env", { throwIfNoEntry: false }) === undefined) {
    writeFileSync(".env", "");
    log.info("Created .env");
  }
}
