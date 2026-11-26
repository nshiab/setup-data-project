# setup-data-project

Set up a TypeScript data analysis project with Node.js or Bun.
Generated development commands use the selected runtime.

The library is maintained by [Nael Shiab](https://naelshiab.com/), computational
journalist and senior data producer for [CBC News](https://www.cbc.ca/news).

> [!TIP]
> To learn how to use these libraries and more, check out
> [Code Like a Journalist](https://www.code-like-a-journalist.com/), a free and
> open-source data analysis and data visualization course in TypeScript.

## Install the skill for all projects

This repository includes the `setup-data-project` skill, which lets your coding
agent set up TypeScript data projects for you using this library.

Paste this into your coding agent to install the skill globally.

```text
Install the setup-data-project skill globally from this GitHub folder.
https://github.com/nshiab/setup-data-project/tree/main/skills/setup-data-project
```

If you prefer to install the skill from the terminal, run this with Node.js
22.20 or later and select your coding agent when prompted.

```sh
npx skills add nshiab/setup-data-project --skill setup-data-project --global
```

Once the skill is installed, open the folder you want to work in and invoke
`setup-data-project`. To start an analysis in the same message, attach your
data files and add a request like “Help me analyze this data” or “Summarize
sales by month.”

## Set up a project from the terminal

```sh
# Node
npx @nshiab/setup-data-project

# Bun
bunx --bun @nshiab/setup-data-project
```

The CLI uses the runtime that launches it. Its executable has a Node shebang,
so use `bunx --bun` to explicitly run it with Bun.

Select libraries interactively, or combine library flags to install without prompts:

```sh
npx @nshiab/setup-data-project --sda
npx @nshiab/setup-data-project --format --geo --dataviz
bunx --bun @nshiab/setup-data-project --sda-core --ai
```

Available library flags:

- `--sda`: [simple-data-analysis](https://github.com/nshiab/simple-data-analysis)
- `--sda-core`: [simple-data-analysis-core](https://github.com/nshiab/simple-data-analysis-core)
- `--ai`: [journalism-ai](https://github.com/nshiab/journalism-ai)
- `--google`: [journalism-google](https://github.com/nshiab/journalism-google)
- `--web-scraping`: [journalism-web-scraping](https://github.com/nshiab/journalism-web-scraping)
- `--finance`: [journalism-finance](https://github.com/nshiab/journalism-finance)
- `--format`: [journalism-format](https://github.com/nshiab/journalism-format)
- `--climate`: [journalism-climate](https://github.com/nshiab/journalism-climate)
- `--dataviz`: [journalism-dataviz](https://github.com/nshiab/journalism-dataviz)
- `--geo`: [journalism-geo](https://github.com/nshiab/journalism-geo)
- `--statistics`: [journalism-statistics](https://github.com/nshiab/journalism-statistics)
- `--web`: [journalism-web](https://github.com/nshiab/journalism-web)
- `--extras`: [journalism-extras](https://github.com/nshiab/journalism-extras)

Run `--help` for usage.
Library flags install or update the selected libraries to their latest versions
without prompting, even if they are already installed. They cannot be combined
with `--docs`.

For example, to upgrade an existing SDA project and refresh its documentation:

```sh
npx @nshiab/setup-data-project@latest --sda
```

Without library flags, the interactive setup asks whether to keep each selected
installed library's existing version or update it to latest.

The project includes `sda/main.ts`, helpers, test, data and output folders,
`.env`, `.gitignore`, and managed sections in README.md and AGENTS.md.
Existing source files, environment values, scripts, tooling configuration,
and unmanaged documentation are preserved.
Remove the generated section or its markers from README.md or AGENTS.md to stop updates to that file.

The generated `AGENTS.md` explains how an AI agent works with you. The agent asks
questions and offers choices in chat, handles straightforward file processing
directly, and records research methods and findings in `methodology/methodology.md`
when you’re investigating a question. For websites, the agent shares a live
preview early so you can follow along.

Generated projects run TypeScript directly with Node or Bun. Oxfmt and Oxlint
provide formatting, linting, and TypeScript checking through oxlint-tsgolint.
Name tests `*.test.ts` and place them under `sda/`. Use `sda/test/` to keep tests
together. Bun projects need Bun 1.3.1 or newer for the empty test suite to pass.
Use these commands (replace `npm run` with `bun run` for Bun projects):

- `npm run sda`: run `sda:fix`, then execute `sda/main.ts` once if checks pass. If the analysis watcher is running, request the run from it and receive its output and exit code when it finishes.
- `npm run sda:watch`: do the same on changes to `sda/` and `.env`, excluding `sda/output/`.
- `npm run sda:status`: check whether an SDA run or watcher is active.
- `npm run sda:test`: check formatting, lint, and TypeScript types under `sda/`, then run its tests.
- `npm run sda:test:watch`: rerun those checks and tests on changes to `sda/`, `.env`, and `tsconfig.json`, excluding `sda/output/`.
- `npm run sda:clean`: delete cached results and temporary files in `.sda-cache/`, `.journalism-cache/`, and `.tmp/`.
- `npm run sda:fix`: format files, apply automatic lint fixes, and check types under `sda/`.
- `npm run sda:docs`: refresh documentation for the installed library versions.
- `npm run sda:preview`: serve a static site from `src/site/` and refresh the browser when its files change.

For a web project, put `index.html` and its assets in `src/site/`, run the preview command, and open the local URL it prints. Use `npm run sda:preview -- --dir src/report` (or `bun run sda:preview --dir src/report`) to serve and watch a different directory. You can upload the site directory directly to a static host. Keep any automated web tests in `src/test/`.
The analysis watcher and preview server come from the installed setup-data-project package.
You can leave `sda:watch` running while you or an agent edits files and runs `sda`, `sda:test`, or `sda:fix` in another terminal. The watcher runs one analysis at a time and replaces its result file in `.sda-cache/lock/` after each completed run. The file is removed when the watcher stops. The `sda:clean` command preserves the active lock and its contents.
New development tools are installed at their latest versions. Existing development
tools and libraries not selected for an update keep their declared versions.

VS Code configuration recommends the Oxc extension and enables formatting,
lint fixes on save, and visual line wrapping. Existing `.vscode/extensions.json`
and `.vscode/settings.json` files are left unchanged.

Documentation is downloaded automatically for the exact installed library
versions. Each library's release archive preserves its README, license,
`llms.txt` index, granular API pages, and media under `docs/<library>/`.
Observable Plot uses a cached reference for the installed version, falling back
to that version's upstream Git tag. Selected documentation for static charts and
maps is split into feature, mark, and transform pages, indexed at
`docs/observable-plot/llms.txt`. Website controls are removed; examples that depend
on upstream setup or interactive templates are labeled.
The generated `docs/` folder is ignored by Git.

After cloning or changing dependencies, run `npm run sda:docs` or `bun run sda:docs`.
You can also refresh documentation directly:

```sh
npx @nshiab/setup-data-project --docs
bunx --bun @nshiab/setup-data-project --docs
```

`--docs` requires installed dependencies and only refreshes documentation. It
runs no prompts or installs and leaves project configuration unchanged.
Failed downloads preserve previous files, warn that they may be stale, and
exit unsuccessfully. Generated docs scripts use the project's locally installed
setup CLI, so upgrading that dependency also updates the documentation command.
Use `--help` for usage.

For development, use `npm ci` and `npm run all-tests`.
Releases use `npm run patch`, `npm run minor`, or `npm run major` from main;
GitHub Actions publishes to npm.

To cache documentation for the latest Observable Plot version, run:

```sh
npm run cache-plot-docs
```

This checks npm and skips generation if that version is already cached. To generate
or refresh a specific version, run `npm run cache-plot-docs -- 0.6.18`.
Review and commit `docs-cache/observable-plot/<version>/llm.md`; keep earlier
versions for pinned projects. The command fetches the tagged upstream pages and license.
Push the cache to `main` to make it available to documentation downloads; it is
served directly from GitHub rather than included in the npm package. Changes to
the downloader itself also need an npm release. Plot 0.6.18 uses the upstream tag
`v.0.6.18`, which the downloader handles explicitly.
