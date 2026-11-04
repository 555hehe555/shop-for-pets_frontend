import { fetchCartItems } from "@/features/cart/api";
import { useQuery } from "@tanstack/react-query";

export function useCartItems(enable: boolean) {
  const query = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCartItems,
    enabled: enable,
  });

  return query;
}
