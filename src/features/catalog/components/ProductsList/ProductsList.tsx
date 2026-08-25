import { Box, Grid } from "@mui/material";
import { ProductCard } from "../ProductCard/ProductCard";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "@/queries/catalog/useCatalogQueries";
import { ProductFilters } from "../ProductFilters/ProductFilters";
import { useState } from "react";
import type { FilterState } from "../../api";

export function ProductsList() {
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || undefined;
  const [filters, setFilters] = useState<FilterState>({
    species: [],
    categories: [],
    brands: [],
  });

  console.log(filters);

  const { data: products = [] } = useProducts({ search, ...filters });

  return (
    <Box sx={{ display: "flex", gap: 3, padding: 3, alignItems: "flex-start" }}>
      <Box sx={{ width: 250, flexShrink: 0 }}>
        <ProductFilters filters={filters} onChange={setFilters} />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
