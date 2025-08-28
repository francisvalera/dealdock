import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { getSettings } from "@/lib/settings";

export default async function Footer() {
  const s = await getSettings();

  return (
    <footer className="bg-neutral-950 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image src={s.logoUrl} alt={`${s.brandName} Logo`} width={44} height={44} className="h-11 w-11 rounded-lg" />
              <div>
                <h4 className="text-xl font-extrabold leading-5">{s.brandName}</h4>
                <p className="text-sm text-neutral-300">Motorcycle Trading</p>
              </div>
            </div>
            <p className="text-neutral-300">Your trusted partner for premium motorcycle parts and accessories.</p>
          </div>

          <div>
            <h5 className="text-sm font-extrabold tracking-wide">OUR LOCATIONS</h5>
            <div className="mt-4 space-y-5">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 text-red-500" />
                <div>
                  <div className="font-semibold">Valenzuela City</div>
                  <div className="text-sm text-neutral-300">20 G. Molina St., Canumay East</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 text-red-500" />
                <div>
                  <div className="font-semibold">Aurora Province</div>
                  <div className="text-sm text-neutral-300">Brgy. Wenceslao, Maria Aurora</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h6 className="text-sm font-extrabold tracking-wide">PAYMENT</h6>
              <ul className="mt-3 space-y-1 text-sm text-neutral-300">
                <li>Cash on Delivery</li>
                <li>GCash / Maya</li>
              </ul>
            </div>
            <div>
              <h6 className="text-sm font-extrabold tracking-wide">DELIVERY</h6>
              <ul className="mt-3 space-y-1 text-sm text-neutral-300">
                <li>LBC / J&amp;T</li>
                <li>Local Pickup</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10" />
        <div className="mt-6 flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-neutral-400">
            © {new Date().getFullYear()} {s.name}. All rights reserved.
          </p>
          <nav className="flex items-center gap-6">
            <Link href="/about" className="text-sm text-neutral-300 hover:text-white">About Us</Link>
            <Link href="/contact" className="text-sm text-neutral-300 hover:text-white">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}


// // components/home/Footer.tsx
// import Image from "next/image";
// import Link from "next/link";
// import type { TenantConfig } from "@/lib/tenant";
// import { MapPin } from "lucide-react";

// export default function Footer({ tenant }: { tenant: TenantConfig }) {
//   const brandName = tenant.brandName ?? "KUYA KARDS";
//   const displayName = tenant.name ?? brandName;
//   const logoUrl = tenant.logoUrl ?? "/favicon.svg";

//   return (
//     <footer className="bg-neutral-950 text-white">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
//         <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
//           {/* Brand / Blurb */}
//           <div className="space-y-4">
//             <div className="flex items-center gap-3">
//               <Image src={logoUrl} alt={`${brandName} Logo`} width={44} height={44} className="h-11 w-11 rounded-lg" />
//               <div>
//                 <h4 className="text-xl font-extrabold leading-5">{brandName}</h4>
//                 <p className="text-sm text-neutral-300">Motorcycle Trading</p>
//               </div>
//             </div>
//             <p className="text-neutral-300">
//               Your trusted partner for premium motorcycle parts and accessories.
//             </p>
//           </div>

//           {/* Locations */}
//           <div>
//             <h5 className="text-sm font-extrabold tracking-wide">OUR LOCATIONS</h5>
//             <div className="mt-4 space-y-5">
//               <div className="flex items-start gap-3">
//                 <MapPin size={18} className="mt-0.5 text-red-500" />
//                 <div>
//                   <div className="font-semibold">Valenzuela City</div>
//                   <div className="text-sm text-neutral-300">20 G. Molina St., Canumay East</div>
//                 </div>
//               </div>
//               <div className="flex items-start gap-3">
//                 <MapPin size={18} className="mt-0.5 text-red-500" />
//                 <div>
//                   <div className="font-semibold">Aurora Province</div>
//                   <div className="text-sm text-neutral-300">Brgy. Wenceslao, Maria Aurora</div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Services */}
//           <div className="grid grid-cols-2 gap-6">
//             <div>
//               <h6 className="text-sm font-extrabold tracking-wide">PAYMENT</h6>
//               <ul className="mt-3 space-y-1 text-sm text-neutral-300">
//                 <li>Cash on Delivery</li>
//                 <li>GCash / Maya</li>
//               </ul>
//             </div>
//             <div>
//               <h6 className="text-sm font-extrabold tracking-wide">DELIVERY</h6>
//               <ul className="mt-3 space-y-1 text-sm text-neutral-300">
//                 <li>LBC / J&amp;T</li>
//                 <li>Local Pickup</li>
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* Divider */}
//         <div className="mt-10 border-t border-white/10" />

//         {/* Bottom bar */}
//         <div className="mt-6 flex flex-col items-center justify-between gap-4 md:flex-row">
//           <p className="text-sm text-neutral-400">
//             © {new Date().getFullYear()} {displayName}. All rights reserved.
//           </p>
//           <nav className="flex items-center gap-6">
//             <Link href="/about" className="text-sm text-neutral-300 hover:text-white">About Us</Link>
//             <Link href="/contact" className="text-sm text-neutral-300 hover:text-white">Contact</Link>
//           </nav>
//         </div>
//       </div>
//     </footer>
//   );
// }
