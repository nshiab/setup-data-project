import { assertEquals, assertStringIncludes } from "@std/assert";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { combinePlotDocs } from "../src/helpers/combinePlotDocs.ts";
import { PLOT_DOC_PAGES } from "../src/helpers/plotDocPages.ts";
import { ensureAgents } from "../src/helpers/ensureAgents.ts";
import { fetchPlotDocs } from "../src/helpers/fetchPlotDocs.ts";
import { getInstalledPackageConfigs } from "../src/helpers/packageRegistry.ts";
import { PACKAGE_OPTIONS } from "../src/helpers/packageOptions.ts";
import { syncPackageDocs } from "../src/helpers/syncPackageDocs.ts";
import { createTestDir } from "./helpers/utils.ts";

const pages = PLOT_DOC_PAGES;
const pageContent =
  "# Plot example\n\n## dot(*data*, *options*) {#dot}\n\n[Dot](../marks/dot.md)\n:::plot\nPlot.dot(data)\n:::\n";
const cachedReference = (version = "0.6.17") =>
  combinePlotDocs(version, new Map(pages.map((page) => [page, pageContent])));

Deno.test("Plot docs - formatted repository reference uses one request", async () => {
  const stored = readFileSync(
    new URL("../docs-cache/observable-plot/0.6.17/llm.md", import.meta.url),
    "utf8",
  );
  await withPlotFixture(async (urls) => {
    const docs = await fetchPlotDocs("0.6.17");
    assertEquals(docs.llm, stored);
    assertEquals(urls.length, 1);
    assertEquals(docs.plot?.pages, pages);
  }, { stored });
});

