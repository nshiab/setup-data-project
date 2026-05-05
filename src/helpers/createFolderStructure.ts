import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { log } from "@clack/prompts";
import { handleFileConflict } from "./handleFileConflict.ts";

export async function createFolderStructure(selectedPackages: string[]) {
  const sdaFolder = "sda";
  const folders = ["data", "helpers", "output"];

  if (!existsSync(sdaFolder)) {
    mkdirSync(sdaFolder, { recursive: true });
  }

  for (const folder of folders) {
    const path = join(sdaFolder, folder);
    if (!existsSync(path)) {
      mkdirSync(path, { recursive: true });
    }
  }

  const mainTsPath = join(sdaFolder, "main.ts");

  let mainTsContent = 'console.log("Hello simple-data-analysis!");\n';

  if (
    selectedPackages.includes("@nshiab/simple-data-analysis") ||
    selectedPackages.includes("@nshiab/simple-data-analysis-core")
  ) {
    const pkg = selectedPackages.includes("@nshiab/simple-data-analysis")
      ? "@nshiab/simple-data-analysis"
      : "@nshiab/simple-data-analysis-core";
    mainTsContent = `import { SimpleDB } from "${pkg}";

const sdb = new SimpleDB();
const table = sdb.newTable();

// Do your magic here!
// await table.loadData("./sda/data/...");

await sdb.done();
`;
  }

  const status = await handleFileConflict(mainTsPath, mainTsContent);
  if (status === "updated") {
    log.info(`Updated ${mainTsPath}`);
  }

  return sdaFolder;
}
