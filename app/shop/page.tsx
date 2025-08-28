// app/shop/page.tsx
import ProductCard from "@/components/ProductCard";
import ShopFilters, { type CategoryTree } from "@/components/filters/ShopFilters";
import {listProducts, listBrandNames, listCategoryTree, listPriceBounds, type UIProduct} from "@/lib/products";
// import { getCartMap } from "@/app/cart/actions";

type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default async function ShopPage({ searchParams }: PageProps) {
  const q = (searchParams?.q as string) || "";
  const brand = (searchParams?.brand as string) || "";
  const category = (searchParams?.category as string) || "";
  const subcategory = (searchParams?.subcategory as string) || "";

  const minRaw = Number(searchParams?.min);
  const maxRaw = Number(searchParams?.max);
  const min = Number.isFinite(minRaw) ? minRaw : undefined;
  const max = Number.isFinite(maxRaw) ? maxRaw : undefined;

  const [products, brands, categories] = await Promise.all([
    listProducts({ q: q || undefined, brand: brand || undefined, category: category || undefined, subcategory: subcategory || undefined, min, max, take: 48 }),
    listBrandNames(),
    listCategoryTree(),
    listPriceBounds()
  ]);

  const facets: { brands: string[]; categories: CategoryTree; priceSteps?: number[] } = {
    brands,
    categories,
  };

  return (
    <main className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">SHOP</h1>
        <p className="mt-2 text-gray-500">Dial in your ride with filters on the left.</p>
      </div>

      {/* 5 columns: 1 for filters, 4 for results */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Sidebar filters */}
        <ShopFilters facets={facets} />

        {/* Results */}
        <section className="md:col-span-4">
          {/* Mobile summary bar (optional) */}

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p: UIProduct) => (
              // <ProductCard key={p.id} p={p} redirectTo={undefined} initialQty={cartMap.get(String(p.id)) ?? 0} />
              <ProductCard key={p.id} p={p} redirectTo={undefined} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
