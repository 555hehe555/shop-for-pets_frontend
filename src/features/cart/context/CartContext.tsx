import { createContext, useContext, type ReactNode } from "react";
import type { Cart, CartRequest } from "@/types/api";
import { useAuth } from "@/features/auth/context/AuthContext";
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

  addToCartItem: (id: number) => Promise<Cart>;
  changeCartItemQuantity: ({ product, quantity }: CartRequest) => Promise<Cart>;
  deleteCartItem: (id: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export default function CartProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();

  const {
    data: cartItems = [],
    isLoading: loading,
    error: queryError,
  } = useCartItems(isAuthenticated);

  const { mutateAsync: addToCartItem } = useAddToCart();
  const { mutateAsync: changeCartItemQuantity } = useChangeCartItemQuantity();
  const { mutateAsync: deleteCartItem } = useRemoveCartItem();

  const error = queryError ? queryError.message : null;

  const itemsCount = cartItems.reduce(
    (sum, item) => sum + (item.quantity ?? 1),
    0,
  );

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

// eslint-disable-next-line
export function useCart() {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
