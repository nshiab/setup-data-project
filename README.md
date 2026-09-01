# setup-data-project

A CLI tool to quickly set up a data project with essential folders,
configurations, and documentation.

```sh
# Deno
deno run --min-dep-age=0 -A jsr:@nshiab/setup-data-project

# Node
npx @nshiab/setup-data-project

# Bun
bunx @nshiab/setup-data-project
```

The Deno dependency-age bypass is temporary while the 2.0 dependencies are newly
published. It is tracked for removal in
[issue #15](https://github.com/nshiab/setup-data-project/issues/15).

- Creates a standardized folder structure.
- Ensures necessary files like `.env`, `.gitignore`, and `README.md` exist.
- Lets you choose between
  [simple-data-analysis-core](https://github.com/nshiab/simple-data-analysis-core),
  the full
  [simple-data-analysis](https://github.com/nshiab/simple-data-analysis/)
  package, and [journalism](https://github.com/nshiab/journalism) libraries,
  then fetches their documentation for LLM use.
- Updates project configuration (e.g., `deno.json` or `package.json`) with
  relevant tasks.

The library is maintained by [Nael Shiab](http://naelshiab.com/), computational
journalist and senior data producer for [CBC News](https://www.cbc.ca/news).
