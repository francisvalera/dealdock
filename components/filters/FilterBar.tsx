"use client";
import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function FilterBar({
  brands,
  categories,
}: {
  brands: string[];
  categories: string[];
}) {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // normalize + unique (case-insensitive, trimmed, stable-sorted)
  const keyOf = (s: string) => s.trim().toLowerCase();
  const norm = (s: string) => s.trim();

  const uniqueBrands = useMemo(() => {
    const map = new Map<string, string>();
    for (const b of brands ?? []) {
      const t = norm(b ?? "");
      if (!t) continue;
      const k = keyOf(t);
      if (!map.has(k)) map.set(k, t);
    }
    return Array.from(map.values()).sort((a, b) =>
      a.localeCompare(b, "en-PH", { sensitivity: "base" })
    );
  }, [brands]);

  const uniqueCategories = useMemo(() => {
    const map = new Map<string, string>();
    for (const c of categories ?? []) {
      const t = norm(c ?? "");
      if (!t) continue;
      const k = keyOf(t);
      if (!map.has(k)) map.set(k, t);
    }
    return Array.from(map.values()).sort((a, b) =>
      a.localeCompare(b, "en-PH", { sensitivity: "base" })
    );
  }, [categories]);

  function setParam(key: string, value: string | null) {
    const params = new URLSearchParams(sp.toString());
    if (value && value.length) params.set(key, value);
    else params.delete(key);
    router.replace(`${pathname}?${params.toString()}`);
  }

  // controlled values based on current URL
  const q = sp.get("q") ?? "";
  const brand = sp.get("brand") ?? "";
  const category = sp.get("category") ?? "";

  return (
    <div className="flex flex-wrap items-end gap-3 mb-6">
      <div>
        <label className="block text-xs text-gray-500">Search</label>
        <input
          value={q}
          onChange={(e) => setParam("q", e.currentTarget.value)}
          placeholder="Find parts..."
          className="border rounded-md px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-xs text-gray-500">Brand</label>
        <select
          value={brand}
          onChange={(e) => setParam("brand", e.currentTarget.value || null)}
          className="border rounded-md px-3 py-2"
        >
          <option value="">All</option>
          {uniqueBrands.map((b) => (
            <option key={keyOf(b)} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs text-gray-500">Category</label>
        <select
          value={category}
          onChange={(e) => setParam("category", e.currentTarget.value || null)}
          className="border rounded-md px-3 py-2"
        >
          <option value="">All</option>
          {uniqueCategories.map((c) => (
            <option key={keyOf(c)} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
