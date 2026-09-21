import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Third-party Claude Code skill scripts, not project source.
    ".claude/**",
    // vinext / Cloudflare Workers build output, not project source.
    "dist/**",
    ".vinext/**",
    ".wrangler/**",
    // Ressources pdfjs-dist copiées/générées, code tiers minifié.
    "public/pdfjs/**",
  ]),
]);

export default eslintConfig;
