import type { Locale } from "@/i18n/config";

/** Délais légaux réels, à rappeler en haut de la fiche (pas d'urgence inventée : seulement les prestations dont la loi fixe un délai court). */
export const DEADLINE_LABEL: Record<Locale, string> = {
  fr: "Délai à ne pas manquer",
  de: "Frist nicht verpassen",
  en: "Don't miss the deadline",
  it: "Attenzione al termine",
};

export const DEADLINE_NOTE: Record<Locale, string> = {
  fr: "Le délai court dès la réception du courrier. Vérifiez la date sur votre enveloppe ou votre suivi postal.",
  de: "Die Frist läuft ab Erhalt des Schreibens. Prüfen Sie das Datum auf dem Umschlag oder der Sendungsverfolgung.",
  en: "The deadline runs from the day you receive the letter. Check the date on your envelope or postal tracking.",
  it: "Il termine decorre dal ricevimento della lettera. Verificate la data sulla busta o sul tracciamento postale.",
};

export const SERVICE_DEADLINES: Record<string, Record<Locale, string>> = {
  "poursuite-injustifiee": {
    fr: "L'opposition doit être faite dans les 10 jours qui suivent la réception du commandement de payer (art. 74 LP). Passé ce délai, la poursuite peut continuer.",
    de: "Der Rechtsvorschlag muss innert 10 Tagen nach Erhalt des Zahlungsbefehls erhoben werden (Art. 74 SchKG). Danach kann die Betreibung weitergehen.",
    en: "You must object within 10 days of receiving the payment order (art. 74 DEBA). After that, the enforcement can proceed.",
    it: "L'opposizione va presentata entro 10 giorni dalla notifica del precetto esecutivo (art. 74 LEF). Dopo, l'esecuzione può proseguire.",
  },
  "licenciement-opposition": {
    fr: "L'opposition écrite doit être faite avant la fin du délai de congé (art. 336b CO). Une action pour l'indemnité doit ensuite être ouverte dans les 180 jours après la fin du contrat.",
    de: "Die schriftliche Einsprache muss vor Ablauf der Kündigungsfrist erfolgen (Art. 336b OR). Eine Klage auf Entschädigung muss danach innert 180 Tagen nach Ende des Arbeitsverhältnisses erhoben werden.",
    en: "The written objection must be made before the notice period ends (art. 336b CO). A court claim for compensation must then be filed within 180 days after the contract ends.",
    it: "L'opposizione scritta va fatta prima della fine del termine di disdetta (art. 336b CO). L'azione per l'indennità va poi promossa entro 180 giorni dalla fine del rapporto di lavoro.",
  },
  "contestation-conge": {
    fr: "Le congé se conteste dans les 30 jours après sa réception, devant l'autorité de conciliation (art. 273 CO).",
    de: "Die Kündigung muss innert 30 Tagen nach Erhalt bei der Schlichtungsbehörde angefochten werden (Art. 273 OR).",
    en: "A termination must be contested within 30 days of receiving it, before the conciliation authority (art. 273 CO).",
    it: "La disdetta va contestata entro 30 giorni dal ricevimento, davanti all'autorità di conciliazione (art. 273 CO).",
  },
  "contestation-loyer-initial": {
    fr: "Le loyer initial se conteste dans les 30 jours après la remise de l'appartement (art. 270 CO).",
    de: "Der Anfangsmietzins kann innert 30 Tagen nach Übernahme der Wohnung angefochten werden (Art. 270 OR).",
    en: "The initial rent can be contested within 30 days of taking possession of the flat (art. 270 CO).",
    it: "Il canone iniziale può essere contestato entro 30 giorni dalla consegna dell'appartamento (art. 270 CO).",
  },
};
