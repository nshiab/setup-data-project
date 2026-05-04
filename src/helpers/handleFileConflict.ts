import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { isCancel, select } from "@clack/prompts";
import process from "node:process";

export const PROMPT_OVERRIDE: {
  select: (config: unknown) => Promise<string | symbol>;
} = {
  select: select as unknown as (config: unknown) => Promise<string | symbol>,
};

export async function handleFileConflict(
  path: string,
  newContent: string,
): Promise<"created" | "updated" | "skipped"> {
  if (!existsSync(path)) {
    writeFileSync(path, newContent);
    return "created";
  }

  // Skip prompt in Deno tests if no override
  // @ts-ignore: Deno is not defined in type but present in runtime
  if (
    globalThis.Deno?.args.includes("--internal-test-mode") &&
    PROMPT_OVERRIDE.select === select
  ) {
    return "skipped";
  }

  const action = (await PROMPT_OVERRIDE.select({
    message: `${path} already exists. What would you like to do?`,
    options: [
      { value: "skip", label: "Skip", hint: "Keep existing file" },
      {
        value: "overwrite",
        label: "Overwrite",
        hint: "Replace with new content",
      },
      { value: "append", label: "Append", hint: "Add to the end of the file" },
    ],
  })) as "skip" | "overwrite" | "append";

  if (isCancel(action)) {
    console.log("Operation cancelled.");
    process.exit(0);
  }

  if (action === "skip") {
    return "skipped";
  }

  if (action === "overwrite") {
    writeFileSync(path, newContent);
    return "updated";
  }

  if (action === "append") {
    const existingContent = readFileSync(path, "utf-8");
    const prefix = existingContent.endsWith("\n") || existingContent === ""
      ? ""
      : "\n";
    writeFileSync(path, existingContent + prefix + newContent);
    return "updated";
  }

  return "skipped";
}
