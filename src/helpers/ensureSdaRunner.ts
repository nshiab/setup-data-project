import { existsSync, mkdirSync, writeFileSync } from "node:fs";

export function ensureSdaRunner() {
  mkdirSync("scripts", { recursive: true });
  if (!existsSync("scripts/sda.mjs")) writeFileSync("scripts/sda.mjs", runner);
}

const runner = String.raw`import { existsSync, lstatSync, readdirSync, watch } from "node:fs";
import { spawn, spawnSync } from "node:child_process";
import { dirname, join, resolve, sep } from "node:path";
import { parseArgs } from "node:util";

const {
  positionals: [entry, ...paths],
  values,
} = parseArgs({
  allowPositionals: true,
  options: { ignore: { type: "string", multiple: true, default: [] } },
});
if (!entry) {
  console.error("Usage: scripts/sda.mjs <entry-file> [watch-paths...] [--ignore path]");
  process.exit(1);
}
const selected = [entry, ...paths].map((path) => resolve(path));
const ignored = values.ignore.map((path) => resolve(path));
const within = (path, root) => path === root || path.startsWith(root + sep);
const excluded = (path) => ignored.some((root) => within(path, root));
const bun = Boolean(process.versions.bun);
const windows = process.platform === "win32";
let fixer;
let analysis;
let timer;
let checking = false;
let closing = false;
let needsCheck = true;
let contents = new Map();
const watchers = new Map();

function launch(args, command = process.execPath) {
  const child = spawn(command, args, {
    stdio: "inherit",
    detached: !windows,
    shell: windows && command === "npm.cmd",
  });
  const done = new Promise((resolve) => {
    child.once("error", (error) => {
      console.error(error.message);
      resolve(1);
    });
    child.once("close", resolve);
  });
  return { child, done };
}

function snapshot() {
  const files = new Map();
  function collect(path) {
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
      if (error.code !== "ENOENT" && error.code !== "ENOTDIR") throw error;
      files.set(path, null);
    }
  }
  for (const path of selected) collect(path);
  return files;
}

function equal(left, right) {
  return left.size === right.size && [...left].every(([path, value]) => right.get(path) === value);
}

function refreshWatchers() {
  const directories = new Map();
  const add = (directory, recursive) => {
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

async function stop(job) {
  if (!job?.child.pid) return;
  const signal = (name) => {
    if (windows) {
      if (job.child.exitCode === null && job.child.signalCode === null) {
        spawnSync("taskkill", ["/pid", String(job.child.pid), "/T", "/F"], { stdio: "ignore" });
      }
    } else {
      try {
        process.kill(-job.child.pid, name);
      } catch (error) {
        if (error.code !== "ESRCH") throw error;
      }
    }
  };
  signal("SIGTERM");
  const force = setTimeout(() => signal("SIGKILL"), 1000);
  await job.done;
  clearTimeout(force);
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

async function shutdown(code) {
  if (closing) return;
  closing = true;
  clearTimeout(timer);
  for (const { watcher } of watchers.values()) watcher.close();
  await Promise.all([stop(fixer), stop(analysis)]);
  process.exit(code);
}

function fail(error) {
  console.error(error.message);
  void shutdown(1);
}

process.on("SIGINT", () => void shutdown(0));
process.on("SIGTERM", () => void shutdown(0));

try {
  refreshWatchers();
  void check().catch(fail);
} catch (error) {
  fail(error);
}
`;
