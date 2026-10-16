import { execFile } from "node:child_process";
import { getRuntime } from "./getRuntime.ts";
export function runPackageManager(args: string[]): Promise<void> {
  const command = getRuntime() === "bun" ? "bun" : process.platform === "win32" ? "npm.cmd" : "npm";
  return new Promise((resolve, reject) => {
    execFile(
      command,
      args,
      { maxBuffer: 10 * 1024 * 1024, shell: process.platform === "win32" },
      (error, stdout, stderr) => {
        if (error)
          reject(
            new Error(`${command} ${args.join(" ")} failed.\n${stderr || stdout}`, {
              cause: error,
            }),
          );
        else resolve();
      },
    );
  });
}
export async function installPackages(
  packages: string[],
  options: { development?: boolean } = {},
): Promise<void> {
  if (packages.length === 0) return;
  const bun = getRuntime() === "bun";
  await runPackageManager([
    bun ? "add" : "install",
    ...(options.development ? (bun ? ["--dev", "--exact"] : ["--save-dev", "--save-exact"]) : []),
    ...packages,
  ]);
}
