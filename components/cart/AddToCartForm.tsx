"use client";

import Image from "next/image";
import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { addToCart } from "@/app/cart/actions";

type ActionState =
  | { ok: boolean; total: number; itemQty: number; productId: string }
  | null;

function SubmitButton({ pendingLabel = "Adding..." }: { pendingLabel?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={[
        "inline-flex h-11 items-center gap-2 rounded-full bg-black px-5",
        "text-sm font-semibold text-white leading-none shadow-sm hover:opacity-90",
        "focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2",
        pending ? "opacity-70 cursor-not-allowed" : "",
      ].join(" ")}
    >
      <Image src="/carticon.png" alt="" width={16} height={16} className="h-4 w-4 object-contain invert" />
      {pending ? pendingLabel : "Add to cart"}
    </button>
  );
}

export default function AddToCartForm({
  productId,
  quantity = 1,
  redirectTo,
}: {
  productId: string;
  quantity?: number;
  redirectTo?: string;
}) {
  const [state, formAction] = useActionState<ActionState, FormData>(addToCart, null);
  const lastTotal = useRef<number>(-1);

  useEffect(() => {
    if (!state?.ok) return;
    if (state.total === lastTotal.current) return;
    lastTotal.current = state.total;

    if (typeof window !== "undefined") {
      // Global count (header)
      window.dispatchEvent(new CustomEvent("cart:updated", { detail: state }));
      window.dispatchEvent(new CustomEvent("cart:bounce"));

      // Product-scoped update for the card badge.
      // Always include productId; include absolute itemQty when server returned it,
      // and also provide a delta fallback so the badge can increment locally.
      const pid = state.productId || productId;
      const itemQty = typeof state.itemQty === "number" ? state.itemQty : undefined;
      window.dispatchEvent(
        new CustomEvent("cart:item-updated", {
          detail: { productId: pid, itemQty, delta: quantity },
        }),
      );
    }

    if (redirectTo) window.location.href = redirectTo;
  }, [state, productId, quantity, redirectTo]);

  return (
    <form action={formAction}>
      <input type="hidden" name="productId" value={productId} />
      <input type="hidden" name="qty" value={quantity} />
      <SubmitButton />
    </form>
  );
}
