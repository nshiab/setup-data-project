import { log } from "@clack/prompts";
import { handleFileConflict } from "./handleFileConflict.ts";

export async function ensureEnvFile() {
  const status = await handleFileConflict(".env", "");
  if (status === "updated") {
    log.info("Updated .env");
  }
}
