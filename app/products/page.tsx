import { PRODUCTS, BRANDS, CATEGORIES } from "@/lib/data/products";
import ProductCard from "@/components/ProductCard";
import FilterBar from "@/components/filters/FilterBar";

export default async function ProductsPage({ searchParams }: { searchParams?: Record<string, string | string[] | undefined> }) {
  const q = (searchParams?.q as string) || "";
  const brand = (searchParams?.brand as string) || "";
  const category = (searchParams?.category as string) || "";

  const list = PRODUCTS.filter(p =>
    (q ? p.title.toLowerCase().includes(q.toLowerCase()) : true) &&
    (brand ? p.brand === brand : true) &&
    (category ? p.category === category : true)
  );

  return (
    <main className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">PRODUCTS</h1>
        <p className="mt-2 text-gray-500">Filter and add items to cart.</p>
      </div>

      <FilterBar brands={BRANDS} categories={CATEGORIES} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {list.map(p => <ProductCard key={p.id} p={p} />)}
      </div>
    </main>
  );
}