// Recherche de mots-clés via l'API DataForSEO, avec les identifiants enregistrés comme
// secrets du Worker Cloudflare. Les résultats sont stockés en base (table seo_reports) et
// peuvent être partagés en lecture seule par un lien secret (sans pouvoir lancer de requête).
import { db, newId, readEnv } from "@/lib/account/db";
import { randomToken } from "@/lib/account/password";

const API = "https://api.dataforseo.com/v3";
/** Code DataForSEO / Google Ads de la Suisse. */
export const SWITZERLAND = 2756;
export const SEO_LANGUAGES = ["fr", "de", "en", "it"] as const;
export type SeoLanguage = (typeof SEO_LANGUAGES)[number];
export type SeoKind = "volumes" | "ideas" | "serp";

const LOGIN_NAMES = ["DATAFORSEO_LOGIN", "DATAFORSEO_EMAIL", "DATAFORSEO_USER", "DATAFORSEO_USERNAME", "DFS_LOGIN"];
const PASSWORD_NAMES = [
  "DATAFORSEO_PASSWORD",
  "DATAFORSEO_API_KEY",
  "DATAFORSEO_API_PASSWORD",
  "DATAFORSEO_KEY",
  "DATAFORSEO_TOKEN",
  "DATAFORSEO_API",
  "DFS_PASSWORD",
  "DFS_API_KEY",
];

async function firstEnv(names: string[]): Promise<{ name: string; value: string } | null> {
  for (const name of names) {
    const value = await readEnv(name);
    if (value) return { name, value: value.trim() };
  }
  return null;
}

/** En-tête Authorization (Basic), ou null si les identifiants sont introuvables. */
export async function dataForSeoAuth(): Promise<{ header: string; source: string } | null> {
  const login = await firstEnv(LOGIN_NAMES);
  const password = await firstEnv(PASSWORD_NAMES);
  if (login && password) {
    return { header: `Basic ${btoa(`${login.value}:${password.value}`)}`, source: `${login.name} + ${password.name}` };
  }
  const single = password ?? login;
  if (single) {
    // Une seule variable : « login:motdepasse » ou sa version déjà encodée en base64.
    if (single.value.includes(":")) return { header: `Basic ${btoa(single.value)}`, source: single.name };
    try {
      if (atob(single.value).includes(":")) return { header: `Basic ${single.value}`, source: single.name };
    } catch {
      // pas du base64
    }
  }
  return null;
}

type DfsResponse = {
  status_code: number;
  status_message: string;
  cost?: number;
  tasks?: { status_code: number; status_message: string; cost?: number; result?: unknown[] | null }[];
};

async function dfsPost(path: string, payload: unknown[]): Promise<{ result: unknown[]; cost: number }> {
  const auth = await dataForSeoAuth();
  if (!auth) throw new Error("Identifiants DataForSEO introuvables dans les secrets du Worker.");
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: { Authorization: auth.header, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = (await res.json().catch(() => null)) as DfsResponse | null;
  if (!data) throw new Error(`Réponse illisible de DataForSEO (HTTP ${res.status}).`);
  if (data.status_code !== 20000) throw new Error(`DataForSEO : ${data.status_message} (${data.status_code})`);
  const task = data.tasks?.[0];
  if (!task || task.status_code !== 20000) throw new Error(`DataForSEO : ${task?.status_message ?? "tâche vide"} (${task?.status_code ?? "?"})`);
  return { result: task.result ?? [], cost: data.cost ?? task.cost ?? 0 };
}

export type KeywordRow = {
  keyword: string;
  volume: number | null;
  cpc: number | null;
  competition: string | null;
  /** Enchère haute de haut de page (CHF ou USD selon le compte). */
  bidHigh: number | null;
};
export type SerpRow = { rank: number; title: string; url: string; domain: string; description: string };

type AdsItem = {
  keyword?: string;
  search_volume?: number | null;
  cpc?: number | null;
  competition?: string | null;
  high_top_of_page_bid?: number | null;
};

function toKeywordRows(items: unknown[]): KeywordRow[] {
  return (items as AdsItem[])
    .filter((item) => item && typeof item.keyword === "string")
    .map((item) => ({
      keyword: item.keyword as string,
      volume: item.search_volume ?? null,
      cpc: item.cpc ?? null,
      competition: item.competition ?? null,
      bidHigh: item.high_top_of_page_bid ?? null,
    }))
    .sort((a, b) => (b.volume ?? -1) - (a.volume ?? -1));
}

/** Google Ads n’accepte que des mots-clés courts, sans certains caractères. */
function cleanKeywords(list: string[], max: number): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of list) {
    const keyword = raw
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s'’-]/gu, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (!keyword || keyword.length > 80 || keyword.split(" ").length > 10 || seen.has(keyword)) continue;
    seen.add(keyword);
    out.push(keyword);
    if (out.length >= max) break;
  }
  return out;
}

