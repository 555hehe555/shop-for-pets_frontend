import { BASE_URL } from "@/data/user-config.json";
import { authFetch } from "@/features/auth/api/authFetch";
import type { Cart, CartRequest } from "@/types/api";
import { toast } from "react-hot-toast/headless";

export async function fetchCartItems(): Promise<Cart[]> {
  try {
    const response = await authFetch(`${BASE_URL}/cart`);

    if (!response.ok) {
      toast.error(
        `помилка при отриманні товарів кошика: ${response.status} ${response.statusText}`,
      );
      throw new Error(`${response.status} ${response.statusText}`);
    }

    toast.success("Товари успішно отримано з кошика");

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
    const response = await authFetch(`${BASE_URL}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: 1, productId: id, quantity: 1 }),
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
    return await response.json();
  } catch (error) {
    console.error("Error adding item to cart:", error);
    toast.error("Failed to add item to cart");
    throw error;
  }
}

export async function removeCartItem(id: string) {
  try {
    const response = await authFetch(`${BASE_URL}/cart/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      toast.error(
        `помилка при видаленні товару з кошика: ${response.status} ${response.statusText}`,
      );
      throw new Error(
        `Failed to remove item from cart: ${response.status} ${response.statusText}`,
      );
    }

    toast.success("Товар успішно видалено з кошика");
    return await response.json();
  } catch (error) {
    console.error("Error removing item from cart:", error);
    toast.error("помилка при видаленні товару з кошика");
    throw error;
  }
}

export async function updateCartItemQuantity(id: string, quantity: number) {
  try {
    const response = await authFetch(`${BASE_URL}/cart/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    });

    if (!response.ok) {
      toast.error(
        `помилка при оновленні кількості товару в кошику: ${response.status} ${response.statusText}`,
      );
      throw new Error(
        `Failed to update item quantity in cart: ${response.status} ${response.statusText}`,
      );
    }

    toast.success("Кількість товару в кошику успішно оновлено");
    return await response.json();
  } catch (error) {
    console.error("Error updating item quantity in cart:", error);
    toast.error("помилка при оновленні кількості товару в кошику");
    throw error;
  }
}
