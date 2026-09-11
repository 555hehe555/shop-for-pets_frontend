import { Box, Grid, Pagination } from "@mui/material";
import { ProductCard } from "../ProductCard/ProductCard";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "@/queries/catalog/useCatalogQueries";
import { ProductFilters } from "../ProductFilters/ProductFilters";
import { useState, type ChangeEvent } from "react";
import type { FilterState } from "../../api";

export function ProductsList() {
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || undefined;
  const [filters, setFilters] = useState<FilterState>({
    species: [],
    categories: [],
    brands: [],
  });
  const [page, setPage] = useState(1);

  function handleFilters(newFilters: FilterState) {
    setFilters(newFilters);
    setPage(1);
  }

  const { data } = useProducts({ search, ...filters, page, page_size: 2 });

  const products = data?.results || [];
  const totalCount = data?.count || 0;
  const totalPages = Math.ceil(totalCount / 2);

  function handlePages(event: ChangeEvent<unknown, Element>, value: number) {
    setPage(value);
  }

  return (
    <Box sx={{ display: "flex", gap: 3, padding: 3, alignItems: "flex-start" }}>
      <Box sx={{ width: 250, flexShrink: 0 }}>
        <ProductFilters filters={filters} onChange={handleFilters} />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Grid container spacing={3} sx={{ width: "100%" }}>
          {products.map((product) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>

        {totalPages > 1 && (
          <Pagination
            page={page}
            count={totalPages}
            onChange={handlePages}
            color="primary"
          />
        )}
      </Box>
    </Box>
  );
}
