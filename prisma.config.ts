// prisma.config.ts (repo root)
import { defineConfig } from "prisma/config";
import "dotenv/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx scripts/seed/single-tenant.ts --dir ./seed-json",
  },
});
