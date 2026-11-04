// This release was published with an extra dot in its Git tag.
// Keep source links and downloads aligned with the actual upstream tag.
export function getPlotTag(version: string): string {
  return version === "0.6.18" ? `v.${version}` : `v${version}`;
}
