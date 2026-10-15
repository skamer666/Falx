// Graphiques en SVG pur (rendus côté serveur, aucune bibliothèque) : légers, nets sur tous les écrans, infobulles au survol.
import type { ReactNode } from "react";

export const PALETTE = ["#101010", "#2f9e6e", "#3b6ef6", "#e0a030", "#7c5cff", "#e5566d", "#14a3b8", "#8a8a8a"];
const GRID = "rgba(16,16,16,0.08)";
const MUTED = "rgba(16,16,16,0.55)";

export const nf = (n: number, digits = 0) => n.toLocaleString("fr-CH", { minimumFractionDigits: digits, maximumFractionDigits: digits }).replace(/ | /g, "'");
export const pct = (n: number, digits = 1) => `${nf(n * 100, digits)} %`;
const dayLabel = (day: string) => new Date(`${day}T12:00:00Z`).toLocaleDateString("fr-CH", { day: "numeric", month: "short", timeZone: "UTC" });
const weekday = (day: string) => new Date(`${day}T12:00:00Z`).toLocaleDateString("fr-CH", { weekday: "short", timeZone: "UTC" });

function niceMax(value: number): number {
  if (value <= 4) return 4;
  const pow = 10 ** Math.floor(Math.log10(value));
  const n = value / pow;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * pow;
}

/** Variation en % par rapport à la période précédente. */
export function Delta({ now, before, invert = false }: { now: number; before: number; invert?: boolean }) {
  if (!before && !now) return <span className="text-text-muted">–</span>;
  if (!before) return <span className="font-medium text-text-muted">nouveau</span>;
  const change = Math.min((now - before) / before, 9.99);
  const good = invert ? change < 0 : change > 0;
  const flat = Math.abs(change) < 0.005;
  return (
    <span className={`inline-flex items-center gap-1 font-medium ${flat ? "text-text-muted" : good ? "text-[#2f9e6e]" : "text-danger"}`}>
      <svg viewBox="0 0 10 10" className={`h-2.5 w-2.5 ${change < 0 ? "rotate-180" : ""} ${flat ? "opacity-0" : ""}`} aria-hidden>
        <path d="M5 1 9 8H1z" fill="currentColor" />
      </svg>
      {change > 0 ? "+" : ""}
      {change >= 9.99 ? "> 900" : nf(change * 100, 0)} %
    </span>
  );
}

