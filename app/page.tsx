import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BlogTeasers from "@/components/home/BlogTeasers";
import Footer from "@/components/home/Footer";
import { resolveTenantByHost } from "@/lib/tenant";


export default async function HomePage() {
const tenant = await resolveTenantByHost();
return (
<main>
<Hero />
<FeaturedProducts />
<BlogTeasers />
<Footer tenant={tenant} />
</main>
);
}