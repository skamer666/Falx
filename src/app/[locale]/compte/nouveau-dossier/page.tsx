import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import SignInPrompt from "@/components/site/SignInPrompt";
import { Container, PrimaryButton } from "@/components/site/ui";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/i18n/config";
import { getCurrentUser } from "@/lib/account/session";
import { DOSSIER_CATEGORIES, CATEGORY_LABELS } from "@/lib/account/categories";
import { submitDossier } from "../actions";

const STRINGS: Record<
  Locale,
  {
    metaTitle: string;
    back: string;
    heading: string;
    subheading: string;
    categoryLabel: string;
    urgencyLabel: string;
    urgencyNormal: string;
    urgencyUrgent: string;
    descriptionLabel: string;
    descriptionPlaceholder: string;
    attachmentsLabel: string;
    attachmentsNote: string;
    cta: string;
    error: string;
  }
> = {
  fr: {
    metaTitle: "Nouveau dossier | Thrax Legal",
    back: "Retour au tableau de bord",
    heading: "Décrivez votre dossier",
    subheading: "Plus vous êtes précis, plus la réponse sera rapide et pertinente. Prenez le temps d'expliquer votre situation.",
    categoryLabel: "Type de dossier",
    urgencyLabel: "Urgence",
    urgencyNormal: "Normal",
    urgencyUrgent: "Urgent (formule Croissance, traité sous 24h)",
    descriptionLabel: "Décrivez votre situation",
    descriptionPlaceholder:
      "Expliquez ce qui se passe, ce que vous avez déjà fait, ce que vous attendez de nous. N'hésitez pas à être détaillé : contexte, dates, montants, personnes concernées...",
    attachmentsLabel: "Documents (optionnel)",
    attachmentsNote: "Contrats, courriers, échanges d'emails — jusqu'à 5 fichiers.",
    cta: "Envoyer mon dossier",
    error: "Choisissez un type de dossier et décrivez votre situation (10 caractères minimum).",
  },
  de: {
    metaTitle: "Neues Anliegen | Thrax Legal",
    back: "Zurück zur Übersicht",
    heading: "Beschreiben Sie Ihr Anliegen",
    subheading: "Je genauer Sie sind, desto schneller und passender die Antwort. Nehmen Sie sich Zeit, Ihre Situation zu erklären.",
    categoryLabel: "Art des Anliegens",
    urgencyLabel: "Dringlichkeit",
    urgencyNormal: "Normal",
    urgencyUrgent: "Dringend (Formel Croissance, bearbeitet innert 24h)",
    descriptionLabel: "Beschreiben Sie Ihre Situation",
    descriptionPlaceholder:
      "Erklären Sie, was passiert, was Sie bereits unternommen haben, was Sie von uns erwarten. Seien Sie ruhig ausführlich: Kontext, Daten, Beträge, beteiligte Personen ...",
    attachmentsLabel: "Dokumente (optional)",
    attachmentsNote: "Verträge, Schreiben, E-Mail-Verläufe — bis zu 5 Dateien.",
    cta: "Anliegen senden",
    error: "Wählen Sie eine Art des Anliegens und beschreiben Sie Ihre Situation (mind. 10 Zeichen).",
  },
  en: {
    metaTitle: "New matter | Thrax Legal",
    back: "Back to dashboard",
    heading: "Describe your matter",
    subheading: "The more precise you are, the faster and more relevant the response. Take the time to explain your situation.",
    categoryLabel: "Type of matter",
    urgencyLabel: "Urgency",
    urgencyNormal: "Normal",
    urgencyUrgent: "Urgent (Growth plan, handled within 24h)",
    descriptionLabel: "Describe your situation",
    descriptionPlaceholder:
      "Explain what's going on, what you've already done, what you expect from us. Feel free to be detailed: context, dates, amounts, people involved...",
    attachmentsLabel: "Documents (optional)",
    attachmentsNote: "Contracts, letters, email threads — up to 5 files.",
    cta: "Send my matter",
    error: "Choose a matter type and describe your situation (10 characters minimum).",
  },
  it: {
    metaTitle: "Nuova pratica | Thrax Legal",
    back: "Torna alla bacheca",
    heading: "Descrivete la vostra pratica",
    subheading: "Più siete precisi, più la risposta sarà rapida e pertinente. Prendetevi il tempo di spiegare la vostra situazione.",
    categoryLabel: "Tipo di pratica",
    urgencyLabel: "Urgenza",
    urgencyNormal: "Normale",
    urgencyUrgent: "Urgente (formula Croissance, gestita entro 24h)",
    descriptionLabel: "Descrivete la vostra situazione",
    descriptionPlaceholder:
      "Spiegate cosa sta succedendo, cosa avete già fatto, cosa vi aspettate da noi. Siate pure dettagliati: contesto, date, importi, persone coinvolte...",
    attachmentsLabel: "Documenti (opzionale)",
    attachmentsNote: "Contratti, lettere, scambi email — fino a 5 file.",
    cta: "Invia la mia pratica",
    error: "Scegliete un tipo di pratica e descrivete la vostra situazione (minimo 10 caratteri).",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return { title: STRINGS[locale].metaTitle };
}

export default async function NouveauDossierPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const { error } = await searchParams;
  const t = STRINGS[locale];

  const user = await getCurrentUser();
  if (!user) return <SignInPrompt locale={locale} />;

  const isCroissance = user.plan === "croissance";

  return (
    <>
      <Nav />
      <main className="bg-bg text-text">
        <section className="theme-light border-b border-border bg-bg pb-16 pt-32 md:pt-40">
          <Container className="mx-auto max-w-xl">
            <Reveal>
              <Link
                href={`/${locale}/compte/tableau-de-bord`}
                className="text-xs font-medium text-text-muted hover:text-text"
              >
                ← {t.back}
              </Link>
              <h1 className="mt-4 text-[2rem] font-semibold leading-[1.15] tracking-[-0.02em] text-text">
                {t.heading}
              </h1>
              <p className="mt-3 text-base leading-relaxed text-text-muted">{t.subheading}</p>

              {error ? (
                <p className="mt-5 rounded-xl border border-danger/30 bg-danger-soft px-4 py-3 text-sm text-danger">
                  {t.error}
                </p>
              ) : null}

              <form
                action={submitDossier.bind(null, locale)}
                encType="multipart/form-data"
                className="mt-8 flex flex-col gap-5"
              >
                <div>
                  <label htmlFor="category" className="text-xs font-medium uppercase tracking-[0.1em] text-text-muted">
                    {t.categoryLabel}
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    defaultValue=""
                    className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-base text-text focus:border-text focus:outline-none"
                  >
                    <option value="" disabled>
                      —
                    </option>
                    {DOSSIER_CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {CATEGORY_LABELS[locale][category]}
                      </option>
                    ))}
                  </select>
                </div>

                <fieldset>
                  <legend className="text-xs font-medium uppercase tracking-[0.1em] text-text-muted">
                    {t.urgencyLabel}
                  </legend>
                  <div className="mt-3 flex flex-col gap-2">
                    <label className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 has-checked:border-text">
                      <input type="radio" name="urgency" value="normal" defaultChecked className="h-4 w-4 accent-text" />
                      <span className="text-sm text-text">{t.urgencyNormal}</span>
                    </label>
                    <label
                      className={`flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 has-checked:border-text ${
                        isCroissance ? "" : "opacity-40"
                      }`}
                    >
                      <input
                        type="radio"
                        name="urgency"
                        value="urgent"
                        disabled={!isCroissance}
                        className="h-4 w-4 accent-text"
                      />
                      <span className="text-sm text-text">{t.urgencyUrgent}</span>
                    </label>
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="description" className="text-xs font-medium uppercase tracking-[0.1em] text-text-muted">
                    {t.descriptionLabel}
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    minLength={10}
                    rows={8}
                    placeholder={t.descriptionPlaceholder}
                    className="mt-2 w-full resize-y rounded-xl border border-border bg-surface px-4 py-3 text-base leading-relaxed text-text placeholder:text-text-muted/60 focus:border-text focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="attachments" className="text-xs font-medium uppercase tracking-[0.1em] text-text-muted">
                    {t.attachmentsLabel}
                  </label>
                  <input
                    id="attachments"
                    name="attachments"
                    type="file"
                    multiple
                    className="mt-2 w-full rounded-xl border border-dashed border-border bg-surface px-4 py-3 text-sm text-text-muted file:mr-4 file:rounded-full file:border-0 file:bg-text file:px-4 file:py-2 file:text-xs file:font-medium file:text-bg"
                  />
                  <p className="mt-2 text-xs text-text-muted">{t.attachmentsNote}</p>
                </div>

                <PrimaryButton type="submit" className="mt-2 w-full px-6 py-3">
                  {t.cta}
                </PrimaryButton>
              </form>
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
