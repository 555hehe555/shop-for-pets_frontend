import { createContext, useContext } from "react";

interface CartContextType {
  cartItems: Array<string>;
}

const CartContext = createContext();

export default function CartProvider() {
  return <CartContext.Provider></CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
