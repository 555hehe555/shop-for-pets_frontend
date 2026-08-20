import { BASE_URL } from "@/data/user-config.json";
import type { Product } from "@/types/api";

export type ProductFiltersParams = {
  search?: string;
  species?: string[];
  categories?: string[];
  brands?: string[];
};

export async function fetchProducts(
  params: ProductFiltersParams = {},
): Promise<Product[]> {
  const query = new URLSearchParams();
  if (params.search) {
    query.append("search", params.search);
  }
  if (params.species?.length) {
    query.append("species__name__in", params.species.join(","));
  }
  if (params.categories?.length) {
    query.append("categories__name__in", params.categories.join(","));
  }
  if (params.brands?.length) {
    query.append("brands__name__in", params.brands.join(","));
  }

  const queryString = query.toString();

  const url = queryString
    ? `${BASE_URL}/products/?${queryString}`
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
