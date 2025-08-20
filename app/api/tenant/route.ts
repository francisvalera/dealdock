import { NextResponse } from "next/server";
import { resolveTenantByHost } from "@/lib/tenant";

// remove the param so ESLint is happy
export async function GET() {
  const tenant = await resolveTenantByHost();
  return NextResponse.json(tenant);
}
