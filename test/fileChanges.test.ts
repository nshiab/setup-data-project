import { expect, test, vi } from "vite-plus/test";
import {
  mkdirSync,
  readdirSync,
  renameSync,
  rmSync,
  symlinkSync,
  utimesSync,
  writeFileSync,
} from "node:fs";
import { join, resolve, sep } from "node:path";
import { createFileChanges } from "../src/helpers/fileChanges.ts";
import { temporaryProject } from "./helpers/utils.ts";

temporaryProject();

vi.mock("node:fs", async (importOriginal) => {
  const fs = await importOriginal<typeof import("node:fs")>();
  return { ...fs, readdirSync: vi.fn(fs.readdirSync) };
});

test("ignores a missing selection that disappears again before it can be listed", () => {
  const root = resolve("brief-directory");
  const changes = createFileChanges([root], () => false);
  expect(changes.check()).toBe(true);
  mkdirSync(root);
  vi.mocked(readdirSync).mockImplementationOnce(() => {
    rmSync(root, { recursive: true });
    throw Object.assign(new Error("directory disappeared"), { code: "ENOENT" });
  });
  expect(changes.check()).toBe(false);
  expect(changes.check()).toBe(false);
});

function fixture() {
  mkdirSync("sda/helpers", { recursive: true });
  mkdirSync("sda/output");
  writeFileSync("sda/main.ts", "one");
  writeFileSync("sda/helpers/value.ts", "one");
  const root = resolve("sda");
  const output = join(root, "output");
  const changes = createFileChanges(
    [join(root, "main.ts"), root, resolve(".env")],
    (path) => path === output || path.startsWith(output + sep),
  );
  expect(changes.check()).toBe(true);
  expect(changes.check()).toBe(false);
  return changes;
}

test("checks selected files and ignores unchanged state and unrelated files", () => {
  const changes = fixture();
  const main = resolve("sda/main.ts");
  writeFileSync(main, "updated main");
  expect(changes.check()).toBe(true);
  expect(changes.check()).toBe(false);
  writeFileSync("outside.txt", "one");
  writeFileSync("sda/output/result.txt", "one");
  expect(changes.check()).toBe(false);
});

test("finds edits without a notification for the edited file", () => {
  const changes = fixture();
  writeFileSync("sda/helpers/value.ts", "updated helper");
  expect(changes.check()).toBe(true);
  expect(changes.check()).toBe(false);
});

test("detects same-size edits with distinct modification times", () => {
  const changes = fixture();
  const main = resolve("sda/main.ts");
  writeFileSync(main, "two");
  utimesSync(main, new Date(0), new Date(0));
  expect(changes.check()).toBe(true);
  expect(changes.check()).toBe(false);
});

test("records all existing batch edits before the next check", () => {
  const changes = fixture();
  const main = resolve("sda/main.ts");
  const helper = resolve("sda/helpers/value.ts");
  // Change sizes so the test does not depend on filesystem timestamp precision.
  writeFileSync(main, "updated main");
  writeFileSync(helper, "updated helper");
  expect(changes.check()).toBe(true);
  expect(changes.check()).toBe(false);
});

test("tracks new and removed subtrees, restoration, and directory-to-file replacement", () => {
  const changes = fixture();
  const directory = resolve("sda/helpers");
  mkdirSync("sda/helpers/deep");
  writeFileSync("sda/helpers/deep/new.txt", "one");
  expect(changes.check()).toBe(true);
  renameSync(directory, "saved");
  expect(changes.check()).toBe(true);
  expect(changes.check()).toBe(false);
  renameSync("saved", directory);
  expect(changes.check()).toBe(true);
  expect(changes.check()).toBe(false);
  rmSync(directory, { recursive: true });
  writeFileSync(directory, "now a file");
  expect(changes.check()).toBe(true);
  expect(changes.check()).toBe(false);
});

test("keeps missing explicit selections through deletion and restoration", () => {
  const changes = fixture();
  writeFileSync(".env", "one");
  expect(changes.check()).toBe(true);
  rmSync(".env");
  expect(changes.check()).toBe(true);
  expect(changes.check()).toBe(false);
  rmSync("sda", { recursive: true });
  expect(changes.check()).toBe(true);
  expect(changes.check()).toBe(false);
  mkdirSync("sda");
  writeFileSync("sda/main.ts", "restored");
  expect(changes.check()).toBe(true);
  expect(changes.check()).toBe(false);
});

test("does not retain deleted files in the index", () => {
  const changes = fixture();
  const path = resolve("sda/temporary.txt");
  for (let n = 0; n < 20; n++) {
    writeFileSync(path, String(n));
    expect(changes.check()).toBe(true);
    rmSync(path);
    expect(changes.check()).toBe(true);
    expect(changes.check()).toBe(false);
  }
});

test("does not follow directory symlinks", () => {
  const changes = fixture();
  mkdirSync("outside");
  symlinkSync(resolve("outside"), "sda/link", process.platform === "win32" ? "junction" : "dir");
  expect(changes.check()).toBe(true);
  writeFileSync("outside/value.txt", "one");
  expect(changes.check()).toBe(false);
});

test.skipIf(process.platform === "win32")(
  "reconciles a directory replaced by a looping symlink",
  () => {
    const changes = fixture();
    renameSync("sda/helpers", "saved-helpers");
    symlinkSync("helpers", "sda/helpers", "dir");
    expect(changes.check()).toBe(true);
    expect(changes.check()).toBe(false);
  },
);
