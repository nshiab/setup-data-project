import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export function createFolderStructure(selectedPackages: string[]) {
  const sdaFolder = "sda";
  const folders = ["data", "helpers", "output"];

  mkdirSync(sdaFolder, { recursive: true });
  for (const folder of folders) {
    mkdirSync(join(sdaFolder, folder), { recursive: true });
  }

  let mainTsContent = 'console.log("Hello simple-data-analysis!");\n';

  if (selectedPackages.includes("@nshiab/simple-data-analysis")) {
    mainTsContent = `import { SimpleDB } from "@nshiab/simple-data-analysis";

const sdb = new SimpleDB();
const table = await sdb.newTable();

// Do your magic here!

await sdb.done();
`;
  }

  writeFileSync(join(sdaFolder, "main.ts"), mainTsContent);

  return sdaFolder;
}
