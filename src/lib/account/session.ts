import { cookies } from "next/headers";
import { accessState, type AccessState } from "./model";
import { getSessionUser, type AccountUser } from "./db";

const COOKIE_NAME = "thrax_session";

export async function setSessionCookie(sessionId: string, expiresAt: number) {
  const jar = await cookies();
  jar.set(COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    expires: new Date(expiresAt),
  });
}

export async function clearSessionCookie() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

export async function getSessionCookieValue(): Promise<string | null> {
  const jar = await cookies();
  return jar.get(COOKIE_NAME)?.value ?? null;
}

/** Utilisateur de la session, sans vérifier le paiement. */
export async function getSessionUserRaw(): Promise<AccountUser | null> {
  const sessionId = await getSessionCookieValue();
  if (!sessionId) return null;
  return getSessionUser(sessionId);
}

export type ClientGate =
  | { kind: "anonymous" }
  | { kind: "blocked"; user: AccountUser; state: Exclude<AccessState, "ok"> }
  | { kind: "ok"; user: AccountUser };

/** État d'accès vérifié à CHAQUE requête : un paiement expiré ou une pause coupent l'accès immédiatement. */
export async function getClientGate(): Promise<ClientGate> {
  const user = await getSessionUserRaw();
  if (!user) return { kind: "anonymous" };
  const state = accessState(user);
  if (state === "ok") return { kind: "ok", user };
  return { kind: "blocked", user, state };
}

/** Client payé (ou administrateur) connecté, sinon null. */
export async function getCurrentUser(): Promise<AccountUser | null> {
  const gate = await getClientGate();
  return gate.kind === "ok" ? gate.user : null;
}

export async function getCurrentAdmin(): Promise<AccountUser | null> {
  const user = await getSessionUserRaw();
  return user?.is_admin ? user : null;
}
