import Link from "next/link";
import type { ReactNode } from "react";
import SubmitButton from "@/components/account/SubmitButton";
import { AdminDenied, AdminShell, Card, Empty, Flash, FIELD, FIELD_LABEL, PageHeader } from "@/components/admin/parts";
import { BarList, BarsChart, Delta, Donut, Funnel, Heatmap, nf, pct, Sparkline, TrendChart } from "@/components/admin/charts";
import { getAdminBadges } from "@/lib/account/admin-db";
import { getSessionUserRaw } from "@/lib/account/session";
import { getStats, type Period } from "@/lib/analytics/stats";
import { saveAdSpendAction } from "../actions";

export const dynamic = "force-dynamic";

const PERIODS: Period[] = [7, 30, 90];
const FLASH: Record<string, string> = { spend: "Dépense enregistrée.", spend_invalid: "Date ou montant invalide." };
const chf = (n: number) => `${nf(n, n % 1 ? 2 : 0)} CHF`;
const eur = (n: number) => `${nf(n, 2)} €`;
const shiftDayKey = (day: string, delta: number) => new Date(Date.parse(`${day}T00:00:00Z`) + delta * 86_400_000).toISOString().slice(0, 10);

function Kpi({ label, value, delta, spark, color, hint }: { label: string; value: ReactNode; delta?: ReactNode; spark?: number[]; color?: string; hint?: ReactNode }) {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-bg p-5">
      <p className="text-xs font-medium uppercase tracking-[0.08em] text-text-muted">{label}</p>
      <p className="mt-2 text-[1.9rem] font-semibold leading-none tracking-[-0.02em]">{value}</p>
      <div className="mt-2 flex items-center gap-2 text-xs text-text-muted">
        {delta}
        {hint ? <span>{hint}</span> : null}
      </div>
      {spark ? <div className="mt-auto pt-3"><Sparkline values={spark} color={color} /></div> : null}
    </div>
  );
}

