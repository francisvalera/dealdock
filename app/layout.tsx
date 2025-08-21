import type { Metadata } from "next";
import "./globals.css";
import { Outfit } from "next/font/google";
import { resolveTenantByHost } from "@/lib/tenant";
import { getMenus } from "@/lib/nav";
import { Header } from "@/components/Header";
import { countItems } from "@/lib/cart";

const outfit = Outfit({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const tenant = await resolveTenantByHost();
  const title = tenant.name ?? tenant.brandName;
  return { title, icons: [{ rel: "icon", url: "/favicon.svg" }] };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const tenant = await resolveTenantByHost();
  const menus = await getMenus(tenant);
  const cartCount = await countItems();
  const session: null = null;

  return (
    <html lang="en">
      <body className={outfit.className + " bg-white text-black"}>
        <Header tenant={tenant} menus={menus} session={session} cartCount={cartCount} />
        {children}
      </body>
    </html>
  );
}
