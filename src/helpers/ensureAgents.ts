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
  const maplibreVersionCommand =
    runtime === "bun"
      ? "bun info maplibre-gl@latest version"
      : "npm view maplibre-gl@latest version";
  const analysisPackage = [
    "@nshiab/simple-data-analysis",
    "@nshiab/simple-data-analysis-core",
  ].find((pkg) => installedPackages.includes(pkg));
  const hasPlot = installedPackages.includes("@observablehq/plot");
  const analysisGuidance = analysisPackage
    ? `Prioritize the classes and methods in \`${analysisPackage}\`. Reserve custom queries for gaps in those methods. Explain the gap to the user and offer to open a GitHub issue in the library's repository. Use the table’s \`cache()\` method inside helpers that load remote data or perform expensive computations so reruns can reuse the results. Pass any settings or helper functions from outside the callback that affect the result as \`cache()\` inputs.

A \`cache()\` hit reuses the earlier result without rereading the source file or fetching the URL again. When the user asks for fresh data or supplies updated files, run \`${run} sda:clean\` before rerunning the analysis.

For scripts using the default in-memory \`SimpleDB\`, let unexpected errors stop the run so the script can be rerun. Call \`await sdb.close()\` at the end of the normal execution path. Calling it from \`catch\` or \`finally\` after a failure can remove cached results for steps the script never reached. Add error handling when the code or the user requires it.

Reserve \`.tmp/\` for SDA scratch files. Closing an in-memory \`SimpleDB\` deletes that entire directory by default, even with \`pruneCache: false\`. If you set \`tempDir\`, use a directory dedicated to that database.`
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
    content: `Help the user process, explore, and analyze data so they understand what it can tell them. When the goal is to answer questions with data, start by agreeing on clear, focused questions. Use them to guide what you measure, how you analyze it, and how you present the findings. Check the assumptions behind the method and verify that the evidence supports each conclusion. When a data gap or a proposed analysis choice could lead to a misleading answer, raise it with the user, explain why it matters in plain language, and suggest how to address it.

Assume the user may review any code, Markdown, or output you produce. Keep code easy to read and maintain. Use plain, accessible language in documents, terminal output, tables, charts, and websites.

When it would help the user move the work forward, suggest the next step based on the workflow below. If that step needs the user’s input, ask one focused question in chat. Continue with work the user has already authorized.

Read README.md for project guidance and package.json for the installed libraries and scripts. Ask the user before adding a dependency.

Keep changes focused on the user's request. Update README.md only when the user explicitly asks or when adding the methodology link described below.

Before writing or changing code, search the documentation of relevant installed libraries. Prefer their classes, functions, and methods when they fit the task. If you find a missing feature or a bug, tell the user and offer to open a GitHub issue in the library's repository.

${links.length ? `Local library documentation:\n\n${links.join("\n")}\n\n` : ""}Before making changes or running project commands, run \`${run} sda:status\` and follow its instructions.

**Ask in chat.** Ask one question at a time in the text of a normal assistant reply. Wait for the answer before asking the next question. Put any suggested answers directly below the question in the same reply and label them \`A\`, \`B\`, \`C\`, \`D\`, and so on. Accept a single option letter or an answer in the user's own words. Questionnaire tools, structured input tools, and pop-up forms are off limits for asking project questions. Keep the exchange in the regular chat so the user can type or dictate their reply.

## Research methodology

Follow the steps below when starting or extending an investigation to answer questions with data. Build on what the user has already shared. For standalone file-processing requests such as cleaning, formatting, or converting a file, go straight to the Data analysis instructions and deliver the requested output.

1. Set up the methodology and agree on the output. Check for \`methodology/methodology.md\` and create it if it’s missing. Use it to track the analysis. Tell the user if you create it, and link to it from README.md outside the setup-managed section if the link is missing. Ask which output the user wants if they haven’t already said. Record the choice under **Output** at the top of the methodology document.

   - **Terminal output with static charts and maps where useful.** Have the analysis script print a block for each question. Start with a heading such as \`******** Question 1 ********\`, then print the full question and a short answer. Print the supporting numbers as a table when available.${analysisPackage ? " Keep the default row limit for `log()` unless the user asks for more rows." : ""} Have the script generate charts and maps in \`sda/output/\` and print their paths under the relevant answers.
   - **Markdown document.** Use \`methodology/methodology.md\` as the deliverable. Present the findings under their research questions with methodology notes, using tables and embedded figures from \`methodology/figures/\` where helpful. Start relative image paths with \`figures/\`, as in \`![Chart description](figures/chart.png)\`.
   - **Website.** Build the site from the methodology document and adapt its content to the user’s needs.
   - **Other.** Deliver the findings in the format the user requests.

2. Agree on each research question and how to answer it. Ask follow-up questions in chat until each question is clear and focused. Write questions in plain language and suggest breaking broad or complicated questions into smaller ones that can be answered separately. Check the project’s documentation and data as you go to guide the conversation and see which indicators and methods the data can support. Ask the user before searching the web.

   Before running the analysis, agree in chat on each question, any indicators, and the method. Record the agreed plan in the methodology. Give each question its own heading, numbered \`Question 1\`, \`Question 2\`, and so on. Use the same question numbers and wording wherever those questions appear in the terminal, Markdown document, or website.

3. Run the analysis and document the work. Follow the Data analysis instructions below and share what you find along the way. If the analysis points to a more useful angle, a narrower question, or a gap that leaves the question unanswered, discuss it with the user. Explain proposed changes to a question, indicator, or method and get confirmation in chat before applying them. If the findings change, share the revised answer and supporting evidence with the user and confirm the answer with them before finalizing it.

   Keep \`methodology/methodology.md\` up to date by revising the affected sections in place. Use these sections under each research question.

   - **Indicators.** When a question uses measures, give each indicator a clear name and define what it measures. Include what counts, the unit, the time period, and the denominator where relevant. Use the same indicator names across outputs.
   - **Findings.** Answer the question directly and summarize the supporting evidence. Explain what the indicators show about the question where relevant. If the data supports only a partial answer, say what it can establish.
   - **Method.** Record the data sources and their URLs when available. If a source’s origin is unclear, ask the user where it came from and whether they have a link. List the columns or fields used, and verify what each row represents and how the source defines those fields. Record transformations, filters, and exclusions, and tell the user what you filtered or excluded and why. Explain in plain language how the analysis uses the data to calculate the indicators or otherwise answer the question.
   - **Limitations.** Discuss missing values, gaps in coverage, and other limitations with the user. Record how they affect the answer. If the answer remains uncertain or the data is too limited, offer to search the web for data or documentation that could help.

4. Deliver the agreed output. If the output is a web page, dashboard, or interactive chart, follow the Web projects instructions below. Update **Output** if the user changes their choice, and link to any separate deliverable from the question it answers.

Write the methodology as a standalone report in concise, accurate, plain language. Describe the analysis and its decisions in impersonal terms, such as “The analysis covers projects completed in 2025.” Keep paragraphs short. Use bullet lists for related points and tables when they make information easier to scan or compare. Explain technical terms that readers need to understand the analysis.

## Data analysis

Do data analysis and processing in \`sda/\`. Prioritize code that is easy to understand and review.

${analysisGuidance}

Use \`sda/main.ts\` for the project’s analysis. Keep one function per helper file in \`sda/helpers/\` and name the file after the function. Put source data in \`sda/data/\` and default to \`sda/output/\` for analysis exports.

For each research question, write a helper in \`sda/helpers/\` that returns the table or value used to answer it. Name the function for what it calculates. In \`sda/main.ts\`, put a comment with the question number and full wording directly above the helper call.

When the user attaches data files in chat, copy them to \`sda/data/\` before processing and tell the user where you saved them.

Create charts when they help explain the data, a calculation, or a finding. Save static charts as \`.png\` files unless the user requests another format. Use \`sda/output/\` for chart drafts. When the Markdown document is the chosen output, have the analysis script save any figures embedded in the document to \`methodology/figures/\`.

Add focused tests under \`sda/test/\` for helper functions in \`sda/helpers/\`. Cover error-prone transformations, meaningful edge cases, and bug fixes. Call the same helper from the analysis and from its test. Keep assertions in test files. Mirror source paths under \`sda/test/\`. For example, \`sda/helpers/cleanRows.ts\` maps to \`sda/test/helpers/cleanRows.test.ts\`. Prefer the runtime's built-in test runner. When closing a \`SimpleDB\` in a test, always use \`await sdb.close({ pruneCache: false })\`.

When useful, test the research question’s helper with the same data used for the analysis and assert the expected answer. If the user agrees to a revised method, check what the helper should return for the same data and update the test’s expected answer if needed. To check whether a data refresh changed the answer, compare the fresh result with the previously agreed result and review any difference with the user.

To run the analysis once, use \`${run} sda\`. It fixes and checks code before running the analysis. If the analysis watcher is running, this command requests a run from the watcher and returns its output and exit code when it finishes.

Run \`${run} sda:clean\` only when cached results and temporary files can be discarded.

Before handing off analysis code changes, start with \`${run} sda:test\`. If formatting or lint checks fail, use \`${run} sda:fix\` for automatic fixes. Resolve any remaining failures and rerun \`${run} sda:test\` until it passes.

## Web projects

If the user asks for a web page, dashboard, or interactive visualization, create \`src/site/\` for the site. Put \`index.html\` at the root, keep all required assets in the site folder, and use relative URLs. Use HTML, CSS, and vanilla JavaScript with classic script tags unless the user specifies a different stack.

Use \`methodology/methodology.md\` as the record of the project’s data analysis and the source for what the site reports. Use the documented definitions, filters, and results, and include any limitations readers need to interpret them. When the site needs a new calculation or finding, follow the Research methodology steps above and document the work before adding the result to the site. Update the affected site content when the analysis changes.

Once the findings are ready, propose a short outline. For an investigation, default to one section per featured research question. Lead with the numbered question and a short answer. Add supporting charts, tables, or controls such as filters when they help readers understand or explore the findings. Ask about open choices such as which findings to feature, how to organize them, and whether to include a methodology note. Get the user’s sign-off on the outline before building.

Default to one page unless the user requests or approves multiple pages.

Write concise, accurate web copy in plain language for a general audience, including chart labels and captions. Explain terms the audience may find unfamiliar.

At the top of each page, show the public contact’s name and email and a “Last updated” timestamp. Ask the user which name and email to display if they haven’t already provided them. Refresh the timestamp when the page’s content or data changes.

Build the requested page components alongside the contact and timestamp. Include logos, navigation bars, footers, download buttons, and methodology paragraphs or boxes only when the user explicitly requests them or they are essential to fulfilling the request.

When the site needs data, prepare it in \`sda/\` and export only what the page needs as JSON to \`sda/output/\`. Have the analysis script regenerate \`data.js\` in the site folder whenever that export changes. Load \`data.js\` before the page code so recipients can unzip the site and double-click \`index.html\` without a server.

Render web charts in JavaScript from the analysis results in \`data.js\`. Add web dependencies only when the user explicitly requests them. ${chartGuidance}

When a map would help, ask during outline review whether a static map is enough or readers need an interactive map. Approval of an interactive map covers using MapLibre GL JS and OpenFreeMap as an exception to the web dependency, local asset, and classic script defaults. Briefly tell the user which map library and basemap the site will use and that they load over the internet. When adding MapLibre, run \`${maplibreVersionCommand}\` and substitute the returned version for \`VERSION\` in both UNPKG URLs. Load the stylesheet from \`https://unpkg.com/maplibre-gl@VERSION/dist/maplibre-gl.css\` and import \`Map\` from \`https://unpkg.com/maplibre-gl@VERSION/dist/maplibre-gl.mjs\` in an inline \`<script type="module">\`. MapLibre loads its worker automatically. Use \`https://tiles.openfreemap.org/styles/liberty\` as the basemap style and keep its built-in attribution visible. Load \`data.js\` before the map script and pass the project's geographic data directly as a GeoJSON source. Consult the [MapLibre GL JS API reference](https://maplibre.org/maplibre-gl-js/docs/API/) as needed.

In \`package.json\`, add a script that runs \`${run} sda:preview\`. Use \`sda:dash\` for a dashboard, \`sda:interactive\` for a standalone interactive visualization, or \`sda:web\` for other web pages. For a different site folder, pass its path with \`--dir\`, for example \`${previewOverride}\`. Reuse an existing alias if it runs the same command. If the preferred name is taken, preserve the existing script and choose an unused name.

After any required outline sign-off, create an initial \`index.html\` if needed. Before building out the page, run the preview alias or reuse an existing preview for the site. Open the preview and share its URL and the alias command with the user right away. Tell them the page refreshes as site files change so they can follow along. The preview serves and watches only the site folder. Keep it running while you work, then check the finished page and its interactions.

The \`sda:fix\`, \`sda:test\`, \`sda:watch\`, and \`sda:test:watch\` scripts target analysis code in \`sda/\`. Use the browser preview to verify web changes. Leave download buttons unclicked during browser checks to avoid opening a save dialog. Check the download handler and the data it prepares directly. When adding automated web tests at the user's request or to cover complex behavior, create \`src/test/\` and add a matching \`package.json\` script such as \`sda:dash:test\` that runs only the web tests using the project's test runner.`,
  });
}
