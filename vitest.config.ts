import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      reporter: ["json", "html", "lcov"],
      exclude: ["coverage"],
    },
    passWithNoTests: true,
    watch: false,
    testTimeout: 15000,
  },
});
