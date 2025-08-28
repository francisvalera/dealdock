// components/home/PreFooterCTA.tsx
import Link from 'next/link';

export default function PreFooterCTA() {
  return (
    <section className="relative bg-gradient-to-r from-black via-red-900 to-red-600 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-16">
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-extrabold tracking-wide">READY TO RIDE?</h3>
          <p className="mt-2 text-white/90">
            Browse our extensive collection of parts and accessories to get started.
          </p>

          <div className="mt-6 flex items-center justify-center gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center rounded-md bg-white px-5 py-2 text-sm font-semibold text-black shadow-sm hover:opacity-90"
            >
              ENTER THE SHOP
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-md px-5 py-2 text-sm font-semibold ring-1 ring-inset ring-white/70 hover:ring-white"
            >
              CONTACT SUPPORT
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
