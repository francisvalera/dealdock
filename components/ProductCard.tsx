import Image from "next/image";
import AddToCartForm from "@/components/cart/AddToCartForm";
import { type Product } from "@/lib/data/products";
import InCartBadge from "@/components/cart/InCartBadge";
import { IMG_SIZES, noimage } from "@/lib/images";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export default function ProductCard({ p }: { p: Product }) {
  const price = `₱${Number(p.price ?? 0).toLocaleString()}`;
  const isFallback = !p.image || p.image.length === 0;
  const src: string | StaticImport = isFallback ? noimage : p.image;
  return (
    <article className="group relative rounded-2xl border border-gray-200 bg-white transition-all duration-300 ease-out">
      <div className="relative aspect-square overflow-hidden rounded-t-2xl bg-gray-50">
        <InCartBadge productId={p.id} />
        <Image
          src={src}
          alt={p.title}
          fill
          sizes={IMG_SIZES.product}
          className="card-zoom"
          placeholder={isFallback ? "blur" : "empty"}
        />
      </div>

      {/* Body */}
      <div className="p-6">
        <p className="text-[11px] font-semibold tracking-wider text-gray-500 uppercase">{p.brand}</p>
        <h3 className="mt-1 line-clamp-2 font-semibold text-gray-900">{p.title}</h3>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl text-red-500">{price}</span>

          {/* slide-in CTA on hover (still clickable when not hovered) */}
          <div className="cta-slide">
            <AddToCartForm productId={p.id} />
          </div>
        </div>
      </div>
    </article>
  );
}
