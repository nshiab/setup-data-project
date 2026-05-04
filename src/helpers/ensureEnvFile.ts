import { log } from "@clack/prompts";
import { handleFileConflict } from "./handleFileConflict.ts";

export async function ensureEnvFile() {
  const status = await handleFileConflict(".env", "");
  if (status === "created") {
    log.info("Created .env");
  } else if (status === "updated") {
    log.info("Updated .env");
  } else {
    log.warn(".env skipping creation.");
  }
}
