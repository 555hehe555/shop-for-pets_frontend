import { BASE_URL } from "@/data/user-config.json";
import type {
  CreateCustomUser,
  CreateCustomUserRequest,
  GetMe,
  TokenObtainPair,
  TokenObtainPairRequest,
} from "@/types/api";
import { authFetch } from "./authFetch";

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
    throw new Error("error to authenticate user");
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
    throw new Error("error to registrate user");
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
