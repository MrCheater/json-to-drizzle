import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      reporter: ["json", "html", "lcov", "json-summary"],
      exclude: ["coverage"],
    },
    passWithNoTests: true,
    watch: false,
    testTimeout: 15000,
    exclude: [
      "package.json",
      "dist/**/*",
      "node_modules/**/*",
      "src/commands/**/**",
    ],
  },
});
