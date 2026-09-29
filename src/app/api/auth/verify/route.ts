import { NextRequest } from "next/server";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/i18n/config";
import { consumeMagicLink, getUserByEmail, createSession } from "@/lib/account/db";
import { setSessionCookie } from "@/lib/account/session";

// This route has side effects (single-use token consumption, session cookie) and
// must never be cached. It also avoids a plain HTTP redirect: routed through the
// CDN cache adapter, a 30x Location response here triggers a re-fetch/warm pass
// against the *same* (now single-use, already-consumed) URL, which throws
// "Too many redirects". A 200 HTML page that navigates client-side sidesteps it.
export const dynamic = "force-dynamic";

const REDIRECTING_LABEL: Record<Locale, string> = {
  fr: "Connexion en cours…",
  de: "Anmeldung läuft…",
  en: "Signing you in…",
  it: "Accesso in corso…",
};

function redirectPage(locale: Locale, target: string) {
  const label = REDIRECTING_LABEL[locale];
  const html = `<!doctype html>
<html lang="${locale}">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="refresh" content="0;url=${target}" />
    <title>Thrax Legal</title>
    <style>
      body { margin:0; min-height:100vh; display:flex; align-items:center; justify-content:center; background:#fcfbf7; color:#101010; font-family:-apple-system,Segoe UI,Roboto,sans-serif; }
      p { font-size:14px; }
    </style>
  </head>
  <body>
    <p>${label}</p>
    <script>location.replace(${JSON.stringify(target)});</script>
  </body>
</html>`;
  return new Response(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const token = searchParams.get("token");
  const rawLocale = searchParams.get("locale") ?? DEFAULT_LOCALE;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  if (!token) {
    return redirectPage(locale, `${origin}/${locale}/compte?error=lien`);
  }

  const email = await consumeMagicLink(token);
  if (!email) {
    return redirectPage(locale, `${origin}/${locale}/compte?error=expire`);
  }

  const user = await getUserByEmail(email);
  if (!user) {
    return redirectPage(locale, `${origin}/${locale}/compte?error=inconnu`);
  }

  const session = await createSession(user.id);
  await setSessionCookie(session.id, session.expires_at);

  return redirectPage(user.locale, `${origin}/${user.locale}/compte/tableau-de-bord`);
}
