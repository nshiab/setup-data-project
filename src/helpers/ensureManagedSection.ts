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
  const startMarker = `<!-- setup-data-project:${options.name}:start / Safe to remove if you don't want this generated section. -->`;
  const endMarker = `<!-- setup-data-project:${options.name}:end / End of generated section. -->`;
  const trimmedContent = options.content.trim();
  const section =
    trimmedContent === ""
      ? `${startMarker}\n${endMarker}`
      : `${startMarker}\n\n${trimmedContent}\n\n${endMarker}`;

  if (!existsSync(options.path)) {
    writeFileSync(options.path, ensureFinalNewline(options.createContent(section)));
    return "created";
  }

  const currentContent = readFileSync(options.path, "utf-8");
  const start = currentContent.indexOf(startMarker);
  const end = currentContent.indexOf(endMarker);

  if (start === -1 || end === -1 || end < start) {
    return "missing-markers";
  }

  const nextContent =
    currentContent.slice(0, start) + section + currentContent.slice(end + endMarker.length);

  if (nextContent === currentContent) {
    return "unchanged";
  }

  writeFileSync(options.path, ensureFinalNewline(nextContent));
  return "updated";
}

function ensureFinalNewline(content: string): string {
  return content.endsWith("\n") ? content : content + "\n";
}
