import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dts({ entryRoot: "src", outputDir: "dist/types", tsConfigFilePath: "../../tsconfig.json" })],
  build: {
    // emptyOutDir: true,
    // outDir: path.join(__dirname, "dist"),
    outDir: "dist",
    minify: false,
    lib: {
      // entry: path.join(__dirname, "src", "index.tsx"),
      entry: "src/index.tsx",
      formats: ["cjs", "es"],
    },
    sourcemap: true,
    rollupOptions: {
      // plugins: [typescript({ tsconfig: "tsconfig.build.json" })], // relatively slow, so running tsc concurrently using package.json script
      external: ["react", "react-dom", "react-fast-compare"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
