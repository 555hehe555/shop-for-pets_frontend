import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  fetchCartItems,
  addCartItem,
  removeCartItem,
  updateCartItemQuantity,
} from "../api";
import type { Cart } from "@/types/api";
import { useCartItems } from "@/queries/cart/useCartQueries";
import { useAddToCart } from "@/queries/cart/useCartMutations";

interface CartContextType {
  cartItems: Array<Cart>;
  error: string | null;
  loading: boolean;
  itemsCount: number;

  addToCartItem: (id: number) => Promise<void>;
  changeCartItemQuantity: (id: number, quantity: number) => Promise<void>;
  deleteCartItem: (id: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export default function CartProvider({ children }: { children: ReactNode }) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { data: cartItems = [] } = useCartItems();

  const { mutateAsync: addToCartItem } = useAddToCart();

  async function changeCartItemQuantity(id: number, quantity: number) {
    setError(null);
    setLoading(true);

    if (quantity < 1) {
      return;
    }

    try {
      await updateCartItemQuantity(id, quantity);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function deleteCartItem(id: number) {
    setError(null);
    setLoading(true);
    console.log("deleteCartItem", id);
    try {
      await removeCartItem(id);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  }

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
