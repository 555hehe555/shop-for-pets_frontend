import { BASE_URL } from "@/data/user-config.json";
import { authFetch } from "@/features/auth/api/authFetch";
import type { FavouriteProduct } from "@/types/api";

export async function fetchFavouriteItems(): Promise<FavouriteProduct[]> {
  const response = await authFetch(`${BASE_URL}/favourites/`);

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  const favouriteItems = await response.json();
  return favouriteItems;
}

export async function addFavouriteItem(id: number): Promise<void> {
  const response = await authFetch(`${BASE_URL}/favourites/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ product: id }),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to add item to favourites: ${response.status} ${response.statusText}`,
    );
  }
}

export async function getFavouriteProductsById(
  id: number,
): Promise<FavouriteProduct> {
  const response = await authFetch(`${BASE_URL}/favourites/${id}`);

  if (!response.ok) {
    throw new Error(
      `Failed to get favourite product: ${response.status} ${response.statusText}`,
    );
  }

  return await response.json();
}

export async function removeFavouriteItem(id: number): Promise<void> {
  const response = await authFetch(`${BASE_URL}/favourites/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to remove item from favourites: ${response.status} ${response.statusText}`,
    );
  }
}
