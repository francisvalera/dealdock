"use server";

import { cookies } from "next/headers";

const COOKIE = "cart";

export type CartItem = { productId: string; qty: number };

// Minimal “cookie jar” surface we need (no Next types required)
type CookieValue = { name: string; value: string };
type CookieSetOptions = {
  path?: string;
  httpOnly?: boolean;
  sameSite?: "lax" | "strict" | "none";
  maxAge?: number;
};
type CookieJar = {
  get: (name: string) => CookieValue | undefined;
  set: (name: string, value: string, options?: CookieSetOptions) => void;
};

// Narrow unknown to our CookieJar without @ts-ignore
function hasCookieAPI(x: unknown): x is CookieJar {
  return !!x && typeof (x as { get?: unknown }).get === "function" && typeof (x as { set?: unknown }).set === "function";
}

/** Works whether `cookies()` returns the store or a Promise. */
async function getCookieStore(): Promise<CookieJar> {
  const storeOrPromise = cookies() as unknown;
  if (hasCookieAPI(storeOrPromise)) return storeOrPromise;
  return await (storeOrPromise as Promise<CookieJar>);
}

async function readCart(): Promise<CartItem[]> {
  const jar = await getCookieStore();
  const raw = jar.get(COOKIE)?.value ?? "[]";
  try {
    return JSON.parse(raw) as CartItem[];
  } catch {
    return [];
  }
}

async function writeCart(items: CartItem[]) {
  const jar = await getCookieStore();
  jar.set(COOKIE, JSON.stringify(items), {
    path: "/",
    httpOnly: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}

/** Server Action (2-arg signature for useActionState). */
export async function addToCart(
  _prevState: { ok: boolean; total: number; itemQty: number; productId: string } | null,
  formData: FormData
) {
  const productId = String(formData.get("productId") ?? "");
  const n = Number(formData.get("qty") ?? 1);
  const qty = Number.isFinite(n) && n > 0 ? Math.floor(n) : 1;
  if (!productId) return { ok: false, total: 0, itemQty: 0, productId: "" };

  const items = await readCart();
  const i = items.findIndex((it) => it.productId === productId);
  if (i >= 0) items[i].qty += qty;
  else items.push({ productId, qty });

  await writeCart(items);

  const total = items.reduce((a, b) => a + b.qty, 0);
  const itemQty = items.find((it) => it.productId === productId)?.qty ?? qty;
  return { ok: true, total, itemQty, productId };
}

/** For SSR hydration when needed */
export async function getCartMap(): Promise<Map<string, number>> {
  const items = await readCart();
  return new Map(items.map((i) => [i.productId, i.qty]));
}

export async function getCartCount(): Promise<number> {
  const items = await readCart();
  return items.reduce((a, b) => a + b.qty, 0);
}
