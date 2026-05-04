import process from "node:process";

export const runtimeConfig = {
  getRuntime: () => {
    if ("Deno" in globalThis) return "deno";
    if ("Bun" in globalThis) return "bun";
    if (typeof process !== "undefined" && process?.versions?.node) {
      return "node";
    }
    return "node";
  },
};

export function getRuntime() {
  return runtimeConfig.getRuntime();
}
