export interface PackageConfig {
  value: string;
  label: string;
  type: "sda" | "journalism" | "other";
}

export const SUPPORTED_PACKAGES: PackageConfig[] = [
  {
    value: "@nshiab/simple-data-analysis",
    label: "simple-data-analysis",
    type: "sda",
  },
  {
    value: "@nshiab/journalism-ai",
    label: "journalism-ai",
    type: "journalism",
  },
  {
    value: "@nshiab/journalism-climate",
    label: "journalism-climate",
    type: "journalism",
  },
  {
    value: "@nshiab/journalism-dataviz",
    label: "journalism-dataviz",
    type: "journalism",
  },
  {
    value: "@nshiab/journalism-finance",
    label: "journalism-finance",
    type: "journalism",
  },
  {
    value: "@nshiab/journalism-format",
    label: "journalism-format",
    type: "journalism",
  },
  {
    value: "@nshiab/journalism-geo",
    label: "journalism-geo",
    type: "journalism",
  },
  {
    value: "@nshiab/journalism-google",
    label: "journalism-google",
    type: "journalism",
  },
  {
    value: "@nshiab/journalism-statistics",
    label: "journalism-statistics",
    type: "journalism",
  },
  {
    value: "@nshiab/journalism-web",
    label: "journalism-web",
    type: "journalism",
  },
  {
    value: "@nshiab/journalism-web-scraping",
    label: "journalism-web-scraping",
    type: "journalism",
  },
  {
    value: "@nshiab/journalism-extras",
    label: "journalism-extras",
    type: "journalism",
  },
];
