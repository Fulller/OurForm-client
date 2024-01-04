import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import process from "process";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "~": path.resolve(process.cwd(), "./src"),
    },
  },
});
