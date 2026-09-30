import { MAX_FILES, MAX_FILE_BYTES, sanitizeFilename, type Attachment } from "./model";
import { putAttachment } from "./db";

export type UploadResult = { ok: true; attachments: Attachment[] } | { ok: false; reason: "too_big" };

/**
 * Stocke les fichiers d'un champ de formulaire dans R2, sous `dossiers/<clientId>/…`.
 * Le préfixe par client permet de contrôler l'accès au téléchargement (route /api/files).
 */
export async function storeUploads(formData: FormData, field: string, clientId: string, sub = ""): Promise<UploadResult> {
  const files = formData.getAll(field).filter((f): f is File => f instanceof File && f.size > 0);
  if (files.some((file) => file.size > MAX_FILE_BYTES)) return { ok: false, reason: "too_big" };

  const attachments: Attachment[] = [];
  for (const file of files.slice(0, MAX_FILES)) {
    const name = sanitizeFilename(file.name);
    const key = `dossiers/${clientId}/${sub ? `${sub}/` : ""}${crypto.randomUUID()}-${name}`;
    await putAttachment(key, await file.arrayBuffer(), file.type || "application/octet-stream");
    attachments.push({ key, name, size: file.size });
  }
  return { ok: true, attachments };
}
