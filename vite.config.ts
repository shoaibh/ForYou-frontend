import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      // Add more aliases as needed
    },
  },
  css: {
    postcss: "./postcss-config.js", // If you have a custom PostCSS configuration
  },
});
