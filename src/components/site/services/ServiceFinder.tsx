"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type FinderItem = {
  slug: string;
  href: string;
  name: string;
  short: string;
  price: string;
  category: string;
  popular: boolean;
  /** Texte complet indexé pour la recherche (intro, inclus, catégorie). */
  search: string;
};

export type FinderCategory = { id: string; name: string; count: number };

type Props = {
  items: FinderItem[];
  categories: FinderCategory[];
  strings: {
    searchLabel: string;
    searchPlaceholder: string;
    popular: string;
    all: string;
    noResult: string;
    noResultCta: string;
  };
  callbackHref: string;
};

/** Supprime accents et majuscules pour une recherche tolérante (« prud'hommes » = « prudhommes »). */
function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9 ]/gi, " ")
    .toLowerCase();
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 shrink-0" aria-hidden>
      <path d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Catalogue filtrable : une barre de recherche, une rangée de catégories (boutons) et une liste compacte.
 * Tout est déjà dans le HTML (rendu serveur) : le filtrage se fait sans aller-retour réseau.
 */
export default function ServiceFinder({ items, categories, strings, callbackHref }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("popular");

  const index = useMemo(() => items.map((item) => ({ item, text: normalize(`${item.name} ${item.short} ${item.search}`) })), [items]);

  const visible = useMemo(() => {
    const words = normalize(query).split(/\s+/).filter(Boolean);
    if (words.length) return index.filter(({ text }) => words.every((w) => text.includes(w))).map(({ item }) => item);
    if (category === "popular") return items.filter((item) => item.popular);
    if (category === "all") return items;
    return items.filter((item) => item.category === category);
  }, [index, items, query, category]);

  const tabs = [
    { id: "popular", name: strings.popular, count: items.filter((i) => i.popular).length },
    ...categories,
    { id: "all", name: strings.all, count: items.length },
  ];

  return (
    <div>
      <label htmlFor="service-search" className="sr-only">
        {strings.searchLabel}
      </label>
      <div className="relative">
        <svg viewBox="0 0 24 24" fill="none" className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" aria-hidden>
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
          <path d="M20 20L16 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <input
          id="service-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={strings.searchPlaceholder}
          autoComplete="off"
          className="h-16 w-full rounded-2xl border border-border bg-surface pl-14 pr-5 text-lg text-text shadow-[0_8px_30px_-18px_rgba(0,0,0,0.35)] outline-none transition-colors placeholder:text-text-muted/80 focus:border-text"
        />
      </div>

      <div role="tablist" aria-label={strings.searchLabel} className="mt-5 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] md:flex-wrap md:overflow-visible">
        {tabs.map((tab) => {
          const active = !query && category === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => {
                setQuery("");
                setCategory(tab.id);
              }}
              className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors ${
                active ? "border-text bg-text text-bg" : "border-border bg-bg text-text hover:border-text/50"
              }`}
            >
              {tab.name}
              <span className={active ? "text-bg/70" : "text-text-muted"}>{tab.count}</span>
            </button>
          );
        })}
      </div>

      {visible.length ? (
        <ul className="mt-6 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
          {visible.map((item) => (
            <li key={item.slug}>
              <Link
                href={item.href}
                className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-surface-hover md:px-6 md:py-5"
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-base font-semibold leading-snug text-text md:text-[17px]">{item.name}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-text-muted">{item.short}</span>
                </span>
                <span className="shrink-0 text-right">
                  <span className="block whitespace-nowrap text-base font-semibold text-text">{item.price}</span>
                </span>
                <span className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-text transition-colors group-hover:border-text group-hover:bg-text group-hover:text-bg sm:flex">
                  <ArrowIcon />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 rounded-2xl border border-border bg-surface px-6 py-8 text-center">
          <p className="mx-auto max-w-md text-sm leading-relaxed text-text-muted">{strings.noResult}</p>
          <Link href={callbackHref} className="mt-4 inline-flex min-h-11 items-center rounded-full bg-text px-6 text-sm font-semibold text-bg">
            {strings.noResultCta}
          </Link>
        </div>
      )}
    </div>
  );
}
