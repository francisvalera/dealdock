"use server";
import { redirect } from "next/navigation";
import { readCart, writeCart } from "@/lib/cart";

export async function addToCart(formData: FormData) {
  const productId = String(formData.get("productId"));
  const qty = Number(formData.get("qty") ?? 1);
  const redirectTo = String(formData.get("redirectTo") ?? "/products");

  const cart = await readCart();
  const found = cart.items.find(i => i.productId === productId);
  if (found) found.qty += qty; else cart.items.push({ productId, qty });
  await writeCart(cart);
  if (redirectTo && redirectTo.length > 0) {
    redirect(redirectTo);
  }
  return { ok: true };
}

export async function clearCart() {
  await writeCart({ items: [] });
  redirect("/products");
}