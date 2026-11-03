// Build both revisions first, then compare their dist/sda.mjs files:
// node scripts/benchmarkWatch.ts <baseline-runner> <candidate-runner> [files] [repetitions] [reruns] [collect|natural]
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { isObject } from "../src/helpers/jsonObject.ts";

type Sample = {
  rssMiB: number;
  heapMiB: number;
  peakRSSMiB: number;
  metadataCalls: number | null;
  datasetReads: number | null;
  cpuMs: number;
  rerunMs?: number;
};

const [baseline, candidate, files = "100000", repetitions = "3", reruns = "1", gcMode = "collect"] =
  process.argv.slice(2);
assert.ok(baseline && candidate, "Pass the baseline and candidate runner paths.");
for (const value of [files, repetitions, reruns]) assert.match(value, /^\d+$/);
assert.ok(Number(repetitions) > 0 && Number(reruns) > 0);
assert.ok(gcMode === "collect" || gcMode === "natural");
const runners = [resolve(baseline), resolve(candidate)];
for (const runner of runners) assert.ok(existsSync(runner), `Missing runner: ${runner}`);
const directory = mkdtempSync(join(tmpdir(), "sda-watch-benchmark-"));
const ready = join(directory, "ready");
const preload = join(directory, "preload.mjs");
const results: { label: string; initial: Sample; updates: Sample[]; afterCollection: Sample }[] =
  [];

async function measure(runner: string, label: string) {
  rmSync(ready, { force: true });
  const child = spawn(
    process.execPath,
    [
      "--expose-gc",
      "--import",
      preload,
      runner,
      "--watch",
      "sda/main.ts",
      "sda",
      ".env",
      "--ignore",
      "sda/output",
    ],
    { cwd: directory, stdio: ["ignore", "pipe", "pipe", "ipc"] },
  );
  const closed = once(child, "close");
  let output = "";
  for (const stream of [child.stdout, child.stderr]) {
    assert.ok(stream);
    stream.on("data", (data: Buffer) => (output = (output + data.toString()).slice(-4000)));
  }
  const waitForAnalysis = async () => {
    const deadline = performance.now() + 60000;
    while (!existsSync(ready)) {
      assert.equal(child.exitCode, null, output);
      assert.ok(performance.now() < deadline, `Watcher timed out: ${output}`);
      await delay(10);
    }
    const completed = performance.now();
    // Settle delayed OS notifications before sampling. This is benchmark-only;
    // the runner itself retains its immediate scheduling.
    await delay(200);
    return completed;
  };
  const sample = async (collect = false): Promise<Sample> => {
    const message = once(child, "message", { signal: AbortSignal.timeout(10000) });
    child.send(collect ? "collect" : "sample");
    const result: unknown = (await message)[0];
    assert.ok(isObject(result));
    assert.ok(typeof result.rssMiB === "number");
    assert.ok(typeof result.heapMiB === "number");
    assert.ok(typeof result.peakRSSMiB === "number");
    assert.ok(result.metadataCalls === null || typeof result.metadataCalls === "number");
    assert.ok(result.datasetReads === null || typeof result.datasetReads === "number");
    assert.ok(typeof result.cpuMs === "number");
    assert.ok(result.datasetReads === null || result.datasetReads === 0);
    return {
      rssMiB: result.rssMiB,
      heapMiB: result.heapMiB,
      peakRSSMiB: result.peakRSSMiB,
      metadataCalls: result.metadataCalls,
      datasetReads: result.datasetReads,
      cpuMs: result.cpuMs,
    };
  };
  try {
    await waitForAnalysis();
    const initial = await sample();
    const updates: Sample[] = [];
    for (let n = 0; n < Number(reruns); n++) {
      rmSync(ready);
      const started = performance.now();
      writeFileSync(join(directory, "sda/main.ts"), entry + `\n// edit ${n}\n`);
      const completed = await waitForAnalysis();
      updates.push({ ...(await sample()), rerunMs: completed - started });
    }
    const afterCollection = await sample(true);
    const result = { label, initial, updates, afterCollection };
    results.push(result);
    const last = updates.at(-1);
    assert.ok(last);
    process.stderr.write(`${label}: ${last.peakRSSMiB.toFixed(1)} MiB peak\n`);
  } finally {
    child.kill("SIGTERM");
    await closed;
  }
}

const entry = 'import { writeFileSync } from "node:fs"; writeFileSync("ready", "");';
try {
  mkdirSync(join(directory, "sda/data"), { recursive: true });
  mkdirSync(join(directory, "sda/output"));
  writeFileSync(join(directory, ".env"), "");
  writeFileSync(
    join(directory, "package.json"),
    JSON.stringify({ type: "module", scripts: { fix: "node fix.cjs" } }),
  );
  writeFileSync(join(directory, "fix.cjs"), "");
  writeFileSync(join(directory, "sda/main.ts"), entry);
  for (let n = 0; n < Number(files); n++)
    writeFileSync(join(directory, "sda/data", `file-${String(n).padStart(6, "0")}.dat`), "");
  writeFileSync(
    preload,
    `
import fs from "node:fs";
import { syncBuiltinESMExports } from "node:module";
let metadataCalls = 0;
let datasetReads = 0;
let previousCpu = process.cpuUsage();
const stat = fs.lstatSync;
fs.lstatSync = function (...args) {
  if (args[1]?.bigint) metadataCalls++;
  return stat.apply(this, args);
};
const read = fs.readFileSync;
fs.readFileSync = function (...args) {
  if (String(args[0]).replaceAll(String.fromCharCode(92), "/").includes("/sda/data/")) datasetReads++;
  return read.apply(this, args);
};
syncBuiltinESMExports();
// Bun's named builtin imports bypass these hooks, so its counters are unavailable.
process.on("message", (mode) => {
  const rssMiB = process.memoryUsage().rss / 1024 ** 2;
  const cpu = process.cpuUsage(previousCpu);
  if (${gcMode === "collect"} || mode === "collect") {
    if (process.versions.bun) { Bun.gc(true); Bun.gc(true); }
    else { globalThis.gc(); globalThis.gc(); }
  }
  previousCpu = process.cpuUsage();
  process.send({ rssMiB, heapMiB: process.memoryUsage().heapUsed / 1024 ** 2,
    peakRSSMiB: process.resourceUsage().maxRSS / 1024,
    metadataCalls: process.versions.bun ? null : metadataCalls,
    datasetReads: process.versions.bun ? null : datasetReads,
    cpuMs: (cpu.user + cpu.system) / 1000 });
  metadataCalls = 0;
  datasetReads = 0;
});
`,
  );
  for (let n = 0; n < Number(repetitions); n++) {
    // Alternate order so filesystem cache and machine warmup do not consistently
    // favor either revision. Reuse exactly the same fixture paths for both.
    for (const i of n % 2 ? [1, 0] : [0, 1])
      await measure(runners[i], i === 0 ? "baseline" : "candidate");
  }
  console.log(
    JSON.stringify(
      {
        node: process.version,
        bun: process.versions.bun,
        fsCountersSupported: !process.versions.bun,
        platform: process.platform,
        files: Number(files),
        gcMode,
        results,
      },
      null,
      2,
    ),
  );
} finally {
  rmSync(directory, { recursive: true, force: true });
}
