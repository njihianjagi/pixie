import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    open: true,
    port: 3000,
  },
  build: {
    outDir: "build",
    sourcemap: true,
  },
  // Handle static assets like textures
  publicDir: "public",
});
