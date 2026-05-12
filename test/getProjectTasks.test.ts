import { assertEquals } from "@std/assert";
import { stub } from "@std/testing/mock";
import { getProjectTasks } from "../src/helpers/getProjectTasks.ts";
import { runtimeConfig } from "../src/helpers/getRuntime.ts";

Deno.test("getProjectTasks - should return correct tasks for Deno", () => {
  const getRuntimeStub = stub(
    runtimeConfig,
    "getRuntime",
    () => "deno" as const,
  );
  try {
    const tasks = getProjectTasks();
    assertEquals(tasks.sda, "deno run -A --env --watch sda/main.ts");
  } finally {
    getRuntimeStub.restore();
  }
});

Deno.test("getProjectTasks - should return correct tasks for Node", () => {
  const getRuntimeStub = stub(
    runtimeConfig,
    "getRuntime",
    () => "node" as const,
  );
  try {
    const tasks = getProjectTasks();
    assertEquals(
      tasks.sda,
      "node --env-file=.env --watch --experimental-strip-types sda/main.ts",
    );
  } finally {
    getRuntimeStub.restore();
  }
});

Deno.test("getProjectTasks - should return correct tasks for Bun", () => {
  const getRuntimeStub = stub(
    runtimeConfig,
    "getRuntime",
    () => "bun" as const,
  );
  try {
    const tasks = getProjectTasks();
    assertEquals(tasks.sda, "bun run --watch sda/main.ts");
  } finally {
    getRuntimeStub.restore();
  }
});
