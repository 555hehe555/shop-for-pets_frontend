import { fetchProducts } from "@/features/catalog/api";
import {
  fetchProductById,
  type ProductFiltersParams,
} from "@/features/catalog/api/catalogApi";
import { useQuery } from "@tanstack/react-query";

export function useProducts(params: ProductFiltersParams = {}) {
  const query = useQuery({
    queryKey: ["products", params],
    queryFn: () => fetchProducts(params),
  });

  return query;
}

export function useProductById(id: number) {
  const query = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
  });

  return query;
}
