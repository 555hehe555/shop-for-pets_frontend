import {
  fetchFavouriteItems,
  getFavouriteProductsById,
} from "@/features/favourite/api/favouriteApi";
import { useQuery } from "@tanstack/react-query";

export function useFavouriteItems(enable: boolean) {
  const query = useQuery({
    queryKey: ["favourites"],
    queryFn: fetchFavouriteItems,
    enabled: enable,
  });

  return query;
}

export function useFavouriteItemsById(id: number, enable: boolean) {
  const query = useQuery({
    queryKey: ["favourites", id],
    queryFn: () => getFavouriteProductsById(id),
    enabled: enable,
  });

  return query;
}
