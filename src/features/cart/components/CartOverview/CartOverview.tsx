import { useCart } from "@/features/cart";
import type { Product } from "@/features/catalog";
import { BASE_URL } from "@/data/user-config.json";

import { useEffect, useState } from "react";

export function CartOverview() {
  const { cartItems, error, loading } = useCart();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function getProducts() {
      const data = await fetch(`${BASE_URL}/product`);
      setProducts(await data.json());
    }
    getProducts();
  }, []);

  const cartProducts = cartItems.map((cartItem) => {
    const product = products.find(
      (productItem: Product) => productItem.id === cartItem.productId,
    );
    return { ...cartItems, product };
  });

  console.log(cartProducts);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return <h2>CartPage</h2>;
}
