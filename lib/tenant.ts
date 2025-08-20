import "server-only";
import { headers } from "next/headers";

export type MenuItem = { label: string; href: string };
export type TenantConfig = {
  tenantId: string;
  brandName: string;
  logoUrl: string;
  phone?: string;
  freeShippingText?: string;
  menus: MenuItem[];
};

async function getRequestHost(): Promise<string> {
  const hs = await headers();
  return (
    hs.get("x-forwarded-host") ||
    hs.get("x-vercel-deployment-url") ||
    hs.get("host") ||
    ""
  ).toLowerCase();
}

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
};

export async function resolveTenantByHost(host?: string): Promise<TenantConfig> {
  const h = (host ?? (await getRequestHost())).toLowerCase();
  if (DEV_DOMAIN_MAP[h]) return DEV_DOMAIN_MAP[h];
  const base = h.split(":")[0];
  if (DEV_DOMAIN_MAP[base]) return DEV_DOMAIN_MAP[base];
  return DEV_DOMAIN_MAP["localhost:3000"];
}
