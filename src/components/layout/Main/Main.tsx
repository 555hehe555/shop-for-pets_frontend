import { ProductsList } from "@/features/catalog";

export default function Main() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}
    >
      <ProductsList />
    </main>
  );
}