export default async function AdminStatsPage({ searchParams }: { searchParams: Promise<{ jours?: string; ok?: string }> }) {
  const admin = await getSessionUserRaw();
  if (!admin?.is_admin) return <AdminDenied signedIn={Boolean(admin)} />;
  const { jours, ok } = await searchParams;
  const period = (PERIODS.find((p) => String(p) === jours) ?? 30) as Period;
  const [stats, badges] = await Promise.all([getStats(period), getAdminBadges()]);
  const { totals, previous, business: b, ads } = stats;
  const empty = totals.pageviews === 0;
  const dayKeys = stats.days.map((d) => d.day);
  const weekend = stats.heat.slice(5).flat().reduce((t, v) => t + v, 0);
  const all = stats.heat.flat().reduce((t, v) => t + v, 0);

  return (
    <AdminShell active="stats" adminEmail={admin.email} badges={badges}>
      <PageHeader
        title="Statistiques"
        subtitle={`Du ${stats.from} au ${stats.to} · audience anonyme sans cookie, commandes et paiements réels (les commandes dont le nom commence par « TEST » sont exclues).`}
        actions={
          <>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium">
              <span className={`h-2 w-2 rounded-full ${stats.live ? "bg-[#2f9e6e]" : "bg-text-muted/40"}`} />
              {stats.live} en ce moment
            </span>
            {PERIODS.map((p) => (
              <Link key={p} href={`/fr/admin/statistiques?jours=${p}`} className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${p === period ? "bg-text font-medium text-bg" : "border border-border text-text-muted hover:bg-surface hover:text-text"}`}>
                {p} jours
              </Link>
            ))}
          </>
        }
      />
      {ok && FLASH[ok] ? <Flash tone={ok === "spend" ? "success" : "error"}>{FLASH[ok]}</Flash> : null}

      {empty ? (
        <Empty>Aucune visite enregistrée pour l&apos;instant. Les pages vues apparaissent ici dès que des visiteurs (hors robots et hors administrateur) parcourent le site.</Empty>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <Kpi label="Visiteurs" value={nf(totals.visitors)} delta={<Delta now={totals.visitors} before={previous.visitors} />} hint="vs période précédente" spark={stats.days.map((d) => d.visitors)} color="#101010" />
        <Kpi label="Visites" value={nf(totals.visits)} delta={<Delta now={totals.visits} before={previous.visits} />} hint={`${totals.visits ? nf(totals.pageviews / totals.visits, 1) : "0"} pages par visite`} spark={stats.days.map((d) => d.visits)} color="#3b6ef6" />
        <Kpi label="Chiffre d'affaires" value={chf(b.revenue)} delta={<Delta now={b.revenue} before={b.previousRevenue} />} hint={`${b.paid} commande${b.paid > 1 ? "s" : ""} payée${b.paid > 1 ? "s" : ""}`} spark={stats.days.map((d) => d.revenue)} color="#2f9e6e" />
        <Kpi label="Conversion" value={pct(b.conversion)} hint="commandes payées ÷ visites" />
        <Kpi label="Panier moyen" value={b.paid ? chf(b.averageBasket) : "–"} hint={`${pct(b.expressShare, 0)} des commandes en express`} />
        <Kpi label="CA par visite" value={totals.visits ? `${nf(b.revenuePerVisit, 2)} CHF` : "–"} hint="ce que rapporte chaque visite" />
      </div>

      <Card title="Audience" className="mt-5" action={<span className="text-xs text-text-muted">visiteurs uniques par jour · pages vues en pointillés</span>}>
        <TrendChart days={dayKeys} series={[{ label: "Visiteurs", color: "#101010", values: stats.days.map((d) => d.visitors) }, { label: "Pages vues", color: "#3b6ef6", values: stats.days.map((d) => d.pageviews) }]} />
      </Card>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Card title="Du visiteur au paiement">
          <Funnel steps={stats.funnel} />
          <p className="mt-4 text-xs leading-relaxed text-text-muted">
            {b.pending ? <>{b.pending} paiement{b.pending > 1 ? "s" : ""} ouvert{b.pending > 1 ? "s" : ""} depuis plus d&apos;une heure sans être payé{b.pending > 1 ? "s" : ""} ({chf(b.pendingValue)}) : un email de rappel unique part automatiquement à l&apos;expiration du lien (1 h). </> : null}
            {b.quotes} demande{b.quotes > 1 ? "s" : ""} de devis, {b.callbacks} demande{b.callbacks > 1 ? "s" : ""} de rappel sur la période.
          </p>
        </Card>
        <Card title="D'où viennent les visites">
          <BarList rows={stats.channels.filter((c) => c.visits).map((c) => ({ label: c.channel, value: c.visits, sub: `${c.orders} commande${c.orders > 1 ? "s" : ""} · ${c.paid} payée${c.paid > 1 ? "s" : ""}${c.revenue ? ` · ${chf(c.revenue)}` : ""}` }))} color="#3b6ef6" />
        </Card>
      </div>

      <Card title="Rendement par canal" className="mt-5">
        {stats.channels.length === 0 ? (
          <p className="text-sm text-text-muted">Pas encore de données.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="text-left text-xs text-text-muted">
                  <th className="pb-2 font-medium">Canal</th>
                  <th className="pb-2 text-right font-medium">Visites</th>
                  <th className="pb-2 text-right font-medium">Visiteurs</th>
                  <th className="pb-2 text-right font-medium">Commandes</th>
                  <th className="pb-2 text-right font-medium">Payées</th>
                  <th className="pb-2 text-right font-medium">Conversion</th>
                  <th className="pb-2 text-right font-medium">CA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {stats.channels.map((c) => (
                  <tr key={c.channel}>
                    <td className="py-2 font-medium">{c.channel}</td>
                    <td className="py-2 text-right tabular-nums">{nf(c.visits)}</td>
                    <td className="py-2 text-right tabular-nums">{c.orders}</td>
                    <td className="py-2 text-right tabular-nums">{c.paid}</td>
                    <td className="py-2 text-right tabular-nums">{c.visits ? pct(c.paid / c.visits) : "–"}</td>
                    <td className="py-2 text-right font-semibold tabular-nums">{c.revenue ? chf(c.revenue) : "–"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Card title="Pages les plus vues">
          <BarList rows={stats.pages.map((p) => ({ label: p.label, value: p.value, sub: `${nf(p.extra ?? 0)} visiteur${(p.extra ?? 0) > 1 ? "s" : ""}` }))} color="#101010" />
        </Card>
        <Card title="Pages d'arrivée">
          <BarList rows={stats.landings} color="#7c5cff" />
        </Card>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Card title="Quand viennent-ils ?" action={all ? <span className="text-xs text-text-muted">{pct(weekend / all, 0)} des visites le week-end</span> : undefined}>
          <Heatmap heat={stats.heat} />
          <p className="mt-2 text-xs text-text-muted">Heure de Zurich. Utile pour décider si le week-end vaut la peine côté publicité.</p>
        </Card>
        <Card title="Appareils, langues, pays">
          <div className="space-y-6">
            <Donut rows={stats.devices} center="visites" />
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.08em] text-text-muted">Langues</p>
                <BarList rows={stats.locales} color="#14a3b8" />
              </div>
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.08em] text-text-muted">Pays</p>
                <BarList rows={stats.countries} color="#e0a030" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card title="Chiffre d'affaires par jour" className="mt-5" action={<span className="text-xs text-text-muted">paiements reçus, en CHF</span>}>
        <BarsChart days={dayKeys} values={stats.days.map((d) => d.revenue)} color="#2f9e6e" unit=" CHF" />
      </Card>

      <Card title="Prestations" className="mt-5">
        {b.services.length === 0 ? (
          <p className="text-sm text-text-muted">Aucune visite de prestation ni commande sur la période.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="text-left text-xs text-text-muted">
                  <th className="pb-2 font-medium">Prestation</th>
                  <th className="pb-2 text-right font-medium">Visiteurs</th>
                  <th className="pb-2 text-right font-medium">Commandes</th>
                  <th className="pb-2 text-right font-medium">Payées</th>
                  <th className="pb-2 text-right font-medium">Express</th>
                  <th className="pb-2 text-right font-medium">CA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {b.services.map((s) => (
                  <tr key={s.slug}>
                    <td className="py-2 font-medium">{s.name}</td>
                    <td className="py-2 text-right tabular-nums">{s.views || "–"}</td>
                    <td className="py-2 text-right tabular-nums">
                      {s.orders}
                      {s.views ? <span className="ml-1 text-xs text-text-muted">({nf((s.orders / s.views) * 100, 1)} %)</span> : null}
                    </td>
                    <td className="py-2 text-right tabular-nums">{s.paid}</td>
                    <td className="py-2 text-right tabular-nums">{s.express}</td>
                    <td className="py-2 text-right font-semibold tabular-nums">{s.revenue ? chf(s.revenue) : "–"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {b.methods.length ? <p className="mt-3 text-xs text-text-muted">Moyens de paiement : {b.methods.map((m) => `${m.label} ${m.value}`).join(" · ")}</p> : null}
      </Card>

      <div id="pub" className="mt-5 scroll-mt-6 space-y-5">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Kpi label="Dépense pub saisie" value={eur(ads.spend)} hint={`${ads.adsVisits} visite${ads.adsVisits > 1 ? "s" : ""} Google Ads`} />
          <Kpi label="Coût par visite pub" value={ads.costPerVisit !== null ? eur(ads.costPerVisit) : "–"} hint="≈ coût moyen d'un clic" />
          <Kpi label="Coût par commande payée" value={ads.cpa !== null ? eur(ads.cpa) : "–"} hint={ads.adsPaid ? `${ads.adsPaid} payée${ads.adsPaid > 1 ? "s" : ""} via Google Ads` : "aucune commande payée via Google Ads"} />
          <Kpi label="Rendement (ROAS)" value={ads.roas !== null ? `${nf(ads.roas, 2)}×` : "–"} hint="CA Google Ads ÷ dépense (1 € ≈ 1 CHF 0,94, indicatif)" />
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          <Card title="Campagnes Google Ads">
            <BarList rows={stats.campaigns.map((c) => ({ label: c.label, value: c.value, sub: c.hint ? `contenu : ${c.hint}` : undefined }))} color="#e5566d" empty="Aucune visite issue d'une annonce avec campagne sur la période." />
            <p className="mt-3 text-xs text-text-muted">Les annonces sont identifiées par le paramètre gclid ou utm_source=google&amp;utm_medium=cpc dans l&apos;adresse d&apos;arrivée.</p>
          </Card>
          <Card title="Dépense Google Ads">
            <BarsChart days={dayKeys} values={stats.days.map((d) => d.spend)} color="#e5566d" unit=" €" height={150} />
            <form action={saveAdSpendAction} className="mt-4 flex flex-wrap items-end gap-3">
              <div>
                <label className={FIELD_LABEL} htmlFor="spend-from">Du</label>
                <input id="spend-from" name="from" type="date" required defaultValue={shiftDayKey(stats.to, -6)} className={`${FIELD} mt-1`} />
              </div>
              <div>
                <label className={FIELD_LABEL} htmlFor="spend-to">Au</label>
                <input id="spend-to" name="to" type="date" required defaultValue={stats.to} className={`${FIELD} mt-1`} />
              </div>
              <div>
                <label className={FIELD_LABEL} htmlFor="spend-amount">Total dépensé (€)</label>
                <input id="spend-amount" name="amount" type="number" step="0.01" min="0" required className={`${FIELD} mt-1 w-32`} />
              </div>
              <SubmitButton className="!px-4 !py-1.5 !text-xs">Enregistrer</SubmitButton>
            </form>
            <p className="mt-2 text-xs text-text-muted">
              Une fois par semaine suffit : dans Google Ads, choisis la période et recopie le <strong>Coût</strong> total. Il est réparti à parts égales sur les jours choisis (le coût par commande reste exact sur la période). Pour un seul jour, mets la même date dans « Du » et « Au ».
            </p>
          </Card>
        </div>
      </div>

      <p className="mt-8 text-xs leading-relaxed text-text-muted">
        Définitions : un <strong>visiteur</strong> est compté une fois par jour (empreinte anonyme qui change chaque nuit, sans cookie) ; une <strong>visite</strong> est une arrivée sur le site ; les robots, les visiteurs qui refusent le suivi (Do Not Track) et l&apos;administrateur ne sont pas comptés. Les commandes et paiements viennent de la base de données réelle ; le canal d&apos;une commande est celui enregistré au moment de la commande (jusqu&apos;à 90 jours après la première visite).
      </p>
    </AdminShell>
  );
}
