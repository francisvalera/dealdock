import { getItemQty } from "@/lib/cart";
import { ShoppingCart } from "lucide-react";

export default async function InCartBadge({ productId }: { productId: string }) {
  const qty = await getItemQty(productId); // reads cookie on server, noStore()d
  if (!qty) return null;

  return (
    <div className="absolute right-3 top-3 z-10" aria-live="polite">
      <span
        key={qty}
        className="cart-pop inline-flex items-center gap-1 rounded-full bg-black/80 text-white px-2.5 py-1 text-xs font-semibold backdrop-blur"
        title={`In cart: ${qty}`}
      >
        <ShoppingCart className="h-3.5 w-3.5" />
        {qty}
      </span>
    </div>
  );
}
