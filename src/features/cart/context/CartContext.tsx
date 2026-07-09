import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { fetchCartItems, type CartItem } from "../api";

interface CartContextType {
  cartItems: Array<CartItem>;
  error: string | null;
  loading: boolean;
  itemsCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export default function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<Array<CartItem>>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
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
    getCartItems();
  }, []);

  const itemsCount = cartItems.length;

  return (
    <CartContext.Provider value={{ cartItems, error, loading, itemsCount }}>
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
