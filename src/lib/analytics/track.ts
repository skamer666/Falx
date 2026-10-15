// Mesure d'audience sans cookie ni identifiant durable.
// Le « visiteur » est une empreinte (IP + navigateur + sel du jour). Le sel est tiré au hasard chaque jour
// et les sels des jours passés sont effacés : une fois la journée terminée, personne (pas même nous)
// ne peut recalculer ni retrouver l'empreinte d'un visiteur.
import { db } from "@/lib/account/db";
import { describeVisit } from "@/lib/source";

const ZONE = "Europe/Zurich";
const BOT = /bot|crawl|spider|slurp|headless|lighthouse|pagespeed|preview|monitor|uptime|curl|wget|python|axios|go-http|java\/|httpclient|facebookexternalhit|embedly|scrapy|phantom/i;
const MAX_HITS_PER_VISITOR_DAY = 300;
const RETENTION_DAYS = 400;

/** Jour (AAAA-MM-JJ), heure et jour de semaine (0 = lundi) à l'heure de Zurich. */
export function zurichParts(timestamp: number): { day: string; hour: number; dow: number } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hour12: false,
    weekday: "short",
  }).formatToParts(new Date(timestamp));
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return {
    day: `${get("year")}-${get("month")}-${get("day")}`,
    hour: Number(get("hour")) % 24,
    dow: Math.max(0, weekdays.indexOf(get("weekday"))),
  };
}

export function isBot(userAgent: string): boolean {
  return !userAgent || BOT.test(userAgent);
}

async function sha256Hex(text: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

/** Sel du jour : créé au premier passage de la journée ; ceux des jours précédents sont effacés. */
async function dailySalt(day: string): Promise<string> {
  const database = await db();
  const key = `salt:${day}`;
  const existing = await database.prepare("SELECT value FROM schema_meta WHERE key = ?").bind(key).first<{ value: string }>();
  if (existing) return existing.value;
  const salt = crypto.randomUUID() + crypto.randomUUID();
  await database.prepare("INSERT OR IGNORE INTO schema_meta (key, value) VALUES (?, ?)").bind(key, salt).run();
  await database.prepare("DELETE FROM schema_meta WHERE key LIKE 'salt:%' AND key != ?").bind(key).run();
  const cutoff = zurichParts(Date.now() - RETENTION_DAYS * 86_400_000).day;
  await database.prepare("DELETE FROM page_views WHERE day < ?").bind(cutoff).run();
  const row = await database.prepare("SELECT value FROM schema_meta WHERE key = ?").bind(key).first<{ value: string }>();
  return row?.value ?? salt;
}

export type HitInput = {
  path: string;
  referrer: string;
  search: string;
  width: number;
  entry: boolean;
  ip: string;
  userAgent: string;
  country: string | null;
  host: string;
};

const PATH_OK = /^\/(fr|de|en|it)(\/[A-Za-z0-9._~%\-/]*)?$/;

/** Enregistre une page vue anonyme. Renvoie false si elle est ignorée (robot, page privée, abus). */
export async function recordHit(input: HitInput): Promise<boolean> {
  if (isBot(input.userAgent)) return false;
  const path = input.path.split("?")[0].replace(/\/+$/, "") || "/";
  if (path.length > 200 || !PATH_OK.test(path)) return false;
  if (/^\/(fr|de|en|it)\/(admin|compte|checkout)(\/|$)/.test(path)) return false;

  const now = Date.now();
  const { day, hour, dow } = zurichParts(now);
  const salt = await dailySalt(day);
  const visitor = (await sha256Hex(`${salt}|${input.ip}|${input.userAgent}`)).slice(0, 24);

  const database = await db();
  const count = await database.prepare("SELECT COUNT(*) AS n FROM page_views WHERE visitor = ? AND day = ?").bind(visitor, day).first<{ n: number }>();
  if ((count?.n ?? 0) >= MAX_HITS_PER_VISITOR_DAY) return false;

  let channel: string | null = null;
  let refHost: string | null = null;
  let campaign: string | null = null;
  let content: string | null = null;
  if (input.entry) {
    let url: URL;
    try {
      url = new URL(`https://${input.host}${path}${input.search.startsWith("?") ? input.search.slice(0, 400) : ""}`);
    } catch {
      return false;
    }
    const visit = describeVisit(url, input.referrer.slice(0, 400), input.host);
    channel = visit ? visit.label.split(" · ")[0] : "Direct";
    campaign = (url.searchParams.get("utm_campaign") ?? "").slice(0, 60) || null;
    content = (url.searchParams.get("utm_content") ?? url.searchParams.get("utm_term") ?? "").slice(0, 60) || null;
    try {
      const host = new URL(input.referrer).hostname.replace(/^www\./, "");
      if (host && host !== input.host.replace(/^www\./, "")) refHost = host.slice(0, 80);
    } catch {
      // Pas de référent exploitable.
    }
  }
  const device = input.width > 0 && input.width < 768 ? "Mobile" : input.width < 1100 && input.width > 0 ? "Tablette" : "Ordinateur";
  const locale = path.slice(1, 3);
  await database
    .prepare("INSERT INTO page_views (ts, day, hour, dow, path, locale, visitor, entry, channel, ref_host, campaign, content, device, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
    .bind(now, day, hour, dow, path, locale, visitor, input.entry ? 1 : 0, channel, refHost, campaign, content, device, input.country)
    .run();
  return true;
}
