import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

type Props = { tenant: { brandName: string; logoUrl: string } };

export default function Footer({ tenant }: Props) {
  return (
    <footer className="bg-gradient-to-br from-[#0b1220] to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Brand + blurb */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <Image src={tenant.logoUrl} alt={`${tenant.brandName} logo`} width={48} height={48} className="h-12 w-12 rounded-xl" />
              <div>
                <h3 className="text-2xl font-bold">{tenant.brandName}</h3>
                <p className="text-sm text-white/70">Motorcycle Trading</p>
              </div>
            </div>
            <p className="text-white/80">
              Your trusted partner for premium motorcycle parts and accessories. Quality products, expert service,
              unbeatable prices.
            </p>
          </div>

          {/* Locations */}
          <div>
            <h4 className="font-bold text-lg mb-4">OUR LOCATIONS</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-red-500" />
                <div>
                  <p className="font-semibold">Valenzuela City</p>
                  <p className="text-sm text-white/70">20 G. Molina St., Canumay East</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-red-500" />
                <div>
                  <p className="font-semibold">Aurora Province</p>
                  <p className="text-sm text-white/70">Brgy. Wenceslao, Maria Aurora</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-4">SERVICES</h4>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold mb-2">PAYMENT</h5>
                <ul className="space-y-1 text-sm text-white/80">
                  <li>Cash on Delivery</li>
                  <li>GCash / Maya</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold mb-2">DELIVERY</h5>
                <ul className="space-y-1 text-sm text-white/80">
                  <li>LBC / J&T</li>
                  <li>Local Pickup</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} {tenant.brandName}. All rights reserved.
          </p>
          <nav className="flex gap-6 mt-4 md:mt-0">
            <Link href="/about" className="text-sm text-white/70 hover:text-white">About Us</Link>
            <Link href="/contact" className="text-sm text-white/70 hover:text-white">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
