import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALES, isLocale } from "@/i18n/config";

function detectLocale(request: NextRequest): string {
  const header = request.headers.get("accept-language");
  if (!header) return DEFAULT_LOCALE;

  const preferred = header
    .split(",")
    .map((part) => part.split(";")[0]?.trim().toLowerCase().slice(0, 2))
    .filter(Boolean);

  for (const lang of preferred) {
    if (isLocale(lang)) return lang;
  }
  return DEFAULT_LOCALE;
}

const LOCAL_HOST = /^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/;

/** Vrai si le visiteur est arrivé en http:// (non chiffré) sur le domaine public. */
function isPlainHttp(request: NextRequest): boolean {
  const host = request.headers.get("host") ?? "";
  if (!host || LOCAL_HOST.test(host)) return false;
  const visitor = request.headers.get("cf-visitor");
  if (visitor) return visitor.includes('"http"');
  const forwarded = request.headers.get("x-forwarded-proto");
  // Sans indication explicite de Cloudflare, on ne redirige pas (aucun risque de boucle).
  return forwarded ? forwarded.split(",")[0]?.trim() === "http" : false;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Toujours servir le site en HTTPS : sinon le navigateur affiche « Non sécurisé »
  // et refuse les cookies de connexion (marqués Secure).
  if (isPlainHttp(request)) {
    const host = (request.headers.get("host") ?? "").replace(/:\d+$/, "");
    const { search } = request.nextUrl;
    return new Response(null, { status: 301, headers: { Location: `https://${host}${pathname}${search}` } });
  }

  const hasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) {
    const response = NextResponse.next();
    if (!LOCAL_HOST.test(request.headers.get("host") ?? "")) {
      // Le navigateur retient d'utiliser HTTPS pour ce domaine (sans les sous-domaines).
      response.headers.set("Strict-Transport-Security", "max-age=31536000");
    }
    return response;
  }

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * Exclut les fichiers spéciaux servis à la racine (sitemap, robots,
     * icônes, opengraph) et les assets statiques.
     */
    "/((?!api|_next|favicon.ico|icon.png|apple-icon.png|opengraph-image.png|robots.txt|sitemap.xml|media|logo).*)",
  ],
};
