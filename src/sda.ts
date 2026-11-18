#!/usr/bin/env node
import { existsSync, lstatSync, type FSWatcher, readdirSync, rmSync, watch } from "node:fs";
import { spawn, spawnSync, type ChildProcess } from "node:child_process";
import { dirname, join, resolve, sep } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { parseArgs } from "node:util";
import { acquireSdaLock, SdaLockBusyError, SDA_LOCK_DIRECTORY } from "./helpers/sdaLock.ts";
import { printSdaStatus } from "./helpers/sdaStatus.ts";
import { pipeFixOutput } from "./helpers/pipeFixOutput.ts";
import { createFileChanges } from "./helpers/fileChanges.ts";
import {
  createWatchRequests,
  requestWatchRun,
  WATCH_REQUEST_POLL_MS,
  type WatchOutput,
} from "./helpers/sdaWatchRequests.ts";

const {
  positionals: [entry, ...paths],
  values,
} = parseArgs({
  allowPositionals: true,
  options: {
    clean: { type: "boolean", default: false },
    status: { type: "boolean", default: false },
    watch: { type: "boolean", default: false },
    "watch-test": { type: "boolean", default: false },
    ignore: { type: "string", multiple: true, default: [] },
  },
});
if (values.clean) {
  if (entry || values.status || values.watch || values["watch-test"] || values.ignore.length) {
    console.error("Usage: sda-run --clean (without other options or paths)");
    process.exit(1);
  }
  try {
    for (const path of [".sda-cache", ".journalism-cache", ".tmp"]) {
      if (path === ".sda-cache") {
        const stat = lstatSync(path, { throwIfNoEntry: false });
        if (!stat) continue;
        if (!stat.isDirectory()) {
          rmSync(path, { force: true });
          continue;
        }
        // Keep the lock and its parent stable, including during concurrent starts.
        for (const name of readdirSync(path)) {
          const child = join(path, name);
          if (resolve(child) !== resolve(SDA_LOCK_DIRECTORY))
            rmSync(child, { recursive: true, force: true });
        }
        continue;
      }
      rmSync(path, { recursive: true, force: true });
    }
  } catch (error) {
    console.error("Could not clean caches: " + errorMessage(error));
    process.exit(1);
  }
  process.exit(0);
}
if (values.status) process.exit(printSdaStatus());
if (!entry) {
  console.error(
    "Usage: sda-run --clean | --status | [--watch] <entry-file> [watch-paths...] [--ignore path] | --watch-test <watch-paths...> [--ignore path]",
  );
  process.exit(1);
}
const watchingTests = values["watch-test"];
const watching = values.watch || watchingTests;
const selected = [entry, ...paths].map((path) => resolve(path));
const ignored = [SDA_LOCK_DIRECTORY, ...values.ignore].map((path) => resolve(path));
const within = (path: string, root: string) => path === root || path.startsWith(root + sep);
const excluded = (path: string) => ignored.some((root) => within(path, root));
const bun = Boolean(process.versions.bun);
const runCommand =
  (bun ? "bun run " : "npm run ") +
  (watchingTests ? "sda:test:watch" : watching ? "sda:watch" : "sda");
const windows = process.platform === "win32";
type Job = { child: ChildProcess; done: Promise<number | null> };
type Report = (stream: WatchOutput["stream"], text: string) => void;
let releaseLock: (() => void) | undefined;
let watchRequests: ReturnType<typeof createWatchRequests> | undefined;
let requestTimer: ReturnType<typeof setInterval> | undefined;
let fixer: Job | undefined;
let running: Job | undefined;
let runInProgress = false;
let timer: ReturnType<typeof setTimeout> | undefined;
let checking = false;
let closing = false;
let needsCheck = true;
const changes = createFileChanges(selected, excluded);
const watchers = new Map<string, { watcher: FSWatcher; recursive: boolean }>();

