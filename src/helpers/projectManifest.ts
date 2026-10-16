import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { isObject } from "./jsonObject.ts";
export class ProjectManifest {
  #config: Record<string, unknown>;
  private constructor(config: Record<string, unknown>) {
    this.#config = config;
  }
  static open(): ProjectManifest {
    if (!existsSync("package.json"))
      return new ProjectManifest({ name: "data-project", private: true, type: "module" });
    const config: unknown = JSON.parse(readFileSync("package.json", "utf8"));
    if (!isObject(config)) throw new Error("package.json must contain a JSON object.");
    return new ProjectManifest(config);
  }
  reload(): void {
    this.#config = ProjectManifest.open().#config;
  }
  getInstalledPackages(): string[] {
    return Object.keys(this.getInstalledPackageSpecifiers());
  }
  getInstalledPackageSpecifiers(): Record<string, string> {
    const packages: Record<string, string> = {};
    for (const key of ["dependencies", "devDependencies"]) {
      const dependencies = this.#config[key];
      if (isObject(dependencies))
        for (const [name, version] of Object.entries(dependencies)) {
          if (typeof version === "string") packages[name] = version;
        }
    }
    return packages;
  }
  updateTasks(tasks: Record<string, string>): void {
    if (this.#config.type === "commonjs") {
      throw new Error(
        'Setup requires an ESM project. Set "type": "module" in package.json, or use --docs to refresh documentation only.',
      );
    }
    if (this.#config.type === undefined) this.#config.type = "module";
    const existing = this.#config.scripts;
    this.#config.scripts = { ...tasks, ...(isObject(existing) ? existing : {}) };
    writeFileSync("package.json", JSON.stringify(this.#config, null, 2) + "\n");
  }
}
