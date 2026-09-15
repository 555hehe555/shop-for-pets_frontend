import { ProductsList } from "@/features/catalog";

export default function Main() {
  return (
    <main style={{ minHeight: "calc(100vh - 64px - 64px)" }}>
      <ProductsList />
    </main>
  );
}
