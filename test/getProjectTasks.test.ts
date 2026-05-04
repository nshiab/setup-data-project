import { assertEquals } from "@std/assert";
import { getProjectTasks } from "../src/helpers/getProjectTasks.ts";

Deno.test("getProjectTasks - should return correct tasks for Deno", () => {
  const tasks = getProjectTasks();
  assertEquals(tasks.sda, "deno run -A --env --watch sda/main.ts");
});
