import { randomUUID } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { join, resolve } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { isObject } from "./jsonObject.ts";

export const SDA_PID_FILE = "sda/.sda.pid";
export const SDA_LOCK_DIRECTORY = "sda/.sda-lock";

type Claim = { id: string; pid: number; ticket: number; command?: string };

function errorCode(error: unknown) {
  return error instanceof Error && "code" in error ? error.code : undefined;
}

// Bakery ordering: publish a unique claim before choosing a ticket, then wait for
// concurrent ticket choices. Never replace/delete a shared lock during recovery.
// https://www.microsoft.com/en-us/research/publication/new-solution-dijkstras-concurrent-programming-problem/
export async function acquireSdaLock(command: string): Promise<() => void> {
  const directory = resolve(SDA_LOCK_DIRECTORY);
  const pidFile = resolve(SDA_PID_FILE);
  const id = `${process.pid}-${randomUUID()}`;
  const ownDirectory = join(directory, id);
  mkdirSync(directory, { recursive: true });
  mkdirSync(ownDirectory);
  let ownsPid = false;
  const release = () => {
    if (ownsPid) {
      // Remove the informational PID before releasing ownership to the next run.
      rmSync(pidFile, { force: true });
      ownsPid = false;
    }
    rmSync(ownDirectory, { recursive: true, force: true });
    process.removeListener("exit", release);
  };
  process.once("exit", release);

  function readClaim(candidate: string): Claim | undefined {
    const match = /^(\d+)-[\da-f-]{36}$/.exec(candidate);
    if (!match) return;
    const pid = Number(match[1]);
    if (!Number.isInteger(pid) || pid <= 0 || pid > 2147483647) return;
    const path = join(directory, candidate);
    try {
      process.kill(pid, 0);
    } catch (error) {
      if (errorCode(error) !== "ESRCH") throw error;
      // Claim names are never reused, so another starter cannot acquire this path.
      rmSync(path, { recursive: true, force: true });
      return;
    }
    let record: unknown;
    try {
      record = JSON.parse(readFileSync(join(path, "owner.json"), "utf8"));
    } catch (error) {
      if (errorCode(error) !== "ENOENT") throw error;
      // A directory without a published ticket is still choosing, or has exited.
      return existsSync(path) ? { id: candidate, pid, ticket: 0 } : undefined;
    }
    if (
      !isObject(record) ||
      typeof record.ticket !== "number" ||
      !Number.isSafeInteger(record.ticket) ||
      record.ticket < 1 ||
      typeof record.command !== "string"
    )
      throw new Error(`Cannot read the SDA lock owned by process ${pid}.`);
    return { id: candidate, pid, ticket: record.ticket, command: record.command };
  }

  try {
    let ticket = 1;
    for (const candidate of readdirSync(directory)) {
      const claim = readClaim(candidate);
      if (claim) ticket = Math.max(ticket, claim.ticket + 1);
    }
    writeFileSync(join(ownDirectory, "owner.tmp"), JSON.stringify({ ticket, command }));
    renameSync(join(ownDirectory, "owner.tmp"), join(ownDirectory, "owner.json"));
    const deadline = performance.now() + 5000;
    for (const candidate of readdirSync(directory)) {
      if (candidate === id) continue;
      let claim = readClaim(candidate);
      while (claim?.ticket === 0) {
        if (performance.now() >= deadline)
          throw new Error(
            `Another SDA command is still starting (PID ${claim.pid}). Wait for it to finish starting, then try again.`,
          );
        await delay(10);
        claim = readClaim(candidate);
      }
      if (claim && (claim.ticket < ticket || (claim.ticket === ticket && claim.id < id)))
        throw new Error(
          `${claim.command} is already running${claim.command?.endsWith("sda:watch") ? " and watching this project's files" : " an analysis for this project"} (PID ${claim.pid}). Wait for it to finish or stop it with Ctrl+C in its terminal, then try again.`,
        );
    }
    // Only the winner touches the shared PID file, including stale-file recovery.
    writeFileSync(pidFile, String(process.pid) + "\n");
    ownsPid = true;
    return release;
  } catch (error) {
    release();
    throw error;
  }
}
