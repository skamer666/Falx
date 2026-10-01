import type { Locale } from "@/i18n/config";
import cgvFr from "./cgv-suisses-guide/fr";
import cgvDe from "./cgv-suisses-guide/de";
import cgvEn from "./cgv-suisses-guide/en";
import cgvIt from "./cgv-suisses-guide/it";
import travailFr from "./contrat-de-travail-suisse-pme/fr";
import travailDe from "./contrat-de-travail-suisse-pme/de";
import travailEn from "./contrat-de-travail-suisse-pme/en";
import travailIt from "./contrat-de-travail-suisse-pme/it";
import demeureFr from "./mise-en-demeure-recouvrement-suisse/fr";
import demeureDe from "./mise-en-demeure-recouvrement-suisse/de";
import demeureEn from "./mise-en-demeure-recouvrement-suisse/en";
import demeureIt from "./mise-en-demeure-recouvrement-suisse/it";
import nlpdFr from "./conformite-nlpd-pme/fr";
import nlpdDe from "./conformite-nlpd-pme/de";
import nlpdEn from "./conformite-nlpd-pme/en";
import nlpdIt from "./conformite-nlpd-pme/it";
import bailFr from "./bail-commercial-suisse-guide/fr";
import bailDe from "./bail-commercial-suisse-guide/de";
import bailEn from "./bail-commercial-suisse-guide/en";
import bailIt from "./bail-commercial-suisse-guide/it";

/** Texte des articles du guide (format décrit dans src/lib/guide/content.tsx). */
export const GUIDE_CONTENT: Record<string, Record<Locale, string>> = {
  "cgv-suisses-guide": { fr: cgvFr, de: cgvDe, en: cgvEn, it: cgvIt },
  "contrat-de-travail-suisse-pme": { fr: travailFr, de: travailDe, en: travailEn, it: travailIt },
  "mise-en-demeure-recouvrement-suisse": { fr: demeureFr, de: demeureDe, en: demeureEn, it: demeureIt },
  "conformite-nlpd-pme": { fr: nlpdFr, de: nlpdDe, en: nlpdEn, it: nlpdIt },
  "bail-commercial-suisse-guide": { fr: bailFr, de: bailDe, en: bailEn, it: bailIt },
};
