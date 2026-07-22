import { BASE_URL } from "@/data/user-config.json";
import { TbTypeface } from "react-icons/tb";

interface LoginProps {
  username: string;
  password: string;
}

export async function loginUser({ username, password }: LoginProps) {
  try {
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

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("refresh", data.refresh);
      localStorage.setItem("access", data.access);
    }

    return data;
  } catch (e) {
    throw new Error("error to authenticate user", e as Error);
  }
}
