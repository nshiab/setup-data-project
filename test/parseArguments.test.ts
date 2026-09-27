import { assertEquals, assertStringIncludes, assertThrows } from "@std/assert";
import { parseArguments } from "../src/helpers/parseArguments.ts";

Deno.test("parseArguments - no flags keeps interactive selection", () => {
  assertEquals(parseArguments([]), { help: false });
});

Deno.test("parseArguments - package flags select only the requested package", () => {
  assertEquals(parseArguments(["--sda"]), {
    help: false,
    package: "@nshiab/simple-data-analysis",
  });
  assertEquals(parseArguments(["--sda-core"]), {
    help: false,
    package: "@nshiab/simple-data-analysis-core",
  });
  assertEquals(parseArguments(["--sda", "--sda"]), parseArguments(["--sda"]));
});

Deno.test("parseArguments - help accepts both aliases", () => {
  assertEquals(parseArguments(["--help"]), { help: true });
  assertEquals(parseArguments(["-h"]), { help: true });
  assertEquals(parseArguments(["--sda", "--help"]), {
    help: true,
    package: "@nshiab/simple-data-analysis",
  });
});

Deno.test("parseArguments - conflicting flags fail in either order", () => {
  for (const args of [["--sda", "--sda-core"], ["--sda-core", "--sda"]]) {
    assertThrows(() => parseArguments(args), Error, "cannot be combined");
  }
});

Deno.test("parseArguments - unknown arguments fail even with help", () => {
  for (const args of [["--unknown"], ["sda"], ["--help", "--unknown"]]) {
    assertThrows(() => parseArguments(args), Error, "Unknown argument");
  }
});

for (
  const { args, code, message } of [
    { args: ["--help"], code: 0, message: "Usage: setup-data-project" },
    { args: ["--unknown"], code: 1, message: "Unknown argument" },
    {
      args: ["--sda", "--sda-core"],
      code: 1,
      message: "cannot be combined",
    },
  ]
) {
  Deno.test(`CLI - ${args.join(" ")} exits without creating files`, async () => {
    const cwd = Deno.makeTempDirSync();
    try {
      const output = await new Deno.Command(Deno.execPath(), {
        args: [
          "run",
          "--cached-only",
          "--allow-all",
          "--config",
          new URL("../deno.json", import.meta.url).pathname,
          new URL("../src/main.ts", import.meta.url).pathname,
          ...args,
        ],
        cwd,
      }).output();
      assertEquals(output.code, code);
      assertStringIncludes(
        new TextDecoder().decode(code === 0 ? output.stdout : output.stderr),
        message,
      );
      assertEquals(Array.from(Deno.readDirSync(cwd)), []);
    } finally {
      Deno.removeSync(cwd, { recursive: true });
    }
  });
}
