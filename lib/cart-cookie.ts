// lib/cart-cookie.ts
import { cookies } from 'next/headers';

const COOKIE = 'cart.v1';
type CartItem = { productId: string; qty: number; unitPrice: number };

// Server-only helpers to seed UI from the cookie
export async function getCartMap(): Promise<Map<string, number>> {
  const jar = await cookies();
  const raw = jar.get(COOKIE)?.value ?? '[]';
  let items: CartItem[] = [];
  try { items = JSON.parse(raw) as CartItem[]; } catch {}
  const map = new Map<string, number>();
  for (const it of items) map.set(String(it.productId), Number(it.qty ?? 0));
  return map;
}

export async function getCartCount(): Promise<number> {
  const jar = await cookies();
  const raw = jar.get(COOKIE)?.value ?? '[]';
  try {
    const items = JSON.parse(raw) as CartItem[];
    return items.reduce((n, i) => n + (i.qty ?? 0), 0);
  } catch {
    return 0;
  }
}
