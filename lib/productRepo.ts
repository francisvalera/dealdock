import "server-only";
import type { Product } from "@/lib/data/products";
import { PRODUCTS } from "@/lib/data/products";
import { getDb } from "@/lib/db";

type DbRow = {
  id: string;
  title: string | null;      // Product.name
  brand: string | null;      // Brand.name
  category: string | null;   // Subcategory.name
  price: number | string | null;
  image: string | null;      // none in schema; we fallback
  is_featured: boolean | null;
};

function mapRow(r: DbRow): Product {
  return {
    id: String(r.id),
    title: r.title ?? "",
    brand: r.brand ?? "",
    category: r.category ?? "",
    price: Number(r.price ?? 0),
    image: r.image ?? "/kklogo.jpg",
    isFeatured: Boolean(r.is_featured ?? false),
  };
}

export async function allProducts(tenantSlug?: string): Promise<Product[]> {
  const db = await getDb();
  if (!db) return PRODUCTS;
  try {
    if (!tenantSlug) {
      // no slug → show active from all tenants (safe default)
      const { rows } = await db.sql<DbRow>`
        select p.id::text as id, p.name as title, b.name as brand, s.name as category,
               p.price, null::text as image, coalesce(p."isFeatured", false) as is_featured
        from "Product" p
        left join "Brand"       b on b.id = p."brandId"
        left join "Subcategory" s on s.id = p."subcategoryId"
        where coalesce(p.active, true) = true
        order by p."createdAt" desc
        limit 200
      `;
      return rows.map(mapRow);
    }

    const { rows } = await db.sql<DbRow>`
      select p.id::text as id, p.name as title, b.name as brand, s.name as category,
             p.price, null::text as image, coalesce(p."isFeatured", false) as is_featured
      from "Product" p
      left join "Brand"       b on b.id = p."brandId"
      left join "Subcategory" s on s.id = p."subcategoryId"
      join "Tenant"           t on t.id = p."tenantId"
      where coalesce(p.active, true) = true
        and t.slug = ${tenantSlug}
      order by p."createdAt" desc
      limit 200
    `;
    return rows.map(mapRow);
  } catch (e) {
    console.error("[productRepo] allProducts fallback:", e);
    return PRODUCTS;
  }
}

export async function featuredProducts(limit = 8, tenantSlug?: string): Promise<Product[]> {
  const db = await getDb();
  if (!db) return PRODUCTS.filter((p) => p.isFeatured).slice(0, limit);
  try {
    if (!tenantSlug) {
      const { rows } = await db.sql<DbRow>`
        select p.id::text as id, p.name as title, b.name as brand, s.name as category,
               p.price, null::text as image, coalesce(p."isFeatured", false) as is_featured
        from "Product" p
        left join "Brand"       b on b.id = p."brandId"
        left join "Subcategory" s on s.id = p."subcategoryId"
        where coalesce(p.active, true) = true
          and coalesce(p."isFeatured", false) = true
        order by p."createdAt" desc
        limit ${limit}
      `;
      return rows.map(mapRow);
    }

    const { rows } = await db.sql<DbRow>`
      select p.id::text as id, p.name as title, b.name as brand, s.name as category,
             p.price, null::text as image, coalesce(p."isFeatured", false) as is_featured
      from "Product" p
      left join "Brand"       b on b.id = p."brandId"
      left join "Subcategory" s on s.id = p."subcategoryId"
      join "Tenant"           t on t.id = p."tenantId"
      where coalesce(p.active, true) = true
        and coalesce(p."isFeatured", false) = true
        and t.slug = ${tenantSlug}
      order by p."createdAt" desc
      limit ${limit}
    `;
    return rows.map(mapRow);
  } catch (e) {
    console.error("[productRepo] featuredProducts fallback:", e);
    return PRODUCTS.filter((p) => p.isFeatured).slice(0, limit);
  }
}

export async function brandsAndCategories(tenantSlug?: string): Promise<{ brands: string[]; categories: string[] }> {
  const db = await getDb();
  if (!db) {
    const brands = Array.from(new Set(PRODUCTS.map((p) => p.brand))).sort();
    const categories = Array.from(new Set(PRODUCTS.map((p) => p.category))).sort();
    return { brands, categories };
  }
  try {
    if (!tenantSlug) {
      const b = await db.sql<{ brand: string | null }>`
        select distinct b.name as brand
        from "Product" p left join "Brand" b on b.id = p."brandId"
        where coalesce(p.active, true) = true
        order by brand asc
      `;
      const c = await db.sql<{ category: string | null }>`
        select distinct s.name as category
        from "Product" p left join "Subcategory" s on s.id = p."subcategoryId"
        where coalesce(p.active, true) = true
        order by category asc
      `;
      return {
        brands: b.rows.map((r) => r.brand).filter((v): v is string => Boolean(v)),
        categories: c.rows.map((r) => r.category).filter((v): v is string => Boolean(v)),
      };
    }

    const b = await db.sql<{ brand: string | null }>`
      select distinct b.name as brand
      from "Product" p
      left join "Brand" b on b.id = p."brandId"
      join "Tenant" t on t.id = p."tenantId"
      where coalesce(p.active, true) = true
        and t.slug = ${tenantSlug}
      order by brand asc
    `;
    const c = await db.sql<{ category: string | null }>`
      select distinct s.name as category
      from "Product" p
      left join "Subcategory" s on s.id = p."subcategoryId"
      join "Tenant" t on t.id = p."tenantId"
      where coalesce(p.active, true) = true
        and t.slug = ${tenantSlug}
      order by category asc
    `;
    return {
      brands: b.rows.map((r) => r.brand).filter((v): v is string => Boolean(v)),
      categories: c.rows.map((r) => r.category).filter((v): v is string => Boolean(v)),
    };
  } catch (e) {
    console.error("[productRepo] brandsAndCategories fallback:", e);
    const brands = Array.from(new Set(PRODUCTS.map((p) => p.brand))).sort();
    const categories = Array.from(new Set(PRODUCTS.map((p) => p.category))).sort();
    return { brands, categories };
  }
}

export async function listProductsFiltered(
  opts: { q?: string; brand?: string; category?: string },
  tenantSlug?: string
): Promise<Product[]> {
  const list = await allProducts(tenantSlug); // keep filtering in memory for now
  const q = (opts.q ?? "").toLowerCase();
  return list.filter((p) =>
    (q ? p.title.toLowerCase().includes(q) : true) &&
    (opts.brand ? p.brand === opts.brand : true) &&
    (opts.category ? p.category === opts.category : true)
  );
}
