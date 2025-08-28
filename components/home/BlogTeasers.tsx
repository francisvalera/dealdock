// components/home/BlogTeasers.tsx
import Image from "next/image";
import Link from "next/link";

type Post = {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
};

const POSTS: Post[] = [
  { id: "n1", title: "5 Essential Maintenance Checks", category: "Maintenance", date: "Aug 02, 2025", excerpt: "Keep your bike running smoothly.", image: "/kklogo.jfif" },
  { id: "n2", title: "Choosing the Right Helmet", category: "Gear", date: "July 21, 2025", excerpt: "A complete guide to safety.", image: "/kklogo.jfif" },
  { id: "n3", title: "Highlights from MotoFest 2025", category: "Community", date: "July 20, 2025", excerpt: "The best bikes and gear.", image: "/kklogo.jfif" },
];

export default function BlogTeasers() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">LATEST NEWS</h2>
          <p className="mt-2 text-gray-500">Stay updated with news, tips, and insights from the motorcycle world.</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {POSTS.map((p) => (
            <article
              key={p.id}
              className={[
                "group relative rounded-2xl p-[1.5px]",
                "bg-gradient-to-br from-neutral-800 via-neutral-700 to-neutral-900",
                "shadow-[0_12px_30px_rgba(0,0,0,0.30)] hover:shadow-[0_24px_50px_rgba(244,63,94,0.35)]",
                "transition-shadow duration-300",
              ].join(" ")}
            >
              <div className="rounded-2xl overflow-hidden bg-neutral-950 text-white">
                {/* Media */}
                <div className="relative aspect-[16/9]">
                  <Image
                    src={p.image || "/noimage.png"}
                    alt={p.title}
                    fill
                    sizes="(min-width:1024px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                    priority={false}
                  />

                  {/* category pill */}
                  <span className="absolute left-3 top-3 rounded-full bg-red-600/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
                    {p.category}
                  </span>

                  {/* speed-line sheen */}
                  <div
                    className={[
                      "pointer-events-none absolute inset-0",
                      "bg-gradient-to-r from-transparent via-white/12 to-transparent",
                      "-translate-x-full group-hover:translate-x-full",
                      "transition-transform duration-700 ease-out",
                    ].join(" ")}
                  />

                  {/* hover-only frosted CTA */}
                  <div className="pointer-events-none absolute inset-x-3 bottom-3 flex justify-end">
                    <Link
                      href={`/blog/${p.id}`}
                      className="pointer-events-auto invisible translate-y-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold backdrop-blur-sm text-white ring-1 ring-white/30 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 hover:bg-white/25"
                      aria-label={`Read ${p.title}`}
                    >
                      Read
                    </Link>
                  </div>

                  {/* subtle bottom gradient for readability */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                {/* Text block */}
                <div className="px-4 py-4">
                  <p className="text-[11px] text-neutral-300">
                    <span className="font-semibold">{p.category}</span> • {p.date}
                  </p>

                  <h3 className="mt-1 line-clamp-2 text-[15px] font-semibold leading-snug text-white/95">
                    <Link href={`/blog/${p.id}`} className="hover:text-red-400">
                      {p.title}
                    </Link>
                  </h3>

                  <p className="mt-2 line-clamp-3 text-sm text-neutral-300">{p.excerpt}</p>
                </div>

                {/* red spine accent */}
                <div className="h-1 w-16 bg-gradient-to-r from-red-600 to-red-500 transition-all duration-300 group-hover:w-full" />
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center rounded-full bg-black px-5 py-2 text-white font-semibold hover:opacity-90"
          >
            VIEW ALL POSTS
          </Link>
        </div>
      </div>
    </section>
  );
}


// import Image from "next/image";
// import Link from "next/link";

// type Post = { id: string; title: string; category: string; date: string; excerpt: string; image: string; };

// const POSTS: Post[] = [
//   { id: "n1", title: "5 Essential Maintenance Checks", category: "Maintenance", date: "Aug 02, 2025", excerpt: "Keep your bike running smoothly.", image: "/kklogo.jfif" },
//   { id: "n2", title: "Choosing the Right Helmet", category: "Gear", date: "July 21, 2025", excerpt: "A complete guide to safety.", image: "/kklogo.jfif" },
//   { id: "n3", title: "Highlights from MotoFest 2025", category: "Community", date: "July 20, 2025", excerpt: "The best bikes and gear.", image: "/kklogo.jfif" },
// ];

// export default function BlogTeasers() {
//   return (
//     <section className="bg-white py-16">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-10">
//           <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">LATEST NEWS</h2>
//           <p className="mt-2 text-gray-500">Stay updated with news, tips, and insights from the motorcycle world.</p>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {POSTS.map((p) => (
//             <article key={p.id} className="rounded-lg border border-gray-200 bg-white overflow-hidden">
//               <div className="relative aspect-[16/9] bg-gray-100">
//                 <Image src="/kklogo.jpg" alt={p.title} fill className="object-cover" />
//               </div>
//               <div className="p-5 space-y-2">
//                 <p className="text-[11px] text-gray-500">
//                   <span className="font-semibold">{p.category}</span> • {p.date}
//                 </p>
//                 <h3 className="font-bold">{p.title}</h3>
//                 <p className="text-sm text-gray-600">{p.excerpt}</p>
//               </div>
//             </article>
//           ))}
//         </div>
//         <div className="text-center mt-8">
//           <Link href="/blog" className="inline-flex items-center rounded-full bg-black text-white px-5 py-2 font-semibold hover:opacity-90">
//             VIEW ALL POSTS
//         </Link>
//         </div>
//       </div>
//     </section>
//   );
// }
