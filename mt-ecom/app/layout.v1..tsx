import type { Metadata } from "next";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { resolveTenantByHost } from "@/lib/tenant.v1";
import { Header } from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kuya Kardz - Motorcycle Parts & Accessories",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const tenant = await resolveTenantByHost();

  // Stub session. Swap with real auth later (e.g., next-auth).
  const session = null as const; // or { user: { name: "Kiko" }, userTenant: { role: "ADMIN" } }

  return (
    <html lang="en">
      <body className={inter.className + " bg-white text-black"}>
        <Header tenant={tenant} session={session} cartCount={0} />
        {children}
      </body>
    </html>
  );
}