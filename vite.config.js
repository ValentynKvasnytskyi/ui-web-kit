import { defineConfig } from "vite";
import { resolve, join } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "ui-web-kit",
      formats: ["es", "umd"],
      exports: "named",
      fileName: (format) => `ui-web-kit.${format}.js`, // имя собранного файла
    },
    rollupOptions: {
      output: {
        exports: 'named'
      }
    }
  },
  server: {
    port: 8000,
    watch: {
      include: join(__dirname, 'src/**/*.scss')
    },
  },
});
