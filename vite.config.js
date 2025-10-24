import { defineConfig } from "vite";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

const dirname = path.dirname(__filename);

export default defineConfig({
  base: "/",
  server: {
    port: 3000,
    open: true,
  },
  build: {
    assetsDir: "assets",
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name].js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name].[ext]",
      },
    },
  },

  plugins: [
    AutoImport({
      include: ["src/**/*.js", "!src/components/base-component.js"],
      dts: true,
    }),
    viteStaticCopy({
      targets: [
        {
          src: "pages/**/*",
          dest: "pages",
        },
      ],
    }),
  ],
});
