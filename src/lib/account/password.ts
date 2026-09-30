// Hachage de mot de passe via Web Crypto (PBKDF2-SHA256).
// Cloudflare Workers plafonne PBKDF2 à 100 000 itérations ; le nombre est
// stocké dans le hash, ce qui permet de le faire évoluer plus tard.

const ITERATIONS = 100_000;
const SALT_BYTES = 16;
const HASH_BYTES = 32;

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 200;

function toBase64(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function fromBase64(value: string): Uint8Array<ArrayBuffer> {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function derive(password: string, salt: Uint8Array<ArrayBuffer>, iterations: number): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, [
    "deriveBits",
  ]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt, iterations }, key, HASH_BYTES * 8);
  return new Uint8Array(bits);
}

function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_BYTES));
  const hash = await derive(password, salt, ITERATIONS);
  return `pbkdf2-sha256$${ITERATIONS}$${toBase64(salt)}$${toBase64(hash)}`;
}

export async function verifyPassword(password: string, stored: string | null): Promise<boolean> {
  // Sans hash (compte inexistant ou sans mot de passe), on dépense quand même le
  // même temps de calcul pour ne pas révéler l'existence du compte.
  if (!stored) {
    await derive(password, new Uint8Array(SALT_BYTES), ITERATIONS);
    return false;
  }
  const [scheme, iterations, salt, hash] = stored.split("$");
  if (scheme !== "pbkdf2-sha256" || !iterations || !salt || !hash) return false;
  const computed = await derive(password, fromBase64(salt), Number(iterations));
  return constantTimeEqual(computed, fromBase64(hash));
}

export type PasswordProblem = "short" | "long" | "same_as_email" | "common";

const COMMON = new Set([
  "password1234",
  "1234567890",
  "0123456789",
  "azertyuiop",
  "qwertyuiop",
  "motdepasse",
  "motdepasse1",
  "thraxlegal",
  "changeme123",
  "password",
  "password1",
  "12345678",
  "123456789",
  "qwertyui",
  "azertyui",
  "azerty123",
  "qwerty123",
  "motdepasse",
  "iloveyou",
  "11111111",
  "00000000",
  "abcd1234",
]);

export function checkPasswordStrength(password: string, email: string): PasswordProblem | null {
  if (password.length < PASSWORD_MIN_LENGTH) return "short";
  if (password.length > PASSWORD_MAX_LENGTH) return "long";
  const lower = password.toLowerCase();
  if (lower === email.trim().toLowerCase()) return "same_as_email";
  if (COMMON.has(lower) || /^(.)\1+$/.test(password)) return "common";
  return null;
}

/** 32 octets aléatoires en hexadécimal (jeton de réinitialisation). */
export function randomToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

export async function sha256Hex(value: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}
