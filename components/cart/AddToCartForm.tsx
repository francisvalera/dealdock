"use client";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { addToCart } from "@/app/actions/cart";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="h-9 rounded-full bg-black px-4 text-sm font-semibold leading-none text-white hover:opacity-90 disabled:opacity-60"
    >
      {pending ? "Adding…" : "Add to Cart"}
    </button>
  );
}

export default function AddToCartForm({
  productId,
  redirectTo, // omit for silent behavior
  qty = 1,
}: {
  productId: string;
  redirectTo?: string;
  qty?: number;
}) {
  const router = useRouter();

  async function action(formData: FormData) {
    await addToCart(formData);     // no redirect in server action → silent
    router.refresh();              // re-renders header to update cart badge
  }

  return (
    <form action={action}>
      <input type="hidden" name="productId" value={productId} />
      <input type="hidden" name="qty" value={String(qty)} />
      {redirectTo ? <input type="hidden" name="redirectTo" value={redirectTo} /> : null}
      <Submit />
    </form>
  );
}
