import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BlogTeasers from "@/components/home/BlogTeasers";
import PreFooterCTA from "@/components/home/PreFooterCTA";
import Footer from "@/components/home/Footer";

export default async function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <BlogTeasers />
      <PreFooterCTA />
      <Footer />
    </main>
  );
}
