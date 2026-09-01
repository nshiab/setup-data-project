import { log } from "@clack/prompts";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

interface ManagedSectionOptions {
  path: string;
  name: string;
  content: string;
  createContent: (section: string) => string;
}

export function ensureManagedSection(
  options: ManagedSectionOptions,
): "created" | "updated" | "unchanged" | "missing-markers" {
  const startMarker =
    `<!-- Do not remove / setup-data-project:${options.name}:start -->`;
  const endMarker =
    `<!-- Do not remove / setup-data-project:${options.name}:end -->`;
  const trimmedContent = options.content.trim();
  const section = trimmedContent === ""
    ? `${startMarker}\n${endMarker}`
    : `${startMarker}\n${trimmedContent}\n${endMarker}`;

  if (!existsSync(options.path)) {
    writeFileSync(
      options.path,
      ensureFinalNewline(options.createContent(section)),
    );
    return "created";
  }

  const currentContent = readFileSync(options.path, "utf-8");
  const start = currentContent.indexOf(startMarker);
  const end = currentContent.indexOf(endMarker);

  if (start === -1 || end === -1 || end < start) {
    log.warn(
      `${options.path} was not updated because its setup-data-project markers ` +
        `were not found. Add ${startMarker} and ${endMarker}, then rerun the ` +
        "script.",
    );
    return "missing-markers";
  }

  const nextContent = currentContent.slice(0, start) + section +
    currentContent.slice(end + endMarker.length);

  if (nextContent === currentContent) {
    return "unchanged";
  }

  writeFileSync(options.path, ensureFinalNewline(nextContent));
  return "updated";
}

function ensureFinalNewline(content: string): string {
  return content.endsWith("\n") ? content : content + "\n";
}
