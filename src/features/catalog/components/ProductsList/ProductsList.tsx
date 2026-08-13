import { Grid } from "@mui/material";
import { ProductCard } from "../ProductCard/ProductCard";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "@/queries/catalog/useCatalogQueries";

export function ProductsList() {
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || undefined;

  const { data: products = [] } = useProducts(search);

  return (
    <Grid
      container
      spacing={3}
      sx={{
        justifyContent: "center",
        padding: 3,
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
}
