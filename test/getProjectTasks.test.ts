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
    assertEquals(tasks.sda, "deno run -A --env --watch --check sda/main.ts");
    assertEquals(
      tasks["all-tests"],
      "deno fmt --check sda && deno lint && deno check sda/main.ts && deno test -A --permit-no-files",
    );
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
      "node --env-file-if-exists=.env --watch --experimental-strip-types sda/main.ts",
    );
    assertEquals(
      tasks["all-tests"],
      "node --env-file-if-exists=.env --experimental-strip-types --test",
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
    assertEquals(tasks["all-tests"], "bun test --pass-with-no-tests");
  } finally {
    getRuntimeStub.restore();
  }
});
