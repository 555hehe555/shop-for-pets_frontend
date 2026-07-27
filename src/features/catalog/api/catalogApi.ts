import { BASE_URL } from "@/data/user-config.json";

export async function fetchProducts() {
  try {
    const response = await fetch(`${BASE_URL}/products`);

    if (!response.ok) {
      throw new Error("faill to fetch products");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
