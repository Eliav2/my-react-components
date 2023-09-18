import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dts({entryRoot: "src", outputDir: "dist/types"})],
  build: {
    emptyOutDir: true,
    // outDir: path.join(__dirname, "dist"),
    outDir: "dist",
    minify: false,
    lib: {
      // entry: path.join(__dirname, "src", "index.tsx"),
      entry: "src/index.tsx",
      formats: ["cjs", "es"],
    },
    rollupOptions: {
      // plugins: [typescript({ tsconfig: "tsconfig.build.json" })], // relatively slow, so running tsc concurrently using package.json script
      external: ["react", "react-dom", "react-fast-compare"],
    },
  },
});
