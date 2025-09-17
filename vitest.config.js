import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,         // gives you `test`, `expect`, etc.
    environment: "jsdom",  // simulates a browser
    setupFiles: "./src/setupTests.js", // run this before tests
  },
});
