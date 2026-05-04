import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { GITIGNORE_ENTRIES } from "./gitignoreEntries.ts";

export function ensureGitignore() {
  const path = ".gitignore";
  let content = "";
  if (existsSync(path)) {
    content = readFileSync(path, "utf-8");
  }

  const lines = content.split("\n").map((l) => l.trim());
  const toAdd = GITIGNORE_ENTRIES.filter((e) => !lines.includes(e));

  if (toAdd.length > 0) {
    const prefix = content.endsWith("\n") || content === "" ? "" : "\n";
    const header = "\n# Added by setup-data-project\n";
    const newContent = prefix + header + toAdd.join("\n") + "\n";
    writeFileSync(path, content + newContent);
  }
}
