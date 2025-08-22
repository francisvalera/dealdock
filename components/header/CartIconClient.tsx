"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function CartIconClient({ cartCount }: { cartCount: number }) {
  const [bump, setBump] = useState(false);
  const tRef = useRef<number | null>(null);
  const prev = useRef<number | null>(null);

  const kick = () => {
    if (tRef.current) window.clearTimeout(tRef.current);
    // restart animation even if class was already applied
    setBump(false);
    requestAnimationFrame(() => {
      setBump(true);
      tRef.current = window.setTimeout(() => setBump(false), 500);
    });
  };

  // 1) Immediate event (pre-refresh)
  useEffect(() => {
    const onUpdated = () => kick();
    window.addEventListener("cart:updated", onUpdated);
    return () => {
      window.removeEventListener("cart:updated", onUpdated);
      if (tRef.current) window.clearTimeout(tRef.current);
    };
  }, []);

  // 2) After RSC refresh (session flag)
  useEffect(() => {
    try {
      if (sessionStorage.getItem("cart-kick") === "1") {
        sessionStorage.removeItem("cart-kick");
        kick();
      }
    } catch {}
  }, []);

  // 3) Bounce when cartCount increases on this mounted client component
  useEffect(() => {
    if (prev.current !== null && cartCount > (prev.current ?? 0)) kick();
    prev.current = cartCount;
  }, [cartCount]);

  return (
    <Link
      href="/cart"
      aria-label="Open cart"
      className={`relative inline-flex p-2 text-gray-700 hover:text-black ${bump ? "cart-bounce" : ""}`}
    >
      <span className={`relative inline-grid place-items-center ${bump ? "cart-pulse" : ""}`}>
        <ShoppingCart className="h-6 w-6" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-2 h-5 min-w-5 px-1 flex items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
            {cartCount}
          </span>
        )}
      </span>
    </Link>
  );
}
