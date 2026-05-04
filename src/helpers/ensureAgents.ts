import { writeFileSync } from "node:fs";

export function ensureAgents(
  docsMapping: Record<string, string>,
) {
  let journalismFunctions = "";
  let sdaClassesAndMethods = "";

  for (const [pkg, doc] of Object.entries(docsMapping)) {
    if (pkg.includes("journalism")) {
      const repoName = pkg.split("/")[1];
      journalismFunctions += `\n### ${repoName}\n\n`;
      journalismFunctions += doc
        .split("\n")
        .filter((line) => line.startsWith("## "))
        .map((line) => line.replace("## ", "").trim())
        .join("\n") + "\n";
    } else if (pkg === "@nshiab/simple-data-analysis") {
      sdaClassesAndMethods = doc
        .split("\n")
        .filter((line) => line.startsWith("## ") || line.startsWith("#### "))
        .map((line) =>
          line.startsWith("## ")
            ? "\n" + line.replace("## ", "").trim()
            : line.replace("#### Parameters", "  - ").replace(
              "#### ",
              "  - ",
            )
              .replaceAll("`", "")
        )
        .join("\n");
    }
  }

  let content =
    `Always verify if there is a deno.json or package.json file in the root of the project and familiarize yourself with the scripts available in it and the libraries already installed in the project.

Always use "sda" task when available (e.g. \`deno task sda\`).

If it's a Deno project, you can also run \`deno run -A --node-modules-dir=auto --env-file --check sda/main.ts\` to test your code. Before handing off your work, run \`deno lint\` and \`deno fmt\` as well. Fix any errors or warnings triggered along the way.

If it's a Node.js project, you can also run \`node --env-file=.env --experimental-strip-types --no-warnings sda/main.ts\` to test your code. Before handing off your work, always fix any errors or warnings triggered along the way.

Use the \`clean\` task (e.g. \`deno task clean\`) to remove the cache and other temporary files.

Always use "sda/main.ts" as the entry point.

If you need to create other TypeScript files, create them in the "sda/helpers" folder. Prioritize the use of helper functions to keep the code well organized and maintainable, with one helper function per file, with the file named after the function. Prioritize default exports for helper functions.

If you need to download data, always put the files in the "sda/data" folder, which is gitignored. 

If you need to output data to a file, always put the file in the "sda/output" folder.

Always prioritize the use of the "journalism" and "simple-data-analysis" libraries when they are installed. These libraries can be used directly like this:
\`\`\`typescript
import { formatDate } from "@nshiab/journalism-format";
import { SimpleDB } from "@nshiab/simple-data-analysis";
\`\`\`
`;

  if (journalismFunctions !== "") {
    content += `
Here are the functions available in the "journalism" libraries. If one of the function might be relevant, read the complete documentation in the "./docs/" folder to properly use it.
${journalismFunctions}`;
  }

  if (sdaClassesAndMethods !== "") {
    content += `
Here are the classes and their methods available in the "simple-data-analysis" library. If one of the classes or methods might be relevant, read the complete documentation at "./docs/simple-data-analysis.md" to properly use it. Remember that almost all methods are asynchronous, so you need to use \`await\` when calling them.
${sdaClassesAndMethods}`;
  }

  writeFileSync("AGENTS.md", content);
}
