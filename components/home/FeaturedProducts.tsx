export const dynamic = "force-dynamic";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { featuredProducts } from "@/lib/productRepo";
import { resolveTenantByHost } from "@/lib/tenant";

export default async function FeaturedProducts() {
  const tenant = await resolveTenantByHost();
  // show the first 8 featured items for this tenant
  const featured = await featuredProducts(8, tenant.tenantId);

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* title + subcopy */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
            FEATURED PRODUCTS
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
            Top picks from our curated collection of premium parts.
          </p>
        </div>

        {/* 4-up grid that wraps to show up to 8 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <Link href="/products?featured=1" className="inline-flex items-center rounded-full bg-black text-white px-5 py-2 font-semibold hover:opacity-90">
            VIEW ALL FEATURED PRODUCTS
        </Link>
        </div>
      </div>
    </section>
  );
}
