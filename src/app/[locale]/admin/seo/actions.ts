"use server";

import { redirect } from "next/navigation";
import { logAudit } from "@/lib/account/admin-db";
import { getCurrentAdmin } from "@/lib/account/session";
import {
  RESEARCH_PLAN,
  SEO_LANGUAGES,
  deleteBatch,
  newBatch,
  runStep,
  saveReport,
  type SeoKind,
  type SeoLanguage,
} from "@/lib/seo-research";

async function requireAdmin() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/fr/compte");
  return admin;
}

/** Démarre la recherche complète : crée un lot et son lien de partage. */
export async function startPlanAction(): Promise<{ batch: string; shareToken: string; steps: string[] }> {
  const admin = await requireAdmin();
  const { batch, shareToken } = newBatch();
  await logAudit({ actor: admin, action: "seo_research", targetType: "seo", targetId: batch, detail: "Recherche complète" });
  return { batch, shareToken, steps: RESEARCH_PLAN.map((step) => step.label) };
}

/** Exécute une étape du plan (une seule requête DataForSEO par appel). */
export async function runPlanStepAction(
  batch: string,
  shareToken: string,
  index: number,
): Promise<{ ok: boolean; rows: number; cost: number; error: string | null }> {
  await requireAdmin();
  const step = RESEARCH_PLAN[index];
  if (!step || !/^[0-9a-f-]{36}$/.test(batch) || !/^[0-9a-f]{64}$/.test(shareToken)) {
    return { ok: false, rows: 0, cost: 0, error: "Étape inconnue." };
  }
  try {
    const { rows, cost, input } = await runStep(step);
    await saveReport({ batch, shareToken, label: step.label, kind: step.kind, language: step.language, input, rows, cost });
    return { ok: true, rows: rows.length, cost, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    await saveReport({ batch, shareToken, label: step.label, kind: step.kind, language: step.language, input: step.keywords, rows: [], cost: 0, error: message });
    return { ok: false, rows: 0, cost: 0, error: message };
  }
}

/** Recherche libre depuis le formulaire. */
export async function runCustomAction(formData: FormData) {
  const admin = await requireAdmin();
  const kindValue = String(formData.get("kind") ?? "volumes");
  const kind: SeoKind = kindValue === "ideas" || kindValue === "serp" ? kindValue : "volumes";
  const languageValue = String(formData.get("language") ?? "fr");
  const language: SeoLanguage = (SEO_LANGUAGES as readonly string[]).includes(languageValue) ? (languageValue as SeoLanguage) : "fr";
  const keywords = String(formData.get("keywords") ?? "")
    .split(/[\n,;]+/)
    .map((k) => k.trim())
    .filter(Boolean)
    .slice(0, 700);
  if (!keywords.length) redirect("/fr/admin/seo?error=empty");

  const { batch, shareToken } = newBatch();
  const label =
    kind === "serp" ? `Top 10 Google — ${keywords[0]}` : `${kind === "ideas" ? "Idées" : "Volumes"} — ${keywords.slice(0, 3).join(", ")}${keywords.length > 3 ? "…" : ""}`;
  try {
    const { rows, cost, input } = await runStep({ kind, language, keywords });
    await saveReport({ batch, shareToken, label, kind, language, input, rows, cost });
  } catch (error) {
    await saveReport({ batch, shareToken, label, kind, language, input: keywords, rows: [], cost: 0, error: error instanceof Error ? error.message : String(error) });
  }
  await logAudit({ actor: admin, action: "seo_research", targetType: "seo", targetId: batch, detail: label });
  redirect(`/fr/admin/seo/${batch}`);
}

export async function deleteBatchAction(batch: string) {
  const admin = await requireAdmin();
  await deleteBatch(batch);
  await logAudit({ actor: admin, action: "seo_deleted", targetType: "seo", targetId: batch });
  redirect("/fr/admin/seo?ok=deleted");
}
