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

Use the database’s temporary directory (\`.tmp/\` by default for in-memory databases) only for scratch files. \`SimpleDB.close()\` deletes the entire directory, even with \`pruneCache: false\`.`
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

Assume the user may review any code, Markdown, or output you produce. Keep code easy to read and maintain. Use plain, accessible language in documents, terminal output, tables, charts, and websites. Keep quotes and labels from the data in their original language, offer to translate them when helpful, and translate only at the user’s request, recording each original and its translation side by side in a glossary.

When it would help the user move the work forward, suggest the next step based on the workflow below. If that step needs the user’s input, ask one focused question in chat. Continue with work the user has already authorized.

Read README.md for project guidance and package.json for the installed libraries and scripts. Ask the user before adding a dependency.

Keep changes focused on the user's request. Update README.md only when the user explicitly asks or when adding the methodology link described below.

Before writing or changing code, search the documentation of relevant installed libraries. Prefer their classes, functions, and methods when they fit the task. If you find a missing feature or a bug, tell the user and offer to open a GitHub issue in the library's repository.

${links.length ? `Local library documentation:\n\n${links.join("\n")}\n\n` : ""}Before making changes or running project commands, run \`${run} sda:status\` and follow its instructions.

**Ask in chat.** Ask one question at a time in the text of a normal assistant reply. Wait for the answer before asking the next question. Put any suggested answers directly below the question in the same reply and label them \`A\`, \`B\`, \`C\`, \`D\`, and so on. For every question with suggested answers, recommend one and put \`[Recommended]\` between its letter and answer text, as in \`C [Recommended] Markdown document\`. Accept a single option letter or an answer in the user's own words. Questionnaire tools, structured input tools, and pop-up forms are off limits for asking project questions. Keep the exchange in the regular chat so the user can type or dictate their reply.

## Git history

If Git is available, check whether the project is already in a Git repository. Reuse the existing repository if there is one. Otherwise, run \`git init\` in the project root and tell the user.

Make a local commit after each meaningful milestone, such as completing setup, verifying an analysis, or finishing a deliverable. Before committing, review the diff and any already staged changes. Respect \`.gitignore\` and commit only your changes for that milestone. Use a short message that describes what changed.

## Research methodology

Follow the steps below when starting or extending an investigation to answer questions with data. Build on what the user has already shared. For standalone file-processing requests such as cleaning, formatting, or converting a file, go straight to the Data analysis instructions and deliver the requested output.

1. Set up the methodology and agree on the output. Check for \`methodology/methodology.md\` and create it if it’s missing. Use it to track the analysis. Tell the user if you create it, and link to it from README.md outside the setup-managed section if the link is missing. Ask which output the user wants if they haven’t already said. Record the choice under “Output”.

   - **Terminal output with static charts and maps where useful.** Have the analysis script print a block for each question. Start with a heading such as \`******** Question 1 ********\`, then print the full question and a short answer. Print the supporting numbers as a table when available.${analysisPackage ? " Keep the default row limit for `log()` unless the user asks for more rows." : ""} Have the script generate charts and maps in \`sda/output/\` and print their paths under the relevant answers.
   - **Markdown document.** Use \`methodology/methodology.md\` as the deliverable. Present the findings under their research questions with methodology notes, using tables and embedded figures from \`methodology/figures/\` where helpful. Start relative image paths with \`figures/\`, as in \`![Chart description](figures/chart.png)\`.
   - **Website.** Build the site from the methodology document and adapt its content to the user’s needs.
   - **Other.** Deliver the findings in the format the user requests.

   For each dataset, ask for any supporting documentation the user hasn’t already shared, such as a data dictionary, codebook, or methodology PDF. They can share links or attach files in chat. Ask whether they’d like you to search the web for more context or a newer release. If you find a newer release, explain any differences that matter to the analysis. If you find additional documentation, explain what it adds and whether it supplements, supersedes, or conflicts with what the user shared. Agree with the user on what to use and how to resolve any source discrepancies that affect the analysis. List the data sources and supporting documentation near the top of \`methodology/methodology.md\`, with links where available.

   Keep an “AI models used” list near the top of \`methodology/methodology.md\`. Add your model name under each category you contributed to. Use “Methodology”, “Data analysis”, and “Presentation” as applicable, and add a category for other work when needed. List each model once per category. If one model did all the work, show its name and categories on one line.

2. Agree on each research question and how to answer it. Ask follow-up questions in chat until each question is clear and focused. Write questions in plain language and suggest breaking broad or complicated questions into smaller ones that can be answered separately. Ask the user before searching the web.

   When working with the user to define a research question or indicator, check the available source documentation and the relevant data columns. Review column types and summarize missing-value counts, date and numeric ranges, distinct values, and distributions. Run any other checks needed to determine what the data can support. If a limitation affects which questions the data can answer or how the results should be interpreted, explain it before settling on the question or indicator and suggest an option the data can support. Record the assumptions, decisions, and limitations that matter to the analysis in \`methodology/methodology.md\`.

   Before running the analysis, agree in chat on each question, any indicators, and the method. Record the agreed plan in the methodology. Give each question its own heading, numbered \`Question 1\`, \`Question 2\`, and so on. Use the same question numbers and wording wherever those questions appear in the terminal, Markdown document, or website.

3. Run the analysis and document the work. Follow the Data analysis instructions below and share what you find along the way. If the analysis points to a more useful angle, a narrower question, or a gap that leaves the question unanswered, discuss it with the user. Explain proposed changes to a question, indicator, or method and get confirmation in chat before applying them. If the findings change, share the revised answer and supporting evidence with the user and confirm the answer with them before finalizing it.

   Keep \`methodology/methodology.md\` up to date by revising the affected sections in place. Once findings are available, add a “Summary of findings” directly after “Output”. Use a few short bullets in plain language, each stating one main finding. Include a key number or qualification when it matters. Update the summary as the findings change.

   Use these sections under each research question.

   - **Indicators.** When a question uses measures, list one bullet per indicator with a clear name and a short, plain-language definition. Include what counts, the unit, the time period, and the denominator where relevant. Use the same indicator names across outputs.
   - **Findings.** Answer the question directly and summarize the supporting evidence. Explain what the indicators show about the question where relevant. If the data supports only a partial answer, say what it can establish.
   - **Method.** Identify the datasets and columns or fields used. Verify what each row represents and how the source defines those fields. Record transformations, filters, and exclusions, and tell the user what you filtered or excluded and why. Explain in plain language how the analysis uses the data to calculate the indicators or otherwise answer the question.
   - **Limitations.** Discuss missing values, gaps in coverage, and other limitations with the user. Record how they affect the answer. If the answer remains uncertain or the data is too limited, offer to search the web for data or documentation that could help.

   When the same agreed cleaning rules apply to more than one research question, add a “Data preparation” section before the first question. Briefly explain what changed, why, and any unresolved cases. Record question-specific cleaning under “Method”.

4. Deliver the agreed output. If the output is a web page, dashboard, or interactive chart, follow the Web projects instructions below. Update “Output” if the user changes their choice, and link to any separate deliverable from the question it answers.

Write the methodology as a standalone report in concise, accurate, plain language. Describe the analysis and its decisions in impersonal terms, such as “The analysis covers projects completed in 2025.” Keep paragraphs short. Use bullet lists for related points and tables when they make information easier to scan or compare. Explain technical terms that readers need to understand the analysis.

When the user asks a question about the methodology, check \`methodology/methodology.md\`, the analysis code, relevant documentation, and any project outputs related to the question. Answer the question directly using what you verified in those sources. If the sources disagree, explain where they differ and what you can confirm. When making an agreed correction, update the affected code, methodology notes, and outputs together. Rerun the analysis if the correction affects the results.

## Data analysis

Do data analysis and processing in \`sda/\`. Prioritize code that is easy to understand and review.

${analysisGuidance}

Use \`sda/main.ts\` for the project’s analysis. Keep one function per helper file in \`sda/helpers/\` and name the file after the function. Put source data in \`sda/data/\` and default to \`sda/output/\` for analysis exports.

Before calculating results, read the relevant “Method” and “Limitations” sections in \`methodology/methodology.md\` if they exist for the task. Check whether the current data meets the assumptions of the method you’ll use, reusing earlier checks that still apply. If the current data differs from what the methodology describes, tell the user what you found and how it affects the analysis. Agree with them on how to resolve the discrepancy before calculating results. Confirm what one row represents and check for missing or invalid values in the fields the analysis relies on. Look for exact duplicate rows and repeated identifiers where you expect one record per entity or event. Review distinct values and their counts for fields used to group, join, or filter. When joining tables, check for unmatched records and unexpected increases in row counts. Explain proposed cleaning rules in plain language, including any label standardization, show examples where helpful, and get the user’s agreement before applying them. Apply the agreed changes in code and preserve the original data. Compare row counts and relevant totals before and after cleaning, and explain any material differences to the user.

For each research question, write a helper in \`sda/helpers/\` that returns the table or value used to answer it. Name the function for what it calculates. In \`sda/main.ts\`, put a comment with the question number and full wording directly above the helper call.

When the user attaches data files in chat, copy them to \`sda/data/\` before processing and tell the user where you saved them.

Create charts when they help explain the data, a calculation, or a finding. Save static charts as \`.png\` files unless the user requests another format. Use \`sda/output/\` for chart drafts. When the Markdown document is the chosen output, have the analysis script save any figures embedded in the document to \`methodology/figures/\`.

Add focused tests under \`sda/test/\` for helper functions in \`sda/helpers/\`. Cover error-prone transformations, meaningful edge cases, and bug fixes. Call the same helper from the analysis and from its test. Keep assertions in test files. Mirror source paths under \`sda/test/\`. For example, \`sda/helpers/cleanRows.ts\` maps to \`sda/test/helpers/cleanRows.test.ts\`. Prefer the runtime's built-in test runner. When closing a \`SimpleDB\` in a test, always use \`await sdb.close({ pruneCache: false })\`.

When useful, test the research question’s helper with the same data used for the analysis and assert the expected answer. If the user agrees to a revised method, check what the helper should return for the same data and update the test’s expected answer if needed. To check whether a data refresh changed the answer, compare the fresh result with the previously agreed result and review any difference with the user.

To run the analysis once, use \`${run} sda\`. It fixes and checks code before running the analysis. If the analysis watcher is running, this command requests a run from the watcher and returns its output and exit code when it finishes.

Run \`${run} sda:clean\` only when cached results and temporary files can be discarded.

Before handing off analysis code changes, start with \`${run} sda:test\`. If formatting or lint checks fail, use \`${run} sda:fix\` for automatic fixes. Resolve any remaining failures and rerun \`${run} sda:test\` until it passes.

If \`methodology/methodology.md\` exists, add your model name under “Data analysis” in its “AI models used” list.

## Web projects

If the user asks for a web page, dashboard, or interactive visualization, create \`src/site/\` for the site. Put \`index.html\` at the root, keep all required assets in the site folder, and use relative URLs. Use HTML, CSS, and vanilla JavaScript with classic script tags unless the user specifies a different stack.

Use \`methodology/methodology.md\` as the record of the project’s data analysis and the source for what the site reports. Use the documented definitions, filters, and results, and include any limitations readers need to interpret them. When the site needs a new calculation or finding, follow the Research methodology steps above and document the work before adding the result to the site. Update the affected site content when the analysis changes.

Once the findings are ready, propose a short outline. For an investigation, start the outline with a short “Summary of findings”, followed by one section per featured research question by default. Start each question’s section with the numbered question as the heading, then give a short answer and the findings that support it. Follow with a chart or table when it helps explain the findings. Add controls such as buttons or filters when they help readers explore the findings. End each question’s section with a “Methodology” panel that is collapsed by default and expands to show the method and limitations for that question. Ask about open choices such as which findings to feature and how to organize them. Get the user’s sign-off on the outline before building.

When the same agreed cleaning rules affect how readers interpret findings from more than one research question, propose a short “Data preparation” section before the first question in the website outline. Cover question-specific cleaning in the relevant “Methodology” panels.

Default to one page unless the user requests or approves multiple pages.

Write concise, accurate web copy in plain language for a general audience, including chart labels and captions. Explain terms the audience may find unfamiliar.

Add your model name under “Presentation” in the methodology when you contribute to the website. Always ask the user directly what name and any contact details they want shown under “Author”. At the top of each page, show the author details the user chooses to share, the data sources used on that page with links where available, the “Last updated” timestamp, and the “AI models used” list from the methodology. Refresh the timestamp when the page’s content or data changes.

In each page’s footer, write “Project set up with the [setup-data-project skill](https://github.com/nshiab/setup-data-project).” If the analysis used \`@nshiab/simple-data-analysis\`, add “Data processed and analyzed with the [simple-data-analysis TypeScript library](https://github.com/nshiab/simple-data-analysis).”

Include logos, navigation bars, download buttons, and separate methodology sections only when the user explicitly requests them or they are essential to fulfilling the request.

When the site needs data, prepare it in \`sda/\` and export only what the page needs as JSON to \`sda/output/\`. Have the analysis script regenerate \`data.js\` in the site folder whenever that export changes. Load \`data.js\` before the page code so recipients can unzip the site and double-click \`index.html\` without a server.

Render web charts in JavaScript from the analysis results in \`data.js\`. Add web dependencies only when the user explicitly requests them. ${chartGuidance}

Make web charts responsive to the width of their container. With Observable Plot, render at the container’s measured width and replace the chart in place when that width changes.

Make web data tables sortable by column. Activating a column header again reverses the sort order. Show which column is sorted and in which direction.

When a map would help, ask during outline review whether a static map is enough or readers need an interactive map. Approval of an interactive map covers using MapLibre GL JS and OpenFreeMap as an exception to the web dependency, local asset, and classic script defaults. Briefly tell the user which map library and basemap the site will use and that they load over the internet. When adding MapLibre, run \`${maplibreVersionCommand}\` and substitute the returned version for \`VERSION\` in both UNPKG URLs. Load the stylesheet from \`https://unpkg.com/maplibre-gl@VERSION/dist/maplibre-gl.css\` and import \`Map\` from \`https://unpkg.com/maplibre-gl@VERSION/dist/maplibre-gl.mjs\` in an inline \`<script type="module">\`. MapLibre loads its worker automatically. Use \`https://tiles.openfreemap.org/styles/liberty\` as the basemap style and keep its built-in attribution visible. Load \`data.js\` before the map script and pass the project's geographic data directly as a GeoJSON source. Consult the [MapLibre GL JS API reference](https://maplibre.org/maplibre-gl-js/docs/API/) as needed.

In \`package.json\`, add a script that runs \`${run} sda:preview\`. Use \`sda:dash\` for a dashboard, \`sda:interactive\` for a standalone interactive visualization, or \`sda:web\` for other web pages. For a different site folder, pass its path with \`--dir\`, for example \`${previewOverride}\`. Reuse an existing alias if it runs the same command. If the preferred name is taken, preserve the existing script and choose an unused name.

After any required outline sign-off, create an initial \`index.html\` if needed. Before building out the page, run the preview alias or reuse an existing preview for the site. Open the preview and share its URL and the alias command with the user right away. Tell them the page refreshes as site files change so they can follow along. The preview serves and watches only the site folder. Keep it running while you work, then check the finished page and its interactions.

The \`sda:fix\`, \`sda:test\`, \`sda:watch\`, and \`sda:test:watch\` scripts target analysis code in \`sda/\`. Use the browser preview to verify web changes. Leave download buttons unclicked during browser checks to avoid opening a save dialog. Check the download handler and the data it prepares directly. When adding automated web tests at the user's request or to cover complex behavior, create \`src/test/\` and add a matching \`package.json\` script such as \`sda:dash:test\` that runs only the web tests using the project's test runner.`,
  });
}
