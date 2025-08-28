"use client";

import { useState } from "react";
import Image from "next/image";
import AddToCartForm from "@/components/cart/AddToCartForm";

function QuantityPicker({
  stock,
  value,
  onChange,
}: { stock: number; value: number; onChange: (n: number) => void }) {
  const dec = () => onChange(Math.max(1, value - 1));
  const inc = () => onChange(Math.min(Math.max(1, stock || 999), value + 1));
  return (
    <div className="inline-flex h-11 items-center justify-between rounded-full border border-black/70 pl-2 pr-1">
      <button
        type="button"
        onClick={dec}
        className="h-7 w-7 grid place-items-center rounded-full ring-1 ring-black/10"
        aria-label="Decrease"
      >
        −
      </button>
      <span className="px-3 font-semibold tabular-nums">{value}</span>
      <button
        type="button"
        onClick={inc}
        className="h-7 w-7 grid place-items-center rounded-full ring-1 ring-black/10"
        aria-label="Increase"
      >
        +
      </button>
    </div>
  );
}

export default function AddToCartPanel({
  productId,
  stock,
  initialInCart = 0,
}: { productId: string; stock: number; initialInCart?: number }) {
  const [qty, setQty] = useState(1);

  return (
    <div className="w-full">
      {/* ONE ROW: qty • add-to-cart • buy-now • (badge) — all height h-11 */}
      <div className="flex flex-wrap items-center gap-3">
        <QuantityPicker stock={stock} value={qty} onChange={setQty} />

        <AddToCartForm productId={productId} quantity={qty} />

        <a
          href="/cart"
          className="inline-flex h-11 items-center justify-center rounded-full bg-red-600 px-5 text-white text-sm font-semibold shadow hover:opacity-95"
        >
          Buy it now
        </a>

        {initialInCart > 0 && (
          <span className="inline-flex h-11 items-center gap-1 rounded-full bg-black/80 px-3 text-white text-[11px] font-semibold">
            <Image src="/carticon.png" alt="" width={12} height={12} className="h-3 w-3 object-contain invert" />
            {initialInCart}
          </span>
        )}
      </div>
    </div>
  );
}
