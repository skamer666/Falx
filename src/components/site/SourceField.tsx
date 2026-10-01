"use client";

import { useEffect, useRef } from "react";
import { readStoredSource } from "./SourceTracker";

/** Champ caché qui joint la provenance de la visite au formulaire envoyé. */
export default function SourceField() {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.value = readStoredSource() ?? "";
  }, []);
  return <input ref={ref} type="hidden" name="source" defaultValue="" />;
}
