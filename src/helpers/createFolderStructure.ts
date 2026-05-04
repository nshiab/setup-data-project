import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { log } from "@clack/prompts";

export function createFolderStructure(selectedPackages: string[]) {
  const sdaFolder = "sda";
  const folders = ["data", "helpers", "output"];

  if (!existsSync(sdaFolder)) {
    mkdirSync(sdaFolder, { recursive: true });
    log.info(`Created folder ${sdaFolder}/`);
  } else {
    log.warn(`Folder ${sdaFolder}/ already exists. Skipping creation.`);
  }

  for (const folder of folders) {
    const path = join(sdaFolder, folder);
    if (!existsSync(path)) {
      mkdirSync(path, { recursive: true });
      log.info(`Created folder ${path}/`);
    } else {
      log.warn(`Folder ${path}/ already exists. Skipping creation.`);
    }
  }

  const mainTsPath = join(sdaFolder, "main.ts");
  if (!existsSync(mainTsPath)) {
    let mainTsContent = 'console.log("Hello simple-data-analysis!");\n';

    if (selectedPackages.includes("@nshiab/simple-data-analysis")) {
      mainTsContent = `import { SimpleDB } from "@nshiab/simple-data-analysis";

const sdb = new SimpleDB();
const table = await sdb.newTable();

// Do your magic here!

await sdb.done();
`;
    }

    writeFileSync(mainTsPath, mainTsContent);
    log.info(`Created ${mainTsPath}`);
  } else {
    log.warn(`${mainTsPath} already exists. Skipping creation.`);
  }

  return sdaFolder;
}
