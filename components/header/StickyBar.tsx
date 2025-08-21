"use client";
import { useEffect } from "react";

/**
 * Forces the element with id=navId to behave sticky:
 * - When scrolled past the promo bar, it becomes fixed (top:0).
 * - Body gets top padding so content doesn't jump.
 */
export default function StickyBar({ navId, promoId }: { navId: string; promoId: string }) {
  useEffect(() => {
    const nav = document.getElementById(navId);
    if (!nav) return;

    const update = () => {
      const promo = document.getElementById(promoId);
      const threshold = promo ? promo.offsetHeight : 0;
      const shouldFix = window.scrollY > threshold;

      if (shouldFix) {
        if (!nav.classList.contains("fixed")) {
          nav.classList.add("fixed", "top-0", "left-0", "right-0", "z-50");
          document.body.style.paddingTop = `${nav.offsetHeight}px`;
        }
      } else {
        if (nav.classList.contains("fixed")) {
          nav.classList.remove("fixed", "top-0", "left-0", "right-0", "z-50");
          document.body.style.paddingTop = "";
        }
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      document.body.style.paddingTop = "";
    };
  }, [navId, promoId]);

  return null;
}
