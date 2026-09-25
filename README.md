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
  including its API index and chart examples, and links it from `AGENTS.md`.
- Updates project configuration (e.g., `deno.json` or `package.json`) with
  relevant tasks.

The library is maintained by [Nael Shiab](http://naelshiab.com/), computational
journalist and senior data producer for [CBC News](https://www.cbc.ca/news).
