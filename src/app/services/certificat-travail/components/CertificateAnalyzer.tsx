"use client";

import { useRef, useState } from "react";
import PaywallCard from "@/components/site/PaywallCard";

const MIN_WORD_COUNT = 80;

function wordCount(value: string): number {
  const trimmed = value.trim();
  return trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
}

export default function CertificateAnalyzer() {
  const [text, setText] = useState("");
  const [isExtractingPdf, setIsExtractingPdf] = useState(false);
  const [pdfNotice, setPdfNotice] = useState<string | null>(null);
  const [consentGiven, setConsentGiven] = useState(false);
  const [isDraggingPdf, setIsDraggingPdf] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);

  const currentWordCount = wordCount(text);
  const isTooShort = currentWordCount > 0 && currentWordCount < MIN_WORD_COUNT;

  async function processPdfFile(file: File) {
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setPdfNotice("Seuls les fichiers PDF sont acceptés.");
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setPdfNotice("Fichier trop volumineux (15 Mo max).");
      return;
    }

    setPdfNotice(null);
    setIsExtractingPdf(true);
    try {
      const { extractPdfText } = await import("@/lib/pdf/extractPdfText");
      const { text: extracted, pageCount } = await extractPdfText(file);
      if (wordCount(extracted) < MIN_WORD_COUNT) {
        setPdfNotice(
          "Aucun texte exploitable trouvé dans ce PDF. S'il s'agit d'un document scanné (image), la reconnaissance de texte (OCR) n'est pas encore prise en charge : collez le texte manuellement.",
        );
        return;
      }
      setText(extracted);
      setPdfNotice(
        `Texte extrait de ${pageCount} page${pageCount > 1 ? "s" : ""}. Le fichier n'a pas quitté votre navigateur.`,
      );
    } catch (err) {
      console.error("PDF extraction failed:", err);
      const { describeUnexpectedError } = await import("@/lib/pdf/extractPdfText");
      setPdfNotice(
        `Impossible de lire ce fichier PDF (${describeUnexpectedError(err)}). Collez le texte manuellement, ou signalez cette erreur.`,
      );
    } finally {
      setIsExtractingPdf(false);
    }
  }

  async function handlePdfUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    await processPdfFile(file);
  }

  function handleDragEnter(event: React.DragEvent<HTMLDivElement>) {
    if (!event.dataTransfer.types.includes("Files")) return;
    event.preventDefault();
    dragCounter.current += 1;
    setIsDraggingPdf(true);
  }

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    if (!event.dataTransfer.types.includes("Files")) return;
    event.preventDefault();
  }

  function handleDragLeave(event: React.DragEvent<HTMLDivElement>) {
    if (!event.dataTransfer.types.includes("Files")) return;
    event.preventDefault();
    dragCounter.current = Math.max(0, dragCounter.current - 1);
    if (dragCounter.current === 0) setIsDraggingPdf(false);
  }

  async function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    dragCounter.current = 0;
    setIsDraggingPdf(false);
    const file = event.dataTransfer.files?.[0];
    if (!file) return;
    await processPdfFile(file);
  }

  const canOrder = text.trim().length > 0 && !isTooShort && consentGiven;

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
      <label htmlFor="certificate-text" className="block text-sm font-medium text-text">
        Collez le certificat de travail complet.
      </label>
      <textarea
        id="certificate-text"
        rows={8}
        value={text}
        onChange={(event) => {
          setText(event.target.value);
          setPdfNotice(null);
        }}
        placeholder="Exemple : Madame Dupont a travaillé au sein de notre entreprise du... Elle s'est efforcée de mener à bien les tâches qui lui ont été confiées..."
        className="mt-3 w-full rounded-lg border border-border bg-bg px-4 py-3 text-sm text-text placeholder:text-text-muted/60 focus:border-accent focus:outline-none"
      />
      {isTooShort ? (
        <p className="mt-2 text-xs text-text-muted">
          Ce passage est trop court pour une lecture fiable. Collez le
          certificat complet plutôt qu&rsquo;un extrait&nbsp;: la
          jurisprudence l&rsquo;exige, et notre analyse aussi.
        </p>
      ) : null}

      <p className="mt-6 text-center text-xs uppercase tracking-wide text-text-muted">
        ou
      </p>

      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        onChange={handlePdfUpload}
        className="hidden"
        id="certificate-pdf"
      />
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isExtractingPdf && fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            fileInputRef.current?.click();
          }
        }}
        aria-label="Importer un certificat au format PDF"
        className={`mx-auto mt-3 flex aspect-square w-full max-w-[220px] cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-6 text-center transition-colors ${
          isDraggingPdf
            ? "border-accent bg-accent/5"
            : "border-border bg-bg hover:border-accent/60"
        }`}
      >
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="h-9 w-9 text-text-muted"
        >
          <path d="M12 4v11m0-11 4 4m-4-4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-sm font-medium text-text">
          {isExtractingPdf
            ? "Lecture du PDF..."
            : isDraggingPdf
              ? "Déposez le PDF ici"
              : "Glissez un PDF ici"}
        </span>
        <span className="text-xs text-text-muted">
          ou cliquez pour parcourir
        </span>
      </div>
      <p className="mt-3 text-center text-xs text-text-muted">
        Le PDF est lu dans votre navigateur, jamais envoyé sur un serveur.
      </p>
      {pdfNotice ? (
        <p className="mt-2 text-center text-xs text-text-muted">{pdfNotice}</p>
      ) : null}

      <div className="mt-4">
        <label className="flex items-start gap-2.5 text-xs text-text-muted">
          <input
            type="checkbox"
            checked={consentGiven}
            onChange={(event) => setConsentGiven(event.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-border"
          />
          <span>
            J&rsquo;accepte l&rsquo;envoi sécurisé du texte à notre
            partenaire d&rsquo;analyse une fois ma commande passée.
          </span>
        </label>
        <details className="mt-1.5 ml-6">
          <summary className="cursor-pointer text-xs text-text-muted underline decoration-dotted">
            Détails sur le traitement des données
          </summary>
          <p className="mt-1.5 max-w-md text-xs leading-relaxed text-text-muted">
            Le texte est transmis à notre prestataire d&rsquo;analyse basé
            aux États-Unis, dans le cadre de clauses contractuelles types
            reconnues, uniquement pour générer votre rapport. Il n&rsquo;est
            ni utilisé pour entraîner leurs modèles, ni conservé par Thrax
            Legal après l&rsquo;analyse.
          </p>
        </details>
      </div>

      <div className="mt-8 border-t border-border pt-8">
        <PaywallCard
          price="99 CHF"
          checkoutHref="/checkout/certificat-travail"
          ctaLabel="Commander mon analyse"
          deliveryNote="Livré sous 2 jours ouvrables"
          disabled={!canOrder}
          bullets={[
            "Analyse complète du document par notre équipe juridique, phrase par phrase, avec sources",
            "Vérification de l'ensemble du certificat (formulations, omissions, cohérence)",
            "Texte de remplacement proposé pour chaque formulation problématique identifiée",
          ]}
        />
        {!canOrder ? (
          <p className="mt-2 text-center text-xs text-text-muted">
            Collez le certificat complet et acceptez les conditions
            ci-dessus pour activer la commande.
          </p>
        ) : null}
        <div className="mt-3 rounded-2xl border border-dashed border-border p-4">
          <p className="text-sm font-medium text-text">
            En option : mise en demeure prête à envoyer, 39 CHF
          </p>
          <p className="mt-1 text-xs leading-relaxed text-text-muted">
            Lettre formelle rédigée selon l&rsquo;art. 330a CO, réclamant la
            correction du certificat à votre employeur. Ajoutable à la
            commande, ou après réception de votre rapport si vous préférez
            d&rsquo;abord voir le résultat.
          </p>
        </div>
      </div>
    </div>
  );
}
