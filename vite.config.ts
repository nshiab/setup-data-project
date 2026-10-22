import { defineConfig } from "vite-plus";
export default defineConfig({
  lint: {
    options: { typeAware: true, typeCheck: true },
    rules: {
      "typescript/no-explicit-any": "error",
      "typescript/no-unsafe-assignment": "error",
      "typescript/no-unsafe-argument": "error",
      "typescript/no-unsafe-call": "error",
      "typescript/no-unsafe-member-access": "error",
      "typescript/no-unsafe-return": "error",
      "typescript/no-non-null-assertion": "error",
    },
  },
  fmt: { ignorePatterns: ["docs-cache/**", "research/**", "dist/**"] },
  test: { pool: "forks", fileParallelism: false },
  pack: { entry: ["src/main.ts", "src/sda.ts"], sourcemap: true },
});
