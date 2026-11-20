import { resolve } from "node:path";
import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

// Adds the Umami Cloud tracker to every page in production builds only, so local
// development never records visits. Builds without a website ID get no tracker.
function umamiAnalytics(websiteId: string | undefined): Plugin {
  return {
    name: "umami-analytics",
    apply: "build",
    transformIndexHtml: () => websiteId?.trim()
      ? [{ tag: "script", attrs: { defer: true, src: "https://cloud.umami.is/script.js", "data-website-id": websiteId.trim() }, injectTo: "head" }]
      : [],
  };
}

export default defineConfig(({ mode }) => {
  // Site configuration lives in the committed `.env` (optionally overridden by `.env.local`
  // or `VITE_*` environment variables). Vite exposes these to app code as import.meta.env.
  const env = loadEnv(mode, process.cwd(), "VITE_");

  return {
    plugins: [react(), umamiAnalytics(env.VITE_UMAMI_WEBSITE_ID)],
    base: env.VITE_BASE_PATH || "/",
    build: {
      outDir: "dist",
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: resolve(process.cwd(), "index.html"),
          ambassador: resolve(process.cwd(), "ambassador.html"),
          qr: resolve(process.cwd(), "qr/index.html"),
          donate: resolve(process.cwd(), "donate/index.html"),
        },
      },
    },
  };
});
