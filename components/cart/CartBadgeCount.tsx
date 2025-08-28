"use client";

import { useEffect, useState } from "react";

function readCartTotal(): number {
  try {
    if (typeof document === "undefined") return 0;
    const pair = document.cookie.split("; ").find((c) => c.startsWith("cart="));
    if (!pair) return 0;
    const raw = decodeURIComponent(pair.split("=").slice(1).join("="));
    const arr = JSON.parse(raw) as Array<{ productId: string; qty: number }>;
    return arr.reduce((sum, it) => sum + (Number(it.qty) || 0), 0);
  } catch {
    return 0;
  }
}

export default function CartBadgeCount({ initial }: { initial: number }) {
  const [count, setCount] = useState(initial);

  useEffect(() => {
    const syncFromCookie = () =>
      setCount((prev) => {
        const next = readCartTotal();
        return Number.isFinite(next) && next !== prev ? next : prev;
      });

    syncFromCookie();

    const onUpdated = (e: Event) => {
      const detail = (e as CustomEvent).detail as { total?: number } | undefined;
      if (detail && typeof detail.total === "number") setCount(detail.total);
      else syncFromCookie(); // fallback
    };

    const onFocus = () => syncFromCookie();
    const onVisibility = () => {
      if (document.visibilityState === "visible") syncFromCookie();
    };

    window.addEventListener("cart:updated", onUpdated as EventListener);
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("cart:updated", onUpdated as EventListener);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  if (count <= 0) return null;

  return (
    <span
      className={[
        "absolute -top-1 -right-1 h-5 min-w-[20px] px-1 flex items-center justify-center rounded-full",
        "bg-red-600 text-xs font-bold text-white border-2 border-white",
      ].join(" ")}
    >
      {count}
    </span>
  );
}
