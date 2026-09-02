import { log, spinner } from "@clack/prompts";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export interface PackageDocs {
  readme?: string;
  llm?: string;
}

const PACKAGE_DOCUMENTS = [
  {
    remoteName: "README.md",
    localName: "README.md",
    key: "readme",
    label: "README",
  },
  {
    remoteName: "llm.md",
    localName: "llm.md",
    key: "llm",
    label: "API documentation",
  },
] as const;

export async function fetchPackageDocs(
  pkg: string,
  version: string,
  options: { silent?: boolean } = {},
): Promise<PackageDocs> {
  const repoName = pkg.split("/")[1];
  const docsDirectory = join("docs", repoName);
  mkdirSync(docsDirectory, { recursive: true });

  const sFetch = spinner();
  if (!options.silent) {
    sFetch.start(`Fetching documentation for ${pkg}@${version}...`);
  }

  const fetchedDocuments = await Promise.all(
    PACKAGE_DOCUMENTS.map(async (document) => {
      const localPath = join(docsDirectory, document.localName);

      try {
        const url = "https://raw.githubusercontent.com/nshiab/" + repoName +
          `/refs/tags/v${version}/${document.remoteName}`;
        const response = await fetch(url);

        if (!response.ok) {
          warnAboutFailedFetch(pkg, version, document.label, localPath);
          return { key: document.key, content: undefined };
        }

        const content = await response.text();
        writeFileSync(localPath, content);
        return { key: document.key, content };
      } catch (error) {
        warnAboutFailedFetch(pkg, version, document.label, localPath);
        console.error(error);
        return { key: document.key, content: undefined };
      }
    }),
  );

  const docs: PackageDocs = {};
  for (const document of fetchedDocuments) {
    if (document.content !== undefined) {
      docs[document.key] = document.content;
    }
  }

  const savedCount =
    fetchedDocuments.filter((document) => document.content !== undefined)
      .length;
  if (!options.silent) {
    if (savedCount === PACKAGE_DOCUMENTS.length) {
      sFetch.stop(`✅ Documentation for ${pkg}@${version} saved!`);
    } else if (savedCount > 0) {
      sFetch.stop(
        `⚠️  Some documentation for ${pkg}@${version} could not be fetched.`,
      );
    } else {
      sFetch.stop(
        `❌ Failed to fetch documentation for ${pkg}@${version}.`,
      );
    }
  }

  return docs;
}

function warnAboutFailedFetch(
  pkg: string,
  version: string,
  label: string,
  localPath: string,
) {
  const existingFileGuidance = existsSync(localPath)
    ? ` The existing file at ${localPath} was preserved, but it may not ` +
      "match the installed version. Double-check it before relying on it, or " +
      "remove it."
    : "";
  log.warn(
    `Could not fetch ${label} for ${pkg}@${version} from its GitHub tag.` +
      existingFileGuidance,
  );
}
