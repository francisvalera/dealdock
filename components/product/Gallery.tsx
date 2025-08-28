"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { isExternalImage } from "@/lib/img";

export default function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const srcs = images.length ? images : ["/noimage.png"];
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx((i) => (i === 0 ? srcs.length - 1 : i - 1));
  const next = () => setIdx((i) => (i === srcs.length - 1 ? 0 : i + 1));

  return (
    <div>
      {/* Primary */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100">
        <Image src={srcs[idx]} alt={alt} fill sizes="(min-width:1024px) 60vw, 100vw" className="object-contain" unoptimized={isExternalImage(srcs[idx])} priority />
        {/* arrows */}
        {srcs.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous"
              className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow ring-1 ring-black/10 grid place-items-center hover:bg-neutral-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow ring-1 ring-black/10 grid place-items-center hover:bg-neutral-100"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-2 py-0.5 text-xs font-semibold shadow">
              {idx + 1}/{srcs.length}
            </span>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {srcs.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-3 sm:grid-cols-6 md:grid-cols-8">
          {srcs.slice(0, 12).map((s, i) => {
            const active = i === idx;
            return (
              <button
                key={`${s}-${i}`}
                onClick={() => setIdx(i)}
                className={[
                  "relative aspect-[4/3] overflow-hidden rounded-xl bg-neutral-100 ring-1",
                  active ? "ring-red-500" : "ring-black/5 hover:ring-black/20",
                ].join(" ")}
                aria-label={`View image ${i + 1}`}
              >
                <Image src={s} alt={`${alt} ${i + 1}`} fill className="object-cover" unoptimized={isExternalImage(s)} />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
