import { NextRequest, NextResponse } from "next/server";
import {
  analyzeCertificateWithJev,
} from "@/lib/legal/certificateJevAnalysis";
import { JevApiError, JevConfigError } from "@/lib/legal/jev";

const MIN_WORD_COUNT = 80;
const MAX_CHAR_COUNT = 20000;

// Anti-abus simple : chaque appel a un coût réel (API Jev). Pas de compte
// requis pour l'outil gratuit, donc limitation par IP en mémoire plutôt
// qu'un vrai compteur distribué (suffisant pour dissuader un abus grossier,
// pas pour une garantie stricte multi-instance).
const RATE_LIMIT_MAX_REQUESTS = 8;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return false;
}

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

export async function POST(request: NextRequest) {
  const clientIp = getClientIp(request);
  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      {
        error:
          "Trop de demandes d'analyse depuis cette connexion. Réessayez dans quelques minutes.",
      },
      { status: 429 },
    );
  }

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
