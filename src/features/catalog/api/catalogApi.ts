import { BASE_URL } from "@/data/user-config.json";
import type { Product } from "@/types/api";

export async function fetchProducts(search?: string): Promise<Product[]> {
  const url = search
    ? `${BASE_URL}/products/?search=${encodeURIComponent(search)}`
    : `${BASE_URL}/products`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("faill to fetch products");
  }

  const data = await response.json();

  return data;
}

export async function fetchProductById(id: number): Promise<Product> {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  const productData = await response.json();

  if (!response.ok) {
    throw new Error(`faill to fetch product ${id}`);
  }

  return productData;
}
