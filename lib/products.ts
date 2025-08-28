import { notFound } from "next/navigation";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export type CategoryTree = Array<{ name: string; subcategories: string[] }>;

export async function listCategoryTree(): Promise<CategoryTree> {
  // Type the rows explicitly so map() params aren’t implicitly any.
  type SubcatRow = { name: string };
  type CatRow = { name: string; Subcategory: SubcatRow[] };

  const rows: CatRow[] = await prisma.category.findMany({
    select: {
      name: true,
      Subcategory: { select: { name: true }, orderBy: { name: "asc" } },
    },
    orderBy: { name: "asc" },
  });

  return rows.map((c: CatRow) => ({
    name: c.name,
    subcategories: c.Subcategory.map((s: SubcatRow) => s.name),
  }));
}

export async function listFeaturedProducts(limit = 8): Promise<UIProduct[]> {
  const rows = await prisma.product.findMany({
    where: { isFeatured: true },
    include: includeForCard,          // same include used by listProducts
    orderBy: { id: "asc" },
    take: limit,
  });
  return rows.map(toUIProduct);       // same mapper you use elsewhere
}

/**
 * Global price bounds to seed the price filter UI.
 */
export async function listPriceBounds(): Promise<{ min: number; max: number }> {
  const agg = await prisma.product.aggregate({
    _min: { price: true },
    _max: { price: true },
  });
  const min = agg._min.price != null ? Number(agg._min.price) : 0;
  const max = agg._max.price != null ? Number(agg._max.price) : 0;
  return { min, max };
}

export type UIProduct = {
  id: string;
  title: string;
  price: number;
  brand?: string | null;
  category?: string | null;
  subcategory?: string | null;
  image?: string | null;
};

// type CardSelect = Prisma.ProductSelect & {
//   Brand: { select: { name: true } };
//   Subcategory: { select: { name: true; Category: { select: { name: true } } } };
//   ProductImage: { select: { url: true } };
// };

const includeForCard = {
  Brand: { select: { name: true } },
  Subcategory: { select: { name: true, Category: { select: { name: true } } } },
  ProductImage: { select: { url: true }, take: 1 },
} as const;

type CardRow = Prisma.ProductGetPayload<{ include: typeof includeForCard }>;

function toUIProduct(p: CardRow): UIProduct {
  return {
    id: p.id,
    title: p.name,
    price: Number(p.price),
    brand: p.Brand?.name ?? null,
    category: p.Subcategory?.Category?.name ?? null,
    subcategory: p.Subcategory?.name ?? null,
    image: p.ProductImage?.[0]?.url ?? null,
  };
}

export type ListParams = {
  q?: string;
  brand?: string;
  category?: string;
  subcategory?: string;
  take?: number;
  skip?: number;
  min?: number;
  max?: number;
};

export async function listProducts(params: ListParams): Promise<UIProduct[]> {
  const { q, brand, category, subcategory, take = 48, skip = 0, min, max } = params;

  const where: Prisma.ProductWhereInput = {
    ...(q ? { name: { contains: q, mode: "insensitive" } } : {}),
    ...(brand ? { Brand: { name: brand } } : {}),
    ...(subcategory
      ? { Subcategory: { name: subcategory } }
      : category
      ? { Subcategory: { Category: { name: category } } }
      : {}),
    ...(typeof min === "number" || typeof max === "number"
      ? {
          price: {
            ...(typeof min === "number" ? { gte: min } : {}),
            ...(typeof max === "number" ? { lte: max } : {}),
          },
        }
      : {}),
  };

  const rows = await prisma.product.findMany({
    where,
    include: includeForCard,
    orderBy: { id: "asc" },
    take,
    skip,
  });

  return rows.map(toUIProduct);
}

export async function listBrandNames(): Promise<string[]> {
  const rows = await prisma.brand.findMany({ select: { name: true }, orderBy: { name: "asc" } });
  return rows.map((r) => r.name);
}

export async function listCategoryNames(): Promise<string[]> {
  const rows = await prisma.category.findMany({ select: { name: true }, orderBy: { name: "asc" } });
  return rows.map((r) => r.name);
}

export type UIProductDetail = {
  id: string;
  title: string;
  description?: string | null;
  sku?: string | null;
  model?: string | null;
  size?: string | null;
  price: number;
  stock: number;
  brand?: string | null;
  category?: string | null;
  subcategory?: string | null;
  images: string[]; // urls
};

const includeForDetail = {
  Brand: { select: { name: true } },
  Subcategory: { select: { name: true, Category: { select: { name: true } } } },
  ProductImage: { select: { url: true }, orderBy: { id: "asc" as const } },
} satisfies Prisma.ProductInclude;

// type ProductDetailRow = Prisma.ProductGetPayload<{ include: typeof includeForDetail }>;

export async function getProductDetail(id: string): Promise<UIProductDetail> {
  const row = await prisma.product.findUnique({
    where: { id },
    include: includeForDetail,
  });

  if (!row) notFound();

  return {
    id: row.id,
    title: row.name,
    description: row.description,
    sku: row.sku,
    model: row.model,
    size: row.size,
    price: Number(row.price),
    stock: row.stock,
    brand: row.Brand?.name ?? null,
    category: row.Subcategory?.Category?.name ?? null,
    subcategory: row.Subcategory?.name ?? null,
    images: row.ProductImage.map((i) => i.url ?? "/noimage.png"),
  };
}