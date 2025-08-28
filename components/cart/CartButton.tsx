"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getCartBus } from "@/lib/cart-bus";

export default function CartButton({ initialCount = 0 }: { initialCount?: number }) {
  const [count, setCount] = useState<number>(initialCount);
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    const bus = getCartBus();

    const bounce = () => {
      if (!el) return;
      el.classList.remove("animate-bounce-once");
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      el.offsetHeight;
      el.classList.add("animate-bounce-once");
    };

    const onAdded = (e: Event) => {
      const det = (e as CustomEvent<{ productId: string; delta?: number }>).detail;
      const delta = det?.delta ?? 1;
      setCount((n) => Math.max(0, n + delta));
      bounce();
    };

    const onBounce = () => bounce();

    bus.addEventListener("cart:added", onAdded);
    bus.addEventListener("cart:bounce", onBounce);
    return () => {
      bus.removeEventListener("cart:added", onAdded);
      bus.removeEventListener("cart:bounce", onBounce);
    };
  }, []);

  return (
    <Link ref={ref} href="/cart" className="relative p-2" aria-label="Shopping cart">
      <Image
        src="/carticon.png"
        alt=""
        width={24}
        height={24}
        className="h-6 w-6 object-contain"
        priority={false}
      />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 h-5 min-w-[20px] px-1 flex items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white border-2 border-white">
          {count}
        </span>
      )}
    </Link>
  );
}
