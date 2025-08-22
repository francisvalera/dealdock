import "server-only";
import { cookies } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";

export type CartItem = { productId: string; qty: number };
export type Cart = { items: CartItem[] };
const CART_COOKIE = "cart";

export async function readCart(): Promise<Cart> {
  noStore(); 
  const jar = await cookies();
  const raw = jar.get(CART_COOKIE)?.value;
  if (!raw) return { items: [] };
  try { return JSON.parse(raw) as Cart; } catch { return { items: [] }; }
}

export async function writeCart(cart: Cart) {
  const jar = await cookies();
  // jar.set(CART_COOKIE, JSON.stringify(cart), { path: "/" });
  jar.set(CART_COOKIE, JSON.stringify(cart), { path: "/", httpOnly: false, sameSite: "lax" });
}

export async function countItems(): Promise<number> {
  noStore();
  const c = await readCart();
  return c.items.reduce((sum, it) => sum + it.qty, 0);
}

export async function getItemQty(productId: string): Promise<number> {
  noStore();
  const c = await readCart();
  return c.items.find(i => i.productId === productId)?.qty ?? 0;
}