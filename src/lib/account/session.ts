import { cookies } from "next/headers";
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

export async function getCurrentUser(): Promise<AccountUser | null> {
  const jar = await cookies();
  const sessionId = jar.get(COOKIE_NAME)?.value;
  if (!sessionId) return null;
  return getSessionUser(sessionId);
}

export async function getSessionCookieValue(): Promise<string | null> {
  const jar = await cookies();
  return jar.get(COOKIE_NAME)?.value ?? null;
}
