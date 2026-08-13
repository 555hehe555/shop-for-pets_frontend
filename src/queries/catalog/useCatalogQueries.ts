import { fetchProducts } from "@/features/catalog/api";
import { fetchProductById } from "@/features/catalog/api/catalogApi";
import { useQuery } from "@tanstack/react-query";

export function useProducts(search?: string) {
  const query = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts(search),
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
