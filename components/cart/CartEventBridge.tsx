"use client";

import { useEffect, useRef } from "react";

/**
 * Listens for `cart:updated` and toggles a CSS class on <html>
 * so animations trigger even across RSC refreshes/remounts.
 */
export default function CartEventBridge() {
  const tRef = useRef<number | null>(null);

  useEffect(() => {
    const kick = () => {
      const el = document.documentElement; // <html>
      el.classList.remove("cart-jolt");
      // next frame to ensure reflow, then add back to retrigger animation
      requestAnimationFrame(() => {
        el.classList.add("cart-jolt");
        if (tRef.current) window.clearTimeout(tRef.current);
        tRef.current = window.setTimeout(() => el.classList.remove("cart-jolt"), 600);
      });
    };

    window.addEventListener("cart:updated", kick);
    return () => {
      window.removeEventListener("cart:updated", kick);
      if (tRef.current) window.clearTimeout(tRef.current);
    };
  }, []);

  return null;
}
