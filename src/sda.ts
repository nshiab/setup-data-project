#!/usr/bin/env node
import { existsSync, lstatSync, type FSWatcher, readdirSync, watch } from "node:fs";
import { spawn, spawnSync, type ChildProcess } from "node:child_process";
import { dirname, join, resolve, sep } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { parseArgs } from "node:util";
import { acquireSdaLock, SDA_PID_FILE, SDA_LOCK_DIRECTORY } from "./helpers/sdaLock.ts";
import { printSdaStatus } from "./helpers/sdaStatus.ts";

const {
  positionals: [entry, ...paths],
  values,
} = parseArgs({
  allowPositionals: true,
  options: {
    status: { type: "boolean", default: false },
    watch: { type: "boolean", default: false },
    ignore: { type: "string", multiple: true, default: [] },
  },
});
if (values.status) process.exit(printSdaStatus());
if (!entry) {
  console.error(
    "Usage: sda-run --status | [--watch] <entry-file> [watch-paths...] [--ignore path]",
  );
  process.exit(1);
}
const watching = values.watch;
const selected = [entry, ...paths].map((path) => resolve(path));
const ignored = [SDA_PID_FILE, SDA_LOCK_DIRECTORY, ...values.ignore].map((path) => resolve(path));
const within = (path: string, root: string) => path === root || path.startsWith(root + sep);
const excluded = (path: string) => ignored.some((root) => within(path, root));
const bun = Boolean(process.versions.bun);
const runCommand = (bun ? "bun run " : "npm run ") + (watching ? "sda:watch" : "sda");
const windows = process.platform === "win32";
type Job = { child: ChildProcess; done: Promise<number | null> };
let releaseLock: (() => void) | undefined;
let fixer: Job | undefined;
let analysis: Job | undefined;
let timer: ReturnType<typeof setTimeout> | undefined;
let checking = false;
let closing = false;
let needsCheck = true;
let contents = new Map<string, string | null>();
const watchers = new Map<string, { watcher: FSWatcher; recursive: boolean }>();

function launch(args: string[], command = process.execPath) {
  const child = spawn(command, args, {
    // Bun's Windows --bun shim is named node.exe; keep Bun CLI argument parsing.
    argv0: windows && bun && command === process.execPath ? "bun" : undefined,
    stdio: "inherit",
    detached: !windows,
    shell: windows && command === "npm.cmd",
  });
  const done = new Promise<number | null>((resolve) => {
    child.once("error", (error) => {
      console.error(errorMessage(error));
      resolve(1);
    });
    child.once("close", resolve);
  });
  return { child, done };
}

function snapshot() {
  const files = new Map<string, string | null>();
  function collect(path: string) {
    if (excluded(path) || files.has(path)) return;
    try {
      const stat = lstatSync(path, { bigint: true });
      if (stat.isDirectory()) {
        files.set(path, "directory");
        for (const name of readdirSync(path)) collect(join(path, name));
      } else {
        // Compare metadata without reading potentially large datasets or following symlinks.
        files.set(path, [stat.dev, stat.ino, stat.size, stat.mtimeNs, stat.ctimeNs].join(":"));
      }
    } catch (error) {
      if (errorCode(error) !== "ENOENT" && errorCode(error) !== "ENOTDIR") throw error;
      files.set(path, null);
    }
  }
  for (const path of selected) collect(path);
  return files;
}

function equal(left: Map<string, string | null>, right: Map<string, string | null>) {
  return left.size === right.size && [...left].every(([path, value]) => right.get(path) === value);
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
  if (!needsCheck && equal(contents, snapshot())) return;
  checking = true;
  needsCheck = false;
  await stop(analysis);
  analysis = undefined;
  if (closing) return;
  refreshWatchers();
  contents = snapshot();
  process.stdout.write("\u001b[2J\u001b[3J\u001b[H");
  console.log("Fixing and checking...");
  fixer = launch(["run", "fix"], bun ? process.execPath : windows ? "npm.cmd" : "npm");
  const fixed = await fixer.done;
  if (closing) return;
  const current = snapshot();
  // Recheck edits made during fixes; ignore delayed events for unchanged file states.
  needsCheck = !equal(contents, current);
  contents = current;
  refreshWatchers();
  fixer = undefined;
  checking = false;
  if (needsCheck) {
    schedule();
  } else if (fixed === 0) {
    console.log("Running analysis...");
    analysis = launch(bun ? ["run", entry] : ["--env-file=.env", entry]);
  } else {
    console.log("Fix failed. Watching for changes...");
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
  for (const { watcher } of watchers.values()) watcher.close();
  await Promise.all([stop(fixer), stop(analysis)]);
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
  console.log("Fixing and checking...");
  fixer = launch(["run", "fix"], bun ? process.execPath : windows ? "npm.cmd" : "npm");
  const fixed = await fixer.done;
  if (closing) return;
  if (fixed !== 0) {
    await shutdown(fixed ?? 1);
    return;
  }
  await stop(fixer);
  fixer = undefined;
  if (closing) return;
  console.log("Running analysis...");
  analysis = launch(bun ? ["run", entry] : ["--env-file=.env", entry]);
  const result = await analysis.done;
  await shutdown(result ?? 1);
}

try {
  releaseLock = await acquireSdaLock(runCommand);
  if (closing) releaseLock();
  else if (watching) {
    refreshWatchers();
    void check().catch(fail);
  } else {
    void runOnce().catch(fail);
  }
} catch (error) {
  fail(new Error("Cannot start " + runCommand + ": " + errorMessage(error)));
}
