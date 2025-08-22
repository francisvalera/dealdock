// app/api/db-check/route.ts
import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  const hasEnv = Boolean(
    process.env.POSTGRES_URL ||
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.DATABASE_URL_NON_POOLING
  );
  const db = await getDb();
  if (!db) return NextResponse.json({ hasEnv, db: false, error: hasEnv ? "Failed to init DB handle" : "No DB env" });
  try {
    const { rows } = await db.sql`select 1 as ok`;
    return NextResponse.json({ hasEnv: true, db: rows[0]?.ok === 1 });
  } catch (e) {
    return NextResponse.json({ hasEnv: true, db: false, error: String(e) });
  }
}
