import "./globals.css";
import { Header } from "@/components/Header";
import { getMenus } from "@/lib/nav";
import { getCartCount } from "@/lib/cart-cookie";
import { getSettings } from "@/lib/settings";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [menus, cartCount, settings] = await Promise.all([
    getMenus(),
    getCartCount(),
    getSettings(),
  ]);
  const title = settings.name ?? settings.brandName;

  return (
    <html lang="en">
      <head>
        <title>{title}</title>
      </head>
      <body>
        <Header menus={menus} cartCount={Number(cartCount) || 0} />
        {children}
      </body>
    </html>
  );
}