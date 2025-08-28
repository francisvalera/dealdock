"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

function readCartQty(productId: string): number {
  try {
    if (typeof document === "undefined") return 0;
    const pair = document.cookie.split("; ").find((c) => c.startsWith("cart="));
    if (!pair) return 0;
    const raw = decodeURIComponent(pair.split("=").slice(1).join("="));
    const arr = JSON.parse(raw) as Array<{ productId: string; qty: number }>;
    const found = arr.find((i) => String(i.productId) === String(productId));
    return found?.qty ?? 0;
  } catch {
    return 0;
  }
}

export default function CartQuantityBadge({
  productId,
  initialQty = 0,
}: {
  productId: string;
  initialQty?: number;
}) {
  const [qty, setQty] = useState(initialQty);

  useEffect(() => {
    const cookieQty = readCartQty(productId);
    if (cookieQty && cookieQty !== qty) setQty(cookieQty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  useEffect(() => {
    const handleUpdated = (e: Event) => {
      const d = (e as CustomEvent).detail as
        | { productId?: string; itemQty?: number; delta?: number }
        | undefined;
      if (!d || d.productId !== productId) return;

      if (typeof d.itemQty === "number") {
        setQty(d.itemQty);
      } else if (typeof d.delta === "number") {
        const delta = d.delta;
        setQty((prev) => Math.max(0, prev + delta));
      }
    };

    window.addEventListener("cart:item-updated", handleUpdated as EventListener);
    window.addEventListener("cart:updated", handleUpdated as EventListener);
    return () => {
      window.removeEventListener("cart:item-updated", handleUpdated as EventListener);
      window.removeEventListener("cart:updated", handleUpdated as EventListener);
    };
  }, [productId]);

  if (!qty) return null;

  return (
    <span className="absolute left-3 top-3 z-20 inline-flex items-center gap-1 rounded-full bg-black/80 px-2 py-0.5 text-[11px] font-semibold text-white">
      <Image src="/carticon.png" alt="" width={12} height={12} className="h-3 w-3 object-contain invert" />
      {qty}
    </span>
  );
}
