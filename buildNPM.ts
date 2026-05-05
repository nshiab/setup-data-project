import { build, emptyDir } from "@deno/dnt";
// Import your deno.json using import attributes
import denoConfig from "./deno.json" with { type: "json" };

await emptyDir("./npm");

// 1. Dynamically map JSR exports to dnt entry points
const entryPoints = [];
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

// 2. Build using the config
await build({
  entryPoints: entryPoints,
  outDir: "./npm",
  shims: {
    deno: true,
  },
  test: false,
  package: {
    name: denoConfig.name,
    version: denoConfig.version,
    // Add this block right here!
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
