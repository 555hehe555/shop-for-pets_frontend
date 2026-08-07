import { useState, useEffect } from "react";
import type { Product } from "@/types/api";
import { fetchProducts } from "../../api";
import { Grid } from "@mui/material";
import { ProductCard } from "../ProductCard/ProductCard";

export function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function getProducts() {
      const data = await fetchProducts();
      setProducts(data);
    }
    getProducts();
  }, []);

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
