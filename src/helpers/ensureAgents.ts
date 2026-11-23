import type { PackageDocs } from "./fetchPackageDocs.ts";
import { ensureManagedSection } from "./ensureManagedSection.ts";
import { getInstalledPackageConfigs } from "./packageRegistry.ts";
import type { Runtime } from "./getRuntime.ts";
export function ensureAgents(
  docsMapping: Record<string, PackageDocs>,
  runtime: Runtime,
  installedPackages: string[] = Object.keys(docsMapping),
) {
  const run = runtime === "bun" ? "bun run" : "npm run";
  const previewOverride = `${run} sda:preview${runtime === "node" ? " --" : ""} --dir src/report`;
  const setup = `${runtime === "bun" ? "bunx --bun" : "npx"} @nshiab/setup-data-project`;
  const analysisPackage = [
    "@nshiab/simple-data-analysis",
    "@nshiab/simple-data-analysis-core",
  ].find((pkg) => installedPackages.includes(pkg));
  const hasPlot = installedPackages.includes("@observablehq/plot");
  const analysisGuidance = analysisPackage
    ? `Prioritize the classes and methods in \`${analysisPackage}\`. Reserve custom queries for gaps in those methods. Explain the gap to the user and offer to open a GitHub issue in the library's repository.

For scripts using the default in-memory \`SimpleDB\`, let unexpected errors stop the run so the script can be rerun. Call \`await sdb.close()\` at the end of the normal execution path. Calling it from \`catch\` or \`finally\` after a failure can remove cached results for steps the script never reached. Add error handling when the code or the user requires it.`
    : `If the task needs data processing or transformation, suggest \`${setup} --sda\` to install Simple Data Analysis${hasPlot ? "" : " with Observable Plot"} and download versioned documentation.`;
  const chartGuidance = hasPlot
    ? `For charts, use the installed Observable Plot or its D3 dependency unless the user explicitly requests a different library.

When using Plot or D3, copy the required browser bundles into the site folder. Use \`dist/plot.umd.min.js\` from \`@observablehq/plot\` for Plot and \`dist/d3.min.js\` from \`d3\` for D3. If D3 is nested, look in Plot's \`node_modules/\`. Use relative script URLs and load D3 before Plot when using Plot.`
    : `For charts, use the library the user explicitly requests. Otherwise, suggest \`${setup} --sda\` to install Simple Data Analysis with Observable Plot and download their documentation. Use native browser APIs if the user prefers to keep the current dependencies.`;
  const links = getInstalledPackageConfigs(installedPackages).map((pkg) => {
    const name =
      pkg.value === "@observablehq/plot" ? "observable-plot" : pkg.value.slice("@nshiab/".length);
    return `- \`${pkg.value}\` — \`docs/${name}/llms.txt\``;
  });
  ensureManagedSection({
    path: "AGENTS.md",
    name: "agents",
    createContent: (section) => `# Project instructions\n\n${section}`,
    content: `Read README.md for project guidance and package.json for the installed libraries and scripts. Ask the user before adding a dependency.

Keep changes focused on the user's request. Update README.md only when the user explicitly asks or when adding the methodology link described below.

Before writing or changing code, search the documentation of relevant installed libraries. Prefer their classes, functions, and methods when they fit the task. If you find a missing feature or a bug, tell the user and offer to open a GitHub issue in the library's repository.

${links.length ? `Local library documentation:\n\n${links.join("\n")}\n\n` : ""}Before making changes or running project commands, run \`${run} sda:status\` and follow its instructions.

## Research methodology

When starting or extending a data investigation, build on what the user has already shared.

1. Set up the methodology and agree on the output. Check for \`methodology/methodology.md\` and create it if it’s missing. Use it to track questions, methods, limitations, and findings. Tell the user if you create it, and link to it from README.md outside the setup-managed section if the link is missing. Ask which output the user wants if they haven’t already said. Record the choice under **Output** at the top of the methodology document.

   - **Static charts.** As you work toward an answer, save draft charts to \`sda/output/\`, which Git ignores. When the user confirms the answer or you think the chart is close to what they need, ask whether they want to keep it. Save the charts they choose to \`methodology/figures/\` so they can be committed.
   - **Markdown document.** Use \`methodology/methodology.md\` as the deliverable. Present the findings under their research questions with methodology notes, using tables and embedded figures saved in \`methodology/figures/\` where they help explain the answers.
   - **Website.** Build the site from the methodology document and adapt its content to the user’s needs.

2. Agree on the research questions with the user. Keep each question focused and write it in plain language. If a question is too broad or complicated, suggest breaking it into smaller questions that can be answered separately. Ask a few targeted follow-up questions if needed to settle what each question should answer. Record each agreed question as its own heading in the methodology document. Revisit the questions with the user whenever their needs or the analysis suggest a change. When you agree on a revision, replace the question in place and update its method, limitations, and findings to match.
3. Answer each question with the user, following the Data analysis instructions below. Share what you find along the way and agree with the user on choices that could change the answer. If the analysis points to a more useful angle, a more focused question, or a gap that leaves the question unanswered, discuss that with the user.
4. Keep track of the work as you go in \`methodology/methodology.md\`. Use these sections under each research question.

   - **Method.** Record the data sources and their URLs when available. If a source’s origin is unclear, ask the user where it came from and whether they have a link. List the columns or fields used, and verify what each row represents and how the source defines those fields. Record transformations, filters, and exclusions, and tell the user what you filtered or excluded and why. Explain in plain language how you used the data to answer the question.
   - **Limitations.** Discuss missing values, gaps in coverage, and other limitations with the user. Record how they affect the answer. If the answer remains uncertain or the data is too limited, offer to search the web for data or documentation that could help.
   - **Findings.** Summarize what the analysis shows and the evidence that supports the answer.

5. Deliver the agreed output. If the output is a web page, dashboard, or interactive chart, follow the Web projects instructions below. Update **Output** if the user changes their choice, and link to any separate deliverable from the question it answers.

Write concise, accurate methodology text in plain language. Keep paragraphs short. Use bullet lists for related points and tables when they make information easier to scan or compare. Use jargon only if the user has used it, and explain technical terms that readers need to understand the analysis.

## Data analysis

Do data analysis and processing in \`sda/\`. Prioritize code that is easy to understand and review.

${analysisGuidance}

Use \`sda/main.ts\` as the entry point and \`sda/helpers/\` for reusable helpers. Keep one function per helper file, with the file named after the function. Put source data in \`sda/data/\` and default to \`sda/output/\` for analysis exports.

Create charts when they help explain the data, a calculation, or a finding. Save static charts as \`.png\` files unless the user requests another format. Use \`sda/output/\` for chart drafts and have the analysis script save figures the user wants to keep to \`methodology/figures/\`.

Add focused tests for error-prone transformations, reusable logic with meaningful edge cases, and bug fixes. Mirror source paths under sda/test/: for example, sda/helpers/cleanRows.ts maps to sda/test/helpers/cleanRows.test.ts. Prefer the runtime's built-in test runner.

To run the analysis once, use \`${run} sda\`. It fixes and checks code before running the analysis. If the analysis watcher is running, this command requests a run from the watcher and returns its output and exit code when it finishes.

Run \`${run} sda:clean\` only when cached results and temporary files can be discarded.

Before handing off analysis code changes, start with \`${run} sda:test\`. If formatting or lint checks fail, use \`${run} sda:fix\` for automatic fixes. Resolve any remaining failures and rerun \`${run} sda:test\` until it passes.

## Web projects

If the user asks for a web page, dashboard, or interactive visualization, create \`src/site/\` for the site. Put \`index.html\` at the root, keep all required assets in the site folder, and use relative URLs. Use HTML, CSS, and vanilla JavaScript with classic script tags unless the user specifies a different stack.

Use \`methodology/methodology.md\` as the record of the project’s data analysis and the source for what the site reports. Use the documented definitions, filters, and results, and include any limitations readers need to interpret them. When the site needs a new calculation or finding, follow the Research methodology steps above and document the work before adding the result to the site. Update the affected site content when the analysis changes.

Once the findings are ready, propose a short outline. Ask about open choices such as which findings to feature, how to organize them, which charts or tables to include, and whether to include a methodology note. Get the user’s sign-off on the outline before building. When useful, add a **Web** subsection under a research question in the methodology to record which findings, charts, or tables the site will show. Keep it up to date as the page changes.

Default to one page unless the user requests or approves multiple pages.

Write concise, accurate web copy in plain language for a general audience, including chart labels and captions. Use jargon only if the user has used it, and explain terms the audience may find unfamiliar.

At the top of each page, show the public contact’s name and email and a “Last updated” timestamp. Ask the user which name and email to display if they haven’t already provided them. Refresh the timestamp when the page’s content or data changes.

Build the requested page components alongside the contact and timestamp. Include logos, navigation bars, footers, and methodology paragraphs or boxes only when the user explicitly requests them or they are essential to fulfilling the request.

When the site needs data, prepare it in \`sda/\` and export only what the page needs as JSON to \`sda/output/\`. Generate a separate \`data.js\` in the site folder from that export and load it before the page code (so recipients can unzip the site and double-click \`index.html\` without a server).

Add web dependencies only when the user explicitly requests them. ${chartGuidance}

In \`package.json\`, add a script that runs \`${run} sda:preview\`. Use \`sda:dash\` for a dashboard, \`sda:interactive\` for a standalone interactive visualization, or \`sda:web\` for other web pages. For a different site folder, pass its path with \`--dir\`, for example \`${previewOverride}\`. Reuse an existing alias if it runs the same command. If the preferred name is taken, preserve the existing script and choose an unused name.

Run the alias to start the preview server. Check the page and its interactions at the local URL it prints. The preview serves and watches only the site folder and refreshes the browser when its files change. Share the alias command and local URL with the user.

The \`sda:fix\`, \`sda:test\`, \`sda:watch\`, and \`sda:test:watch\` scripts target analysis code in \`sda/\`. Use the browser preview to verify web changes. When adding automated web tests at the user's request or to cover complex behavior, create \`src/test/\` and add a matching \`package.json\` script such as \`sda:dash:test\` that runs only the web tests using the project's test runner.`,
  });
}
