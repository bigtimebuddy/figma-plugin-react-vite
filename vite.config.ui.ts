import { defineConfig } from "vite";
import path from "path";

import { viteSingleFile } from "vite-plugin-singlefile";
import react from "@vitejs/plugin-react";
import inlineSvg from "./scripts/vite/vite-inline-svg";
import svgr from "./scripts/vite/vite-svgr-component";

import postcssUrl from "postcss-url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), inlineSvg(), viteSingleFile()],
  server: {
    base: "/ui.html",
    port: 4000,
  },
  root: path.resolve(__dirname, "./src/ui/"),
  build: {
    outDir: path.resolve(__dirname, "./dist"),
    rollupOptions: {
      input: {
        ui: path.relative(__dirname, "./src/ui/index.html"),
      },
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
  css: {
    postcss: {
      plugins: [postcssUrl({ url: "inline" })],
    },
  },
  resolve: {
    alias: {
      "@common": path.resolve(__dirname, "./src/common"),
      "@ui": path.resolve(__dirname, "./src/ui"),
    },
  },
});
