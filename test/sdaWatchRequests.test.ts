import { mkdirSync, readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { expect, test } from "vite-plus/test";
import { createWatchRequests, requestWatchRun } from "../src/helpers/sdaWatchRequests.ts";
import { temporaryProject } from "./helpers/utils.ts";

temporaryProject();

test("an unread request keeps its completed output when the watcher publishes a newer run", () => {
  const directory = resolve("watcher");
  const request = join(directory, `request-${process.pid}-10000000-0000-0000-0000-000000000000`);
  mkdirSync(request, { recursive: true });
  const watcher = createWatchRequests(directory);
  const pending = watcher.pending();
  expect(pending).toEqual([request]);

  watcher.start();
  watcher.record({ stream: "stdout", text: "requested analysis\n" });
  watcher.publish(pending, 7);
  expect(watcher.pending()).toEqual([]);

  watcher.start();
  watcher.record({ stream: "stderr", text: "new analysis\n" });
  watcher.publish([], 0);

  const latest = readFileSync(join(directory, "watch-result.jsonl"), "utf8");
  const original = readFileSync(join(request, "watch-result.jsonl"), "utf8");
  expect(latest).toBe('{"stream":"stderr","text":"new analysis\\n"}\n{"code":0}\n');
  expect(original).toBe('{"stream":"stdout","text":"requested analysis\\n"}\n{"code":7}\n');
  expect(readdirSync(directory).sort()).toEqual([
    `request-${process.pid}-10000000-0000-0000-0000-000000000000`,
    "watch-result.jsonl",
  ]);
});

test("a live PID without a watcher acknowledgement cannot block a requested run", async () => {
  const directory = resolve("stale-watcher");
  mkdirSync(directory);
  await expect(requestWatchRun({ directory, pid: process.pid })).rejects.toThrow(
    "The SDA watcher did not respond to the analysis request",
  );
  expect(readdirSync(directory)).toEqual([]);
}, 10000);
