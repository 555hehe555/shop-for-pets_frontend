import Main from "@/components/layout/Main/Main.tsx";
import { ProductsList } from "@/features/catalog/components/ProductsList/ProductsList";

export default function HomePage() {
  return (
    <Main>
      <ProductsList />
    </Main>
  );
}
