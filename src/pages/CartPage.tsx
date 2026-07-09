import { useCart } from "@/features/cart";

export default function CartPage() {
  const { cartItems, error, loading } = useCart();
  console.log(cartItems, error, loading);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return <h2>CartPage</h2>;
}
