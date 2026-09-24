import Main from "@/components/layout/Main/Main";
import { useCart } from "@/features/cart";
import { ProductDetails } from "@/features/catalog/components/ProductDetails/ProductDetails";

import { useParams } from "react-router-dom";

export default function ProductDetailsPage() {
  const { addToCartItem } = useCart();

  const { id } = useParams<{ id: string }>();

  return (
    <Main>
      <ProductDetails id={Number(id)} onAddToCartItem={addToCartItem} />
    </Main>
  );
}
