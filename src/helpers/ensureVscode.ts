import { existsSync, mkdirSync, writeFileSync } from "node:fs";

export function ensureVscode(): void {
  mkdirSync(".vscode", { recursive: true });
  const formatter = "oxc.oxc-vscode";
  const files = {
    "extensions.json": { recommendations: ["VoidZero.vite-plus-extension-pack"] },
    "settings.json": {
      "editor.defaultFormatter": formatter,
      "[javascript]": { "editor.defaultFormatter": formatter },
      "[javascriptreact]": { "editor.defaultFormatter": formatter },
      "[typescript]": { "editor.defaultFormatter": formatter },
      "[typescriptreact]": { "editor.defaultFormatter": formatter },
      "oxc.disableNestedConfig": true,
      "oxc.fmt.disableNestedConfig": true,
      "editor.formatOnSave": true,
      "editor.formatOnSaveMode": "file",
      "editor.codeActionsOnSave": { "source.fixAll.oxc": "explicit" },
      "editor.wordWrap": "on",
    },
  };
  for (const [name, config] of Object.entries(files)) {
    const path = `.vscode/${name}`;
    if (!existsSync(path)) writeFileSync(path, `${JSON.stringify(config, null, 2)}\n`);
  }
}
