import { build, emptyDir } from "@deno/dnt";
// Import your deno.json using import attributes
import denoConfig from "./deno.json" with { type: "json" };

await emptyDir("./npm");

const entryPoints = [];

// 1. Dynamically map JSR exports to dnt entry points
if (typeof denoConfig.exports === "string") {
  entryPoints.push(denoConfig.exports);
} else if (typeof denoConfig.exports === "object") {
  for (const [key, value] of Object.entries(denoConfig.exports)) {
    if (key === ".") {
      // Main entry point
      entryPoints.push(value as string);
    } else {
      // Sub-path entry points (e.g., "./web")
      entryPoints.push({ name: key, path: value as string });
    }
  }
}

// 2. Dynamically map Deno bins to dnt executable entry points (for npx)
if (denoConfig.bin) {
  if (typeof denoConfig.bin === "string") {
    // If it's just a string, use the package name (without the @scope/)
    const cliName = denoConfig.name.split("/").pop() || "cli";
    entryPoints.push({
      kind: "bin" as const,
      name: cliName,
      path: denoConfig.bin,
    });
  } else if (typeof denoConfig.bin === "object") {
    // If it's an object, map each command name to its file
    for (const [key, value] of Object.entries(denoConfig.bin)) {
      entryPoints.push({
        kind: "bin" as const,
        name: key,
        path: value as string,
      });
    }
  }
}

// 3. Build using the config
await build({
  entryPoints: entryPoints,
  outDir: "./npm",
  typeCheck: false,
  shims: {
    deno: false,
  },
  // Disable tests so it doesn't fail on newer @std/assert methods
  test: false,
  package: {
    name: denoConfig.name,
    version: denoConfig.version,
    // Forces npm to accept scoped packages for free without the 402 error
    publishConfig: {
      access: "public",
    },
    // deno-lint-ignore no-explicit-any
    description: (denoConfig as any).description,
    license: denoConfig.license,
    repository: {
      type: "git",
      // deno-lint-ignore no-explicit-any
      url: (denoConfig as any).repository,
    },
  },
  postBuild() {
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});
