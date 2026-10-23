import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync, realpathSync } from "node:fs";
import { join } from "node:path";
import { isObject } from "./jsonObject.ts";
import { SDA_LOCK_DIRECTORY, SDA_PID_FILE } from "./sdaLock.ts";

function errorCode(error: unknown) {
  return error instanceof Error && "code" in error ? error.code : undefined;
}

// Status is read-only: a missing or dead owner is ignored, never removed.
export function printSdaStatus(): number {
  const run = `${process.versions.bun ? "bun" : "npm"} run`;
  const retry = `${run} sda:status`;
  try {
    const pids = new Set<number>();
    const claims = new Map<number, string[]>();
    try {
      for (const name of readdirSync(SDA_LOCK_DIRECTORY)) {
        const match = /^(\d+)-[\da-f-]{36}$/.exec(name);
        if (match) {
          const pid = Number(match[1]);
          pids.add(pid);
          claims.set(pid, [...(claims.get(pid) ?? []), name]);
        }
      }
    } catch (error) {
      if (errorCode(error) !== "ENOENT") throw error;
    }
    try {
      const value = readFileSync(SDA_PID_FILE, "utf8").trim();
      if (!/^\d+$/.test(value)) throw new Error("The SDA PID file is invalid.");
      pids.add(Number(value));
    } catch (error) {
      if (errorCode(error) !== "ENOENT") throw error;
    }
    const messages: string[] = [];
    for (const pid of pids) {
      if (!Number.isInteger(pid) || pid <= 0 || pid > 2147483647)
        throw new Error("The recorded SDA PID is invalid.");
      try {
        process.kill(pid, 0);
      } catch (error) {
        if (errorCode(error) === "ESRCH") continue;
        throw error;
      }
      let command: string;
      if (process.platform === "win32") {
        const owners = claims.get(pid) ?? [];
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
              timeout: 5000,
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
      messages.push(
        /(?:^|["\s])--watch(?:["\s]|$)/.test(command)
          ? `SDA watcher is running (${run} sda:watch, PID ${pid}). It automatically fixes files and reruns the analysis. If you are an agent, ask the user to stop it with Ctrl+C, then recheck with ${retry} before doing any work.`
          : `SDA analysis is running (${run} sda, PID ${pid}). Wait for it to finish. Recheck with ${retry} in 30 seconds before doing any work.`,
      );
    }
    for (const message of messages) console.log(message);
    if (messages.length) return 1;
    console.log("No active SDA process found. You can proceed.");
    return 0;
  } catch (error) {
    console.error(
      `Unable to verify SDA status: ${error instanceof Error ? error.message : String(error)} If you are an agent, ask the user to confirm that neither ${run} sda nor ${run} sda:watch is running and that you may proceed, then wait for their confirmation before doing any work.`,
    );
    return 2;
  }
}
