import { randomUUID } from "node:crypto";
import {
  existsSync,
  readFileSync,
  readdirSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { isObject } from "./jsonObject.ts";

export const WATCH_REQUEST_POLL_MS = 100;
const resultName = "watch-result.json";
const requestName = /^request-[\da-f-]{36}$/;

export type WatchOutput = { stream: "stdout" | "stderr"; text: string };

export function createWatchRequests(directory: string) {
  let readers = new Set<string>();
  let readDeadline = 0;

  function pending(): string[] | null {
    const requests = readdirSync(directory).filter((name) => requestName.test(name));
    for (const name of requests) {
      if (!readers.has(name)) continue;
      if (performance.now() < readDeadline) return null;
      // A stopped requester must not hold up the watcher indefinitely.
      rmSync(join(directory, name), { force: true });
    }
    return requests.filter((name) => !readers.has(name));
  }

  function publish(requests: string[], code: number, output: WatchOutput[]) {
    const temporary = join(directory, "watch-result.tmp");
    writeFileSync(temporary, JSON.stringify({ requests, code, output }));
    renameSync(temporary, join(directory, resultName));
    readers = new Set(requests);
    readDeadline = performance.now() + 5000;
  }

  return { pending, publish };
}

export async function requestWatchRun(watcher: {
  directory: string;
  pid: number;
}): Promise<number> {
  const id = `request-${randomUUID()}`;
  const request = join(watcher.directory, id);
  const result = join(watcher.directory, resultName);
  const clean = () => rmSync(request, { force: true });
  writeFileSync(request, "", { flag: "wx" });
  process.once("exit", clean);
  console.log(`Requesting an analysis run from the SDA watcher (PID ${watcher.pid})...`);
  let lastRead: string | undefined;
  try {
    for (;;) {
      try {
        // The watcher replaces the whole result atomically. A completed result
        // is held for its waiting requesters before the next run can replace it.
        const info = statSync(result, { bigint: true, throwIfNoEntry: false });
        const version = info && `${info.ino}:${info.mtimeNs}`;
        if (version && version !== lastRead) {
          const value: unknown = JSON.parse(readFileSync(result, "utf8"));
          lastRead = version;
          if (isObject(value) && Array.isArray(value.requests) && value.requests.includes(id)) {
            if (
              typeof value.code !== "number" ||
              !Number.isInteger(value.code) ||
              !Array.isArray(value.output)
            ) {
              throw new Error("The SDA watcher returned an invalid result.");
            }
            for (const chunk of value.output as unknown[]) {
              if (
                !isObject(chunk) ||
                typeof chunk.text !== "string" ||
                (chunk.stream !== "stdout" && chunk.stream !== "stderr")
              ) {
                throw new Error("The SDA watcher returned invalid output.");
              }
              process[chunk.stream].write(chunk.text);
            }
            return value.code;
          }
        }
      } catch (error) {
        if (!(error instanceof Error && "code" in error && error.code === "ENOENT")) throw error;
      }
      if (!existsSync(request))
        throw new Error("The SDA watcher stopped or the run result expired. Try again.");
      try {
        process.kill(watcher.pid, 0);
      } catch (error) {
        if (!(error instanceof Error && "code" in error && error.code === "ESRCH")) throw error;
        throw new Error("The SDA watcher stopped before completing the requested run. Try again.");
      }
      await delay(WATCH_REQUEST_POLL_MS);
    }
  } finally {
    process.removeListener("exit", clean);
    clean();
  }
}
