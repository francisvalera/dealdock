import Link from "next/link";

export default function ReadyToRide() {
  return (
    <section className="bg-gradient-to-r from-[#2b0000] via-[#7a0000] to-[#e10600] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">READY TO RIDE?</h2>
        <p className="mt-3 md:mt-4 text-white/90 text-base md:text-lg">
          Browse our extensive collection of parts and accessories to get started.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
          {/* solid pill (white) */}
          <Link href="/products" className="btn-cta bg-white text-black hover:bg-white/90">
            Explore Products
          </Link>
          {/* outline pill */}
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold uppercase tracking-wide
                       border border-white/70 text-white hover:border-white hover:bg-white/10 transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </section>
  );
}
