import Image from "next/image";
import Link from "next/link";
import { IMG_SIZES, noimage } from "@/lib/images";

type Post = {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
};

const POSTS: Post[] = [
  { id: "n1", title: "5 Essential Maintenance Checks", category: "Maintenance", date: "Aug 02, 2025", excerpt: "Keep your bike running smoothly.", image: "/kklogo.jpg" },
  { id: "n2", title: "Choosing the Right Helmet",       category: "Gear",        date: "July 21, 2025", excerpt: "A complete guide to safety.",    image: "/kklogo.jpg" },
  { id: "n3", title: "Highlights from MotoFest 2025",   category: "Community",   date: "July 20, 2025", excerpt: "The best bikes and gear.",      image: "/kklogo.jpg" },
];

export default function BlogTeasers() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
            LATEST NEWS
          </h2>
          <p className="mt-3 text-gray-500">
            Stay updated with news, tips, and insights from the motorcycle world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {POSTS.map((p) => (
            <article key={p.id} className="group card-base card-hover overflow-hidden">
              <div className="card-media card-shine aspect-[16/9]">
                <Image
                  src={p.image && p.image.length ? p.image : (noimage as unknown as string)}
                  alt={p.title}
                  fill
                  sizes={IMG_SIZES.blog}
                  className="card-zoom"
                  placeholder={p.image ? "empty" : "blur"}
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Link
                    href="/blog"
                    className="btn-cta-frosted opacity-0 translate-y-1 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0"
                    aria-label={`Read post: ${p.title}`}
                  >
                    Read Post
                  </Link>
                </div>
              </div>

              {/* body */}
              <div className="p-6">
                <p className="text-[11px] font-semibold tracking-wider text-gray-500 uppercase">
                  {p.category} • {p.date}
                </p>
                <h3 className="mt-1 font-semibold text-gray-900 transition-colors group-hover:text-red-600">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">{p.excerpt}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/blog" className="btn-cta">
            View all posts
          </Link>
        </div>
      </div>
    </section>
  );
}
