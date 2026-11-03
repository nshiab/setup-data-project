import { lstatSync, readdirSync } from "node:fs";
import { join, sep } from "node:path";

type Entry = { value: string | null; generation: number };
const within = (path: string, root: string) => path === root || path.startsWith(root + sep);

// Keep one metadata index. Event paths narrow checks between runs; a full check
// after formatting catches edits even when filesystem notifications arrive late.
export function createFileChanges(selected: string[], excluded: (path: string) => boolean) {
  const files = new Map<string, Entry>();
  let generation = 0;

  function check(paths?: Iterable<string>) {
    const roots = new Set<string>();
    for (const path of generation === 0 || paths === undefined ? selected : paths) {
      if (excluded(path)) continue;
      for (const root of selected) {
        if (within(path, root)) roots.add(path);
        else if (within(root, path)) roots.add(root);
      }
    }
    if (!roots.size) return false;
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

    function collect(path: string): boolean {
      if (excluded(path)) return false;
      const previous = files.get(path);
      if (previous?.generation === generation) return previous.value === "directory";
      const wasDirectory = previous?.value === "directory";
      try {
        const stat = lstatSync(path, { bigint: true });
        if (stat.isDirectory()) {
          update(path, "directory");
          for (const name of readdirSync(path)) collect(join(path, name));
          return true;
        }
        update(path, [stat.dev, stat.ino, stat.size, stat.mtimeNs, stat.ctimeNs].join(":"));
        return wasDirectory;
      } catch (error) {
        if (
          !(error instanceof Error) ||
          !("code" in error) ||
          (error.code !== "ENOENT" && error.code !== "ENOTDIR")
        )
          throw error;
        if (selected.includes(path)) update(path, null);
        else if (files.delete(path)) changed = true;
        return true;
      }
    }

    const subtrees = [...roots].filter(collect);
    // File-only events need no walk of the index. Subtree checks also remove
    // entries that disappeared, without allocating another map or a seen set.
    if (subtrees.length) {
      for (const [path, entry] of files) {
        if (entry.generation !== generation && subtrees.some((root) => within(path, root))) {
          files.delete(path);
          changed = true;
        }
      }
    }
    return changed;
  }

  return { check };
}
