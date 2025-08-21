import Image from "next/image";
import AddToCartForm from "@/components/cart/AddToCartForm";
import { type Product } from "@/lib/data/products";

export default function ProductCard({ p, redirectTo }: { p: Product; redirectTo?: string }) {
  return (
    <div className="group rounded-lg overflow-hidden border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Image
          src={p.image || "/kklogo.jpg"}
          alt={p.title}
          fill
          sizes="(min-width:1024px) 25vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6 space-y-2">
        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
          {p.brand}
        </p>
        <h3 className="font-bold text-base text-gray-900 leading-snug line-clamp-2">
          {p.title}
        </h3>
        <div className="flex items-center justify-between pt-2">
          <span className="text-2xl font-black text-red-500">
            ₱{p.price.toLocaleString()}
          </span>
          <div className="flex-shrink-0">
            <AddToCartForm productId={p.id} redirectTo={redirectTo} />
            </div>
        </div>
      </div>
      {/* subtle bottom accent on hover */}
      <div className="h-0.5 bg-transparent group-hover:bg-red-500 transition-colors duration-300" />
    </div>
  );
}
