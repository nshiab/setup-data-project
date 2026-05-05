export interface PackageConfig {
  value: string;
  label: string;
  type: "sda" | "journalism" | "other";
  hint?: string;
}

export const SUPPORTED_PACKAGES: PackageConfig[] = [
  {
    value: "@nshiab/simple-data-analysis-core",
    label: "simple-data-analysis-core",
    type: "sda",
    hint: "No fluff. Great for constrained environments, like a cheap server.",
  },
  {
    value: "@nshiab/simple-data-analysis",
    label: "simple-data-analysis",
    type: "sda",
    hint:
      "All the core functionality, plus methods for dataviz, AI, Google sheets, etc.",
  },
  {
    value: "@nshiab/journalism-ai",
    label: "journalism-ai",
    type: "journalism",
    hint:
      "Easily use AI local models with Ollama or remote models with Gemini/Vertex.",
  },
  {
    value: "@nshiab/journalism-google",
    label: "journalism-google",
    type: "journalism",
    hint: "Push and retrieve data from Google Sheets, Google Bucket, and more.",
  },
  {
    value: "@nshiab/journalism-web-scraping",
    label: "journalism-web-scraping",
    type: "journalism",
    hint:
      "Retrieve data from Statistics Canada tables, HTML table, download files...",
  },
  {
    value: "@nshiab/journalism-finance",
    label: "journalism-finance",
    type: "journalism",
    hint:
      "Retrieve financial data, calculate Canadian mortgage payments and taxes...",
  },
  {
    value: "@nshiab/journalism-format",
    label: "journalism-format",
    type: "journalism",
    hint: "Easily format dates, numbers, currencies...",
  },
  {
    value: "@nshiab/journalism-climate",
    label: "journalism-climate",
    type: "journalism",
    hint: "Retrieve data from Environment Canada APIs and more.",
  },
  {
    value: "@nshiab/journalism-dataviz",
    label: "journalism-dataviz",
    type: "journalism",
    hint:
      "Render charts/maps with Observable Plot or directly in the terminal.",
  },
  {
    value: "@nshiab/journalism-geo",
    label: "journalism-geo",
    type: "journalism",
    hint:
      "Calculate distances, transform 2D coordinates to 3D, wrangle GeoTIFF files...",
  },
  {
    value: "@nshiab/journalism-statistics",
    label: "journalism-statistics",
    type: "journalism",
    hint:
      "Functions for statistical tests, clustering, random path generation...",
  },
  {
    value: "@nshiab/journalism-web",
    label: "journalism-web",
    type: "journalism",
    hint:
      "Web related functions, including downloading data as CSV, extracting ZIP files to URLs...",
  },
  {
    value: "@nshiab/journalism-extras",
    label: "journalism-extras",
    type: "journalism",
    hint:
      "Functions to zip/unzip, sleep, reencode files, create nested directories...",
  },
];
