// Client pour l'API Jev (TypeSafe AI, https://typesafe.ai) : un modèle
// "System One" qui répond à des questions structurées (probabilité oui/non,
// score sur une échelle, choix parmi des catégories) plutôt que de générer
// du texte. Utilisé ici uniquement pour DÉTECTER si un motif juridique déjà
// rédigé et sourcé par nos soins (voir certificateJevAnalysis.ts) s'applique
// à un texte donné : Jev ne rédige jamais lui-même de texte juridique.
//
// AVERTISSEMENT : le nom exact du header d'authentification et le schéma
// JSON exact n'ont pas pu être confirmés auprès de la documentation
// officielle (docs.typesafe.ai n'expose pas le détail via récupération
// automatisée, et l'installation du skill Claude Code officiel a été
// bloquée par le classificateur de sécurité). Le format ci-dessous est une
// reconstruction à partir de guides tiers et doit être vérifié au premier
// appel réel contre une clé API valide, puis ajusté si nécessaire.

const JEV_ENDPOINT = "https://api.typesafe.ai/v1/systemone";

export type JevNoulQuestion = {
  type: "noul";
  instructions: string;
};

export type JevChoiceQuestion = {
  type: "choice";
  instructions: string;
  criteria: Record<string, string>;
};

export type JevScoreQuestion = {
  type: "score";
  instructions: string;
  criteria: string[];
};

export type JevQuestion = JevNoulQuestion | JevChoiceQuestion | JevScoreQuestion;

export type JevNoulAnswer = { noul: number };
export type JevChoiceAnswer = {
  choice: string;
  probabilities: Record<string, number>;
  confidence: number;
};
export type JevScoreAnswer = {
  score: number;
  probabilities: number[];
  confidence: number;
};

export type JevAnswer = JevNoulAnswer | JevChoiceAnswer | JevScoreAnswer;

export class JevConfigError extends Error {}
export class JevApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export async function callJev<TKeys extends string>(
  state: Record<string, unknown>,
  questions: Record<TKeys, JevQuestion>,
): Promise<Record<TKeys, JevAnswer>> {
  const apiKey = process.env.TYPESAFE_API_KEY;
  if (!apiKey) {
    throw new JevConfigError(
      "TYPESAFE_API_KEY absente. Ajoutez-la dans .env.local (jamais commitée).",
    );
  }

  const body = {
    state,
    questions: Object.fromEntries(
      Object.entries<JevQuestion>(questions).map(([key, q]) => {
        if (q.type === "noul") {
          return [key, { instructions: q.instructions }];
        }
        return [key, { instructions: q.instructions, criteria: q.criteria }];
      }),
    ),
  };

  const response = await fetch(JEV_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Hypothèse à vérifier : header Authorization Bearer. Si l'API
      // attend un autre header (ex. X-API-Key), ajuster ici uniquement.
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new JevApiError(
      response.status,
      `Jev API a répondu ${response.status} : ${text || response.statusText}`,
    );
  }

  const data = (await response.json()) as { answers: Record<TKeys, JevAnswer> };
  return data.answers;
}

export function isNoulAnswer(answer: JevAnswer): answer is JevNoulAnswer {
  return typeof (answer as JevNoulAnswer).noul === "number";
}

export function isScoreAnswer(answer: JevAnswer): answer is JevScoreAnswer {
  return typeof (answer as JevScoreAnswer).score === "number";
}

export function isChoiceAnswer(answer: JevAnswer): answer is JevChoiceAnswer {
  return typeof (answer as JevChoiceAnswer).choice === "string";
}
