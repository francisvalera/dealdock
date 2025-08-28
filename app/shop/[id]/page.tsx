import Link from "next/link";
import { getProductDetail } from "@/lib/products";
import { getCartMap } from "@/lib/cart-cookie";
import Gallery from "@/components/product/Gallery";
import AddToCartPanel from "@/components/product/AddToCartPanel";

type PageProps = { params: { id: string } };

export default async function ProductDetailPage({ params }: PageProps) {
  const [p, cartMap] = await Promise.all([getProductDetail(params.id), getCartMap()]);
  const initialQty = cartMap.get(String(p.id)) ?? 0;

  return (
    <main className="mx-auto max-w-7xl p-6">
      {/* Breadcrumbs */}
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-900">Home</Link>
        <span className="mx-2">›</span>
        <Link href="/shop" className="hover:text-gray-900">Shop</Link>
        {p.category && (
          <>
            <span className="mx-2">›</span>
            <Link href={`/shop?category=${encodeURIComponent(p.category)}`} className="hover:text-gray-900">
              {p.category}
            </Link>
          </>
        )}
        {p.subcategory && (
          <>
            <span className="mx-2">›</span>
            <Link href={`/shop?subcategory=${encodeURIComponent(p.subcategory)}`} className="hover:text-gray-900">
              {p.subcategory}
            </Link>
          </>
        )}
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: Gallery */}
        <section>
          <Gallery images={p.images} alt={p.title} />
        </section>

        {/* Right: Info / Actions */}
        <section>
          {/* brand */}
          {p.brand && (
            <div className="text-xs font-bold uppercase tracking-wide text-gray-600">{p.brand}</div>
          )}

          {/* name */}
          <h1 className="mt-1 text-2xl md:text-3xl font-extrabold leading-tight text-gray-900">
            {p.title}
          </h1>

          {/* price */}
          <div className="mt-3">
            <span className="text-[24px] font-semibold text-red-600">
              ₱{p.price.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
            </span>
          </div>

          {/* description */}
          {p.description && (
            <div className="mt-4 text-sm leading-relaxed text-gray-700 whitespace-pre-line">
              {p.description}
            </div>
          )}

          {/* qty + add to cart + buy now (same row) */}
          <div className="mt-6">
            <AddToCartPanel productId={String(p.id)} stock={p.stock} initialInCart={initialQty} />
          </div>

          {/* SKU → Model → Size (same row) */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            {p.sku && (
              <div className="rounded-lg bg-gray-50 px-3 py-2 ring-1 ring-gray-200">
                <div className="text-[10px] uppercase tracking-wide text-gray-500">SKU</div>
                <div className="font-medium text-gray-900">{p.sku}</div>
              </div>
            )}
            {p.model && (
              <div className="rounded-lg bg-gray-50 px-3 py-2 ring-1 ring-gray-200">
                <div className="text-[10px] uppercase tracking-wide text-gray-500">Model</div>
                <div className="font-medium text-gray-900">{p.model}</div>
              </div>
            )}
            {p.size && (
              <div className="rounded-lg bg-gray-50 px-3 py-2 ring-1 ring-gray-200">
                <div className="text-[10px] uppercase tracking-wide text-gray-500">Size</div>
                <div className="font-medium text-gray-900">{p.size}</div>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
