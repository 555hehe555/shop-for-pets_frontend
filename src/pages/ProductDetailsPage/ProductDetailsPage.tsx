import Main from "@/components/layout/Main/Main";
import { useCart } from "@/features/cart";
import { ProductDetails } from "@/features/catalog/components/ProductDetails/ProductDetails";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useProductById } from "@/queries/catalog/useCatalogQueries";

import { useParams } from "react-router-dom";

export default function ProductDetailsPage() {
  const { addToCartItem } = useCart();

  const { id } = useParams<{ id: string }>();
  const productId = Number(id);

  const { data: product } = useProductById(productId);

  useDocumentTitle(product?.title ?? "Деталі товару");

  return (
    <Main>
      <ProductDetails key={productId} id={productId} onAddToCartItem={addToCartItem} />
    </Main>
  );
}
