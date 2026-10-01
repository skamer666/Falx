// Provenance des visites : sert seulement à savoir quels canaux amènent des demandes.
// Stockée dans le navigateur du visiteur (localStorage, 90 jours), jamais envoyée à un tiers,
// et jointe à une demande uniquement si le visiteur envoie un formulaire.

export const SOURCE_STORAGE_KEY = "thrax_source";
export const SOURCE_MAX_AGE_MS = 90 * 86_400_000;
export const SOURCE_MAX_LENGTH = 200;

const SEARCH_ENGINES: [RegExp, string][] = [
  [/(^|\.)google\./, "Google (naturel)"],
  [/(^|\.)bing\.com$/, "Bing (naturel)"],
  [/(^|\.)duckduckgo\.com$/, "DuckDuckGo (naturel)"],
  [/(^|\.)search\.yahoo\./, "Yahoo (naturel)"],
  [/(^|\.)ecosia\.org$/, "Ecosia (naturel)"],
  [/(^|\.)(facebook|instagram)\.com$|^l\.facebook\.com$|^lm\.facebook\.com$/, "Meta (naturel)"],
  [/(^|\.)linkedin\.com$|^lnkd\.in$/, "LinkedIn (naturel)"],
];

function clip(value: string, max = 60): string {
  return value.replace(/[\u0000-\u001f\u007f]/g, "").trim().slice(0, max);
}

/**
 * Décrit la provenance d'une visite à partir de l'adresse d'arrivée et du référent.
 * Retourne null quand il n'y a rien de plus précis que « direct » (pour ne pas écraser une
 * provenance déjà connue).
 */
export function describeVisit(url: URL, referrer: string, ownHost: string): { label: string; campaign: boolean } | null {
  const params = url.searchParams;
  const utmSource = clip(params.get("utm_source") ?? "");
  const utmMedium = clip(params.get("utm_medium") ?? "");
  const utmCampaign = clip(params.get("utm_campaign") ?? "");
  const paidGoogle = params.has("gclid") || params.has("gbraid") || params.has("wbraid");
  const paidMeta = params.has("fbclid");
  const page = ` · page ${clip(url.pathname, 80)}`;

  const paidMedium = /^(cpc|ppc|paid|paidsocial|paid_social|ads?|display)$/i.test(utmMedium);
  const campaign = utmCampaign ? ` · ${utmCampaign}` : "";
  // Annonces Google (marquage automatique gclid ou UTM google/cpc) et Meta : un seul canal chacun.
  if (paidGoogle || (/^google$/i.test(utmSource) && paidMedium)) return { label: `Google Ads${campaign}${page}`, campaign: true };
  if (/^(facebook|instagram|meta|fb|ig)$/i.test(utmSource) && paidMedium) return { label: `Meta Ads${campaign}${page}`, campaign: true };
  if (utmSource) {
    const parts = [utmSource, utmMedium].filter(Boolean).join(" / ");
    return { label: `${parts}${campaign}${page}`, campaign: true };
  }
  // fbclid est aussi ajouté aux liens Facebook ordinaires : ce n'est pas forcément une annonce.
  if (paidMeta) return { label: `Meta (lien)${page}`, campaign: true };

  if (referrer) {
    try {
      const host = new URL(referrer).hostname.replace(/^www\./, "");
      if (host && host !== ownHost.replace(/^www\./, "")) {
        const engine = SEARCH_ENGINES.find(([pattern]) => pattern.test(host));
        return { label: `${engine ? engine[1] : `Lien depuis ${clip(host)}`}${page}`, campaign: false };
      }
    } catch {
      // Référent illisible : on l'ignore.
    }
  }
  return null;
}

/** Nettoyage côté serveur de la valeur envoyée par le formulaire. */
export function cleanSource(value: FormDataEntryValue | null): string | null {
  const text = String(value ?? "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .trim()
    .slice(0, SOURCE_MAX_LENGTH);
  return text || null;
}
