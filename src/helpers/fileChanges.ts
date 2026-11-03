import { lstatSync, readdirSync } from "node:fs";
import { join } from "node:path";

type Entry = { value: string | null; generation: number };
// Reconcile the selected tree into one metadata index. Always start at the
// selected roots: event paths can be incomplete or stale after a directory move.
export function createFileChanges(selected: string[], excluded: (path: string) => boolean) {
  const files = new Map<string, Entry>();
  let generation = 0;

  function check() {
    generation++;
    let changed = false;

    function update(path: string, value: string | null) {
      const previous = files.get(path);
      if (previous) {
        if (previous.value !== value) {
          previous.value = value;
          changed = true;
        }
        previous.generation = generation;
      } else {
        files.set(path, { value, generation });
        changed = true;
      }
    }

    function collect(path: string) {
      if (excluded(path) || files.get(path)?.generation === generation) return;
      try {
        const stat = lstatSync(path, { bigint: true });
        if (stat.isDirectory()) {
          const names = readdirSync(path);
          update(path, "directory");
          for (const name of names) collect(join(path, name));
        } else {
          update(path, [stat.dev, stat.ino, stat.size, stat.mtimeNs, stat.ctimeNs].join(":"));
        }
      } catch (error) {
        if (
          !(error instanceof Error) ||
          !("code" in error) ||
          (error.code !== "ENOENT" && error.code !== "ENOTDIR")
        )
          throw error;
        update(path, null);
      }
    }

    for (const path of selected) collect(path);
    // Remove entries not visited in this check without allocating a second map.
    for (const [path, entry] of files) {
      if (entry.generation !== generation) {
        files.delete(path);
        changed = true;
      }
    }
    return changed;
  }

  return { check };
}
