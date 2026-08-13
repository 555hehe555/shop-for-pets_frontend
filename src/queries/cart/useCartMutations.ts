import { addCartItem } from "@/features/cart/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useAddToCart() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) => addCartItem(id),
    onSuccess: () => {
      toast.success("Товар успішно додано до кошика");

      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to add item to cart");
    },
  });

  return mutation;
}
