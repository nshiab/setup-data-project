import { assertEquals, assertStringIncludes } from "@std/assert";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { ensureAgents } from "../src/helpers/ensureAgents.ts";
import { fetchPlotDocs } from "../src/helpers/fetchPlotDocs.ts";
import { getInstalledPackageConfigs } from "../src/helpers/packageRegistry.ts";
import { PACKAGE_OPTIONS } from "../src/helpers/packageOptions.ts";
import { syncPackageDocs } from "../src/helpers/syncPackageDocs.ts";
import { createTestDir } from "./helpers/utils.ts";

const pages = [
  "api.md",
  "getting-started.md",
  "what-is-plot.md",
  "features/scales.md",
  "marks/dot.md",
  "transforms/bin.md",
  "interactions/pointer.md",
];

async function withPlotFixture(
  run: (urls: string[]) => Promise<void>,
  options: { failedPage?: string; truncated?: boolean; treeFailure?: boolean } =
    {},
) {
  const { tempDir, cleanup } = createTestDir();
  const cwd = Deno.cwd();
  const originalFetch = globalThis.fetch;
  const urls: string[] = [];
  Deno.chdir(tempDir);
  globalThis.fetch = ((input: string | URL | Request) => {
    const url = String(input);
    urls.push(url);
    if (url.startsWith("https://api.github.com/")) {
      return Promise.resolve(Response.json({
        truncated: options.truncated ?? false,
        tree: [
          ...pages.map((page) => ({ type: "blob", path: `docs/${page}` })),
          {
            type: "blob",
            path: "docs/../../escape.md",
          },
          { type: "blob", path: "test/ignored.md" },
        ],
      }, { status: options.treeFailure ? 503 : 200 }));
    }
    return Promise.resolve(
      new Response(
        "# Plot example\n\n## dot(*data*, *options*) {#dot}\n\n[Dot](./marks/dot.md)\n:::plot\nPlot.dot(data)\n:::\n",
        {
          status: options.failedPage && url.endsWith(options.failedPage)
            ? 404
            : 200,
        },
      ),
    );
  }) as typeof fetch;
  try {
    await run(urls);
  } finally {
    globalThis.fetch = originalFetch;
    Deno.chdir(cwd);
    cleanup();
  }
}

Deno.test("Plot docs - discovers tagged pages and preserves source, links, and repeat output", async () => {
  await withPlotFixture(async (urls) => {
    assertEquals(getInstalledPackageConfigs(["@observablehq/plot"]).length, 1);
    assertEquals(
      PACKAGE_OPTIONS.some((pkg) => pkg.value === "@observablehq/plot"),
      false,
    );
    writeFileSync(
      "AGENTS.md",
      "User instructions\n" +
        "<!-- Do not remove / setup-data-project:agents:start -->\n" +
        "<!-- Do not remove / setup-data-project:agents:end -->\n",
    );
    const mapping = await syncPackageDocs(["@observablehq/plot"], {
      "@observablehq/plot": "0.6.17",
    });
    assertEquals(mapping["@observablehq/plot"].plot?.pages, [...pages].sort());
    assertEquals(urls.length, pages.length + 1);
    assertEquals(urls.every((url) => url.includes("v0.6.17")), true);
    assertEquals(existsSync("escape.md"), false);
    const dot = readFileSync("docs/observable-plot/marks/dot.md", "utf8");
    assertStringIncludes(dot, "[Dot](./marks/dot.md)");
    assertStringIncludes(dot, ":::plot");
    const index = readFileSync("docs/observable-plot/INDEX.md", "utf8");
    assertStringIncludes(index, "[dot(*data*, *options*)](marks/dot.md#dot)");
    assertStringIncludes(index, "[features/scales.md](features/scales.md)");
    const source = readFileSync("docs/observable-plot/source.json", "utf8");
    assertEquals(JSON.parse(source), {
      package: "@observablehq/plot",
      version: "0.6.17",
      tag: "v0.6.17",
      source: "https://github.com/observablehq/plot/tree/v0.6.17/docs",
      complete: true,
      fetched: [...pages].sort(),
      failed: [],
    });
    ensureAgents(mapping, "deno", ["@observablehq/plot"]);
    const agents = readFileSync("AGENTS.md", "utf8");
    assertStringIncludes(agents, "User instructions");
    assertStringIncludes(agents, "./docs/observable-plot/INDEX.md");
    assertStringIncludes(agents, 'import * as Plot from "@observablehq/plot"');
    assertStringIncludes(agents, "journalism-dataviz charting documentation");
    ensureAgents(
      await syncPackageDocs(["@observablehq/plot"], {
        "@observablehq/plot": "0.6.17",
      }),
      "deno",
      ["@observablehq/plot"],
    );
    assertEquals(readFileSync("AGENTS.md", "utf8"), agents);
    assertEquals(readFileSync("docs/observable-plot/INDEX.md", "utf8"), index);
    assertEquals(
      readFileSync("docs/observable-plot/source.json", "utf8"),
      source,
    );
  });
});

Deno.test("Plot docs - partial refresh preserves failed pages and excludes guide", async () => {
  await withPlotFixture(async () => {
    mkdirSync("docs/observable-plot/marks", { recursive: true });
    writeFileSync("docs/observable-plot/marks/dot.md", "old dot");
    ensureAgents(
      { "@observablehq/plot": { plot: { version: "0.6.16", pages } } },
      "node",
      ["@observablehq/plot"],
    );
    const mapping = await syncPackageDocs(["@observablehq/plot"], {
      "@observablehq/plot": "0.6.17",
    });
    assertEquals(mapping, {});
    assertEquals(
      readFileSync("docs/observable-plot/marks/dot.md", "utf8"),
      "old dot",
    );
    const source = JSON.parse(
      readFileSync("docs/observable-plot/source.json", "utf8"),
    );
    assertEquals(source.complete, false);
    assertEquals(source.failed, ["marks/dot.md"]);
    ensureAgents(mapping, "node", ["@observablehq/plot"]);
    assertEquals(
      readFileSync("AGENTS.md", "utf8").includes("./docs/observable-plot"),
      false,
    );
  }, { failedPage: "marks/dot.md" });
});

for (const options of [{ truncated: true }, { treeFailure: true }]) {
  Deno.test(`Plot docs - preserves files on incomplete tree ${JSON.stringify(options)}`, async () => {
    await withPlotFixture(async (urls) => {
      mkdirSync("docs/observable-plot", { recursive: true });
      writeFileSync("docs/observable-plot/api.md", "old API");
      assertEquals(await fetchPlotDocs("0.6.17"), {});
      assertEquals(urls.length, 1);
      assertEquals(
        readFileSync("docs/observable-plot/api.md", "utf8"),
        "old API",
      );
    }, options);
  });
}

Deno.test("Plot docs - unresolved version does not fetch or advertise local documentation", async () => {
  await withPlotFixture(async (urls) => {
    const mapping = await syncPackageDocs(["@observablehq/plot"], {});
    assertEquals(mapping, {});
    assertEquals(urls, []);
    ensureAgents(mapping, "bun", ["@observablehq/plot"]);
    assertEquals(
      readFileSync("AGENTS.md", "utf8").includes(
        "exact installed library versions",
      ),
      false,
    );
  });
});
