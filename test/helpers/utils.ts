import { log } from "@clack/prompts";

/**
 * Creates a temporary directory for tests and returns its path and a cleanup function.
 */
export function createTestDir(): { tempDir: string; cleanup: () => void } {
  const tempDir = Deno.makeTempDirSync({ prefix: "setup_data_project_test_" });

  // Suppress clack logs during tests
  const originalMessage = log.message;
  const originalStep = log.step;
  const originalSuccess = log.success;
  const originalWarn = log.warn;
  const originalError = log.error;
  const originalInfo = log.info;

  log.message = () => {};
  log.step = () => {};
  log.success = () => {};
  log.warn = () => {};
  log.error = () => {};
  log.info = () => {};

  const cleanup = () => {
    // Restore clack logs
    log.message = originalMessage;
    log.step = originalStep;
    log.success = originalSuccess;
    log.warn = originalWarn;
    log.error = originalError;
    log.info = originalInfo;

    try {
      Deno.removeSync(tempDir, { recursive: true });
    } catch (err) {
      console.error(`Failed to cleanup temp dir ${tempDir}:`, err);
    }
  };

  return { tempDir, cleanup };
}
