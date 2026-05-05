import process from "node:process";

export const runtimeConfig = {
  getRuntime: () => {
    if (
      typeof process !== "undefined" &&
      process?.versions?.node &&
      !process?.versions?.deno
    ) {
      return "node";
    }
    if ("Bun" in globalThis) return "bun";
    if ("Deno" in globalThis) return "deno";
    return "node";
  },
};

export function getRuntime() {
  return runtimeConfig.getRuntime();
}
