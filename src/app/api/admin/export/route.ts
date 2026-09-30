import { NextRequest } from "next/server";
import { listAdminDossiers, listClients, listPayments } from "@/lib/account/admin-db";
import { ACCESS_LABEL, DOSSIER_STATUS_LABEL, KIND_LABEL, METHOD_LABEL, PLAN_LABEL_FR } from "@/lib/account/admin-labels";
import { addMonths } from "@/lib/account/model";
import { getCurrentAdmin } from "@/lib/account/session";

export const dynamic = "force-dynamic";

/** Échappe une cellule CSV et neutralise les formules (=, +, -, @) pour Excel. */
function cell(value: unknown): string {
  let text = value === null || value === undefined ? "" : String(value);
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return /[";\n\r,]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function csv(rows: unknown[][]): string {
  // Séparateur « ; » et BOM UTF-8 : s'ouvre directement dans Excel en français.
  return "﻿" + rows.map((row) => row.map((value) => cell(value)).join(";")).join("\r\n");
}

const iso = (ts: number | null) => (ts ? new Date(ts).toISOString().slice(0, 10) : "");

export async function GET(request: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return new Response("Unauthorized", { status: 401 });

  const params = new URL(request.url).searchParams;
  const type = params.get("type");
  let rows: unknown[][];
  let name: string;

  if (type === "clients") {
    const clients = await listClients();
    rows = [
      ["Nom", "Entreprise", "Email", "Téléphone", "Formule", "Statut", "Valable jusqu'au", "Inscrit le", "Dernière connexion", "Total encaissé (CHF)", "Notes"],
      ...clients.map((c) => [
        c.name,
        c.company,
        c.email,
        c.phone,
        PLAN_LABEL_FR[c.plan],
        ACCESS_LABEL[c.access],
        iso(c.paid_until),
        iso(c.created_at),
        iso(c.last_login_at),
        (c.total_paid_rappen / 100).toFixed(2),
        c.notes,
      ]),
    ];
    name = "clients";
  } else if (type === "payments") {
    const mois = params.get("mois");
    let from: number | undefined;
    let to: number | undefined;
    if (mois && /^\d{4}-\d{2}$/.test(mois)) {
      from = Date.parse(`${mois}-01T00:00:00Z`);
      to = Number.isFinite(from) ? addMonths(from, 1) : undefined;
    }
    const payments = await listPayments({ from, to });
    rows = [
      ["Date", "Client", "Entreprise", "Email", "Formule", "Période du", "Période au", "Mode", "Référence", "Montant (CHF)", "Note"],
      ...payments.map((p) => [
        iso(p.created_at),
        p.client_name,
        p.client_company,
        p.client_email,
        PLAN_LABEL_FR[p.plan],
        iso(p.period_start),
        iso(p.period_end),
        METHOD_LABEL[p.method] ?? p.method,
        p.reference,
        (p.amount_rappen / 100).toFixed(2),
        p.note,
      ]),
    ];
    name = "paiements";
  } else if (type === "dossiers") {
    const dossiers = await listAdminDossiers({}, 5000);
    rows = [
      ["Reçue le", "Client", "Email", "Formule", "Type", "Compte pour", "Thème", "Urgence", "Statut", "Échéance", "Clôturée le"],
      ...dossiers.map((d) => [
        iso(d.created_at),
        d.client_name,
        d.client_email,
        PLAN_LABEL_FR[d.client_plan],
        KIND_LABEL[d.kind],
        d.units,
        d.category,
        d.urgency,
        DOSSIER_STATUS_LABEL[d.status],
        iso(d.due_at),
        iso(d.closed_at),
      ]),
    ];
    name = "demandes";
  } else {
    return new Response("Bad request", { status: 400 });
  }

  return new Response(csv(rows), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="thrax-${name}-${iso(Date.now())}.csv"`,
      "Cache-Control": "private, no-store",
    },
  });
}
