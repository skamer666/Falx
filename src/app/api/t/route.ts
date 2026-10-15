import { getSessionUserRaw } from "@/lib/account/session";
import { recordHit } from "@/lib/analytics/track";

export const dynamic = "force-dynamic";

/** Reçoit une page vue anonyme (envoyée par le navigateur). Toujours 204 : le visiteur n'a rien à voir. */
export async function POST(request: Request) {
  const done = new Response(null, { status: 204 });
  try {
    if (request.headers.get("sec-gpc") === "1" || request.headers.get("dnt") === "1") return done;
    const body = (await request.json()) as { p?: unknown; r?: unknown; q?: unknown; w?: unknown; e?: unknown };
    if (typeof body.p !== "string") return done;
    // Les visites de l'administrateur ne comptent pas.
    const admin = await getSessionUserRaw().catch(() => null);
    if (admin?.is_admin) return done;
    await recordHit({
      path: body.p,
      referrer: typeof body.r === "string" ? body.r : "",
      search: typeof body.q === "string" ? body.q : "",
      width: typeof body.w === "number" ? Math.round(body.w) : 0,
      entry: body.e === true,
      ip: request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "",
      userAgent: request.headers.get("user-agent") ?? "",
      country: request.headers.get("cf-ipcountry"),
      host: new URL(request.url).hostname,
    });
  } catch (error) {
    console.error("[stats] page vue ignorée", error);
  }
  return done;
}
