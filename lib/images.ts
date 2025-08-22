// lib/images.ts
import noimage from "@/public/noimage.png";

// Reuse these in <Image sizes="..."> for accurate srcset selection
export const IMG_SIZES = {
  product: "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
  blog: "(min-width: 1024px) 33vw, 100vw",
  hero: "100vw",
};

// A single, aesthetic fallback for all cards
export { noimage };
