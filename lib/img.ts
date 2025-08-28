// lib/img.ts
export function isExternalImage(src?: string | null) {
  if (!src) return false;
  try {
    const u = new URL(src, "http://dummy.local");
    // treat http(s) absolute URLs as external
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}
