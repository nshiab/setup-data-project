# setup-data-project

Set up a TypeScript data analysis project with Node.js or Bun.
Generated development commands use the selected runtime.

The library is maintained by [Nael Shiab](https://naelshiab.com/), computational
journalist and senior data producer for [CBC News](https://www.cbc.ca/news).

> [!TIP]
> To learn how to use these libraries and more, check out
> [Code Like a Journalist](https://www.code-like-a-journalist.com/), a free and
> open-source data analysis and data visualization course in TypeScript.

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
Library flags keep existing dependency versions and cannot be combined with `--docs`.

The project includes `sda/main.ts`, helpers, data and output folders,
`.env`, `.gitignore`, and managed sections in README.md and AGENTS.md.
Existing source files, environment values, scripts, tooling configuration,
and unmanaged documentation are preserved.
Remove the generated section or its markers from README.md or AGENTS.md to stop updates to that file.

Generated projects run TypeScript directly with Node or Bun. Oxfmt and Oxlint
provide formatting, linting, and TypeScript checking through oxlint-tsgolint.
Put tests in `sda/test/`. Use these commands
(replace `npm run` with `bun run` for Bun projects):

- `npm run sda`: run `fix`, then execute `sda/main.ts` once if checks pass.
- `npm run sda:watch`: do the same on changes to `sda/` and `.env`, excluding `sda/output/`.
- `npm run sda:status`: check whether an SDA run or watcher is active.
- `npm run all-tests`: check formatting, lint, and TypeScript types.
- `npm run fix`: format files, apply automatic lint fixes, and check types.
- `npm run docs`: refresh documentation for the installed library versions.
- `npm run clean`: delete cached results and temporary files in `.sda-cache/`, `.journalism-cache/`, and `.tmp/`.

The watcher comes from the installed setup-data-project package; no runner script is added to your project.
SDA blocks simultaneous runs. Recovery after a forced termination is best effort.
New development tools are installed at their latest versions; existing dependencies
are preserved.

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

After cloning or changing dependencies, run `npm run docs` or `bun run docs`.
You can also refresh documentation directly:

```sh
npx @nshiab/setup-data-project --docs
bunx --bun @nshiab/setup-data-project --docs
```

`--docs` requires installed dependencies and only refreshes documentation. It
runs no prompts or installs and leaves project configuration unchanged.
Failed downloads preserve previous files, warn that they may be stale, and
exit unsuccessfully. Generated docs scripts pin the setup CLI version that
created them. Use `--help` for usage.

For development, use `npm ci` and `npm run all-tests`.
Releases use `npm run patch`, `npm run minor`, or `npm run major` from main;
GitHub Actions publishes to npm.

To cache documentation for the latest Observable Plot version, run:

```sh
npm run cache-plot-docs
```

This checks npm and skips generation if that version is already cached. To generate
or refresh a specific version, run `npm run cache-plot-docs -- 0.6.17`.
Review and commit `docs-cache/observable-plot/<version>/llm.md`; keep earlier
versions for pinned projects. The command fetches the tagged upstream pages and license.