function launch(args: string[], command = process.execPath, summarize = false, report?: Report) {
  const child = spawn(command, args, {
    // Bun's Windows --bun shim is named node.exe; keep Bun CLI argument parsing.
    argv0: windows && bun && command === process.execPath ? "bun" : undefined,
    stdio: ["inherit", summarize || report ? "pipe" : "inherit", report ? "pipe" : "inherit"],
    detached: !windows,
    shell: windows && command === "npm.cmd",
  });
  if (summarize && child.stdout) {
    pipeFixOutput(child.stdout, report && ((line) => report("stdout", line + "\n")));
  } else if (report) {
    child.stdout?.setEncoding("utf8").on("data", (text: string) => report("stdout", text));
  }
  if (report)
    child.stderr?.setEncoding("utf8").on("data", (text: string) => report("stderr", text));
  if (child.stdout || child.stderr) {
    child.once("exit", () => {
      // Background descendants can inherit the pipes; don't wait forever for them to close.
      const timeout = setTimeout(() => {
        child.stdout?.destroy();
        child.stderr?.destroy();
      }, 1000);
      child.once("close", () => clearTimeout(timeout));
    });
  }
  const done = new Promise<number | null>((resolve) => {
    child.once("error", (error) => {
      if (report) report("stderr", errorMessage(error) + "\n");
      else console.error(errorMessage(error));
      resolve(1);
    });
    child.once("close", resolve);
  });
  return { child, done };
}

function launchScript(script: string, summarize = false, report?: Report) {
  return launch(
    ["run", "--silent", script],
    bun ? process.execPath : windows ? "npm.cmd" : "npm",
    summarize,
    report,
  );
}

function announceWatchRun(message: string) {
  if (process.stdout.isTTY) {
    const clearScrollback = watchingTests ? "" : "\u001b[3J";
    process.stdout.write(`\u001b[2J${clearScrollback}\u001b[H`);
  }
  console.log(`Watching SDA for changes...\n\n${message}`);
}

function watchJob(job: Job, label: string, success: string, complete?: (code: number) => void) {
  running = job;
  runInProgress = true;
  void job.done
    .then((result) => {
      if (closing || checking || running !== job) return;
      runInProgress = false;
      complete?.(result ?? 1);
      const outcome =
        result === 0 ? success : result === null ? "stopped" : `failed (exit code ${result})`;
      console.log(`\n${label} ${outcome}. Waiting for changes...`);
    })
    .catch(fail);
}

function refreshWatchers() {
  const directories = new Map<string, boolean>();
  const add = (directory: string, recursive: boolean) => {
    directories.set(directory, recursive || directories.get(directory) || false);
  };
  for (const path of selected) {
    if (excluded(path)) continue;
    if (lstatSync(path, { throwIfNoEntry: false })?.isDirectory()) add(path, true);
    // Watch the parent too, so deleted files and folders can be restored.
    let parent = dirname(path);
    while (!existsSync(parent)) parent = dirname(parent);
    add(parent, parent !== dirname(path));
  }
  for (const [directory, state] of watchers) {
    if (directories.get(directory) !== state.recursive) {
      state.watcher.close();
      watchers.delete(directory);
    }
  }
  for (const [directory, recursive] of directories) {
    if (watchers.has(directory)) continue;
    const watcher = watch(directory, { recursive }, (_event, name) => {
      if (checking || closing) return;
      const changed = name && resolve(directory, name.toString());
      if (
        !changed ||
        (!excluded(changed) &&
          selected.some((path) => within(changed, path) || within(path, changed)))
      )
        schedule();
    });
    watcher.on("error", fail);
    watchers.set(directory, { watcher, recursive });
  }
}

async function stop(job: Job | undefined) {
  if (!job?.child.pid) return;
  const pid = job.child.pid;
  if (windows) {
    if (job.child.exitCode === null && job.child.signalCode === null) {
      spawnSync("taskkill", ["/pid", String(job.child.pid), "/T", "/F"], { stdio: "ignore" });
    }
    await job.done;
    return;
  }
  const signal = (name: NodeJS.Signals | 0) => {
    try {
      process.kill(-pid, name);
      return true;
    } catch (error) {
      if (errorCode(error) !== "ESRCH") throw error;
      return false;
    }
  };
  signal("SIGTERM");
  // The direct child can exit first; retain the grace period for its entire process group.
  const deadline = performance.now() + 1000;
  while (signal(0)) {
    if (performance.now() >= deadline) {
      signal("SIGKILL");
      break;
    }
    await delay(25);
  }
  await job.done;
}

