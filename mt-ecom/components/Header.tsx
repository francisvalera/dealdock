import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Menu, Phone, CircleUserRound } from "lucide-react";
import type { TenantConfig } from "@/lib/tenant.v1";
import { AdminGate } from "@/components/admin/AdminGate";

export type SessionStub = {
  user?: { name?: string | null } | null;
  userTenant?: { role?: "ADMIN" | "STAFF" | "CUSTOMER" | null } | null;
};

export function Header({
  tenant,
  cartCount = 0,
  session,
}: {
  tenant: TenantConfig;
  cartCount?: number;
  session?: SessionStub | null;
}) {
  return (
    <header className="w-full">
      {/* Top black strip (matches homepage.html) */}
      <div className="bg-black text-white py-2 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              {tenant.phone ? (
                <span className="flex items-center">
                  <Phone size={12} className="mr-1" /> {tenant.phone}
                </span>
              ) : (
                <span className="flex items-center">
                  <Phone size={12} className="mr-1" /> Contact us
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <span>{tenant.freeShippingText ?? "Free shipping on orders over ₱2,000"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky main header (strict to homepage.html) */}
      <div id="main-header" className="sticky top-0 z-50 transition-all duration-300 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand */}
            <Link href="/" className="flex items-center space-x-3">
              <Image src={tenant.logoUrl} alt={`${tenant.brandName} Logo`} width={48} height={48} className="h-12 w-12 rounded-xl shadow-md" />
              <div>
                <h1 className="brand-text text-2xl">{tenant.brandName}</h1>
                <p className="text-xs text-gray-500 font-medium tracking-wider uppercase">Motorcycle Trading</p>
              </div>
            </Link>

            {/* Menus */}
            <nav className="hidden md:flex items-center space-x-8">
              {tenant.menus.map((m) => (
                <Link key={m.href} href={m.href} className="nav-item">
                  {m.label}
                </Link>
              ))}
              {/* Admin-only link surfaced via AdminGate */}
              <AdminGate role={session?.userTenant?.role ?? null}>
                <Link href="/admin" className="nav-item text-red-600">
                  ADMIN
                </Link>
              </AdminGate>
            </nav>

            {/* Right cluster: Cart, Auth, Mobile menu */}
            <div className="flex items-center space-x-2">
              <Link href="/cart" className="relative group p-2">
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Auth */}
              {session?.user ? (
                <Link href="/account" className="hidden sm:flex items-center btn btn-primary gap-2">
                  <CircleUserRound size={18} />
                  <span className="truncate max-w-[10rem]">{session.user.name ?? "Account"}</span>
                </Link>
              ) : (
                <Link href="/signin" className="btn btn-primary hidden sm:flex">
                  Sign In
                </Link>
              )}

              {/* Mobile menu button */}
              <button className="md:hidden p-2" aria-label="Open menu">
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}