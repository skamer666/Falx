// Génère public/pdfjs/pdf.worker.mjs : le worker pdfjs-dist (build legacy)
// précédé des mêmes polyfills que src/lib/pdf/extractPdfText.ts (voir les
// commentaires de ce fichier pour le détail de chaque API manquante).
//
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

const POLYFILL = `// Polyfills injectés par scripts/build-pdf-worker.mjs (voir ce fichier).
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
if (typeof ReadableStream !== "undefined" && typeof ReadableStream.prototype[Symbol.asyncIterator] !== "function") {
  ReadableStream.prototype[Symbol.asyncIterator] = async function* () {
    const reader = this.getReader();
    try {
      for (;;) {
        const { done, value } = await reader.read();
        if (done) return;
        yield value;
      }
    } finally {
      reader.releaseLock();
    }
  };
}
`;

mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, POLYFILL + readFileSync(source, "utf8"), "utf8");
console.log(`Worker pdf.js généré : ${target}`);
