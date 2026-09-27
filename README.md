# setup-data-project

A CLI tool to quickly set up a data project with essential folders,
configurations, and documentation.

```sh
# Deno
deno run -A jsr:@nshiab/setup-data-project

# Node
npx @nshiab/setup-data-project

# Bun
bunx @nshiab/setup-data-project
```

To select a library without prompts, add `--sda` or `--sda-core`:

```sh
deno run -A jsr:@nshiab/setup-data-project --sda
npx @nshiab/setup-data-project --sda-core
bunx @nshiab/setup-data-project --sda
```

These flags still create the usual project files and documentation, preserve
existing package versions, and cannot be combined. Without a flag, library
selection is interactive. Use `--help` for usage.

- Creates a standardized folder structure.
- Ensures necessary files like `.env`, `.gitignore`, and `README.md` exist.
- Lets you choose between
  [simple-data-analysis-core](https://github.com/nshiab/simple-data-analysis-core),
  the full
  [simple-data-analysis](https://github.com/nshiab/simple-data-analysis/)
  package, and [journalism](https://github.com/nshiab/journalism) libraries,
  then fetches their README files and complete API documentation from the
  matching version tags on GitHub for LLM use.
- Fetches version-matched Observable Plot documentation when Plot is installed,
  using a single pre-generated download when available. Otherwise, it combines
  42 selected pages for static charts and maps into
  `docs/observable-plot/llm.md`. The reference is linked from `AGENTS.md`.
- Updates project configuration (e.g., `deno.json` or `package.json`) with
  relevant tasks.

To prepare the stored Plot reference for another version, run
`deno task cache-plot-docs 0.6.17` with the desired exact version. Review and
commit the resulting `docs-cache/observable-plot/<version>/llm.md`. Setup
downloads it from this repository's `main` branch; keep earlier versions for
pinned projects. The generated reference includes its source, version, and
upstream license and is automatically formatted with `deno fmt` before saving.

The library is maintained by [Nael Shiab](http://naelshiab.com/), computational
journalist and senior data producer for [CBC News](https://www.cbc.ca/news).
