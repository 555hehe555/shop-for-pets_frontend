import { Box, Grid, Pagination } from "@mui/material";
import { ProductCard } from "../ProductCard/ProductCard";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "@/queries/catalog/useCatalogQueries";
import { ProductFilters } from "../ProductFilters/ProductFilters";
import { useState, type ChangeEvent } from "react";
import type { FilterState } from "../../api";
import { styles } from "./ProductsList.styles";

const PAGE_SIZE = 10;

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

  const { data } = useProducts({
    search,
    ...filters,
    page,
    page_size: PAGE_SIZE,
  });

  const products = data?.results ?? [];
  const totalCount = data?.count ?? 0;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  function handlePages(_: ChangeEvent<unknown, Element>, value: number) {
    setPage(value);
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.filters}>
        <ProductFilters filters={filters} onChange={handleFilters} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flex: 1,
          alignSelf: "stretch",
          alignItems: "center",
        }}
      >
        <Box sx={styles.productsContainer}>
          <Box component="ul" sx={styles.grid}>
            {products.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </Box>
        </Box>

        {totalPages > 1 && (
          <Pagination
            page={page}
            count={totalPages}
            onChange={handlePages}
            color="primary"
            sx={styles.pagination}
          />
        )}
      </Box>
    </Box>
  );
}
