import "server-only";
import { headers } from "next/headers";

export type Role = "ADMIN" | "STAFF" | "CUSTOMER";
export type MenuItem = { label: string; href: string };
export type TenantConfig = {
  tenantId: string;
  brandName: string;
  logoUrl: string; // put in /public for Image optimization
  phone?: string;
  freeShippingText?: string;
  menus: MenuItem[];
};

/** Extract host from request headers with Vercel/Edge-friendly precedence. */
export function getRequestHost(h?: Headers): string {
  const hs = h ?? headers();
  return (
    hs.get("x-forwarded-host") ||
    hs.get("x-vercel-deployment-url") ||
    hs.get("host") ||
    ""
  ).toLowerCase();
}

/** In-memory domain→tenant resolver for local/dev & bootstrap. */
const DEV_DOMAIN_MAP: Record<string, TenantConfig> = {
  "localhost:3000": {
    tenantId: "kuya-kardz",
    brandName: "KUYA KARDZ",
    logoUrl: "/kklogo.jfif",
    phone: "09773862419",
    freeShippingText: "Free shipping on orders over ₱2,000",
    menus: [
      { label: "HOME", href: "/" },
      { label: "PRODUCTS", href: "/products" },
      { label: "BLOG", href: "/blog" },
      { label: "CONTACT", href: "/contact" },
    ],
  },
  "kuyakardz.ph": {
    tenantId: "kuya-kardz",
    brandName: "KUYA KARDZ",
    logoUrl: "/kklogo.jfif",
    phone: "09773862419",
    freeShippingText: "Free shipping on orders over ₱2,000",
    menus: [
      { label: "HOME", href: "/" },
      { label: "PRODUCTS", href: "/products" },
      { label: "BLOG", href: "/blog" },
      { label: "CONTACT", href: "/contact" },
    ],
  },
};

/** Resolve tenant config by host. Fallback is safe default. */
export async function resolveTenantByHost(host?: string): Promise<TenantConfig> {
  const h = (host ?? getRequestHost()).toLowerCase();
  if (DEV_DOMAIN_MAP[h]) return DEV_DOMAIN_MAP[h];
  const base = h.split(":")[0];
  if (DEV_DOMAIN_MAP[base]) return DEV_DOMAIN_MAP[base];
  return {
    tenantId: "default",
    brandName: "KUYA KARDZ",
    logoUrl: "/kklogo.jfif",
    phone: "09773862419",
    freeShippingText: "Free shipping on orders over ₱2,000",
    menus: [
      { label: "HOME", href: "/" },
      { label: "PRODUCTS", href: "/products" },
      { label: "BLOG", href: "/blog" },
      { label: "CONTACT", href: "/contact" },
    ],
  };
}