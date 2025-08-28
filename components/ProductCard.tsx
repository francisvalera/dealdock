import Link from "next/link";
import Image from "next/image";
import AddToCartForm from "@/components/cart/AddToCartForm";
import CartQuantityBadge from "@/components/cart/CartQuantityBadge";
import { type UIProduct } from "@/lib/products";
import { isExternalImage } from "@/lib/img";

type Props = { p: UIProduct; redirectTo?: string; initialQty?: number };

export default function ProductCard({ p, redirectTo, initialQty = 0 }: Props) {
  return (
    <div className="group relative h-full">
      {/* Ambient halo */}
      <div
        aria-hidden
        className={[
          "absolute -inset-1 rounded-[26px]",
          "bg-[radial-gradient(55%_55%_at_25%_0%,rgba(244,63,94,.25),transparent_60%),",
          "radial-gradient(30%_30%_at_90%_85%,rgba(255,255,255,.07),transparent_60%)]",
          "opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100",
        ].join("")}
      />

      {/* Card */}
      <div
        className={[
          "relative rounded-[26px] bg-neutral-950/95 text-white",
          "shadow-[0_16px_44px_rgba(0,0,0,.32)] backdrop-blur-sm",
          "transition-transform duration-300 group-hover:-translate-y-1",
          "flex h-full flex-col",
        ].join(" ")}
      >
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-white/10 via-white/25 to-white/10 opacity-60" />

        {/* Media */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-[26px]">
          {/* Make the whole image clickable */}
          <Link href={`/shop/${p.id}`} className="absolute inset-0 z-[10]" aria-label={p.title} />

          <CartQuantityBadge productId={String(p.id)} initialQty={initialQty} />

          <Image
            src={p.image ?? "/noimage.png"}
            alt={p.title}
            fill
            sizes="(min-width:1024px) 25vw, 50vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
            unoptimized={isExternalImage(p.image)}
          />

          {/* Hover CTA — ensure it's ABOVE the link overlay */}
          <div className="absolute inset-x-4 bottom-4 z-[20]">
            <div className="flex justify-end">
              <div className="opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <div className="pointer-events-auto">
                  <AddToCartForm productId={String(p.id)} redirectTo={redirectTo} />
                </div>
              </div>
            </div>
          </div>

          {/* Light sweep */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(70deg,transparent_0%,rgba(255,255,255,.10)_45%,transparent_60%)] transition-transform duration-700 ease-out group-hover:translate-x-0"
          />
        </div>

        {/* Info */}
        <div className="px-4 pt-3 pb-4 flex flex-1 flex-col">
          <div className="mb-2 flex items-center gap-2">
            {p.brand ? (
              <span className="text-xs font-semibold tracking-wide text-neutral-300 uppercase">{p.brand}</span>
            ) : (
              <span className="h-3" aria-hidden />
            )}
            {p.category && (
              <span className="rounded-full bg-red-600/15 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-red-400">
                {p.category}
              </span>
            )}
          </div>

          <h3 className="line-clamp-2 text-[15.5px] font-semibold leading-snug text-white/95 min-h-[3.2em]">
            <Link href={`/shop/${p.id}`} className="hover:text-red-400">
              {p.title}
            </Link>
          </h3>

          <div className="mt-auto pt-3 flex items-center justify-between">
            <span className="text-[20px] font-semibold text-red-500">
              ₱{p.price.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
            </span>
            {p.subcategory && (
              <span className="rounded-md bg-neutral-900/80 px-2 py-1 text-[11px] font-medium text-neutral-200">
                {p.subcategory}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
