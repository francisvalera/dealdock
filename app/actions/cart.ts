"use server";
import { redirect } from "next/navigation";
import { readCart, writeCart } from "@/lib/cart";

export async function addToCart(formData: FormData) {
  const productId = String(formData.get("productId"));
  const qty = Number(formData.get("qty") ?? 1);
  const redirectTo = (formData.get("redirectTo") as string | null) ?? null;

  const cart = await readCart();
  const found = cart.items.find((i) => i.productId === productId);
  if (found) found.qty += qty;
  else cart.items.push({ productId, qty });

  await writeCart(cart);

  if (redirectTo && redirectTo.length > 0) {
    redirect(redirectTo);
  }
  // No navigation: return a small payload for client UX if needed
  return { ok: true, count: cart.items.reduce((s, it) => s + it.qty, 0) };
}

export async function addToCartSilent(productId: string, qty: number = 1): Promise<number> {
  const cart = await readCart();
  const found = cart.items.find(i => i.productId === productId);
  if (found) found.qty += qty;
  else cart.items.push({ productId, qty });
  await writeCart(cart);
  return cart.items.find(i => i.productId === productId)!.qty;
}
