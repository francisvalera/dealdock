"use client";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const SLIDES = [
  { src: "/hero/hero1.jpg", alt: "CUSTOM ACCESSORIES" },
  { src: "/hero/hero2.jpg", alt: "TRACK PERFORMANCE" },
  { src: "/hero/hero3.jpg", alt: "URBAN NIGHT RIDE" },
  { src: "/hero/hero4.jpg", alt: "ADVENTURE TOURING" },
  { src: "/hero/hero5.jpg", alt: "CAFE RACER STYLE" },
];

export default function Hero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setI((p) => (p - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setI((p) => (p + 1) % SLIDES.length);

  return (
    <section className="relative min-h-[40vh] md:min-h-[50vh]">
      <div className="absolute inset-0">
        <Image
          src={SLIDES[i].src}
          alt={SLIDES[i].alt}
          fill
          sizes="100vw"
          className="object-cover"
          priority={i === 0}
        />
      </div>

      {/* visual dimmer; never intercept clicks */}
      <div className="pointer-events-none absolute inset-0 bg-black/20" />

      {/* arrows */}
      <button
        onClick={prev}
        aria-label="Previous"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/30 p-3 text-white hover:bg-black/50"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={next}
        aria-label="Next"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/30 p-3 text-white hover:bg-black/50"
      >
        <ChevronRight />
      </button>

      {/* dots */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2.5 w-2.5 rounded-full ${i === idx ? "bg-white" : "bg-white/60"}`}
          />
        ))}
      </div>
    </section>
  );
}
