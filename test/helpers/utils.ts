import { log } from "@clack/prompts";
import { afterEach, beforeEach, vi } from "vite-plus/test";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
export function temporaryProject() {
  let cwd: string;
  let directory: string;
  beforeEach(() => {
    vi.spyOn(log, "info").mockImplementation(() => {});
    cwd = process.cwd();
    directory = mkdtempSync(join(tmpdir(), "setup-project-test-"));
    process.chdir(directory);
  });
  afterEach(() => {
    process.chdir(cwd);
    rmSync(directory, { recursive: true, force: true });
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });
}
