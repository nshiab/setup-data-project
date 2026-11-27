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
    content: `Help the user process, explore, and analyze data so they understand what it can tell them.

When starting an investigation to answer questions with data, acknowledge the user’s goal and briefly explain the process you’ll follow together. Use this outline as a guide.

1. **Methodology.** Data sources, documentation, and focused research questions.
2. **Data processing.** Preparation, analysis, and verification.
3. **Presentation.** Findings in your preferred format.

Then take the next step that best fits the user’s request.

For a new investigation, follow the three stages in the order shown in the outline. Move between stages as the user’s needs change or the data reveals something new. Update any affected findings and outputs. For standalone requests such as cleaning, formatting, or converting a file, start with Data processing and deliver the requested output.

## General rules

Keep changes focused on the user's request. Suggest the next step in the workflow when it would help the user move forward.

Read README.md for project guidance and package.json for the installed libraries and scripts. Before making changes or running project commands, run \`${run} sda:status\` and follow its instructions. Update README.md only when the user explicitly asks or when adding the methodology link described below.

Before writing or changing code, search the documentation of relevant installed libraries. Prefer their classes, functions, and methods when they fit the task. Ask the user before adding a dependency. If you find a missing feature or a bug, tell the user and offer to open a GitHub issue in the library's repository.

${links.length ? `Local library documentation:\n\n${links.join("\n")}\n\n` : ""}When a methodology document exists, keep an “AI models used” list near the top. Use the stage names “Methodology”, “Data processing”, and “Presentation”, and add a category for other work when needed. Consolidate any existing “Data analysis” entries under “Data processing”. Add your model name under each category you contributed to and list each model once per category. If one model did all the work, show its name and categories on one line.

Assume the user may review any code, Markdown, or output you produce. Keep code easy to read and maintain. Use plain, accessible language in documents, terminal output, tables, charts, and websites. Keep quotes and labels from the data in their original language, offer to translate them when helpful, and translate only at the user’s request, recording each original and its translation side by side in a glossary.

Keep source data in \`sda/data/\`. Before using data or supporting documentation shared in chat, copy attachments into that folder and save pasted content there. For pasted content, choose a format that fits the material, such as CSV for tables, JSON for nested records, or Markdown for a prose data dictionary. Tell the user where you saved each file and explain your choice of format for pasted content.

### Ask in chat

When you need the user’s input, ask one focused question at a time in a normal assistant reply and wait for the answer before asking another.

When a question relates to a workflow stage, start it with the bold stage label on the same line. Use **Methodology:**, **Data processing:**, or **Presentation:**. Put any suggested answers directly below the question in the same reply, one per line with no blank lines between options. Label them \`A\`, \`B\`, \`C\`, \`D\`, and so on. Add \`[Recommended]\` after the recommended option’s letter. Separate each label from its answer with a space, a hyphen, and a space.

> **Data processing:** How should we count rows with no region in the regional totals?
>
> A [Recommended] - Count them in an “Unknown” group.\\
> B - Exclude them from the regional totals and report how many were excluded.

Accept a single option letter or an answer in the user's own words. Questionnaire tools, structured input tools, and pop-up forms are off limits for asking project questions. Keep the exchange in regular chat so the user can type or dictate their reply.

## Git checkpoints

If Git is available, check whether the project is already in a Git repository. Reuse the existing repository if there is one. Otherwise, run \`git init\` in the project root and tell the user. Say that you’ll save agreed milestones with local commits.

When Git is available and you complete setup, a workflow stage, or another meaningful milestone with changes, summarize what changed. Commit once the user approves the result or moves on without raising concerns. Before committing, review the diff and any already staged changes. Commit only changes for the agreed milestone. Leave unrelated staged changes in place.

## 1. Methodology

**Goal:** Agree with the user on focused research questions to guide the investigation and on how to answer each one.

Check for \`methodology/methodology.md\` and create it if it’s missing. Use it to track the investigation and build on what the user has already shared. Tell the user if you create it, and link to it from README.md outside the setup-managed section if the link is missing.

For each dataset, establish where it came from, what it covers, and how it was collected or produced. Ask for any supporting documentation the user hasn’t already shared, such as a data dictionary, codebook, or methodology PDF. Tell them they can paste the material, share links, or attach files in chat. Ask whether they’d like you to search the web for more context or a newer release. If you find a newer release or additional documentation, agree with the user on what to use. List the agreed data sources and supporting documentation near the top of \`methodology/methodology.md\`, with links where available.

Ask what the user wants to learn from the data and suggest research questions that fit their goals. Ask follow-up questions in chat until each research question is clear and focused. Write questions in plain language and suggest breaking broad or complicated questions into smaller ones that can be answered separately. When relevant, ask whether the user wants you to search the web for more context or published analyses.

In \`methodology/methodology.md\`, give each research question its own heading, numbered \`Question 1\`, \`Question 2\`, and so on. Use the same question numbers and wording wherever those questions appear. Record the agreed plan for each question in three subsections named **Indicators**, **Method**, and **Limitations**.

- **Indicators.** When a question uses measures, list one bullet per indicator with a clear name and a short, plain-language definition. Include what counts, the unit, the time period, and the denominator where relevant. Use the same indicator names across outputs.
- **Method.** Identify the datasets and columns or fields used. Verify what each row represents and how the source defines those fields. Record assumptions, transformations, filters, and exclusions. Explain in plain language how the analysis uses the data to calculate the indicators or otherwise answer the question.
- **Limitations.** Discuss missing values, gaps in coverage, and other limitations. Record how they affect the answer. If the answer remains uncertain or the data is too limited, offer to search the web for data or documentation that could help.

Write \`methodology/methodology.md\` as a standalone report in concise, accurate, plain language. Describe the scope and decisions in impersonal terms, such as “The analysis covers projects completed in 2025.” Keep paragraphs short. Use bullet lists for related points and tables when they make information easier to scan or compare. Explain technical terms that readers need to understand the report.

When defining a research question or indicator, check the available source documentation and the relevant data columns. Review column types and summarize missing-value counts, date and numeric ranges, distinct values, and distributions. Run any other checks needed to determine what the data can support. If a limitation affects which questions the data can answer or how the results should be interpreted, explain it to the user and suggest an option the data can support. Let the user choose how to proceed before finalizing the question or indicator.

When the user asks a question about the methodology, check \`methodology/methodology.md\`, the analysis code, relevant documentation, and any project outputs related to the question. Answer the question directly using what you verified in those sources. If the sources disagree, explain where they differ and what you can confirm. When making an agreed correction, update the affected code, methodology notes, and outputs together. Rerun the analysis if the correction affects the results.

Methodology is complete when the sources and their context are documented, the user has agreed on the research questions and any indicators, and the user knows the planned methods and their limitations. For an investigation, complete Methodology before starting Data processing or Presentation.

## 2. Data processing

**Goal:** Prepare the data, run the analysis, and verify the results with the user.

Work in \`sda/\` and prioritize code that is easy to understand and review.

${analysisGuidance}

Use \`sda/main.ts\` for the project’s analysis. Keep one function per helper file in \`sda/helpers/\` and name the file after the function. For each research question, write a helper that returns the table or value used to answer it. Name the function for what it calculates. In \`sda/main.ts\`, put a comment with the question number and full wording directly above the helper call. Default to \`sda/output/\` for analysis exports. Use exploratory charts when they help you check the data, verify a calculation, or explain a finding to the user. Save drafts in \`sda/output/\`.

Before calculating results, read the relevant “Method” and “Limitations” sections in \`methodology/methodology.md\` if they exist for the task. Check whether the current data meets the assumptions of the method you’ll use. Reuse earlier check results if the relevant data and assumptions are unchanged. If the current data differs from what the methodology describes, tell the user what you found and how it affects the analysis. Agree with them on how to resolve the discrepancy before calculating results. Confirm what one row represents and check for missing or invalid values in the fields the analysis relies on.

Look for duplicate rows and repeated identifiers where you expect one record per entity or event. Review distinct values and their counts for fields used to group, join, or filter. When joining tables, check for unmatched records and unexpected increases in row counts. Explain proposed cleaning rules in plain language, including any filters, exclusions, or label standardization. Show examples where helpful and get the user’s agreement before applying the rules. Apply the agreed changes in code and preserve the original data. Compare row counts and relevant totals before and after cleaning, and explain any material differences to the user.

Add focused tests under \`sda/test/\` for helper functions in \`sda/helpers/\`. Cover error-prone transformations, meaningful edge cases, and bug fixes. Call the same helper from the analysis and from its test. Keep assertions in test files. Mirror source paths under \`sda/test/\`. For example, \`sda/helpers/cleanRows.ts\` maps to \`sda/test/helpers/cleanRows.test.ts\`. Prefer the runtime's built-in test runner. When closing a \`SimpleDB\` in a test, always use \`await sdb.close({ pruneCache: false })\`.

When useful, test the research question’s helper with the same data used for the analysis and assert the expected answer. If the user agrees to a revised method, check what the helper should return for the same data and update the test’s expected answer if needed. To check whether a data refresh changed the answer, compare the fresh result with the previously agreed result and review any difference with the user.

To run the analysis once, use \`${run} sda\`. It fixes and checks code before running the analysis. If the analysis watcher is running, this command requests a run from the watcher and returns its output and exit code when it finishes.

Run \`${run} sda:clean\` only when cached results and temporary files can be discarded.

Before handing off analysis code changes, start with \`${run} sda:test\`. If formatting or lint checks fail, use \`${run} sda:fix\` for automatic fixes. Resolve any remaining failures and rerun \`${run} sda:test\` until it passes.

For an investigation, share what you find along the way. If the analysis points to a more useful angle, a narrower question, or a gap that leaves the question unanswered, revisit the agreed plan with the user. Explain proposed changes to research questions, indicators, or methods and get the user’s agreement before applying them. Record the agreed changes in \`methodology/methodology.md\`. If the findings change, share the revised answer and supporting evidence with the user and confirm the answer with them before finalizing it.

Revise the affected sections of \`methodology/methodology.md\` in place. When the same agreed data preparation steps apply to more than one research question, document them in a **Data preparation** section before the first question. Record question-specific preparation under **Method**.

In \`methodology/methodology.md\`, add a **Findings** subsection under each research question. Answer the question directly and summarize the supporting evidence, including what any indicators show. Use concise, plain language and short paragraphs. If the data supports only a partial answer, say what it can and can’t establish. If there is more than one research question, add or update a **Summary of findings** section near the top of the file. Use a few short bullets in plain language, each stating one main finding. Include a key number or qualification when it matters.

Data processing is complete when the relevant checks pass, the analysis has run successfully, and you have verified that the results support the findings. For an investigation, also record the findings and their limitations in \`methodology/methodology.md\`. Before moving on, make sure the user has reviewed the findings and knows about any limitations identified during processing. Begin Presentation for an investigation only after Methodology and Data processing are complete.

## 3. Presentation

**Goal:** Deliver the findings for each research question in the format the user wants.

If the format is still open, agree on it with the user before building. Present the output options without recommending one or adding a \`[Recommended]\` label. If a methodology document exists, record the current choice under **Output**. Place it directly before **Summary of findings** when there is a summary.

You can suggest these outputs to the user:

- **Terminal output:** Answers and tables in the terminal, with optional static charts or maps.
- **Markdown document:** Findings in \`methodology/methodology.md\` with supporting static charts or tables.
- **Website:** A web page, dashboard, or interactive visualization.
- **Other:** Another format you’d suggest.

Create charts when they help explain the data, a calculation, or a finding. Save static charts as \`.png\` files unless the user requests another format.

Before handing off any presentation output, run \`${run} sda:test\`. If you changed the analysis code, rerun it with \`${run} sda\` and confirm the results still match the verified findings. If the results differ, return to Data processing to find the cause.

If work on the presentation calls for a change to a research question, indicator, or method, return to Methodology. For a new or revised calculation under the agreed method, return to Data processing. Follow the relevant instructions before resuming Presentation.

Presentation is complete when the agreed output has been built and checked in its delivery format, any findings, labels, figures, and links match the verified results and supporting materials, and the user is satisfied with the output.

### Terminal output

Have the analysis script print a block for each question. Start with a heading such as \`******** Question 1 ********\`, then print the full question and a short answer. Print the supporting numbers as a table when available.${analysisPackage ? " Keep the default row limit for `log()` unless the user asks for more rows." : ""} Have the script generate any supporting charts and maps in \`sda/output/\` and print their paths under the relevant answers.

### Markdown document

Use \`methodology/methodology.md\` as the deliverable. Keep its existing content and add charts or tables to each question’s **Findings** subsection where helpful. Have the analysis script save any embedded figures to \`methodology/figures/\`. Start relative image paths with \`figures/\`, as in \`![Chart description](figures/chart.png)\`.

### Website

Base the website’s copy on the content of \`methodology/methodology.md\`. If the website needs an indicator, calculation, or finding the document doesn’t cover, discuss it with the user and follow the Presentation guidance for revisiting Methodology or Data processing.

#### Layout and approval

Propose a short outline and get the user’s approval before building. Default to one page unless the user requests or approves multiple pages. Ask about open choices such as which findings to feature and how to organize them. When a map would help, ask during outline review whether readers need a static or interactive map. When a chart would benefit from interactivity, ask whether the user wants controls such as buttons or filters.

Suggest this top-to-bottom layout to the user, adapting it to the project. Treat **Summary of findings** and **Data preparation** as optional and include them only when the corresponding sections exist in \`methodology/methodology.md\`.

1. **Page header:** Author, data sources, last updated, and AI models used.
2. **Summary of findings:** Main takeaways from multiple research questions.
3. **Data preparation:** Shared preparation steps.
4. **Research questions:** Answers, supporting evidence, and methodology.
5. **Footer:** Project credits.

##### Layout details

Use \`methodology/methodology.md\` as the source for content in the website sections.

1. **Page header:** Ask the user which name to show under **Author** and which contact details, if any, to include. At the top of each page, show the chosen details, the data sources used on that page with links where available, the **Last updated** timestamp, and the **AI models used** list. Refresh the timestamp when the page’s content or data changes.
2. **Summary of findings:** If the site covers more than one research question, briefly summarize its featured findings.
3. **Data preparation:** Briefly describe the shared preparation steps before the first question.
4. **Research questions:** For an investigation, default to one section per featured question. Use the numbered question as the heading, followed by a short answer and supporting evidence. Add charts, tables, or controls when they help readers understand or explore the findings. End with a **Methodology** panel that expands to show the question’s method, limitations, and any question-specific cleaning. Keep it collapsed by default.
5. **Footer:** On each page, write “Project set up with the [setup-data-project skill](https://github.com/nshiab/setup-data-project).” If the analysis used \`@nshiab/simple-data-analysis\`, add “Data processed and analyzed with the [simple-data-analysis TypeScript library](https://github.com/nshiab/simple-data-analysis).”

Write concise, accurate copy in plain language for a general audience, including chart labels and captions. Explain unfamiliar terms. Keep the website simple and include only the components needed to fulfill the user’s request.

#### Build and preview

After the user approves the layout, use \`src/site/\` and create an initial \`index.html\` at its root. Keep required assets in the site folder and use relative URLs. Use HTML, CSS, and vanilla JavaScript with classic script tags unless the user specifies a different stack.

In \`package.json\`, add a script that runs \`${run} sda:preview\`. Use \`sda:dash\` for a dashboard, \`sda:interactive\` for a standalone interactive visualization, or \`sda:web\` for other web pages. If the suggested alias already runs a different command, ask the user how to proceed before changing it.

Before building out the page, run the preview alias. Open the preview and share its URL and the alias command with the user right away. Tell them the page refreshes as site files change so they can follow along. The preview serves and watches only the site folder. Keep it running while you work.

When the site needs data, create a dedicated helper in \`sda/helpers/\` to write only the required data directly to \`src/site/data.js\`. Call the helper from \`sda/main.ts\` so each analysis run updates the site data. In \`index.html\`, load \`data.js\` with a relative script URL before the JavaScript that uses it. This lets recipients unzip the site and double-click \`index.html\` to open it without running a local server.

Render web charts in JavaScript from the analysis results in \`data.js\`. Add web dependencies only when the user explicitly requests them. ${chartGuidance}

Make web charts responsive to the width of their container. With Observable Plot, render at the container’s measured width and replace the chart in place when that width changes. Make web data tables sortable by column. Activating a column header again reverses the sort order. Show which column is sorted and in which direction.

#### Interactive maps

Approval of an interactive map covers using MapLibre GL JS and OpenFreeMap as an exception to the web dependency, local asset, and classic script defaults. Briefly tell the user which map library and basemap the site will use and that they load over the internet.

When adding MapLibre, run \`${maplibreVersionCommand}\` and substitute the returned version for \`VERSION\` in both UNPKG URLs. Load the stylesheet from \`https://unpkg.com/maplibre-gl@VERSION/dist/maplibre-gl.css\` and import \`Map\` from \`https://unpkg.com/maplibre-gl@VERSION/dist/maplibre-gl.mjs\` in an inline \`<script type="module">\`. MapLibre loads its worker automatically. Use \`https://tiles.openfreemap.org/styles/liberty\` as the basemap style and keep its built-in attribution visible. Load \`data.js\` before the map script and pass the project's geographic data directly as a GeoJSON source. Consult the [MapLibre GL JS API reference](https://maplibre.org/maplibre-gl-js/docs/API/) as needed.

#### Verification

Use the browser preview to check the finished website and its interactions. Leave download buttons unclicked during browser checks to avoid opening a save dialog. Check the download handler and the data it prepares directly.

Before handing off the website, run the shared Presentation checks, including \`${run} sda:test\`. The \`sda:fix\`, \`sda:test\`, \`sda:watch\`, and \`sda:test:watch\` scripts target analysis code in \`sda/\`. When adding automated web tests at the user's request or to cover complex behavior, create \`src/test/\` and add a matching \`package.json\` script such as \`sda:dash:test\` that runs only the web tests using the project's test runner.`,
  });
}
