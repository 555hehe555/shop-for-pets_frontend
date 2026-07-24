export async function authFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  const accessToken = localStorage.getItem("access");
  const headers = new Headers(init?.headers);

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return await fetch(input, { ...init, headers });
}
