import { beforeEach, expect, test, vi } from "vite-plus/test";
import { execFileSync } from "node:child_process";
import {
  mkdirSync,
  readFileSync,
  realpathSync,
  statSync,
  utimesSync,
  writeFileSync,
} from "node:fs";
import { resolve } from "node:path";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import { printSdaStatus } from "../src/helpers/sdaStatus.ts";
import { temporaryProject } from "./helpers/utils.ts";

vi.mock("node:child_process", () => ({ execFileSync: vi.fn() }));

temporaryProject();
const runner = fileURLToPath(new URL("../src/sda.ts", import.meta.url));
let claim: string;
beforeEach(() => {
  vi.mocked(execFileSync).mockReset();
  vi.stubGlobal("process", { ...process, platform: "win32", argv: [process.execPath, runner] });
  vi.spyOn(console, "log").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
  claim = `.sda-cache/lock/${process.pid}-${randomUUID()}`;
  mkdirSync(claim, { recursive: true });
  writeFileSync(
    `${claim}/owner.json`,
    JSON.stringify({ ticket: 1, command: "npm run sda", projectRoot: realpathSync(process.cwd()) }),
  );
});

test.each([
  ["node", "", "SDA analysis is running"],
  ["bun", ' "--watch"', "SDA watcher is running"],
])("Windows status reads the live %s command and mode", (runtime, flag, message) => {
  const query = vi
    .mocked(execFileSync)
    .mockReturnValue(JSON.stringify(`${runtime}.exe "${runner}"${flag} sda/main.ts`));
  // The mode comes from the live process, even when the record says single run.
  const before = readFileSync(`${claim}/owner.json`, "utf8");
  expect(printSdaStatus()).toBe(1);
  expect(console.log).toHaveBeenCalledWith(expect.stringContaining(message));
  expect(query).toHaveBeenCalledWith(
    "powershell.exe",
    expect.arrayContaining(["-NoProfile", "-NonInteractive"]),
    expect.objectContaining({ timeout: 10000, windowsHide: true, maxBuffer: 64 * 1024 }),
  );
  expect(readFileSync(`${claim}/owner.json`, "utf8")).toBe(before);
});

test.each(["ready", "stale", "starting", "reused PID", "inspection denied"])(
  "status checks a %s watcher record against live process information",
  (state) => {
    const file = `${claim}/owner.json`;
    const record = JSON.stringify({
      ticket: 1,
      command: "npm run sda:watch",
      projectRoot: realpathSync(process.cwd()),
      watchEntry: resolve("sda/main.ts"),
      watcherReady: state !== "starting",
    });
    writeFileSync(file, record);
    if (state === "stale") {
      const old = new Date(Date.now() - 30000);
      utimesSync(file, old, old);
    }
    const modified = statSync(file).mtimeMs;
    if (state === "reused PID") {
      vi.mocked(execFileSync).mockReturnValue(JSON.stringify("node.exe unrelated.js"));
    } else if (state === "inspection denied") {
      vi.mocked(execFileSync).mockImplementation(() => {
        throw Object.assign(new Error("Permission denied"), { code: "EACCES" });
      });
    } else {
      vi.spyOn(process, "kill").mockImplementation(() => {
        throw Object.assign(new Error("Operation not permitted"), { code: "EPERM" });
      });
    }

    if (state === "ready" || state === "inspection denied") {
      expect(printSdaStatus()).toBe(1);
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining("SDA watcher is running"));
    } else {
      expect(printSdaStatus()).toBe(2);
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining("Unable to verify SDA status"),
      );
    }
    expect(execFileSync).toHaveBeenCalledTimes(
      state === "reused PID" || state === "inspection denied" ? 1 : 0,
    );
    expect(readFileSync(file, "utf8")).toBe(record);
    expect(statSync(file).mtimeMs).toBe(modified);
  },
);

test.each([null, "", "node.exe unrelated.js", { CommandLine: "unexpected shape" }])(
  "Windows status leaves unreadable or unrelated live commands unverified: %j",
  (command) => {
    vi.mocked(execFileSync).mockReturnValue(JSON.stringify(command));
    expect(printSdaStatus()).toBe(2);
    expect(console.log).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining("Unable to verify SDA status"),
    );
  },
);

test.each(["unavailable", "access denied", "timed out", "invalid JSON"])(
  "Windows status stays unverified when PowerShell is %s",
  (failure) => {
    const query = vi.mocked(execFileSync);
    if (failure === "invalid JSON") query.mockReturnValue("not JSON");
    else
      query.mockImplementation(() => {
        throw new Error(failure);
      });
    expect(printSdaStatus()).toBe(2);
    expect(console.log).not.toHaveBeenCalled();
  },
);

test.each([{}, { projectRoot: 123 }, { projectRoot: "missing-directory" }])(
  "Windows status refuses missing or invalid project association: %j",
  (record) => {
    writeFileSync(`${claim}/owner.json`, JSON.stringify(record));
    const query = vi.mocked(execFileSync);
    expect(printSdaStatus()).toBe(2);
    expect(query).not.toHaveBeenCalled();
  },
);
