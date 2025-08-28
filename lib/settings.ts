// lib/settings.ts
import { prisma } from "@/lib/prisma";
import { cache } from "react";

export type SiteSettings = {
  brandName: string;
  name: string;
  logoUrl: string;
  promoStrip: string;
  emailOrdersEnabled: boolean;
  storeEmail: string;
};

export const getSettings = cache(async (): Promise<SiteSettings> => {
  const s = await prisma.settings.findFirst({
    select: {
      storeName: true,
      name: true,
      storeEmail: true,
      emailOrdersEnabled: true,
    },
  });

  const brand = (s?.storeName ?? "KUYA KARDS").trim();
  const siteName = (s?.name ?? brand).trim();

  return {
    brandName: brand,
    name: siteName,
    logoUrl: "/favicon.svg",
    promoStrip:
      "FREE SHIPPING ON ORDERS OVER ₱2,000! • CASH ON DELIVERY • FAST SHIPPING NATIONWIDE",
    emailOrdersEnabled: s?.emailOrdersEnabled ?? true,
    storeEmail: s?.storeEmail ?? "",
  };
});
