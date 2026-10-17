import { expect, test, vi } from "vite-plus/test";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { c } from "tar";
import { fetchPackageDocs } from "../src/helpers/fetchPackageDocs.ts";
import { syncPackageDocs } from "../src/helpers/syncPackageDocs.ts";
import { fetchPlotDocs } from "../src/helpers/fetchPlotDocs.ts";
import { combinePlotDocs } from "../src/helpers/combinePlotDocs.ts";
import { PLOT_DOC_PAGES } from "../src/helpers/plotDocPages.ts";
import { temporaryProject } from "./helpers/utils.ts";
temporaryProject();
async function archive(extra: string[] = []) {
  mkdirSync("fixture/docs/functions", { recursive: true });
  mkdirSync("fixture/docs/media", { recursive: true });
  writeFileSync("fixture/README.md", "# Library");
  writeFileSync("fixture/LICENSE", "MIT");
  writeFileSync("fixture/llms.txt", "[Overview](./README.md)\n[API](./docs/functions/example.md)");
  writeFileSync("fixture/docs/functions/example.md", "# Example\n![Image](../media/example.svg)");
  writeFileSync("fixture/docs/media/example.svg", "<svg/>");
  await c({ gzip: true, cwd: "fixture", file: "fixture.tar.gz" }, [
    "README.md",
    "LICENSE",
    "llms.txt",
    "docs",
    ...extra,
  ]);
  return new Uint8Array(readFileSync("fixture.tar.gz"));
}
test("one exact-version archive preserves granular pages, local links and assets on refresh", async () => {
  const bytes = await archive();
  const requests: string[] = [];
  vi.stubGlobal(
    "fetch",
    vi.fn<typeof fetch>(async (input) => {
      requests.push(input instanceof Request ? input.url : String(input));
      return new Response(bytes);
    }),
  );
  mkdirSync("docs/journalism-format", { recursive: true });
  writeFileSync("docs/journalism-format/obsolete.md", "old");
  const mapping = await syncPackageDocs(["@nshiab/journalism-format"], {
    "@nshiab/journalism-format": "1.1.14",
  });
  expect(requests).toEqual([
    "https://github.com/nshiab/journalism-format/releases/download/v1.1.14/documentation.tar.gz",
  ]);
  expect(mapping["@nshiab/journalism-format"].index).toContain("./docs/functions/example.md");
  expect(readFileSync("docs/journalism-format/docs/media/example.svg", "utf8")).toBe("<svg/>");
  expect(existsSync("docs/journalism-format/obsolete.md")).toBe(false);
  expect(readdirSync("docs")).toEqual(["journalism-format"]);
});
test("missing, corrupt and unsafe archives preserve the previous complete documentation", async () => {
  mkdirSync("docs/journalism-format", { recursive: true });
  writeFileSync("docs/journalism-format/llms.txt", "old index");
  for (const response of [
    new Response("missing", { status: 404 }),
    new Response("not a tarball"),
  ]) {
    vi.stubGlobal(
      "fetch",
      vi.fn<typeof fetch>(async () => response),
    );
    expect(await fetchPackageDocs("@nshiab/journalism-format", "1.1.14")).toEqual({});
    expect(readFileSync("docs/journalism-format/llms.txt", "utf8")).toBe("old index");
  }
  await archive();
  symlinkSync("../../outside", "fixture/escape");
  const unsafe = await archive(["escape"]);
  vi.stubGlobal(
    "fetch",
    vi.fn<typeof fetch>(async () => new Response(unsafe)),
  );
  expect(await fetchPackageDocs("@nshiab/journalism-format", "1.1.14")).toEqual({});
  expect(readFileSync("docs/journalism-format/llms.txt", "utf8")).toBe("old index");
  expect(existsSync("outside")).toBe(false);
  expect(readdirSync("docs")).toEqual(["journalism-format"]);
});
test("uninstalled versions never fetch guessed tags", async () => {
  const fetchMock = vi.fn<typeof fetch>();
  vi.stubGlobal("fetch", fetchMock);
  expect(await syncPackageDocs(["@nshiab/journalism-format"], {})).toEqual({});
  expect(fetchMock).not.toHaveBeenCalled();
  await expect(fetchPackageDocs("@other/untrusted", "1.0.0")).rejects.toThrow("Unsupported");
});
test("Observable Plot keeps its exact-version cache and falls back to tagged sources", async () => {
  const content = "# Plot API\n\n## dot\n\nA chart example.";
  const cached = combinePlotDocs("0.6.17", new Map(PLOT_DOC_PAGES.map((page) => [page, content])));
  const fetchMock = vi.fn<typeof fetch>(async () => new Response(cached));
  vi.stubGlobal("fetch", fetchMock);
  expect((await fetchPlotDocs("0.6.17")).llm).toBe(cached);
  expect(fetchMock).toHaveBeenCalledTimes(1);
  expect(readFileSync("docs/observable-plot/llms.txt", "utf8")).toContain(
    "[marks/dot.md](./marks/dot.md)",
  );
  expect(readFileSync("docs/observable-plot/marks/dot.md", "utf8")).toContain("A chart example.");
  expect(existsSync("docs/observable-plot/llm.md")).toBe(false);
  writeFileSync("docs/observable-plot/obsolete.md", "old");
  const urls: string[] = [];
  vi.stubGlobal(
    "fetch",
    vi.fn<typeof fetch>(async (input) => {
      const url = input instanceof Request ? input.url : String(input);
      urls.push(url);
      return new Response(content, { status: url.includes("docs-cache") ? 404 : 200 });
    }),
  );
  expect((await fetchPlotDocs("0.6.17")).plot?.version).toBe("0.6.17");
  expect(urls.slice(1).every((url) => url.includes("/refs/tags/v0.6.17/"))).toBe(true);
  expect(urls.length).toBe(PLOT_DOC_PAGES.length + 2);
  expect(readFileSync("docs/observable-plot/LICENSE", "utf8")).toBe(content + "\n");
  expect(existsSync("docs/observable-plot/obsolete.md")).toBe(false);
  expect(readdirSync("docs")).toEqual(["observable-plot"]);
});

test("invalid or truncated Plot cache falls back and partial source failure preserves old docs", async () => {
  const content = "# Plot API\n\n## dot\n\nExample.";
  const cached = combinePlotDocs("0.6.17", new Map(PLOT_DOC_PAGES.map((page) => [page, content])));
  for (const stored of [
    cached.slice(0, -100),
    cached.replace("# Observable Plot 0.6.17", "# Observable Plot 0.6.16"),
  ]) {
    const fetchMock = vi.fn<typeof fetch>(async (input) => {
      const url = input instanceof Request ? input.url : String(input);
      return new Response(url.includes("docs-cache") ? stored : content);
    });
    vi.stubGlobal("fetch", fetchMock);
    expect((await fetchPlotDocs("0.6.17")).llm).toContain("## Upstream license");
    expect(fetchMock).toHaveBeenCalledTimes(PLOT_DOC_PAGES.length + 2);
  }
  writeFileSync("docs/observable-plot/llms.txt", "previous complete reference");
  vi.stubGlobal(
    "fetch",
    vi.fn<typeof fetch>(async (input) => {
      const url = input instanceof Request ? input.url : String(input);
      return new Response(content, {
        status: url.includes("docs-cache") || url.endsWith("marks/dot.md") ? 404 : 200,
      });
    }),
  );
  expect(await fetchPlotDocs("0.6.17")).toEqual({});
  expect(readFileSync("docs/observable-plot/llms.txt", "utf8")).toBe("previous complete reference");
});
