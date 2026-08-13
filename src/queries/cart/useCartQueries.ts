import { fetchCartItems } from "@/features/cart/api";
import { useQuery } from "@tanstack/react-query";

export function useCartItems() {
  const query = useQuery({ queryKey: ["cart"], queryFn: fetchCartItems });

  return query;
}
