# setup-data-project

A CLI tool to quickly set up a data project with essential folders,
configurations, and documentation.

```sh
# Deno
deno run -A jsr:@nshiab/setup-data-project

npx @nshiab/setup-data-project

bunx @nshiab/setup-data-project
```

- Creates a standardized folder structure.
- Ensures necessary files like `.env`, `.gitignore`, and `README.md` exist.
- Installs
  [simple-data-analysis](https://github.com/nshiab/simple-data-analysis/) and
  [journalism](https://github.com/nshiab/journalism) libraries and fetches their
  documentation for LLM use.
- Updates project configuration (e.g., `deno.json` or `package.json`) with
  relevant tasks.

The library is maintained by [Nael Shiab](http://naelshiab.com/), computational
journalist and senior data producer for [CBC News](https://www.cbc.ca/news).
