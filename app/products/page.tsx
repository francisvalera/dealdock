// app/products/page.tsx
import { redirect } from "next/navigation";

export default function ProductsRedirect({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(searchParams ?? {})) {
    if (Array.isArray(v)) v.forEach((vv) => sp.append(k, vv));
    else if (v != null) sp.set(k, v);
  }
  const qs = sp.toString();
  redirect(`/shop${qs ? `?${qs}` : ""}`);
}
