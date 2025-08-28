"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

export type CategoryTree = Array<{ name: string; subcategories: string[] }>;

export type Facets = {
  brands: string[];
  categories: CategoryTree;
  /** Optional tick marks for a price slider/range, if you add one later */
  priceSteps?: number[];
};

export default function ShopFilters({ facets }: { facets: Facets }) {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function setParam(key: string, value: string | null) {
    const params = new URLSearchParams(sp.toString());
    if (value && value.length) params.set(key, value);
    else params.delete(key);
    router.replace(`${pathname}?${params.toString()}`);
  }

  const selectedCategory = sp.get("category") ?? "";
  const selectedSubcategory = sp.get("subcategory") ?? "";
  const selectedBrand = sp.get("brand") ?? "";
  const q = sp.get("q") ?? "";
  const min = sp.get("min") ?? "";
  const max = sp.get("max") ?? "";

  const flatCategories = useMemo(
    () => facets.categories.map((c) => c.name),
    [facets.categories]
  );

  const subcatsForSelected = useMemo(() => {
    const found = facets.categories.find((c) => c.name === selectedCategory);
    return found ? found.subcategories : [];
  }, [facets.categories, selectedCategory]);

  return (
    <aside className="md:col-span-1 rounded-2xl border border-gray-200 bg-white p-4 md:p-5">
      {/* Search */}
      <div className="mb-5">
        <div className="text-xs font-semibold text-gray-600 mb-2">SEARCH</div>
        <input
          defaultValue={q}
          onChange={(e) => setParam("q", e.currentTarget.value || null)}
          placeholder="Find parts…"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      {/* Category */}
      <div className="mb-5">
        <div className="text-xs font-semibold text-gray-600 mb-2">CATEGORY</div>
        <div className="space-y-2">
          {flatCategories.map((cat) => {
            const checked = selectedCategory === cat;
            return (
              <label key={cat} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => {
                    if (e.currentTarget.checked) {
                      setParam("category", cat);
                    } else {
                      setParam("category", null);
                      setParam("subcategory", null);
                    }
                  }}
                />
                <span>{cat}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Subcategory (depends on Category) */}
      {selectedCategory && (
        <div className="mb-5">
          <div className="text-xs font-semibold text-gray-600 mb-2">SUBCATEGORY</div>
          <div className="space-y-2">
            {subcatsForSelected.map((sub) => {
              const checked = selectedSubcategory === sub;
              return (
                <label key={sub} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => {
                      if (e.currentTarget.checked) setParam("subcategory", sub);
                      else setParam("subcategory", null);
                    }}
                  />
                  <span>{sub}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Brand */}
      <div className="mb-5">
        <div className="text-xs font-semibold text-gray-600 mb-2">BRAND</div>
        <div className="space-y-2">
          {facets.brands.map((b) => {
            const checked = selectedBrand === b;
            return (
              <label key={b} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => {
                    if (e.currentTarget.checked) setParam("brand", b);
                    else setParam("brand", null);
                  }}
                />
                <span>{b}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-2">
        <div className="text-xs font-semibold text-gray-600 mb-2">PRICE (₱)</div>
        <div className="flex items-center gap-2">
          <input
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Min"
            defaultValue={min}
            onChange={(e) => setParam("min", e.currentTarget.value || null)}
            className="w-1/2 rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
          <span className="text-gray-400">—</span>
          <input
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Max"
            defaultValue={max}
            onChange={(e) => setParam("max", e.currentTarget.value || null)}
            className="w-1/2 rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
      </div>
    </aside>
  );
}
