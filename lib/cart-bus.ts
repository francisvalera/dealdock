// lib/cart-bus.ts
// Simple global event bus for cart UI updates (client-only).
export type CartAddedDetail = { productId: string; delta?: number }; // delta defaults to +1
export type CartBounceDetail = { productId?: string };               // optional targeting

declare global {
  interface Window {
    __cartBus?: EventTarget;
  }
}

export function getCartBus(): EventTarget {
  if (typeof window === "undefined") return new EventTarget();
  window.__cartBus ??= new EventTarget();
  return window.__cartBus;
}

export function emitCartAdded(detail: CartAddedDetail) {
  if (typeof window === "undefined") return;
  getCartBus().dispatchEvent(new CustomEvent<CartAddedDetail>("cart:added", { detail }));
}

export function emitCartBounce(detail: CartBounceDetail = {}) {
  if (typeof window === "undefined") return;
  getCartBus().dispatchEvent(new CustomEvent<CartBounceDetail>("cart:bounce", { detail }));
}