export function Sparkline({ values, color = "#101010", height = 34 }: { values: number[]; color?: string; height?: number }) {
  const w = 120;
  const max = Math.max(...values, 1);
  const step = values.length > 1 ? w / (values.length - 1) : w;
  const pts = values.map((v, i) => [i * step, height - 3 - (v / max) * (height - 8)] as const);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const id = `spark-${color.replace("#", "")}`;
  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="h-9 w-full" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.25" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${line} L${w},${height} L0,${height}Z`} fill={`url(#${id})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

type Series = { label: string; color: string; values: number[] };

/** Aires/courbes sur les jours de la période, avec infobulle par jour. */
export function TrendChart({ days, series, unit = "", height = 270 }: { days: string[]; series: Series[]; unit?: string; height?: number }) {
  const W = 760;
  const H = height;
  const m = { l: 40, r: 14, t: 14, b: 30 };
  const iw = W - m.l - m.r;
  const ih = H - m.t - m.b;
  const max = niceMax(Math.max(...series.flatMap((s) => s.values), 1));
  const n = days.length;
  const x = (i: number) => m.l + (n > 1 ? (i / (n - 1)) * iw : iw / 2);
  const y = (v: number) => m.t + ih - (v / max) * ih;
  const smooth = (vals: number[]) => {
    const pts = vals.map((v, i) => [x(i), y(v)] as const);
    if (pts.length < 2) return pts.length ? `M${pts[0][0]},${pts[0][1]}` : "";
    let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
    for (let i = 1; i < pts.length; i += 1) {
      const [x0, y0] = pts[i - 1];
      const [x1, y1] = pts[i];
      const cx = (x0 + x1) / 2;
      d += ` C${cx.toFixed(1)},${y0.toFixed(1)} ${cx.toFixed(1)},${y1.toFixed(1)} ${x1.toFixed(1)},${y1.toFixed(1)}`;
    }
    return d;
  };
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => t * max);
  const every = Math.ceil(n / 8);
  const colW = n > 1 ? iw / (n - 1) : iw;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Évolution sur la période">
      <defs>
        {series.map((s, i) => (
          <linearGradient key={s.label} id={`area-${i}-${s.color.replace("#", "")}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor={s.color} stopOpacity={i === 0 ? 0.28 : 0.1} />
            <stop offset="1" stopColor={s.color} stopOpacity="0" />
          </linearGradient>
        ))}
      </defs>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={m.l} x2={W - m.r} y1={y(t)} y2={y(t)} stroke={GRID} strokeDasharray={t === 0 ? undefined : "3 4"} />
          <text x={m.l - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill={MUTED}>
            {nf(t)}
          </text>
        </g>
      ))}
      {series.map((s, i) => (
        <g key={s.label}>
          {i === 0 ? <path d={`${smooth(s.values)} L${x(n - 1)},${y(0)} L${x(0)},${y(0)}Z`} fill={`url(#area-${i}-${s.color.replace("#", "")})`} /> : null}
          <path d={smooth(s.values)} fill="none" stroke={s.color} strokeWidth={i === 0 ? 2.4 : 1.8} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={i === 0 ? undefined : "5 4"} />
        </g>
      ))}
      {days.map((day, i) => (
        <g key={day} className="group">
          <rect x={x(i) - colW / 2} y={m.t} width={colW} height={ih} fill="transparent" className="group-hover:fill-[rgba(16,16,16,0.05)]" />
          {series.map((s) => (
            <circle key={s.label} cx={x(i)} cy={y(s.values[i])} r="4" fill="#fff" stroke={s.color} strokeWidth="2" className="opacity-0 group-hover:opacity-100" />
          ))}
          <title>{`${weekday(day)} ${dayLabel(day)}\n${series.map((s) => `${s.label} : ${nf(s.values[i])}${unit}`).join("\n")}`}</title>
          {i % every === 0 || (i === n - 1 && (n - 1) % every >= Math.ceil(every / 2)) ? (
            <text x={x(i)} y={H - 8} textAnchor="middle" fontSize="11" fill={MUTED}>
              {dayLabel(day)}
            </text>
          ) : null}
        </g>
      ))}
    </svg>
  );
}

/** Colonnes (une valeur par jour), par exemple le chiffre d'affaires ou la dépense publicitaire. */
export function BarsChart({ days, values, color = "#2f9e6e", unit = "", height = 190 }: { days: string[]; values: number[]; color?: string; unit?: string; height?: number }) {
  const W = 760;
  const H = height;
  const m = { l: 40, r: 14, t: 12, b: 28 };
  const iw = W - m.l - m.r;
  const ih = H - m.t - m.b;
  const max = niceMax(Math.max(...values, 1));
  const n = days.length;
  const slot = iw / n;
  const bw = Math.max(2, Math.min(26, slot * 0.62));
  const every = Math.ceil(n / 8);
  const id = `bar-${color.replace("#", "")}`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Valeurs par jour">
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={color} />
          <stop offset="1" stopColor={color} stopOpacity="0.55" />
        </linearGradient>
      </defs>
      {[0, 0.5, 1].map((t) => (
        <g key={t}>
          <line x1={m.l} x2={W - m.r} y1={m.t + ih - t * ih} y2={m.t + ih - t * ih} stroke={GRID} strokeDasharray={t === 0 ? undefined : "3 4"} />
          <text x={m.l - 8} y={m.t + ih - t * ih + 4} textAnchor="end" fontSize="11" fill={MUTED}>
            {nf(t * max)}
          </text>
        </g>
      ))}
      {days.map((day, i) => {
        const h = (values[i] / max) * ih;
        const cx = m.l + slot * i + slot / 2;
        return (
          <g key={day} className="group">
            <rect x={m.l + slot * i} y={m.t} width={slot} height={ih} fill="transparent" className="group-hover:fill-[rgba(16,16,16,0.05)]" />
            {values[i] > 0 ? <rect x={cx - bw / 2} y={m.t + ih - h} width={bw} height={h} rx={Math.min(5, bw / 2)} fill={`url(#${id})`} /> : null}
            <title>{`${weekday(day)} ${dayLabel(day)} : ${nf(values[i], values[i] % 1 ? 2 : 0)}${unit}`}</title>
            {i % every === 0 || (i === n - 1 && (n - 1) % every >= Math.ceil(every / 2)) ? (
              <text x={cx} y={H - 8} textAnchor="middle" fontSize="11" fill={MUTED}>
                {dayLabel(day)}
              </text>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}

/** Liste de barres horizontales (pages, canaux, campagnes…). */
export function BarList({ rows, color = "#101010", format = (v: number) => nf(v), empty = "Pas encore de données." }: { rows: { label: string; value: number; sub?: ReactNode }[]; color?: string; format?: (v: number) => string; empty?: string }) {
  if (!rows.length) return <p className="py-6 text-center text-sm text-text-muted">{empty}</p>;
  const max = Math.max(...rows.map((r) => r.value), 1);
  const total = rows.reduce((t, r) => t + r.value, 0) || 1;
  return (
    <ul className="space-y-2.5">
      {rows.map((r) => (
        <li key={r.label} className="text-sm">
          <div className="flex items-baseline justify-between gap-3">
            <span className="min-w-0 truncate font-medium" title={r.label}>
              {r.label}
            </span>
            <span className="shrink-0 tabular-nums text-text-muted">
              <span className="font-semibold text-text">{format(r.value)}</span> · {nf((r.value / total) * 100, 0)} %
            </span>
          </div>
          <div className="mt-1 h-2 overflow-hidden rounded-full bg-[rgba(16,16,16,0.06)]">
            <div className="h-full rounded-full" style={{ width: `${Math.max(2, (r.value / max) * 100)}%`, background: `linear-gradient(90deg, ${color}, ${color}cc)` }} />
          </div>
          {r.sub ? <p className="mt-0.5 text-xs text-text-muted">{r.sub}</p> : null}
        </li>
      ))}
    </ul>
  );
}

export function Donut({ rows, center }: { rows: { label: string; value: number }[]; center?: string }) {
  const total = rows.reduce((t, r) => t + r.value, 0);
  if (!total) return <p className="py-6 text-center text-sm text-text-muted">Pas encore de données.</p>;
  const R = 52;
  const C = 2 * Math.PI * R;
  const starts = rows.map((_, i) => rows.slice(0, i).reduce((t, r) => t + (r.value / total) * C, 0));
  return (
    <div className="flex flex-wrap items-center gap-5">
      <svg viewBox="0 0 140 140" className="h-36 w-36 shrink-0 -rotate-90" role="img" aria-label="Répartition">
        <circle cx="70" cy="70" r={R} fill="none" stroke="rgba(16,16,16,0.06)" strokeWidth="18" />
        {rows.map((r, i) => {
          const len = Math.max(0, (r.value / total) * C - 2);
          return (
            <circle key={r.label} cx="70" cy="70" r={R} fill="none" stroke={PALETTE[(i + 1) % PALETTE.length]} strokeWidth="18" strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-starts[i]}>
              <title>{`${r.label} : ${nf(r.value)} (${nf((r.value / total) * 100, 0)} %)`}</title>
            </circle>
          );
        })}
        <g className="rotate-90" style={{ transformOrigin: "70px 70px" }}>
          <text x="70" y="68" textAnchor="middle" fontSize="20" fontWeight="600" fill="#101010">
            {nf(total)}
          </text>
          <text x="70" y="84" textAnchor="middle" fontSize="10" fill={MUTED}>
            {center ?? "visites"}
          </text>
        </g>
      </svg>
      <ul className="min-w-0 flex-1 space-y-1.5 text-sm">
        {rows.map((r, i) => (
          <li key={r.label} className="flex items-center justify-between gap-3">
            <span className="flex min-w-0 items-center gap-2">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: PALETTE[(i + 1) % PALETTE.length] }} />
              <span className="truncate">{r.label}</span>
            </span>
            <span className="tabular-nums text-text-muted">
              {nf(r.value)} · {nf((r.value / total) * 100, 0)} %
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const FUNNEL = [
  ["#101010", "#3a3a3a"],
  ["#3b6ef6", "#6f93ff"],
  ["#7c5cff", "#a48cff"],
  ["#2f9e6e", "#58c795"],
];
const DOW = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

/** Carte de chaleur jour de semaine × heure (heure de Zurich). */
export function Heatmap({ heat }: { heat: number[][] }) {
  const max = Math.max(...heat.flat(), 1);
  const cw = 28;
  const ch = 26;
  const ml = 34;
  const W = ml + 24 * cw;
  const H = 7 * ch + 22;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Visites par jour et par heure">
      {heat.map((row, d) =>
        row.map((v, h) => {
          const t = v / max;
          return (
            <rect key={`${d}-${h}`} x={ml + h * cw + 1.5} y={d * ch + 1.5} width={cw - 3} height={ch - 3} rx="5" fill={v ? `rgba(47,158,110,${(0.14 + t * 0.86).toFixed(2)})` : "rgba(16,16,16,0.045)"}>
              <title>{`${DOW[d]} ${h} h : ${nf(v)} visite${v > 1 ? "s" : ""}`}</title>
            </rect>
          );
        }),
      )}
      {DOW.map((label, d) => (
        <text key={label} x={ml - 8} y={d * ch + ch / 2 + 4} textAnchor="end" fontSize="11" fill={d >= 5 ? "#101010" : MUTED} fontWeight={d >= 5 ? 600 : 400}>
          {label}
        </text>
      ))}
      {[0, 3, 6, 9, 12, 15, 18, 21].map((h) => (
        <text key={h} x={ml + h * cw + cw / 2} y={H - 4} textAnchor="middle" fontSize="11" fill={MUTED}>
          {h} h
        </text>
      ))}
    </svg>
  );
}

/** Entonnoir : de la visite au paiement, avec le taux de passage d'une étape à l'autre. */
export function Funnel({ steps }: { steps: { label: string; value: number }[] }) {
  const max = Math.max(steps[0]?.value ?? 0, 1);
  return (
    <ol className="space-y-2">
      {steps.map((s, i) => {
        const prev = i ? steps[i - 1].value : 0;
        return (
          <li key={s.label}>
            <div className="flex items-baseline justify-between text-sm">
              <span className="font-medium">{s.label}</span>
              <span className="tabular-nums text-text-muted">
                <span className="font-semibold text-text">{nf(s.value)}</span>
                {i ? ` · ${prev ? nf((s.value / prev) * 100, 1) : "0"} % de l'étape précédente` : ""}
              </span>
            </div>
            <div className="mt-1 h-7 overflow-hidden rounded-lg bg-[rgba(16,16,16,0.05)]">
              <div className="flex h-full items-center rounded-lg px-2.5 text-xs font-semibold text-white" style={{ width: `${Math.max(3, (s.value / max) * 100)}%`, background: `linear-gradient(90deg, ${FUNNEL[Math.min(i, 3)][0]}, ${FUNNEL[Math.min(i, 3)][1]})` }}>
                {s.value && s.value / max > 0.08 ? `${nf((s.value / max) * 100, 1)} %` : ""}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
