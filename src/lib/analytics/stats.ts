// Agrégats de la page « Statistiques » de l'admin : audience anonyme + commandes + paiements + dépense publicitaire.
import { db, sourceChannel } from "@/lib/account/db";
import { getService, serviceText } from "@/lib/services/catalog";
import { zurichParts } from "./track";

/** Taux indicatif pour comparer des euros dépensés en pub et des francs encaissés. */
export const CHF_TO_EUR = 1.06;

export type Period = 7 | 30 | 90;
export type DayPoint = { day: string; visitors: number; pageviews: number; visits: number; revenue: number; orders: number; spend: number };
export type Row = { label: string; value: number; extra?: number; hint?: string };
export type ChannelRow = { channel: string; visits: number; orders: number; paid: number; revenue: number };
export type ServiceRow = { slug: string; name: string; views: number; orders: number; paid: number; revenue: number; express: number };

export type Totals = { visitors: number; visits: number; pageviews: number };

export type Stats = {
  period: Period;
  from: string;
  to: string;
  days: DayPoint[];
  totals: Totals;
  previous: Totals;
  live: number;
  channels: ChannelRow[];
  pages: Row[];
  landings: Row[];
  campaigns: Row[];
  devices: Row[];
  countries: Row[];
  locales: Row[];
  heat: number[][]; // [dow][hour]
  funnel: { label: string; value: number }[];
  business: {
    orders: number;
    quotes: number;
    callbacks: number;
    paid: number;
    pending: number;
    pendingValue: number;
    revenue: number;
    previousRevenue: number;
    previousPaid: number;
    averageBasket: number;
    expressShare: number;
    conversion: number; // commandes payées / visites
    revenuePerVisit: number;
    services: ServiceRow[];
    methods: Row[];
  };
  ads: { spend: number; adsVisits: number; adsOrders: number; adsPaid: number; adsRevenue: number; cpa: number | null; roas: number | null; costPerVisit: number | null };
  recentSpend: { day: string; amount: number }[];
};

