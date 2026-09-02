import { existsSync, readFileSync, writeFileSync } from "node:fs";

type Runtime = "deno" | "node" | "bun";
type ManifestConfig = Record<string, unknown>;

export class ProjectManifest {
  readonly #path: string;
  readonly #taskKey: "tasks" | "scripts";
  readonly #dependencyKeys: string[];
  #config: ManifestConfig;

  private constructor(
    path: string,
    taskKey: "tasks" | "scripts",
    dependencyKeys: string[],
    config: ManifestConfig,
  ) {
    this.#path = path;
    this.#taskKey = taskKey;
    this.#dependencyKeys = dependencyKeys;
    this.#config = config;
  }

  static open(runtime: Runtime): ProjectManifest {
    if (existsSync("deno.json")) {
      return new ProjectManifest(
        "deno.json",
        "tasks",
        ["imports"],
        readManifest("deno.json"),
      );
    }

    if (existsSync("package.json")) {
      return new ProjectManifest(
        "package.json",
        "scripts",
        ["dependencies", "devDependencies"],
        readManifest("package.json"),
      );
    }

    return runtime === "deno"
      ? new ProjectManifest("deno.json", "tasks", ["imports"], { tasks: {} })
      : new ProjectManifest(
        "package.json",
        "scripts",
        ["dependencies", "devDependencies"],
        { name: "data-project", type: "module", scripts: {} },
      );
  }

  reload(): void {
    this.#config = readManifest(this.#path);
  }

  getInstalledPackages(): string[] {
    return Object.keys(this.getInstalledPackageSpecifiers());
  }

  getInstalledPackageSpecifiers(): Record<string, string> {
    const installed: Record<string, string> = {};

    for (const key of this.#dependencyKeys) {
      const dependencies = this.#config[key];
      if (
        dependencies && typeof dependencies === "object" &&
        !Array.isArray(dependencies)
      ) {
        for (const [name, specifier] of Object.entries(dependencies)) {
          if (typeof specifier === "string") {
            installed[name] = specifier;
          }
        }
      }
    }

    return installed;
  }

  updateTasks(tasks: Record<string, string>): void {
    const currentTasks = this.#config[this.#taskKey];
    const existingTasks = currentTasks && typeof currentTasks === "object" &&
        !Array.isArray(currentTasks)
      ? currentTasks as Record<string, unknown>
      : {};

    this.#config[this.#taskKey] = { ...existingTasks, ...tasks };
    writeFileSync(
      this.#path,
      JSON.stringify(this.#config, null, 2) + "\n",
      "utf-8",
    );
  }
}

function readManifest(path: string): ManifestConfig {
  try {
    const parsed: unknown = JSON.parse(readFileSync(path, "utf-8"));
    if (
      parsed === null || typeof parsed !== "object" || Array.isArray(parsed)
    ) {
      throw new SyntaxError("the root value must be a JSON object");
    }
    return parsed as ManifestConfig;
  } catch (error) {
    const detail = error instanceof Error ? ` ${error.message}` : "";
    throw new Error(`Failed to parse ${path}.${detail}`, { cause: error });
  }
}
