import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync, realpathSync } from "node:fs";
import { join } from "node:path";
import { isObject } from "./jsonObject.ts";
import { hasFreshWatcherHeartbeat, SDA_LOCK_DIRECTORY } from "./sdaLock.ts";

function errorCode(error: unknown) {
  return error instanceof Error && "code" in error ? error.code : undefined;
}

function readProcessCommand(pid: number, owners: string[]) {
  let command: string;
  if (process.platform === "win32") {
    if (owners.length !== 1) throw new Error(`PID ${pid} has no unambiguous SDA owner record.`);
    const owner: unknown = JSON.parse(
      readFileSync(join(SDA_LOCK_DIRECTORY, owners[0], "owner.json"), "utf8"),
    );
    // WMI has no readable cwd. This is the claim's recorded project association,
    // not proof of the live process's cwd or protection against PID reuse.
    if (
      !isObject(owner) ||
      typeof owner.projectRoot !== "string" ||
      realpathSync(owner.projectRoot) !== realpathSync(process.cwd())
    )
      throw new Error(`PID ${pid} could not be verified as this project's SDA process.`);
    const result: unknown = JSON.parse(
      execFileSync(
        "powershell.exe",
        [
          "-NoLogo",
          "-NoProfile",
          "-NonInteractive",
          "-Command",
          "[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false); " +
            `(Get-CimInstance Win32_Process -Filter 'ProcessId = ${pid}' -ErrorAction Stop).CommandLine | ConvertTo-Json -Compress`,
        ],
        {
          encoding: "utf8",
          // A cold PowerShell/CIM startup can exceed five seconds on Windows.
          timeout: 10000,
          maxBuffer: 64 * 1024,
          windowsHide: true,
          stdio: ["ignore", "pipe", "pipe"],
        },
      ),
    );
    if (typeof result !== "string" || !result.trim())
      throw new Error(`PID ${pid} has no readable command line.`);
    command = result;
  } else if (process.platform === "darwin" || process.platform === "linux") {
    command = execFileSync("ps", ["-p", String(pid), "-o", "command="], {
      encoding: "utf8",
      timeout: 5000,
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  } else {
    throw new Error("Active SDA processes cannot be verified on this platform.");
  }
  const executable = process.argv[1];
  if (
    !executable ||
    (!command.includes(executable) &&
      !command.includes(realpathSync(executable)) &&
      !/(?:[\\/]@nshiab[\\/]setup-data-project[\\/]dist[\\/]sda\.mjs|[\\/]node_modules[\\/]\.bin[\\/]sda-run)(?:["\s]|$)/.test(
        command,
      ))
  )
    throw new Error(`PID ${pid} could not be verified as this project's SDA process.`);
  if (process.platform === "darwin" || process.platform === "linux") {
    const cwd =
      process.platform === "linux"
        ? realpathSync(`/proc/${pid}/cwd`)
        : execFileSync("lsof", ["-a", "-p", String(pid), "-d", "cwd", "-Fn"], {
            encoding: "utf8",
            timeout: 5000,
            stdio: ["ignore", "pipe", "pipe"],
          })
            .split("\n")
            .find((line) => line.startsWith("n"))
            ?.slice(1);
    if (!cwd || realpathSync(cwd) !== realpathSync(process.cwd()))
      throw new Error(`PID ${pid} could not be verified as this project's SDA process.`);
  }
  return command;
}

// Status is read-only: a missing or dead owner is ignored, never removed.
export function printSdaStatus(): number {
  const run = `${process.versions.bun ? "bun" : "npm"} run`;
  const retry = `${run} sda:status`;
  const watcherGuidance = `you can keep editing. The watcher formats source files, applies lint fixes, and reruns the analysis after changes. The user is likely watching the results live in their terminal while you work. Re-read a file before editing it again because the watcher may have changed it. Run ${run} sda to request a run from the watcher and receive its output and exit code when it finishes. Before handing off analysis code changes, start with ${run} sda:test. If formatting or lint checks fail, use ${run} sda:fix for automatic fixes. Resolve any remaining failures and rerun ${run} sda:test until it passes.`;
  const watcherMessage = (pid: number) =>
    `An SDA watcher is running (${run} sda:watch, PID ${pid}). While it runs, ${watcherGuidance}`;
  try {
    const claims = new Map<number, string[]>();
    try {
      for (const name of readdirSync(SDA_LOCK_DIRECTORY)) {
        const match = /^(\d+)-[\da-f-]{36}$/.exec(name);
        if (match) {
          const pid = Number(match[1]);
          claims.set(pid, [...(claims.get(pid) ?? []), name]);
        }
      }
    } catch (error) {
      if (errorCode(error) !== "ENOENT") throw error;
    }
    const messages: string[] = [];
    for (const [pid, owners] of claims) {
      if (!Number.isInteger(pid) || pid <= 0 || pid > 2147483647)
        throw new Error("The recorded SDA PID is invalid.");
      let command: string;
      try {
        process.kill(pid, 0);
        command = readProcessCommand(pid, owners);
      } catch (error) {
        const code = errorCode(error);
        if (code === "ESRCH") continue;
        if (
          (code === "EPERM" || code === "EACCES") &&
          owners.length === 1 &&
          hasFreshWatcherHeartbeat(join(SDA_LOCK_DIRECTORY, owners[0]))
        ) {
          messages.push(watcherMessage(pid));
          continue;
        }
        throw error;
      }
      messages.push(
        /(?:^|["\s])--watch(?:["\s]|$)/.test(command)
          ? watcherMessage(pid)
          : `SDA analysis is running (${run} sda, PID ${pid}). Wait for it to finish before editing. Recheck with ${retry} after 3 seconds. If it is still running, recheck after 9 seconds, then every 27 seconds until it finishes.`,
      );
    }
    for (const message of messages) console.log(message);
    if (messages.length) return 1;
    console.log("No active SDA process found. You can proceed.");
    return 0;
  } catch (error) {
    console.error(
      `Unable to verify SDA status: ${error instanceof Error ? error.message : String(error)} If you are an agent, ask the user whether ${run} sda or ${run} sda:watch is running. Wait for a one-off analysis to finish. If a watcher is running, ${watcherGuidance}`,
    );
    return 2;
  }
}
