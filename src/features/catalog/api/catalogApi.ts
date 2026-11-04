import { BASE_URL } from "@/data/user-config.json";
import type { Brand, Category, Product, Species } from "@/types/api";

export type ProductFiltersParams = {
  search?: string;
  species?: string[];
  categories?: string[];
  brands?: string[];

  page?: number;
  page_size?: number;
};

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export async function fetchProducts(
  params: ProductFiltersParams = {},
): Promise<PaginatedResponse<Product>> {
  const query = new URLSearchParams();
  if (params.search) {
    query.append("search", params.search);
  }
  if (params.species?.length) {
    query.append("species__name__in", params.species.join(","));
  }
  if (params.categories?.length) {
    query.append("category__name__in", params.categories.join(","));
  }
  if (params.brands?.length) {
    query.append("brand__name__in", params.brands.join(","));
  }
  if (params.page) {
    query.append("page", params.page.toString());
  }
  if (params.page_size) {
    query.append("page_size", params.page_size.toString());
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

export async function fetchBrands(): Promise<Brand[]> {
  const response = await fetch(`${BASE_URL}/brands/`);
  const brandData = await response.json();

  if (!response.ok) {
    throw new Error(`faill to fetch brands list`);
  }

  return brandData;
}

export async function fetchCategories(): Promise<Category[]> {
  const response = await fetch(`${BASE_URL}/categories/`);
  const categoriesData = await response.json();

  if (!response.ok) {
    throw new Error(`faill to fetch categories list`);
  }

  return categoriesData;
}

export async function fetchSpecies(): Promise<Species[]> {
  const response = await fetch(`${BASE_URL}/species/`);
  const speciesData = await response.json();

  if (!response.ok) {
    throw new Error(`faill to fetch species list`);
  }

  return speciesData;
}
