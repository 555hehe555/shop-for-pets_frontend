import { useCart } from "@/features/cart";
import { ProductDetails } from "@/features/catalog/components/ProductDetails/ProductDetails";

import { useParams } from "react-router-dom";

export default function ProductDetailsPage() {
  const { addToCartItem } = useCart();

  const { id } = useParams<{ id: string }>();

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}
    >
      <ProductDetails id={Number(id)} onAddToCartItem={addToCartItem} />
    </main>
  );
}
