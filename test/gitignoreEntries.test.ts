import { assert } from "@std/assert";
import { GITIGNORE_ENTRIES } from "../src/helpers/gitignoreEntries.ts";

Deno.test("gitignoreEntries - should contain mandatory entries", () => {
  assert(GITIGNORE_ENTRIES.includes("node_modules"));
  assert(GITIGNORE_ENTRIES.includes(".env"));
  assert(GITIGNORE_ENTRIES.includes("sda/data"));
});
