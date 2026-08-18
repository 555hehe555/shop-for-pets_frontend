import { createContext, useContext, type ReactNode } from "react";
import type { Cart, CartRequest } from "@/types/api";
import { useCartItems } from "@/queries/cart/useCartQueries";
import {
  useAddToCart,
  useChangeCartItemQuantity,
  useRemoveCartItem,
} from "@/queries/cart/useCartMutations";

interface CartContextType {
  cartItems: Array<Cart>;
  error: string | null;
  loading: boolean;
  itemsCount: number;

  addToCartItem: (id: number) => Promise<void>;
  changeCartItemQuantity: ({ product, quantity }: CartRequest) => Promise<void>;
  deleteCartItem: (id: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export default function CartProvider({ children }: { children: ReactNode }) {
  const {
    data: cartItems = [],
    isLoading: loading,
    error: queryError,
  } = useCartItems();

  const { mutateAsync: addToCartItem } = useAddToCart();
  const { mutateAsync: changeCartItemQuantity } = useChangeCartItemQuantity();
  const { mutateAsync: deleteCartItem } = useRemoveCartItem();

  const error = queryError ? queryError.message : null;

  const itemsCount = cartItems.length;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        error,
        loading,
        itemsCount,
        addToCartItem,
        changeCartItemQuantity,
        deleteCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
