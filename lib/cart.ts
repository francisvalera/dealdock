import "server-only";
import { cookies } from "next/headers";

export type CartItem = { productId: string; qty: number };
export type Cart = { items: CartItem[] };
const CART_COOKIE = "cart";

export async function readCart(): Promise<Cart> {
  const jar = await cookies();
  const raw = jar.get(CART_COOKIE)?.value;
  if (!raw) return { items: [] };
  try { return JSON.parse(raw) as Cart; } catch { return { items: [] }; }
}

export async function writeCart(cart: Cart) {
  const jar = await cookies();
  jar.set(CART_COOKIE, JSON.stringify(cart), { path: "/" });
}

export async function countItems(): Promise<number> {
  const c = await readCart();
  return c.items.reduce((sum, it) => sum + it.qty, 0);
}