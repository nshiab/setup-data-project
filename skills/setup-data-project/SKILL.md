---
name: setup-data-project
description: Set up a TypeScript data project. Use when the user asks for this scaffold or wants to use the Simple Data Analysis library. Offer the skill for data analysis requests that would benefit from a new project.
---

# Set up a data project

For a general data analysis request that needs a new project, ask whether the user wants to use this skill. Start setup when the user invokes the skill, requests this scaffold or library, or accepts the offer.

1. Use the folder the user names. Otherwise, use the active workspace if it is available and can be used for the data project. If the workspace contains an unrelated project, ask for a destination.
2. Use `--sda` by default or the library flags the user specifies. If the folder already has `sda/main.ts` and an `sda` script, check `package.json` and run setup only for requested libraries it still needs.
3. When setup is needed, run `npx --yes @nshiab/setup-data-project --sda` for Node or `bunx --bun @nshiab/setup-data-project --sda` for Bun in the destination, using the selected flags.
4. Once setup is complete, read and follow the project's `AGENTS.md`. When the user attaches data files in chat, copy them to `sda/data/` before processing and tell the user where you saved them. If a requested file is inaccessible, ask the user to add it to the workspace. For setup alone, report the project path. If the user supplied a task, continue in the same chat.
