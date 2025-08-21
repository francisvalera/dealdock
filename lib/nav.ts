import type { TenantConfig } from "./tenant";

export type MenuItem = { label: string; href: string };

export async function getStaticMenus(): Promise<MenuItem[]> {
  return [
    { label: "HOME", href: "/" },
    { label: "ALL PRODUCTS", href: "/products" },
    { label: "HELMETS & GEARS", href: "/helmets-gears" },
    { label: "PERFORMANCE PARTS", href: "/performance-parts" },
    { label: "TIRES", href: "/tires" },
    { label: "ACCESSORIES", href: "/accessories" },
    { label: "BRANDS", href: "/brands" },
    { label: "BLOG", href: "/blog" },
    { label: "CONTACT US", href: "/contact" },
  ];
}

export async function getDynamicMenus(tenant: TenantConfig): Promise<MenuItem[]> {
    void tenant;
  return [];
}

export async function getMenus(tenant: TenantConfig): Promise<MenuItem[]> {
  const [s, d] = await Promise.all([getStaticMenus(), getDynamicMenus(tenant)]);
  return [...s, ...d];
}
