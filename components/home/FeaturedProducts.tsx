import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { listFeaturedProducts } from "@/lib/products";

export const revalidate = 60;

export default async function FeaturedProducts() {
  const products = await listFeaturedProducts(8);

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">
            FEATURED PRODUCTS
          </h2>
          <p className="mt-2 text-gray-500">
            Hand-picked bestsellers and new arrivals.
          </p>
        </div>

        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-stretch">
          {products.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/shop"
            className="inline-flex items-center rounded-full bg-black text-white px-5 py-2 font-semibold hover:opacity-90"
          >
            ENTER THE SHOP
          </Link>
        </div>
      </div>
    </section>
  );
}
