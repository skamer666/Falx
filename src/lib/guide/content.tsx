// Mini-format de rédaction des articles du guide (sous-ensemble de Markdown) :
//   ## Titre {#ancre}     → h2 (ancre facultative ; « {#faq} » marque la FAQ)
//   ### Titre             → h3 (dans la FAQ : une question)
//   - élément / 1. élément → listes
//   > texte               → encadré « bon à savoir »
//   | a | b |             → tableau (1re ligne = en-têtes, ligne |---| ignorée)
//   :::summary Titre ... ::: → encadré « l'essentiel » (liste)
//   **gras**, [lien](/fr/...)
import Link from "next/link";
import type { ReactNode } from "react";

export type Block =
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; id: string; text: string }
  | { type: "p"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "note"; text: string }
  | { type: "summary"; title: string; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] };

export type ParsedArticle = {
  blocks: Block[];
  toc: { id: string; text: string }[];
  faq: { question: string; answer: string }[];
  wordCount: number;
};

export function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

/** Texte brut (sans balisage) : pour la FAQ structurée et le comptage de mots. */
export function plainText(value: string): string {
  return value.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

export function parseArticle(source: string): ParsedArticle {
  const lines = source.replace(/\r/g, "").split("\n");
  const blocks: Block[] = [];
  const usedIds = new Set<string>();
  const uniqueId = (base: string) => {
    let id = base || "section";
    let n = 2;
    while (usedIds.has(id)) id = `${base}-${n++}`;
    usedIds.add(id);
    return id;
  };

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      continue;
    }
    if (line.startsWith(":::summary")) {
      const title = line.slice(":::summary".length).trim();
      const items: string[] = [];
      i++;
      while (i < lines.length && lines[i].trim() !== ":::") {
        const item = lines[i].trim();
        if (item.startsWith("- ")) items.push(item.slice(2));
        i++;
      }
      i++;
      blocks.push({ type: "summary", title, items });
      continue;
    }
    const heading = /^(#{2,3})\s+(.*?)(?:\s+\{#([\w-]+)\})?\s*$/.exec(line);
    if (heading) {
      const text = heading[2];
      const id = uniqueId(heading[3] ?? slugify(text));
      blocks.push({ type: heading[1].length === 2 ? "h2" : "h3", id, text });
      i++;
      continue;
    }
    const chunk: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^#{2,3}\s/.test(lines[i]) && !lines[i].startsWith(":::")) {
      chunk.push(lines[i].trim());
      i++;
    }
    if (chunk.every((l) => l.startsWith("- "))) {
      blocks.push({ type: "ul", items: chunk.map((l) => l.slice(2)) });
    } else if (chunk.every((l) => /^\d+\.\s/.test(l))) {
      blocks.push({ type: "ol", items: chunk.map((l) => l.replace(/^\d+\.\s/, "")) });
    } else if (chunk[0].startsWith(">")) {
      blocks.push({ type: "note", text: chunk.map((l) => l.replace(/^>\s?/, "")).join(" ") });
    } else if (chunk[0].startsWith("|")) {
      const rows = chunk
        .filter((l) => !/^\|?\s*:?-{3,}/.test(l))
        .map((l) =>
          l
            .replace(/^\|/, "")
            .replace(/\|$/, "")
            .split("|")
            .map((cell) => cell.trim()),
        );
      blocks.push({ type: "table", head: rows[0] ?? [], rows: rows.slice(1) });
    } else {
      blocks.push({ type: "p", text: chunk.join(" ") });
    }
  }

  const toc = blocks.filter((b): b is Extract<Block, { type: "h2" }> => b.type === "h2").map(({ id, text }) => ({ id, text }));

  const faq: ParsedArticle["faq"] = [];
  const faqStart = blocks.findIndex((b) => b.type === "h2" && b.id === "faq");
  if (faqStart >= 0) {
    for (let k = faqStart + 1; k < blocks.length && blocks[k].type !== "h2"; k++) {
      const block = blocks[k];
      if (block.type === "h3") faq.push({ question: block.text, answer: "" });
      else if (faq.length && (block.type === "p" || block.type === "ul" || block.type === "ol")) {
        const text = block.type === "p" ? block.text : block.items.join(" ; ");
        const last = faq[faq.length - 1];
        last.answer = `${last.answer} ${plainText(text)}`.trim();
      }
    }
  }

  const allText = blocks
    .map((b): string => {
      switch (b.type) {
        case "ul":
        case "ol":
          return b.items.join(" ");
        case "summary":
          return `${b.title} ${b.items.join(" ")}`;
        case "table":
          return [...b.head, ...b.rows.flat()].join(" ");
        default:
          return b.text;
      }
    })
    .join(" ");
  const wordCount = plainText(allText).split(/\s+/).filter(Boolean).length;

  return { blocks, toc, faq, wordCount };
}

function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).filter(Boolean);
  return (
    <>
      {parts.map((part, index) => {
        const bold = /^\*\*([^*]+)\*\*$/.exec(part);
        if (bold) return <strong key={index}>{bold[1]}</strong>;
        const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
        if (link) {
          const [, label, href] = link;
          return href.startsWith("/") || href.startsWith("#") ? (
            <Link key={index} href={href}>
              {label}
            </Link>
          ) : (
            <a key={index} href={href} target="_blank" rel="noopener noreferrer">
              {label}
            </a>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}

export function ArticleBlocks({ blocks }: { blocks: Block[] }): ReactNode {
  return blocks.map((block, index) => {
    switch (block.type) {
      case "h2":
        return (
          <h2 key={index} id={block.id} className="scroll-mt-28">
            <Inline text={block.text} />
          </h2>
        );
      case "h3":
        return (
          <h3 key={index} id={block.id} className="scroll-mt-28">
            <Inline text={block.text} />
          </h3>
        );
      case "p":
        return (
          <p key={index}>
            <Inline text={block.text} />
          </p>
        );
      case "ul":
      case "ol": {
        const Tag = block.type;
        return (
          <Tag key={index}>
            {block.items.map((item, k) => (
              <li key={k}>
                <Inline text={item} />
              </li>
            ))}
          </Tag>
        );
      }
      case "note":
        return (
          <aside key={index} className="article-note">
            <p>
              <Inline text={block.text} />
            </p>
          </aside>
        );
      case "summary":
        return (
          <aside key={index} className="article-summary">
            <p className="article-summary-title">{block.title}</p>
            <ul>
              {block.items.map((item, k) => (
                <li key={k}>
                  <Inline text={item} />
                </li>
              ))}
            </ul>
          </aside>
        );
      case "table":
        return (
          <div key={index} className="article-table">
            <table>
              <thead>
                <tr>
                  {block.head.map((cell, k) => (
                    <th key={k} scope="col">
                      <Inline text={cell} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, r) => (
                  <tr key={r}>
                    {row.map((cell, k) => (
                      <td key={k}>
                        <Inline text={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
    }
  });
}
