import { BASE_URL } from "@/data/user-config.json";

interface FailedQueueType {
  resolve: (token: string) => void;
  reject: (error: Error) => void;
}

let failedQueue: FailedQueueType[] = [];
let isRefreshing: boolean = false;

function processQueue(error: Error | null, token: string | null = null) {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token!);
    }
  });

  failedQueue = [];
}

export async function authFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  const accessToken = localStorage.getItem("access");
  const headers = new Headers(init?.headers);

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  let response = await fetch(input, { ...init, headers });

  if (response.status === 401) {
    const refreshToken = localStorage.getItem("refresh");

    if (!refreshToken) {
      return response;
    }
    if (isRefreshing) {
      try {
        const newToken = await new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        });
        headers.set("Authorization", `Bearer ${newToken}`);

        return await fetch(input, { ...init, headers });
      } catch {
        return response;
      }
    }
    isRefreshing = true;

    try {
      const refreshResponse = await fetch(`${BASE_URL}/accounts/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (refreshResponse.ok) {
        const data = await refreshResponse.json();
        localStorage.setItem("access", data.access);
        processQueue(null, data.access);

        headers.set("Authorization", `Bearer ${data.access}`);

        response = await fetch(input, { ...init, headers });
      } else {
        processQueue(new Error("faill refresh"));

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
      }
    } catch (error) {
      processQueue(error as Error);
    } finally {
      isRefreshing = false;
    }
  }

  return response;
}
