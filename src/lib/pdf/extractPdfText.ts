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

export async function extractPdfText(file: File): Promise<PdfExtractionResult> {
  // Le build par défaut de pdfjs-dist cible les navigateurs evergreen très
  // récents et échoue silencieusement sur certaines versions de Safari
  // ("undefined is not a function"). Le build "legacy" cible une base de
  // navigateurs plus large et est la version recommandée par pdfjs-dist
  // pour un usage web grand public.
  const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/legacy/build/pdf.worker.mjs",
    import.meta.url,
  ).toString();

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
