import { NextResponse } from "next/server";
import { resolveTenantByHost } from "@/lib/tenant";

export async function GET(request: Request) {
  try {
    const tenant = await resolveTenantByHost();
    return NextResponse.json(tenant, { status: 200 });
  } catch (err) {
    // Surface errors so we can see what's failing from the browser/terminal
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: "resolveTenantByHost failed", message },
      { status: 500 },
    );
  }
}
