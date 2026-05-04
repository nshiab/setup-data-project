/**
 * Creates a temporary directory for tests and returns its path and a cleanup function.
 */
export function createTestDir(): { tempDir: string; cleanup: () => void } {
  const tempDir = Deno.makeTempDirSync({ prefix: "setup_data_project_test_" });

  const cleanup = () => {
    try {
      Deno.removeSync(tempDir, { recursive: true });
    } catch (err) {
      console.error(`Failed to cleanup temp dir ${tempDir}:`, err);
    }
  };

  return { tempDir, cleanup };
}
