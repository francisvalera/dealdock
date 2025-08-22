import { NextResponse } from "next/server";
import { allProducts } from "@/lib/productRepo";

export async function GET() {
  const data = await allProducts();
  return NextResponse.json({ count: data.length, sample: data.slice(0, 4) });
}
