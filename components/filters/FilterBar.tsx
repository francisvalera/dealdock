"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function FilterBar({ brands, categories }: { brands: string[]; categories: string[] }) {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function setParam(key: string, value: string | null) {
    const params = new URLSearchParams(sp.toString());
    if (value && value.length) params.set(key, value); else params.delete(key);
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap items-end gap-3 mb-6">
      <div>
        <label className="block text-xs text-gray-500">Search</label>
        <input
          defaultValue={sp.get("q") ?? ""}
          onChange={(e) => setParam("q", e.currentTarget.value)}
          placeholder="Find parts..."
          className="border rounded-md px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-xs text-gray-500">Brand</label>
        <select defaultValue={sp.get("brand") ?? ""} onChange={(e) => setParam("brand", e.currentTarget.value || null)} className="border rounded-md px-3 py-2">
          <option value="">All</option>
          {brands.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-xs text-gray-500">Category</label>
        <select defaultValue={sp.get("category") ?? ""} onChange={(e) => setParam("category", e.currentTarget.value || null)} className="border rounded-md px-3 py-2">
          <option value="">All</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
    </div>
  );
}