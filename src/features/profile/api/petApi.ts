import { BASE_URL } from "@/data/user-config.json";
import { authFetch } from "@/features/auth/api/authFetch";
import type { Pet, PetRequest } from "@/types/api";

export async function getPets(): Promise<Pet[]> {
  const response = await authFetch(`${BASE_URL}/pets/`);

  if (!response.ok) {
    throw new Error("error to get pets");
  }

  const data = await response.json();

  return data;
}

export async function getPetById(id: number): Promise<Pet> {
  const response = await authFetch(`${BASE_URL}/pets/${id}/`);

  if (!response.ok) {
    throw new Error(`error to get ${id} pet`);
  }

  const data = await response.json();

  return data;
}

export async function createPet(inData: PetRequest): Promise<Pet> {
  const response = await authFetch(`${BASE_URL}/pets/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inData),
  });

  if (!response.ok) {
    throw new Error("error to create pet");
  }

  const data = await response.json();

  return data;
}

export async function updatePet(id: number, inData: PetRequest): Promise<void> {
  const response = await authFetch(`${BASE_URL}/pets/${id}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inData),
  });

  if (!response.ok) {
    throw new Error("error to patch pet");
  }

  const data = await response.json();

  return data;
}

export async function deletePet(id: number): Promise<void> {
  const response = await authFetch(`${BASE_URL}/pets/${id}/`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("error to delete pet");
  }

  const data = await response.json();

  return data;
}
