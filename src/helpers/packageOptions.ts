import { SUPPORTED_PACKAGES } from "./packageRegistry.ts";

export const PACKAGE_OPTIONS = SUPPORTED_PACKAGES.map((pkg) => ({
  value: pkg.value,
  label: pkg.label,
}));
