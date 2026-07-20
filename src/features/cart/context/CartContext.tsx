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
  type CartItem,
} from "../api";

interface CartContextType {
  cartItems: Array<CartItem>;
  error: string | null;
  loading: boolean;
  itemsCount: number;

  addToCartItem: (id: string) => Promise<void>;
  changeCartItemQuantity: (id: string, quantity: number) => Promise<void>;
  deleteCartItem: (id: string) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export default function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<Array<CartItem>>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function getCartItems() {
    setError(null);
    setLoading(true);
    try {
      const data = await fetchCartItems();
      setCartItems(data);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCartItems();
  }, []);

  async function addToCartItem(id: string) {
    setError(null);
    setLoading(true);
    try {
      const existItem = cartItems.find((cartItem) => cartItem.productId === id);
      if (!existItem) {
        await addCartItem(id);
        await getCartItems();
      } else {
        await changeCartItemQuantity(existItem.id, existItem.quantity + 1);
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function changeCartItemQuantity(id: string, quantity: number) {
    setError(null);
    setLoading(true);

    if (quantity < 1) {
      return;
    }

    try {
      await updateCartItemQuantity(id, quantity);
      await getCartItems();
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function deleteCartItem(id: string) {
    setError(null);
    setLoading(true);
    console.log("deleteCartItem", id);
    try {
      await removeCartItem(id);
      await getCartItems();
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
