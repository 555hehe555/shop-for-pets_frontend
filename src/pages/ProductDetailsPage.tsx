import Footer from "@/components/layout/Footer/Footer.tsx";
import Header from "@/components/layout/Header/Header.tsx";
import { ProductDetails } from "@/features/catalog/components/ProductDetails/ProductDetails";

import { useParams } from "react-router-dom";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <Header />
      <ProductDetails id={id!} />
      <Footer />
    </>
  );
}
