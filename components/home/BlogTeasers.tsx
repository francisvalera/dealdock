import Image from "next/image";
import Link from "next/link";

type Post = { id: string; title: string; category: string; date: string; excerpt: string; image: string; };

const POSTS: Post[] = [
  { id: "n1", title: "5 Essential Maintenance Checks", category: "Maintenance", date: "Aug 02, 2025", excerpt: "Keep your bike running smoothly.", image: "/kklogo.jfif" },
  { id: "n2", title: "Choosing the Right Helmet", category: "Gear", date: "July 21, 2025", excerpt: "A complete guide to safety.", image: "/kklogo.jfif" },
  { id: "n3", title: "Highlights from MotoFest 2025", category: "Community", date: "July 20, 2025", excerpt: "The best bikes and gear.", image: "/kklogo.jfif" },
];

export default function BlogTeasers() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">LATEST NEWS</h2>
          <p className="mt-2 text-gray-500">Stay updated with news, tips, and insights from the motorcycle world.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {POSTS.map((p) => (
            <article key={p.id} className="rounded-lg border border-gray-200 bg-white overflow-hidden">
              <div className="relative aspect-[16/9] bg-gray-100">
                <Image src="/kklogo.jpg" alt={p.title} fill className="object-cover" />
              </div>
              <div className="p-5 space-y-2">
                <p className="text-[11px] text-gray-500">
                  <span className="font-semibold">{p.category}</span> • {p.date}
                </p>
                <h3 className="font-bold">{p.title}</h3>
                <p className="text-sm text-gray-600">{p.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/blog" className="inline-flex items-center rounded-full bg-black text-white px-5 py-2 font-semibold hover:opacity-90">
            VIEW ALL POSTS
        </Link>
        </div>
      </div>
    </section>
  );
}
