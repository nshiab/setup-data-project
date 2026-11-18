import { randomUUID } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  realpathSync,
  renameSync,
  rmSync,
  statSync,
  utimesSync,
  writeFileSync,
} from "node:fs";
import { join, resolve } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { isObject } from "./jsonObject.ts";

export const SDA_LOCK_DIRECTORY = ".sda-cache/lock";
const watcherHeartbeatInterval = 1000;
const watcherHeartbeatMaxAge = 5000;

type Claim = { id: string; pid: number; ticket: number; command?: string; watchEntry?: string };

export class SdaLockBusyError extends Error {
  readonly watcher?: { directory: string; pid: number; entry: string };

  constructor(claim: Claim, directory: string) {
    super(
      `${claim.command} is already running${claim.command?.endsWith("sda:watch") ? " and watching this project's files" : " an analysis for this project"} (PID ${claim.pid}). Wait for it to finish or stop it with Ctrl+C in its terminal, then try again.`,
    );
    if (claim.watchEntry) this.watcher = { directory, pid: claim.pid, entry: claim.watchEntry };
  }
}

function errorCode(error: unknown) {
  return error instanceof Error && "code" in error ? error.code : undefined;
}

export function hasFreshWatcherHeartbeat(directory: string): boolean {
  const file = join(directory, "owner.json");
  try {
    const info = statSync(file, { throwIfNoEntry: false });
    if (!info || Date.now() - info.mtimeMs >= watcherHeartbeatMaxAge) return false;
    const record: unknown = JSON.parse(readFileSync(file, "utf8"));
    return (
      isObject(record) &&
      record.watcherReady === true &&
      typeof record.watchEntry === "string" &&
      record.projectRoot === realpathSync(process.cwd())
    );
  } catch (error) {
    if (errorCode(error) === "ENOENT") return false;
    throw error;
  }
}

// Bakery ordering: publish a unique claim before choosing a ticket, then wait for
// concurrent ticket choices. Never replace/delete a shared lock during recovery.
// https://www.microsoft.com/en-us/research/publication/new-solution-dijkstras-concurrent-programming-problem/
export async function acquireSdaLock(command: string, watchEntry?: string) {
  const directory = resolve(SDA_LOCK_DIRECTORY);
  const id = `${process.pid}-${randomUUID()}`;
  const ownDirectory = join(directory, id);
  const ownerFile = join(ownDirectory, "owner.json");
  let heartbeat: ReturnType<typeof setInterval> | undefined;
  mkdirSync(directory, { recursive: true });
  mkdirSync(ownDirectory);
  const release = () => {
    clearInterval(heartbeat);
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
      if (errorCode(error) === "ESRCH") {
        // Claim names are never reused, so another starter cannot acquire this path.
        rmSync(path, { recursive: true, force: true });
        return;
      }
      // A denied PID probe leaves the claim in contention. A watcher must still
      // acknowledge any run request before the caller can wait for its result.
      if (errorCode(error) !== "EPERM") throw error;
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
    return {
      id: candidate,
      pid,
      ticket: record.ticket,
      command: record.command,
      watchEntry: typeof record.watchEntry === "string" ? record.watchEntry : undefined,
    };
  }

  try {
    let ticket = 1;
    for (const candidate of readdirSync(directory)) {
      const claim = readClaim(candidate);
      if (claim) ticket = Math.max(ticket, claim.ticket + 1);
    }
    const record = { ticket, command, projectRoot: realpathSync(process.cwd()), watchEntry };
    function publishOwner(watcherReady?: true) {
      const temporary = join(ownDirectory, "owner.tmp");
      writeFileSync(temporary, JSON.stringify({ ...record, watcherReady }));
      renameSync(temporary, ownerFile);
    }
    publishOwner();
    const deadline = performance.now() + 5000;
    let owner: Claim | undefined;
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
      if (claim && (claim.ticket < ticket || (claim.ticket === ticket && claim.id < id))) {
        if (
          !owner ||
          claim.ticket < owner.ticket ||
          (claim.ticket === owner.ticket && claim.id < owner.id)
        )
          owner = claim;
      }
    }
    if (owner) throw new SdaLockBusyError(owner, join(directory, owner.id));
    function startWatcherHeartbeat(onError: (error: unknown) => void) {
      publishOwner(true);
      heartbeat = setInterval(() => {
        try {
          const now = new Date();
          utimesSync(ownerFile, now, now);
        } catch (error) {
          onError(error);
        }
      }, watcherHeartbeatInterval);
    }
    return { directory: ownDirectory, release, startWatcherHeartbeat };
  } catch (error) {
    release();
    throw error;
  }
}
