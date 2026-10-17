import process from "node:process";
export type Runtime = "node" | "bun";
export function getRuntime(versions: { bun?: string; node?: string } = process.versions): Runtime {
  return versions.bun ? "bun" : "node";
}
