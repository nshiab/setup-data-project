# setup-data-project

Set up a TypeScript data analysis project with Node.js or Bun.
Generated development commands use the selected runtime.

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

Use `--sda` or `--sda-core` for Simple Data Analysis, or the suffix of a journalism
library name, such as `--web-scraping`. Run `--help` for all available flags.
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

Maintained by [Nael Shiab](https://naelshiab.com/).
