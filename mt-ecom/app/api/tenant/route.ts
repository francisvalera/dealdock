import { NextResponse } from "next/server";
import { resolveTenantByHost } from "@/lib/tenant";

export async function GET() {
  const tenant = await resolveTenantByHost();
  return NextResponse.json(tenant);
}
