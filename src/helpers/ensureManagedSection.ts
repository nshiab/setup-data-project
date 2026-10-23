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
  const start = new RegExp(
    `<!-- setup-data-project:${options.name}:start(?: / [^\\r\\n]*?)? -->`,
  ).exec(currentContent);
  const end = new RegExp(`<!-- setup-data-project:${options.name}:end(?: / [^\\r\\n]*?)? -->`).exec(
    currentContent,
  );

  if (!start || !end || end.index < start.index + start[0].length) {
    return "missing-markers";
  }

  const nextContent =
    currentContent.slice(0, start.index) +
    section +
    currentContent.slice(end.index + end[0].length);

  if (nextContent === currentContent) {
    return "unchanged";
  }

  writeFileSync(options.path, ensureFinalNewline(nextContent));
  return "updated";
}

function ensureFinalNewline(content: string): string {
  return content.endsWith("\n") ? content : content + "\n";
}
