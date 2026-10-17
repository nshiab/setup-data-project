import { lstatSync, readFileSync, writeFileSync } from "node:fs";
import { log } from "@clack/prompts";
import { GITIGNORE_ENTRIES } from "./gitignoreEntries.ts";

export const GITIGNORE_SENTINEL = "# Added by setup-data-project. Do not remove this line.";

export function ensureGitignore() {
  const path = ".gitignore";
  const stats = lstatSync(path, { throwIfNoEntry: false });

  if (stats?.isSymbolicLink()) {
    return;
  }

  const content = stats === undefined ? "" : readFileSync(path, "utf-8");
  const hasSentinel = content.split("\n").some((line) => line.trim() === GITIGNORE_SENTINEL);

  if (hasSentinel) {
    const entries = new Set(content.split("\n").map((line) => line.trim()));
    const missing = GITIGNORE_ENTRIES.filter((entry) => !entries.has(entry));
    if (missing.length)
      writeFileSync(
        path,
        content + (content.endsWith("\n") ? "" : "\n") + missing.join("\n") + "\n",
      );
    return;
  }

  const separator = content === "" ? "" : content.endsWith("\n") ? "\n" : "\n\n";
  const block = `${GITIGNORE_SENTINEL}\n${GITIGNORE_ENTRIES.join("\n")}\n`;
  writeFileSync(path, content + separator + block);

  log.info(`${stats === undefined ? "Created" : "Updated"} ${path}`);
}
