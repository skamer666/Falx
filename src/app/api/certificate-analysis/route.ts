import { NextRequest, NextResponse } from "next/server";
import {
  analyzeCertificateWithJev,
} from "@/lib/legal/certificateJevAnalysis";
import { JevApiError, JevConfigError } from "@/lib/legal/jev";

const MIN_WORD_COUNT = 80;
const MAX_CHAR_COUNT = 20000;

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête JSON invalide." }, { status: 400 });
  }

  const text = (body as { text?: unknown })?.text;
  if (typeof text !== "string" || !text.trim()) {
    return NextResponse.json({ error: "Champ 'text' manquant ou vide." }, { status: 400 });
  }

  if (text.length > MAX_CHAR_COUNT) {
    return NextResponse.json(
      { error: `Texte trop long (max ${MAX_CHAR_COUNT} caractères).` },
      { status: 400 },
    );
  }

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  if (wordCount < MIN_WORD_COUNT) {
    return NextResponse.json(
      {
        error:
          "Texte trop court pour une analyse fiable. Collez le certificat complet plutôt qu'un extrait.",
      },
      { status: 422 },
    );
  }

  try {
    const analysis = await analyzeCertificateWithJev(text);
    return NextResponse.json(analysis);
  } catch (error) {
    if (error instanceof JevConfigError) {
      console.error("Jev config error:", error.message);
      return NextResponse.json(
        { error: "Service d'analyse temporairement indisponible (configuration)." },
        { status: 503 },
      );
    }
    if (error instanceof JevApiError) {
      console.error("Jev API error:", error.status, error.message);
      return NextResponse.json(
        { error: "Service d'analyse temporairement indisponible." },
        { status: 502 },
      );
    }
    console.error("Unexpected error during certificate analysis:", error);
    return NextResponse.json({ error: "Erreur interne." }, { status: 500 });
  }
}
