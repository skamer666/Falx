import { getBatchByShareToken } from "@/lib/seo-research";

export const dynamic = "force-dynamic";

/** Rapport SEO en lecture seule, accessible uniquement avec le lien secret généré dans l'admin. */
export async function GET(_request: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const reports = await getBatchByShareToken(token);
  if (!reports.length) return new Response("Not found", { status: 404, headers: { "X-Robots-Tag": "noindex" } });
  const body = {
    generated_at: new Date(reports[0].created_at).toISOString(),
    location: "Switzerland (2756)",
    reports: reports.map((r) => ({
      label: r.label,
      kind: r.kind,
      language: r.language,
      input: JSON.parse(r.input) as string[],
      rows: JSON.parse(r.result) as unknown[],
      cost_usd: r.cost,
      error: r.error,
    })),
  };
  return new Response(JSON.stringify(body, null, 1), {
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex" },
  });
}
