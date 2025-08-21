import { NextResponse } from "next/server";
import { readCart } from "@/lib/cart";

export async function GET() {
  const cart = await readCart();
  return NextResponse.json(cart);
}