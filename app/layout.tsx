import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { resolveTenantByHost } from "@/lib/tenant";
import { Header } from "@/components/Header"; // named import

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kuya Kardz - Motorcycle Parts & Accessories",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const tenant = await resolveTenantByHost();
  const session = null as const;
  return (
    <html lang="en">
      <body className={inter.className + " bg-white text-black"}>
        <Header tenant={tenant} session={session} cartCount={0} />
        {children}
      </body>
    </html>
  );
}
