import { ProductDetails } from "@/features/catalog/components/ProductDetails/ProductDetails";

import { useParams } from "react-router-dom";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();

  return <ProductDetails id={Number(id)} />;
}
