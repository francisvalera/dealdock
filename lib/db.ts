// lib/db.ts
import "server-only";
import { createPool, createClient } from "@vercel/postgres";

// Reuse a single connection/pool across invocations
type SQLHandle = ReturnType<typeof createPool> | ReturnType<typeof createClient>;
let handlePromise: Promise<SQLHandle> | null = null;

/**
 * Returns a sql-capable handle:
 * - Prefers NON_POOLING url with createClient (direct connection)
 * - Otherwise falls back to pooled url with createPool
 * Accepts either POSTGRES_* or DATABASE_* envs.
 */
export async function getDb(): Promise<SQLHandle | null> {
  const nonPooling =
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.DATABASE_URL_NON_POOLING ||
    "";
  const pooling =
    process.env.POSTGRES_URL ||
    process.env.DATABASE_URL ||
    "";

  if (!nonPooling && !pooling) return null;

  if (!handlePromise) {
    if (nonPooling) {
      const client = createClient({ connectionString: nonPooling });
      handlePromise = client.connect().then(() => client);
    } else {
      const pool = createPool({ connectionString: pooling });
      handlePromise = Promise.resolve(pool);
    }
  }

  return handlePromise;
}
