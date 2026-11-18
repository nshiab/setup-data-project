import { randomUUID } from "node:crypto";
import { once } from "node:events";
import {
  appendFileSync,
  copyFileSync,
  createReadStream,
  existsSync,
  linkSync,
  mkdirSync,
  readdirSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";
import { createInterface } from "node:readline";
import { setTimeout as delay } from "node:timers/promises";
import { isObject } from "./jsonObject.ts";

export const WATCH_REQUEST_POLL_MS = 100;
const resultName = "watch-result.jsonl";
const requestName = /^request-(\d+)-[\da-f-]{36}$/;
const acknowledgeTimeout = 5000;
const heartbeatInterval = 1000;
const heartbeatTimeout = 10000;

export type WatchOutput = { stream: "stdout" | "stderr"; text: string };

function errorCode(error: unknown) {
  return error instanceof Error && "code" in error ? error.code : undefined;
}

function processIsGone(pid: number) {
  try {
    process.kill(pid, 0);
    return false;
  } catch (error) {
    if (errorCode(error) === "ESRCH") return true;
    if (errorCode(error) === "EPERM") return false;
    throw error;
  }
}

function linkResult(source: string, target: string) {
  try {
    linkSync(source, target);
  } catch (error) {
    if (errorCode(error) === "ENOENT") return; // The requester left.
    // Some filesystems do not support hard links. Keep the copy only until this requester reads it.
    const temporary = target + ".tmp";
    try {
      copyFileSync(source, temporary);
      renameSync(temporary, target);
    } catch (copyError) {
      if (errorCode(copyError) !== "ENOENT") throw copyError;
    }
  }
}

export function createWatchRequests(directory: string) {
  const temporary = join(directory, "watch-result.tmp");
  const latest = join(directory, resultName);

  function pending() {
    const requests: string[] = [];
    for (const name of readdirSync(directory)) {
      const match = requestName.exec(name);
      if (!match) continue;
      const pid = Number(match[1]);
      if (!Number.isInteger(pid) || pid <= 0 || pid > 2147483647) continue;
      const request = join(directory, name);
      if (processIsGone(pid)) {
        rmSync(request, { recursive: true, force: true });
        continue;
      }
      if (existsSync(join(request, resultName))) continue;
      const heartbeat = join(request, "heartbeat");
      const last = statSync(heartbeat, { throwIfNoEntry: false });
      if (!last || Date.now() - last.mtimeMs >= heartbeatInterval) {
        try {
          writeFileSync(heartbeat, "");
        } catch (error) {
          if (errorCode(error) === "ENOENT") continue;
          throw error;
        }
      }
      requests.push(request);
    }
    return requests;
  }

  const start = () => writeFileSync(temporary, "");
  const record = (chunk: WatchOutput) => appendFileSync(temporary, JSON.stringify(chunk) + "\n");

  function publish(requests: string[], code: number) {
    appendFileSync(temporary, JSON.stringify({ code }) + "\n");
    renameSync(temporary, latest);
    for (const request of requests) linkResult(latest, join(request, resultName));
  }

  return { pending, start, record, publish };
}

async function replay(result: string): Promise<number> {
  const input = createReadStream(result, { encoding: "utf8" });
  const lines = createInterface({ input, crlfDelay: Infinity });
  const closed = new Promise<void>((resolve) => input.once("close", resolve));
  let readError: Error | undefined;
  input.on("error", (error) => {
    readError = error;
    lines.close();
  });
  try {
    for await (const line of lines) {
      const value: unknown = JSON.parse(line);
      if (isObject(value)) {
        if (typeof value.code === "number" && Number.isInteger(value.code)) return value.code;
        if (
          typeof value.text === "string" &&
          (value.stream === "stdout" || value.stream === "stderr")
        ) {
          const output = process[value.stream];
          if (!output.write(value.text)) await once(output, "drain");
          continue;
        }
      }
      throw new Error("The SDA watcher returned invalid output.");
    }
    if (readError) throw readError;
    throw new Error("The SDA watcher result is missing its exit code.");
  } finally {
    lines.close();
    input.destroy();
    await closed;
  }
}

export async function requestWatchRun(watcher: {
  directory: string;
  pid: number;
}): Promise<number> {
  const request = join(watcher.directory, `request-${process.pid}-${randomUUID()}`);
  const result = join(request, resultName);
  const heartbeat = join(request, "heartbeat");
  const clean = () => rmSync(request, { recursive: true, force: true });
  mkdirSync(request);
  process.once("exit", clean);
  console.log(`Requesting an analysis run from the SDA watcher (PID ${watcher.pid})...`);
  let lastHeartbeat: number | undefined;
  let deadline = performance.now() + acknowledgeTimeout;
  try {
    for (;;) {
      if (existsSync(result)) return await replay(result);
      if (!existsSync(request) || processIsGone(watcher.pid))
        throw new Error("The SDA watcher stopped before completing the requested run. Try again.");

      const modified = statSync(heartbeat, { throwIfNoEntry: false })?.mtimeMs;
      if (modified !== undefined && modified !== lastHeartbeat) {
        lastHeartbeat = modified;
        deadline = performance.now() + heartbeatTimeout;
      }
      if (performance.now() >= deadline)
        throw new Error(
          "The SDA watcher did not respond to the analysis request. Try again after checking the watcher.",
        );
      await delay(WATCH_REQUEST_POLL_MS);
    }
  } finally {
    process.removeListener("exit", clean);
    clean();
  }
}
