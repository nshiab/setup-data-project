import { SUPPORTED_PACKAGES } from "./packageRegistry.ts";

export interface CliOptions {
  help: boolean;
  docs: boolean;
  packages: string[];
}

const packageFlags = new Map(
  SUPPORTED_PACKAGES.map((pkg) => [
    `--${pkg.label.replace(/^simple-data-analysis/, "sda").replace(/^journalism-/, "")}`,
    pkg.value,
  ]),
);

export const CLI_HELP = `Usage: setup-data-project [library flags | --docs] [--help]

${Array.from(packageFlags, ([flag, pkg]) => `  ${flag.padEnd(16)} Select ${pkg}.`).join("\n")}
  --docs            Refresh documentation only for installed libraries.
  -h, --help        Show this help and exit.

Without a package flag, choose packages interactively.
Combine package flags to select libraries without prompting.
Package flags keep existing versions and still set up project files and docs.`;

export function parseArguments(args: string[]): CliOptions {
  const options: CliOptions = { help: false, docs: false, packages: [] };

  for (const arg of args) {
    const pkg = packageFlags.get(arg);
    if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else if (arg === "--docs") {
      options.docs = true;
    } else if (pkg) {
      if (!options.packages.includes(pkg)) options.packages.push(pkg);
    } else {
      throw new Error(`Unknown argument: ${arg}. Use --help for usage.`);
    }
  }

  if (options.docs && options.packages.length > 0)
    throw new Error("--docs cannot be combined with package flags.");
  return options;
}
