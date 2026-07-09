import { BASE_URL } from "@/data/user-config.json";
import { toast } from "react-hot-toast/headless";

export async function fetchCartItems() {
  try {
    const response = await fetch(`${BASE_URL}/cart`);

    if (!response.ok) {
      toast.error(
        `помилка при додаванні товару до кошика: ${response.status} ${response.statusText}`,
      );
      throw new Error(`${response.status} ${response.statusText}`);
    }

    toast.success("Товар успішно додано до кошика");

    const cartItems = await response.json();
    return cartItems;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    toast.error("Failed to fetch cart items");
    throw error;
  }
}

export async function addCartItem(id: string) {
  try {
    const response = await fetch(`${BASE_URL}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: 1, productId: id }),
    });

    if (!response.ok) {
      toast.error(
        `помилка при додаванні товару до кошика: ${response.status} ${response.statusText}`,
      );
      throw new Error(
        `Failed to add item to cart: ${response.status} ${response.statusText}`,
      );
    }

    toast.success("Товар успішно додано до кошика");
    console.log(await response.json());
  } catch (error) {
    console.error("Error adding item to cart:", error);
    toast.error("Failed to add item to cart");
    throw error;
  }
}