export async function searchVolumes(keywords: string[], language: SeoLanguage) {
  const list = cleanKeywords(keywords, 700);
  if (!list.length) throw new Error("Aucun mot-clé valide.");
  const { result, cost } = await dfsPost("/keywords_data/google_ads/search_volume/live", [
    { keywords: list, location_code: SWITZERLAND, language_code: language },
  ]);
  return { rows: toKeywordRows(result), cost, input: list };
}

export async function keywordIdeas(seeds: string[], language: SeoLanguage, limit = 300) {
  const list = cleanKeywords(seeds, 20);
  if (!list.length) throw new Error("Aucun mot-clé de départ valide.");
  const { result, cost } = await dfsPost("/keywords_data/google_ads/keywords_for_keywords/live", [
    { keywords: list, location_code: SWITZERLAND, language_code: language, sort_by: "search_volume" },
  ]);
  return { rows: toKeywordRows(result).slice(0, limit), cost, input: list };
}

type SerpItem = { type?: string; rank_group?: number; title?: string; url?: string; domain?: string; description?: string };

export async function topResults(keyword: string, language: SeoLanguage) {
  const [clean] = cleanKeywords([keyword], 1);
  if (!clean) throw new Error("Mot-clé invalide.");
  const { result, cost } = await dfsPost("/serp/google/organic/live/regular", [
    { keyword: clean, location_code: SWITZERLAND, language_code: language, depth: 10 },
  ]);
  const items = ((result[0] as { items?: SerpItem[] } | undefined)?.items ?? []).filter((item) => item.type === "organic");
  const rows: SerpRow[] = items.slice(0, 10).map((item, index) => ({
    rank: item.rank_group ?? index + 1,
    title: item.title ?? "",
    url: item.url ?? "",
    domain: item.domain ?? "",
    description: (item.description ?? "").slice(0, 300),
  }));
  return { rows, cost, input: [clean] };
}

// ---------------------------------------------------------------------------
// Stockage des rapports
// ---------------------------------------------------------------------------

export type SeoReport = {
  id: string;
  batch: string;
  share_token: string;
  label: string;
  kind: SeoKind;
  language: SeoLanguage;
  input: string;
  result: string;
  cost: number;
  error: string | null;
  created_at: number;
};

