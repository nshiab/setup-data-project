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

The project includes `sda/main.ts`, helpers, tests, data and output folders,
`.env`, `.gitignore`, and managed sections in README.md and AGENTS.md.
Existing source files, environment values, scripts, tooling configuration,
and unmanaged documentation are preserved.

Generated projects run TypeScript directly with Node or Bun. Vite+ provides
formatting, linting, type checking, and Vitest tests. Use `npm run sda`,
`npm run all-tests`, and `npm run fix` (or `bun run` for Bun projects).
Existing test commands remain in place.
New development tools are installed at their latest versions; existing dependencies
are preserved.

VS Code configuration recommends the Vite+ extension pack and enables formatting,
lint fixes on save, and visual line wrapping. Existing `.vscode/extensions.json`
and `.vscode/settings.json` files are left unchanged.

Documentation is downloaded automatically for the exact installed library
versions. Each library's release archive preserves its README, license,
`llms.txt` index, granular API pages, and media under `docs/<library>/`.
Observable Plot uses its version-matched source documentation or cached reference.
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
`npx vp pack` produces the npm executable. Releases use `npm run patch`,
`npm run minor`, or `npm run major` from main; GitHub Actions publishes to npm.
