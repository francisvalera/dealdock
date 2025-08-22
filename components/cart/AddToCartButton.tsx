"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { addToCartSilent } from "@/app/actions/cart";

export default function AddToCartButton({ productId, qty = 1 }: { productId: string; qty?: number }) {
  const router = useRouter();
  const [pending, start] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() =>
        start(async () => {
          const newQty = await addToCartSilent(productId, qty);
          window.dispatchEvent(new CustomEvent("cart:updated", { detail: { productId, qty: newQty } }));
          try { sessionStorage.setItem("cart-kick", "1"); } catch {}
          router.refresh();
        })
      }
      className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold bg-black text-white hover:bg-gray-900 disabled:opacity-50"
      aria-busy={pending}
    >
      {pending ? "Adding…" : "Add to Cart"}
    </button>
  );
}
