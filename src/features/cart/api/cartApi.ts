import { BASE_URL } from "@/data/user-config.json";
import { authFetch } from "@/features/auth/api/authFetch";
import type { Cart } from "@/types/api";

export async function fetchCartItems(): Promise<Cart[]> {
  const response = await authFetch(`${BASE_URL}/cart/`);

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  const cartItems = await response.json();
  return cartItems;
}

export async function addCartItem(id: number) {
  const response = await authFetch(`${BASE_URL}/cart/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ product: id, quantity: 1 }),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to add item to cart: ${response.status} ${response.statusText}`,
    );
  }

  return await response.json();
}

export async function removeCartItem(id: number) {
  const response = await authFetch(`${BASE_URL}/cart/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to remove item from cart: ${response.status} ${response.statusText}`,
    );
  }
}

export async function updateCartItemQuantity(id: number, quantity: number) {
  const response = await authFetch(`${BASE_URL}/cart/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to update item quantity in cart: ${response.status} ${response.statusText}`,
    );
  }

  return await response.json();
}