export async function saveReport(input: {
  batch: string;
  shareToken: string;
  label: string;
  kind: SeoKind;
  language: SeoLanguage;
  input: string[];
  rows: unknown[];
  cost: number;
  error?: string | null;
}): Promise<string> {
  const id = newId();
  await (await db())
    .prepare(
      "INSERT INTO seo_reports (id, batch, share_token, label, kind, language, input, result, cost, error, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    )
    .bind(
      id,
      input.batch,
      input.shareToken,
      input.label,
      input.kind,
      input.language,
      JSON.stringify(input.input),
      JSON.stringify(input.rows),
      input.cost,
      input.error ?? null,
      Date.now(),
    )
    .run();
  return id;
}

export async function listBatches(): Promise<
  { batch: string; share_token: string; label: string; reports: number; cost: number; created_at: number; errors: number }[]
> {
  const { results } = await (await db())
    .prepare(
      `SELECT batch, MIN(share_token) AS share_token, MIN(label) AS label, COUNT(*) AS reports, SUM(cost) AS cost,
              MIN(created_at) AS created_at, SUM(CASE WHEN error IS NULL THEN 0 ELSE 1 END) AS errors
       FROM seo_reports GROUP BY batch ORDER BY created_at DESC LIMIT 50`,
    )
    .all<{ batch: string; share_token: string; label: string; reports: number; cost: number; created_at: number; errors: number }>();
  return results ?? [];
}

export async function getBatch(batch: string): Promise<SeoReport[]> {
  const { results } = await (await db())
    .prepare("SELECT * FROM seo_reports WHERE batch = ? ORDER BY created_at ASC")
    .bind(batch)
    .all<SeoReport>();
  return results ?? [];
}

export async function getBatchByShareToken(token: string): Promise<SeoReport[]> {
  if (!/^[0-9a-f]{64}$/.test(token)) return [];
  const { results } = await (await db())
    .prepare("SELECT * FROM seo_reports WHERE share_token = ? ORDER BY created_at ASC")
    .bind(token)
    .all<SeoReport>();
  return results ?? [];
}

export async function deleteBatch(batch: string): Promise<void> {
  await (await db()).prepare("DELETE FROM seo_reports WHERE batch = ?").bind(batch).run();
}

export function newBatch(): { batch: string; shareToken: string } {
  return { batch: newId(), shareToken: randomToken() };
}

// ---------------------------------------------------------------------------
// Plan de recherche Thrax Legal (lancé en un clic depuis l'admin, étape par étape)
// ---------------------------------------------------------------------------

export type PlanStep = { label: string; kind: SeoKind; language: SeoLanguage; keywords: string[] };

const FR_VOLUMES = [
  // Offre
  "juriste externalisé", "juriste externe", "abonnement juridique", "abonnement juridique pme", "conseil juridique pme",
  "juriste pme", "juriste entreprise", "juriste d'entreprise", "service juridique externalisé", "avocat pme", "avocat entreprise",
  "conseil juridique entreprise", "conseil juridique en ligne", "juriste en ligne", "conseil juridique", "embaucher un juriste",
  "salaire juriste suisse", "juriste lausanne", "juriste genève", "juriste fribourg", "juriste neuchâtel", "juriste valais",
  "conseil juridique lausanne", "conseil juridique genève", "avocat lausanne", "avocat genève", "protection juridique entreprise",
  "assurance protection juridique entreprise", "permanence juridique", "consultation juridique gratuite",
  // CGV
  "cgv suisse", "conditions générales de vente suisse", "conditions générales de vente", "rédiger cgv", "modèle cgv suisse",
  "modèle conditions générales de vente", "cgv obligatoires suisse", "cgv site internet", "réserve de propriété suisse",
  "droit de rétractation suisse",
  // Travail
  "contrat de travail suisse", "modèle contrat de travail suisse", "contrat de travail", "période d'essai suisse",
  "délai de congé suisse", "délai de résiliation contrat de travail suisse", "licenciement maladie suisse",
  "clause de non concurrence suisse", "heures supplémentaires suisse", "13ème salaire suisse", "certificat de travail suisse",
  "licenciement abusif suisse", "licenciement immédiat suisse", "vacances suisse loi", "salaire minimum genève",
  "salaire minimum neuchâtel", "cct suisse",
  // Recouvrement
  "facture impayée suisse", "facture impayée", "mise en demeure suisse", "modèle mise en demeure", "lettre de mise en demeure",
  "poursuite pour dettes", "commandement de payer", "opposition commandement de payer", "mainlevée opposition",
  "réquisition de poursuite", "intérêts moratoires suisse", "prescription facture suisse", "recouvrement de créances suisse",
  "reconnaissance de dette", "extrait des poursuites",
  // nLPD
  "nlpd", "nlpd pme", "nouvelle loi protection des données suisse", "loi sur la protection des données suisse",
  "politique de confidentialité suisse", "modèle politique de confidentialité", "nlpd checklist", "registre des traitements",
  "lpd suisse", "rgpd suisse", "bannière cookies suisse", "nlpd entreprise",
  // Bail
  "bail commercial suisse", "bail commercial", "bail commercial genève", "bail commercial vaud", "résiliation bail commercial",
  "loyer indexé", "garantie de loyer", "contestation loyer initial", "transfert de bail commercial",
  "sous-location local commercial", "reprise de bail commercial",
  // Création et vie de l'entreprise
  "créer une entreprise en suisse", "raison individuelle", "créer une sàrl", "statuts sàrl", "inscription registre du commerce",
  "indépendant suisse", "devenir indépendant suisse",
];

const DE_VOLUMES = [
  "externer jurist", "rechtsberatung kmu", "rechtsberatung unternehmen", "rechtsberatung online", "jurist kmu",
  "anwalt kmu", "agb schweiz", "agb erstellen", "allgemeine geschäftsbedingungen muster", "arbeitsvertrag schweiz",
  "arbeitsvertrag muster schweiz", "kündigungsfrist schweiz", "probezeit schweiz", "konkurrenzverbot schweiz",
  "überstunden schweiz", "unbezahlte rechnung", "mahnung schweiz", "betreibung", "zahlungsbefehl", "rechtsvorschlag",
  "rechtsöffnung", "dsg schweiz", "neues datenschutzgesetz", "datenschutzerklärung schweiz", "geschäftsmietvertrag",
  "geschäftsmiete kündigung", "indexmiete", "gmbh gründen schweiz", "einzelfirma gründen",
];

export const RESEARCH_PLAN: PlanStep[] = [
  { label: "Volumes et CPC — français", kind: "volumes", language: "fr", keywords: FR_VOLUMES },
  { label: "Volumes et CPC — allemand", kind: "volumes", language: "de", keywords: DE_VOLUMES },
  {
    label: "Idées de mots-clés — offre (FR)",
    kind: "ideas",
    language: "fr",
    keywords: ["juriste pme", "conseil juridique entreprise", "juriste externalisé", "abonnement juridique", "avocat pme"],
  },
  {
    label: "Idées de mots-clés — sujets du guide (FR)",
    kind: "ideas",
    language: "fr",
    keywords: ["cgv suisse", "contrat de travail suisse", "facture impayée", "nlpd", "bail commercial", "poursuite pour dettes"],
  },
  {
    label: "Idées de mots-clés — droit des affaires (FR)",
    kind: "ideas",
    language: "fr",
    keywords: ["créer une sàrl", "licenciement suisse", "statuts sàrl", "contrat de prestation de services", "droit des sociétés suisse"],
  },
  { label: "Top 10 Google — cgv suisse", kind: "serp", language: "fr", keywords: ["cgv suisse"] },
  { label: "Top 10 Google — contrat de travail suisse", kind: "serp", language: "fr", keywords: ["contrat de travail suisse"] },
  { label: "Top 10 Google — facture impayée suisse", kind: "serp", language: "fr", keywords: ["facture impayée suisse"] },
  { label: "Top 10 Google — nlpd pme", kind: "serp", language: "fr", keywords: ["nlpd pme"] },
  { label: "Top 10 Google — bail commercial suisse", kind: "serp", language: "fr", keywords: ["bail commercial suisse"] },
  { label: "Top 10 Google — juriste pme", kind: "serp", language: "fr", keywords: ["juriste pme"] },
  { label: "Top 10 Google — conseil juridique entreprise", kind: "serp", language: "fr", keywords: ["conseil juridique entreprise"] },
];

export async function runStep(step: Pick<PlanStep, "kind" | "language" | "keywords">) {
  if (step.kind === "volumes") return searchVolumes(step.keywords, step.language);
  if (step.kind === "ideas") return keywordIdeas(step.keywords, step.language);
  return topResults(step.keywords[0] ?? "", step.language);
}
