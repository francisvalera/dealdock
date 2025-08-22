import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { allProducts } from "@/lib/productRepo";

export async function GET() {
  const db = await getDb();
  const usingDbHandle = Boolean(db);

  try {
    const list = await allProducts();
    // naive heuristic: if db is connected and returns > 0, assume DB path
    return NextResponse.json({
      hasEnv: Boolean(
        process.env.POSTGRES_URL ||
        process.env.DATABASE_URL ||
        process.env.POSTGRES_URL_NON_POOLING ||
        process.env.DATABASE_URL_NON_POOLING
      ),
      dbHandle: usingDbHandle,
      sampleFirst: list[0] ?? null,
      count: list.length,
    });
  } catch (e) {
    return NextResponse.json({
      hasEnv: true,
      dbHandle: usingDbHandle,
      error: String(e),
    });
  }
}