async function withPlotFixture(
  run: (urls: string[]) => Promise<void>,
  options: {
    failedPage?: string;
    stored?: string | "network-error";
    upstreamFailure?: boolean;
  } = {},
) {
  const { tempDir, cleanup } = createTestDir();
  const cwd = Deno.cwd();
  const originalFetch = globalThis.fetch;
  const urls: string[] = [];
  Deno.chdir(tempDir);
  globalThis.fetch = ((input: string | URL | Request) => {
    const url = String(input);
    urls.push(url);
    if (url.includes("/docs-cache/")) {
      if (options.stored === "network-error") {
        return Promise.reject(new Error("Cache unavailable"));
      }
      return Promise.resolve(
        new Response(options.stored ?? "Not found", {
          status: options.stored ? 200 : 404,
        }),
      );
    }
    return Promise.resolve(
      new Response(
        pageContent,
        {
          status: options.upstreamFailure ||
              (options.failedPage && url.endsWith(options.failedPage))
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

Deno.test("Plot docs - cache miss fetches only selected tagged pages and preserves repeat output", async () => {
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
    assertEquals(
      urls[0],
      "https://raw.githubusercontent.com/nshiab/setup-data-project/refs/heads/main/docs-cache/observable-plot/0.6.17/llm.md",
    );
    assertEquals(
      urls.slice(1).every((url) => url.includes("/refs/tags/v0.6.17/docs/")),
      true,
    );
    assertEquals(pages.length, 42);
    assertEquals(
      pages.filter((page) => page.startsWith("features/")).length,
      8,
    );
    assertEquals(pages.filter((page) => page.startsWith("marks/")).length, 28);
    assertEquals(
      pages.filter((page) => page.startsWith("transforms/")).length,
      6,
    );
    for (
      const excluded of [
        "api.md",
        "index.md",
        "getting-started.md",
        "what-is-plot.md",
        "interactions/pointer.md",
        "marks/auto.md",
        "marks/tip.md",
        "features/interactions.md",
        "transforms/window.md",
      ]
    ) {
      assertEquals(
        urls.some((url) => url.endsWith(`/docs/${excluded}`)),
        false,
      );
    }
    assertEquals(existsSync("escape.md"), false);
    const llm = readFileSync("docs/observable-plot/llm.md", "utf8");
    assertEquals(mapping["@observablehq/plot"].llm, llm);

    assertStringIncludes(
      llm,
      "[dot(*data*, *options*)](#plot-marks--dot--dot)",
    );
    assertStringIncludes(llm, "[features/scales.md](#plot-features--scales)");
    assertStringIncludes(llm, "`@observablehq/plot@0.6.17`");
    assertStringIncludes(
      llm,
      "[v0.6.17](https://github.com/observablehq/plot/tree/v0.6.17/docs)",
    );
    assertEquals(
      [...Deno.readDirSync("docs/observable-plot")].map((entry) => entry.name),
      ["llm.md"],
    );
    ensureAgents(mapping, "deno", ["@observablehq/plot"]);
    const agents = readFileSync("AGENTS.md", "utf8");
    assertStringIncludes(agents, "User instructions");
    assertStringIncludes(agents, "./docs/observable-plot/llm.md");
    assertStringIncludes(agents, 'import { plot } from "@observablehq/plot"');
    assertStringIncludes(
      agents,
      "use Observable Plot to create charts and maps with `writeChart` and `writeMap`",
    );

    assertEquals(agents.includes("source.json"), false);
    ensureAgents(
      await syncPackageDocs(["@observablehq/plot"], {
        "@observablehq/plot": "0.6.17",
      }),
      "deno",
      ["@observablehq/plot"],
    );
    assertEquals(readFileSync("AGENTS.md", "utf8"), agents);
    assertEquals(readFileSync("docs/observable-plot/llm.md", "utf8"), llm);
  });
});

Deno.test("Plot docs - partial refresh preserves failed pages and excludes guide", async () => {
  await withPlotFixture(async () => {
    mkdirSync("docs/observable-plot", { recursive: true });
    writeFileSync("docs/observable-plot/llm.md", "old reference for 0.6.16");
    writeFileSync("docs/observable-plot/custom.md", "user notes");
    ensureAgents(
      {
        "@observablehq/plot": {
          llm: "old reference",
          plot: { version: "0.6.16", pages },
        },
      },
      "node",
      ["@observablehq/plot"],
    );
    const mapping = await syncPackageDocs(["@observablehq/plot"], {
      "@observablehq/plot": "0.6.17",
    });
    assertEquals(mapping, {});
    assertEquals(
      readFileSync("docs/observable-plot/llm.md", "utf8"),
      "old reference for 0.6.16",
    );
    assertEquals(
      readFileSync("docs/observable-plot/custom.md", "utf8"),
      "user notes",
    );
    assertEquals(
      [...Deno.readDirSync("docs/observable-plot")].map((entry) => entry.name)
        .sort(),
      ["custom.md", "llm.md"],
    );
    ensureAgents(mapping, "node", ["@observablehq/plot"]);
    assertEquals(
      readFileSync("AGENTS.md", "utf8").includes("./docs/observable-plot"),
      false,
    );
  }, { failedPage: "marks/dot.md" });
});

Deno.test("Plot docs - failed fallback preserves the existing reference", async () => {
  await withPlotFixture(async (urls) => {
    mkdirSync("docs/observable-plot", { recursive: true });
    writeFileSync("docs/observable-plot/llm.md", "old API");
    assertEquals(await fetchPlotDocs("0.6.17"), {});
    assertEquals(urls.length, pages.length + 1);
    assertEquals(
      readFileSync("docs/observable-plot/llm.md", "utf8"),
      "old API",
    );
  }, { upstreamFailure: true });
});

Deno.test("Plot docs - valid cache uses one request and installs its exact content", async () => {
  const stored = cachedReference();
  await withPlotFixture(async (urls) => {
    const result = await fetchPlotDocs("0.6.17");
    assertEquals(urls.length, 1);
    assertEquals(result.llm, stored);
    assertEquals(readFileSync("docs/observable-plot/llm.md", "utf8"), stored);
    assertEquals(result.plot, { version: "0.6.17", pages });
  }, { stored });
});

for (
  const [name, stored] of [
    ["wrong version", () => cachedReference("0.6.16")],
    ["malformed", () => "# Observable Plot 0.6.17\n\nnot a reference"],
    ["truncated", () => cachedReference().slice(0, -100)],
    [
      "missing page",
      () => cachedReference().replace("# marks/dot.md\n", "# missing.md\n"),
    ],
    ["transport failure", () => "network-error"],
  ] as const
) {
  Deno.test(`Plot docs - ${name} cache falls back to upstream`, async () => {
    await withPlotFixture(async (urls) => {
      const result = await fetchPlotDocs("0.6.17");
      assertEquals(urls.length, pages.length + 1);
      assertEquals(result.llm, cachedReference());
    }, { stored: stored() });
  });
}

Deno.test("Plot docs - maintainers can bypass the stored reference", async () => {
  await withPlotFixture(async (urls) => {
    const result = await fetchPlotDocs("0.6.17", { preferStored: false });
    assertEquals(urls.length, pages.length);
    assertEquals(urls.some((url) => url.includes("/docs-cache/")), false);
    assertEquals(result.llm, cachedReference());
  }, { stored: cachedReference() });
});

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
