import Image from "next/image";
import Link from "next/link";              // ← add this
import type { TenantConfig } from "@/lib/tenant";

export default function Footer({ tenant }: { tenant: TenantConfig }) {
  return (
    <footer className="footer-gradient text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <Image src={tenant.logoUrl} alt={`${tenant.brandName} Logo`} width={48} height={48} className="h-12 w-12 rounded-xl" />
              <div>
                <h3 className="text-2xl font-bold text-white">{tenant.brandName}</h3>
                <p className="text-sm text-gray-300">MOTORCYCLE TRADING</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              Your trusted partner for premium motorcycle parts and accessories. Quality products, expert service, unbeatable prices.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-white">QUICK LINKS</h4>
            <ul className="space-y-3 text-gray-300">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><Link href="/products" className="hover:text-white">All Parts</Link></li>
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-white">SERVICES</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold text-white mb-3">PAYMENT</h5>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>Cash on Delivery</li>
                  <li>BDO / GCash</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-white mb-3">DELIVERY</h5>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>LBC / J&amp;T</li>
                  <li>Local Pickup</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} {tenant.name ?? tenant.brandName}. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/terms" className="text-sm text-gray-400 hover:text-white">Terms of Service</Link>
              <Link href="/privacy" className="text-sm text-gray-400 hover:text-white">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
