import {
  addFavouriteItem,
  removeFavouriteItem,
} from "@/features/favourite/api/favouriteApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useToggleFavourite(isFavourite: boolean) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (product: number) =>
      isFavourite ? removeFavouriteItem(product) : addFavouriteItem(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favourites"] });
    },
    onError: (error: Error) => {
      if (isFavourite) {
        toast.error(error.message || "Failed delete item from favourites");
      } else {
        toast.error(error.message || "Failed add item to favourites");
      }
    },
  });

  return mutation;
}
