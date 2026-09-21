// Extraction de texte PDF côté client uniquement. Le fichier ne quitte
// jamais le navigateur : seul le texte extrait est ensuite envoyé à notre
// API d'analyse. Ne fonctionne que pour un PDF contenant une couche de
// texte (export depuis Word, un logiciel RH, etc.) ; un PDF scanné
// (image pure) ne contient aucun texte extractible, l'OCR n'est pas encore
// pris en charge.

export type PdfExtractionResult = {
  text: string;
  pageCount: number;
};

const MAX_PAGES = 20;

function describePdfError(err: unknown): string {
  const name = err instanceof Error ? err.name : "";
  const message = err instanceof Error ? err.message : String(err);
  if (name === "PasswordException") {
    return "Ce PDF est protégé par un mot de passe. Retirez la protection ou collez le texte manuellement.";
  }
  if (name === "InvalidPDFException") {
    return `Fichier non reconnu comme un PDF valide (${message}).`;
  }
  if (name === "UnexpectedResponseException" || name === "ResponseException") {
    return `Échec de chargement des ressources nécessaires à la lecture du PDF (${message}).`;
  }
  return `${name || "Erreur"} : ${message}`;
}

// Le diagnostic à distance de ce parcours s'est révélé difficile (échecs
// propres à certains navigateurs) : on expose la première frame de la pile
// pour identifier le fichier fautif sans accès à la console du visiteur.
export function describeUnexpectedError(err: unknown): string {
  const name = err instanceof Error ? err.name : "";
  const message = err instanceof Error ? err.message : String(err);
  const frame =
    err instanceof Error && typeof err.stack === "string"
      ? (err.stack.split("\n").find((line) => line.includes("/")) ?? "").trim().slice(0, 120)
      : "";
  return [name && `${name}:`, message, frame && `[${frame}]`]
    .filter(Boolean)
    .join(" ");
}

// pdfjs-dist utilise Promise.withResolvers(), disponible seulement depuis
// Safari 17.4 / iOS 17.4, sans le polyfiller (y compris dans son build
// legacy). Sur un Safari plus ancien, l'import de pdfjs échoue avec
// "undefined is not a function". Ce polyfill doit être installé avant le
// chargement de pdfjs.
function ensurePromiseWithResolvers(): void {
  const P = Promise as unknown as {
    withResolvers?: <T>() => {
      promise: Promise<T>;
      resolve: (value: T | PromiseLike<T>) => void;
      reject: (reason?: unknown) => void;
    };
  };
  if (typeof P.withResolvers === "function") return;
  P.withResolvers = function withResolvers<T>() {
    let resolve!: (value: T | PromiseLike<T>) => void;
    let reject!: (reason?: unknown) => void;
    const promise = new Promise<T>((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  };
}

export async function extractPdfText(file: File): Promise<PdfExtractionResult> {
  ensurePromiseWithResolvers();

  // Le build par défaut de pdfjs-dist cible les navigateurs evergreen très
  // récents et échoue silencieusement sur certaines versions de Safari
  // ("undefined is not a function"). Le build "legacy" cible une base de
  // navigateurs plus large et est la version recommandée par pdfjs-dist
  // pour un usage web grand public.
  const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");
  // Worker servi depuis public/, généré par scripts/build-pdf-worker.mjs afin
  // d'y injecter le polyfill (le worker est un contexte JS séparé).
  pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.mjs";

  const buffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({
    data: buffer,
    // Sans ces ressources, l'extraction échoue silencieusement (ou lève une
    // erreur) sur de nombreux PDF réels : polices standards non intégrées,
    // ou texte encodé via un CMap (fréquent avec les exports Word/Adobe).
    cMapUrl: "/pdfjs/cmaps/",
    cMapPacked: true,
    standardFontDataUrl: "/pdfjs/standard_fonts/",
  });

  let doc;
  try {
    doc = await loadingTask.promise;
  } catch (err) {
    throw new Error(describePdfError(err));
  }

  const pageCount = Math.min(doc.numPages, MAX_PAGES);
  const pageTexts: string[] = [];
  for (let pageNumber = 1; pageNumber <= pageCount; pageNumber += 1) {
    const page = await doc.getPage(pageNumber);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item) => ("str" in item ? item.str : ""))
      .join(" ");
    pageTexts.push(pageText);
  }

  await loadingTask.destroy();

  return { text: pageTexts.join("\n\n").replace(/\s+/g, " ").trim(), pageCount: doc.numPages };
}
