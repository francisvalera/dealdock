// app/api/settings/route.ts
import { NextResponse } from "next/server";
import { getSettings } from "@/lib/settings";

export async function GET() {
  const s = await getSettings();
  return NextResponse.json(s);
}
