import { BASE_URL } from "@/data/user-config.json";
import type { CreateCustomUser, CreateCustomUserRequest } from "@/types/api";

interface LoginProps {
  username: string;
  password: string;
}

export async function loginUser({ username, password }: LoginProps) {
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
