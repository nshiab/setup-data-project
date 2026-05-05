import { log } from "@clack/prompts";
import { handleFileConflict } from "./handleFileConflict.ts";

export async function ensureReadme(runtime: string) {
  const readmeContent = `This repository has been created with
[setup-data-project](https://github.com/nshiab/setup-data-project/).

It's installing
[simple-data-analysis](https://github.com/nshiab/simple-data-analysis) and
[journalism](https://github.com/nshiab/journalism) libraries, with up-to-date
documentation and AI agent instructions.

Here's the recommended workflow:

- Put your raw data in the \`sda/data\` folder. Note that this folder is
  gitignored.
- Use the \`sda/main.ts\` file to clean and process your raw data. Write the
  results to the \`sda/output\` folder.

When working on your project, use the following command:

- \`${
    runtime === "deno" ? "deno task" : "npm run"
  } sda\` will watch your \`sda/main.ts\` and its dependencies. Everytime
  you'll save some changes, the data will be reprocessed.
- \`${
    runtime === "deno" ? "deno task" : "npm run"
  } clean\` will remove \`.sda-cache/\`, \`.journalism-cache/\` and \`.tmp/\`,
  if present.

Have fun!`;
  const status = await handleFileConflict("README.md", readmeContent);
  if (status === "updated") {
    log.info("Updated README.md");
  }
}
