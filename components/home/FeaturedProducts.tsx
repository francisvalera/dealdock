import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/data/products";


export default async function FeaturedProducts() {
const featured = PRODUCTS.filter(p => p.isFeatured);
return (
<section className="bg-gray-50 py-20">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="text-center mb-12">
<h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">FEATURED PRODUCTS</h2>
<p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">Top picks from our curated collection of premium parts.</p>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
{featured.map(p => (<ProductCard key={p.id} p={p} redirectTo={undefined} />))}
</div>
</div>
</section>
);
}