function shiftDay(day: string, delta: number): string {
  const d = new Date(`${day}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + delta);
  return d.toISOString().slice(0, 10);
}

function dayStartMs(day: string): number {
  // Début de journée approximatif (UTC) : suffisant pour borner les commandes sur des périodes de plusieurs jours.
  return new Date(`${day}T00:00:00Z`).getTime() - 2 * 3_600_000;
}

type D1 = Awaited<ReturnType<typeof db>>;

async function dailyAudience(database: D1, from: string, to: string) {
  const { results } = await database
    .prepare("SELECT day, COUNT(*) AS pv, COUNT(DISTINCT visitor) AS vis, COALESCE(SUM(entry), 0) AS visits FROM page_views WHERE day >= ? AND day <= ? GROUP BY day")
    .bind(from, to)
    .all<{ day: string; pv: number; vis: number; visits: number }>();
  return results ?? [];
}

export async function getStats(period: Period): Promise<Stats> {
  const database = await db();
  const today = zurichParts(Date.now()).day;
  const from = shiftDay(today, -(period - 1));
  const prevTo = shiftDay(from, -1);
  const prevFrom = shiftDay(prevTo, -(period - 1));
  const fromMs = dayStartMs(from);
  const prevFromMs = dayStartMs(prevFrom);

  const q = <T>(sql: string, ...args: (string | number)[]) => database.prepare(sql).bind(...args).all<T>().then((r) => r.results ?? []);

  const [daily, prevDaily, channelsRaw, pagesRaw, landingsRaw, campaignsRaw, devicesRaw, countriesRaw, localesRaw, heatRaw, liveRaw, serviceViewers, ordersRaw, paidRaw, pendingRaw, prevPaidRaw, spendRaw, serviceViewsRaw] = await Promise.all([
    dailyAudience(database, from, today),
    dailyAudience(database, prevFrom, prevTo),
    q<{ channel: string | null; n: number }>("SELECT channel, COUNT(*) AS n FROM page_views WHERE entry = 1 AND day >= ? GROUP BY channel", from),
    q<{ path: string; pv: number; vis: number }>("SELECT path, COUNT(*) AS pv, COUNT(DISTINCT visitor || day) AS vis FROM page_views WHERE day >= ? GROUP BY path ORDER BY pv DESC LIMIT 14", from),
    q<{ path: string; n: number }>("SELECT path, COUNT(*) AS n FROM page_views WHERE entry = 1 AND day >= ? GROUP BY path ORDER BY n DESC LIMIT 10", from),
    q<{ campaign: string | null; content: string | null; n: number }>("SELECT campaign, content, COUNT(*) AS n FROM page_views WHERE entry = 1 AND day >= ? AND channel = 'Google Ads' GROUP BY campaign, content ORDER BY n DESC LIMIT 10", from),
    q<{ device: string | null; n: number }>("SELECT device, COUNT(*) AS n FROM page_views WHERE entry = 1 AND day >= ? GROUP BY device", from),
    q<{ country: string | null; n: number }>("SELECT country, COUNT(*) AS n FROM page_views WHERE entry = 1 AND day >= ? GROUP BY country ORDER BY n DESC LIMIT 6", from),
    q<{ locale: string | null; n: number }>("SELECT locale, COUNT(*) AS n FROM page_views WHERE entry = 1 AND day >= ? GROUP BY locale", from),
    q<{ dow: number; hour: number; n: number }>("SELECT dow, hour, COUNT(*) AS n FROM page_views WHERE entry = 1 AND day >= ? GROUP BY dow, hour", from),
    q<{ n: number }>("SELECT COUNT(DISTINCT visitor) AS n FROM page_views WHERE ts > ?", Date.now() - 30 * 60_000),
    q<{ n: number }>("SELECT COUNT(DISTINCT visitor || day) AS n FROM page_views WHERE day >= ? AND (path LIKE '/__/particuliers/%' OR path LIKE '/__/entreprises/%')", from),
    q<{ id: string; service: string | null; express: number; source: string | null; created_at: number }>(
      "SELECT id, service, express, source, created_at FROM leads WHERE created_at >= ? AND name NOT LIKE 'TEST%'",
      fromMs,
    ),
    q<{ lead_id: string; amount_rappen: number; method: string | null; paid_at: number | null; service: string | null; express: number; source: string | null }>(
      "SELECT p.lead_id, p.amount_rappen, p.method, p.paid_at, l.service, l.express, l.source FROM order_payments p JOIN leads l ON l.id = p.lead_id WHERE p.status = 'paid' AND p.paid_at >= ? AND l.name NOT LIKE 'TEST%'",
      fromMs,
    ),
    q<{ amount_rappen: number }>("SELECT p.amount_rappen FROM order_payments p JOIN leads l ON l.id = p.lead_id WHERE p.status = 'pending' AND p.created_at >= ? AND p.created_at < ? AND l.name NOT LIKE 'TEST%'", fromMs, Date.now() - 3_600_000),
    q<{ amount_rappen: number }>("SELECT p.amount_rappen FROM order_payments p JOIN leads l ON l.id = p.lead_id WHERE p.status = 'paid' AND p.paid_at >= ? AND p.paid_at < ? AND l.name NOT LIKE 'TEST%'", prevFromMs, fromMs),
    q<{ day: string; amount_cents: number }>("SELECT day, amount_cents FROM ad_spend WHERE day >= ? AND day <= ?", from, today),
    q<{ path: string; n: number }>(
      "SELECT path, COUNT(DISTINCT visitor || day) AS n FROM page_views WHERE day >= ? AND (path LIKE '/__/particuliers/%' OR path LIKE '/__/entreprises/%') GROUP BY path",
      from,
    ),
  ]);

  // Séries journalières complètes (jours sans visite = 0).
  const byDay = new Map(daily.map((d) => [d.day, d]));
  const spendByDay = new Map(spendRaw.map((s) => [s.day, s.amount_cents / 100]));
  const revenueByDay = new Map<string, { revenue: number; orders: number }>();
  for (const p of paidRaw) {
    if (!p.paid_at) continue;
    const day = zurichParts(p.paid_at).day;
    const e = revenueByDay.get(day) ?? { revenue: 0, orders: 0 };
    e.revenue += p.amount_rappen / 100;
    e.orders += 1;
    revenueByDay.set(day, e);
  }
  const days: DayPoint[] = [];
  for (let i = 0; i < period; i += 1) {
    const day = shiftDay(from, i);
    const a = byDay.get(day);
    const r = revenueByDay.get(day);
    days.push({ day, visitors: a?.vis ?? 0, pageviews: a?.pv ?? 0, visits: a?.visits ?? 0, revenue: r?.revenue ?? 0, orders: r?.orders ?? 0, spend: spendByDay.get(day) ?? 0 });
  }
  const sum = (rows: { pv: number; vis: number; visits: number }[]): Totals => ({
    visitors: rows.reduce((t, r) => t + r.vis, 0),
    pageviews: rows.reduce((t, r) => t + r.pv, 0),
    visits: rows.reduce((t, r) => t + r.visits, 0),
  });
  const totals = sum(daily);
  const previous = sum(prevDaily);

  // Commandes, paiements, canaux.
  const isOrder = (service: string | null) => Boolean(service && !service.startsWith("devis-"));
  const orders = ordersRaw.filter((l) => isOrder(l.service));
  const quotes = ordersRaw.filter((l) => l.service?.startsWith("devis-")).length;
  const callbacks = ordersRaw.filter((l) => !l.service).length;

  const channelMap = new Map<string, ChannelRow>();
  const ch = (name: string) => {
    let e = channelMap.get(name);
    if (!e) {
      e = { channel: name, visits: 0, orders: 0, paid: 0, revenue: 0 };
      channelMap.set(name, e);
    }
    return e;
  };
  for (const c of channelsRaw) ch(c.channel ?? "Direct").visits += c.n;
  for (const o of orders) ch(sourceChannel(o.source) === "Inconnue" ? "Direct" : sourceChannel(o.source)).orders += 1;
  for (const p of paidRaw) {
    const e = ch(sourceChannel(p.source) === "Inconnue" ? "Direct" : sourceChannel(p.source));
    e.paid += 1;
    e.revenue += p.amount_rappen / 100;
  }
  const channels = [...channelMap.values()].sort((a, b) => b.visits + b.orders - (a.visits + a.orders));

  const serviceMap = new Map<string, ServiceRow>();
  const sv = (slug: string) => {
    let e = serviceMap.get(slug);
    if (!e) {
      const def = getService(slug);
      e = { slug, name: def ? serviceText("fr", slug).name : slug, views: 0, orders: 0, paid: 0, revenue: 0, express: 0 };
      serviceMap.set(slug, e);
    }
    return e;
  };
  for (const o of orders) {
    const e = sv(o.service as string);
    e.orders += 1;
    if (o.express) e.express += 1;
  }
  for (const p of paidRaw) {
    if (!isOrder(p.service)) continue;
    const e = sv(p.service as string);
    e.paid += 1;
    e.revenue += p.amount_rappen / 100;
  }
  // Visiteurs par fiche de prestation (toutes langues confondues), pour voir quelle page convertit.
  for (const v of serviceViewsRaw) {
    const slug = v.path.split("/").pop() ?? "";
    if (getService(slug)) sv(slug).views += v.n;
  }
  const services = [...serviceMap.values()].sort((a, b) => b.revenue - a.revenue || b.orders - a.orders || b.views - a.views);

  const methodMap = new Map<string, number>();
  for (const p of paidRaw) methodMap.set(p.method ?? "inconnu", (methodMap.get(p.method ?? "inconnu") ?? 0) + 1);

  const revenue = paidRaw.reduce((t, p) => t + p.amount_rappen, 0) / 100;
  const previousRevenue = prevPaidRaw.reduce((t, p) => t + p.amount_rappen, 0) / 100;
  const paidCount = paidRaw.length;
  const expressCount = orders.filter((o) => o.express).length;

  const heat = Array.from({ length: 7 }, () => Array<number>(24).fill(0));
  for (const h of heatRaw) if (h.dow >= 0 && h.dow < 7 && h.hour >= 0 && h.hour < 24) heat[h.dow][h.hour] = h.n;

  const label = (v: string | null, fallback: string) => (v && v.length ? v : fallback);
  const adsChannel = channelMap.get("Google Ads");
  const spend = days.reduce((t, d) => t + d.spend, 0);
  const adsRevenue = adsChannel?.revenue ?? 0;
  const adsPaid = adsChannel?.paid ?? 0;

  return {
    period,
    from,
    to: today,
    days,
    totals,
    previous,
    live: liveRaw[0]?.n ?? 0,
    channels,
    pages: pagesRaw.map((p) => ({ label: p.path, value: p.pv, extra: p.vis })),
    landings: landingsRaw.map((p) => ({ label: p.path, value: p.n })),
    campaigns: campaignsRaw.map((c) => ({ label: label(c.campaign, "(sans campagne)"), value: c.n, hint: c.content ?? undefined })),
    devices: devicesRaw.map((d) => ({ label: label(d.device, "Inconnu"), value: d.n })),
    countries: countriesRaw.map((c) => ({ label: label(c.country, "Inconnu"), value: c.n })),
    locales: localesRaw.map((l) => ({ label: label(l.locale, "?").toUpperCase(), value: l.n })),
    heat,
    funnel: [
      { label: "Visiteurs", value: totals.visitors },
      { label: "Ont vu une prestation", value: Math.min(serviceViewers[0]?.n ?? 0, totals.visitors) },
      { label: "Ont commandé", value: orders.length },
      { label: "Ont payé", value: paidCount },
    ],
    business: {
      orders: orders.length,
      quotes,
      callbacks,
      paid: paidCount,
      pending: pendingRaw.length,
      pendingValue: pendingRaw.reduce((t, p) => t + p.amount_rappen, 0) / 100,
      revenue,
      previousRevenue,
      previousPaid: prevPaidRaw.length,
      averageBasket: paidCount ? revenue / paidCount : 0,
      expressShare: orders.length ? expressCount / orders.length : 0,
      conversion: totals.visits ? paidCount / totals.visits : 0,
      revenuePerVisit: totals.visits ? revenue / totals.visits : 0,
      services,
      methods: [...methodMap.entries()].map(([label, value]) => ({ label, value })),
    },
    ads: {
      spend,
      adsVisits: adsChannel?.visits ?? 0,
      adsOrders: adsChannel?.orders ?? 0,
      adsPaid,
      adsRevenue,
      cpa: adsPaid && spend ? spend / adsPaid : null,
      roas: spend ? (adsRevenue * CHF_TO_EUR) / spend : null,
      costPerVisit: adsChannel?.visits && spend ? spend / adsChannel.visits : null,
    },
    recentSpend: spendRaw.map((s) => ({ day: s.day, amount: s.amount_cents / 100 })).sort((a, b) => b.day.localeCompare(a.day)).slice(0, 7),
  };
}

/** Enregistre (ou remplace) la dépense publicitaire d'un jour, en euros. */
export async function saveAdSpend(day: string, euros: number): Promise<void> {
  const cents = Math.round(euros * 100);
  await (await db())
    .prepare("INSERT INTO ad_spend (day, amount_cents) VALUES (?, ?) ON CONFLICT(day) DO UPDATE SET amount_cents = excluded.amount_cents")
    .bind(day, cents)
    .run();
}

/** Répartit une dépense totale (en euros) à parts égales sur les jours de la période, au centime près. Renvoie le nombre de jours. */
export async function saveAdSpendRange(from: string, to: string, totalEuros: number): Promise<number> {
  const days: string[] = [];
  for (let t = Date.parse(`${from}T00:00:00Z`); t <= Date.parse(`${to}T00:00:00Z`); t += 86_400_000) days.push(new Date(t).toISOString().slice(0, 10));
  if (days.length === 0) return 0;
  const totalCents = Math.round(totalEuros * 100);
  const base = Math.floor(totalCents / days.length);
  const extra = totalCents - base * days.length;
  const database = await db();
  await database.batch(
    days.map((day, index) =>
      database
        .prepare("INSERT INTO ad_spend (day, amount_cents) VALUES (?, ?) ON CONFLICT(day) DO UPDATE SET amount_cents = excluded.amount_cents")
        .bind(day, base + (index < extra ? 1 : 0)),
    ),
  );
  return days.length;
}
