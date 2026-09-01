import { log } from "@clack/prompts";
import { ensureManagedSection } from "./ensureManagedSection.ts";
import {
  getInstalledPackageConfigs,
  SUPPORTED_PACKAGES,
} from "./packageRegistry.ts";

export function ensureAgents(
  docsMapping: Record<string, string>,
  runtime: string,
  installedPackages: string[] = Object.keys(docsMapping),
) {
  let journalismFunctions = "";
  let sdaClassesAndMethods = "";
  let sdaDocsPath = "";
  let sdaLibraryName = "";
  const journalismFunctionsByPackage = new Map<string, string[]>();

  for (const [pkg, doc] of Object.entries(docsMapping)) {
    const pkgConfig = SUPPORTED_PACKAGES.find((p) => p.value === pkg);
    const pkgType = pkgConfig?.type || "other";

    if (pkgType === "journalism") {
      const repoName = pkg.split("/")[1];
      const functions = doc
        .split("\n")
        .filter((line) => line.trim().startsWith("#"))
        .filter((line) => {
          const depth = line.match(/^#+/)?.[0].length || 0;
          return depth === 2;
        })
        .map((line) => line.replace(/^#+\s+/, "").trim());
      journalismFunctionsByPackage.set(pkg, functions);
      journalismFunctions += `\n### ${repoName}\n\n`;
      journalismFunctions += functions.map((name) => `- ${name}`).join("\n") +
        "\n";
    } else if (pkgType === "sda") {
      const repoName = pkg.split("/")[1];
      sdaDocsPath = `./docs/${repoName}.md`;
      sdaLibraryName = pkgConfig?.label || repoName;
      sdaClassesAndMethods = doc
        .split("\n")
        .filter((line) => line.trim().startsWith("#"))
        .filter((line) => {
          const depth = line.match(/^#+/)?.[0].length || 0;
          if (depth === 2) return true;
          if (depth !== 4) return false;
          const heading = line.replace(/^#+\s+/, "").replaceAll("`", "")
            .trim();
          return heading !== "Parameters";
        })
        .map((line) => {
          const depth = line.match(/^#+/)?.[0].length || 0;
          if (depth === 2) {
            return "\n" + line.replace(/^#+\s+/, "").trim();
          } else {
            return line.replace(/^#+\s+/, "  - ")
              .replaceAll("`", "");
          }
        })
        .join("\n");
    }
  }

  const configFile = runtime === "deno" ? "deno.json" : "package.json";
  const runSdaOnce = runtime === "deno"
    ? "deno run -A --env --check sda/main.ts"
    : runtime === "bun"
    ? "bun run sda/main.ts"
    : "node --env-file-if-exists=.env --experimental-strip-types sda/main.ts";
  const runClean = runtime === "deno" ? "deno task clean" : "npm run clean";
  const runAllTests = runtime === "deno"
    ? "deno task all-tests"
    : runtime === "bun"
    ? "bun run all-tests"
    : "npm run all-tests";

  const installedPackageConfigs = getInstalledPackageConfigs(
    installedPackages,
  );
  const importExamples = installedPackageConfigs.flatMap((pkg) => {
    if (pkg.type === "sda") {
      return [`import { SimpleDB } from "${pkg.value}";`];
    }

    const functionName = journalismFunctionsByPackage.get(pkg.value)
      ?.map((name) => name.replaceAll("`", ""))
      .find((name) => /^[A-Za-z_$][\w$]*$/.test(name));
    return functionName
      ? [`import { ${functionName} } from "${pkg.value}";`]
      : [];
  });

  let libraryGuidance = "";
  if (installedPackageConfigs.length > 0) {
    const libraryNames = installedPackageConfigs.map((pkg) => `"${pkg.value}"`)
      .join(", ");
    const libraryNoun = installedPackageConfigs.length === 1
      ? "library"
      : "libraries";
    libraryGuidance = `
Always prioritize the installed ${libraryNames} ${libraryNoun} when relevant.
`;
    if (importExamples.length > 0) {
      libraryGuidance += `APIs can be imported with named imports like this:
\`\`\`typescript
${importExamples.join("\n")}
\`\`\`
`;
    }
  }

  let content =
    `Always verify if there is a ${configFile} file in the root of the project and familiarize yourself with the scripts available in it and the libraries already installed in the project.

Run \`sda/main.ts\` with \`${runSdaOnce}\`. Do not use the \`sda\` task for agent-driven checks because it runs in watch mode and will keep waiting for file changes.

Before handing off your work, always run \`${runAllTests}\`, even if no tests have been added yet. Fix any errors or warnings it reports.

The \`clean\` task (e.g. \`${runClean}\`) removes caches and other temporary files. Do not run it routinely. Cached results can be especially valuable for computationally expensive operations or API calls. If you are unsure whether the caches should be removed, ask the user first.

Always use "sda/main.ts" as the entry point.

If you need to create other TypeScript files, create them in the "sda/helpers" folder. Prioritize the use of helper functions to keep the code well organized and maintainable, with one helper function per file, with the file named after the function. Prioritize default exports for helper functions.

Put tests in the "sda/tests" folder. Write focused tests for reusable helpers and important data transformations when appropriate. When testing a helper from "sda/helpers/functionName.ts", name its test file "sda/tests/functionName.test.ts".

If you need to download data, always put the files in the "sda/data" folder, which is ignored by Git.

If you need to output data to a file, always put the file in the "sda/output" folder, which is also ignored by Git.
${libraryGuidance}`;

  if (journalismFunctions !== "") {
    content += `
Here are the functions available in the "journalism" libraries. If one of the function might be relevant, read the complete documentation in the "./docs/" folder to properly use it.
${journalismFunctions}`;
  }

  if (sdaClassesAndMethods !== "") {
    content += `
Here are the classes and their methods available in the "${sdaLibraryName}" library. If one of the classes or methods might be relevant, read the complete documentation at "${sdaDocsPath}" to properly use it.

Most data-loading and transformation methods are synchronous, chainable builders. Await the final asynchronous observer or export method, such as \`log()\`, \`getData()\`, or \`writeData()\`, to execute the queued operations. If a chain ends without an observer, call \`run()\`. Always call \`await sdb.close()\` when the database is no longer needed. Methods that return an answer or export to an external service can be asynchronous, so verify their documentation before calling them.
${sdaClassesAndMethods}`;
  }

  const status = ensureManagedSection({
    path: "AGENTS.md",
    name: "agents",
    content,
    createContent: (managedSection) => managedSection,
  });
  if (status === "created") {
    log.info("Created AGENTS.md");
  } else if (status === "updated") {
    log.info("Updated AGENTS.md");
  }
}