async function check() {
  if (closing || checking) return;
  const changed = changes.check();
  needsCheck ||= changed;
  const requests = watchRequests?.pending();
  if (!needsCheck && (runInProgress || !requests?.length)) return;
  checking = true;
  needsCheck = false;
  await stop(running);
  running = undefined;
  runInProgress = false;
  if (closing) return;
  refreshWatchers();
  if (watchingTests) {
    // A fresh run sees edits made while the previous process was stopping.
    changes.check();
    announceWatchRun("Running SDA checks and tests...");
    watchJob(launchScript("sda:test"), "SDA checks and tests", "passed");
    checking = false;
    return;
  }
  announceWatchRun("Running SDA checks and analysis...");
  watchRequests?.start();
  const report: Report = (stream, text) => {
    process[stream].write(text);
    if (closing) return;
    try {
      watchRequests?.record({ stream, text });
    } catch (error) {
      fail(error);
    }
  };
  fixer = launchScript("sda:fix", true, report);
  const fixed = await fixer.done;
  if (closing) return;
  // Recheck edits made during fixes; ignore delayed events for unchanged file states.
  needsCheck = changes.check();
  refreshWatchers();
  fixer = undefined;
  checking = false;
  // Requests that arrived during fixes can use this run if the files are current.
  const batch = watchRequests?.pending() ?? [];
  const publish = (code: number) => watchRequests?.publish(batch, code);
  if (needsCheck) {
    schedule();
  } else if (fixed === 0) {
    console.log();
    watchJob(
      launch(bun ? ["run", entry] : ["--env-file=.env", entry], process.execPath, false, report),
      "SDA analysis",
      "completed",
      publish,
    );
  } else {
    publish(fixed ?? 1);
    console.log("Fix failed. Waiting for changes...");
  }
}

function schedule() {
  clearTimeout(timer);
  timer = setTimeout(() => check().catch(fail), 0);
}

async function shutdown(code: number) {
  if (closing) return;
  closing = true;
  clearTimeout(timer);
  clearInterval(requestTimer);
  for (const { watcher } of watchers.values()) watcher.close();
  await Promise.all([stop(fixer), stop(running)]);
  releaseLock?.();
  process.exit(code);
}

function errorCode(error: unknown) {
  return error instanceof Error && "code" in error ? error.code : undefined;
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

function fail(error: unknown) {
  console.error(errorMessage(error));
  void shutdown(1);
}

process.on("SIGINT", () => void shutdown(0));
process.on("SIGTERM", () => void shutdown(0));

async function runOnce() {
  fixer = launchScript("sda:fix", true);
  const fixed = await fixer.done;
  if (closing) return;
  if (fixed !== 0) {
    await shutdown(fixed ?? 1);
    return;
  }
  await stop(fixer);
  fixer = undefined;
  if (closing) return;
  console.log();
  running = launch(bun ? ["run", entry] : ["--env-file=.env", entry]);
  const result = await running.done;
  await shutdown(result ?? 1);
}

try {
  if (!watchingTests) {
    const lock = await acquireSdaLock(runCommand, watching ? resolve(entry) : undefined);
    releaseLock = lock.release;
    if (watching && !closing) {
      const requests = createWatchRequests(lock.directory);
      watchRequests = requests;
      requestTimer = setInterval(() => {
        if (closing) return;
        try {
          const pending = requests.pending();
          if (!checking && !runInProgress && (needsCheck || pending.length)) schedule();
        } catch (error) {
          fail(error);
        }
      }, WATCH_REQUEST_POLL_MS);
      lock.startWatcherHeartbeat(fail);
    }
  }
  if (closing) releaseLock?.();
  else if (watching) {
    refreshWatchers();
    void check().catch(fail);
  } else {
    void runOnce().catch(fail);
  }
} catch (error) {
  if (!watching && error instanceof SdaLockBusyError && error.watcher?.entry === resolve(entry)) {
    try {
      process.exitCode = await requestWatchRun(error.watcher);
    } catch (requestError) {
      fail(requestError);
    }
  } else {
    fail(new Error("Cannot start " + runCommand + ": " + errorMessage(error)));
  }
}
