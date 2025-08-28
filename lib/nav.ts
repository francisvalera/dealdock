export type MenuItem = { label: string; href: string };

export async function getStaticMenus(): Promise<MenuItem[]> {
  return [
    { label: "SHOP", href: "/shop" },
    { label: "HELMETS & GEARS", href: "/shop?category=Helmets%20%26%20Gears" },
    { label: "PERFORMANCE PARTS", href: "/shop?category=Performance%20Parts" },
    { label: "TIRES", href: "/shop?category=Tires" },
    { label: "ACCESSORIES", href: "/shop?category=Accessories" },
    { label: "BLOG", href: "/blog" },
  ];
}

export async function getMenus(): Promise<MenuItem[]> {
  // If you later want DB-driven menus, fetch here (no tenant arg anymore).
  return getStaticMenus();
}
