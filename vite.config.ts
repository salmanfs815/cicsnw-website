import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { parseEnv } from "node:util";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const exampleEnv = parseEnv(readFileSync(resolve(process.cwd(), ".env.example"), "utf8"));
  const configuredEnv = loadEnv(mode, process.cwd(), "VITE_");
  const appEnv = {
    ...Object.fromEntries(Object.entries(exampleEnv).filter(([key]) => key.startsWith("VITE_"))),
    ...Object.fromEntries(Object.entries(configuredEnv).filter(([, value]) => value.trim() !== "")),
  };

  return {
    plugins: [react()],
    base: appEnv.VITE_BASE_PATH,
    define: Object.fromEntries(
      Object.entries(appEnv).map(([key, value]) => [`import.meta.env.${key}`, JSON.stringify(value)]),
    ),
    build: { outDir: "dist", emptyOutDir: true },
  };
});
