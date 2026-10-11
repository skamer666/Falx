"use client";

import { useState, type FormEvent } from "react";

/**
 * Vérification d'un formulaire dans le navigateur avant l'envoi : erreurs par champ, focus et défilement
 * sur le premier champ fautif, mise à jour pendant la saisie après une première tentative.
 */
export function useInlineValidation<F extends string>(
  order: readonly F[],
  validate: (data: FormData) => Partial<Record<F, true>>,
) {
  const [errors, setErrors] = useState<Partial<Record<F, true>> | null>(null);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    const found = validate(new FormData(event.currentTarget));
    setErrors(found);
    const first = order.find((name) => found[name]);
    if (!first) return;
    event.preventDefault();
    const input = event.currentTarget.elements.namedItem(first);
    if (input instanceof HTMLElement) {
      input.focus();
      input.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }

  function onChange(event: FormEvent<HTMLFormElement>) {
    if (errors) setErrors(validate(new FormData(event.currentTarget)));
  }

  const current: Partial<Record<F, true>> = errors ?? {};
  return {
    errors: current,
    hasErrors: Object.keys(current).length > 0,
    onSubmit,
    onChange,
  };
}
