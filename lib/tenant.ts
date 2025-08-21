import "server-only";
import { headers } from "next/headers";

export type Role = "ADMIN" | "STAFF" | "CUSTOMER";

export type MenuItem = { label: string; href: string };
export type TenantConfig = {
  /** Stable ID used across DB, analytics, etc. */
  tenantId: string;
  /** Full site title for SEO/tab */
  name?: string;
  /** Short brand shown in the header logo */
  brandName: string;
  logoUrl: string;
  phone?: string;
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
    name: "Kuya Kardz Motorcycle Trading",
    brandName: "KUYA KARDZ",
    logoUrl: "/kklogo.jpg",
    phone: "09773862419",
  },
  "kuyakardz.ph": {
    tenantId: "kuya-kardz",
    name: "Kuya Kardz Motorcycle Trading",
    brandName: "KUYA KARDZ",
    logoUrl: "/kklogo.jpg",
    phone: "09773862419",
  },
};

export async function resolveTenantByHost(host?: string): Promise<TenantConfig> {
  const h = (host ?? (await getRequestHost())).toLowerCase();
  if (DEV_DOMAIN_MAP[h]) return DEV_DOMAIN_MAP[h];
  const base = h.split(":")[0];
  if (DEV_DOMAIN_MAP[base]) return DEV_DOMAIN_MAP[base];
  return DEV_DOMAIN_MAP["localhost:3000"];
}
