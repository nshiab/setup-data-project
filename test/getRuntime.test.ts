import { assertEquals } from "@std/assert";
import { getRuntime } from "../src/helpers/getRuntime.ts";

Deno.test("getRuntime - should return 'deno' in Deno environment", () => {
  // Since we are running in Deno for tests, it should return 'deno'
  assertEquals(getRuntime(), "deno");
});
