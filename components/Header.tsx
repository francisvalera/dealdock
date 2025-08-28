import Image from "next/image";
import Link from "next/link";
import { Menu, Search, LogIn } from "lucide-react";
import type { MenuItem } from "@/lib/nav";
import { AdminGate } from "@/components/admin/AdminGate";
// import CartButton from "@/components/cart/CartButton";
// import { getCartCount } from "@/lib/cart-cookie";
import { getSettings } from "@/lib/settings";
import CartBadgeCount from "@/components/cart/CartBadgeCount";

export type SessionStub = {
  user?: { name?: string | null } | null;
  userTenant?: { role?: "ADMIN" | "STAFF" | "CUSTOMER" | null } | null;
};

export async function Header({
  menus,
  cartCount,
  session,
}: {
  menus: MenuItem[];
  cartCount?: number;
  session?: SessionStub | null;
}) {
  const s = await getSettings();
  // const initialCartCount = typeof cartCount === "number" ? cartCount : await getCartCount();

  return (
    <>
      {/* Promo strip */}
      <div id="promoStrip" className="bg-red-600 text-white text-xs font-semibold">
        <div className="relative overflow-hidden">
          <div className="marquee py-2">{s.promoStrip}</div>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-white/95 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <Image src={s.logoUrl} alt={`${s.brandName} Logo`} width={48} height={48} className="h-12 w-12 rounded-xl shadow-sm" />
              <div>
                <h1 className="brand-text text-2xl leading-6">{s.brandName}</h1>
                <p className="text-xs text-gray-500 font-medium tracking-wider uppercase">Motorcycle Trading</p>
              </div>
            </Link>

            <div className="mx-4 hidden md:flex md:flex-1 justify-center">
              <div className="relative w-full max-w-[520px] lg:max-w-[600px]">
                <input
                  placeholder="Search for parts, brands..."
                  className="w-full rounded-full border border-gray-200 bg-gray-50 pl-5 pr-10 py-3 outline-none focus:bg-white focus:border-gray-300"
                />
                <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/cart" className="relative p-2" aria-label="Shopping cart">
                {/* replace the old span with: */}
                <CartBadgeCount initial={cartCount ?? 0} />
                <Image src="/carticon.png" alt="Cart" width={24} height={24} className="h-6 w-6 object-contain" />
              </Link>
              {/* <CartButton initialCount={initialCartCount} /> */}
              {session?.user ? (
                <div className="hidden md:block text-right leading-tight">
                  <div className="text-sm text-gray-700">Hello, {session.user.name ?? "Kardo"}!</div>
                  <AdminGate role={session?.userTenant?.role ?? "ADMIN"}>
                    <Link href="/admin" className="text-xs text-red-600 font-semibold">Admin Panel</Link>
                  </AdminGate>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="hidden md:inline-flex h-9 items-center gap-2 rounded-full bg-black px-4 text-sm font-semibold text-white leading-none shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                >
                  <LogIn size={16} /> <span>Login</span>
                </Link>
              )}
              <button className="md:hidden p-2" aria-label="Open menu"><Menu size={24} /></button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200" />

        <nav className="flex items-center justify-center h-12 text-[13px] md:text-sm font-bold">
          <ul className="flex w-full justify-center gap-9 lg:gap-12 xl:gap-16 px-4">
            {menus.map((m) => {
              const hasDropdown = ["HELMETS & GEARS","PERFORMANCE PARTS","TIRES","ACCESSORIES"].includes(m.label);
              return (
                <li key={m.href} className="relative group">
                  <Link
                    href={m.href}
                    className="uppercase text-gray-800 tracking-wide relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:h-[3px] after:bg-red-600 after:w-0 group-hover:after:w-full transition-[width] duration-200"
                  >
                    {m.label}
                  </Link>
                  {hasDropdown && (
                    <div className="pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 opacity-0 absolute left-1/2 -translate-x-1/2 top-9 bg-white border border-gray-200 shadow-lg rounded-lg p-4 min-w-[260px]">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <Link href={`${m.href}/category-a`} className="hover:text-red-600">Category A</Link>
                        <Link href={`${m.href}/category-b`} className="hover:text-red-600">Category B</Link>
                        <Link href={`${m.href}/category-c`} className="hover:text-red-600">Category C</Link>
                        <Link href={`${m.href}/category-d`} className="hover:text-red-600">Category D</Link>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
    </>
  );
}


// import Image from "next/image";
// import Link from "next/link";
// import { Menu, Search, LogIn } from "lucide-react";
// import type { TenantConfig } from "@/lib/tenant";
// import type { MenuItem } from "@/lib/nav";
// import { AdminGate } from "@/components/admin/AdminGate";
// import CartButton from "@/components/cart/CartButton";
// import { getCartCount } from "@/lib/cart-cookie";

// export type SessionStub = {
//   user?: { name?: string | null } | null;
//   userTenant?: { role?: "ADMIN" | "STAFF" | "CUSTOMER" | null } | null;
// };

// export async function Header({
//   tenant,
//   menus,
//   cartCount,
//   session,
// }: {
//   tenant: TenantConfig;
//   menus: MenuItem[];
//   cartCount?: number;  // optional override
//   session?: SessionStub | null;
// }) {
//   const brandName = tenant.brandName ?? "KUYA KARDS";
//   const logoUrl = tenant.logoUrl ?? "/favicon.svg";

//   // Seed client badge with server-known count (Next 15: await cookies()).
//   const initialCartCount = typeof cartCount === "number" ? cartCount : await getCartCount();

//   return (
//     <>
//       {/* Promo strip */}
//       <div id="promoStrip" className="bg-red-600 text-white text-xs font-semibold">
//         <div className="relative overflow-hidden">
//           <div className="marquee py-2">
//             FREE SHIPPING ON ORDERS OVER ₱2,000! • CASH ON DELIVERY • FAST SHIPPING NATIONWIDE •
//             FREE SHIPPING ON ORDERS OVER ₱2,000! • CASH ON DELIVERY • FAST SHIPPING NATIONWIDE •
//           </div>
//         </div>
//       </div>

//       <header className="sticky top-0 z-50 bg-white/95 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-20">
//             <Link href="/" className="flex items-center space-x-3">
//               <Image src={logoUrl} alt={`${brandName} Logo`} width={48} height={48} className="h-12 w-12 rounded-xl shadow-sm" />
//               <div>
//                 <h1 className="brand-text text-2xl leading-6">{brandName}</h1>
//                 <p className="text-xs text-gray-500 font-medium tracking-wider uppercase">Motorcycle Trading</p>
//               </div>
//             </Link>

//             <div className="hidden md:flex md:flex-1 justify-center mx-4">
//               <div className="relative w-full max-w-[520px] lg:max-w-[600px]">
//                 <input
//                   placeholder="Search for parts, brands..."
//                   className="w-full rounded-full border border-gray-200 bg-gray-50 pl-5 pr-10 py-3 outline-none focus:bg-white focus:border-gray-300"
//                 />
//                 <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
//               </div>
//             </div>

//             <div className="flex items-center gap-4">
//               <CartButton initialCount={initialCartCount} />

//               {session?.user ? (
//                 <div className="hidden md:block text-right leading-tight">
//                   <div className="text-sm text-gray-700">Hello, {session.user.name ?? "Kardo"}!</div>
//                   <AdminGate role={session?.userTenant?.role ?? "ADMIN"}>
//                     <Link href="/admin" className="text-xs text-red-600 font-semibold">Admin Panel</Link>
//                   </AdminGate>
//                 </div>
//               ) : (
//                 <Link
//                   href="/login"
//                   className="hidden md:inline-flex h-9 items-center gap-2 rounded-full bg-black px-4 text-sm font-semibold text-white leading-none shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
//                 >
//                   <LogIn size={16} /> <span>Login</span>
//                 </Link>
//               )}

//               <button className="md:hidden p-2" aria-label="Open menu">
//                 <Menu size={24} />
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="border-t border-gray-200" />

//         <nav className="flex items-center justify-center h-12 text-[13px] md:text-sm font-bold">
//           <ul className="flex w-full justify-center gap-9 lg:gap-12 xl:gap-16 px-4">
//             {menus.map((m) => {
//               const hasDropdown = ["HELMETS & GEARS", "PERFORMANCE PARTS", "TIRES", "ACCESSORIES"].includes(m.label);
//               return (
//                 <li key={m.href} className="relative group">
//                   <Link
//                     href={m.href}
//                     className="uppercase text-gray-800 tracking-wide relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:h-[3px] after:bg-red-600 after:w-0 group-hover:after:w-full transition-[width] duration-200"
//                   >
//                     {m.label}
//                   </Link>
//                   {hasDropdown && (
//                     <div className="pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 opacity-0 absolute left-1/2 -translate-x-1/2 top-9 bg-white border border-gray-200 shadow-lg rounded-lg p-4 min-w-[260px]">
//                       <div className="grid grid-cols-2 gap-3 text-sm">
//                         <Link href={`${m.href}/category-a`} className="hover:text-red-600">Category A</Link>
//                         <Link href={`${m.href}/category-b`} className="hover:text-red-600">Category B</Link>
//                         <Link href={`${m.href}/category-c`} className="hover:text-red-600">Category C</Link>
//                         <Link href={`${m.href}/category-d`} className="hover:text-red-600">Category D</Link>
//                       </div>
//                     </div>
//                   )}
//                 </li>
//               );
//             })}
//           </ul>
//         </nav>
//       </header>
//     </>
//   );
// }
