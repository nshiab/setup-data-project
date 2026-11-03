import { expect, test } from "vite-plus/test";
import { mkdirSync, renameSync, rmSync, symlinkSync, utimesSync, writeFileSync } from "node:fs";
import { join, resolve, sep } from "node:path";
import { createFileChanges } from "../src/helpers/fileChanges.ts";
import { temporaryProject } from "./helpers/utils.ts";

temporaryProject();

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

test("checks selected files and ignores duplicate notifications and unrelated files", () => {
  const changes = fixture();
  const main = resolve("sda/main.ts");
  writeFileSync(main, "updated main");
  expect(changes.check([main])).toBe(true);
  expect(changes.check([main, main])).toBe(false);
  writeFileSync("outside.txt", "one");
  writeFileSync("sda/output/result.txt", "one");
  expect(changes.check([resolve("outside.txt"), resolve("sda/output/result.txt")])).toBe(false);
  expect(changes.check()).toBe(false);
});

test("finds edits without a notification during the full post-fix check", () => {
  const changes = fixture();
  writeFileSync("sda/helpers/value.ts", "updated helper");
  expect(changes.check([])).toBe(false);
  expect(changes.check()).toBe(true);
  expect(changes.check([resolve("sda/helpers/value.ts")])).toBe(false);
});

test("detects same-size edits with distinct modification times", () => {
  const changes = fixture();
  const main = resolve("sda/main.ts");
  writeFileSync(main, "two");
  utimesSync(main, new Date(0), new Date(0));
  expect(changes.check([main])).toBe(true);
  expect(changes.check()).toBe(false);
});

test("a file event leaves unrelated edits for their own notification or a full check", () => {
  const changes = fixture();
  const main = resolve("sda/main.ts");
  const helper = resolve("sda/helpers/value.ts");
  // Change sizes so the test does not depend on filesystem timestamp precision.
  writeFileSync(main, "updated main");
  writeFileSync(helper, "updated helper");
  expect(changes.check([main])).toBe(true);
  expect(changes.check([main])).toBe(false);
  expect(changes.check([helper])).toBe(true);
  expect(changes.check()).toBe(false);
});

test("tracks new and removed subtrees, restoration, and directory-to-file replacement", () => {
  const changes = fixture();
  const directory = resolve("sda/helpers");
  mkdirSync("sda/helpers/deep");
  writeFileSync("sda/helpers/deep/new.txt", "one");
  expect(changes.check([directory])).toBe(true);
  renameSync(directory, "saved");
  expect(changes.check([directory])).toBe(true);
  expect(changes.check([directory])).toBe(false);
  renameSync("saved", directory);
  expect(changes.check([directory])).toBe(true);
  expect(changes.check()).toBe(false);
  rmSync(directory, { recursive: true });
  writeFileSync(directory, "now a file");
  expect(changes.check([directory])).toBe(true);
  expect(changes.check()).toBe(false);
});

test("keeps missing explicit selections and handles events on their ancestors", () => {
  const changes = fixture();
  writeFileSync(".env", "one");
  expect(changes.check([process.cwd()])).toBe(true);
  rmSync(".env");
  expect(changes.check([resolve(".env")])).toBe(true);
  expect(changes.check()).toBe(false);
  rmSync("sda", { recursive: true });
  expect(changes.check([process.cwd()])).toBe(true);
  expect(changes.check()).toBe(false);
  mkdirSync("sda");
  writeFileSync("sda/main.ts", "restored");
  expect(changes.check([process.cwd()])).toBe(true);
  expect(changes.check()).toBe(false);
});

test("does not retain deleted event paths as missing files", () => {
  const changes = fixture();
  const path = resolve("sda/temporary.txt");
  for (let n = 0; n < 20; n++) {
    writeFileSync(path, String(n));
    expect(changes.check([path])).toBe(true);
    rmSync(path);
    expect(changes.check([path])).toBe(true);
    expect(changes.check()).toBe(false);
  }
});

test.skipIf(process.platform === "win32")("does not follow directory symlinks", () => {
  const changes = fixture();
  mkdirSync("outside");
  symlinkSync(resolve("outside"), "sda/link", "dir");
  expect(changes.check()).toBe(true);
  writeFileSync("outside/value.txt", "one");
  expect(changes.check()).toBe(false);
});
