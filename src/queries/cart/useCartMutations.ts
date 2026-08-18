import { addCartItem } from "@/features/cart/api";
import {
  changeCartItemQuantity,
  removeCartItem,
} from "@/features/cart/api/cartApi";
import type { CartRequest } from "@/types/api";
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

export function useChangeCartItemQuantity() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ product, quantity }: CartRequest) =>
      changeCartItemQuantity(product, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed changing quantity item in cart");
    },
  });

  return mutation;
}

export function useRemoveCartItem() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (product: number) => removeCartItem(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed delete itrm from cart");
    },
  });

  return mutation;
}
