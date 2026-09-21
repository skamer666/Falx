// Génère public/pdfjs/pdf.worker.mjs : le worker pdfjs-dist (build legacy)
// précédé d'un polyfill de Promise.withResolvers.
//
// pdfjs-dist utilise Promise.withResolvers() sans le polyfiller, y compris
// dans son build legacy. Cette API n'existe que depuis Safari 17.4 / iOS 17.4.
// Le worker étant un contexte JavaScript séparé, un polyfill installé dans la
// page principale ne s'y applique pas : il faut l'injecter dans le fichier
// servi au worker.
//
// À relancer après toute mise à jour de pdfjs-dist : npm run build:pdf-worker

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = join(root, "node_modules/pdfjs-dist/legacy/build/pdf.worker.min.mjs");
const target = join(root, "public/pdfjs/pdf.worker.mjs");

const POLYFILL = `// Polyfill injecté par scripts/build-pdf-worker.mjs (voir ce fichier).
if (typeof Promise.withResolvers !== "function") {
  Promise.withResolvers = function withResolvers() {
    let resolve, reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  };
}
`;

mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, POLYFILL + readFileSync(source, "utf8"), "utf8");
console.log(`Worker pdf.js généré : ${target}`);
