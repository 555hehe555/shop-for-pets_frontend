import { BASE_URL } from "@/config/api";
import type {
  CreateCustomUser,
  CreateCustomUserRequest,
  GetCustomUser,
  GetMe,
  PatchedUpdateCustomUserRequest,
  TokenObtainPair,
  TokenObtainPairRequest,
} from "@/types/api";
import { authFetch } from "./authFetch";
import { createAuthApiError } from "../utils/authError";

export async function loginUser({
  username,
  password,
}: TokenObtainPairRequest): Promise<TokenObtainPair> {
  const response = await fetch(`${BASE_URL}/accounts/login/`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });

  if (!response.ok) {
    throw await createAuthApiError(response);
  }

  const data = await response.json();

  localStorage.setItem("refresh", data.refresh);
  localStorage.setItem("access", data.access);

  return data;
}

export async function registrateUser({
  username,
  password,
  email,
}: CreateCustomUserRequest): Promise<CreateCustomUser> {
  const response = await fetch(`${BASE_URL}/users/`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      username: username,
      password: password,
      email: email,
    }),
  });

  if (!response.ok) {
    throw await createAuthApiError(response);
  }

  const data = await response.json();

  return data;
}

export async function getMe(): Promise<GetMe> {
  const response = await authFetch(`${BASE_URL}/users/me/`);

  if (!response.ok) {
    throw new Error("error to get auntificate user");
  }

  const data = await response.json();

  return data;
}

export async function updateUser(
  id: number,
  inData: PatchedUpdateCustomUserRequest,
): Promise<GetCustomUser> {
  const response = await authFetch(`${BASE_URL}/users/${id}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inData),
  });

  if (!response.ok) {
    throw new Error("error to patch user");
  }

  const data: GetCustomUser = await response.json();

  return data;
}
