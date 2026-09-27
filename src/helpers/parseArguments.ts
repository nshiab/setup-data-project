export interface CliOptions {
  help: boolean;
  package?: string;
}

export const CLI_HELP = `Usage: setup-data-project [--sda | --sda-core] [--help]

  --sda       Select simple-data-analysis without prompting.
  --sda-core  Select simple-data-analysis-core without prompting.
  -h, --help  Show this help and exit.

Without a package flag, choose packages interactively.
Package flags keep existing versions and still set up project files and docs.
--sda and --sda-core cannot be combined.`;

export function parseArguments(args: string[]): CliOptions {
  const options: CliOptions = { help: false };

  for (const arg of args) {
    if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else if (arg === "--sda" || arg === "--sda-core") {
      const pkg = arg === "--sda"
        ? "@nshiab/simple-data-analysis"
        : "@nshiab/simple-data-analysis-core";
      if (options.package && options.package !== pkg) {
        throw new Error("--sda and --sda-core cannot be combined.");
      }
      options.package = pkg;
    } else {
      throw new Error(`Unknown argument: ${arg}. Use --help for usage.`);
    }
  }

  return options;
}
