import { createInterface } from "node:readline";
import type { Readable } from "node:stream";
import { stripVTControlCharacters, styleText } from "node:util";

export function pipeFixOutput(output: Readable) {
  const lines = createInterface({ input: output, crlfDelay: Infinity });
  lines.on("line", (line: string) => {
    const plain = stripVTControlCharacters(line);
    if (plain === "Found 0 warnings and 0 errors.") return;
    const timing = plain.match(
      /^Finished in ([\d.]+)(ms|s) on \d+ files?( with \d+ rules)? using \d+ threads?\.$/,
    );
    if (timing) {
      const label = timing[3] ? "Linting and type checking" : "Formatting";
      console.log(styleText("blue", `${label}: ${timing[1]} ${timing[2]}`));
    } else {
      // Forward diagnostics and unfamiliar output unchanged, including custom fix scripts.
      console.log(line);
    }
  });
}
