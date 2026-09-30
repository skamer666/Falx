import { NextRequest } from "next/server";
import { getAttachment } from "@/lib/account/db";
import { getSessionUserRaw } from "@/lib/account/session";
import { accessState } from "@/lib/account/model";

// Téléchargement authentifié des pièces jointes (R2). Jamais mis en cache.
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const key = new URL(request.url).searchParams.get("key") ?? "";
  const user = await getSessionUserRaw();
  if (!user) return new Response("Unauthorized", { status: 401 });

  // Clés stockées sous dossiers/<idClient>/… : un client ne lit que ses propres fichiers,
  // un administrateur lit tout. Un accès expiré ou en pause ne télécharge plus rien.
  const validShape = key.startsWith("dossiers/") && !key.includes("..") && key.length < 400;
  const allowed = user.is_admin || (accessState(user) === "ok" && key.startsWith(`dossiers/${user.id}/`));
  if (!validShape || !allowed) return new Response("Not found", { status: 404 });

  const object = await getAttachment(key);
  if (!object) return new Response("Not found", { status: 404 });

  const filename = key.split("/").pop()?.replace(/^[0-9a-f-]{36}-/, "") ?? "fichier";
  return new Response(object.body, {
    headers: {
      // Toujours en téléchargement, jamais rendu dans la page (évite qu'un HTML/SVG envoyé s'exécute).
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, no-store",
    },
  });
}
