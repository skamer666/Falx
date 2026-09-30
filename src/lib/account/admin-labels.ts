import type { AccessState, DossierKind, DossierStatus, Plan } from "./model";

export const ACCESS_LABEL: Record<AccessState, string> = {
  ok: "Actif",
  pending: "À activer",
  expired: "Expiré",
  paused: "En pause",
  cancelled: "Résilié",
};

export const DOSSIER_STATUS_LABEL: Record<DossierStatus, string> = {
  nouveau: "Nouveau",
  en_cours: "En cours",
  attente_client: "Attente client",
  traite: "Traité",
};

export const KIND_LABEL: Record<DossierKind, string> = { question: "Question rapide", dossier: "Dossier" };
export const PLAN_LABEL_FR: Record<Plan, string> = { essentiel: "Essentiel", croissance: "Croissance" };

export const METHOD_LABEL: Record<string, string> = {
  virement: "Virement",
  twint: "TWINT",
  carte: "Carte",
  especes: "Espèces",
  autre: "Autre",
};

export const AUDIT_LABEL: Record<string, string> = {
  login: "Connexion admin",
  signup: "Nouvelle inscription",
  admin_bootstrap: "Compte admin créé",
  password_set: "Mot de passe défini",
  payment_recorded: "Paiement enregistré",
  payment_deleted: "Paiement supprimé",
  status_changed: "Statut du compte modifié",
  plan_changed: "Formule modifiée",
  period_extended: "Période prolongée",
  client_updated: "Fiche client modifiée",
  client_created: "Client créé",
  password_link_sent: "Lien de mot de passe envoyé",
  sessions_revoked: "Sessions révoquées",
  dossier_reply: "Réponse envoyée",
  dossier_note: "Note interne",
  dossier_status: "Statut de la demande modifié",
  dossier_updated: "Demande modifiée",
  quota_adjusted: "Quota ajusté",
  lead_status: "Statut du prospect modifié",
  lead_invite_sent: "Lien d’inscription envoyé au prospect",
  lead_note: "Note sur un prospect",
  lead_deleted: "Prospect supprimé",
  quota_adjustment_deleted: "Ajustement de quota supprimé",
};
