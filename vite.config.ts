import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { parseEnv } from "node:util";
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
  const exampleEnv = parseEnv(readFileSync(resolve(process.cwd(), ".env.example"), "utf8"));
  const configuredEnv = loadEnv(mode, process.cwd(), "VITE_");
  const appEnv = {
    ...Object.fromEntries(Object.entries(exampleEnv).filter(([key]) => key.startsWith("VITE_"))),
    ...Object.fromEntries(Object.entries(configuredEnv).filter(([, value]) => value.trim() !== "")),
  };

  return {
    plugins: [react(), umamiAnalytics(appEnv.VITE_UMAMI_WEBSITE_ID)],
    base: appEnv.VITE_BASE_PATH,
    define: Object.fromEntries(
      Object.entries(appEnv).map(([key, value]) => [`import.meta.env.${key}`, JSON.stringify(value)]),
    ),
    build: {
      outDir: "dist",
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: resolve(process.cwd(), "index.html"),
          ambassador: resolve(process.cwd(), "ambassador.html"),
        },
      },
    },
  };
});
