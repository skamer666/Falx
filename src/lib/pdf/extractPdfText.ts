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

export async function extractPdfText(file: File): Promise<PdfExtractionResult> {
  const pdfjsLib = await import("pdfjs-dist");
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.mjs",
    import.meta.url,
  ).toString();

  const buffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: buffer });
  const doc = await loadingTask.promise;

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
