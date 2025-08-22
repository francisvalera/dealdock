export const dynamic = "force-dynamic";

import ProductCard from "@/components/ProductCard";
import FilterBar from "@/components/filters/FilterBar";
import { brandsAndCategories, listProductsFiltered } from "@/lib/productRepo";
import { resolveTenantByHost } from "@/lib/tenant";

type SP = { q?: string; brand?: string; category?: string };

export default async function ProductsPage({ searchParams }: { searchParams: Promise<SP> }) {
  const tenant = await resolveTenantByHost();
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q : "";
  const brand = typeof sp.brand === "string" ? sp.brand : "";
  const category = typeof sp.category === "string" ? sp.category : "";

  const [{ brands, categories }, list] = await Promise.all([
    brandsAndCategories(tenant.tenantId),
    listProductsFiltered({ q, brand, category }, tenant.tenantId),
  ]);

  return (
    <main className="max-w-7xl mx-auto p-6">
      <FilterBar brands={brands} categories={categories} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {list.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </main>
  );
}
